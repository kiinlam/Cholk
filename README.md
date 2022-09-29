![Cholk](./assets/Social.png)

# Highlights

- Expressive API
- No dependencies
- Ability to chain styles
- Support css styles
- Easy to customize
- Does not change Console API

# Install

```sh
npm install cholk
```

# Usage

### Import

```js
import Cholk from 'cholk'
```

### Base usage

```js
const cholk = Cholk()
console.log(...cholk.red('C').green('H').yellow('O').blue('L').pink('K'))
```

### Multiple params

```js
console.log(...cholk.red('Hello', 'Cholk'))
console.log(...cholk.red('Hello')('Cholk'))
```

### Chain style

```js
console.log(...cholk.red.bgYellow('Cholk'))
console.log(...cholk.red('Hello').bgYellow.bold('Cholk'))
```

### use css value

```js
console.log(...cholk.css('color: #16cb80;').bgYellow('Cholk'))
```

### Extend colors

```js
Cholk.extend({
  colors: {
    myRedColor: 'rgb(255 0 0 / 50%)',
    myGreenColor: '#b7eb8f',
    myBlueColor: '#194bd7a8',
  },
})
console.log(...cholk.myRedColor.bgMyGreenColor('My').myBlueColor.bgMyRedColor('Cholk'))
```

### Extend styles

```js
Cholk.extend({
  styles: {
    pad: 'padding:2px 5px;',
    circle: 'border-radius:100%;background-color:#808080;color:white;',
    tag: 'color: #c41d7f;background: #fff0f6;border:1px solid #ffadd2;',
  },
})
console.log(...cholk.circle('My').tag('Cholk'))
```

### Extend baseStyle

```js
Cholk.extend({
  baseStyle: ['bgMyRedColor', 'gap', 'pad', 'border-radius:3px;'],
})
console.log(...cholk('My').tag('Cholk'))
```

### Presets

```js
Cholk.extend({
  baseStyle: '',
  preset: {
    tag: {
      css: ['tag', 'pad', 'border-radius:4px;', 'bgYellow'],
      log: (text) => {
        return `[${new Date().toLocaleDateString()}] ` + 'preset.tag: ' + text
      },
    },
  },
})
console.log(...cholk.tag('Cholk'))
console.log(...cholk.tag('Cholk! '.repeat(3)))
```

### Set prefix on Cholk Instance

```js
const prefixCholk = Cholk({
  prefix: {
    css: ['tag', 'pad'],
    log: '[prefix]',
  },
})
console.log(...prefixCholk.gap('Cholk'))
```

### set suffix on Cholk Instance

```js
const suffixCholk = Cholk({
  suffix: {
    css: ['tag', 'pad', 'gap'],
    log: '[suffix]',
  },
})
console.log(...suffixCholk('Cholk'))
```

# Builtin style

### Bases

- nil - Add an empty style
- gap - Add a `margin-left: 0.5em` style

### Font styles

- bold
- italic
- underline

### Colors

- blue - `#1890ff`
- cyan - `#13c2c2`
- gold - `#faad14`
- green - `#52c41a`
- lime - `#a0d911`
- magenta - `#eb2f96`
- orange - `#fa8c16`
- pink - `#ffc0cb`
- purple - `#722ed1`
- red - `#f5222d`
- white - `#fff`
- yellow - `#fadb14`
- gery - `#5e5e5e`

### Background colors

- bgBlue - `#1890ff`
- bgCyan - `#13c2c2`
- bgGold - `#faad14`
- bgGreen - `#52c41a`
- bgLime - `#a0d911`
- bgMmagenta - `#eb2f96`
- bgOrange - `#fa8c16`
- bgPink - `#ffc0cb`
- bgPurple - `#722ed1`
- bgRed - `#f5222d`
- bgWhite - `#fff`
- bgYellow - `#fadb14`
- bgGery - `#5e5e5e`

### List all Styles

```js
import Cholk from 'cholk'
Cholk.styles()
```

Alias:

```js
Cholk.getStyle()
// or
Cholk.getStyles()
```

# API

### CholkColorName

Keys of Colors and Background colors

Example: `red`, `blue`, `bgRed`, `bgBlue`, ...

Use `Cholk.extend` to add custom CholkColorName

```js
Cholk.extend({
  colors: {
    // add a new colorName
    // then you can use
    // cholk.newColor() and cholk.bgNewColor()
    newColor: 'rgb(255 0 0 / 50%)',
    // or override
    red: '#e12f2fe0',
  },
})
```

### CholkStyleName

Keys of Styles

Example: `bold`, `italic`, `underline`, ...

Use `Cholk.styles()` to get a list of Styles

Use`Cholk.extend` to add custom CholkStyleName

```js
Cholk.extend({
  styles: {
    // add a new styleName with css rules
    // then you can use
    // cholk.newStyle()
    newStyle: 'border-width: 3px; border-radius: 4px;',
    // or override
    bold: 'font-weight: 900;',
  },
})
```

### CholkCssValue

String of CSS rules

Example: `border-width: 3px; border-radius: 4px;`

### CholkLogValue

Type: any

Example: `100`, `true`, `'123'`, `{foo: 'bar'}`, `function(){}`, ...

### `Cholk(setting)`

Return a Proxy object fox cholk

```js
setting: {
   prefix: {
       css: CholkColorName | CholkStyleName | CholkCssValue | [CholkColorName | CholkStyleName | CholkCssValue, ...],
       log: CholkLogValue | [CholkLogValue, ...]
     },
   suffix: {
       css: CholkColorName | CholkStyleName | CholkCssValue | [CholkColorName | CholkStyleName | CholkCssValue, ...],
       log: CholkLogValue | [CholkLogValue, ...]
     }
}
```

Example:

```js
const cholk = Cholk({
  prefix: {
    css: 'background: black; color: white;',
    log: '[Cholk]',
  },
  suffix: {
    css: 'background: green; color: yellow;',
    log: '[v1.0.0]',
  },
})
console.log(...cholk.gap.red('foo').gap())
console.log(...cholk.gap.green('bar').gap())
```

### `cholk.<style> [.<style>...](value, [value...])`

```js
const cholk = Cholk()
cholk.red.bold.underline('Hello ', 'World').gap.blue.underline('Hello ', 'Cholk')
console.log(...cholk)
```

### `cholk.css(<CholkCssValue>)`

```js
const cholk = Cholk()
cholk.css('color: #16cb80;')('Hello ', 'Cholk')
console.log(...cholk)
```

### `cholk.reset()`

```js
const cholk = Cholk()
cholk.red('Hello ')('Cholk')
console.log(...cholk)
cholk.red('Hello ').reset('Cholk')
console.log(...cholk)
```

### `cholk.values()`

```js
const cholk = Cholk()
cholk.red('Hello ')('Cholk')
console.log(cholk.values()) // return [template, ...params]
console.log(...cholk) // consume the values
console.log(cholk.values()) // empty values -> []
```

## Static method

### `Cholk.styles()`

```js
const styles = Cholk.styles()
console.log(styles)
```

### `Cholk.extend(config)`

```js
config: {
   colors: {
     [CholkColorName]: CholkCssValue  // accept css color value
   },
   styles: {
     [CholkStyleName]: CholkCssValue // css rules
   },
   baseStyle: CholkColorName | CholkStyleName | CholkCssValue | [CholkColorName | CholkStyleName | CholkCssValue, ...]
   preset: {
     [CholkFuncName]: {
       css: CholkColorName | CholkStyleName | CholkCssValue | [CholkColorName | CholkStyleName | CholkCssValue, ...],
       log: CholkLogValue | [CholkLogValue, ...] | (...args) => CholkLogValue
     }
   },
}
```

Example:

```js
Cholk.extend({
  colors: {
    lightDark: 'rgb(96, 96, 96)',
    lightGreen: 'rgb(71, 193, 25)',
  },
  styles: {
    pad: 'padding: 3px 8px;',
    tag: 'color: rgb(255, 244, 208);',
    radiusLeft: 'border-top-left-radius: 3px;border-bottom-left-radius: 3px;',
    radiusRight: 'border-top-right-radius: 3px;border-bottom-right-radius: 3px;',
  },
  baseStyle: 'pad',
  preset: {
    tag: {
      css: ['tag', 'bgLightDark'],
      log: (...args) => {
        return ['Cholk', ...args]
      },
    },
    tagSuccess: {
      css: ['tag', 'bgLightGreen'],
      log: (...args) => {
        return args
      },
    },
    tagError: {
      css: ['tag', 'bgRed'],
      log: (...args) => {
        return ['Error', ...args]
      },
    },
  },
})
const values = cholk.tag(' v1.0.0').tagSuccess('100% ').tagError().values()
console.log(values)
console.log(...cholk)
console.log(...cholk.radiusLeft.tag(' v1.0.0').radiusRight.tagSuccess('100%%').tagError()) // use `%%` to escape `%`
console.log(...cholk.tagSuccess('100%'))
console.log(...cholk.tagError().reset.gap('something wrong'))
```

# Hints

### Be careful of `%`

```js
console.log('%s%s', 'String Specifier is `%s`, ', 'it formats the value as a string')
// expects: "String Specifier is `%s`, it formats the value as a string"
// actually: "String Specifier is `it formats the value as a string`, %s"
```

Exactly:

```js
// use `%%` to escape `%` in strings
console.log('%s%s', 'String Specifier is `%%s`, ', 'it formats the value as a string')
// => String Specifier is `%s`, it formats the value as a string
```

### `nil` vs `reset`

#### With baseStyle

```js
import Cholk from 'cholk'

Cholk.extend({
  baseStyle: 'padding: 4px 8px; border: 1px solid #888;',
})

const cholk = Cholk()

const cholkValues = cholk.red('Red')('Normal').values()
console.log(cholkValues)
console.log(...cholk)

// nil() => just append a empty style `;`, use as a style separator
const cholkNilValues = cholk.red('Red').nil('Nil').values()
console.log(cholkNilValues)
console.log(...cholk)

// reset() => replace styles with empty style `;`, use to clear baseStyle
const cholkResetValues = cholk.red('Red').reset('Reset').values()
console.log(cholkResetValues)
console.log(...cholk)
```

#### without baseStyle

```js
import Cholk from 'cholk'

Cholk.extend({
  baseStyle: '',
})

const cholk = Cholk()

const cholkValues = cholk.red('Red')('Normal').values()
console.log(cholkValues)
console.log(...cholk)

// nil() => just append a empty style `;`, use as a style separator
const cholkNilValues = cholk.red('Red').nil('Nil').values()
console.log(cholkNilValues)
console.log(...cholk)

// reset() => replace styles with empty style `;`, use to clear baseStyle
const cholkResetValues = cholk.red('Red').gap.reset('Reset').values()
console.log(cholkResetValues)
console.log(...cholk)
```
