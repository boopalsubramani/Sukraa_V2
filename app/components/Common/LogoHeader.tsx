import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { IMAGES } from '../../utils/SharedImages';

const deviceHeight = Dimensions.get('window').height;

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
        marginTop: 30,
    
    },
    logo: {
        marginTop: 30,
        alignSelf: 'center',
        width: deviceHeight * (5 / 10),
        height: deviceHeight * (3 / 28),
        resizeMode: "contain"
    },
});

export default LogoHeader;
