import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import stylesMain from '../../../../styles/main';
import styles from './styles';
import GoBack from '../../../../components/goBack';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import v4 from 'react-native-uuid';
import env from '../../../../../env.json';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons';

const CreateService = ({navigation}: any) => {
  const [token, setToken] = useState<string | null>('');
  const [allCategories, setAllCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string>('');
  const [category, setCategory] = useState('');
  const [idCategory, setIdCategory] = useState<number>(0);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [imageError, setImageError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [user, setUser] = useState<any>({});
  const [uuid, setUuid] = useState<any>('');

  const titleRef: any = useRef(null);
  const descriptionRef: any = useRef(null);

  const scrollViewRef = useRef<ScrollView>(null);

  let formData: any;
  const getAllCategories = async () => {
    await axios
      .get(`${env.API}/categories`)
      .then(res => {
        setAllCategories(res.data);
      })
      .catch(err => {});
  };

  const validateFields = () => {
    let valid = true;
    if (title === '') {
      setTitleError('Le titre est requis');
      valid = false;
    } else {
      setTitleError('');
    }
    if (description === '') {
      setDescriptionError('La description est requise');
      valid = false;
    } else {
      setDescriptionError('');
    }
    if (imageUri.length === 0) {
      setImageError('Une image est requise');
      valid = false;
    } else {
      setImageError('');
    }
    if (category === '') {
      setCategoryError('Une catégorie est requise');
      valid = false;
    } else {
      setCategoryError('');
    }
    return valid;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      formData = new FormData();
      formData.append('user', JSON.stringify(user));
      formData.append('title', title);
      formData.append('description', description);
      formData.append('idCategory', idCategory);
      formData.append('uuid', uuid);
      if (imageUri) {
        formData.append('couverture', {
          uri: imageUri,
          type: 'image/jpg',
          name: `${uuid}.jpg`,
        });
      }

      await axios
        .post(`${env.API}/annonces/create/service`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('Service créée avec succès:', response.data);
        })
        .catch(error => {
          console.log('Erreur lors de la création du service:', error);
        });

      Alert.alert(
        'Service créée',
        `Titre: ${title}\n \nDescription: ${description}\n \nCatégorie: ${category}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }
  };

  const uploadImage = async () => {
    await ImagePicker.openPicker({
      mediaType: 'photo',
      width: 180,
      height: 150,
      cropping: true,
      forceJpg: true,
    }).then(image => {
      setImageUri(image.path);
      setImageError('');
    });
  };

  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      const response = await axios.get(`${env.API}/profile`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getToken = async () => {
    setToken(await AsyncStorage.getItem('token'));
  };

  useEffect(() => {
    getToken();
    getAllCategories();
    getUserData();
    setUuid(v4.v4());
  }, []);
  return (
    <View style={stylesMain.body}>
      <GoBack navigation={navigation} />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.containerContent,
          imageUri.length > 0 && {height: '140%'},
        ]}>
        <View style={styles.content}>
          <Text style={styles.title}>Ma prestation</Text>
          <View>
            <Text
              style={styles.label}
              onPress={() => titleRef?.current?.focus()}>
              Titre
            </Text>
            <TextInput
              ref={titleRef}
              style={stylesMain.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Entrez le titre de votre prestation"
            />
            {titleError ? <Text style={styles.error}>{titleError}</Text> : null}
          </View>
          <View>
            <Text
              style={styles.label}
              onPress={() => descriptionRef?.current?.focus()}>
              Description
            </Text>
            <TextInput
              ref={descriptionRef}
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Entrez la description de votre prestation"
              multiline
              numberOfLines={5}
              placeholderTextColor={'grey'}
            />
            {descriptionError ? (
              <Text style={styles.error}>{descriptionError}</Text>
            ) : null}
          </View>
          <View>
            <Text style={styles.label}>Image</Text>
            <View style={styles.blockImage}>
              <View
                style={[
                  {padding: 10},
                  imageUri.length > 0
                    ? styles.imageSelected
                    : styles.blockButtonAddImage,
                ]}>
                {imageUri.length > 0 ? (
                  <>
                    <Image source={{uri: imageUri}} style={styles.image} />
                    <View style={styles.blocButtonsImage}>
                      <TouchableOpacity
                        onPress={() => setImageUri('')}
                        style={[stylesMain.buttonRed, {width: '40%'}]}>
                        <Text style={stylesMain.buttonText}>Supprimer</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={uploadImage}
                        style={[stylesMain.button, {width: '40%'}]}>
                        <Text style={stylesMain.buttonText}>Modifier</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={uploadImage}
                    style={styles.buttonAddImage}>
                    <Text style={styles.buttonAddImageText}>
                      Insérer une image de couverture
                    </Text>
                    <View
                      style={{
                        padding: 10,
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: 'black',
                        borderRadius: 50,
                        width: 16,
                        height: 16,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <FontAwesomeIcon size={12} color={'black'} icon={faAdd} />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {imageError ? <Text style={styles.error}>{imageError}</Text> : null}
          </View>
          <View>
            <View
              style={[
                styles.blocCategories,
                imageUri.length > 0 && {marginTop: 50},
              ]}>
              <Text style={styles.label}>Catégorie</Text>
              <Text style={styles.textCat}>
                Sélectionnez une catégorie pour votre prestation
              </Text>
              <View style={styles.listCategories}>
                {allCategories.map((cat: any, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.blocCategory,
                      category === cat.label ? styles.selectedCategory : {},
                    ]}
                    onPress={() => {
                      setCategory(cat.label);
                      setIdCategory(cat.id);
                      setCategoryError('');
                    }}>
                    <View
                      style={[
                        styles.blockIcon,
                        category === cat.label
                          ? {backgroundColor: 'white'}
                          : {},
                      ]}>
                      <Image source={{uri: cat.icon}} style={styles.icon} />
                    </View>
                    <Text
                      style={[
                        styles.categoryLabel,
                        category === cat.label && styles.labelSelectedCategory,
                      ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {categoryError ? (
              <Text style={styles.error}>{categoryError}</Text>
            ) : null}
          </View>
          <View>
            <TouchableOpacity
              style={[stylesMain.button, {height: 50}]}
              onPress={handleSubmit}>
              <Text style={stylesMain.buttonText}>Créer ma prestation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateService;
