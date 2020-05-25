import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {Row} from '../shared/utils';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px;
`;

const IconAction = styled(Icon)`
  margin: 5px;
`;

const Actions = () => (
  <Container>
    <Row>
      <IconAction name="heart" size={30} color="#1c1c1c" />
      <IconAction name="message-circle" size={30} color="#1c1c1c" />
      <IconAction name="send" size={30} color="#1c1c1c" />
    </Row>
    <IconAction name="bookmark" size={30} color="#1c1c1c" />
  </Container>
);

export default Actions;
