import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FONT_FAMILY } from '../../utils/Constants';

const Footer = () => {

    return (
        <View style={styles.footer}>
            <Text style={styles.versionText}>Version 0.0.10 Powered by SUKRAA</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: { position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' },
    versionText: {
        color: '#3F4254', fontSize: 12, fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        lineHeight: 20
    },
});

export default Footer;
