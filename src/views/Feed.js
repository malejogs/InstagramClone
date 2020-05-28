import React, {useState, useEffect, useRef} from 'react';

import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import Publication from '../components/Publications/Publication';
import {getFakeDataFeed, getFakeDataStories} from '../api/index';
import Avatar from '../components/Avatar';

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

const ListAvatarStories = styled.FlatList`
  background-color: #fff;
  height: 120px;
  border-color: #e9e9e9;
  border-width: 1px;
`;

const ItemAvatarStories = styled.TouchableOpacity`
  margin: 10px;
  height: 100px;
`;
const AvatarStoryContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const UserNameStory = styled.Text``;

const UserNameOwnStory = styled.Text`
  color: #aeaeae;
`;

const Feed = ({navigation, route}) => {
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [stories, setStories] = useState([]);
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

  useEffect(() => {
    getFakeDataStories(20).then(storiesData => {
      setStories(storiesData);
    });
  }, []);

  const renderItem = ({item}) => (
    <Publication media={item} idElemShow={idElemShow} screen="Feed" />
  );

  const onViewRef = useRef(viewableItems => {
    setIdElemShow(viewableItems.viewableItems[0]?.item[0].id);
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const renderItemAvatarStories = ({item}) => (
    <ItemAvatarStories
      onPress={() => navigation.navigate('Stories', {stories})}>
      <AvatarStoryContainer>
        <Avatar image={item.image} size={75} hasHistory />
        <UserNameStory>{item.user}</UserNameStory>
      </AvatarStoryContainer>
    </ItemAvatarStories>
  );

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
        renderItem={renderItem}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        ListHeaderComponent={
          <ListAvatarStories
            horizontal
            showsHorizontalScrollIndicator={false}
            data={stories}
            renderItem={renderItemAvatarStories}
            keyExtractor={(item, i) => `${item.user}-${i}`}
            ListHeaderComponent={
              <ItemAvatarStories>
                <AvatarStoryContainer>
                  <Avatar
                    image={
                      'https://elpais.com/cultura/imagenes/2016/08/01/television/1470053691_755707_1470053945_noticia_fotograma.jpg'
                    }
                    size={75}
                    hasHistory
                  />
                  <UserNameOwnStory>Tu historia</UserNameOwnStory>
                </AvatarStoryContainer>
              </ItemAvatarStories>
            }
          />
        }
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true);
          const data = await getFakeDataFeed(5);
          setNewMedia(data);
          setIsRefreshing(false);
        }}
        keyExtractor={item => item[0].id.toString()}
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
