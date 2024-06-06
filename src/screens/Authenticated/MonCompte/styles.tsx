import {StyleSheet} from 'react-native';
import {primaryColor, primaryFontRegular} from '../../../styles/main';

const styles = StyleSheet.create({
  containerProfile: {
    height: 350,
    backgroundColor: primaryColor,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    textTransform: 'uppercase',
    color: 'white',
    fontFamily: primaryFontRegular,
  },
  logoLogout: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
  },
  buttonLogout: {
    position: 'absolute',
    width: 50,
    height: 40,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    zIndex: 5,
    right: 5,
  },
  imageProfile: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    zIndex: 50,
    borderRadius: 100,
  },
  editIcon: {
    position: 'absolute',
    top: -10,
    right: -15,
    width: 20,
    height: 20,
    zIndex: 50,
    padding: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
    borderRadius: 50,
  },
  name: {
    color: 'white',
    fontSize: 24,
  },
  email: {
    color: 'white',
    fontWeight: '300',
  },
});

export default styles;
