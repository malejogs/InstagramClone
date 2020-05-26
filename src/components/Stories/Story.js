import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Avatar from '../Avatar';
import {Spacer, Row} from '../shared/utils';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  position: relative;
`;

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const Media = styled.Image`
  ${StyleSheet.absoluteFillObject};
  width: null;
  height: null;
  border-radius: 5px;
  resize-mode: cover;
`;

const Footer = styled.View`
  position: absolute;
  flex-direction: row;
  bottom: 30px;
  align-items: center;
  padding: 10px;
  flex: 1;
`;

const InputStory = styled.TextInput`
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.4);
  height: 50px;
  flex: 1;
  border-radius: 45px;
  padding-left: 50px;
  color: blue;
  font-size: 18px;
  margin-right: 15px;
  color: white;
`;

const InputIconContainer = styled.View`
  position: absolute;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 5px;
  border-radius: 50px;
  margin: 5.5px 7px;
`;

const InputStoryContainer = styled.View`
  flex-direction: row;
  position: relative;
  flex: 1;
`;

const UserInfo = styled(Row)`
  padding: 13px;
  justify-content: space-between;
`;

const UserName = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 15px;
`;

const UserTime = styled(UserName)`
  font-weight: 400;
  font-size: 15px;
`;

const Story = ({story: {image, user, avatar, time}}) => {
  const navigation = useNavigation();
  return (
    <SafeArea>
      <Container>
        <Media
          source={{
            uri: image,
          }}
        />
        <UserInfo>
          <Row>
            <Avatar size={40} image={avatar} />
            <Spacer width={10} />
            <UserName>{user}</UserName>
            <Spacer width={10} />
            <UserTime>{time}h</UserTime>
          </Row>
        </UserInfo>
      </Container>
      <Footer>
        <InputStoryContainer>
          <InputIconContainer>
            <Icon name="camera" color="white" size={26} />
          </InputIconContainer>

          <InputStory
            placeholder={'Enviar mensaje'}
            placeholderTextColor="white"
          />
        </InputStoryContainer>
        <Text>
          <Icon name="send" color="white" size={27} />
          <Spacer width={15} />
          <Icon name="more-horizontal" color="white" size={24} />
        </Text>
      </Footer>
    </SafeArea>
  );
};

export default Story;
