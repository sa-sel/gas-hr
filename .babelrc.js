module.exports = {
  plugins: ['@babel/plugin-transform-runtime', [require('@babel/plugin-proposal-class-properties'), { loose: true }]],
  presets: [[require('@babel/preset-env').default, { targets: { node: 'current' } }], [require('@babel/preset-typescript').default]],
};
