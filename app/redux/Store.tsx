import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Utilities and component
import { api } from '../utils/API';
import appsettings from '../redux/slice/AppSettingsSlice';
import login from '../redux/slice/LoginSlice';
import signUp from '../redux/slice/SignUpSlice';
import otp_send from '../redux/slice/Otp_SendSlice';
import otp_verification from '../redux/slice/Otp_VerificationSlice';
import notification_count from '../redux/slice/NotificationCountSlice';
import notificationList from '../redux/slice/NotificationListSlice';
import notificationUpdate from '../redux/slice/NotificationUpdateSlice';
import getGender from '../redux/slice/GetGenderSlice';
import getTitle from '../redux/slice/GetTitleSlice';
import getRelationship from '../redux/slice/GetRelationshipSlice';
import userView from '../redux/slice/UserViewSlice';

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  appsettings,
  login,
  signUp,
  otp_send,
  otp_verification,
  notification_count,
  notificationList,
  notificationUpdate,
  getGender,
  getTitle,
  getRelationship,
  userView

});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [''],
  blacklist: [''],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware);
    // comment this line if your system doesnt have flipper installed
    // if (_DEV_ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require("redux-flipper").default;
    //   middlewares.push(createDebugger(), logger);
    // }
    return middlewares;
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
