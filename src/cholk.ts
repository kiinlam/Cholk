import STYLES from './utils/styles'
import appendStyle from './utils/appendStyle'
import applyParams from './utils/applyParams'
import customColors from './utils/customColors'
import customPreset from './utils/customPreset'
import customStyles from './utils/customStyles'
import generateValues from './utils/generateValues'
import handleAffix from './utils/handleAffix'
import handlePresetCall from './utils/handlePresetCall'
import handleStyleValue from './utils/handleStyleValue'
import resetStyle from './utils/resetStyle'
import { CholkConfig, CholkInastace, CholkSetting } from '../types'

const { STYLE, PRESET } = STYLES

customColors(STYLE, {
  blue: '#1890ff', // 蓝色
  cyan: '#13c2c2', // 青色
  gold: '#faad14', // 金色
  green: '#52c41a', // 绿色
  lime: '#a0d911', // 青柠
  magenta: '#eb2f96', // 洋红
  orange: '#fa8c16', // 橙色
  pink: '#ffc0cb', // 粉色
  purple: '#722ed1', // 紫色
  red: '#f5222d', // 红色
  white: '#fff', // 白色
  yellow: '#fadb14', // 黄色
  grey: '#5e5e5e', // 灰黑
})

const proxyHandler: ProxyHandler<CholkInastace> = {
  get: function (target, key, receiver) {
    if (key === 'css') {
      // redirect to function cholk.css()
      return target.css
    }

    if (key === 'reset') {
      resetStyle(target)
      return receiver
    }

    if (key in PRESET) {
      handlePresetCall(target, PRESET[key as string])
      return target.presetHandler
    }

    if (key in STYLE) {
      appendStyle(target, STYLE[key as string])
      return receiver
    }

    return Reflect.get(target, key, receiver)
  },
  set: function () {
    return false
  },
}

/**
 * Cholk
 * @param {Object} setting
 * @param {Object} setting.prefix
 * @param {string|string[]} setting.prefix.css - colorName | styleName | cssValue | [colorName | styleName | cssValue, ...]
 * @param {string|string[]} setting.prefix.log - logValue | [logValue, ...]
 * @param {Object} setting.suffix
 * @param {string|string[]} setting.suffix.css - colorName | styleName | cssValue | [colorName | styleName | cssValue, ...]
 * @param {string|string[]} setting.suffix.log - logValue | [logValue, ...]
 * @returns proxyCholk
 *
 * setting: {
 *    prefix: {
 *        css: colorName | styleName | cssValue | [colorName | styleName | cssValue, ...],
 *        log: logValue | [logValue, ...]
 *      },
 *    suffix: {
 *        css: colorName | styleName | cssValue | [colorName | styleName | cssValue, ...],
 *        log: logValue | [logValue, ...]
 *      }
 * }
 */
function Cholk(setting: CholkSetting = {}) {
  let proxyCholk: CholkInastace

  const cholk: CholkInastace = (...args) => {
    applyParams(cholk, args)
    return proxyCholk
  }

  cholk._template = ''
  cholk._params = []
  cholk._prefix = handleAffix(setting.prefix)
  cholk._suffix = handleAffix(setting.suffix)
  cholk._preset = function (...args) {
    return []
  }
  cholk._presetLogger = cholk._preset

  cholk.values = function () {
    return generateValues(cholk)
  }

  /**
   * css
   * cholk.css('color: #aabbcc;').bgBlue('cholk')
   * // => ['%c', 'color: #aabbcc;background-color: blue', 'cholk']
   */
  cholk.css = function (style) {
    if (typeof style === 'string') {
      appendStyle(cholk, style)
    }
    return proxyCholk
  }

  cholk.presetHandler = function (...args) {
    const value = cholk._presetLogger(...args)
    // restore _presetLogger
    cholk._presetLogger = cholk._preset
    // apply preset
    return cholk(...value)
  }

  cholk[Symbol.iterator] = function* () {
    yield* generateValues(cholk)
    cholk._template = ''
    cholk._params = []
  }

  proxyCholk = new Proxy<CholkInastace>(cholk, proxyHandler)
  return proxyCholk
}

/**
 * Cholk.extend
 * @param {*} config
 *
 * config: {
 *    colors: {
 *      [colorName]: colorValue  // accept css color value
 *    },
 *    styles: {
 *      [styleName]: cssValue // css rules
 *    },
 *    baseStyle: colorName | styleName | cssValue | [colorName | styleName | cssValue, ...]
 *    preset: {
 *      [funcName]: {
 *        css: colorName | styleName | cssValue | [colorName | styleName | cssValue, ...],
 *        log: logValue | [logValue, ...] | (...args) => logValue
 *      }
 *    },
 * }
 */
Cholk.extend = function (config: CholkConfig = {}) {
  const { colors = {}, styles = {}, preset = {}, baseStyle } = config
  customColors(STYLE, colors)
  customStyles(STYLE, styles)
  customPreset(PRESET, preset)
  if (typeof baseStyle !== 'undefined') {
    STYLES.BASESTYLE = handleStyleValue(baseStyle)
  }
}

/**
 * Cholk.styles
 * Cholk.getStyle
 * Cholk.getStyles
 * @returns list of available styles
 */
Cholk.styles =
  Cholk.getStyle =
  Cholk.getStyles =
    function () {
      return {
        ...STYLE,
      }
    }

export default Cholk
