import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY } from '../utils/Constants';

const { width } = Dimensions.get('window');

const AboutUsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={styles.headerText}>About Us</Text>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={IMAGES.Logo} style={styles.logo} />
        </View>

        {/* Description */}
        <View style={styles.content}>
          <Text style={styles.paragraph}>
            King Faisal Specialist Hospital International Holding Company (KFSHI)
            is at the forefront of revolutionizing healthcare through strategic
            partnerships, cutting-edge technologies, and a steadfast commitment to
            excellence.
          </Text>
          <Text style={styles.paragraph}>
            As a holding company, KFSHI oversees a diverse portfolio of
            subsidiaries, each playing a pivotal role in advancing healthcare
            services and innovations across the Kingdom of Saudi Arabia and
            beyond. Our mission is to drive sustainable growth and deliver
            unparalleled healthcare solutions that meet the needs of patients
            today and in the future.
          </Text>
          <Text style={styles.location}>Mumbai, India</Text>
          <Text style={styles.email}>accounts@sukraa.in</Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.fixedButtonWrapper}>
        <TouchableOpacity onPress={() => Linking.openURL('https://kfshi.com')}>
          <LinearGradient
            colors={['#1E3989', '#9B71AA', '#87C699']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Visit kfshi.com</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 100, // So the last text doesn't get hidden under the button
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backArrow: {
    width: 12,
    height: 16,
    resizeMode: 'contain',
    marginRight: 16,
  },
  headerText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
    color: '#00071A',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  content: {
    paddingHorizontal: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular,
    marginBottom: 12,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
    marginTop: 20,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
  },
  fixedButtonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: width * 0.05,
    right: width * 0.05,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONT_FAMILY.fontFamilyWixMedium,
  },
});
