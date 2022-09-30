import { CholkPresetConfig } from '../../types'
import appendStyle from './appendStyle'
import applyParams from './applyParams'
import handleStyleValue from './handleStyleValue'
import isTypeof from './isTypeof'

export default function handleAffix(affix: CholkPresetConfig = {}) {
  const target = {
    _template: '',
    _params: [],
  }
  affix?.css && appendStyle(target, handleStyleValue(affix?.css))
  affix?.log &&
    applyParams(
      target,
      isTypeof(affix?.log, 'Array') ? affix?.log : [affix?.log]
    )

  return target
}
