import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../utils/SharedImages';

const BackArrow = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
            <Image source={IMAGES.LeftArrow} style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backArrow: {
        marginTop: 20,
        paddingLeft: 4,
        zIndex: 10,
    },
    icon:{
        width:10,
        height:18,
        resizeMode:'contain',
        tintColor:'#00071A'
    }
});

export default BackArrow;
