import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeGuest from '../screens/Guest/Home/index.tsx';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthConnection from '../screens/Guest/Auth/Connection';
import AuthRegistration from '../screens/Guest/Auth/Registration';
import GoBack from '../components/goBack';
import Home from '../screens/Authenticated/Home';
import MesAnnonces from '../screens/Authenticated/MesAnnonces';
import Create from '../screens/Authenticated/Create';
import Messages from '../screens/Authenticated/Messages';
import MonCompte from '../screens/Authenticated/MonCompte';
import CreateDemande from '../screens/Authenticated/Create/CreateDemande';
import CreateService from '../screens/Authenticated/Create/CreateService';
import DetailsMonAnnonce from '../screens/Authenticated/MesAnnonces/Details';
import HomeCategories from '../screens/Authenticated/Home/Categories';
import DetailsAnnonce from '../screens/Authenticated/Home/DetailsAnnonce';
type RootStackParamList = {
  HomeGuest: undefined;
  LoginGuest: undefined;
  RegisterGuest: undefined;
  Home: undefined;
  HomeCategories: undefined;
  DetailsAnnonce: undefined;
  MesAnnonces: undefined;
  Create: undefined;
  CreateDemande: undefined;
  createService: undefined;
  Messages: undefined;
  MonCompte: undefined;
  DetailsMonAnnonce: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const bezierInterpolator = (value: number) => {
  return value * (2 - value);
};
const Routes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
        } else {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp && decodedToken.exp < currentTime) {
            setIsAuthenticated(false);
          }
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error,
        );
      }
    };

    checkAuthentication();
  }, []);
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeGuest"
          component={HomeGuest}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="LoginGuest"
          component={AuthConnection}
          options={({navigation}) => ({
            header: () => <GoBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="RegisterGuest"
          component={AuthRegistration}
          options={({navigation}) => ({
            header: () => <GoBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="HomeCategories"
          component={HomeCategories}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="DetailsAnnonce"
          component={DetailsAnnonce}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="MesAnnonces"
          component={MesAnnonces}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="DetailsMonAnnonce"
          component={DetailsMonAnnonce}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="CreateDemande"
          component={CreateDemande}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="CreateService"
          component={CreateService}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="MonCompte"
          component={MonCompte}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default Routes;
