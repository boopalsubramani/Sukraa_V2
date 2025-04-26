import { createSlice } from '@reduxjs/toolkit';
import { UserViewService } from '../service/UserViewService';

const initialState = {
    userView: [],
};

export const UserViewSlice = createSlice({
    name: 'userView',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            UserViewService.endpoints.UserView.matchFulfilled,
            (state, { payload }) => {
                console.log('payload', payload);
                if (payload.Code === 200) {
                    console.log(
                        'APISUCCESS-------UserView---------------->',
                        payload.Message,
                    );
                    state.userView = payload.Message;
                }
            },
        );
    },
});

export const { } = UserViewSlice.actions;

export default UserViewSlice.reducer;
