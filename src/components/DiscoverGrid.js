import React from 'react';
import {Dimensions} from 'react-native';
import {Image, View} from 'react-native';
import styled from 'styled-components/native';
import {Row} from './shared/utils';

const screenWidth = Dimensions.get('window').width;
const HEIGHT = screenWidth * (1 / 3);
const HEIGHT_BIG = HEIGHT * 2;

const ImageGrid = styled.Image`
  margin: 1px;
`;

const BigColumn = ({image}) => (
  <View
    style={{
      flex: 2,
      height: HEIGHT_BIG,
    }}>
    <ImageGrid
      source={{
        uri: image?.webformatURL,
      }}
      style={{
        flex: 2,
      }}
    />
  </View>
);

const SmallColumn = ({images}) => (
  <View
    style={{
      flex: 1,
      height: HEIGHT * images.length,
    }}>
    {images.map((image, i) => (
      <ImageGrid
        key={`${image.id}-${i}`}
        source={{
          uri: image?.webformatURL,
        }}
        style={{
          flex: 1,
        }}
      />
    ))}
  </View>
);

export const Row1 = ({images}) => (
  <Row>
    <SmallColumn images={images.slice(0, 2)} />
    <BigColumn image={images[2]} />
  </Row>
);

export const Row2 = ({images}) => (
  <Row>
    {images.map(image => (
      <SmallColumn key={image.id} images={[image]} />
    ))}
  </Row>
);

export const Row3 = ({images}) => (
  <Row>
    <BigColumn image={images[0]} />
    <SmallColumn images={images.slice(1, 3)} />
  </Row>
);

const gridConfig = [
  (images, i) => <Row1 key={i} images={images} />,
  (images, i) => <Row2 key={i} images={images} />,
  (images, i) => <Row2 key={i} images={images} />,
  (images, i) => <Row3 key={i} images={images} />,
  (images, i) => <Row2 key={i} images={images} />,
  (images, i) => <Row2 key={i} images={images} />,
];

export const Grid = ({images, i}) => <>{gridConfig[i % 6](images, i)}</>;
