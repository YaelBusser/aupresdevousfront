import {StyleSheet} from 'react-native';
import {primaryColor, primaryFont, secondaryColor} from '../../../../styles/main';

const styles = StyleSheet.create({
  containerContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '110%',
    backgroundColor: 'white',
  },
  content: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textArea: {
    height: 'auto',
    backgroundColor: '#E8ECF4',
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  imageUpload: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
    aspectRatio: '180/150',
  },
  imageSelected: {
    width: '100%',
    height: 250,
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
  },
  blockIcon: {
    width: 42,
    height: 42,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondaryColor,
    borderRadius: 50,
  },
  icon: {
    width: 20,
    height: 20,
  },
  categoryLabel: {
    color: 'black',
    fontFamily: primaryFont,
    fontWeight: 'bold',
  },
  blockImage: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#E8ECF4',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  blocCategory: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F8FE',
    borderRadius: 50,
    paddingRight: 15,
  },
  listCategories: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    marginBottom: 20,
    marginTop: 20,
  },
  blocCategories: {
    marginTop: 20,
  },
  selectedCategory: {
    backgroundColor: primaryColor,
  },
  labelSelectedCategory: {
    color: 'white',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  blocButtonsImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    marginTop: 10,
    marginBottom: 50,
  },
});

export default styles;
