import {StyleSheet} from 'react-native';
import {
  primaryColor, primaryFontBold, primaryFontMedium, primaryFontRegular, primaryFontSemiBold,
  secondaryColor,
  tertiaryColor,
} from '../../../styles/main';

const styles = StyleSheet.create({
  content: {
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'red',
    marginTop: 100,
    marginBottom: 100,
  },
  searchBar: {
    backgroundColor: '#F3F8FE',
    margin: 10,
  },
  category: {
    borderColor: 'red',
    borderStyle: 'solid',
    padding: 10,
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockCategories: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  blockIconLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
  },
  blockIcon: {
    width: 52,
    height: 52,
    padding: 20,
    backgroundColor: secondaryColor,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  blockIconSelected: {
    backgroundColor: tertiaryColor,
  },
  icon: {
    width: 20,
    height: 20,
    zIndex: 5,
  },
  blockAnnonces: {
    width: '100%',
    marginTop: 20,
  },
  titleCategory: {
    fontSize: 24,
    color: primaryColor,
    marginLeft: 20,
    marginBottom: 0,
    marginTop: 20,
    fontFamily: primaryFontBold,
  },
  contentAnnonces: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  annonce: {
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  annonceContent: {
    width: '100%',
  },
  buttonAd: {
    width: '100%',
    marginTop: 20,
  },
  adImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
  },
  titreAnnonce: {
    fontSize: 18,
    color: 'black',
    marginTop: 20,
    fontFamily: primaryFontMedium,
  },
  categoryAnnonce: {
    fontSize: 12,
    color: 'black',
    fontFamily: primaryFontRegular,
  },
  typeAnnonce: {
    fontSize: 24,
    color: 'black',
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: primaryFontSemiBold,
  },
  filterContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  filters: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
