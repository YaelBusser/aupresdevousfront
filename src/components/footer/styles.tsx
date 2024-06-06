import {StyleSheet} from 'react-native';
import stylesMain, {primaryFontRegular} from '../../styles/main';

const styles = StyleSheet.create({
  containerFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerNav: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    minWidth: 33,
    minHeight: 33,
    maxWidth: 33,
    maxHeight: 33,
    resizeMode: 'contain',
  },
  iconText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    fontFamily: primaryFontRegular,
  },
  textActive: {},
});

export default styles;
