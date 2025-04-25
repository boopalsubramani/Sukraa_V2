// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Dimensions,
//   TouchableOpacity,
//   Modal,
// } from 'react-native';
// import {IMAGES} from '../utils/SharedImages';
// import InputField from '../components/Common/InputField';
// import GradientButton from '../components/Common/GradientButton';
// import LogoHeader from '../components/Common/LogoHeader';
// import MaskBackground from '../components/Common/MaskBackground';
// import {FONT_FAMILY} from '../utils/Constants';
// import Footer from '../components/Common/Footer';
// import {useSignUpMutation} from '../redux/service/SignUpService';
// import {useOtp_SendMutation} from '../redux/service/Otp_SendService';
// import {Calendar} from 'react-native-calendars';

// const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// const SignupScreen = ({navigation}: any) => {
//   const [fullName, setFullName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [agreed, setAgreed] = useState(false);
//   const [isCalendarVisible, setIsCalendarVisible] = useState(false);

//   const [signUpAPIReq] = useSignUpMutation();
//   const [sendOtpAPIReq] = useOtp_SendMutation();

//   const handleGetOTP = async () => {
//     if (!agreed) {
//       Alert.alert('Error', 'You must agree to the Terms and Conditions.');
//       return;
//     }

//     if (fullName && phoneNumber && dateOfBirth) {
//       const signUpPayload = {
//         Name: fullName,
//         UserName: phoneNumber,
//         Gender: 'F',
//         DOB: dateOfBirth,
//         Mobile_No: phoneNumber,
//       };

//       try {
//         const signUpResponse = await signUpAPIReq(signUpPayload).unwrap();

//         if (
//           signUpResponse.SuccessFlag === 'true' &&
//           signUpResponse.Code === 200
//         ) {
//           const otpPayload = {
//             Username: phoneNumber,
//             Mobile_No: phoneNumber,
//           };

//           const otpResponse = await sendOtpAPIReq(otpPayload).unwrap();

//           if (otpResponse.SuccessFlag === 'true' && otpResponse.Code === 200) {
//             const otpData = otpResponse.Message[0];

//             Alert.alert('OTP Sent', otpData.Otp_Message, [
//               {
//                 text: 'OK',
//                 onPress: () =>
//                   navigation.navigate('OtpVerification', {
//                     fullName,
//                     phoneNumber,
//                     otp: otpData.OTP_Code,
//                   }),
//               },
//             ]);
//           } else {
//             Alert.alert('Error', 'Failed to send OTP. Please try again.');
//           }
//         } else {
//           const serverMsg =
//             signUpResponse.Message?.[0]?.Message ||
//             'Sign up failed. Please try again.';
//           Alert.alert('Error', serverMsg);
//         }
//       } catch (error: any) {
//         const serverMsg =
//           error?.data?.Message?.[0]?.Message ||
//           'Something went wrong. Please try again later.';
//         Alert.alert('Error', serverMsg);
//       }
//     } else {
//       Alert.alert('Error', 'Please fill in the required fields');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.keyboardAvoidingView}>
//       <View style={styles.container}>
//         <MaskBackground position="right" />
//         <ScrollView contentContainerStyle={styles.scrollViewContent}>
//           <View style={styles.contentContainer}>
//             <LogoHeader />
//             <View style={styles.content}>
//               <Text style={styles.title}>Welcome to SDL</Text>
//               <Text style={styles.subtitle}>Create your SDL account</Text>

//               <InputField
//                 icon={IMAGES.User}
//                 placeholder="Full Name"
//                 value={fullName}
//                 onChangeText={setFullName}
//               />
//               <InputField
//                 icon={IMAGES.Phone}
//                 placeholder="Phone number / User name"
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 keyboardType="phone-pad"
//               />
//               <InputField
//                 icon={IMAGES.Envelope}
//                 placeholder="Mail (optional)"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//               />

//               {/* Touchable input to trigger calendar */}
//               <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
//                 <InputField
//                   icon={IMAGES.Calender}
//                   placeholder="Date of birth"
//                   value={dateOfBirth}
//                   editable={false}
//                   pointerEvents="none"
//                 />
//               </TouchableOpacity>

//               <View style={styles.termsContainer}>
//                 <TouchableOpacity
//                   style={styles.nativeCheckbox}
//                   onPress={() => setAgreed(!agreed)}>
//                   <View
//                     style={[
//                       styles.checkboxBox,
//                       agreed && styles.checkboxBoxChecked,
//                     ]}
//                   />
//                 </TouchableOpacity>
//                 <Text style={styles.termsText}>
//                   I agree to the Terms and Conditions
//                 </Text>
//               </View>

//               <GradientButton onPress={handleGetOTP} title="Get OTP" />

//               <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                 <Text style={styles.signUpPrefix}>
//                   Already have an account?{' '}
//                   <Text style={styles.link}>Login here</Text>
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>

//         {/* Calendar Modal */}
//         <Modal
//           visible={isCalendarVisible}
//           transparent
//           animationType="slide"
//           onRequestClose={() => setIsCalendarVisible(false)}>
//           <View style={styles.modalBackground}>
//             <View style={styles.modalContainer}>
//               <Calendar
//                 onDayPress={day => {
//                   const formattedDate = day.dateString.replace(/-/g, '/');
//                   setDateOfBirth(formattedDate);
//                   setIsCalendarVisible(false);
//                 }}
//                 markedDates={{
//                   [dateOfBirth.replace(/\//g, '-')]: {
//                     selected: true,
//                     selectedColor: '#2376F9',
//                   },
//                 }}
//                 maxDate={new Date().toISOString().split('T')[0]}
//                 theme={{
//                   selectedDayBackgroundColor: '#2376F9',
//                   todayTextColor: '#2376F9',
//                   arrowColor: '#2376F9',
//                 }}
//               />
//             </View>
//           </View>
//         </Modal>
//         <Footer />
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingHorizontal: screenWidth * 0.05,
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   content: {
//     alignItems: 'center',
//     marginTop: screenHeight * 0.02,
//   },
//   title: {
//     fontSize: screenWidth * 0.06,
//     fontWeight: '600',
//     color: '#00071A',
//     fontFamily: FONT_FAMILY.fontFamilyWixSemiBold,
//   },
//   subtitle: {
//     marginBottom: screenHeight * 0.02,
//     fontSize: screenWidth * 0.04,
//     color: '#7E8299',
//     marginTop: screenHeight * 0.01,
//     fontWeight: '500',
//     fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular,
//   },
//   termsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//     marginVertical: screenHeight * 0.01,
//   },
//   nativeCheckbox: {
//     marginRight: 8,
//     padding: 4,
//   },
//   checkboxBox: {
//     width: 20,
//     height: 20,
//     borderWidth: 2,
//     borderColor: '#2376F9',
//     borderRadius: 4,
//     backgroundColor: 'white',
//   },
//   checkboxBoxChecked: {
//     backgroundColor: '#2376F9',
//   },
//   termsText: {
//     fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
//     fontSize: screenWidth * 0.035,
//     fontWeight: '500',
//     color: '#2376F9',
//   },
//   signUpPrefix: {
//     textAlign: 'center',
//     marginTop: screenHeight * 0.02,
//     fontSize: screenWidth * 0.035,
//     color: '#00071A',
//     fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
//   },
//   link: {
//     color: '#2376F9',
//     fontWeight: '500',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     elevation: 10,
//     width: '90%',
//   },
// });

// export default SignupScreen;




// React imports
import React, {useState, useRef, useEffect} from 'react';
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
import {Calendar} from 'react-native-calendars';

// Redux APIs
import {useSignUpMutation} from '../redux/service/SignUpService';
import {useOtp_SendMutation} from '../redux/service/Otp_SendService';
import {useOtp_VerificationMutation} from '../redux/service/Otp_VerificationService';

// Components
import InputField from '../components/Common/InputField';
import GradientButton from '../components/Common/GradientButton';
import LogoHeader from '../components/Common/LogoHeader';
import MaskBackground from '../components/Common/MaskBackground';
import Footer from '../components/Common/Footer';
import {FONT_FAMILY} from '../utils/Constants';
import {IMAGES} from '../utils/SharedImages';

const {width, height} = Dimensions.get('window');
const OTP_LENGTH = 4, RESEND_TIMEOUT = 20;

const SignupWithOtpScreen = ({navigation}:any) => {
  const [step, setStep] = useState('signup');
  const [form, setForm] = useState({fullName: '', phone: '', email: '', dob: ''});
  const [agreed, setAgreed] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [isResendActive, setIsResendActive] = useState(false);
  const [receivedOtp, setReceivedOtp] = useState('');

  const [signUpAPI] = useSignUpMutation();
  const [sendOtpAPI] = useOtp_SendMutation();
  const [verifyOtpAPI] = useOtp_VerificationMutation();

  useEffect(() => {
    if (step === 'otp' && timer > 0 && !isResendActive) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) setIsResendActive(true);
  }, [timer, step, isResendActive]);

  const updateForm = (key, value) => setForm({...form, [key]: value});

  const handleGetOTP = async () => {
    const {fullName, phone, dob} = form;
    if (!agreed || !fullName || !phone || !dob) return Alert.alert('Fill all fields & agree terms');
    try {
      const res = await signUpAPI({Name: fullName, UserName: phone, Gender: 'F', DOB: dob, Mobile_No: phone}).unwrap();
      if (res.SuccessFlag === 'true') {
        const otpRes = await sendOtpAPI({Username: phone, Mobile_No: phone}).unwrap();
        if (otpRes.SuccessFlag === 'true') {
          setReceivedOtp(otpRes.Message[0].OTP_Code);
          setStep('otp'); setTimer(RESEND_TIMEOUT); setIsResendActive(false);
        } else Alert.alert('Error', 'Failed to send OTP');
      } else Alert.alert('Error', res.Message?.[0]?.Message || 'Signup failed');
    } catch (e) { Alert.alert('Error', e?.data?.Message?.[0]?.Message || 'Unexpected error'); }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) return Alert.alert('Enter full OTP');
    try {
      const res = await verifyOtpAPI({Username: form.phone, Mobile_No: form.phone, OTP_Code: code}).unwrap();
      if (res.SuccessFlag === 'true') {
        Alert.alert('Success', 'OTP Verified', [{text: 'Continue', onPress: () => navigation.navigate('CreatePassword')}]);
      } else Alert.alert('Invalid OTP', res.Message?.[0]?.Message || 'Try again');
    } catch (e) { Alert.alert('Error', e?.data?.Message?.[0]?.Message || 'Unexpected error'); }
  };

  const handleOtpChange = (val, i) => {
    const newOtp = [...otp]; newOtp[i] = val.slice(-1); setOtp(newOtp);
    if (val && i < OTP_LENGTH - 1) inputRefs.current[i + 1]?.focus();
  };

  const resendOTP = async () => {
    if (!isResendActive) return;
    const res = await sendOtpAPI({Username: form.phone, Mobile_No: form.phone}).unwrap();
    if (res.SuccessFlag === 'true') {
      setReceivedOtp(res.Message[0].OTP_Code);
      setTimer(RESEND_TIMEOUT); setIsResendActive(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <MaskBackground />
        <LogoHeader />
        <View style={styles.innerContainer}>
          {step === 'signup' ? (
            <>
              <Text style={styles.title}>Create your SDL account</Text>
              <InputField icon={IMAGES.User} placeholder="Full Name" value={form.fullName} onChangeText={val => updateForm('fullName', val)} />
              <InputField icon={IMAGES.Phone} placeholder="Phone number / Username" value={form.phone} onChangeText={val => updateForm('phone', val)} keyboardType="phone-pad" />
              <InputField icon={IMAGES.Envelope} placeholder="Mail (optional)" value={form.email} onChangeText={val => updateForm('email', val)} keyboardType="email-address" />
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
            </>
          ) : (
            <>
              <Text style={styles.title}>OTP Verification</Text>
              <Text style={styles.subtitle}>Enter OTP sent to {form.phone}</Text>
              <View style={styles.otpContainer}>
                {otp.map((d, i) => (
                  <TextInput key={i} value={d} style={styles.otpInput} maxLength={1} keyboardType="number-pad" onChangeText={val => handleOtpChange(val, i)} ref={ref => (inputRefs.current[i] = ref)} />
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
              onDayPress={day => {
                updateForm('dob', day.dateString.replace(/-/g, '/'));
                setCalendarVisible(false);
              }}
              maxDate={new Date().toISOString().split('T')[0]}
              markedDates={{[form.dob.replace(/\//g, '-')]: {selected: true, selectedColor: '#2376F9'}}}
              theme={{selectedDayBackgroundColor: '#2376F9', todayTextColor: '#2376F9', arrowColor: '#2376F9'}}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40, paddingHorizontal: width * 0.05, backgroundColor: 'white'},
  innerContainer: {alignItems: 'center', justifyContent: 'center'},
  title: {fontSize: width * 0.06, fontWeight: '600', marginVertical: 16, color: '#00071A', fontFamily: FONT_FAMILY.fontFamilyWixSemiBold},
  subtitle: {fontSize: width * 0.04, color: '#7E8299', marginBottom: height * 0.02, fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular},
  termsContainer: {flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginVertical: height * 0.01},
  nativeCheckbox: {marginRight: 8},
  checkboxBox: {width: 20, height: 20, borderWidth: 2, borderColor: '#2376F9', borderRadius: 4, backgroundColor: 'white'},
  checkboxBoxChecked: {backgroundColor: '#2376F9'},
  termsText: {color: '#2376F9', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium},
  otpContainer: {flexDirection: 'row', justifyContent: 'center', marginBottom: 20},
  otpInput: {width: 50, height: 50, borderWidth: 1, borderRadius: 6, borderColor: '#ccc', textAlign: 'center', marginHorizontal: 5, fontSize: 18, fontWeight: '600'},
  resendText: {textAlign: 'center', color: '#2376F9', fontWeight: '500', marginBottom: 20},
  resendTextInactive: {color: '#999'},
  modalBackground: {flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center'},
  modalContainer: {backgroundColor: 'white', borderRadius: 10, padding: 20, elevation: 10, width: '90%'},
});

export default SignupWithOtpScreen;