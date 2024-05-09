import {Text, View} from 'react-native';
import React from 'react';
import stylesMain from '../../../styles/main';
import Footer from '../../../components/footer';
import Header from '../../../components/header';

const Publier = () => {
  return (
    <>
      <Header />
      <View style={stylesMain.body}>
        <View>
          <Text>Publier un service</Text>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default Publier;
