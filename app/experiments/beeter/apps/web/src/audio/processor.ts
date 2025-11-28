// import init, { AudioEngine } from '@beeter/audio';

// Polyfill TextDecoder/TextEncoder for Wasm in AudioWorklet
if (typeof TextDecoder === 'undefined') {
    (globalThis as any).TextDecoder = class TextDecoder {
        decode(view: any) {
            if (!view) return '';
            const arr = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
            return String.fromCharCode(...arr);
        }
    };
}
if (typeof TextEncoder === 'undefined') {
    (globalThis as any).TextEncoder = class TextEncoder {
        encode(s: string) {
            const arr = new Uint8Array(s.length);
            for (let i = 0; i < s.length; i++) {
                arr[i] = s.charCodeAt(i);
            }
            return arr;
        }
    };
}

console.log('BeeterProcessor script loading...');

class BeeterProcessor extends AudioWorkletProcessor {
    engine: any = null;
    sab: Float32Array | null = null;
    initialized = false;

    haps: any[] = [];

    constructor() {
        super();
        this.port.onmessage = async (event: MessageEvent) => {
            if (event.data.type === 'init') {
                try {
                    // Dynamic import to avoid top-level await/import issues in Worklet
                    const module = await import('@beeter/audio');
                    const init = module.default;
                    const AudioEngine = module.AudioEngine;

                    // Initialize Wasm
                    await init(event.data.wasmModule);
                    this.engine = new AudioEngine(sampleRate);
                    this.sab = new Float32Array(event.data.sab);
                    this.initialized = true;
                    this.port.postMessage({ type: 'ready' });
                } catch (err) {
                    console.error('Failed to initialize processor:', err);
                    this.port.postMessage({ type: 'error', error: String(err) });
                }
            } else if (event.data.type === 'haps') {
                // Add new haps to the queue
                // console.log('Processor received haps:', event.data.haps);
                this.haps.push(...event.data.haps);
                // Sort by time just in case
                this.haps.sort((a, b) => a.when - b.when);
            }
        };
    }

    process(_inputs: Float32Array[][], outputs: Float32Array[][]) {
        if (!this.initialized || !this.engine || !this.sab) return true;

        const output = outputs[0][0];
        const currentTime = (globalThis as any).currentTime; // AudioWorkletGlobalScope.currentTime

        // Debug logging (throttle this!)
        // if (Math.random() < 0.01) console.log('Process time:', currentTime, 'Haps in queue:', this.haps.length);

        // Check for haps that are due
        // We process the block. Ideally we should split the block if a hap falls in the middle.
        // For now, we just check if a hap is due at the start of the block or during it.
        // Since we only have set_frequency, we can't easily schedule sample-accurate changes *within* the Rust engine yet
        // without passing the schedule to Rust.
        // So we will just trigger it if it's time.

        // Simple approach: Check if any hap is due in this block (approx)
        // Or just check if currentTime >= hap.when

        while (this.haps.length > 0 && this.haps[0].when <= currentTime + 128 / sampleRate) {
            const hap = this.haps.shift();
            // console.log('Processing hap:', hap);
            // Trigger sound!
            // For now, map 'bd' to 60Hz, others to 440Hz
            // The 'value' of the hap might be the note or struct.
            // Strudel haps have 'value', 'args', etc.
            // Let's assume hap.value is the note/control.

            // console.log('Playing hap:', hap);

            // Hacky mapping
            let freq = 440;
            if (hap.value === 'bd') freq = 60;
            if (hap.value === 'sd') freq = 200;
            if (hap.value === 'hh') freq = 800;

            this.engine.set_frequency(freq);
        }

        // Read frequency from SAB (Index 0) - Override if user is touching slider?
        // Let's let the sequencer control it for now, unless SAB changes?
        // Actually, the SAB is for the slider. If the slider is moved, it updates SAB[0].
        // We should probably prioritize the sequencer if it's running, or mix them.
        // For now, let's ignore SAB for frequency if we are sequencing, or just let the last one win.
        // But SAB is constantly read.

        // Let's only read SAB if we haven't set a frequency from a hap recently?
        // Or just let SAB override for testing manual control.

        const sabFreq = this.sab[0];
        if (sabFreq > 0 && sabFreq !== 440) { // Assuming 440 is default/unset in SAB init?
            // this.engine.set_frequency(sabFreq);
        }

        // Actually, let's comment out SAB reading for now so we can hear the sequencer
        // or only use it if it changes.

        this.engine.process(output);
        return true;
    }
}

// Register the processor
registerProcessor('beeter-processor', BeeterProcessor);
