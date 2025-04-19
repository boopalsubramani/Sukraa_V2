import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, Dimensions, Alert, Modal, FlatList, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY, FONT_SIZE } from '../utils/Constants';
import InputField from '../components/Common/InputField';
import GradientButton from '../components/Common/GradientButton';
import LogoHeader from '../components/Common/LogoHeader';
import MaskBackground from '../components/Common/MaskBackground';
import Footer from '../components/Common/Footer';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const navigation = useNavigation();

  const languages = ['English (US)', 'Hindi', 'Tamil', 'Spanish'];

  const handleLogin = () => {
    // if (!mobile || !password) return Alert.alert('Validation Error', 'Please fill in all fields.');
    Alert.alert('Login', 'Login Successful!');
    navigation.navigate('Bottom')
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <MaskBackground position="left" flip />
            <LogoHeader />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.subText}>Please login to your account</Text>
            </View>

            <TouchableOpacity style={styles.languageSelector} onPress={() => setLanguageModalVisible(true)}>
              <Text style={styles.languageText}>English (US)</Text>
              <Image source={IMAGES.DownArrow} style={styles.chevronIcon} />
            </TouchableOpacity>

            <Modal visible={languageModalVisible} transparent animationType="slide">
              <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setLanguageModalVisible(false)}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={languages}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => {
                        setLanguageModalVisible(false);
                        Alert.alert('Selected Language', item);
                      }}>
                        <Text style={styles.languageOption}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            <View style={styles.form}>
              <InputField icon={IMAGES.Envelope} placeholder="Mobile" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" maxLength={10} />
              <InputField icon={IMAGES.Lock} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
            
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
     
              <GradientButton onPress={handleLogin} title="Log in" />
              <TouchableOpacity onPress={() => Alert.alert('Terms and Conditions', 'Terms and Conditions content goes here.')}>
                <Text style={styles.link}>Terms and Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>
                  <Text style={styles.signUpPrefix}>Don't have an account ? </Text>
                  <Text style={styles.link}>Sign up here</Text>
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
  flex: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1,justifyContent:"center" },
  content: { paddingHorizontal: width * 0.05, paddingVertical: height * 0.05 },
  welcomeContainer: { alignItems: 'center', marginTop: 20 },
  welcomeText: {
    fontSize: 24, fontWeight: '600', color: '#00071A',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold
  },
  subText: {
    fontSize: 16, color: '#7E8299', marginTop: 8, fontWeight: '500',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular
  },
  languageSelector: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', marginTop: 10, width: 110, height: 34,
    borderWidth: 1, borderColor: '#E4E6EF', borderRadius: 100, paddingHorizontal: 10
  },
  languageText: {
    fontSize: 14, flex: 1, fontWeight: '600', color: '#3F4254',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular
  },
  chevronIcon: {
    width: 10, height: 10, tintColor: '#3F4254', resizeMode: 'contain'
  },
  modalOverlay: {
    flex: 1, justifyContent: 'center', backgroundColor: '#000000aa'
  },
  modalContent: {
    backgroundColor: '#fff', margin: 30, borderRadius: 10, paddingHorizontal: 20
  },
  languageOption: { padding: 10, fontSize: 16 },
  form: { marginTop: 10,alignItems:'center' },
  forgotPassword: {
    color: '#2376F9', fontWeight: '500',
    fontSize: FONT_SIZE.SM, fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    textDecorationLine: 'underline',textAlign:"right",width:width * 0.70
  },
  link: {
    marginTop: 12, fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    fontSize: 14, fontWeight: '500', color: '#2376F9', textAlign: 'center'
  },
  signUpText: { textAlign: 'center' },
  signUpPrefix: {
    color: '#00071A', fontWeight: '500', fontSize: 14,
    lineHeight: 18, fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium
  },
});

export default LoginScreen;

