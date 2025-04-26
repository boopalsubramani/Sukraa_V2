import React, { useState, useEffect } from 'react';
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
import { useNotification_CountMutation } from '../../redux/service/NotificationCountService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ location = 'Riyadh, Saudi Arabia' }) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState(null);
  const [isSosModalVisible, setSosModalVisible] = useState(false);
  const [notifyCount, setNotifyCount] = useState(0);
  const [notificationCountApiReq] = useNotification_CountMutation();

  // Fetch username from AsyncStorage on mount
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserDetails: any = await AsyncStorage.getItem('userDetails');
        if (storedUserDetails) {
          const parsedDetails = JSON.parse(storedUserDetails);
          console.log(parsedDetails, "parsedDetails");
          setUserName(parsedDetails?.UserName); 
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserName();
  }, []);


  // Fetch notification count after username is set
  useEffect(() => {
    if (!userName) return;

    const fetchNotificationCount = async () => {
      try {
        const response = await notificationCountApiReq({
          UserName: userName,
        }).unwrap();
        if (response?.SuccessFlag === 'true') {
          const count = response?.Message?.[0]?.Notify_Count;
          setNotifyCount(count);
        }
      } catch (error) {
        console.error('Notification count fetch error:', error);
      }
    };

    fetchNotificationCount();
  }, [userName]);
  console.log(notifyCount, "count");

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
            <View style={{ position: 'relative' }}>
              <HeaderIcon
                icon={IMAGES.Notification}
                style={styles.notificationIcon}
              />
              {notifyCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {notifyCount > 9 ? '9+' : notifyCount.toString()}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>


        </View>
      </View>

      {/* SOS Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSosModalVisible}
        onRequestClose={() => setSosModalVisible(false)}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPressOut={() => setSosModalVisible(false)}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContentWrapper}
            onPress={() => { }}>
            <View style={styles.modalContent}>
              <Image source={IMAGES.SosAlert} style={styles.sosIcon} />
              <Text style={styles.modalTitleSos}>Sos Alert</Text>
              <Text style={styles.modalTitle}>
                Are you sure want to send emergency alert message to your
                customer service
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setSosModalVisible(false)}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1, marginHorizontal: 5 }}
                  onPress={() => {
                    setSosModalVisible(false);
                  }}>
                  <LinearGradient
                    colors={['#1E3989', '#9B71AA', '#87C699']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.callButton}>
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
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
    textAlign: 'center',
  },
  modalContentWrapper: {
    width: '90%',
    alignItems: 'center',
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
