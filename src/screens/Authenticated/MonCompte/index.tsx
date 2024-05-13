import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import styles from './styles';
import stylesMain from '../../../styles/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const MonCompte = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('HomeGuest');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <View style={stylesMain.body}>
        <Text>MonCompte</Text>
        <TouchableOpacity style={stylesMain.button} onPress={handleLogout}>
          <Text style={stylesMain.buttonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </>
  );
};

export default MonCompte;
