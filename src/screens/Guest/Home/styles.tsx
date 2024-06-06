import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  primaryColor,
  primaryFontBold,
  primaryFontLight,
  primaryFontRegular, secondaryFontMedium,
  secondaryFontRegular, tertiaryFontBold
} from '../../../styles/main';

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  containerLogo: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
  },
  containerLogo2: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logo2: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  sectionPresentation: {
    marginTop: 'auto',
    marginBottom: 50,
    alignItems: 'center',
  },
  blockText: {
    width: '80%',
    marginBottom: 40,
  },
  text: {
    color: 'white',
    fontFamily: secondaryFontRegular,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: secondaryFontRegular,
  },
  subTitle: {
    fontSize: 34,
    fontFamily: secondaryFontMedium,
    letterSpacing: 2,
  },
  blockButtons: {
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  AuthFormButton: {
    backgroundColor: primaryColor,
    width: '80%',
    justifyContent: 'center',
    borderRadius: 20,
    color: 'white',
  },
  AuthFormButtonText: {
    textAlign: 'center',
    fontFamily: tertiaryFontBold,
    fontSize: 16,
    padding: 20,
    color: 'white',
  },
});

export default styles;
