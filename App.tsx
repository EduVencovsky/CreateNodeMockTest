/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

interface Measure {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

const App = () => {
  const [measure, setMeasure] = useState<Measure>();
  const viewRef = useRef<View | null>(null);

  const onLayout = () => {
    // gets called
    console.log('onLayout');
    console.log('measure is truthy', !!viewRef.current?.measure); // => true
    viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
      // never gets called
      console.log('measure');
      setMeasure({x, y, width, height, pageX, pageY});
    });
  };

  return (
    <SafeAreaView>
      <View onLayout={onLayout} ref={viewRef}>
        <Text>Test Text</Text>
        <Text>
          {measure
            ? Object.values(measure).reduce((prev, next) => prev + next)
            : ''}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
