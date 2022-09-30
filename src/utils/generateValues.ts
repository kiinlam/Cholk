import { CholkInastace } from "../../types"

/**
 * generateValues
 * 生成模板字符串
 * @param {object} cholk
 */
export default function generateValues(cholk: CholkInastace) {
  let tmpl = cholk._template
  let params = [...cholk._params]
  const { _template: preTmpl = '', _params: preParams = [] } = cholk._prefix
  const { _template: sufTmpl = '', _params: sufParams = [] } = cholk._suffix

  // preTmpl could be one of %c、%c%s、%s
  if (preTmpl === '%c' && tmpl.startsWith('%c')) {
    // only style
    params[0] = preParams[0] + params[0]
  } else {
    tmpl = preTmpl + tmpl
    params = [...preParams, ...params]
  }

  // sufTmpl could be one of %c、%c%s、%s
  if (tmpl.endsWith('%c') && sufTmpl.startsWith('%c')) {
    if (sufTmpl === '%c') {
      params[params.length - 1] = params[params.length - 1] + sufParams[0]
    } else if (sufTmpl === '%c%s') {
      tmpl = tmpl + '%s'
      const lastParam = params.pop()
      sufParams[0] = lastParam + sufParams[0]
      params = [...params, ...sufParams]
    }
  } else {
    tmpl += sufTmpl
    params = [...params, ...sufParams]
  }

  return [tmpl, ...params]
}
