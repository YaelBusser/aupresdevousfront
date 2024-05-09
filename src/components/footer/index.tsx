import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
const Footer = () => {
  const compte = require('../../assets/icons/nav/compte.png');
  const compteActive = require('../../assets/icons/nav/compte-active.png');
  const favoris = require('../../assets/icons/nav/favoris.png');
  const favorisActive = require('../../assets/icons/nav/favoris-active.png');
  const messages = require('../../assets/icons/nav/messages.png');
  const messagesActive = require('../../assets/icons/nav/messages-active.png');
  const publier = require('../../assets/icons/nav/publier.png');
  const publierActive = require('../../assets/icons/nav/publier-active.png');
  const search = require('../../assets/icons/nav/search.png');
  const searchActive = require('../../assets/icons/nav/search-active.png');

  const navigation = useNavigation();
  const route = useRoute();
  const currentRouteName = route.name;
  return (
    <View style={styles.containerFooter}>
      <View style={styles.containerNav}>
        <TouchableOpacity
          style={styles.iconText}
          onPress={() => navigation.navigate('Home')}>
          <View>
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
        <TouchableOpacity
          style={styles.iconText}
          onPress={() => navigation.navigate('Favoris')}>
          <View>
            <Image
              source={currentRouteName === 'Favoris' ? favorisActive : favoris}
              style={styles.icon}
            />
            <Text
              style={[
                styles.text,
                currentRouteName === 'Favoris' ? styles.textActive : null,
              ]}>
              Favoris
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconText}
          onPress={() => navigation.navigate('Publier')}>
          <View>
            <Image
              source={currentRouteName === 'Publier' ? publierActive : publier}
              style={styles.icon}
            />
            <Text
              style={[
                styles.text,
                currentRouteName === 'Publier' ? styles.textActive : null,
              ]}>
              Publier
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconText}
          onPress={() => navigation.navigate('Messages')}>
          <View>
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
        <TouchableOpacity
          style={styles.iconText}
          onPress={() => navigation.navigate('MonCompte')}>
          <View>
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
