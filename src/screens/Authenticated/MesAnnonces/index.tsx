import {Image, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import styles from './styles';
import stylesMain, {primaryColor} from '../../../styles/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const MesAnnonces = () => {
  const [user, setUser] = useState<any>(null);
  const [annonces, setAnnonces] = useState<any>({});

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

  const getAnnoncesByUserId = (userId: number) => {
    axios
      .get(`http://10.0.2.2:4001/annonces/${userId}`)
      .then(response => {
        setAnnonces(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching annonces data:', error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, []),
  );

  useEffect(() => {
    if (user && user.id) {
      getAnnoncesByUserId(user.id);
    }
  }, [user]);

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={stylesMain.body}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mes demandes</Text>
            <View style={styles.containerItems}>
              {annonces.demandes ? (
                annonces.demandes.map((demande: any, index: number) => (
                  <View
                    key={demande.id}
                    style={[
                      styles.containerItem,
                      index === annonces.demandes.length - 1
                        ? {
                            borderBottomWidth: 0,
                          }
                        : {
                            borderBottomWidth: 1,
                            borderBottomColor: 'grey',
                          },
                    ]}>
                    <Image
                      source={{uri: `http://10.0.2.2:4001/${demande.image}`}}
                      style={styles.imageItem}
                    />
                    <View style={styles.infosItem}>
                      <Text style={styles.titleItem} numberOfLines={1}>
                        {demande.titre}
                      </Text>
                      <Text style={styles.categoryItem}>
                        {demande.category.label}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text>Vous n'avez pas de demandes...</Text>
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mes prestations</Text>
            <View style={styles.containerItems}>
              {annonces.services ? (
                annonces.services.map((service: any, index: number) => (
                  <View
                    key={service.id}
                    style={[
                      styles.containerItem,
                      index === annonces.services.length - 1
                        ? {
                            borderBottomWidth: 0,
                          }
                        : {
                            borderBottomWidth: 1,
                            borderBottomColor: 'grey',
                          },
                    ]}>
                    <Image
                      source={{uri: `http://10.0.2.2:4001/${service.image}`}}
                      style={styles.imageItem}
                    />
                    <View style={styles.infosItem}>
                      <Text style={styles.titleItem} numberOfLines={1}>
                        {service.titre}
                      </Text>
                      <Text style={styles.categoryItem}>
                        {service.category.label}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text>Vous n'avez pas de demandes...</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </>
  );
};

export default MesAnnonces;
