import {Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import stylesMain from "../../../styles/main";

const Messages = () => {
  return (
    <>
      <Header />
      <View style={stylesMain.body}>
        <Text>Messages</Text>
      </View>
      <Footer />
    </>
  );
};

export default Messages;
