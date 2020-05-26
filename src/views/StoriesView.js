import React from 'react';
import {StatusBar, View} from 'react-native';
import Stories from '../components/Stories/Stories';
import Modal from 'react-native-modalbox';

const StoriesView = ({route, navigation}) => (
  <>
    <View style={{backgroundColor: 'black', flex: 1}} />
    <Modal
      useNativeDriver="true"
      isOpen={true}
      swipeToClose
      backButtonClose
      swipeArea={250}
      onClosed={() => navigation.goBack()}>
      <StatusBar barStyle="light-content" />
      <Stories stories={route.params.stories} />
    </Modal>
  </>
);

export default StoriesView;
