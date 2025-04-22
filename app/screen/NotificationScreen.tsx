import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
} from 'react-native';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY } from '../utils/Constants';

const { width, height } = Dimensions.get('window');

const notifications = [
    {
        id: '1',
        title: 'Schedule Confirmation',
        message: 'You have successfully done a sample reg...',
        time: '12:30 PM',
        isRead: false,
    },
    {
        id: '2',
        title: 'Schedule Confirmation',
        message: 'You have successfully done a sample reg...',
        time: '11:30 AM',
        isRead: false,
    },
    {
        id: '3',
        title: 'Schedule Confirmation',
        message: 'You have successfully done a sample reg...',
        time: '1 day ago',
        isRead: true,
    },
    {
        id: '4',
        title: 'Schedule Confirmation',
        message: 'You have successfully done a sample reg...',
        time: '17th April,2025',
        isRead: true,
    },
];


const NotificationScreen = ({ navigation }: any) => {
    const handleBack = () => {
        navigation.goBack();
    };

    const renderItem = ({ item }: any) => (
        <View style={[styles.notificationItem, !item.isRead && styles.unreadBackground]}>
            <View style={styles.iconWrapper}>
                <Image source={IMAGES.Calendar} style={{ width: 18, height: 12, resizeMode: 'contain' }} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.header}>Notification</Text>
            </View>

            {/* Tabs and Mark all */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tabButton}>
                    <Text style={styles.tabTextActive}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}>
                    <Text style={styles.tabText}>Unread</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.markAll}>
                    <Text style={styles.markAllText}>Mark all as read</Text>
                </TouchableOpacity>
            </View>

            {/* Notifications List */}
            <FlatList
                data={notifications}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
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
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    tabButton: {
        marginRight: 16,
    },
    tabTextActive: {
        color: '#1E3989',
        fontWeight: '500',
        paddingBottom: 4,
        fontSize: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#0A47A8',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold
    },
    tabText: {
        color: '#3F4254',
        fontWeight: '500',
        fontSize: 12,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold
    },
    markAll: {
        marginLeft: 'auto',
    },
    markAllText: {
        color: '#1E3989',
        fontWeight: '500',
        fontSize: 14,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 8,
    },
    unreadBackground: {
        backgroundColor: '#F1F6FD',
    },
    iconWrapper: {
        backgroundColor: '#E1EDFD',
        padding: 8,
        borderRadius: 8,
        marginRight: 10,
        marginTop: 4,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: '500',
        marginBottom: 2,
        fontSize: 14,
        color: '#181C32',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium
    },
    message: {
        color: '#666',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium
    },
    timeText: {
        color: '#7E8299',
        fontSize: 10,
        marginLeft: 8,
        marginTop: 4,
        fontWeight: '400',
    },
    separator: {
        height: 1,
        backgroundColor: '#E4E6EF',
        marginVertical: 4,
    },
});
