import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY } from '../utils/Constants';

const { width, height } = Dimensions.get('window');

const labData = [
    {
        id: '1',
        name: 'SDL Laboratory',
        location: 'Riyadh, Saudi Arabia',
        distance: '5kms',
        image: require('../assets/images/Rectangle1.png'),
    },
    {
        id: '2',
        name: 'SDL Laboratory',
        location: 'Riyadh, Saudi Arabia',
        distance: '10kms',
        image: require('../assets/images/Rectangle2.png'),
    },
    {
        id: '3',
        name: 'SDL Laboratory',
        location: 'Riyadh, Saudi Arabia',
        distance: '16kms',
        image: require('../assets/images/Rectangle3.png'),
    },
    {
        id: '4',
        name: 'SDL Laboratory',
        location: 'Riyadh, Saudi Arabia',
        distance: '25kms',
        image: require('../assets/images/Rectangle4.png'),
    },
    {
        id: '5',
        name: 'SDL Laboratory',
        location: 'Riyadh, Saudi Arabia',
        distance: '25kms',
        image: require('../assets/images/Rectangle5.png'),
    },
    {
        id: '6',
        name: 'SDL Laboratory',
        location: 'Riyadh, Saudi Arabia',
        distance: '25kms',
        image: require('../assets/images/Rectangle6.png'),
    },
];

const LabCard = ({ item }: any) => (
    <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.labName}>{item.name}</Text>
        <View style={styles.infoRow}>
            <Image source={IMAGES.Location} style={styles.infoIcon} />
            <Text style={styles.labDetails}>{item.location}</Text>
        </View>
        <View style={styles.infoRow}>
            <Image source={IMAGES.Timer} style={styles.infoIcon} />
            <Text style={styles.labDetails}>{item.distance}</Text>
        </View>

        <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
    </View>
);

const ManageBranchesScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.header}>Settings</Text>
            </View>

            <View style={styles.searchContainer}>
                <Image source={IMAGES.Search} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search labs"
                    placeholderTextColor="#7E8299"
                />
            </View>

            <FlatList
                data={labData}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatList}
                columnWrapperStyle={styles.columnWrapperStyle} renderItem={({ item }) => <LabCard item={item} />}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.addLabContainer}>
                <LinearGradient
                    colors={['#1E3989', '#9B71AA', '#87C699']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                >
                    <Text style={styles.addLabText}>Add Lab</Text>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ManageBranchesScreen;

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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#E4E6EF',
        paddingHorizontal: 10,
        marginBottom: 12,
        height: 45,
    },
    searchIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    searchInput: {
        flex: 1,
        paddingLeft: 8,
        color: '#7E8299',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
    flatList: {
        paddingBottom: height * 0.15,
        paddingTop: 10,
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
    },
    card: {
        width: (width - 60) / 2,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        padding: 10,
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    labName: {
        fontWeight: '600',
        fontSize: 18,
        marginTop: 6,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
        color: '#00071A',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    infoIcon: {
        width: 8,
        height: 10,
        resizeMode: 'contain',
        marginRight: 6,
    },

    labDetails: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        color: '#3F4254',
    },
    selectButton: {
        marginTop: 8,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#1E3989',
        borderRadius: 100,
        paddingVertical: 8,
        alignItems: 'center',
    },
    selectButtonText: {
        color: '#1E3989',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold
    },
    addLabContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        width: width - 40,
    },
    gradientButton: {
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
    },
    addLabText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: FONT_FAMILY.fontFamilyWixMedium
    },
});

