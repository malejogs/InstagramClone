import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from '../views/Feed';

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const tabs = [
  {name: 'Feed', component: Feed},
  {name: 'Settings', component: SettingsScreen},
];

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {tabs.map(({name, component}, index) => (
          <Tab.Screen key={index} name={name} component={component} />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
