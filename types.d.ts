export type CholkColorName = string
export type CholkStyleName = string
export type CholkCssValue = string
export type CholkColorValue = string
export type CholkStyleValue = CholkColorName | CholkStyleName | CholkCssValue
export type CholkLogValue = any
export type CholkFuncName = string
export type CholkStyleCollection = Record<string, string>
export type CholkPresetCssValue = CholkStyleValue | CholkStyleValue[]
export type CholkPresetLogValue = CholkLogValue | CholkLogValue[] | ((...args: any[]) => CholkLogValue)
export type CholkPresetConfig = {
  css?: CholkPresetCssValue
  log?: CholkPresetLogValue
}
export type CholkPresetCollection = Record<CholkFuncName, CholkPresetConfig>

export type CholkSetting = {
  prefix?: CholkPresetConfig
  suffix?: CholkPresetConfig
}

export type CholkColorConfig = Record<CholkColorName, CholkColorValue>
export type CholkStyleConfig = Record<CholkStyleName, CholkCssValue>

export type CholkConfig = {
  colors?: CholkColorConfig
  styles?: CholkStyleConfig
  baseStyle?: CholkPresetCssValue
  preset?: CholkPresetCollection
}

export type CholkAffix = {
  _template: string
  _params: any[]
}

export type CholkPresetLogger = (...args: any[]) => any[]

export interface CholkInastace {
  (...args: any): CholkInastace
  _template: string
  _params: any[]
  _prefix: CholkAffix
  _suffix: CholkAffix
  _preset: CholkPresetLogger
  _presetLogger: CholkPresetLogger
  values(): any[]
  css(style: CholkCssValue): CholkInastace
  presetHandler(...args: any[]): CholkInastace
  [key: string | number | symbol]: any
}

declare function Cholk(setting?: CholkSetting): CholkInastace

declare namespace Cholk {
  function extend(config?: CholkConfig): void
  function styles(): CholkStyleCollection
  function getStyle(): CholkStyleCollection
  function getStyles(): CholkStyleCollection
}

export default Cholk
