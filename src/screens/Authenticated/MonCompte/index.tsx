import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Footer from '../../../components/footer';
import styles from './styles';
import stylesMain from '../../../styles/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
  let formData: any;
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
        formData = new FormData();
        formData.append('avatar', {
          uri: image.path,
          type: image.mime,
          name: `${user.id}.jpg`,
        });
        formData.append('userId', user.id);
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
  const getUserData = () => {
    AsyncStorage.getItem('token')
      .then(token => {
        return axios.get('http://10.0.2.2:4001/profile', {
          headers: {
            Authorization: `${token}`,
          },
        });
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };
  const getToken = async () => {
    setToken(await AsyncStorage.getItem('token'));
  };
  useEffect(() => {
    getToken();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, []),
  );
  return (
    <>
      <ScrollView contentContainerStyle={stylesMain.body}>
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
      </ScrollView>
      <Footer />
    </>
  );
};
export default MonCompte;
