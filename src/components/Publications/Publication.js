import React, {useRef} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import Avatar from '../Avatar';
import Actions from './Actions';
import Info from './Info';
import Comment from './Comment';
import Media from './Media';

const Header = styled.View`
  padding: 10px;
  padding-right: 16px;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  shadow-offset: 0px 0.5px;
  shadow-opacity: 0.2;
  shadow-radius: 0.5px;
`;

const User = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.Text`
  font-weight: bold;
  margin: 0 10px;
`;

const Publication = ({media = [], idElemShow = '', screen}) => {
  const {id = 0, user, tags, userImageURL, comments, likes} = media[0];
  return (
    <View>
      <Header>
        <User>
          <Avatar
            size={45}
            hasHistory={comments > 100}
            image={userImageURL}
            showButtons={false}
          />
          <UserName>{user}</UserName>
        </User>
        <Icon name="more-horizontal" size={20} color="#1c1c1c" />
      </Header>
      <Media item={media} isShow={idElemShow === id} screen={screen} />
      <Actions />
      <Info info={{user, tags, likes}} />
      <Comment comments={comments} />
    </View>
  );
};

export default Publication;
