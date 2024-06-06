import {StyleSheet} from 'react-native';
import {
  primaryColor,
  primaryFontBold, primaryFontLight, primaryFontMedium,
  primaryFontRegular,
  secondaryFont,
  secondaryFontMedium, secondaryFontRegular
} from '../../../../styles/main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
    color: '#1E232C',
    fontFamily: primaryFontBold,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderColor: '#E8ECF4',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontFamily: primaryFontMedium,
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: primaryFontBold,
  },
});

export default styles;
