import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screen/LoginScreen';
import OTPVerification from '../screen/OtpVerification';
import CreatePasswordScreen from '../screen/CreatePasswordScreen';
import BottomNavigation from './BottomNavigation';
import AddMemberScreen from '../screen/AddMembersScreen';
import SettingsScreen from '../screen/SettingsScreen';
import ManageAddressScreen from '../screen/ManageAddressScreen';
import ManageMemberScreen from '../screen/ManageMemberScreen';
import AboutUsScreen from '../screen/AboutUsScreen';
import ManageBranchesScreen from '../screen/ManageBranchScreen';
import NotificationScreen from '../screen/NotificationScreen';
import BookingsScreen from '../screen/BookingScreen';
import BookingSummaryScreen from '../screen/BookingSummaryScreen';
import SplashScreen from '../screen/SplashScreen';
import SignupWithOtpScreen from '../screen/SignUpWithOtpScreen';


const stack = createStackNavigator();

const ApplicationNavigation = () => {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
                <stack.Screen name="Splash" component={SplashScreen} />
                <stack.Screen name="Login" component={LoginScreen} />
                <stack.Screen name="SignUp" component={SignupWithOtpScreen} />
                <stack.Screen name="OtpVerification" component={OTPVerification} />
                <stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
                <stack.Screen name="Bottom" component={BottomNavigation} />
                <stack.Screen name="AddMember" component={AddMemberScreen} />
                <stack.Screen name="Settings" component={SettingsScreen} />
                <stack.Screen name="ManageAddress" component={ManageAddressScreen} />
                <stack.Screen name="ManageMember" component={ManageMemberScreen} />
                <stack.Screen name="AboutUs" component={AboutUsScreen} />
                <stack.Screen name="ManageBranch" component={ManageBranchesScreen} />
                <stack.Screen name="Notification" component={NotificationScreen} />
                <stack.Screen name="Booking" component={BookingsScreen} />
                <stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
            </stack.Navigator>
        </NavigationContainer>
    );
};
export default ApplicationNavigation;
