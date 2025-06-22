import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../contexts/themeContext';
import { useSavedNews } from '../contexts/savedNewsContext';

import Home from './Home';
import SearchScreen from './SearchScreen';
import SavedNewsScreen from './SavedNewsScreen';
import AccountNavigator from './navigation/AccountNavigator';

const Tab = createBottomTabNavigator();

const Authenticated = () => {
  const { theme } = useTheme();
  const { savedNews } = useSavedNews();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subtleText,
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 11,
          marginBottom: 5,
        },
        tabBarStyle: {
          paddingTop: 5,
          height: 60,
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Saved') iconName = 'bookmark';
          else if (route.name === 'Profile') iconName = 'user';
          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen 
        name="Saved" 
        component={SavedNewsScreen} 
        options={{
          tabBarBadge: savedNews.length > 0 ? savedNews.length : null,
        }}
      />
      <Tab.Screen 
        name="Profile"
        component={AccountNavigator}
      />
    </Tab.Navigator>
  );
};

export default Authenticated;