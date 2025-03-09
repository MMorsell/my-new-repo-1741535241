import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from './src/screens/HomeScreen';
import { FriendsScreen } from './src/screens/FriendsScreen';
import { CreatePostScreen } from './src/screens/CreatePostScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Modal, View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const [isCreatePostVisible, setCreatePostVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
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
          component={EmptyComponent}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={size} />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity {...props} onPress={() => setCreatePostVisible(true)} />
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

      <Modal
        visible={isCreatePostVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <CreatePostScreen onClose={() => setCreatePostVisible(false)} />
      </Modal>
    </View>
  );
};

const EmptyComponent = () => null;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}