import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from './navigation.types';

import ContactScreen from '../screens/contact/ContactScreen';
import LocationScreen from '../screens/location/LocationScreen';
import CameraScreen from '../screens/camera/CameraScreen';
import StorageScreen from '../screens/storage/StorageScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_ICONS: Record<keyof RootTabParamList, string> = {
  Contact: '📋',
  Location: '📍',
  Camera: '📷',
  Files: '📁',
  Alerts: '🔔',
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.55 }}>
              {TAB_ICONS[route.name]}
            </Text>
          ),
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: '#6b7280',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e5e7eb',
            borderTopWidth: 1,
            height: 62,
            paddingBottom: 8,
            paddingTop: 4,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Contact" component={ContactScreen} />
        <Tab.Screen name="Location" component={LocationScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Files" component={StorageScreen} />
        <Tab.Screen name="Alerts" component={NotificationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
