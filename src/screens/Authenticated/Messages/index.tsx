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

const Messages = ({route, navigation}: any) => {
  const [user, setUser] = useState<any>({});
  const [contacts, setContacts] = useState<any>();

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

  useEffect(() => {
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

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={stylesMain.body}>
        <View style={styles.content}>
          <Text style={styles.title}>Messagerie</Text>
          <View style={styles.containerContacts}>
            <View style={styles.containerTypeAnnonce}>
              <View style={styles.blockContacts}>
                {contacts?.length > 0 ? (
                  contacts?.map((contact: any, index: number) => (
                    <View key={index} style={styles.blockContact}>
                      <Text numberOfLines={1} style={styles.annonceTitle}>
                        {contact?.annonce?.titre}
                      </Text>
                      <View style={styles.blockUsers}>
                        {contact?.otherUsers.map(
                          (otherUser: any, index: number) => (
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('MessagesSendMessages', {
                                  annonceId: contact?.annonce?.id,
                                  userId: otherUser?.user?.id,
                                })
                              }
                              key={index}
                              style={styles.blockContactInfos}>
                              <Image
                                source={{
                                  uri: `http://10.0.2.2:4001/${otherUser?.avatar}`,
                                }}
                                style={styles.userAvatar}
                              />
                              <View style={styles.contactInfos}>
                                <View style={styles.blockUsername}>
                                  <Text style={styles.username}>
                                    {otherUser?.firstname} {otherUser?.name}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ),
                        )}
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noContacts}>
                    Vous n'avez pas de contacts...
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
