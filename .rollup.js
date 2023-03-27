import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { resolve } from 'path';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.ts', '.js'];

const preventTreeShakingPlugin = {
  name: 'no-threeshaking',
  resolveId: (id, importer) => (importer ? null : { id, moduleSideEffects: 'no-treeshake' }),
};

const isGithub = process.env.ENV === 'GITHUB';
const minified = {
  comments: false,
  compact: true,
  minified: true,
};

/** @type {import('rollup').RollupOptions} */
const config = {
  input: './.build/index.ts',
  output: { dir: '.build', format: 'esm' },
  plugins: [
    preventTreeShakingPlugin,
    nodeResolve({ extensions }),
    typescript(),
    babel({
      extensions,
      babelHelpers: 'runtime',
      include: resolve('.build', 'src', '**', '*.ts'),
      exclude: ['node_modules/**'],
      configFile: './.babelrc.js',
      ...(isGithub ? minified : {}),
    }),
  ],
};

export default config;
