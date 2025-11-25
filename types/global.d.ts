import type { Vi } from 'vitest'

declare global {
  var jest: Vi & {
    fn: Vi['fn']
    mock: Vi['mock']
    spyOn: Vi['spyOn']
    useFakeTimers: Vi['useFakeTimers']
    useRealTimers: Vi['useRealTimers']
    advanceTimersByTime: Vi['advanceTimersByTime']
    clearAllMocks: Vi['clearAllMocks']
    resetAllMocks: Vi['resetAllMocks']
    restoreAllMocks: Vi['restoreAllMocks']
  }
}
