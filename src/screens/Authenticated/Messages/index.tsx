import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import stylesMain from "../../../styles/main";

const Messages = () => {
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={stylesMain.body}>
        <Text>Messages</Text>
      </ScrollView>
      <Footer />
    </>
  );
};

export default Messages;
