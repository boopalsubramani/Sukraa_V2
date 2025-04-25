import {createSlice} from '@reduxjs/toolkit';
import {SignUpService} from '../service/SignUpService';

const initialState = {
  signUp: [],
};

export const SignUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      SignUpService.endpoints.SignUp.matchFulfilled,
      (state, {payload}) => {
        console.log('payload', payload);
        if (payload.Code === 200) {
          console.log(
            'APISUCCESS-------SignUp---------------->',
            payload.Message,
          );
          state.signUp = payload.Message;
        }
      },
    );
  },
});

export const {} = SignUpSlice.actions;

export default SignUpSlice.reducer;
