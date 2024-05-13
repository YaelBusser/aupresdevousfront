import {
  Alert,
  Image,
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
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

const Publier = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string>('');

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      console.log(image);
      if ('data' in image) {
        const data = `data:${image.mime};base64,${image.data}`;
        setImageUri(data);
        moveImage(image.path);
      }
    });
  };

  const moveImage = async (sourcePath: string) => {
    try {
      const filename = sourcePath.split('/').pop();
      const destPath = `${RNFS.DocumentDirectoryPath}../src/assets/images/services/${filename}`;
      await RNFS.moveFile(sourcePath, destPath);
      console.log('Image déplacée avec succès vers :', destPath);
    } catch (error) {
      console.error("Erreur lors du déplacement de l'image :", error);
    }
  };

  const handleAjouterService = async () => {
    try {
      if (!titre || !description || !imageUri) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs');
        return;
      }

      const response = await axios.post('http://10.0.2.2:4001/services/add', {
        idUser: 'ID_de_l_utilisateur',
        idCategorie: 'ID_de_la_categorie',
        titre,
        description,
        image: imageUri,
      });

      if (response.status === 201) {
        Alert.alert('Succès', 'Service ajouté avec succès');
        setTitre('');
        setDescription('');
        setImageUri('');
      } else {
        Alert.alert(
          'Erreur',
          "Une erreur est survenue lors de l'ajout du service",
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Erreur',
        "Une erreur est survenue lors de l'ajout du service",
      );
    }
  };

  return (
    <>
      <Header />
      <View style={stylesMain.body}>
        <View>
          <Text>Ajouter un service</Text>
          <TextInput
            style={styles.input}
            placeholder="Titre"
            value={titre}
            onChangeText={setTitre}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TouchableOpacity onPress={uploadImage}>
            <Text>Sélectionner une image</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image
              source={{uri: imageUri}}
              style={{
                width: 200,
                height: 200,
              }}
            />
          )}
          <TouchableOpacity
            style={stylesMain.button}
            onPress={handleAjouterService}>
            <Text style={stylesMain.buttonText}>Ajouter le service</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Ajouter une annonce</Text>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default Publier;
