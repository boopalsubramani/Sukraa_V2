import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Image, TouchableOpacity } from 'react-native';
import { IMAGES } from '../utils/SharedImages';
import InputField from '../components/Common/InputField';
import GradientButton from '../components/Common/GradientButton';
import LogoHeader from '../components/Common/LogoHeader';
import MaskBackground from '../components/Common/MaskBackground';
import { FONT_FAMILY } from '../utils/Constants';
import Footer from '../components/Common/Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SignupScreen = ({ navigation }: any) => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const handleGetOTP = () => {
        if (fullName && phoneNumber) {
            Alert.alert('Success', 'OTP sent successfully!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('OtpVerification', {
                        fullName,
                        phoneNumber,
                    }),
                },
            ]);
        } else {
            Alert.alert('Error', 'Please fill in the required fields');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <MaskBackground position='right' />
                    <View style={styles.contentContainer}>
                        <LogoHeader />
                        <View style={styles.content}>
                            <Text style={styles.title}>Welcome to SDL</Text>
                            <Text style={styles.subtitle}>Create your SDL account</Text>
                            <InputField
                                icon={IMAGES.User}
                                placeholder="Full Name"
                                value={fullName}
                                onChangeText={setFullName}
                            />
                            <InputField
                                icon={IMAGES.Phone}
                                placeholder="Phone number / User name"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                            />
                            <InputField
                                icon={IMAGES.Envelope}
                                placeholder="Mail (optional)"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                            <InputField
                                icon={IMAGES.Calender}
                                placeholder="Date of birth"
                                value={dateOfBirth}
                                onChangeText={setDateOfBirth}
                            />

                            <GradientButton onPress={handleGetOTP} title="Get OTP" />

                            <TouchableOpacity onPress={() => Alert.alert('Terms and Conditions', 'Terms and Conditions content goes here.')}>
                                <Text style={styles.link}>Terms and Conditions</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ textAlign: 'center' }}>
                                    <Text style={styles.signUpPrefix}>Already have an account ? </Text>
                                    <Text style={styles.link}>Login here</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        alignItems: 'center',
        marginTop: screenHeight * 0.02,
    },
    title: {
        fontSize: screenWidth * 0.06,
        fontWeight: '600',
        color: '#00071A',
        fontFamily: FONT_FAMILY.fontFamilyWixSemiBold,
    },
    subtitle: {
        marginBottom: screenHeight * 0.02,
        fontSize: screenWidth * 0.04,
        color: '#7E8299',
        marginTop: screenHeight * 0.01,
        fontWeight: '500',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular,
    },
    signUpPrefix: {
        color: '#00071A',
        fontWeight: '500',
        fontSize: screenWidth * 0.035,
        lineHeight: screenHeight * 0.025,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
    link: {
        marginTop: screenHeight * 0.015,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        fontSize: screenWidth * 0.035,
        fontWeight: '500',
        color: '#2376F9',
        textAlign: 'center',
    },
});

export default SignupScreen;

