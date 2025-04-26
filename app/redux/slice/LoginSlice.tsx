import {createSlice} from '@reduxjs/toolkit';
import {LoginService} from '../service/LoginService';

const initialState = {
  login: [],
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      LoginService.endpoints.Login.matchFulfilled,
      (state, {payload}) => {
        console.log('payload', payload);
        if (payload.Code === 200) {
          console.log(
            'APISUCCESS-------Login---------------->',
            payload.Message,
          );
          state.login = payload.Message;
        }
      },
    );
  },
});

export const {} = LoginSlice.actions;

export default LoginSlice.reducer;


