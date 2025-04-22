import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignUpScreen';
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
                <stack.Screen name="AddMember" component={AddMemberScreen} />
                <stack.Screen name="Settings" component={SettingsScreen} />
                <stack.Screen name="ManageAddress" component={ManageAddressScreen} />
                <stack.Screen name="ManageMember" component={ManageMemberScreen} />
                <stack.Screen name="AboutUs" component={AboutUsScreen} />
                <stack.Screen name="ManageBranch" component={ManageBranchesScreen} />
                <stack.Screen name="Notification" component={NotificationScreen} />

            </stack.Navigator>
        </NavigationContainer>
    );
};
export default ApplicationNavigation;
