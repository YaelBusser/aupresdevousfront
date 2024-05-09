// App.tsx

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import './src/styles/main.tsx';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
      <NavigationContainer>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </NavigationContainer>
  );
};

export default App;
