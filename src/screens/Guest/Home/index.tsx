import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Pressable,
  ImageBackground,
  Image,
  Touchable,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import stylesMain from '../../../styles/main.tsx';
import styles from './styles.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

import {useNavigation} from '@react-navigation/native';

// @ts-ignore
const HomeGuest = ({navigation}) => {
  const imageBackground = require('../../../assets/images/bg-home.jpg');
  const logoLong = require('../../../assets/images/logo-long.png');
  const logo2 = require('../../../assets/images/logo2.png');
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsAuth(false);
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp && decodedToken.exp >= currentTime) {
            setIsAuth(true);
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error,
        );
      }
    };

    checkAuthStatus();

    return navigation.addListener('focus', () => {
      checkAuthStatus();
    });
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigation.navigate('Home');
    }
  }, [isAuth, navigation]);
  return (
    <>
      <ImageBackground source={imageBackground} style={styles.imageBackground}>
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Image source={logoLong} style={styles.logo} />
          </View>
          <View style={styles.sectionPresentation}>
            <View style={styles.blockText}>
              <Text style={[styles.text, styles.title]}>Auprès de vous</Text>
              <Text style={[styles.text, styles.subTitle]}>
                Venez en aide aux autres
              </Text>
            </View>
            <View style={styles.blockButtons}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginGuest')}
                style={styles.AuthFormButton}>
                <Text style={[styles.AuthFormButtonText]}>Se connecter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterGuest')}
                style={styles.AuthFormButton}>
                <Text style={styles.AuthFormButtonText}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default HomeGuest;
