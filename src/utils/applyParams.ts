import appendStyle from './appendStyle'
import STYLES from './styles'

export default function applyParams(target: Cholk | CholkAffix, args: any[]) {
  let template = ''
  let params = []
  for (let i of args) {
    if (typeof i === 'string') {
      template += '%s'
    } else {
      template += '%o'
    }
    params.push(i)
  }
  if (STYLES.BASESTYLE && !target._template) {
    appendStyle(target, ';')
  }
  target._template += template
  target._params.push(...params)
}
