import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import Avatar from '../Avatar';
import {Spacer, InfoLink, RowSpaceBetween, Row} from '../shared/utils';
import Icon from 'react-native-vector-icons/Feather';

const Container = styled.View`
  padding: 0 15px 25px;
`;

const AddComment = styled(InfoLink)`
  flex: 1;
`;

const userPhoto =
  'https://elpais.com/cultura/imagenes/2016/08/01/television/1470053691_755707_1470053945_noticia_fotograma.jpg';

const Comment = ({comments}) => (
  <Container>
    <InfoLink>Ver los {comments} comentarios</InfoLink>
    <Spacer height={10} />
    <Row>
      <Avatar size={35} image={userPhoto} />
      <AddComment> Agregar un comentario...</AddComment>
      <Text>
        🔥 ❤️ <Icon name="plus-circle" size={15} color="#a7a7a7" />
      </Text>
    </Row>
  </Container>
);

export default Comment;
