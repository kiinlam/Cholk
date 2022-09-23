import isTypeof from './isTypeof'

export default function handleLogValue(target: Cholk, value: CholkPresetLogValue) {
  target._presetLogger = function (...args) {
    if (typeof value === 'undefined') return []

    if (typeof value === 'function') {
      value = value(...args)
    }
    if (isTypeof(value, 'Array')) {
      return value
    } else {
      return [value]
    }
  }
}
