import React from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { IMAGES } from '../../utils/SharedImages';
import { FONT_FAMILY } from '../../utils/Constants';

const { width: screenWidth } = Dimensions.get('window');

const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default', showPassword, setShowPassword }: any) => {
  return (
    <View style={styles.inputWrapper}>
      <Image source={icon} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#B5B5C3"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {setShowPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image source={IMAGES.Eye} style={styles.eyeIconImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e4e6ef',
    borderRadius: 100,
    paddingHorizontal: screenWidth * 0.03,
    marginBottom: screenWidth * 0.04, 
    width: screenWidth * 0.8,
    height: screenWidth * 0.12, 
  },
  inputIcon: {
    width: screenWidth * 0.05, 
    height: screenWidth * 0.04, 
    resizeMode: 'contain',
    tintColor: '#82869D',
  },
  input: {
    flex: 1,
    fontSize: screenWidth * 0.04, 
    fontWeight: '500',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    color: '#B5B5C3',
  },
  eyeIconImage: {
    width: screenWidth * 0.045, 
    height: screenWidth * 0.03, 
    resizeMode: 'contain',
  },
});

export default InputField;
