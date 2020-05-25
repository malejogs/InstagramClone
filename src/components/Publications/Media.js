import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;

const Photo = styled.Image`
  width: ${screenWidth}px;
  height: ${screenWidth}px;
`;

const Carousel = styled(Swiper)`
  height: ${screenWidth}px;
`;

const VideoItem = styled(Video)`
  width: ${screenWidth}px;
  height: ${screenWidth}px;
`;

const image =
  'https://images.unsplash.com/photo-1590198369102-415613977074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80';

const Media = ({item = {}, isShow = false}) => {
  const {webformatURL, videos} = item;
  const [indexCarousel, setIndexCarousel] = useState(0);
  return (
    <Carousel
      loop={false}
      showsButtons={false}
      paginationStyle={{margin: -57}}
      dotStyle={{height: 5, width: 5, color: '#A8A8A8'}}
      activeDotStyle={{height: 7, width: 7, color: '#0196FB'}}
      onIndexChanged={index => {
        setIndexCarousel(index);
      }}>
      {item.map((media, i) =>
        media.videos?.tiny.url ? (
          <VideoItem
            key={i}
            source={{
              uri: media.videos.tiny.url,
            }}
            repeat={true}
            resizeMode="cover"
            paused={!isShow || indexCarousel !== i}
          />
        ) : (
          <Photo
            key={i}
            source={{
              uri: media.webformatURL,
            }}
          />
        ),
      )}
    </Carousel>
  );
};

export default Media;
