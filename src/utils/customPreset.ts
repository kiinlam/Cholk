import { CholkPresetCollection } from '../../types'
import isTypeof from './isTypeof'

export default function customPreset(
  PRESET: CholkPresetCollection,
  preset: CholkPresetCollection
) {
  if (!isTypeof(preset, 'Object')) {
    console.error('config.preset should be Object')
    return
  }
  for (let [funcName, config] of Object.entries(preset)) {
    if (isTypeof(config, 'Object')) {
      PRESET[funcName] = config
    } else {
      console.error(`config.preset.${funcName} should be Object`)
    }
  }
}
