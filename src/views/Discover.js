import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import {Grid} from '../components/DiscoverGrid';
import {getPhotos} from '../api/index';
import {Row, Spacer} from '../components/shared/utils';

const SafeArea = styled(SafeAreaView)`
  background-color: #fafafa;
  flex: 1;
`;

const Header = styled.View`
  padding: 10px;
  padding-bottom: 5px;
  background-color: #fafafa;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1px;
`;

const ListPublications = styled.FlatList`
  background-color: #fff;
  margin: 0 -1px;
  flex: 1;
`;

const SearchBox = styled.View`
  flex-direction: row;
  flex: 1;
  position: relative;
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  margin: 9px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  background-color: #efefef;
  border-width: 0;
  height: 35px;
  padding-left: 33px;
  margin-right: 10px;
  border-radius: 7px;
`;

const FilterTag = styled.View`
  border-radius: 5px;
  background-color: #fff;
  align-self: flex-start;
  padding: 5px 20px;
  margin: 0 5px;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.5;
  shadow-radius: 1px;
`;

const FilterTagText = styled.Text`
  font-weight: 600;
`;

const ListFilters = styled.FlatList`
  background-color: #fff;
  height: 30px;
  margin-left: -5px;
`;

const filtersData = [
  {icon: 'tv', text: 'IGTV'},
  {icon: 'shopping-bag', text: 'Tienda'},
  {icon: '', text: 'Decoración'},
  {icon: '', text: 'Viajes'},
  {icon: '', text: 'Arte'},
  {icon: '', text: 'Estilo'},
  {icon: '', text: 'Naturaleza'},
  {icon: '', text: 'TV y cine'},
  {icon: '', text: 'Musica'},
];

const Discover = () => {
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFooterRefreshing, setIsFooterRefreshing] = useState(false);

  const setNewMedia = newMedia => setMedia([...newMedia, ...media]);

  const setOldMedia = oldMedia => setMedia([...media, ...oldMedia]);

  let dataDate = 'old';

  const getMediaPerPage = async page => {
    const mediaData = await getPhotos(page, 18);
    const media = [];
    for (let i = 0; i < 6; i++) {
      const data = mediaData.splice(0, 3);
      media.push(data);
    }
    setOldMedia(media);
    setIsFooterRefreshing(false);
  };

  useEffect(() => {
    getMediaPerPage(page);
  }, [page]);

  const renderItem = ({item, index}) => <Grid images={item} i={index} />;

  const renderItemFilter = ({item}) => (
    <FilterTag>
      <FilterTagText>
        {item.icon && <Icon name={item.icon} size={15} color="#747474" />}{' '}
        {item.text}
      </FilterTagText>
    </FilterTag>
  );

  return (
    <SafeArea>
      <Header>
        <Row>
          <SearchBox>
            <SearchInput placeholder={'Bursca'} />
            <SearchIcon name="search" size={18} color="#9C9C9C" />
          </SearchBox>
          <Icon name="maximize" size={25} color="#747474" />
        </Row>
        <Spacer height={10} />
        <ListFilters
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filtersData}
          renderItem={renderItemFilter}
          keyExtractor={(item, i) => `${item.name}-${i}`}
        />
      </Header>

      <ListPublications
        data={media}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true);
          //   const data = await getPhotos(page, 18);
          //   setNewMedia(data);
          setIsRefreshing(false);
        }}
        keyExtractor={(item, i) => `${item[0]?.id}-${page}-${i}`}
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

export default Discover;
