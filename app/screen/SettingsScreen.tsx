
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY } from '../utils/Constants';

const { width, height } = Dimensions.get('window');

const menuItems = [
    { label: 'Manage Branches', icon: IMAGES.ManageBranch,screen:'ManageBranch' },
    { label: 'Manage Members', icon: IMAGES.ManageMember, screen: 'ManageMember' },
    { label: 'Manage Address', icon: IMAGES.ManageAddress, screen: 'ManageAddress' },
    { label: 'About Us', icon: IMAGES.AboutUs,screen:'AboutUs' },
    { label: 'Contact Us', icon: IMAGES.ContactUs },
    { label: 'Log Out', icon: IMAGES.Logout },
];

const SettingsScreen = ({ navigation }: any) => {
    const [activeModal, setActiveModal] = useState<null | 'contact' | 'logout'>(null);

    const handleMenuPress = (item: any) => {
        if (item.label === 'Contact Us') {
            setActiveModal('contact');
        } else if (item.label === 'Log Out') {
            setActiveModal('logout');
        } else if (item.screen) {
            navigation.navigate(item.screen);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.header}>Settings</Text>
            </View>

            {menuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleMenuPress(item)}>
                    <View style={styles.menuContent}>
                        <Image source={item.icon} style={styles.editIcon} />
                        <Text style={styles.menuText}>{item.label}</Text>
                    </View>
                </TouchableOpacity>
            ))}

            <Modal
                animationType="slide"
                transparent={true}
                visible={activeModal !== null}
                onRequestClose={() => setActiveModal(null)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image
                            source={activeModal === 'contact' ? IMAGES.ContactUs : IMAGES.Logout}
                            style={styles.headphoneIcon}
                        />
                        <Text style={styles.modalTitle}>
                            {activeModal === 'contact'
                                ? 'Saudi Diagnostic Limited (SDL)'
                                : 'Saudi Diagnostic Limited (SDL)'}
                        </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => setActiveModal(null)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>

                            {activeModal === 'contact' ? (
                                <TouchableOpacity style={{ flex: 1, marginHorizontal: 5 }} onPress={() => setActiveModal(null)}>
                                    <LinearGradient
                                        colors={['#1E3989', '#9B71AA', '#87C699']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.callButton}
                                    >
                                        <Text style={styles.gradientText}>Call Us</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={{ flex: 1, marginHorizontal: 5 }} onPress={() => {
                                    setActiveModal(null);
                                    console.log('Logging out...');
                                    // 🔐 Add your logout logic here (API call, token clear, etc.)
                                }}>
                                    <LinearGradient
                                        colors={['#1E3989', '#9B71AA', '#87C699']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.callButton}
                                    >
                                        <Text style={styles.gradientText}>Logout</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: width * 0.05,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.02,
    },
    backArrow: {
        width: 10,
        height: 16,
        resizeMode: 'contain',
        marginRight: 16,
    },
    header: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
        color: '#00071A',
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E6EF',
    },
    menuContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 12,
        tintColor: '#82869D',
    },
    menuText: {
        fontSize: 18,
        color: '#3F4254',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        fontWeight: '500',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EFF2F5',
        alignItems: 'center',
    },
    headphoneIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 21,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
        color: '#00071A',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 100,
        borderColor: '#1E3989',
        borderWidth: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    callButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        color: '#1E3989',
    },
    gradientText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        color: 'white',
    },
});

