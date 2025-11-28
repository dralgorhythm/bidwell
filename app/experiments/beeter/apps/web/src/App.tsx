import { useEffect, useRef, useState } from 'react'
import { AudioBridge } from './audio/bridge'
import { SchedulerBridge } from './scheduler-bridge'
import { Grid } from './components/Grid'

function App() {
    const [freq, setFreq] = useState(440)
    const [started, setStarted] = useState(false)
    const bridgeRef = useRef<AudioBridge | null>(null)
    const schedulerRef = useRef<SchedulerBridge | null>(null)

    const [lastHapTime, setLastHapTime] = useState(0);

    useEffect(() => {
        bridgeRef.current = new AudioBridge()
        schedulerRef.current = new SchedulerBridge()

        // Connect Scheduler to AudioBridge
        schedulerRef.current.onHaps = (haps) => {
            bridgeRef.current?.scheduleHaps(haps);
            // Update visual state
            setLastHapTime(Date.now());
        };
        // ...


        // Sync time loop
        const loop = () => {
            if (bridgeRef.current && schedulerRef.current && bridgeRef.current.context.state === 'running') {
                schedulerRef.current.updateTime(bridgeRef.current.context.currentTime);
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);

        return () => {
            schedulerRef.current?.stop();
        }
    }, [])

    const [error, setError] = useState<string | null>(null)

    const handleStart = async () => {
        try {
            setError(null)
            if (bridgeRef.current && schedulerRef.current) {
                await bridgeRef.current.init()
                bridgeRef.current.resume()
                schedulerRef.current.start();
                setStarted(true)
            }
        } catch (err: any) {
            console.error(err)
            setError(err.stack || err.message || "Failed to start audio engine")
        }
    }



    const [playing, setPlaying] = useState(true); // Auto-starts on handleStart

    const handleTogglePlay = () => {
        if (playing) {
            schedulerRef.current?.stop();
        } else {
            schedulerRef.current?.start();
        }
        setPlaying(!playing);
    }

    const handlePatternChange = (pattern: string) => {
        schedulerRef.current?.updatePattern(pattern);
    }

    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value)
        setFreq(val)
        if (bridgeRef.current) {
            bridgeRef.current.setFrequency(val)
        }
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Beeter Phase 2: The Engine</h1>

            {!started ? (
                <div>
                    <button onClick={handleStart} style={{ padding: '1rem', fontSize: '1.2rem' }}>
                        Start Engine
                    </button>
                    {error && (
                        <div style={{ marginTop: '1rem', color: 'red' }}>
                            <p>Error starting engine:</p>
                            <pre style={{ background: '#ffebee', padding: '1rem', overflow: 'auto' }}>
                                {error}
                            </pre>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
                    <div>
                        <h3>Master Control</h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <button onClick={handleTogglePlay} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
                                {playing ? 'Pause' : 'Play'}
                            </button>
                        </div>
                        <label style={{ display: 'block', marginBottom: '1rem' }}>
                            Frequency: {freq} Hz
                            <input
                                type="range"
                                min="50"
                                max="1000"
                                value={freq}
                                onChange={handleSlider}
                                style={{ width: '100%', marginTop: '0.5rem' }}
                            />
                        </label>
                    </div>

                    <div>
                        <h3>Sequencer</h3>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: Date.now() - lastHapTime < 100 ? '#00FF00' : '#333',
                            marginBottom: '10px',
                            transition: 'background 0.05s'
                        }} />
                        <Grid onPatternChange={handlePatternChange} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
