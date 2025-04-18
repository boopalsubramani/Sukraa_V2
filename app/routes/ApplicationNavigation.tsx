import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignUpScreen';
import OTPVerification from '../screen/OtpVerification';
import CreatePasswordScreen from '../screen/CreatePasswordScreen';
import BottomNavigation from './BottomNavigation';


const stack = createStackNavigator();

const ApplicationNavigation = () => {
    return (
        <NavigationContainer>
            <stack.Navigator screenOptions={{ headerShown: false }}>
                <stack.Screen name="Login" component={LoginScreen} />
                <stack.Screen name="SignUp" component={SignupScreen} />
                <stack.Screen name="OtpVerification" component={OTPVerification} />
                <stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
                <stack.Screen name="Bottom" component={BottomNavigation} />
            </stack.Navigator>
        </NavigationContainer>
    );
};
export default ApplicationNavigation;
