import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR, FONT_FAMILY } from '../../utils/Constants';

const { width: screenWidth } = Dimensions.get('window');

const GradientButton = ({ onPress, title }: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#1E3989', '#9B71AA', '#87C699']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: screenWidth * 0.8, 
    height: screenWidth * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: screenWidth * 0.05, 
  },
  buttonText: {
    color:COLOR.WHITE_COLOR,
    fontSize: screenWidth * 0.04, 
    fontWeight: '500',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
  },
});

export default GradientButton;
