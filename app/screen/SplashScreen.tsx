import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppSettings} from '../context/AppSettingContext';
import {CONFIG} from '../utils/URL';
import SpinnerIndicator from '../components/Common/SpinnerIndicator';
import {useNavigation} from '@react-navigation/native';

const deviceHeight = Dimensions.get('window').height;

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const {settings} = useAppSettings();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(CONFIG);
        const data = await response.json();
        await AsyncStorage.setItem('configData', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to fetch config:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);


  
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        navigation.replace('Login'); 
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [loading, navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <SpinnerIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {settings?.Message?.[0]?.Client_Logo && (
          <Image
            resizeMode="contain"
            source={{uri: settings.Message[0].Client_Logo}}
            style={styles.image}
          />
        )}
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
  },
  image: {
    width: deviceHeight * (5 / 10),
    height: deviceHeight * (3 / 28),
  },
});
