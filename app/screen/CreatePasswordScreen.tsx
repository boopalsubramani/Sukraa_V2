
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../utils/SharedImages';
import InputField from '../components/Common/InputField';
import GradientButton from '../components/Common/GradientButton';
import LogoHeader from '../components/Common/LogoHeader';
import MaskBackground from '../components/Common/MaskBackground';
import { FONT_FAMILY } from '../utils/Constants';
import Footer from '../components/Common/Footer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreatePasswordScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignIn = () => {
    if (password !== confirmPassword) {
      return;
    }
    console.log('Password created:', password);
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <MaskBackground />
          <View style={styles.contentContainer}>
            {/* <BackArrow /> */}
            <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
              <Image source={IMAGES.LeftArrow} style={styles.backArrowImage} />
            </TouchableOpacity>
            <LogoHeader />
            <Text style={styles.title}>Create Password</Text>
            <Text style={styles.subtitle}>Secure your account with a strong password</Text>
            <View style={styles.inputContainer}>
              <InputField
                icon={IMAGES.Lock}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <InputField
                icon={IMAGES.Lock}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />
              <GradientButton onPress={handleSignIn} title="Sign In" />
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    alignItems: 'center',
    width: '100%',
  },
  backArrow: {
    position: 'absolute',
    top: screenHeight * 0.02,
    left: screenWidth * 0.05,
    zIndex: 1,
  },
  backArrowImage: {
    width: screenWidth * 0.04,
    height: screenWidth * 0.04,
    tintColor: '#00071A',
    resizeMode: 'contain', 
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
  inputContainer: {
    marginBottom: screenHeight * 0.02,
  },
});

export default CreatePasswordScreen;


