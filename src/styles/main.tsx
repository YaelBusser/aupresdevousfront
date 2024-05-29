import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const primaryColor = '#1EAFD5';
export const secondaryColor = '#F3F8FE';
export const tertiaryColor = '#A6E2F2';
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
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#E8ECF4',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
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
});

export default stylesMain;
