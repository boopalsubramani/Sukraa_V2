import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { IMAGES } from '../utils/SharedImages';
import HomeScreen from '../screen/HomeScreen';
import TrendScreen from '../screen/TrendScreen';
import ProfileScreen from '../screen/ProfileScreen';
import BookingsScreen from '../screen/BookingScreen';

const Bottom = createBottomTabNavigator();

const TabIcon = ({ source }: { source: any }) => (
    <Image
        source={source}
        style={{ width: 24, height: 24, resizeMode: 'contain' }}
    />
);

const BottomNavigation = () => {
    return (
        <Bottom.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    height: 60,
                    paddingBottom: 5,
                },
            }}
        >
            <Bottom.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={IMAGES.BottomHome} />
                    ),
                }}
            />
            <Bottom.Screen
                name="Booking"
                component={BookingsScreen}
                options={{
                    tabBarLabel: 'Booking',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={IMAGES.BottomCalender} />
                    ),
                }}
            />
            <Bottom.Screen
                name="Trend"
                component={TrendScreen}
                options={{
                    tabBarLabel: 'Trend',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={IMAGES.BottomTrend} />
                    ),
                }}
            />
            <Bottom.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={IMAGES.BottomProfile} />
                    ),
                }}
            />
        </Bottom.Navigator>
    );
};

export default BottomNavigation;
