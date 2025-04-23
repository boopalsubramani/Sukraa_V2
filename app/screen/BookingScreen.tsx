import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY } from '../utils/Constants';

const { width, height } = Dimensions.get('window');

const bookings = [
    {
        title: 'Basic Health Checkup',
        patient: 'Mrs.Fatima',
        date: 'On April 20th',
        type: 'Home Visit',
        bookingId: 'AD232193481',
        sampleId: '',
        status: 'Allocated',
        price: '',
    },
    {
        title: 'Diabetes Screening',
        patient: 'Mrs.Fatima',
        date: 'On April 20th',
        type: 'Home Visit',
        bookingId: 'AD232193481',
        sampleId: '',
        status: 'PayNow',
        price: 'SAR 599',
    },
    {
        title: 'Basic Health Checkup',
        patient: 'Mrs.Fatima',
        date: 'On April 10th',
        type: 'Lab Visit',
        bookingId: 'AD232193481',
        sampleId: 'AS43567891',
        status: 'ReportDelivered',
    },
];

const BookingCard = ({ item, onPressCard, onPressPay }: any) => {
    const renderStatus = () => {
        switch (item.status) {
            case 'Allocated':
                return <Text style={styles.allocated}>Allocated Booking</Text>;

            case 'PayNow':
                return (
                    <TouchableOpacity onPress={() => onPressPay(item)}>
                        <LinearGradient
                            colors={['#1E3989', '#9B71AA', '#87C699']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.payNowButton}
                        >
                            <Text style={styles.payNowText}>Pay Now {item.price}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                );

            case 'ReportDelivered':
                return <Text style={styles.reportDelivered}>Report Delivered</Text>;

            default:
                return null;
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPressCard(item)}>
            <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                    <Image source={IMAGES.BookSummary} style={styles.cardIcon} />
                </View>

                <View style={{ flex: 1 }}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.rowCenter}>
                            <Image source={IMAGES.Location} style={styles.locationIcon} />
                            <Text style={styles.sdlText}>SDL</Text>
                        </View>
                    </View>

                    <Text style={styles.subText}>
                        {item.patient} | {item.date} | {item.type}
                    </Text>

                    <Text style={styles.bookingId}>
                        Booking ID: <Text style={styles.bold}>{item.bookingId}</Text>
                    </Text>

                    {item.sampleId ? (
                        <Text style={styles.bookingId}>
                            Sample ID: <Text style={styles.bold}>{item.sampleId}</Text>
                        </Text>
                    ) : null}

                    {renderStatus()}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const BookingsScreen = ({ navigation }: any) => {
    const handleCardPress = (item: any) => {
      console.log('Card pressed:', item.bookingId);
      navigation.navigate('BookingSummary', { item });
    };
  
    const handlePayNowPress = (item: any) => {
      console.log('Pay Now pressed for:', item.bookingId);
      // navigation.navigate('PaymentScreen', { item });
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={styles.header}>My Bookings</Text>
        </View>
  
        <FlatList
          data={bookings}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <BookingCard
              item={item}
              onPressCard={handleCardPress}
              onPressPay={handlePayNowPress}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    );
  };
  

export default BookingsScreen;

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
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
        color: '#00071A',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E4E6EF',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: '#FFF9F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cardIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    locationIcon: {
        width: 14,
        height: 18,
        resizeMode: 'contain',
        marginRight: 4,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
        color: '#00071A',
    },
    subText: {
        fontSize: 16,
        color: '#00071A',
        marginVertical: 4,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular,
    },
    bookingId: {
        fontSize: 16,
        color: '#00071A',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
    bold: {
        fontWeight: '600',
    },
    sdlText: {
        fontSize: 14,
        color: '#00071A',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
    allocated: {
        marginTop: 8,
        fontSize: 14,
        color: '#F89C47',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
    payNowButton: {
        marginTop: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    payNowText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: FONT_FAMILY.fontFamilyWixMedium,
    },
    reportDelivered: {
        marginTop: 8,
        color: '#50CD89',
        fontSize: 16,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
});




