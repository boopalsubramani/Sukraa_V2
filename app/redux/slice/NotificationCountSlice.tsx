import {createSlice} from '@reduxjs/toolkit';
import {Notification_CountService} from '../service/NotificationCountService';

const initialState = {
    notification_count: [],
};

export const Notification_CountSlice = createSlice({
  name: 'notification_count',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      Notification_CountService.endpoints.Notification_Count.matchFulfilled,
      (state, {payload}) => {
        console.log('payload', payload);
        if (payload.Code === 200) {
          console.log(
            'APISUCCESS-------Notification_Count---------------->',
            payload.Message,
          );
          state.notification_count = payload.Message;
        }
      },
    );
  },
});

export const {} = Notification_CountSlice.actions;

export default Notification_CountSlice.reducer;
