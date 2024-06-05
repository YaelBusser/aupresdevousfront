import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import axios from 'axios';
import {useEffect, useState} from 'react';
import env from '../../../env.json';

const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const getAllCategories = () => {
    axios
      .get(`${env.API}/categories`)
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
        <TouchableOpacity key={index}>
          <View style={styles.category}>
            <View style={styles.blockIcon}>
              <Image source={{uri: category.icon}} style={styles.icon} />
            </View>
            <Text key={index}>{category.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default Categories;
