import {createSlice} from '@reduxjs/toolkit';
import {Otp_SendService} from '../service/Otp_SendService';

const initialState = {
  otp_send: [],
};

export const Otp_SendSlice = createSlice({
  name: 'otp_send',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      Otp_SendService.endpoints.Otp_Send.matchFulfilled,
      (state, {payload}) => {
        console.log('payload', payload);
        if (payload.Code === 200) {
          console.log(
            'APISUCCESS-------otp_send---------------->',
            payload.Message,
          );
          state.otp_send = payload.Message;
        }
      },
    );
  },
});

export const {} = Otp_SendSlice.actions;

export default Otp_SendSlice.reducer;
