export default function customStyles(STYLE: CholkStyleCollection, styles: CholkStyleConfig) {
  for (let key in styles) {
    let value = `${styles[key]}`
    if (!value.endsWith(';')) {
      value += ';'
    }
    STYLE[key] = value
  }
}
