import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import axios from 'axios';
import {useEffect, useState} from 'react';
const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const getAllCategories = () => {
    axios
      .get('http://10.0.2.2:4001/categories')
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
            <Image source={{uri: category.icon}} style={styles.icon} />
            <Text key={index}>{category.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default Categories;
