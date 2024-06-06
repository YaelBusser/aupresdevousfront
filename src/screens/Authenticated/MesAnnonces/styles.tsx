import {StyleSheet} from 'react-native';
import {primaryColor, primaryFontMedium, primaryFontSemiBold} from '../../../styles/main';
const styles = StyleSheet.create({
  content: {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  section: {
    width: '90%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: 'black',
    fontFamily: primaryFontSemiBold,
  },
  containerItems: {
    width: '100%',
  },
  containerItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 10,
    paddingTop: 10,
    overflow: 'hidden',
  },
  infosItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleItem: {
    fontSize: 18,
    color: 'black',
    maxWidth: 230,
    fontFamily: primaryFontMedium,
  },
  categoryItem: {
    color: primaryColor,
    fontSize: 12,
    fontFamily: primaryFontMedium,
  },
  imageItem: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
});

export default styles;
