import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const primaryColor = '#1EAFD5';
export const secondaryColor = '#F3F8FE';
export const tertiaryColor = '#A6E2F2';
export const primaryFontRegular = 'Urbanist-Regular';
export const primaryFontBold = 'Urbanist-Bold';
export const primaryFontSemiBold = 'Urbanist-SemiBold';
export const primaryFontMedium = 'Urbanist-Medium';
export const primaryFontLight = 'Urbanist-Light';
export const secondaryFontMedium = 'Montserrat-Medium';
export const secondaryFontRegular = 'Montserrat-Regular';
export const tertiaryFontRegular = 'Poppins-Regular';
export const tertiaryFontBold = 'Poppins-Bold';
export const tertiaryFontLight = 'Poppins-Light';


const stylesMain = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    minHeight: '100%',
  },
  primaryColor: {
    color: primaryColor,
  },
  primaryFontRegular: {
    fontFamily: primaryFontRegular,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
    fontFamily: primaryFontBold,
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#F7F8F9',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8ECF4',
    borderRadius: 10,
    paddingHorizontal: 20,
    padding: 10,
    marginBottom: 20,
    color: 'black',
  },
  textArea: {
    height: 'auto',
    backgroundColor: '#E8ECF4',
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontFamily: primaryFontRegular,
  },
});

export default stylesMain;
