import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONT_FAMILY } from '../../utils/Constants';

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
    width: 306,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium
  },
});

export default GradientButton;
