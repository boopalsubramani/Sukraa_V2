import { createSlice } from '@reduxjs/toolkit';
import { GetTitleService } from '../service/GetTitleService';

const initialState = {
    getTitle: [],
};

export const GetTitleSlice = createSlice({
    name: 'getTitle',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            GetTitleService.endpoints.GetTitle.matchFulfilled,
            (state, { payload }) => {
                console.log('payload', payload);
                if (payload.Code === 200) {
                    console.log(
                        'APISUCCESS-------getTitle---------------->',
                        payload.Message,
                    );
                    state.getTitle = payload.Message;
                }
            },
        );
    },
});

export const { } = GetTitleSlice.actions;

export default GetTitleSlice.reducer;


