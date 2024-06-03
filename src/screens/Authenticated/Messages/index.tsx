import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import stylesMain from '../../../styles/main';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/fr';
import io from 'socket.io-client';
import { useMessages } from './MessagesContext';

const Messages = ({route, navigation}: any) => {
  const [user, setUser] = useState<any>({});
  const [contacts, setContacts] = useState<any>([]);
  const [socket, setSocket] = useState<any>(null);

  const getContacts = async () => {
    if (!user?.id) {
      return;
    }
    try {
      const res = await axios.get(
        'http://10.0.2.2:4001/annoncesContacts/contacts',
        {
          params: {id_user: user.id},
        },
      );
      setContacts(res.data);
      console.log('res.data', res.data[0]);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('http://10.0.2.2:4001/profile', {
        headers: {Authorization: `${token}`},
      });
      setUser(res.data.user);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const setReadMessages = async (
    id_sender: number,
    annonceContactsId: number,
  ) => {
    await axios
      .put('http://10.0.2.2:4001/messages/mark-as-read', {
        id_sender: id_sender,
        id_annonces_contacts: annonceContactsId,
        idUser: user?.id,
      })
      .then((res: any) => {
        console.log(res.data.message);
      })
      .catch(err => {
        console.log(err.response?.data?.message);
      });
  };

  useEffect(() => {
    moment.locale('fr');
    getUserData();
  }, []);

  useEffect(() => {
    getContacts();
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, []),
  );

  useEffect(() => {
    const newSocket = io('http://10.0.2.2:4001');
    setSocket(newSocket);

    newSocket.on('chat message', (msg: any) => {
      console.log('Nouveau message reçu:', msg);
      getContacts(); // Rafraîchir les contacts à la réception d'un nouveau message
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={stylesMain.body}>
        <View style={styles.content}>
          <Text style={styles.title}>Messagerie</Text>
          <View style={styles.containerContacts}>
            <View style={styles.containerTypeAnnonce}>
              <View style={styles.blockContacts}>
                {contacts.length > 0 ? (
                  contacts.map((otherUser: any, index: number) => (
                    <View key={index} style={styles.blockContact}>
                      <View style={styles.blockUsers}>
                        <TouchableOpacity
                          onPress={async () => {
                            await setReadMessages(
                              otherUser?.lastMessage?.id_sender,
                              otherUser?.annoncesContactsId,
                            );
                            navigation.navigate('MessagesSendMessages', {
                              annonceContactsId: otherUser?.annoncesContactsId,
                              userId: otherUser?.id,
                            });
                          }}
                          key={index}
                          style={styles.blockContactInfos}>
                          {otherUser?.lastMessage &&
                          otherUser?.lastMessage?.id_sender !== user?.id &&
                          otherUser?.unseenMessagesCount > 0 ? (
                            <Text style={styles.numberUnseenMessagesCount}>
                              +{otherUser?.unseenMessagesCount}
                            </Text>
                          ) : (
                            ''
                          )}
                          <Image
                            source={{
                              uri: `http://10.0.2.2:4001/${otherUser?.avatar}`,
                            }}
                            style={styles.userAvatar}
                          />
                          <View style={styles.contactInfos}>
                            <View style={styles.containerContactInfos}>
                              <View style={styles.blockUsername}>
                                <Text
                                  numberOfLines={1}
                                  style={[
                                    styles.username,
                                    otherUser?.lastMessage?.vue === false &&
                                    otherUser?.lastMessage?.id_sender !==
                                      user?.id
                                      ? styles.usernameUnseen
                                      : {},
                                  ]}>
                                  {otherUser?.firstname} {otherUser?.name}
                                </Text>
                                <Text
                                  numberOfLines={1}
                                  style={styles.annonceTitle}>
                                  {otherUser?.annonce?.titre}
                                </Text>
                              </View>
                              {otherUser?.lastMessage ? (
                                <View style={styles.blockLastMessage}>
                                  <Text
                                    numberOfLines={1}
                                    style={[
                                      styles.lastMessage,
                                      otherUser?.lastMessage?.vue === false &&
                                      otherUser?.lastMessage?.id_sender !==
                                        user?.id
                                        ? styles.lastMessageUnseen
                                        : {},
                                    ]}>
                                    {otherUser?.lastMessage?.messages}
                                  </Text>
                                  <Text style={styles.dateLastMessage}>
                                    {moment(otherUser?.lastMessage?.date)
                                      .add(-2, 'hours')
                                      .startOf('m')
                                      .fromNow()}
                                  </Text>
                                </View>
                              ) : (
                                ''
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noContacts}>
                    Vous n'avez pas encore de contacts...
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </>
  );
};

export default Messages;
