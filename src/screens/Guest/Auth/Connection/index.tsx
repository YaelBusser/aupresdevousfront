import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesMain from '../../../../styles/main';

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      setError(error.reseponse?.data.message || 'Erreur lors de la connexion.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={stylesMain.button} onPress={handleLogin}>
        <Text style={stylesMain.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}
