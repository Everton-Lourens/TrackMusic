/**
 * @format
 */

import 'react-native';
import React from 'react';
<<<<<<< HEAD
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
=======
import App from '..';

// Note: import explicitly to use the types shipped with jest.
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
