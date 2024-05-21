import {
  Alert,
  Image, ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import stylesMain from '../../../styles/main';
import styles from './styles';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import {useNavigation} from '@react-navigation/native';

const Create = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={stylesMain.body}>
        <View style={styles.containerContent}>
          <View style={styles.blockButtons}>
            <TouchableOpacity
              style={stylesMain.button}
              onPress={() => navigation.navigate('CreateDemande')}>
              <Text style={stylesMain.buttonText}>
                Je souhaite faire une demande
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={stylesMain.button}
              onPress={() => navigation.navigate('CreateService')}>
              <Text style={stylesMain.buttonText}>Proposer un service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </>
  );
};

export default Create;
