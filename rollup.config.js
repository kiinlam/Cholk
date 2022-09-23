import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/cholk.ts',
  output: [
    // browser-friendly UMD build
    {
      name: 'Cholk',
      file: pkg.browser,
      format: 'umd',
    },
    {
      name: 'Cholk',
      file: 'dist/cholk.umd.min.js',
      format: 'umd',
      sourcemap: true,
      plugins: [terser()],
    },
    // ES module (for bundlers) build
    // Create separate chunks for all modules using the original module names as file names
    {
      format: 'es',
      dir: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  plugins: [typescript()],
}
