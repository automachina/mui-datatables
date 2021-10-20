import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    babel({
      babelHelpers: 'runtime',
      babelrc: true,
    }),
    terser({
      compress: {
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
  ],
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
};
