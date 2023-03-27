module.exports = {
  format: 'esm',
  plugins: [
    ['@babel/plugin-transform-runtime', { useESModules: true }],
    [require('@babel/plugin-proposal-class-properties'), { loose: true }],
  ],
  presets: [[require('@babel/preset-env').default, { targets: { node: 'current' } }], [require('@babel/preset-typescript').default]],
};
