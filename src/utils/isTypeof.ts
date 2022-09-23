export default function isTypeof(target: any, typeName: string) {
  return Object.prototype.toString.call(target).slice(8, -1) === typeName
}
