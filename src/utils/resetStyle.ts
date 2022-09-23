export default function resetStyle(target: Cholk) {
  const template = target._template
  const params = target._params
  if (template.endsWith('%c')) {
    params[params.length - 1] = ';'
  } else {
    target._template += '%c'
    params.push(';')
  }
}
