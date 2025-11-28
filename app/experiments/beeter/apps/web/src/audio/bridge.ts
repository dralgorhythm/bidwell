import wasmUrl from '@beeter/audio/beeter_audio_bg.wasm?url';
import processorUrl from './processor.ts?worker&url';

export class AudioBridge {
    context: AudioContext;
    sab: SharedArrayBuffer;
    sabView: Float32Array;
    workletNode: AudioWorkletNode | null = null;

    constructor() {
        this.context = new AudioContext();
        this.sab = new SharedArrayBuffer(1024); // 4KB
        this.sabView = new Float32Array(this.sab);
        // Set default frequency
        this.sabView[0] = 440.0;
    }

    async init() {
        try {
            console.log('Loading AudioWorklet from:', processorUrl);
            await this.context.audioWorklet.addModule(processorUrl);
            console.log('AudioWorklet module added');
        } catch (e) {
            console.error('Failed to add AudioWorklet module', e);
            throw new Error(`Failed to add AudioWorklet module: ${e instanceof Error ? e.message : String(e)}`);
        }

        this.workletNode = new AudioWorkletNode(this.context, 'beeter-processor');

        // Send Wasm module and SAB to Worklet
        // Fetch the wasm manually to pass the buffer (or let init handle url if supported)
        // wasm-bindgen init accepts URL or Buffer.

        this.workletNode.port.postMessage({
            type: 'init',
            wasmModule: wasmUrl,
            sab: this.sab
        });

        this.workletNode.connect(this.context.destination);
    }

    setFrequency(freq: number) {
        this.sabView[0] = freq;
    }

    resume() {
        this.context.resume();
    }

    scheduleHaps(haps: any[]) {
        if (this.workletNode) {
            this.workletNode.port.postMessage({
                type: 'haps',
                haps: haps
            });
        }
    }
}
