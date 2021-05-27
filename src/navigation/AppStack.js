import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {AuthContext} from '../navigation/AuthProvider';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreenStack() {
  const {logout} = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#5f9ea0'},
      }}>
      <Stack.Screen
        name="Gallery"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <MaterialCommunityIcons
              name="logout"
              color={'#ffffff'}
              size={30}
              onPress={() => logout()}></MaterialCommunityIcons>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#5f9ea0'},
      }}>
      <Stack.Screen name="Profile" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#5f9ea0',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreenStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={'#5f9ea0'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreenStack}
        options={{
          tabBarLabel: 'Edit',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-cog"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
