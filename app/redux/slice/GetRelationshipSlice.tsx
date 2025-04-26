import { createSlice } from '@reduxjs/toolkit';
import { GetRelationshipService } from '../service/GetRelationshipService';

const initialState = {
    getRelationship: [],
};

export const GetRelationshipSlice = createSlice({
    name: 'getRelationship',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            GetRelationshipService.endpoints.GetRelationship.matchFulfilled,
            (state, { payload }) => {
                console.log('payload', payload);
                if (payload.Code === 200) {
                    console.log(
                        'APISUCCESS-------GetRelationship---------------->',
                        payload.Message,
                    );
                    state.getRelationship = payload.Message;
                }
            },
        );
    },
});

export const { } = GetRelationshipSlice.actions;

export default GetRelationshipSlice.reducer;


