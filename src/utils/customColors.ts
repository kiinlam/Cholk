import { CholkColorConfig, CholkStyleCollection } from "../../types"

export default function customColors(STYLE: CholkStyleCollection, colors: CholkColorConfig) {
  for (let key in colors) {
    const value = colors[key]
    STYLE[key] = `color: ${value};`
    STYLE[
      `bg${key.slice(0, 1).toUpperCase()}${key.slice(1)}`
    ] = `background-color: ${value};`
  }
}
