import {StyleSheet} from 'react-native';
import {primaryColor} from '../../../../styles/main';
const styles = StyleSheet.create({
  content: {
    minHeight: '100%',
  },
  contentHead: {
    position: 'relative',
  },
  couverture: {
    width: '100%',
    height: 350,
    objectFit: 'fill',
  },
  gradient: {
    width: '100%',
    height: 300,
    position: 'absolute',
    bottom: 0,
  },
  containerInfos: {
    width: '90%',
    marginTop: 20,
  },
  titleCategory: {
    position: 'absolute',
    bottom: 75,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titre: {
    fontSize: 24,
    color: 'white',
  },
  category: {
    fontSize: 16,
    color: primaryColor,
  },
  blocContainer: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: -50,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    zIndex: 2,
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    zIndex: 20,
    borderRadius: 50,
  },
  profileName: {
    color: 'black',
    fontSize: 16,
  },
  infosAnnonce: {
    width: '100%',
    marginTop: 20,
  },
  description: {
    textAlign: 'justify',
    color: 'black',
  },
  edit: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 11.54,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  validate: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 11.54,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEdit: {
    color: 'black',
  },
  iconClose: {
    color: 'red',
  },
  iconValidate: {
    color: 'green',
  },
  containerIcons: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    zIndex: 2,
    backgroundColor: 'transparent',
    borderRadius: 11.54,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonDelete: {
    marginTop: 50,
    width: 150,
  },
  containerEditImage: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonEditImage: {
    position: 'absolute',
    bottom: 200,
    zIndex: 2,
    width: 200,
  },
});

export default styles;
