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


const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        // image: require("../assets/image6.png"),
        image: "",
        title: 'Schedule Your Health Test Now!',
        subtitle: 'Home sample collection & certified lab results.',
    },
    {
        id: '2',
        // image: require("../assets/image6.png"),
        image: "",
        title: 'Special Offers',
        subtitle: 'Get 20% off on all health packages',
    },
];

const frequentTests = [
    // { id: '1', name: 'Fever', image: require("../assets/Thermometer.png"), color: '#FFD596',backgroundColor:"#FFF8DD" },
    // { id: '2', name: 'Urine Test', image: require("../assets/urine.png"), color: '#9EB5F9',backgroundColor:"#F1FAFF" },
    // { id: '3', name: 'Pancreatitis', image: require("../assets/Pancreatitis.png"), color: '#87C699',backgroundColor:"#E8FFF3"  },
    // { id: '4', name: 'Blood sugar', image: require("../assets/blood.png"), color: '#D9524F',backgroundColor:"#FFF5F8"  },
    // { id: '5', name: 'Thyroid test', image: require("../assets/Thyroidtest.png"), color: '#F89C47',backgroundColor:"#FFF9F4"  },
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
                <View style={styles.paymentSection}>
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
                    <Image source={IMAGES.Search} />
                    {/* <Search size={20} color="#666" /> */}
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for tests or health packages"
                        placeholderTextColor="#7E8299"
                    />
                    <Image source={IMAGES.SearchInsta} />
                </View>

                {/* Slides */}
                <FlatList
                    data={slides}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={e => {
                        const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
                        setActiveSlide(newIndex);
                    }
                    }
                    renderItem={({ item }) => (
                        <LinearGradient
                            key={item.id}
                            colors={['#1E3989', '#9B71AA', '#87C699']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.slide}
                        >
                            <View style={styles.slideRow}>
                                {/* Left Image */}
                                {/* <Image source={item.image} style={styles.slideImage} /> */}

                                {/* Right Content */}
                                <View style={styles.slideContent}>
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.slideTitle}>{item.title}</Text>
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.slideSubtitle}>{item.subtitle}</Text>
                                    <TouchableOpacity style={styles.bookButton}>
                                        <Text style={styles.bookButtonText}>Book Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>


                    )}
                    keyExtractor={item => item.id}
                />

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

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {frequentTests.map(test => (
                        <TouchableOpacity key={test.id}>
                            <View style={styles.testItem}>
                                <View
                                    style={[
                                        styles.testItemInner,
                                        { backgroundColor: test.backgroundColor },
                                    ]}>
                                    <View
                                        style={[
                                            styles.iconContainer,
                                            { backgroundColor: test.color },
                                        ]}>
                                        {/* <Image
                      source={test.image}
                      style={styles.testImage}
                      resizeMode="contain"
                    /> */}
                                    </View>
                                    <Text style={styles.testLabel}>{test.name}</Text>
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
        paddingHorizontal: 20
    },
    header: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'flex-start',
        // padding: 10,
        backgroundColor: '#fff',
        // paddingTop: Platform.OS === 'web' ? 16 : 48,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIconWrapper: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    locationTextContainer: {
        flexDirection: 'column',
    },
    locationCity: {
        fontSize: 16,
        fontWeight: '500',
        color: '#00071A',
        lineHeight: 20,
    },
    locationCountry: {
        fontSize: 16,
        fontWeight: '500',
        color: '#00071A',
        lineHeight: 20,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconButton: {
        padding: 4,
    },
    iconCircle: {
        width: 22,
        height: 16,
        borderRadius: 100,
        backgroundColor: '#EFF2F5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    testIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },

    testImage: {
        width: 24,
        height: 24,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#EFF2F5"
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,

    },
    slide: {
        width: width - 68,
        height: 180,
        borderRadius: 12,
        overflow: 'hidden',
        padding: 8,
        marginHorizontal: 16,
        marginVertical: 10,
    },

    slideRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    slideImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        // marginRight: 16,
    },

    slideContent: {
        flex: 1,
        justifyContent: 'center',
    },

    slideTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
        flexWrap: 'wrap',
    },

    slideSubtitle: {
        fontSize: 14,
        color: '#f0f0f0',
        marginBottom: 12,
        flexWrap: 'wrap',

    },

    bookButton: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },

    bookButtonText: {
        color: '#1E3989',
        fontWeight: 'bold',
    }
    ,
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
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
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        marginRight: 8,
        backgroundColor: '#F1FAFF',
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
    paymentSection: {
        // marginTop: 14,
    },
    paymentButtons: {
        flexDirection: 'row',
        // marginHorizontal: 16,
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
    frequentTests: {
        paddingHorizontal: 16,
        flexWrap: "wrap-reverse",
    },
    testItem: {
        marginRight: 10,
        marginVertical: 5,
        flexDirection: "row",
    },
    testItemInner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    testLabel: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },

    testIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
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
        width: width - 100,
        marginHorizontal: 8,
        padding: 16,
        backgroundColor: '#C8DFFF',
        borderRadius: 12,
        marginBottom: 16,
    },
    recommendedBadge: {
        position: "absolute",
        backgroundColor: '#1E3989',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignSelf: 'flex-start',
        // marginBottom: 12,

    },
    recommendedText: {
        fontSize: 11,
        fontWeight: '600',
        textAlign: "center"
    },

    // PackageScreen
    recommendedText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    contentContainer: {
        gap: 12,
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
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    originalPrice: {
        fontSize: 13,
        color: '#666',
        textDecorationLine: 'line-through',
    },
    addButton: {
        borderRadius: 30,
        padding: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});