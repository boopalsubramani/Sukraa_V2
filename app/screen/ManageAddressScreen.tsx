import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY } from '../utils/Constants';

const { width, height } = Dimensions.get('window');

const addresses = [
    {
        id: '1',
        type: 'Home',
        address: 'Purujit KG, 123 Colony, Riyadh',
        address1: 'Saudi Arabia',
    },
    {
        id: '2',
        type: 'Office',
        address: 'Purujit KG, 31st Street, Riyadh',
        address1: 'Saudi Arabia',
    },
];

const AddressCard = ({ item, onEdit, onDelete }: any) => (
    <View style={styles.card}>
        <Text style={styles.type}>{item.type}</Text>
        <View style={styles.addressRow}>
            <Text style={styles.address}>{item.address}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconCircle} onPress={() => onEdit(item)}>
                    <Image source={IMAGES.UserPen} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconCircle} onPress={() => onDelete(item.id)}>
                    <Image source={IMAGES.Delete} style={[styles.icon, styles.deleteIcon]} />
                </TouchableOpacity>
            </View>
        </View>
        <Text style={styles.address}>{item.address1}</Text>
    </View>
);

const ManageAddressScreen = ({ navigation }: any) => {
    const handleEdit = (item: any) => {
        console.log('Edit:', item);
    };

    const handleDelete = (id: string) => {
        console.log('Delete ID:', id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.header}>Manage Address</Text>
            </View>

            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AddressCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
                )}
                contentContainerStyle={{ gap: 16 }}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.buttonContainer}>
                <LinearGradient
                    colors={['#3B82F6', '#10B981']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}>
                    <Text style={styles.buttonText}>Add Address</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default ManageAddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    card: {
        borderWidth: 1,
        borderColor: '#E4E6EF',
        borderRadius: 8,
        padding: 16,
        backgroundColor: '#fff',
    },
    type: {
        fontSize: 24,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        fontWeight:'500',
        marginBottom: 4,
        color:'#00071A'
    },
    addressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    address: {
        fontSize: 18,
        fontWeight:'500',
        color: '#3F4254',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: 12,
    },
    iconCircle: {
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        padding: 8,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#82869D',
        resizeMode: 'contain'
    },
    deleteIcon: {
        width: 16,
        height: 18,
        tintColor: '#82869D',
        resizeMode: 'contain'
    },
    buttonContainer: {
        marginTop: 'auto',
        marginBottom: 16,
    },
    gradient: {
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        fontFamily:FONT_FAMILY.fontFamilyWixMedium
    },
});
