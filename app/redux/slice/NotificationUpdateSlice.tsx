import { createSlice } from '@reduxjs/toolkit';
import { LoginService } from '../service/LoginService';
import { NotificationUpdateService } from '../service/NotificationUpdateService';

const initialState = {
    notificationUpdate: [],
};

export const NotificationUpdateSlice = createSlice({
    name: 'notificationUpdate',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            NotificationUpdateService.endpoints.NotificationUpdate.matchFulfilled,
            (state, { payload }) => {
                console.log('payload', payload);
                if (payload.Code === 200) {
                    console.log(
                        'APISUCCESS---------notificationUpdate---------------->',
                        payload.Message,
                    );
                    state.notificationUpdate = payload.Message;
                }
            },
        );
    },
});

export const { } = NotificationUpdateSlice.actions;

export default NotificationUpdateSlice.reducer;


