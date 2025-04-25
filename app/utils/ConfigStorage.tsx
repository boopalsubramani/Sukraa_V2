import AsyncStorage from '@react-native-async-storage/async-storage';

export const getConfigData = async () => {
  try {
    const configString = await AsyncStorage.getItem('configData');
    if (configString) {
      return JSON.parse(configString);
    }
    return null;
  } catch (error) {
    console.error('Error reading config from AsyncStorage:', error);
    return null;
  }
};
