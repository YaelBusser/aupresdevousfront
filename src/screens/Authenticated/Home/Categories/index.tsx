import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import styles from './styles.tsx';
import stylesMain from '../../../../styles/main';
import axios from 'axios';
import GoBack from '../../../../components/goBack';

export default function HomeCategories({navigation}: any) {
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState('Tout');

  const arrow = require('../../../../assets/icons/right_arrow.png');

  const getAllCategories = () => {
    axios
      .get('http://10.0.2.2:4001/categories')
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
              {allCategories.slice(0, 3).map((cat: any, index) => (
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
                    <Text key={index}>{cat.label}</Text>
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
