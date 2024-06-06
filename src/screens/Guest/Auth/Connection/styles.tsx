import {StyleSheet} from 'react-native';
import {primaryFontBold, primaryFontMedium, primaryFontRegular} from "../../../../styles/main";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
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
  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: primaryFontBold,
  },
});

export default styles;
