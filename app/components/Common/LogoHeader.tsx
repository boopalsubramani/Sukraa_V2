import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { IMAGES } from '../../utils/SharedImages';

const { height: deviceHeight } = Dimensions.get('window');

const LogoHeader = () => {
    return (
        <View style={styles.header}>
            <Image source={IMAGES.Logo} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    logo: {
        width: deviceHeight * 0.20, 
        height: deviceHeight * 0.10, 
        resizeMode: 'contain',
    },
});

export default LogoHeader;

