import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { IMAGES } from '../utils/SharedImages';
import GradientButton from '../components/Common/GradientButton';
import { FONT_FAMILY } from '../utils/Constants';

const AddMemberScreen = ({ navigation }: any) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [surname, setSurname] = useState('');
    const [sex, setSex] = useState('');
    const [proof, setProof] = useState('');
    const [patientRelation, setPatientRelation] = useState('');
    const [isPersonalInfoVisible, setIsPersonalInfoVisible] = useState(false);
    const [isProofVisible, setIsProofVisible] = useState(false);
    const [isPatientRelationVisible, setIsPatientRelationVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentDropdown, setCurrentDropdown] = useState(null);

    const titles = ['Mr', 'Ms', 'Mrs', 'Dr'];
    const sexes = ['Male', 'Female', 'Other'];
    const proofs = ['ID Card', 'Passport', 'Driving License'];
    const relations = ['Self', 'Spouse', 'Child', 'Parent'];

    const renderDropdown = (options, selectedValue, setValue, dropdownKey, placeholder) => {
        return (
            <View style={styles.dropdownContainer}>
                <TouchableOpacity style={styles.dropdown} onPress={() => {
                    setCurrentDropdown(dropdownKey);
                    setModalVisible(true);
                }}>
                    <Text style={[styles.dropdownText, !selectedValue && styles.placeholderText]}>
                        {selectedValue || placeholder}
                    </Text>
                    <Image source={IMAGES.DownArrow} style={styles.dropdownIcon} />
                </TouchableOpacity>
            </View>
        );
    };


    const renderModalContent = () => {
        if (!currentDropdown) return null;

        let options = [];
        let setValue = () => { };

        switch (currentDropdown) {
            case 'title':
                options = titles;
                setValue = setTitle;
                break;
            case 'sex':
                options = sexes;
                setValue = setSex;
                break;
            case 'proof':
                options = proofs;
                setValue = setProof;
                break;
            case 'relation':
                options = relations;
                setValue = setPatientRelation;
                break;
            default:
                return null;
        }

        return (
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <FlatList
                                    data={options}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.modalItem}
                                            onPress={() => {
                                                setValue(item);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text style={styles.modalItemText}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.header}>Add Member</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsPersonalInfoVisible(!isPersonalInfoVisible)}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <Image source={isPersonalInfoVisible ? IMAGES.UpArrow : IMAGES.DownArrow} style={styles.arrowIcon} />
                </TouchableOpacity>

                {isPersonalInfoVisible && (
                    <View style={styles.personalInfoContainer}>
                        <View style={styles.formGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="Phone number"
                                placeholderTextColor='#7E8299'
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            {renderDropdown(titles, title, setTitle, 'title', 'Title')}
                        </View>

                        <View style={styles.formGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="First name"
                                placeholderTextColor='#7E8299'
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="Middle name"
                                placeholderTextColor='#7E8299'
                                value={middleName}
                                onChangeText={setMiddleName}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="Surname"
                                placeholderTextColor='#7E8299'
                                value={surname}
                                onChangeText={setSurname}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            {renderDropdown(sexes, sex, setSex, 'sex', 'Sex')}
                        </View>
                    </View>
                )}

                <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsProofVisible(!isProofVisible)}>
                    <Text style={styles.sectionTitle}>Proof</Text>
                    <Image source={isProofVisible ? IMAGES.UpArrow : IMAGES.DownArrow} style={styles.arrowIcon} />
                </TouchableOpacity>

                {isProofVisible && (
                    <View style={styles.personalInfoContainer}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Proof</Text>
                            {renderDropdown(proofs, proof, setProof, 'proof', 'Proof')}
                        </View>
                    </View>
                )}

                <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsPatientRelationVisible(!isPatientRelationVisible)}>
                    <Text style={styles.sectionTitle}>Patient Relation</Text>
                    <Image source={isPatientRelationVisible ? IMAGES.UpArrow : IMAGES.DownArrow} style={styles.arrowIcon} />
                </TouchableOpacity>

                {isPatientRelationVisible && (
                    <View style={styles.personalInfoContainer}>
                        <View style={styles.formGroup}>
                            {renderDropdown(relations, patientRelation, setPatientRelation, 'relation', 'Relation')}
                        </View>
                    </View>
                )}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <GradientButton onPress={() => { }} title="Add Member" />
            </View>
            {renderModalContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
    },
    backArrow: {
        width: 10,
        height: 16,
        resizeMode: 'contain',
        marginRight: 16,
        tintColor: '#000000'
    },
    header: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
        color: '#00071A'
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
    arrowIcon: {
        width: 10,
        height: 12,
        tintColor: '#82869D',
        resizeMode: 'contain'
    },
    personalInfoContainer: {
        backgroundColor: '#EFF2F5',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        borderRadius: 100,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },
    dropdownContainer: {
        position: 'relative',
    },
    dropdown: {
        height: 40,
        borderRadius: 100,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    dropdownText: {
        flex: 1,
        color: '#000',
    },
    dropdownIcon: {
        width: 10,
        height: 12,
        tintColor: '#82869D',
        resizeMode: 'contain'
    },
    placeholderText: {
        color: '#7E8299',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 16,
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
});

export default AddMemberScreen;
