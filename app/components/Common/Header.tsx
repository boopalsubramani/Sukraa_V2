import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import { IMAGES } from '../../utils/SharedImages';
import { useNavigation } from '@react-navigation/native';
import { FONT_FAMILY } from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

const Header = ({ location = 'Riyadh, Saudi Arabia' }) => {
  const navigation = useNavigation();
  const [isSosModalVisible, setSosModalVisible] = useState(false);

  return (
    <>
      <View style={styles.header}>
        {/* Location Section */}
        <View style={styles.locationContainer}>
          <Image source={IMAGES.Location} style={styles.locationIcon} />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        {/* Icons Section */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setSosModalVisible(true)}>
            <HeaderIcon icon={IMAGES.SosAlert} style={styles.sosIcon} />
          </TouchableOpacity>
          <HeaderIcon icon={IMAGES.Cart} style={styles.cartIcon} />
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <HeaderIcon icon={IMAGES.Notification} style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SOS Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSosModalVisible}
        onRequestClose={() => setSosModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPressOut={() => setSosModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContentWrapper}
            onPress={() => { }} 
          >
            <View style={styles.modalContent}>
              <Image source={IMAGES.SosAlert} style={styles.sosIcon} />
              <Text style={styles.modalTitleSos}>Sos Alert</Text>
              <Text style={styles.modalTitle}>
                Are you sure want to send emergency alert message to your customer service
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setSosModalVisible(false)}
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1, marginHorizontal: 5 }}
                  onPress={() => {
                    setSosModalVisible(false);
                    // Trigger SOS action here if needed
                  }}
                >
                  <LinearGradient
                    colors={['#1E3989', '#9B71AA', '#87C699']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.callButton}
                  >
                    <Text style={styles.gradientText}>Yes</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const HeaderIcon = ({ icon, style }: any) => (
  <View style={styles.iconWrapper}>
    <Image source={icon} style={style} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 14,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#00071A',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosIcon: {
    width: 22,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#DB3437',
  },
  modalContentWrapper: {
    width: '90%',
    alignItems: 'center',
  },
  cartIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#82869D',
  },
  notificationIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#82869D',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFF2F5',
    alignItems: 'center',
  },
  modalTitleSos: {
    fontSize: 21,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
    color: '#3F4254',
  },
  modalTitle: {
    fontSize: 21,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    color: '#00071A',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 100,
    borderColor: '#1E3989',
    borderWidth: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  callButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    color: '#1E3989',
  },
  gradientText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    color: 'white',
  },
});

export default Header;
