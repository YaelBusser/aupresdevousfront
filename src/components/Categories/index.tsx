import {View, Text, Image} from 'react-native';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const pathIcon = '../../assets/icons/categories/';
  const getAllCategories = () => {
    axios
      .get('http://10.0.2.2/categories')
      .then(res => {
        setAllCategories(res.data);
      })
      .catch(err => {});
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {allCategories.map((category: any, index) => (
        <View key={index} style={styles.category}>
          <Image source={{uri: category.icon}} style={styles.icon} />
          <Text key={index}>{category.label}</Text>
        </View>
      ))}
    </>
  );
};

export default Categories;
