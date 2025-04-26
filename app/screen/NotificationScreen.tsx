import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { IMAGES } from '../utils/SharedImages';
import { FONT_FAMILY } from '../utils/Constants';
import { useNotificationListMutation } from '../redux/service/NotificationListService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotificationUpdateMutation } from '../redux/service/NotificationUpdateService';

const { width, height } = Dimensions.get('window');

const NotificationScreen = ({ navigation }: any) => {
    const [notificationListAPIReq, { isLoading }] = useNotificationListMutation();
    const [notificationUpdateAPIReq] = useNotificationUpdateMutation();

    const [notifications, setNotifications] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const storedUserDetails: any = await AsyncStorage.getItem('userDetails');
                if (storedUserDetails) {
                    const parsedDetails = JSON.parse(storedUserDetails);
                    const username = parsedDetails?.UserName;
                    if (!username) return;

                    const response: any = await notificationListAPIReq({ Username: username });
                    console.log('Notification API Response:', response);

                    if (response?.data?.SuccessFlag === 'true' && Array.isArray(response.data.Message)) {
                        let allNotifications: any[] = [];

                        response.data.Message.forEach((section: any) => {
                            if (Array.isArray(section.Notification_List)) {
                                const sectionNotifications = section.Notification_List.map((item: any) => ({
                                    id: item.Notification_Id,
                                    title: 'Notification',
                                    message: item.Notify_Message,
                                    time: item.Time_Diff_Desc,
                                    isRead: item.IsRead !== '0', 
                                }));
                                allNotifications = [...allNotifications, ...sectionNotifications];
                            }
                        });

                        setNotifications(allNotifications);
                    } else {
                        console.log('No valid notifications found.');
                        setNotifications([]); 
                    }
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleMarkAllAsRead = async () => {
        try {
            const storedUserDetails: any = await AsyncStorage.getItem('userDetails');
            if (storedUserDetails) {
                const parsedDetails = JSON.parse(storedUserDetails);
                const username = parsedDetails?.UserName;
                if (!username) return;

                // Update notification status for each notification
                const updatedNotifications = notifications.map((notification) => ({
                    ...notification,
                    isRead: 1,
                }));
                setNotifications(updatedNotifications);

                // Make the API call to update each notification as read
                await Promise.all(
                    notifications.map(async (notification) => {
                        if (!notification.isRead) {
                            const response = await notificationUpdateAPIReq({
                                Username: username,
                                Notify_Id: notification.id,
                                Notify_Status: 'R', 
                            });
                            console.log('Notification Update Response:', response);
                        }
                    })
                );
            }
        } catch (error) {
            console.error('Error updating notifications:', error);
        }
    };

    const filteredNotifications =
        activeTab === 'unread'
            ? notifications.filter((item: any) => !item.isRead)
            : notifications;

    const renderItem = ({ item }: any) => (
        <View style={[styles.notificationItem, !item.isRead && styles.unreadBackground]}>
            <View style={styles.iconWrapper}>
                <Image
                    source={IMAGES.Calendar}
                    style={{ width: 18, height: 12, resizeMode: 'contain' }}
                />
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

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('all')}>
                    <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('unread')}>
                    <Text style={[styles.tabText, activeTab === 'unread' && styles.tabTextActive]}>
                        Unread
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.markAll} onPress={handleMarkAllAsRead}>
                    <Text style={styles.markAllText}>Mark all as read</Text>
                </TouchableOpacity>
            </View>

            {/* Loader or Empty or List */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#1E3989" style={{ marginTop: 20 }} />
            ) : filteredNotifications.length === 0 ? (
                <Text style={styles.emptyText}>No notifications found.</Text>
            ) : (
                <FlatList
                    data={filteredNotifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
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
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
    },
    tabText: {
        color: '#3F4254',
        fontWeight: '500',
        fontSize: 12,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
    },
    markAll: {
        marginLeft: 'auto',
    },
    markAllText: {
        color: '#1E3989',
        fontWeight: '500',
        fontSize: 14,
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinSemiBold,
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
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
    message: {
        color: '#666',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
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
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 14,
        color: '#7E8299',
        fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
    },
});
