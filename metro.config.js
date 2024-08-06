const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
<<<<<<< HEAD
 * https://facebook.github.io/metro/docs/configuration
=======
 * https://reactnative.dev/docs/metro
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
