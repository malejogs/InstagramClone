import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import Avatar from '../components/Avatar';

import Feed from '../views/Feed';
import Discover from '../views/Discover';
import StoriesView from '../views/StoriesView';
import {Animated} from 'react-native-reanimated';

const componentText = (name = 'Instagram') => () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{name}</Text>
  </View>
);

const tabs = [
  {
    name: 'Feed',
    component: Feed,
    icon: <Icon name="home" size={30} color="#1c1c1c" />,
  },
  {
    name: 'Search',
    component: Discover,
    icon: <Icon name="search" size={30} color="#1c1c1c" />,
  },
  {
    name: 'Add Photo',
    component: componentText('Add Photo or Video'),
    icon: <Icon name="plus-square" size={30} color="#1c1c1c" />,
  },
  {
    name: 'Likes',
    component: componentText('Likes'),
    icon: <Icon name="heart" size={30} color="#1c1c1c" />,
  },
  {
    name: 'Profile',
    component: componentText('Profile'),
    icon: (
      <Avatar
        size={35}
        image={
          'https://elpais.com/cultura/imagenes/2016/08/01/television/1470053691_755707_1470053945_noticia_fotograma.jpg'
        }
      />
    ),
  },
];

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    style={{paddingTop: 10}}
    labeled={false}
    tabBarOptions={{
      showLabel: false,
    }}
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) =>
        tabs.find(x => x.name === route.name).icon,
    })}>
    {tabs.map(({name, component}, index) => (
      <Tab.Screen key={index} name={name} component={component} />
    ))}
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="Stories"
        component={StoriesView}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
