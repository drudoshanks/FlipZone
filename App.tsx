import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import AppContainer from './src/navigation/AppNavigation';
import { ThemeProvider } from 'react-native-elements';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './src/reducers'

const store = createStore(reducer)
export interface AppProps {
}


const theme = {
  colors: {
    primary: '#212121',
  },
};

export default function App(props: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </ThemeProvider>
  );
}
