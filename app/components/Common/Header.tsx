import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { IMAGES } from '../../utils/SharedImages';

const Header = ({ location = 'Riyadh, Saudi Arabia' }) => {
    return (
        <View style={styles.header}>
            <View style={styles.locationContainer}>
                <View style={styles.locationIconWrapper}>
                    <Image source={IMAGES.Location} />
                </View>
                <View style={styles.locationTextContainer}>
                    <Text style={styles.locationCity}>{location}</Text>
                </View>
            </View>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                    <View style={styles.iconCircle}>
                        <Image source={IMAGES.SosAlert} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <View style={styles.iconCircle}>
                        <Image source={IMAGES.Cart} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <View style={styles.iconCircle}>
                        <Image source={IMAGES.Notification} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        height: Platform.OS === 'ios' ? 64 : 58,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIconWrapper: {
        marginRight: 8,
    },
    locationTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationCity: {
        fontSize: 16,
        fontWeight: '500',
        color: '#00071A',
        lineHeight: 20,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 4,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EFF2F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Header;
