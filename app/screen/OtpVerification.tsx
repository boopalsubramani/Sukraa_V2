import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Dimensions, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientButton from '../components/Common/GradientButton';
import BackArrow from '../components/Common/BackArrow';
import LogoHeader from '../components/Common/LogoHeader';
import MaskBackground from '../components/Common/MaskBackground';
import { FONT_FAMILY } from '../utils/Constants';
import Footer from '../components/Common/Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const OTP_LENGTH = 4;
const RESEND_TIMEOUT = 20;

const OTPVerification = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [isResendActive, setIsResendActive] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0 && !isResendActive) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setIsResendActive(true);
    }
    return () => clearInterval(interval);
  }, [timer, isResendActive]);

  const handleOtpChange = (value, index) => {
    value = value.slice(-1);
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = () => {
    if (isResendActive) {
      setTimer(RESEND_TIMEOUT);
      setIsResendActive(false);
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    console.log('Verifying OTP:', otpValue);
    navigation.navigate('CreatePassword');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <MaskBackground />
            <BackArrow />
            <View style={{ alignItems: 'center' }}>
              <LogoHeader />
            </View>
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.subtitle}>Enter OTP sent to +966 5 1234 5678</Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={[styles.otpInput, digit && styles.otpInputFilled]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={value => handleOtpChange(value, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  ref={ref => (inputRefs.current[index] = ref)}
                />
              ))}
            </View>
            <TouchableOpacity onPress={handleResendOTP} disabled={!isResendActive}>
              <Text style={[styles.resendText, !isResendActive && styles.resendTextInactive]}>
                {isResendActive ? 'Resend OTP' : `Resend OTP in ${timer}s`}
              </Text>
            </TouchableOpacity>
            <GradientButton onPress={handleVerify} title="Verify" />
          </View>
        </View>
      </ScrollView>
      <Footer/>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.05,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#00071A',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: FONT_FAMILY.fontFamilyWixSemiBold
  },
  subtitle: {
    fontSize: 16,
    color: '#7E8299',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 18,
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    fontWeight: '500'
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 54,
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E6EF',
    textAlign: 'center',
    fontWeight: '600',
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  otpInputFilled: {
    borderColor: '#4c669f',
    backgroundColor: '#f0f4ff',
  },
  resendText: {
    fontSize: 12,
    color: '#3F4254',
    textAlign: 'center',
    lineHeight:26,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
  },
  resendTextInactive: {
    color: '#999',
  },
});

export default OTPVerification;

