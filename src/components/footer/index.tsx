import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
const Footer = () => {
  const compte = require('../../assets/icons/nav/compte.png');
  const compteActive = require('../../assets/icons/nav/compte-active.png');
  const mesAnnonces = require('../../assets/icons/nav/MesAnnonces.png');
  const mesAnnoncesActive = require('../../assets/icons/nav/MesAnnonces-active.png');
  const messages = require('../../assets/icons/nav/messages.png');
  const messagesActive = require('../../assets/icons/nav/messages-active.png');
  const create = require('../../assets/icons/nav/publier.png');
  const createActive = require('../../assets/icons/nav/publier-active.png');
  const search = require('../../assets/icons/nav/search.png');
  const searchActive = require('../../assets/icons/nav/search-active.png');

  const navigation = useNavigation();
  const route = useRoute();
  const currentRouteName = route.name;
  return (
    <View style={styles.containerFooter}>
      <View style={styles.containerNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.iconText}>
            <Image
              source={currentRouteName === 'Home' ? searchActive : search}
              style={styles.icon}
            />
            <Text
              style={[
                styles.text,
                currentRouteName === 'Home' ? styles.textActive : null,
              ]}>
              Recherche
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MesAnnonces')}>
          <View style={styles.iconText}>
            <Image
              source={
                currentRouteName === 'MesAnnonces'
                  ? mesAnnoncesActive
                  : mesAnnonces
              }
              style={styles.icon}
            />
            <Text
              style={[
                styles.text,
                currentRouteName === 'Favoris' ? styles.textActive : null,
              ]}>
              Mes annonces
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <View style={styles.iconText}>
            <Image
              source={currentRouteName === 'Create' ? createActive : create}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
          <View style={styles.iconText}>
            <Image
              source={
                currentRouteName === 'Messages' ? messagesActive : messages
              }
              style={styles.icon}
            />
            <Text
              style={[
                styles.text,
                currentRouteName === 'Messages' ? styles.textActive : null,
              ]}>
              Messages
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MonCompte')}>
          <View style={styles.iconText}>
            <Image
              source={currentRouteName === 'MonCompte' ? compteActive : compte}
              style={styles.icon}
            />
            <Text
              style={[
                styles.text,
                currentRouteName === 'MonCompte' ? styles.textActive : null,
              ]}>
              Mon compte
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
