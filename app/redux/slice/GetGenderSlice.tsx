import { createSlice } from '@reduxjs/toolkit';
import { LoginService } from '../service/LoginService';
import { GetGenderService } from '../service/GetGenderService';

const initialState = {
    getGender: [],
};

export const GetGenderSlice = createSlice({
    name: 'getGender',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            GetGenderService.endpoints.GetGender.matchFulfilled,
            (state, { payload }) => {
                console.log('payload', payload);
                if (payload.Code === 200) {
                    console.log(
                        'APISUCCESS-------GetGender---------------->',
                        payload.Message,
                    );
                    state.getGender = payload.Message;
                }
            },
        );
    },
});

export const { } = GetGenderSlice.actions;

export default GetGenderSlice.reducer;


