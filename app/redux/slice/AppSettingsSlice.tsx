import { createSlice } from '@reduxjs/toolkit';
import { AppSettingService } from '../service/AppSettingsService';

const initialState = {
    appSettings: [],
};

export const AppSettingsSlice = createSlice({
    name: 'appsettings',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            AppSettingService.endpoints.AppSetting.matchFulfilled,
            (state, { payload }) => {
                console.log("payload", payload)
                if (payload.Code === 200) {
                    console.log('APISUCCESS-------AppSetting---------------->', payload.Message);
                    state.appSettings = payload.Message;
                }
            },
        );
    },
});

export const { } = AppSettingsSlice.actions;

export default AppSettingsSlice.reducer;
