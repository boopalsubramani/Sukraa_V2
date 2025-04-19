import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Image,
  Alert,
} from 'react-native';
import {Asset, CameraOptions, ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../../utils/SharedImages';

export default function UploadComponent() {
    const openCamera = async () => {
        const options : CameraOptions = {
          mediaType: 'photo',
          quality: 1,
          includeBase64: false,
          saveToPhotos: true,
        };
    
        launchCamera(options, (response: ImagePickerResponse) => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.errorCode) {
            console.log('Camera error: ', response.errorMessage);
            Alert.alert('Camera error', response.errorMessage || 'Unknown error');
          } else if (response.assets && response.assets.length > 0) {
            const image: Asset = response.assets[0];
            console.log('Camera image: ', image.uri);
            // Upload logic here
          }
        });
      };
    
      const openGallery = () => {
        const options: ImageLibraryOptions = {
          mediaType: 'photo',
          quality: 1,
          includeBase64: false,
        };
    
        launchImageLibrary(options, (response: ImagePickerResponse) => {
          if (response.didCancel) {
            console.log('User cancelled gallery');
          } else if (response.errorCode) {
            console.log('Gallery error: ', response.errorMessage);
            Alert.alert('Gallery error', response.errorMessage || 'Unknown error');
          } else if (response.assets && response.assets.length > 0) {
            const image: Asset = response.assets[0];
            console.log('Gallery image: ', image.uri);
            // Upload logic here
          }
        });
      };

  return (
    <LinearGradient
    colors={['#1E3989', '#9B71AA', '#87C699']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.gradientBorder}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={IMAGES.ix_ai}
            resizeMode="contain"
           
          />
          <Text style={styles.title}>Have a prescription?</Text>
        </View>

        <Text style={styles.subtitle}>
          Upload and let the AI pick tests for you automatically.
        </Text>

        <View style={styles.overAlluploadArea}>
       <View style={styles.uploadArea}>
            <Image
              source={IMAGES.Group}
              resizeMode="contain"
              style={styles.imageIcon}
            />
            </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.outlineButton} onPress={openCamera}>
            <Text style={styles.outlineButtonText}>Open camera</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openGallery}>
            <LinearGradient
               colors={['#1E3989', '#9B71AA', '#87C699']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientButton}>
              <Text style={styles.gradientButtonText}>Upload now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.footnote}>
          * AI will suggest tests based on your document
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    margin: 16,
    padding: 2, // thickness of the gradient border
    borderRadius: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3F4254',
    marginLeft: 8,
  },
  subtitle: {
    marginTop: 8,
    color: '#4A5568',
    fontSize: 14,
  },overAlluploadArea:{
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadArea: {

    marginVertical: 24,
    height: 120,
    width:120,
    backgroundColor: '#EFF2F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },

  imageIcon: {
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  uploadIcon: {
    marginTop: -15,
    marginLeft: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#1E3989',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#1E3989',
    fontSize: 18,
    fontWeight: '500',
  },
  gradientButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  gradientButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  footnote: {
    marginTop: 16,
    fontSize: 12,
    color: '#7E8299',
    textAlign:"center"
  },
});
