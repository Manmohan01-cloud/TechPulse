import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsDetailScreen from './NewsDetailScreen';
import LandingPage from './LandingPage';
import { useTheme } from '../contexts/themeContext';

const Stack = createNativeStackNavigator();

const Home = () => {
    const { theme } = useTheme();

    return (
        <Stack.Navigator initialRouteName='LandingPage'>
            <Stack.Screen
                options={{ headerShown: false }}
                name='LandingPage'
                component={LandingPage}
            />
            <Stack.Screen
                name='Details'
                component={NewsDetailScreen}
                options={{
                    headerStyle: { backgroundColor: theme.card },
                    headerTintColor: theme.text,
                    headerTitleStyle: { color: theme.text },
                }}
            />
        </Stack.Navigator>
    );
}

export default Home;