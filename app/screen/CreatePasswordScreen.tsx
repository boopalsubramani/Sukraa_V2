import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../utils/SharedImages';
import InputField from '../components/Common/InputField';
import GradientButton from '../components/Common/GradientButton';
import BackArrow from '../components/Common/BackArrow';
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
          <View style={styles.contentContainer}>
            <BackArrow />
            <MaskBackground />
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
      <Footer/>
    </KeyboardAvoidingView>
  );
}

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
    textAlign: 'center',
    marginBottom: 8,
    color: "#00071A",
    fontFamily: FONT_FAMILY.fontFamilyWixSemiBold
  },
  subtitle: {
    fontSize: 16,
    color: '#7E8299',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
  },
  inputContainer: {
   alignItems:"center",
    marginBottom: 20,
  },
});

export default CreatePasswordScreen;

