import React from 'react';
import ApplicationNavigation from './app/routes/ApplicationNavigation';
import {AppSettingsProvider} from './app/context/AppSettingContext';
import {Provider} from 'react-redux';
import {store} from './app/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <AppSettingsProvider>
        <ApplicationNavigation />
      </AppSettingsProvider>
    </Provider>
  );
};
export default App;
