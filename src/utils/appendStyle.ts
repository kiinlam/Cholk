import STYLES from './styles'

export default function appendStyle(target: Cholk | CholkAffix, style: CholkCssValue) {
  if (style.endsWith(';')) {
    const template = target._template
    const params = target._params
    if (template.endsWith('%c')) {
      params[params.length - 1] += style
    } else {
      target._template += '%c'
      params.push(STYLES.BASESTYLE + style)
    }
  }
}
