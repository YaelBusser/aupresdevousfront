import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import stylesMain from '../../../../styles/main';
import styles from './styles';
import GoBack from '../../../../components/goBack';
import {useEffect, useState} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const DetailsAnnonce = ({route, navigation}: any) => {
  const [annonce, setAnnonce] = useState<any>();

  const {idAnnonce}: any = route.params;

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
  }, [idAnnonce]);

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
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsAnnonce;
