import React from 'react';
import ApplicationNavigation from './App/Routes/ApplicationNavigation';
import {Provider} from 'react-redux';
import {store} from './App/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <ApplicationNavigation />
    </Provider>
  );
};
export default App;
