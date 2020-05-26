import React, {useState} from 'react';
import {StyleSheet, Dimensions, Platform, View} from 'react-native';
import Animated from 'react-native-reanimated';

import Story from './Story';

const {
  event,
  concat,
  abs,
  sub,
  sin,
  divide,
  multiply,
  greaterThan,
  cond,
} = Animated;
const {width} = Dimensions.get('window');
const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === 'ios' ? 2 : 1.2;

const Stories = ({stories}) => {
  const [x] = useState(new Animated.Value(0));

  const getStyle = index => {
    const offset = index * width;

    const inputRange = [offset - width, offset + width];

    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / ratio, -width / ratio],
      extrapolate: 'clamp',
    });
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [angle, -angle],
      extrapolate: 'clamp',
    });

    const alpha = abs(rotateY);
    const gamma = sub(angle, alpha);
    const beta = sub(Math.PI, alpha, gamma);
    const w = sub(
      width / 2,
      multiply(width / 2, divide(sin(gamma), sin(beta))),
    );
    const translateX1 = cond(greaterThan(rotateY, 0), w, multiply(w, -1));

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        {perspective},
        {translateX},
        {rotateY: concat(rotateY, 'rad')},
        {translateX: translateX1},
      ],
    };
  };

  const getMaskStyle = index => {
    const offset = index * width;
    const inputRange = [offset - width, offset, offset + width];
    const opacity = x.interpolate({
      inputRange,
      outputRange: [0.75, 0, 0.75],
      extrapolate: 'clamp',
    });
    return {
      backgroundColor: 'black',
      ...StyleSheet.absoluteFillObject,
      opacity,
    };
  };

  return (
    <View style={styles.container}>
      {stories.map((story, i) => (
        <Animated.View style={getStyle(i)} key={story.id}>
          <Story {...{story}} />
        </Animated.View>
      ))}
      <Animated.ScrollView
        style={StyleSheet.absoluteFillObject}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={width}
        contentContainerStyle={{width: width * stories.length}}
        onScroll={event(
          [
            {
              nativeEvent: {
                contentOffset: {x},
              },
            },
          ],
          {useNativeDriver: true},
        )}
        decelerationRate={0.99}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Stories;
