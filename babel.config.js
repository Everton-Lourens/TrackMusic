module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
<<<<<<< HEAD
=======
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './',
        },
      },
    ],
    [
      '@babel/plugin-transform-class-properties',
      { loose: true }
    ],
    [
      '@babel/plugin-transform-private-methods',
      { loose: true }
    ],
    [
      '@babel/plugin-transform-private-property-in-object',
      { loose: true }
    ],
  ],
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
};
