import React from 'react';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Avatar = ({size, hasHistory = false, image}) => (
  <LinearGradient
    colors={['#CA1D7E', '#E35157', '#F2703F']}
    start={{x: 0.0, y: 1.0}}
    end={{x: 1.0, y: 1.0}}
    style={{
      height: size * (hasHistory ? 1 : 0.9),
      width: size * (hasHistory ? 1 : 0.9),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size / 2,
    }}>
    <Image
      source={
        image
          ? {
              uri: image,
            }
          : require('../../assets/images/profile.png')
      }
      style={{
        width: size * 0.9,
        height: size * 0.9,
        borderRadius: (size * 0.9) / 2,
        alignSelf: 'center',
        borderColor: '#fff',
        borderWidth: size * 0.03,
      }}
    />
  </LinearGradient>
);

export default Avatar;
