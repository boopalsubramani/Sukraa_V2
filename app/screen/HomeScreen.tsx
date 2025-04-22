import React, { useState, useRef } from 'react';
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
import MaskedView from '@react-native-masked-view/masked-view';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const ITEM_MARGIN = 6;
const NUM_COLUMNS = 3;
const ITEM_WIDTH = (screenWidth - ITEM_MARGIN * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

const slides = [
    { id: '1', title: 'Schedule Your Health Test Now!', subtitle: 'Home sample collection & certified lab results.' },
    { id: '2', title: 'Special Offers', subtitle: 'Get 20% off on all health packages' },
];

const frequentTests = [
    { id: '1', name: 'Fever', color: '#FFD596', backgroundColor: "#FFF8DD" },
    { id: '2', name: 'Urine Test', color: '#9EB5F9', backgroundColor: "#F1FAFF" },
    { id: '3', name: 'Pancreatitis', color: '#87C699', backgroundColor: "#E8FFF3" },
    { id: '4', name: 'Blood sugar', color: '#D9524F', backgroundColor: "#FFF5F8" },
    { id: '5', name: 'Thyroid test', color: '#F89C47', backgroundColor: "#FFF9F4" },
];

const healthPackages = [
    { id: '1', title: 'Full Body Checkup - Advanced', description: 'Home sample collection', tests: 15, price: 1799, originalPrice: 2499, recommended: true },
    { id: '2', title: 'Basic Body Checkup', description: 'Home Sample Collection', tests: 8, price: 999, originalPrice: 1499, recommended: true },
];

const forWhom = ['Add new', 'Myself', 'Mother', 'Father',];
const relationNameMap = { 'Myself': 'You', 'Mother': 'Sudari', 'Father': 'Ravi' };

const HomeScreen = ({ navigation }: any) => {
    const [selectedPerson, setSelectedPerson] = useState('Mother');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollViewRef = useRef(null);

    const handlePress = ({ item }: any) => {
        if (item === 'Add new') {
            navigation.navigate('AddMember');
        } else {
            setSelectedPerson(item);
        }
    };

    const handleScroll = ({ nativeEvent }: any) => {
        const slideWidth = screenWidth * 0.9;
        const xOffset = nativeEvent.contentOffset.x;
        const index = Math.round(xOffset / slideWidth);
        setActiveSlide(index);
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={[styles.personButton, selectedPerson === item && styles.personButtonActive]}
            onPress={() => handlePress({ item })}
        >
            <View style={styles.personButtonContent}>
                {item === 'Add new' && <Image source={IMAGES.Add} style={styles.addIcon} />}
                <Text style={[styles.personButtonText, selectedPerson === item && styles.personButtonTextActive]}>
                    {item}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderPackageItem = ({ item }: any) => (
        <View style={styles.packageCard}>
            {item.recommended && <View style={styles.recommendedBadge}><Text style={styles.recommendedText}>Recommended  For You</Text></View>}
            <View style={styles.contentContainer}>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.sampleInfo}>
                        <Text style={styles.sampleText}>{item.description}</Text>
                        <View style={styles.testCountContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={IMAGES.Telescope} 
                                    style={{ width: 10, height: 10,resizeMode:'contain', marginRight: 5 }} 
                                    resizeMode="contain"
                                />
                                <Text style={styles.timeText}>{item.tests}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#1E3989', '#9B71AA', '#87C699']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.addButton}
                        >
                            <Text style={styles.buttonText}>Add to Lab</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>SAR {item.price}</Text>
                        <Text style={styles.originalPrice}>SAR {item.originalPrice}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <>
            <Header location="Jeddah, Saudi Arabia" />
            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>Who is this for?</Text>
                <FlatList
                    data={forWhom}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                />
                {selectedPerson && relationNameMap[selectedPerson] &&
                    <Text style={styles.selectionName}>{relationNameMap[selectedPerson]}</Text>}

                <View>
                    <Text style={styles.sectionTitle}>Payer</Text>
                    <View style={styles.paymentButtons}>
                        {['Cash', 'Insurance'].map(method => (
                            <TouchableOpacity
                                key={method}
                                style={[styles.paymentButton, paymentMethod === method && styles.paymentButtonActive]}
                                onPress={() => setPaymentMethod(method)}
                            >
                                <Text style={[styles.paymentButtonText, paymentMethod === method && styles.paymentButtonTextActive]}>
                                    {method}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.searchContainer}>
                    <Image source={IMAGES.Search} style={styles.searchIcon} />
                    <TextInput style={styles.searchInput} placeholder="Search for tests or health packages" placeholderTextColor="#7E8299" />
                    <MaskedView
                        maskElement={
                            <Image
                                source={IMAGES.SearchInsta}
                                style={{ width: 20, height: 20, resizeMode: 'contain', }}
                            />
                        }
                    >
                        <LinearGradient
                            colors={['#1E3989', '#9B71AA', '#87C699']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ width: 20, height: 20 }}
                        />
                    </MaskedView>
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {slides.map((slide) => (
                        <LinearGradient key={slide.id} colors={['#1E3989', '#9B71AA', '#87C699']} start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }} style={styles.slideCard}>
                            <Image source={IMAGES.Doctor} style={styles.slideImage} />
                            <View style={styles.slideContent}>
                                <Text style={styles.doctorTitle}>{slide.title}</Text>
                                <Text style={styles.doctorSubtitle}>{slide.subtitle}</Text>
                                <TouchableOpacity style={styles.bookButton}>
                                    <Text style={styles.bookButtonText}>Book Now</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    ))}
                </ScrollView>

                <View style={styles.pagination}>
                    {slides.map((_, index) => (
                        <LinearGradient
                            key={index}
                            colors={activeSlide === index ? ['#1E3989', '#9B71AA', '#87C699'] : ['#ccc', '#ccc']}
                            style={[styles.paginationDot]}
                        />
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Frequent Test</Text>
                <View style={styles.testContainer}>
                    {frequentTests.map(test => (
                        <TouchableOpacity key={test.id} style={{ width: ITEM_WIDTH, marginBottom: ITEM_MARGIN }}>
                            <View>
                                <View style={[styles.testItemInner, { backgroundColor: test.backgroundColor }]}>
                                    <View style={[styles.iconContainer, { backgroundColor: test.color }]}>
                                        <Image source={IMAGES.BloodDrop} style={styles.iconImage} />
                                    </View>
                                    <Text style={styles.testLabel}>{test.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.packageSection}>
                    <View style={styles.packageHeader}>
                        <Text style={styles.sectionTitle}>Health Check Package</Text>
                        <TouchableOpacity><Text style={styles.viewMore}>View More</Text></TouchableOpacity>
                    </View>
                    <FlatList
                        data={healthPackages}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderPackageItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </ScrollView>
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 10 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100, marginTop: 15, borderColor: '#EFF2F5', borderWidth: 1 },
    searchInput: { flex: 1, fontSize: 14, fontWeight: '500', lineHeight: 16, color: '#7E8299', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    searchIcon: { tintColor: '#82869D', width: 16, height: 16, marginHorizontal: 6, resizeMode: 'contain' },
    pagination: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
    paginationDot: { width: 8, height: 8, borderRadius: 100, marginHorizontal: 3 },
    sectionTitle: { color: "#00071A", fontSize: 18, fontWeight: '500', marginVertical: 6, fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold },
    personButton: { flexDirection: "row", borderRadius: 100, backgroundColor: '#f0f0f0', paddingHorizontal: 16, paddingVertical: 8, marginHorizontal: 4 },
    personButtonActive: { backgroundColor: '#1E3989' },
    personButtonText: { fontSize: 14, color: '#3F4254', fontWeight: '400', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    personButtonTextActive: { color: '#fff' },
    personButtonContent: { flexDirection: 'row', alignItems: 'center' },
    addIcon: { width: 10, height: 10, resizeMode: 'contain', marginRight: 4, tintColor: '#3F4254' },
    selectionName: { fontWeight: '500', fontSize: 14, color: "#1E3989", fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    paymentButtons: { flexDirection: 'row' },
    paymentButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, backgroundColor: '#F1FAFF', marginHorizontal: 4 },
    paymentButtonActive: { backgroundColor: '#1E3989' },
    paymentButtonText: { fontSize: 14, color: '#3F4254', fontWeight: '500', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    paymentButtonTextActive: { color: '#fff' },
    testContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: ITEM_MARGIN },
    testItemInner: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 100, shadowColor: '#000', elevation: 2 },
    iconContainer: { width: 20, height: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginRight: 6 },
    iconImage: { width: 14, height: 14, resizeMode: 'contain' },
    testLabel: { fontSize: 14, color: '#3F4254', fontWeight: '500', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    packageSection: { marginVertical: 15 },
    packageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    viewMore: { color: '#2376F9', fontSize: 12, fontWeight: '500', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    packageCard: { width: screenWidth * 0.8, padding: 10, borderRadius: 6, marginRight: 12, backgroundColor: '#C8DFFF' },
    recommendedBadge: { position: "absolute", backgroundColor: '#1E3989', padding: 3, borderTopLeftRadius: 8, borderBottomRightRadius: 8, alignSelf: 'flex-start' },
    recommendedText: { color: '#FFFFFF', fontSize: 10, fontWeight: '500', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    contentContainer: { flex: 1 },
    title: { fontSize: 18, fontWeight: '600', color: '#00071A', marginTop: 8, fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold },
    sampleInfo: { flexDirection: 'row', alignItems: 'center', gap: 3 },
    sampleText: { fontSize: 14, color: '#3F4254', fontWeight: '400', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    testCountContainer: { flexDirection: 'row', backgroundColor: '#F1FAFF', marginVertical: 8, borderRadius: 100, paddingHorizontal: 6 },
    timeText: { fontSize: 10, color: '#00071A', fontWeight: '400', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    priceContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    price: { fontSize: 14, fontWeight: '700', marginRight: 6, color: '#000000', fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold },
    originalPrice: { fontSize: 12, color: '#000000', textDecorationLine: 'line-through', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    addButton: { borderRadius: 100, width: 80, height: 30, alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: 'white', fontSize: 10, fontWeight: '600', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    slideCard: { marginTop: 15, flexDirection: 'row', borderRadius: 10, marginRight: 12, maxWidth: screenWidth * 0.85, minWidth: 260, },
    slideImage: { width: 90, height: 110, resizeMode: 'contain' },
    slideContent: { flex: 1, justifyContent: 'center', padding: 8 },
    doctorTitle: { fontSize: 20, fontWeight: '600', color: '#FFFFFF', flexWrap: 'wrap', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    doctorSubtitle: { fontSize: 10, fontWeight: '500', color: '#FFFFFF', marginTop: 3, flexWrap: 'wrap' },
    bookButton: {
        backgroundColor: '#EFF2F5',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 100,
        alignSelf: 'flex-start',
        marginTop: 3
    },
    bookButtonText: {
        color: '#1E3989',
        fontWeight: '600',
        fontSize: 10,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium
    }
});

