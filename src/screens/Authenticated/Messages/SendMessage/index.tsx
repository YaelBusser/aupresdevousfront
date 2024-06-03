import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import stylesMain from '../../../../styles/main';
import styles from './styles';
import GoBack from '../../../../components/goBack';
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import io from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/fr';

const MessagesSendMessages = ({route, navigation}: any) => {
  const {annonceContactsId, userId}: any = route.params;
  const [user, setUser] = useState<any>({});
  const [userMessage, setUserMessage] = useState<any>();
  const [historyMessages, setHistoryMessages] = useState<any>([]);
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<any>('');
  const [messages, setMessages] = useState<any>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [userTyping, setUserTyping] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isWritting, setIsWritting] = useState(false);

  const timeout = useRef<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  console.log('userId', userId);

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

  useEffect(() => {
    const newSocket = io('http://10.0.2.2:4001');
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.emit('join room', annonceContactsId);

    socket.on('chat message', (msg: any) => {
      setMessages((prevMessages: any) => [...prevMessages, msg]);
    });

    socket.on('typing', (user: any) => {
      setUserTyping(user);
    });

    socket.on('stop typing', () => {
      setUserTyping(null);
    });

    return () => {
      socket.emit('leave room', annonceContactsId);
      socket.off('chat message');
      socket.off('typing');
      socket.off('stop typing');
    };
  }, [socket, annonceContactsId]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollToBottom();
    }
  }, [historyMessages, messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const handleTyping = () => {
    if (!typing) {
      setTyping(true);
      socket.emit('typing', {room: annonceContactsId, user: user});
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setTyping(false);
      socket.emit('stop typing', {room: annonceContactsId, user: user});
    }, 3000);
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      return;
    }

    if (socket) {
      socket.emit('chat message', {room: annonceContactsId, message, user});
      setMessage('');
    }
    await axios
      .post('http://10.0.2.2:4001/messages/send', {
        id_annonces_contacts: annonceContactsId,
        id_sender: user.id,
        message: message,
      })
      .then((res: any) => {
        setMessage('');
        setErrorMessage('');
      })
      .catch(err => {
        console.error('Error sending message:', err);
        setErrorMessage(
          err.response?.data?.message ||
            "Erreur lors de l'envoi du message. Veuillez réessayer.",
        );
      });
  };

  const getHistoryMessages = async () => {
    console.log('annonceContactsId', annonceContactsId);
    await axios
      .get('http://10.0.2.2:4001/messages', {
        params: {
          idAnnoncesContacts: annonceContactsId,
        },
      })
      .then((res: any) => {
        setHistoryMessages(res.data.messages || []);
        console.log('historyMessages', historyMessages);
      })
      .catch(err => {
        setErrorMessage(
          err.response?.data?.message ||
            "Erreur lors de la récupération de l'historique des messages. Veuillez réessayer.",
        );
      });
  };
  Keyboard.addListener('keyboardDidShow', () => {
    console.log('Le clavier est affiché');
    setIsWritting(true);
  });

  Keyboard.addListener('keyboardDidHide', () => {
    setIsWritting(false);
  });

  useEffect(() => {
    if (userId) {
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
    }
  }, [userId]);

  useEffect(() => {
    getHistoryMessages();
  }, [annonceContactsId]);

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, []),
  );

  useEffect(() => {
    console.log('annonceContactsId', annonceContactsId);
  }, [annonceContactsId]);

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
        </View>
        <ScrollView
          style={styles.containerMessages}
          ref={scrollViewRef}
          contentContainerStyle={{paddingBottom: 100}}>
          <Text style={styles.textWhySend}>
            Envoyez à {userMessage?.firstname} un message pour débuter votre
            amitié
          </Text>
          <View style={styles.messages}>
            {(historyMessages || []).map(
              (historyMessage: any, index: number) => (
                <View
                  style={
                    historyMessage.id_sender === user.id
                      ? styles.blockMessage
                      : styles.blockMessageOther
                  }
                  key={index}>
                  <Text>{moment(historyMessage.date).calendar()}</Text>
                  <Text style={styles.textMessage}>
                    {historyMessage.messages}
                  </Text>
                </View>
              ),
            )}
            {(messages || []).map((msg: any, index: number) => (
              <View
                style={
                  msg.user.id === user.id
                    ? styles.blockMessage
                    : styles.blockMessageOther
                }
                key={index}>
                <Text>{moment(msg.date).add(2, 'hours').calendar()}</Text>
                <Text style={styles.textMessage}>{msg.message}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.blockSendMessage}>
          <View style={styles.sendMessage}>
            {errorMessage ? (
              <Text style={stylesMain.errorText}>{errorMessage}</Text>
            ) : null}
            {userTyping && (
              <Text style={styles.userWriting}>
                {userTyping?.firstname} est en train d'écrire...
              </Text>
            )}
            <View style={styles.blockInputIconSend}>
              <TextInput
                style={[styles.input]}
                value={message}
                onChangeText={text => {
                  setMessage(text);
                  handleTyping();
                }}
                placeholder={'Envoyez un message'}
                multiline
              />
              <TouchableOpacity
                style={styles.blockIconSend}
                onPress={sendMessage}>
                <FontAwesomeIcon
                  style={styles.iconSend}
                  size={24}
                  icon={faPaperPlane}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessagesSendMessages;
