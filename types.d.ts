type CholkColorName = string
type CholkStyleName = string
type CholkCssValue = string
type CholkColorValue = string
type CholkStyleValue = CholkColorName | CholkStyleName | CholkCssValue
type CholkLogValue = any
type CholkFuncName = string
type CholkStyleCollection = Record<string, string>
type CholkPresetCssValue = CholkStyleValue | CholkStyleValue[]
type CholkPresetLogValue = CholkLogValue | CholkLogValue[] | ((...args: any[]) => CholkLogValue)
type CholkPresetConfig = {
  css?: CholkPresetCssValue
  log?: CholkPresetLogValue
}
type CholkPresetCollection = Record<CholkFuncName, CholkPresetConfig>

type CholkSetting = {
  prefix?: CholkPresetConfig
  suffix?: CholkPresetConfig
}

type CholkColorConfig = Record<CholkColorName, CholkColorValue>
type CholkStyleConfig = Record<CholkStyleName, CholkCssValue>

type CholkConfig = {
  colors?: CholkColorConfig
  styles?: CholkStyleConfig
  baseStyle?: CholkPresetCssValue
  preset?: CholkPresetCollection
}

type CholkAffix = {
  _template: string
  _params: any[]
}

type CholkPresetLogger = (...args: any[]) => any[]
type Cholk = {
  (...args: any): Cholk
  _template: string
  _params: any[]
  _prefix: CholkAffix
  _suffix: CholkAffix
  _preset: CholkPresetLogger
  _presetLogger: CholkPresetLogger
  values(): any[]
  css(style: CholkCssValue): Cholk
  presetHandler(...args: any[]): Cholk
  [key: string | number | symbol]: any
}
