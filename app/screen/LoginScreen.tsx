import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  Modal,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../utils/SharedImages';
import {FONT_FAMILY, VALIDATE_MSG} from '../utils/Constants';
import InputField from '../components/Common/InputField';
import GradientButton from '../components/Common/GradientButton';
import LogoHeader from '../components/Common/LogoHeader';
import MaskBackground from '../components/Common/MaskBackground';
import Footer from '../components/Common/Footer';
import {useLoginMutation} from '../redux/service/LoginService';
import SpinnerIndicator from '../components/Common/SpinnerIndicator';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [loginAPIReq, {isLoading}] = useLoginMutation();
  const navigation = useNavigation();

  const languages = ['English (US)', 'Hindi', 'Tamil', 'Spanish'];

  const handleLogin = async () => {
    if (!mobile || !password) {
      Alert.alert('Validation Error', 'Please enter both mobile and password.');
      return;
    }
  
    try {
      const response = await loginAPIReq({
        Username: mobile,
        Password: password,
      }).unwrap();
  
      if (response?.SuccessFlag === 'true') {
        Alert.alert('Success', 'Login Successful!');
        navigation.navigate('Bottom');
      } else {
        const errorMsg =
          response?.Message?.[0]?.Message || response?.Code_Desc || VALIDATE_MSG.INPUT_VALIDATION_ERROR;
        Alert.alert('Login Failed', errorMsg);
      }
    } catch (error) {
      console.error('Login Error:', error);
      const serverMessage =
        error?.data?.Message?.[0]?.Message || error?.data?.Code_Desc || 'Something went wrong.';
      Alert.alert('Error', serverMessage);
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <MaskBackground position="left" flip />
          <View style={styles.content}>
            <LogoHeader />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.subText}>Please login to your account</Text>
            </View>

            <TouchableOpacity
              style={styles.languageSelector}
              onPress={() => setLanguageModalVisible(true)}>
              <Text style={styles.languageText}>English (US)</Text>
              <Image source={IMAGES.DownArrow} style={styles.chevronIcon} />
            </TouchableOpacity>

            <Modal
              visible={languageModalVisible}
              transparent
              animationType="slide">
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPressOut={() => setLanguageModalVisible(false)}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={languages}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
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
              <InputField
                icon={IMAGES.Envelope}
                placeholder="Mobile"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                maxLength={10}
              />
              <InputField
                icon={IMAGES.Lock}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <GradientButton
                onPress={handleLogin}
                title={isLoading ? 'Logging in...' : 'Log in'}
                disabled={isLoading}
              />
              {isLoading && (
             <SpinnerIndicator/>
              )}
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Terms and Conditions',
                    'Terms and Conditions content goes here.',
                  )
                }>
                <Text style={styles.link}>Terms and Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>
                  <Text style={styles.signUpPrefix}>
                    Don't have an account ?{' '}
                  </Text>
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
  flex: {flex: 1, backgroundColor: '#fff'},
  scrollViewContent: {flex: 1},
  container: {flex: 1, alignItems: 'center'},
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  welcomeContainer: {alignItems: 'center', marginTop: height * 0.02},
  welcomeText: {
    fontSize: width * 0.06,
    fontWeight: '600',
    color: '#00071A',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
  },
  subText: {
    fontSize: width * 0.04,
    color: '#7E8299',
    marginTop: height * 0.01,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01,
    width: width * 0.28,
    height: height * 0.04,
    borderWidth: 1,
    borderColor: '#E4E6EF',
    borderRadius: 100,
    paddingHorizontal: width * 0.025,
  },
  languageText: {
    fontSize: width * 0.035,
    flex: 1,
    fontWeight: '600',
    color: '#3F4254',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular,
  },
  chevronIcon: {
    width: width * 0.025,
    height: width * 0.025,
    tintColor: '#3F4254',
    resizeMode: 'contain',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: width * 0.075,
    borderRadius: 10,
    paddingHorizontal: width * 0.05,
  },
  languageOption: {
    padding: height * 0.015,
    fontSize: width * 0.04,
  },
  form: {
    marginTop: height * 0.02,
    width: '100%',
  },
  forgotPassword: {
    color: '#2376F9',
    fontWeight: '500',
    fontSize: width * 0.035,
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    textDecorationLine: 'underline',
  },
  link: {
    marginTop: height * 0.015,
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    fontSize: width * 0.035,
    fontWeight: '500',
    color: '#2376F9',
    textAlign: 'center',
  },
  signUpText: {
    textAlign: 'center',
  },
  signUpPrefix: {
    color: '#00071A',
    fontWeight: '500',
    fontSize: width * 0.035,
    lineHeight: height * 0.025,
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
  },
});

export default LoginScreen;
