import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const primaryColor = '#317DEE';
export const primaryFont = 'Arial';

const stylesMain = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    minHeight: 100,
  },
  primaryColor: {
    color: primaryColor,
  },
  primaryFont: {
    fontFamily: primaryFont,
  },
});

export default stylesMain;
