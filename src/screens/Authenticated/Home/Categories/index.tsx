import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import styles from './styles.tsx';
import stylesMain, {primaryFontSemiBold} from '../../../../styles/main';
import axios from 'axios';
import GoBack from '../../../../components/goBack';
import env from '../../../../../env.json';

export default function HomeCategories({navigation}: any) {
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState('Tout');

  const arrow = require('../../../../assets/icons/right_arrow.png');

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

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <GoBack navigation={navigation} />
      <ScrollView contentContainerStyle={stylesMain.body}>
        <View style={styles.content}>
          <View style={styles.contentCategory}>
            <Text style={styles.title}>Catégories</Text>
            <View style={styles.blockCategories}>
              {allCategories.map((cat: any, index) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Home', {
                      category: cat.label,
                      idCategory: cat.id,
                    });
                  }}
                  key={index}
                  style={{width: '100%'}}>
                  <View
                    style={[
                      styles.category,
                      index === 0 ? {borderTopWidth: 0} : {},
                    ]}>
                    <View style={styles.blockIcon}>
                      <Image source={{uri: cat.icon}} style={styles.icon} />
                    </View>
                    <Text key={index} style={{fontFamily: primaryFontSemiBold, color: 'black', fontSize: 14,}}>
                      {cat.label}
                    </Text>
                    <Image source={arrow} style={styles.iconArrow} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
