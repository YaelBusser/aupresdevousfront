import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from './styles';
// @ts-ignore
const GoBack = ({navigation}) => {
  const backIcon = require('../../assets/icons/goBack.png');

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Image source={backIcon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default GoBack;
