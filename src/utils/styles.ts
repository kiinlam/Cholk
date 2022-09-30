import { CholkCssValue, CholkPresetCollection, CholkStyleCollection } from "../../types"

const STYLE: CholkStyleCollection = {
  bold: 'font-weight: bold;',
  italic: 'font-style: italic;',
  underline: 'text-decoration: underline;',
  nil: ';',
  gap: 'margin-left: 0.5em;',
}
const PRESET: CholkPresetCollection = {}
let BASESTYLE: CholkCssValue = ''

export default {
  STYLE,
  PRESET,
  BASESTYLE,
}