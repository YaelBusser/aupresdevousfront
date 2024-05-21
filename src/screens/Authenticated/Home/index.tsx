import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import styles from './styles.tsx';
import stylesMain from '../../../styles/main';
import {Searchbar} from 'react-native-paper';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import Categories from '../../../components/Categories';

export default function Home({navigation}: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={stylesMain.body}>
        <View style={styles.content}>
          <Text>Page protégée - AuthHome</Text>
          <Searchbar
            placeholder="Rechercher..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            iconColor={'black'}
            clearIcon={{uri: 'https://i.ibb.co/DzGfPqL/cross-23.png'}}
            icon={{uri: 'https://i.ibb.co/b5W0rzw/search.png'}}
          />
          <View style={styles.blockCategories}>
            <Categories />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}
