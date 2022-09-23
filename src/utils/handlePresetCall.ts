import appendStyle from './appendStyle'
import handleLogValue from './handleLogValue'
import handleStyleValue from './handleStyleValue'

export default function handlePresetCall(target: Cholk, preset: CholkPresetConfig) {
  const { css, log } = preset
  appendStyle(target, handleStyleValue(css))
  handleLogValue(target, log)
}
