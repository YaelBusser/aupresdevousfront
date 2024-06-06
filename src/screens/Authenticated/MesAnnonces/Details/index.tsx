import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from 'react-native';
import stylesMain from '../../../../styles/main';
import styles from './styles';
import GoBack from '../../../../components/goBack';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark, faPen, faCheck} from '@fortawesome/free-solid-svg-icons';
import ImagePicker from 'react-native-image-crop-picker';
import v4 from 'react-native-uuid';
import Modal from 'react-native-modal';
import env from '../../../../../env.json';

const DetailsMonAnnonce = ({navigation}: any) => {
  const route = useRoute();
  const [annonce, setAnnonce] = useState<any>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [imageUri, setImageUri] = useState<string>('');
  const [uuid, setUuid] = useState<any>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {id}: any = route.params;

  useEffect(() => {
    axios
      .get(`${env.API}/annonces/details/${id}`)
      .then((res: any) => {
        setAnnonce(res.data);
        setEditedTitle(res.data.titre);
        setEditedDescription(res.data.description);
      })
      .catch((err: any) => {
        console.error(
          "Erreur lors de la récupération des détails de l'annonce:",
          err,
        );
      });
    setUuid(v4.v4());
  }, [id, isEditing]);

  const handleCancelPress = () => {
    setIsEditing(false);
    setImageUri('');
  };
  const handleEditPress = async () => {
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    const formData = new FormData();
    formData.append('titre', editedTitle);
    formData.append('description', editedDescription);
    formData.append('uuid', uuid);
    if (imageUri) {
      formData.append('couverture', {
        uri: imageUri,
        type: 'image/jpg',
        name: `${uuid}.jpg`,
      });
    }
    await axios
      .put(`${env.API}/annonces/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res: any) => {
        setAnnonce(res.data.annonce);
        console.log(annonce);
        setIsEditing(false);
      })
      .catch((err: any) => {
        console.error('Erreur lors de la sauvegarde des modifications:', err);
      });
  };

  const handleChangeImage = async () => {
    await ImagePicker.openPicker({
      mediaType: 'photo',
      width: 180,
      height: 150,
      cropping: true,
      forceJpg: true,
    }).then(image => {
      setImageUri(image.path);
    });
  };

  const handleDeleteAnnonce = async () => {
    setIsModalVisible(false);
    await axios
      .delete(`${env.API}/annonces/delete/${id}`)
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        console.error("Erreur lors de la suppression de l'annonce:", err);
      });
  };
  return (
    <ScrollView contentContainerStyle={stylesMain.body}>
      <GoBack navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.contentHead}>
          <View style={[styles.containerIcons, isEditing && {right: 40}]}>
            {isEditing && (
              <>
                <TouchableOpacity
                  style={styles.edit}
                  onPress={handleCancelPress}>
                  <FontAwesomeIcon
                    style={styles.iconClose}
                    size={32}
                    icon={faXmark}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSavePress}
                  style={[stylesMain.button, styles.validate]}>
                  <FontAwesomeIcon
                    style={styles.iconValidate}
                    size={32}
                    icon={faCheck}
                  />
                </TouchableOpacity>
              </>
            )}
            {!isEditing && (
              <TouchableOpacity style={styles.edit} onPress={handleEditPress}>
                <FontAwesomeIcon
                  style={styles.iconEdit}
                  size={24}
                  icon={faPen}
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <Image
              source={{
                uri:
                  imageUri !== '' ? imageUri : `${env.API}/${annonce?.image}`,
              }}
              style={styles.couverture}
              blurRadius={isEditing ? 1 : 0}
            />
            {isEditing && (
              <View style={styles.containerEditImage}>
                <TouchableOpacity
                  style={[stylesMain.button, styles.buttonEditImage]}
                  onPress={handleChangeImage}>
                  <Text style={stylesMain.buttonText}>Modifer l'image</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.gradient}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 1)']}
              style={styles.gradient}
            />
          </View>
          <View style={styles.titleCategory}>
            <View style={{width: '90%'}}>
              {isEditing ? (
                <TextInput
                  style={stylesMain.input}
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                />
              ) : (
                <Text style={styles.titre}>{annonce?.titre}</Text>
              )}
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
              {isEditing ? (
                <TextInput
                  style={stylesMain.textArea}
                  value={editedDescription}
                  onChangeText={setEditedDescription}
                  multiline
                />
              ) : (
                <Text style={styles.description}>{annonce?.description}</Text>
              )}
            </View>
          </View>
          {isEditing && (
            <TouchableOpacity
              style={[stylesMain.buttonRed, styles.buttonDelete]}
              onPress={() => setIsModalVisible(true)}>
              <Text style={stylesMain.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={stylesMain.modalContent}>
          <Text style={stylesMain.modalText}>
            Êtes-vous sûr de vouloir supprimer cette annonce ?
          </Text>
          <View style={stylesMain.modalButtons}>
            <View style={{width: '47%'}}>
              <TouchableOpacity
                style={stylesMain.button}
                onPress={() => setIsModalVisible(false)}>
                <Text style={stylesMain.buttonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '47%'}}>
              <TouchableOpacity
                style={stylesMain.buttonRed}
                onPress={handleDeleteAnnonce}>
                <Text style={stylesMain.buttonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DetailsMonAnnonce;
