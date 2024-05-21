import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'red',
    marginTop: 100,
  },
  searchBar: {
    backgroundColor: '#F3F8FE',
    margin: 10,
  },
  blockCategories: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: 'red',
    width: '100%',
  },
});

export default styles;
