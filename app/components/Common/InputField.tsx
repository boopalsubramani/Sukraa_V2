
import React from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IMAGES } from '../../utils/SharedImages';
import { FONT_FAMILY } from '../../utils/Constants';

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
    borderColor: '#E4E6EF',
    borderRadius: 100,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: 306,
    height: 48,
  },
  inputIcon: {
    width: 20,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#82869D'
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    color: '#B5B5C3',
  },
  eyeIconImage: {
    width: 18,
    height: 12,
    resizeMode: 'contain',
  },
});

export default InputField;

