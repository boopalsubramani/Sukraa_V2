import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../utils/SharedImages';
import Header from '../components/Common/Header';
import { FONT_FAMILY } from '../utils/Constants';


const screenWidth = Dimensions.get('window').width;
const ITEM_MARGIN = 8;
const NUM_COLUMNS = 3;
const ITEM_WIDTH = (screenWidth - ITEM_MARGIN * (NUM_COLUMNS - 10)) / NUM_COLUMNS;

const slides = [
    {
        id: '1',
        title: 'Schedule Your Health Test Now!',
        subtitle: 'Home sample collection & certified lab results.',
    },
    {
        id: '2',
        title: 'Special Offers',
        subtitle: 'Get 20% off on all health packages',
    },
];

const frequentTests = [
    { id: '1', name: 'Fever', image: "", color: '#FFD596', backgroundColor: "#FFF8DD" },
    { id: '2', name: 'Urine Test', image: "", color: '#9EB5F9', backgroundColor: "#F1FAFF" },
    { id: '3', name: 'Pancreatitis', image: "", color: '#87C699', backgroundColor: "#E8FFF3" },
    { id: '4', name: 'Blood sugar', image: "", color: '#D9524F', backgroundColor: "#FFF5F8" },
    { id: '5', name: 'Thyroid test', image: "", color: '#F89C47', backgroundColor: "#FFF9F4" },
];

const healthPackages = [
    {
        id: '1',
        title: 'Full Body Checkup - Advanced',
        description: 'Home sample collection',
        tests: 15,
        price: 1799,
        originalPrice: 2499,
        recommended: true,
    },
    {
        id: '2',
        title: 'Basic Body Checkup',
        description: 'Home Sample Collection',
        tests: 8,
        price: 999,
        originalPrice: 1499,
        recommended: true,
    },
];

const forWhom = ['Add new', 'Myself', 'Mother', 'Father'];

const relationNameMap = {
    'Myself': 'You',
    'Mother': 'Sudari',
    'Father': 'Ravi',
};

const HomeScreen = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [selectedPerson, setSelectedPerson] = useState('Mother');
    const [paymentMethod, setPaymentMethod] = useState('Cash');

    const handlePress = (item) => {
        if (item === 'Add new') {
            //navigation.navigate('Add'); // 👈 Navigate to Add screen
        } else {
            setSelectedPerson(item);
        }
    };


    return (
        <>
            <Header location="Jeddah, Saudi Arabia" />
            <ScrollView
                style={styles.container}>
                <Text style={styles.sectionTitle}>Who is this for?</Text>
                <FlatList
                    data={forWhom}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.personButton,
                                selectedPerson === item && styles.personButtonActive,
                            ]}
                            onPress={() => handlePress(item)}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {item === 'Add new' && (
                                    <Image source={IMAGES.Add} style={{
                                        width: 12,
                                        height: 12,
                                        resizeMode: 'contain',
                                        marginRight: 5,
                                    }} />
                                )}
                                <Text
                                    style={[
                                        styles.personButtonText,
                                        selectedPerson === item && styles.personButtonTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </View>
                        </TouchableOpacity>

                    )}
                    keyExtractor={item => item}
                />
                {selectedPerson && relationNameMap[selectedPerson] && (
                    <Text style={styles.selectionName}>
                        {relationNameMap[selectedPerson]}
                    </Text>
                )}

                {/* Payment Method */}
                <View>
                    <Text style={styles.sectionTitle}>Payer</Text>
                    <View style={styles.paymentButtons}>
                        {['Cash', 'Insurance'].map(method => (
                            <TouchableOpacity
                                key={method}
                                style={[
                                    styles.paymentButton,
                                    paymentMethod === method && styles.paymentButtonActive,
                                ]}
                                onPress={() => setPaymentMethod(method)}>
                                <Text
                                    style={[
                                        styles.paymentButtonText,
                                        paymentMethod === method && styles.paymentButtonTextActive,
                                    ]}>
                                    {method}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Image
                        source={IMAGES.Search}
                        style={{ tintColor: '#82869D', resizeMode: 'contain', width: 18, height: 18, marginRight: 8 }}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for tests or health packages"
                        placeholderTextColor="#7E8299"
                    />
                    <Image
                        source={IMAGES.SearchInsta}
                        style={{ width: 18, height: 18, resizeMode: 'contain', marginLeft: 8 }}
                    />
                </View>


                {/* Slides */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {slides.map((slide) => (
                        <LinearGradient
                            key={slide.id}
                            colors={['#1E3989', '#9B71AA', '#87C699']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.slideCard}
                        >
                            <Image source={IMAGES.Doctor} style={styles.slideImage} resizeMode="contain" />
                            <View style={styles.slideContent}>
                                <Text style={styles.doctorTitle}>{slide.title}</Text>
                                <Text style={styles.doctorSubtitle}>{slide.subtitle}</Text>
                            </View>
                        </LinearGradient>
                    ))}
                </ScrollView>

                {/* Pagination */}
                <View style={styles.pagination}>
                    {slides.map((_, index) => (
                        <LinearGradient
                            key={index}
                            colors={
                                index === activeSlide
                                    ? ['#1E3989', '#9B71AA', '#87C699']
                                    : ['#ccc', '#ccc']
                            }
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                styles.paginationDot,
                                index === activeSlide && styles.paginationDotActive,
                            ]}
                        />
                    ))}
                </View>

                {/* Frequent Tests */}
                <Text style={styles.sectionTitle}>Frequent Test</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: ITEM_MARGIN }}>
                    {frequentTests.map(test => (
                        <TouchableOpacity key={test.id} style={{ width: ITEM_WIDTH, marginBottom: ITEM_MARGIN }}>
                            <View style={styles.testItem}>
                                <View
                                    style={[
                                        styles.testItemInner,
                                        { backgroundColor: test.backgroundColor },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.iconContainer,
                                            { backgroundColor: test.color },
                                        ]}
                                    >
                                        <Image source={IMAGES.BloodDrop} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
                                    </View>
                                    <Text style={styles.testLabel} >{test.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>


                {/* Health Packages */}
                <View style={styles.packageSection}>
                    <View style={styles.packageHeader}>
                        <Text style={styles.sectionTitle}>Health Check Package</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewMore}>View More</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={healthPackages}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.packageCard}>
                                {item.recommended && (
                                    <View style={styles.recommendedBadge}>
                                        <Text style={{ color: '#fff', fontSize: 12 }}>
                                            Recommended For You
                                        </Text>
                                    </View>
                                )}
                                <View style={styles.contentContainer}>
                                    <View>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <View style={styles.sampleInfo}>
                                            {/* <MaterialIcons name="home" size={14} color="#666" /> */}
                                            <Text style={styles.sampleText}>{item.description}</Text>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    backgroundColor: '#fff',
                                                    marginVertical: 10,
                                                    borderRadius: 10,
                                                    paddingHorizontal: 8,
                                                }}>
                                                {/* <Image
                          source={require('../assets/testtube.png')}
                          style={styles.testTubeIcon}
                        /> */}
                                                <Text style={styles.timeText}>{item.tests}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <TouchableOpacity>
                                            <LinearGradient
                                                colors={['#1E3989', '#9B71AA', '#87C699']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                style={styles.addButton}>
                                                <Text style={styles.buttonText}>Add to Lab</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={styles.price}>SAR {item.price}</Text>
                                            <Text style={styles.originalPrice}>SAR2499</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
            </ScrollView>
        </>
    );
}

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 100,
        marginTop: 20,
        backgroundColor: '#EFF2F5',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 18
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
    },
    paginationDot: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
        borderRadius: 5,
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#333',
    },
    sectionTitle: {
        color: "#00071A",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 10,
    },
    personButton: {
        flexDirection: "row",
        borderRadius: 100,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    personButtonActive: {
        backgroundColor: '#1E3989',
    },
    personButtonText: {
        fontSize: 16,
        alignItems: 'center',
        color: '#3F4254',
    },
    personButtonTextActive: {
        color: '#fff',
    },
    selectionName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "#1E3989"
    },
    paymentButtons: {
        flexDirection: 'row',
    },
    paymentButton: {
        paddingHorizontal: 21,
        paddingVertical: 14,
        borderRadius: 100,
        backgroundColor: '#F1FAFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    paymentButtonActive: {
        backgroundColor: '#1E3989',
    },
    paymentButtonText: {
        fontSize: 16,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        color: '#333',
    },
    paymentButtonTextActive: {
        color: '#fff',
    },
    testItem: {
        flexDirection: "row",
    },
    testItemInner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 100,
        shadowColor: '#000',
        elevation: 2,
    },
    iconContainer: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    testLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    testName: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    packageSection: {
        marginTop: 24,
        marginBottom: 24,
    },
    packageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 16,
    },
    viewMore: {
        color: '#2376F9',
        fontSize: 16,
    },
    packageCard: {
        flex:1,
        width: screenWidth * 0.90,
        paddingHorizontal:16,
        paddingVertical:8,
        marginTop: 20,
        flexDirection: 'row',
        borderRadius: 8,
        marginRight: 16,
        backgroundColor: '#C8DFFF',
    },
    recommendedBadge: {
        position: "absolute",
        backgroundColor: '#1E3989',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignSelf: 'flex-start',
    },
    contentContainer: {
        // gap: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#00071A',
        marginTop: 20,
        marginBottom: 8,
    },
    sampleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sampleText: {
        fontSize: 13,
        color: '#3F4254',
    },
    dotContainer: {
        paddingHorizontal: 8,
        justifyContent: 'center',
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#666',
    },
    testTubeIcon: {
        width: 15,
        height: 15,
        resizeMode: "contain"
    },
    timeText: {
        fontSize: 13,
        color: '#00071A',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    price: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000000',
        fontFamily:FONT_FAMILY.fontFamilyAnekLatinSemiBold
    },
    originalPrice: {
        fontSize: 16,
        color: '#000000',
        textDecorationLine: 'line-through',
        fontFamily:FONT_FAMILY.fontFamilyAnekLatinMedium
    },
    addButton: {
        borderRadius: 100,
        width:96,
        height:37,
        alignItems: 'center',
        justifyContent:'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    slideCard: {
        marginTop: 20,
        flexDirection: 'row',
        borderRadius: 12,
        marginRight: 16,
        alignItems: 'center',
        maxWidth: screenWidth * 0.9,
        minWidth: 280,
    },
    slideImage: {
        width: 100,
        height: 120,
    },
    slideContent: {
        flex: 1,
        flexShrink: 1,
    },
    doctorTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flexWrap: 'wrap',
    },
    doctorSubtitle: {
        fontSize: 14,
        color: '#fff',
        marginTop: 4,
        flexWrap: 'wrap',
    },
});