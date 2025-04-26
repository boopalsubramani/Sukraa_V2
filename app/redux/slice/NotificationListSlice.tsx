import { createSlice } from '@reduxjs/toolkit';
import { NotificationListService } from '../service/NotificationListService';

const initialState = {
    notificationList: [],
};

export const NotificationListSlice = createSlice({
    name: 'notificationList',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            NotificationListService.endpoints.NotificationList.matchFulfilled,
            (state, { payload }) => {
                console.log('payload', payload);
                if (payload.Code === 200) {
                    console.log(
                        'APISUCCESS-------NotificationList---------------->',
                        payload.Message,
                    );
                    state.notificationList = payload.Message;
                }
            },
        );
    },
});

export const { } = NotificationListSlice.actions;

export default NotificationListSlice.reducer;


