import {StyleSheet} from 'react-native';
import {primaryColor} from '../../../styles/main';
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  containerItems: {
    width: '100%',
    marginTop: 20,
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
    fontSize: 22,
    color: 'black',
    maxWidth: 250,
  },
  categoryItem: {
    color: primaryColor,
    fontSize: 16,
  },
  imageItem: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
});

export default styles;
