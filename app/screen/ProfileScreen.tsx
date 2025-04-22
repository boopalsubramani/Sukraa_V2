import React from 'react';
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

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: any) => {
  const infoItems = [
    { icon: IMAGES.Lock, text: '**********' },
    { icon: IMAGES.Envelope, text: 'sridarth@gmail.com' },
    { icon: IMAGES.Calender, text: '21st Nov 2002' },
    { icon: IMAGES.Phone, text: '+91 87654 23782' },
    { icon: IMAGES.Settings, text: 'Settings', isButton: true, screen: 'Settings' }, // Added screen key for navigation
  ];

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
            <Image source={IMAGES.ProfileImage} style={styles.profileImage} />
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
        <Text style={styles.name}>Sridharth D</Text>
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
    resizeMode: 'contain',
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
