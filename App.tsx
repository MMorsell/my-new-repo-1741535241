import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from './src/screens/HomeScreen';
import { FriendsScreen } from './src/screens/FriendsScreen';
import { CreatePostScreen } from './src/screens/CreatePostScreen';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#1877F2',
          tabBarInactiveTintColor: '#666',
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerTitleStyle: {
            color: '#1877F2',
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreatePostScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-multiple" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}