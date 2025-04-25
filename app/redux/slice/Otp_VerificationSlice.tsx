import {createSlice} from '@reduxjs/toolkit';
import { Otp_VerificationService } from '../service/Otp_VerificationService';

const initialState = {
    otp_verification: [],
};

export const Otp_VerificationSlice = createSlice({
  name: 'otp_verification',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      Otp_VerificationService.endpoints.Otp_Verification.matchFulfilled,
      (state, {payload}) => {
        console.log('payload', payload);
        if (payload.Code === 200) {
          console.log(
            'APISUCCESS-------Otp_Verification---------------->',
            payload.Message,
          );
          state.otp_verification = payload.Message;
        }
      },
    );
  },
});

export const {} = Otp_VerificationSlice.actions;

export default Otp_VerificationSlice.reducer;
