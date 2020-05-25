import React, {useState, useEffect, useRef} from 'react';

import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import Publication from '../components/Publications/Publication';
import {getFakeDataFeed} from '../api/index';

const Header = styled.View`
  padding: 12px 15px;
  background-color: #fafafa;
  flex-direction: row;
  justify-content: space-between;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1px;
`;

const SafeArea = styled(SafeAreaView)`
  background-color: #fafafa;
  flex: 1;
`;

const Logo = styled.Image`
  height: 35px;
  width: 120px;
`;

const ListPublications = styled.FlatList`
  background-color: #fff;
  flex: 1;
`;

const Feed = () => {
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [idElemShow, setIdElemShow] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFooterRefreshing, setIsFooterRefreshing] = useState(false);
  const setNewMedia = newMedia => setMedia([...newMedia, ...media]);

  const setOldMedia = oldMedia => setMedia([...media, ...oldMedia]);

  const getMediaPerPage = async page => {
    const mediaData = await getFakeDataFeed(page);
    setOldMedia(mediaData);
    setIsFooterRefreshing(false);
  };

  useEffect(() => {
    getMediaPerPage(page);
  }, [page]);

  const onViewRef = React.useRef(viewableItems => {
    setIdElemShow(viewableItems.viewableItems[0]?.item[0].id);
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  return (
    <SafeArea>
      <Header>
        <Icon name="camera" size={30} color="#1c1c1c" />
        <Logo source={require('../../assets/images/logo.png')} />
        <Icon name="send" size={30} color="#1c1c1c" />
      </Header>
      <ListPublications
        data={media}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Publication media={item} idElemShow={idElemShow} />
        )}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        ListHeaderComponent={
          <Logo source={require('../../assets/images/logo.png')} />
        }
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true);
          const data = await getFakeDataFeed(5);
          setNewMedia(data);
          setIsRefreshing(false);
        }}
        keyExtractor={item => item[0]?.id.toString()}
        onEndReached={() => {
          setIsFooterRefreshing(true);
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={isFooterRefreshing && <ActivityIndicator />}
      />
    </SafeArea>
  );
};

export default Feed;
