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
import { SafeAreaView } from 'react-native-safe-area-context';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY } from '../utils/Constants';

const { width, height } = Dimensions.get('window');

const members = [
    {
        id: '1',
        name: 'Mr. Sridharth D',
        age: 24,
        gender: 'Male',
        relation: 'My Self',
    },
    {
        id: '2',
        name: 'Mr. Prasath A',
        age: 54,
        gender: 'Male',
        relation: 'Father',
    },
];

const MemberCard = ({ item, onEdit, onDelete }: any) => (
    <View style={styles.card}>
        <View style={styles.rowWithIcons}>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>{item.age}  |  {item.gender}  |  {item.relation}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconCircle} onPress={() => onEdit(item)}>
                    <Image source={IMAGES.UserPen} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconCircle} onPress={() => onDelete(item.id)}>
                    <Image source={IMAGES.Delete} style={[styles.icon, styles.deleteIcon]} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const ManageMemberScreen = ({ navigation }: any) => {
    const handleEdit = (item: any) => {
        console.log('Edit Member:', item);
    };

    const handleDelete = (id: string) => {
        console.log('Delete Member ID:', id);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.header}>Manage Member</Text>
            </View>

            <FlatList
                data={members}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MemberCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
                )}
                contentContainerStyle={{ paddingBottom: 120, gap: 16 }}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.outlineButton}>
                        <Text style={styles.outlineButtonText}>Add Existing Member</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gradientButton}>
                        <LinearGradient
                            colors={['#1E3989', '#9B71AA', '#87C699']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}>
                            <Text style={styles.buttonText}>Add New Member</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ManageMemberScreen;

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
    rowWithIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        color: '#00071A',
    },
    details: {
        fontSize: 14,
        color: '#3F4254',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular,
        marginTop: 4,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: 12,
        alignItems: 'center',
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
        resizeMode: 'contain',
    },
    deleteIcon: {
        width: 16,
        height: 18,
    },
    footer: {
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    outlineButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#3B82F6',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
        marginRight: 8,
    },
    outlineButtonText: {
        color: '#1E3989',
        fontWeight: '600',
        fontSize: 16,
        fontFamily:FONT_FAMILY.fontFamilyWixMedium
    },
    gradientButton: {
        flex: 1,
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
