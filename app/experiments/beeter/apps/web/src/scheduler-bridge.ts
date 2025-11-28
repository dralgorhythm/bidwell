import SchedulerWorker from './worker/scheduler.ts?worker';

export class SchedulerBridge {
    worker: Worker;

    onHaps: ((haps: any[]) => void) | null = null;

    constructor() {
        this.worker = new SchedulerWorker();
        this.worker.onmessage = (e) => {
            if (e.data.type === 'haps') {
                // console.log('Received Haps:', e.data.haps);
                if (this.onHaps) {
                    this.onHaps(e.data.haps);
                }
            }
        };
    }

    start() {
        this.worker.postMessage({ type: 'start' });
    }

    stop() {
        this.worker.postMessage({ type: 'stop' });
    }

    updatePattern(code: string) {
        this.worker.postMessage({ type: 'updatePattern', code });
    }

    updateTime(time: number) {
        this.worker.postMessage({ type: 'time', time });
    }
}
