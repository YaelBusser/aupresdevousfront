import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Footer from '../../../components/footer';
import styles from './styles';
import stylesMain from '../../../styles/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import v4 from 'react-native-uuid';

const MonCompte = () => {
  const navigation = useNavigation();
  const logoLogout = require('../../../assets/icons/logout.png');
  const defaultProfile = require('../../../assets/images/defaultProfile.png');
  const iconEdit = require('../../../assets/icons/edit.png');

  const [imageUri, setImageUri] = useState<string>('');
  const [token, setToken] = useState<string | null>('');
  const [user, setUser] = useState<any>({});
  const [uuid, setUuid] = useState<string>(v4.v4());

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
    })
      .then(image => {
        const formData = new FormData();
        formData.append('avatar', {
          uri: image.path,
          type: 'image/jpg',
          name: `${uuid}.jpg`,
        });
        formData.append('userId', user?.id);
        axios
          .post('http://10.0.2.2:4001/profile/edit/avatar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            console.log(response.data);
            getUserData();
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        if (error.message === 'User cancelled image selection') {
          console.log('User cancelled image selection');
        } else {
          console.log(error);
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
      .then(res => {
        setUser(res.data.user);
        setImageUri(`http://10.0.2.2:4001/${res.data.user.avatar}`);
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
                user?.avatar
                  ? {uri: `http://10.0.2.2:4001/${user.avatar}`}
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
