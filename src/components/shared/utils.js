import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';

export const Spacer = styled(View)`
  height: ${({height}) => height || 0}px;
  width: ${({width}) => width || 0}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RowSpaceBetween = styled(Row)`
  justify-content: space-between;
`;

export const InfoText = styled.Text`
  font-size: 14px;
`;

export const InfoTextBold = styled(InfoText)`
  font-weight: bold;
`;

export const InfoLink = styled.Text`
  color: #a7a7a7;
`;
