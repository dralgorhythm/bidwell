use wasm_bindgen::prelude::*;
use std::f32::consts::PI;

#[wasm_bindgen]
pub struct AudioEngine {
    sample_rate: f32,
    phase: f32,
    frequency: f32,
}

#[wasm_bindgen]
impl AudioEngine {
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f32) -> Self {
        console_error_panic_hook::set_once();
        Self {
            sample_rate,
            phase: 0.0,
            frequency: 440.0,
        }
    }

    pub fn set_frequency(&mut self, freq: f32) {
        self.frequency = freq;
    }

    pub fn process(&mut self, output: &mut [f32]) {
        for sample in output.iter_mut() {
            *sample = (self.phase * 2.0 * PI).sin();
            self.phase += self.frequency / self.sample_rate;
            if self.phase > 1.0 {
                self.phase -= 1.0;
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_audio_engine_process() {
        let mut engine = AudioEngine::new(44100.0);
        let mut buffer = [0.0; 128];
        engine.process(&mut buffer);
        
        // Check if buffer is not empty (silence)
        let has_signal = buffer.iter().any(|&x| x != 0.0);
        assert!(has_signal, "Buffer should contain signal");
        
        // Check if values are within [-1.0, 1.0]
        let in_range = buffer.iter().all(|&x| x >= -1.0 && x <= 1.0);
        assert!(in_range, "Signal should be within valid range");
    }
}
