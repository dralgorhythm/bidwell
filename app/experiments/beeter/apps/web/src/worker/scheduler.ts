import { Pattern } from '@strudel/core';
import { mini } from '@strudel/mini';

let currentPattern: Pattern | null = null;
let isRunning = false;
let audioContextTime = 0; // Synced from main thread
let lastScheduledTime = 0;
const lookahead = 0.1; // 100ms window
const interval = 25; // 25ms check

console.log('Scheduler worker loaded');
console.log('Mini function:', mini);
try {
    const testPat = mini("bd");
    console.log('Test pattern:', testPat);
    console.log('Test query:', testPat.query(0, 1));
} catch (e) {
    console.error('Test pattern failed:', e);
}

self.onmessage = (e) => {
    if (e.data.type === 'updatePattern') {
        try {
            // Parse mini notation: s("bd sd")
            // We wrap it in a function to evaluate it
            // For now, let's assume the input is a valid mini string like 's("bd sd")'
            // We might need a safer way to eval, but for MVP we use Strudel's tools.
            // Actually, evaluate() takes code.
            // Let's try to just use mini() directly if we pass raw pattern strings.

            // If we pass 'bd sd', we can do:
            currentPattern = mini(e.data.code);
            console.log('Pattern updated:', currentPattern);
            // console.log('Pattern duration:', currentPattern.duration); // Check if it has duration
        } catch (err) {
            console.error(err);
        }
    } else if (e.data.type === 'time') {
        audioContextTime = e.data.time;
        // if (Math.random() < 0.01) console.log('Scheduler time updated:', audioContextTime);
    } else if (e.data.type === 'start') {
        isRunning = true;
        lastScheduledTime = audioContextTime;
        console.log('Scheduler started at:', lastScheduledTime);

        // Debug: Set default pattern if none exists
        if (!currentPattern) {
            try {
                currentPattern = mini("bd hh sd hh");
                console.log('Set default debug pattern:', currentPattern);
            } catch (err) {
                console.error('Failed to set default pattern:', err);
            }
        }
    } else if (e.data.type === 'stop') {
        isRunning = false;
    }
};

setInterval(() => {
    if (!isRunning || !currentPattern) return;

    // Calculate window
    const start = lastScheduledTime;
    const end = audioContextTime + lookahead;

    // Debug logging
    if (Math.random() < 0.1) console.log('Scheduler loop:', { start, end, diff: end - start });

    if (end > start) {
        // Query the pattern for events in this window
        if (currentPattern) {
            // console.log('Querying pattern:', start, end);
            const haps = currentPattern.query(start, end);
            // console.log('Query result:', haps.length);

            if (haps.length > 0) {
                // Map Strudel 'whole' time to 'when' for the processor
                const mappedHaps = haps.map(h => ({
                    ...h,
                    when: h.whole, // Assuming 1 cycle = 1 second for now
                    value: h.value
                }));
                console.log('Scheduler generating haps:', mappedHaps);
                self.postMessage({ type: 'haps', haps: mappedHaps });
            }
        }

        lastScheduledTime = end;
    }
}, interval);
