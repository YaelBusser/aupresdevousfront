import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import styles from './styles.tsx';
import stylesMain, {
  primaryColor,
  primaryFontBold, primaryFontMedium, primaryFontRegular,
  primaryFontSemiBold,
  tertiaryFontBold,
  tertiaryFontRegular,
} from '../../../styles/main';
import {Searchbar, RadioButton} from 'react-native-paper';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import axios from 'axios';
import env from '../../../../env.json';
export default function Home({route, navigation}: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string>('Tout');
  const [idCategory, setIdCategory] = useState<number>();
  const [ads, setAds] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const iconTout = require('../../../assets/icons/tout.png');
  const iconAutres = require('../../../assets/icons/autres.png');
  const onChangeSearch = (query: any) => setSearchQuery(query);

  const [allCategories, setAllCategories] = useState([]);
  const [filter, setFilter] = useState<'Tous' | 'Demandes' | 'Prestations'>(
    'Tous',
  );

  const getAllCategories = () => {
    axios
      .get(`${env.API}/categories`)
      .then((res: any) => {
        setAllCategories(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const getAds = (
    selectedCategory: string,
    selectedIdCategory?: number,
    search?: string,
  ) => {
    let url = `${env.API}/annonces`;
    const params = new URLSearchParams();

    if (selectedCategory && selectedCategory !== 'Tout') {
      params.append('category', selectedCategory);
      params.append('idCategory', selectedIdCategory?.toString() || '');
    }
    if (search) {
      params.append('search', search);
    }
    axios
      .get(`${url}?${params.toString()}`)
      .then((res: any) => {
        setAds(res.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setError('Erreur lors de la récupération des annonces.');
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  const filterAds = (filter: 'Tous' | 'Demandes' | 'Prestations') => {
    setFilter(filter);
  };
  useEffect(() => {
    if (route.params?.category && route.params?.idCategory) {
      setCategory(route.params.category);
      setIdCategory(route.params.idCategory);
      if (searchQuery.length > 0) {
        getAds(route.params.category, route.params.idCategory, searchQuery);
      } else {
        getAds(route.params.category, route.params.idCategory);
      }
    } else {
      getAds('Tout');
    }
  }, [route.params]);

  useEffect(() => {
    if (category === 'Tout') {
      getAds(category, undefined, searchQuery);
    } else {
      getAds(category, idCategory, searchQuery);
    }
  }, [category, idCategory, searchQuery]);
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={stylesMain.body}>
        <View style={styles.content}>
          <Searchbar
            placeholder="Rechercher des annonces..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            iconColor={'black'}
            clearIcon={{uri: 'https://i.ibb.co/DzGfPqL/cross-23.png'}}
            icon={{uri: 'https://i.ibb.co/b5W0rzw/search.png'}}
            placeholderTextColor={'grey'}
            inputStyle={{fontFamily: tertiaryFontRegular}}
          />
          <View style={styles.blockCategories}>
            <TouchableOpacity
              onPress={() => {
                setCategory('Tout');
              }}
              style={styles.blockIconLabel}>
              <View
                style={[
                  styles.blockIcon,
                  category === 'Tout' ? styles.blockIconSelected : {},
                ]}>
                <Image source={iconTout} style={styles.icon} />
              </View>
              <Text style={{fontFamily: primaryFontSemiBold, color: 'black'}}>
                Tout
              </Text>
            </TouchableOpacity>
            {allCategories.slice(0, 3).map((cat: any, index) => (
              <TouchableOpacity
                onPress={() => {
                  setCategory(cat.label);
                  setIdCategory(cat.id);
                }}
                key={index}>
                <View style={styles.category}>
                  <View
                    style={[
                      styles.blockIcon,
                      category === cat.label ? styles.blockIconSelected : {},
                    ]}>
                    <Image source={{uri: cat.icon}} style={styles.icon} />
                  </View>
                  <Text
                    key={index}
                    style={{fontFamily: primaryFontSemiBold, color: 'black'}}>
                    {cat.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeCategories')}
              style={styles.blockIconLabel}>
              <View style={styles.blockIcon}>
                <Image source={iconAutres} style={styles.icon} />
              </View>
              <Text style={{fontFamily: primaryFontSemiBold, color: 'black'}}>
                Autres
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <RadioButton.Group
              onValueChange={(newValue: any) => filterAds(newValue)}
              value={filter}>
              <View style={styles.filters}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="Tous" color={primaryColor} />
                  <Text
                    onPress={() => filterAds('Tous')}
                    style={{fontFamily: primaryFontMedium, color: 'black'}}>
                    Tous
                  </Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="Demandes" color={primaryColor} />
                  <Text
                    onPress={() => filterAds('Demandes')}
                    style={{fontFamily: primaryFontMedium, color: 'black'}}>
                    Demandes
                  </Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="Prestations" color={primaryColor} />
                  <Text
                    onPress={() => filterAds('Prestations')}
                    style={{fontFamily: primaryFontMedium, color: 'black'}}>
                    Prestations
                  </Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          {category.length > 0 && category !== 'Tout' && (
            <Text style={styles.titleCategory}>{category}...</Text>
          )}
          {(filter === 'Tous' || filter === 'Demandes') && (
            <View style={styles.blockAnnonces}>
              <Text style={styles.typeAnnonce}>Annonces demandeurs</Text>
              {loading && <Text style={{marginLeft: 20}}>Chargement...</Text>}
              {error && (
                <Text style={{marginLeft: 20, color: 'red'}}>{error}</Text>
              )}
              {ads?.demandes?.length > 0 ? (
                <FlatList
                  horizontal
                  contentContainerStyle={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    gap: 20,
                  }}
                  data={ads?.demandes}
                  keyExtractor={(item: any) => item.id.toString()}
                  renderItem={({item}) => (
                    <View style={styles.annonce}>
                      <View style={styles.annonceContent}>
                        <Image
                          source={{uri: `${env.API}/${item.image}`}}
                          style={styles.adImage}
                        />
                        <Text numberOfLines={1} style={styles.titreAnnonce}>
                          {item.titre}
                        </Text>
                        <Text style={styles.categoryAnnonce}>
                          {item.category.label}
                        </Text>
                        <TouchableOpacity
                          style={[stylesMain.button, styles.buttonAd]}
                          onPress={() =>
                            navigation.navigate('DetailsAnnonce', {
                              idAnnonce: item.id,
                            })
                          }>
                          <Text style={[stylesMain.buttonText, {fontFamily: primaryFontRegular, fontSize: 14}]}>
                            Voir l'annonce
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              ) : (
                <Text style={{marginLeft: 20}}>Aucune demande trouvée</Text>
              )}
            </View>
          )}
          {(filter === 'Tous' || filter === 'Prestations') && (
            <View style={styles.blockAnnonces}>
              <Text style={styles.typeAnnonce}>Annonces prestataires</Text>
              {loading && <Text style={{marginLeft: 20}}>Chargement...</Text>}
              {error && (
                <Text style={{marginLeft: 20, color: 'red'}}>{error}</Text>
              )}
              {ads?.prestations?.length > 0 ? (
                <FlatList
                  horizontal
                  contentContainerStyle={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    gap: 20,
                  }}
                  data={ads?.prestations}
                  keyExtractor={(item: any) => item.id.toString()}
                  renderItem={({item}) => (
                    <View style={styles.annonce}>
                      <View style={styles.annonceContent}>
                        <Image
                          source={{uri: `${env.API}/${item.image}`}}
                          style={styles.adImage}
                        />
                        <Text numberOfLines={1} style={styles.titreAnnonce}>
                          {item.titre}
                        </Text>
                        <Text style={styles.categoryAnnonce}>
                          {item.category.label}
                        </Text>
                        <TouchableOpacity
                          style={[stylesMain.button, styles.buttonAd]}
                          onPress={() =>
                            navigation.navigate('DetailsAnnonce', {
                              idAnnonce: item.id,
                            })
                          }>
                          <Text style={stylesMain.buttonText}>
                            Voir l'annonce
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              ) : (
                <Text style={{marginLeft: 20}}>Aucune prestation trouvée</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}
