import {StyleSheet} from 'react-native';
import {secondaryColor, tertiaryColor} from '../../../../styles/main';

const styles = StyleSheet.create({
  content: {
    width: '100%',
    marginTop: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentCategory: {
    width: '90%',
  },
  title: {
    fontSize: 32,
    color: 'black',
    width: '90%',
    marginBottom: 20,
  },
  blockCategories: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  category: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingTop: 10,
    paddingBottom: 10,
  },
  blockIcon: {
    width: 52,
    height: 52,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    zIndex: 5,
  },
  iconArrow: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
  },
});

export default styles;
