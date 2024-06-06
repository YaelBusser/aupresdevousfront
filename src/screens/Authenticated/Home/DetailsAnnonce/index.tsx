// Importation des modules nécessaires depuis 'react-native'
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Importation des styles personnalisés
import stylesMain from '../../../../styles/main';
import styles from './styles';

// Importation du composant GoBack pour la navigation
import GoBack from '../../../../components/goBack';

// Importation des modules React et des hooks nécessaires
import React, {useEffect, useState} from 'react';
import axios from 'axios'; // Pour effectuer des requêtes HTTP
import LinearGradient from 'react-native-linear-gradient'; // Pour les dégradés
import {useFocusEffect} from '@react-navigation/native'; // Pour exécuter du code lors de la focalisation de l'écran
import AsyncStorage from '@react-native-async-storage/async-storage'; // Pour stocker et récupérer des données localement
import env from '../../../../../env.json';

// Composant principal qui affiche les détails de l'annonce
const DetailsAnnonce = ({route, navigation}: any) => {
  // Déclaration des états pour stocker les données nécessaires
  const [annonce, setAnnonce] = useState<any>(); // Stocke les détails de l'annonce
  const [user, setUser] = useState<any>({}); // Stocke les informations de l'utilisateur
  const [contactExists, setContactExists] = useState<boolean>(); // Vérifie si un contact existe déjà
  const [idAnnoncesContacts, setIdAnnoncesContacts] = useState<number>(); // Stocke l'ID des contacts de l'annonce
  const {idAnnonce}: any = route.params; // Récupère l'ID de l'annonce depuis les paramètres de la route

  // Fonction pour créer un contact pour l'annonce
  const createAnnoncesContacts = async () => {
    let id_demandeur;
    let id_prestataire;

    // Détermine les rôles selon le type d'annonce
    if (annonce?.types_annonce?.label === 'Demande') {
      id_demandeur = annonce?.user?.id;
      id_prestataire = user?.id;
    } else if (annonce?.types_annonce?.label === 'Prestation') {
      id_demandeur = user?.id;
      id_prestataire = annonce?.user?.id;
    }

    // Envoie une requête pour créer un contact
    await axios
      .post(`${env.API}/annoncesContacts/create`, {
        id_annonce: idAnnonce,
        id_demandeur: id_demandeur,
        id_prestataire: id_prestataire,
      })
      .then(async (res: any) => {
        // Récupère les contacts après la création
        await axios
          .get(`${env.API}/annoncesContacts`, {
            params: {
              id_annonce: idAnnonce,
              id_user: user?.id,
            },
          })
          .then((res: any) => {
            // Affiche une alerte et navigue vers les messages
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

  // Fonction pour récupérer les contacts de l'annonce
  const getAnnoncesContacts = async () => {
    await axios
      .get(`${env.API}/annoncesContacts`, {
        params: {
          id_annonce: idAnnonce,
          id_user: user?.id,
        },
      })
      .then((res: any) => {
        // Met à jour l'état avec les informations récupérées
        setContactExists(res.data.contactExists);
        setIdAnnoncesContacts(res.data.idAnnoncesContacts);
      })
      .catch(err => {
        console.error('Error:', err);
      });
  };

  // Utilise useEffect pour effectuer des actions lors du montage du composant
  useEffect(() => {
    // Récupère les détails de l'annonce
    axios
      .get(`${env.API}/annonces/details/${idAnnonce}`)
      .then((res: any) => {
        setAnnonce(res.data);
      })
      .catch((err: any) => {
        console.error(
          "Erreur lors de la récupération des détails de l'annonce:",
          err,
        );
      });

    // Vérifie si l'ID de l'annonce et l'ID de l'utilisateur sont disponibles pour récupérer les contacts
    if (idAnnonce && user?.id) {
      axios
        .get(`${env.API}/annoncesContacts`, {
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
  }, [annonce?.types_annonce?.label, idAnnonce, user?.id]); // Déclenche useEffect lors du changement de ces dépendances

  // Fonction pour récupérer les données de l'utilisateur
  const getUserData = () => {
    AsyncStorage.getItem('token')
      .then(token => {
        return axios.get(`${env.API}/profile`, {
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

  // Utilise useFocusEffect pour récupérer les données de l'utilisateur à chaque fois que l'écran est focalisé
  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, []),
  );

  // Retourne le rendu du composant
  return (
    <ScrollView contentContainerStyle={stylesMain.body}>
      <GoBack navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.contentHead}>
          <View>
            <Image
              source={{
                uri: `${env.API}/${annonce?.image}`,
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
                source={{uri: `${env.API}/${annonce?.user?.avatar}`}}
              />
              <Text style={styles.profileName}>
                {annonce?.user?.firstname} {annonce?.user?.name}
              </Text>
            </View>
            <View style={styles.infosAnnonce}>
              <Text style={styles.description}>{annonce?.description}</Text>
            </View>
            <View style={styles.infosUser}>
              <Text style={styles.infosUserTitle}>Informations concernant {annonce?.user?.firstname}</Text>
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

// Exportation du composant pour utilisation dans d'autres parties de l'application
export default DetailsAnnonce;
