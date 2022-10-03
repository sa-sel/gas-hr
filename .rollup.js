import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

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

const config = {
  input: './.build/index.ts',
  output: { dir: '.build', format: 'esm' },
  plugins: [
    typescriptPaths({
      absolute: false,
      preserveExtensions: true,
      tsConfigPath: './.build/tsconfig.json',
    }),
    preventTreeShakingPlugin,
    nodeResolve({ extensions }),
    babel({
      extensions,
      babelHelpers: 'runtime',
      exclude: ['node_modules/**'],
      configFile: './.babelrc.js',
      ...(isGithub ? minified : {}),
    }),
  ],
};

export default config;
