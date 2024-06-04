import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesMain, {primaryColor} from '../../../../styles/main';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

export default function Login({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      setError('');

      if (!email || !password) {
        setError('Veuillez remplir tous les champs.');
        return;
      }

      await axios
        .post('http://10.0.2.2:4001/auth/login', {
          email,
          password,
        })
        .then(async response => {
          await AsyncStorage.setItem('token', response.data.token);
          navigation.navigate('HomeGuest');
        })
        .catch(err => {
          setError(err.response.data.message);
        });
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data.message || 'Erreur lors de la connexion.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={'black'}
      />
      <View style={{width: '100%'}}>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={'black'}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            height: 60,
            display: 'flex',
            justifyContent: 'center',
          }}
          onPress={togglePasswordVisibility}>
          <FontAwesomeIcon
            size={32}
            color={'#CCCCCC'}
            icon={isPasswordVisible ? faEye : faEyeSlash}
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={[stylesMain.button, {height: 60}]}
        onPress={handleLogin}>
        <Text style={[stylesMain.buttonText]}>Se connecter</Text>
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',
          fontSize: 16,
          position: 'absolute',
          bottom: 20,
        }}>
        Vous n’avez pas de compte ?{' '}
        <Text
          onPress={() => navigation.navigate('RegisterGuest')}
          style={{
            color: primaryColor,
            textDecorationStyle: 'solid',
            textDecorationLine: 'underline',
            textDecorationColor: primaryColor,
          }}>
          Inscrivez-vous
        </Text>
      </Text>
    </View>
  );
}
