import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { IMAGES } from '../../utils/SharedImages';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MaskBackground = ({ position = 'left', flip = false }) => {
    return (
        <View
            style={[
                styles.maskContainer,
                position === 'right' ? styles.maskRight : styles.maskLeft,
                flip && styles.flip,
            ]}
        >
            <Image source={IMAGES.Mask}/>
        </View>
    );
};

const styles = StyleSheet.create({
    maskContainer: {
        position: 'absolute',
        top: -20,
        height: screenHeight * 0.15,
        width: screenWidth * 0.5,
        zIndex: 1,
    },
    maskLeft: {
        left: 0,
    },
    maskRight: {
        right: 0,
    },
    flip: {
        transform: [{ rotateY: '180deg' }],
    },
});

export default MaskBackground;
