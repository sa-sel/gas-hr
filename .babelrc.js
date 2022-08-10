module.exports = {
  plugins: ['@babel/plugin-transform-runtime'],
  presets: [[require('@babel/preset-env').default, { targets: { node: 'current' } }], [require('@babel/preset-typescript').default]],
};
