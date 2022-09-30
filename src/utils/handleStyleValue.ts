import { CholkPresetCssValue } from "../../types"
import isTypeof from "./isTypeof"
import STYLES from './styles'

/**
 * handleStyleValue
 * @param {string|string[]} value - colorName | styleName | cssValue | [colorName | styleName | cssValue, ...]
 * @returns {string}
 */
export default function handleStyleValue(value?: CholkPresetCssValue) {
  if (!value) return ''
  if (typeof value === 'string') {
    value = [value]
  }
  if (!isTypeof(value, 'Array')) {
    console.error('StyleValue should be String or Array')
    return ''
  }

  const styles = []
  for (let key of value) {
    if (typeof key === 'string') {
      if (key in STYLES.STYLE) {
        styles.push(STYLES.STYLE[key])
      } else {
        if (!key.endsWith(';')) {
          key += ';'
        }
        styles.push(key)
      }
    }
  }

  return styles.join('')
}
