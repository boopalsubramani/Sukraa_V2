import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY } from '../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { useUserViewMutation } from '../redux/service/UserViewService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerIndicator from '../components/Common/SpinnerIndicator';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: any) => {
  const [userViewAPIReq] = useUserViewMutation();
  const [userData, setUserData] = useState<any>(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        setLoading(true);
        const storedUserDetails: any = await AsyncStorage.getItem('userDetails');
        if (storedUserDetails) {
          const parsedDetails = JSON.parse(storedUserDetails);
          const username = parsedDetails?.UserName;
          setUserName(username);

          if (username) {
            const response: any = await userViewAPIReq({ Username: username });
            if (response?.data?.SuccessFlag === 'true' && response?.data?.Message?.length > 0) {
              setUserData(response.data.Message[0]);
            } else {
              console.log('Failed to fetch user data');
            }
          }
        }
      } catch (error) {
        console.error('Error initializing profile:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeProfile();
  }, []);

  const infoItems = [
    { icon: IMAGES.Lock, text: '**********' },
    { icon: IMAGES.Envelope, text: userData?.User_Email_Id || '-' },
    { icon: IMAGES.Calender, text: userData?.User_DOB || '-' },
    { icon: IMAGES.Phone, text: userData?.User_Mobile_No || '-' },
    { icon: IMAGES.Settings, text: 'Settings', isButton: true, screen: 'Settings' },
  ];

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <SpinnerIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Profile</Text>
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={['#1E3989', '#9B71AA', '#87C699']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <Image
              source={
                userData?.User_Image_URL
                  ? { uri: userData.User_Image_URL }
                  : IMAGES.ProfileImage
              }
              style={styles.profileImage}
            />
          </LinearGradient>
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={() => {
              console.log('Edit profile image pressed');
            }}
          >
            <Image source={IMAGES.Pen} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>
          {userData?.Name || 'No Name'}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        {infoItems.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              disabled={!item.isButton}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <View style={styles.infoRow}>
                <Image source={item.icon} style={styles.icon} />
                <Text style={styles.infoText}>{item.text}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.separator} />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02,
  },
  backArrow: {
    width: 10,
    height: 16,
    resizeMode: 'contain',
    marginRight: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
    color: '#00071A',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  gradientBorder: {
    width: 110,
    height: 110,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  editIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 22,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    marginTop: 8,
  },
  infoContainer: {
    marginBottom: height * 0.02,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  icon: {
    width: 18,
    height: 20,
    marginRight: width * 0.03,
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E6EF',
    marginVertical: height * 0.02,
  },
});

export default ProfileScreen;
