import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const primaryColor = '#1EAFD5';
export const primaryFont = 'Arial';

const stylesMain = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    minHeight: '100%',
  },
  primaryColor: {
    color: primaryColor,
  },
  primaryFont: {
    fontFamily: primaryFont,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonRed: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default stylesMain;
