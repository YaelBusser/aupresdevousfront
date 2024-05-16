import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import styles from './styles';
import stylesMain from '../../../styles/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const MonCompte = () => {
  const navigation = useNavigation();
  const logoLogout = require('../../../assets/icons/logout.png');
  const defaultProfile = require('../../../assets/images/defaultProfile.png');
  const iconEdit = require('../../../assets/icons/edit.png');
  const [imageUri, setImageUri] = useState<string>('');
  const [token, setToken] = useState<string | null>('');
  const [user, setUser] = useState<any>({});
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('HomeGuest');
    } catch (error) {
      console.log(error);
    }
  };
  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      cropperCircleOverlay: true,
    }).then(image => {
      console.log(image);
      if ('data' in image) {
        const data = `data:${image.mime};base64,${image.data}`;
        setImageUri(data);

        const formData = new FormData();
        formData.append('avatar', {
          uri: image.path,
          type: image.mime,
          name: `${user.id}.jpg`,
        });
        formData.append('userId', user.id); // Ajoutez l'ID de l'utilisateur à formData

        axios
          .post('http://10.0.2.2:4001/profile/edit/avatar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            console.log(response.data);
            setImageUri(`http://10.0.2.2:4001/users/avatar/${user.id}.jpg`);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      console.log(token);
      const response = await axios.get('http://10.0.2.2:4001/profile', {
        headers: {
          Authorization: `${token}`,
        },
      });

      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const getToken = async () => {
    setToken(await AsyncStorage.getItem('token'));
  };
  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Header />
      <View style={stylesMain.body}>
        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Image source={logoLogout} style={styles.logoLogout} />
        </TouchableOpacity>
        <View style={styles.containerProfile}>
          <Text style={styles.title}>Profile</Text>
          <View style={{position: 'relative'}}>
            <Image
              source={
                user.avatar !== undefined
                  ? {uri: `http://10.0.2.2:4001/${user.avatar}`}
                  : imageUri
                  ? {uri: imageUri}
                  : defaultProfile
              }
              style={styles.imageProfile}
            />
            <TouchableOpacity onPress={uploadImage}>
              <Image source={iconEdit} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>
            {user.firstname} {user.name}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default MonCompte;
