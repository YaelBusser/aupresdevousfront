import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import stylesMain from '../../../../styles/main';
import styles from './styles';
import GoBack from '../../../../components/goBack';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsAnnonce = ({route, navigation}: any) => {
  const [annonce, setAnnonce] = useState<any>();
  const [user, setUser] = useState<any>({});
  const [contactExists, setContactExists] = useState<boolean>();
  const [idAnnoncesContacts, setIdAnnoncesContacts] = useState<number>();
  const {idAnnonce}: any = route.params;

  const createAnnoncesContacts = async () => {
    let id_demandeur;
    let id_prestataire;
    if (annonce?.types_annonce?.label === 'Demande') {
      id_demandeur = annonce?.user?.id;
      id_prestataire = user?.id;
    } else if (annonce?.types_annonce?.label === 'Prestation') {
      id_demandeur = user?.id;
      id_prestataire = annonce?.user?.id;
    }
    await axios
      .post('http://10.0.2.2:4001/annoncesContacts/create', {
        id_annonce: idAnnonce,
        id_demandeur: id_demandeur,
        id_prestataire: id_prestataire,
      })
      .then(async (res: any) => {
        await axios
          .get('http://10.0.2.2:4001/annoncesContacts', {
            params: {
              id_annonce: idAnnonce,
              id_user: user?.id,
            },
          })
          .then((res: any) => {
            Alert.alert(
              'Contact réussi',
              'Vous pouvez à présent discuter sur les besoins et services de cette annonce',
              [
                {
                  text: 'OK',
                  onPress: () =>
                    navigation.navigate('MessagesSendMessages', {
                      annonceContactsId: res.data.idAnnoncesContacts,
                      userId: annonce?.user?.id,
                    }),
                },
              ],
            );
          })
          .catch(err => {
            console.error('Error:', err);
          });
      })
      .catch(err => {
        console.error('Error sending message:', err);
      });
  };
  const getAnnoncesContacts = async () => {
    await axios
      .get('http://10.0.2.2:4001/annoncesContacts', {
        params: {
          id_annonce: idAnnonce,
          id_user: user?.id,
        },
      })
      .then((res: any) => {
        setContactExists(res.data.contactExists);
        setIdAnnoncesContacts(res.data.idAnnoncesContacts);
      })
      .catch(err => {
        console.error('Error:', err);
      });
  };
  useEffect(() => {
    axios
      .get(`http://10.0.2.2:4001/annonces/details/${idAnnonce}`)
      .then((res: any) => {
        setAnnonce(res.data);
      })
      .catch((err: any) => {
        console.error(
          "Erreur lors de la récupération des détails de l'annonce:",
          err,
        );
      });
    if (idAnnonce && user?.id) {
      axios
        .get('http://10.0.2.2:4001/annoncesContacts', {
          params: {
            id_annonce: idAnnonce,
            id_user: user?.id,
          },
        })
        .then((res: any) => {
          setContactExists(res.data.contactExists);
          setIdAnnoncesContacts(res.data.idAnnoncesContacts);
        })
        .catch(err => {
          console.error('Error:', err);
        });
    }
  }, [annonce?.types_annonce?.label, idAnnonce, user?.id]);

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

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, []),
  );
  return (
    <ScrollView contentContainerStyle={stylesMain.body}>
      <GoBack navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.contentHead}>
          <View>
            <Image
              source={{
                uri: `http://10.0.2.2:4001/${annonce?.image}`,
              }}
              style={styles.couverture}
            />
          </View>
          <View style={styles.gradient}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 1)']}
              style={styles.gradient}
            />
          </View>
          <View style={styles.titleCategory}>
            <View style={{width: '90%'}}>
              <Text style={styles.titre}>{annonce?.titre}</Text>
              <Text style={styles.category}>{annonce?.category?.label}</Text>
            </View>
          </View>
        </View>
        <View style={styles.blocContainer}>
          <View style={styles.containerInfos}>
            <View style={styles.profile}>
              <Image
                style={styles.avatar}
                source={{uri: `http://10.0.2.2:4001/${annonce?.user?.avatar}`}}
              />
              <Text style={styles.profileName}>
                {annonce?.user?.firstname} {annonce?.user?.name}
              </Text>
            </View>
            <View style={styles.infosAnnonce}>
              <Text style={styles.description}>{annonce?.description}</Text>
            </View>
          </View>
          <View style={styles.contactButton}>
            <TouchableOpacity
              onPress={async () => {
                if (contactExists) {
                  navigation.navigate('MessagesSendMessages', {
                    annonceContactsId: idAnnoncesContacts,
                    userId: annonce?.user?.id,
                  });
                } else {
                  await createAnnoncesContacts();
                  await getAnnoncesContacts();
                }
              }}
              style={[stylesMain.button, {height: 50}]}>
              <Text style={[stylesMain.buttonText, {fontSize: 18}]}>
                {contactExists ? 'Envoyer un message' : 'Contacter'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsAnnonce;
