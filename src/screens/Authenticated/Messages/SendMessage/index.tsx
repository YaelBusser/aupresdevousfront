import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import stylesMain from '../../../../styles/main';
import styles from './styles';
import GoBack from '../../../../components/goBack';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const MessagesSendMessages = ({route, navigation}: any) => {
  const {annonceId, userId}: any = route.params;

  const [user, setUser] = useState<any>({});
  const [userMessage, setUserMessage] = useState<any>();
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };
  const handleSendMessage = async () => {
    if (!message.trim()) {
      setErrorMessage('Le message ne peut pas être vide.');
      return;
    }

    try {
      await axios
        .post('http://10.0.2.2:4001/annoncesContacts/send', {
          id_sender: user.id,
          id_annonce: annonceId,
          message: message,
        })
        .then((res: any) => {
          setMessage('');
          setErrorMessage('');
          Alert.alert('Contact réussi', res.data.message, [
            {text: 'OK', onPress: () => navigation.navigate('LoginGuest')},
          ]);
        })
        .catch(err => {
          console.error('Error sending message:', err);
          setErrorMessage(
            err.response?.data?.message ||
              "Erreur lors de l'envoi du message. Veuillez réessayer.",
          );
        });
    } catch (err: any) {
      console.error('Error sending message:', err.data?.message);
      setErrorMessage(
        err.response?.data?.message ||
          "Erreur lors de l'envoi du message. Veuillez réessayer.",
      );
    }
  };
  useEffect(() => {
    axios
      .get(`http://10.0.2.2:4001/profile/${userId}`)
      .then((res: any) => {
        setUserMessage(res.data.user);
      })
      .catch((err: any) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur:",
          err,
        );
      });
  }, [userId]);
  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, []),
  );

  return (
    <View style={stylesMain.body}>
      <GoBack navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.containerTop}>
          <View style={styles.profile}>
            <Image
              style={styles.avatar}
              source={{uri: `http://10.0.2.2:4001/${userMessage?.avatar}`}}
            />
            <Text style={styles.profileName}>
              {userMessage?.firstname} {userMessage?.name}
            </Text>
          </View>
          <Text style={styles.textWhySend}>
            Envoyez à {userMessage?.firstname} un message pour créer la
            conversation
          </Text>
        </View>
        <View style={styles.blockSendMessage}>
          <View style={styles.sendMessage}>
            <TextInput
              style={[stylesMain.input, {height: 'auto'}]}
              value={message}
              onChangeText={setMessage}
              placeholder={'Envoyez un message'}
              multiline
            />
            <TouchableOpacity
              style={styles.blockIconSend}
              onPress={handleSendMessage}>
              <FontAwesomeIcon
                style={styles.iconSend}
                size={24}
                icon={faPaperPlane}
              />
            </TouchableOpacity>
          </View>
          {errorMessage ? (
            <Text style={stylesMain.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default MessagesSendMessages;
