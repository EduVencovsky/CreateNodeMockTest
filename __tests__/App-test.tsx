/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {NativeMethods, Text, View} from 'react-native';

it('renders correctly', () => {
  const [x, y, width, height, pageX, pageY] = [1, 2, 3, 4, 5, 6];
  const expectedText = x + y + width + height + pageX + pageY + '';

  const {root} = renderer.create(<App />, {
    createNodeMock: () => {
      // never gets called
      console.log('createNodeMock');
      return {
        measure: (fn: Parameters<NativeMethods['measure']>[0]) => {
          // never gets called
          console.log('createNodeMock measure');
          fn(x, y, width, height, pageX, pageY);
        },
      };
    },
  });

  // make sure I'm querying text correctly
  const testText = root
    .findAllByType(Text)
    .find(text => text.props.children === 'Test Text');
  expect(testText).toBeTruthy();

  // trigger onLayout
  root.findByType(View).props.onLayout();

  act(() => {
    // [ 'Test Text', '' ]
    console.log(root.findAllByType(Text).map(text => text.props.children));

    const measureText = root
      .findAllByType(Text)
      .find(text => text.props.children === expectedText);
    expect(measureText).toBeTruthy(); // => fails
  });
});
