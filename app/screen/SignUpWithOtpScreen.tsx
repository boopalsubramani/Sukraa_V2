// React imports
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


// Redux APIs
import { useSignUpMutation } from '../redux/service/SignUpService';
import { useOtp_SendMutation } from '../redux/service/Otp_SendService';
import { useOtp_VerificationMutation } from '../redux/service/Otp_VerificationService';

// Components
import InputField from '../components/Common/InputField';
import GradientButton from '../components/Common/GradientButton';
import LogoHeader from '../components/Common/LogoHeader';
import MaskBackground from '../components/Common/MaskBackground';
import Footer from '../components/Common/Footer';
import { FONT_FAMILY } from '../utils/Constants';
import { IMAGES } from '../utils/SharedImages';

const { width, height } = Dimensions.get('window');
const OTP_LENGTH = 4;
const RESEND_TIMEOUT = 20;

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
}

interface ApiResponse {
  SuccessFlag: string;
  Message: { Message: string }[];
}

const SignupWithOtpScreen = ({ navigation }: any) => {
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<TextInput[]>([]);
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [isResendActive, setIsResendActive] = useState(false);

  const [signUpAPI] = useSignUpMutation();
  const [sendOtpAPI] = useOtp_SendMutation();
  const [verifyOtpAPI] = useOtp_VerificationMutation();

  useEffect(() => {
    if (step === 'otp' && timer > 0 && !isResendActive) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) setIsResendActive(true);
  }, [timer, step, isResendActive]);

  const updateForm = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleGetOTP = async () => {
    const { fullName, phone, dob } = form;
    if (!agreed || !fullName || !phone || !dob) {
      return Alert.alert('Fill all fields & agree terms');
    }
    try {
      const res: ApiResponse = await signUpAPI({
        Name: fullName,
        UserName: phone,
        Gender: 'F',
        DOB: dob,
        Mobile_No: phone,
      }).unwrap();
      if (res.SuccessFlag === 'true') {
        setStep('otp');
        setTimer(RESEND_TIMEOUT);
        setIsResendActive(false);
      } else {
        Alert.alert('Error', res.Message?.[0]?.Message || 'Signup failed');
      }
    } catch (e) {
      Alert.alert('Error', 'Unexpected error');
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) return Alert.alert('Enter full OTP');
    try {
      const res: ApiResponse = await verifyOtpAPI({
        Username: form.phone,
        Mobile_No: form.phone,
        OTP_Code: code,
      }).unwrap();
      if (res.SuccessFlag === 'true') {
        Alert.alert('Success', res.Message?.[0]?.Message || 'OTP Verified', [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('CreatePassword'),
          },
        ]);
      } else {
        Alert.alert('Invalid OTP', res.Message?.[0]?.Message || 'Try again');
      }
    } catch (e) {
      Alert.alert('Error', 'Unexpected error');
    }
  };

  const handleOtpChange = (val: string, i: number) => {
    const newOtp = [...otp];
    if (val.length > 1) {
      const pasted = val.slice(0, OTP_LENGTH).split('');
      newOtp.splice(0, OTP_LENGTH, ...pasted);
      setOtp(newOtp);
      inputRefs.current[pasted.length]?.focus();
    } else {
      newOtp[i] = val;
      setOtp(newOtp);
      if (val && i < OTP_LENGTH - 1) {
        inputRefs.current[i + 1]?.focus();
      }
    }
  };

  const resendOTP = async () => {
    if (!isResendActive) return;
    try {
      const res: ApiResponse = await sendOtpAPI({
        Username: form.phone,
        Mobile_No: form.phone,
      }).unwrap();
      if (res.SuccessFlag === 'true') {
        setTimer(RESEND_TIMEOUT);
        setIsResendActive(false);
      } else {
        Alert.alert('Error', 'Failed to resend OTP');
      }
    } catch (e) {
      Alert.alert('Error', 'Unexpected error');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <MaskBackground />
        <LogoHeader />
        <View style={styles.innerContainer}>
          {step === 'signup' ? (
            <>
              <Text style={styles.title}>Welcome To SDL</Text>
              <Text style={styles.subtitle}>Create your SDL account</Text>
              <InputField icon={IMAGES.User} placeholder="Full Name" value={form.fullName} onChangeText={(val: string) => updateForm('fullName', val)} />
              <InputField icon={IMAGES.Phone} placeholder="Phone number / Username" value={form.phone} onChangeText={(val: string) => updateForm('phone', val)} keyboardType="phone-pad" />
              <InputField icon={IMAGES.Envelope} placeholder="Mail (optional)" value={form.email} onChangeText={(val: string) => updateForm('email', val)} keyboardType="email-address" />
              <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                <InputField icon={IMAGES.Calender} placeholder="Date of birth" value={form.dob} editable={false} pointerEvents="none" />
              </TouchableOpacity>
              <View style={styles.termsContainer}>
                <TouchableOpacity onPress={() => setAgreed(!agreed)} style={styles.nativeCheckbox}>
                  <View style={[styles.checkboxBox, agreed && styles.checkboxBoxChecked]} />
                </TouchableOpacity>
                <Text style={styles.termsText}>I agree to the Terms and Conditions</Text>
              </View>
              <GradientButton title="Get OTP" onPress={handleGetOTP} />
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signUpPrefix}>Already have an account? <Text style={styles.link}>Login here</Text></Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>OTP Verification</Text>
              <Text style={styles.subtitle}>Enter OTP sent to {form.phone}</Text>
              <View style={styles.otpContainer}>
                {otp.map((d, i) => (
                  <TextInput key={i} value={d} style={styles.otpInput} maxLength={1} keyboardType="number-pad" textContentType="oneTimeCode" onChangeText={(val) => handleOtpChange(val, i)} ref={(ref) => (inputRefs.current[i] = ref)} />
                ))}
              </View>
              <TouchableOpacity onPress={resendOTP} disabled={!isResendActive}>
                <Text style={[styles.resendText, !isResendActive && styles.resendTextInactive]}>
                  {isResendActive ? 'Resend OTP' : `Resend OTP in ${timer}s`}
                </Text>
              </TouchableOpacity>
              <GradientButton title="Verify" onPress={handleVerify} />
            </>
          )}
        </View>
        <Footer />
      </ScrollView>

      <Modal visible={isCalendarVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Calendar
              onDayPress={(day) => {
                updateForm('dob', day.dateString.replace(/-/g, '/'));
                setCalendarVisible(false);
              }}
              maxDate={new Date().toISOString().split('T')[0]}
              markedDates={{ [form.dob.replace(/\//g, '-')]: { selected: true, selectedColor: '#2376F9' } }}
              theme={{ selectedDayBackgroundColor: '#2376F9', todayTextColor: '#2376F9', arrowColor: '#2376F9' }}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: width * 0.05,
    backgroundColor: 'white',
  },
  innerContainer: { alignItems: 'center', justifyContent: 'center' },
  title: {
    fontSize: width * 0.06,
    fontWeight: '600',
    color: '#00071A',
    fontFamily: FONT_FAMILY.fontFamilyWixSemiBold,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#7E8299',
    marginBottom: height * 0.02,
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: height * 0.01,
  },
  nativeCheckbox: { marginRight: 8 },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#2376F9',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  checkboxBoxChecked: { backgroundColor: '#2376F9' },
  termsText: {
    color: '#2376F9',
    fontSize: 14,
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    textDecorationLine: 'underline',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#e4e6ef',
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: '600',
  },
  resendText: {
    textAlign: 'center',
    color: '#3f4254',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  resendTextInactive: { color: '#999' },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    width: '90%',
  },
  signUpPrefix: {
    textAlign: 'center',
    marginTop: screenHeight * 0.02,
    fontSize: screenWidth * 0.035,
    color: '#00071A',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
  },
  link: {
    color: '#2376F9',
    fontWeight: '500',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
  },
});

export default SignupWithOtpScreen;


