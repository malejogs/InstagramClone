import React from 'react';
import styled from 'styled-components/native';
import Avatar from '../Avatar';
import {Spacer, Row, InfoText, InfoTextBold, InfoLink} from '../shared/utils';

const InfoContainer = styled.View`
  padding: 0 15px 10px;
`;

const image =
  'https://images.unsplash.com/photo-1590198369102-415613977074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80';

const Info = ({info}) => (
  <InfoContainer>
    <Row>
      <Avatar size={25} image={image} />
      <InfoText>
        {' '}
        Les gusta a <InfoTextBold>carlotinchi</InfoTextBold> y{' '}
        <InfoTextBold>{info.likes} personas más</InfoTextBold>
      </InfoText>
    </Row>
    <Spacer height="10" />
    <InfoText>
      <InfoTextBold>{info.user}</InfoTextBold> {info.tags}...{' '}
      <InfoLink>más</InfoLink>
    </InfoText>
  </InfoContainer>
);

export default Info;
