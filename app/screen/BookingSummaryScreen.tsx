import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY } from '../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const steps = [
    { step: '1', title: 'Payment Completed', date: 'April 19ᵗʰ 2025, 10:00 am' },
    { step: '2', title: 'Allocated Booking', date: 'April 20ᵗʰ 2025, 10 - 10:30 am', active: true },
    { step: '3', title: 'Sample Collect', date: 'April 20ᵗʰ 2025' },
    { step: '4', title: 'Report delivered', date: 'April 20ᵗʰ 2025' },
];

const BookingSummaryScreen = ({ navigation }: any) => {
    const [showSteps, setShowSteps] = useState(false);
    const [showAmountDetails, setShowAmountDetails] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.rowStart}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Booking Summary</Text>
                </View>
                <View style={styles.rowEnd}>
                    <Image source={IMAGES.Location} style={styles.locationIcon} />
                    <Text style={styles.locationText}>SDL</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <View style={styles.rowAlign}>
                        <View style={styles.iconWrapper}>
                            <Image source={IMAGES.BookSummary} style={styles.cardIcon} />
                        </View>
                        <View>
                            <Text style={styles.title}>Basic Health Checkup</Text>
                            <Text style={styles.subTitle}>SAR 999  |  Mother  |  Results 24 hr</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Patient</Text>
                        <Text style={styles.value}>Mrs. Fatima D</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Sample will be collected at your home</Text>
                        <Text style={styles.address}>Purujit KG, 123 Colony, Riyadh, Saudi Arabia</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Scheduled Slot</Text>
                        <Text style={styles.value}>20th April at 10 - 10:30 AM</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Booking ID</Text>
                        <Text style={styles.value}>AD232193481</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Paid Amount</Text>
                        <Text style={styles.value}>SAR 999</Text>
                    </View>
                </View>

                <View style={styles.reportCard}>
                    <View style={styles.reportRow}>
                        <Image source={IMAGES.Pdf} style={styles.pdfIcon} />
                        <Text style={styles.reportText}>Report available on</Text>
                        <Text style={styles.reportDate}>April 21ᵗʰ 2025</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.statusRow}>
                        <Text style={styles.status}>
                            Current Status: <Text style={styles.allocated}>Allocated Booking</Text>
                        </Text>
                        <TouchableOpacity onPress={() => setShowSteps(prev => !prev)}>
                            <Image
                                source={IMAGES.DownArrow}
                                style={[
                                    styles.downArrow,
                                    showSteps && { transform: [{ rotate: '180deg' }] }
                                ]}
                            />
                        </TouchableOpacity>
                    </View>

                    {showSteps && steps.map((item, i) => (
                        <View style={styles.stepContainer} key={i}>
                            <View style={[styles.stepCircle, item.active && styles.activeStep]}>
                                <Text style={styles.stepText}>{item.step}</Text>
                            </View>
                            <View>
                                <Text style={styles.stepTitle}>{item.title}</Text>
                                <Text style={styles.stepDate}>{item.date}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.amountBox}>
                    <View style={styles.statusRow}>
                        <Text style={styles.amountText}>
                            Amount to Pay <Text style={styles.amountValue}>SAR 999</Text>
                        </Text>
                        <TouchableOpacity onPress={() => setShowAmountDetails(prev => !prev)}>
                            <Image
                                source={IMAGES.DownArrow}
                                style={[
                                    styles.downArrow,
                                    showAmountDetails && { transform: [{ rotate: '180deg' }] }
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                    {showAmountDetails && (
                        <Text style={styles.discount}>₹99 saved on total</Text>
                    )}
                </View>

                <View style={styles.ratingCard}>
                    <Text style={styles.ratingTitle}>Rate Us !</Text>
                    <Text style={styles.ratingSubtitle}>How would you like to rate the service</Text>

                    <View style={styles.starRow}>
                        {[...Array(5)].map((_, index) => (
                            <Image
                                key={index}
                                source={IMAGES.Star}
                                style={styles.starIcon}
                            />
                        ))}
                    </View>

                    <View style={styles.ratingActions}>
                        <TouchableOpacity style={styles.writeReviewBtn}>
                            <Text style={styles.writeReviewText}>Write Review</Text>
                        </TouchableOpacity>
                        <LinearGradient
                            colors={['#1E3989', '#50CD89']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.submitBtn}
                        >
                            <TouchableOpacity style={styles.gradientButtonTouch}>
                                <Text style={styles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                    </View>
                </View>


            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: width * 0.05 },
    scrollContent: { paddingBottom: 40 },
    headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: height * 0.02 },
    rowStart: { flexDirection: 'row', alignItems: 'center' },
    rowEnd: { flexDirection: 'row', alignItems: 'center' },
    rowAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
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
    backArrow: { width: 10, height: 16, resizeMode: 'contain', marginRight: 16 },
    locationIcon: { width: 14, height: 18, resizeMode: 'contain', marginRight: 4 },
    header: { fontSize: 16, fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold, color: '#00071A' },
    locationText: { fontSize: 14, color: '#555' },
    card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E4E6EF' },
    title: { fontSize: 24, fontWeight: '500', fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold, color: '#00071A' },
    subTitle: { fontSize: 16, fontWeight: '400', color: '#3F4254', fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular },
    section: { marginTop: 10 },
    label: { fontSize: 20, fontWeight: '500', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium },
    value: { fontSize: 16, fontWeight: '400', fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular, color: '#3F4254' },
    address: { fontSize: 16, fontWeight: '400', fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular, color: '#3F4254' },
    reportCard: { backgroundColor: '#fff', borderRadius: 12, padding: 10, marginBottom: 16, borderColor: '#eee', borderWidth: 1, marginVertical: 5 },
    reportRow: { flexDirection: 'row', alignItems: 'center' },
    pdfIcon: { width: 15, height: 15, resizeMode: 'contain', marginRight: 10 },
    reportText: { fontSize: 16, fontWeight: '500', fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular },
    reportDate: { fontSize: 16, fontWeight: '600', marginLeft: 'auto', fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    downArrow: {
        width: 10,
        height: 12,
        resizeMode: 'contain',
        tintColor: '#82869D',
    },
    status: { fontSize: 14, fontWeight: '600' },
    allocated: { fontSize: 16, fontWeight: '500', fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold, color: '#F89C47' },
    stepContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    stepCircle: { width: 28, height: 28, borderRadius: 50, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    activeStep: { backgroundColor: '#1E3989' },
    stepText: { fontSize: 16, color: '#fff', fontWeight: '600', fontFamily: FONT_FAMILY.fontFamilyWixMedium },
    stepTitle: { fontSize: 16, fontWeight: '500', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium, color: '#000' },
    stepDate: { fontSize: 12, color: '#7E8299', fontWeight: '500' },
    amountBox: { backgroundColor: '#EFF2F5', borderRadius: 12, padding: 16, marginBottom: 32 },
    amountText: { fontSize: 12, fontWeight: '600', fontFamily: FONT_FAMILY.fontFamilyPoppinsMedium, color: '#3F4254' },
    amountValue: { fontSize: 14, fontWeight: '600', fontFamily: FONT_FAMILY.fontFamilyPoppinsSemiBold, color: '#000' },
    discount: { fontSize: 16, fontWeight: '600', fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium, color: '#50CD89', },
    ratingCard: {
        backgroundColor: '#FFF9F4',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginBottom: 32,
    },
    ratingTitle: {
        fontSize: 21,
        fontWeight: '600',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
        color: '#000000',
        marginBottom: 8,
    },
    ratingSubtitle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
        color: '#3F4254',
        marginBottom: 12,
    },
    starRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    starIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginHorizontal: 4,
    },
    ratingActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    writeReviewBtn: {
        borderWidth: 1,
        borderColor: '#1E3989',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        flex: 1,
        marginRight: 8,
        alignItems: 'center',
    },
    writeReviewText: {
        color: '#1E3989',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
    submitBtn: {
        borderRadius: 20,
        overflow: 'hidden',
        flex: 1,
        marginLeft: 8,
    },
    gradientButtonTouch: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
});
export default BookingSummaryScreen;


