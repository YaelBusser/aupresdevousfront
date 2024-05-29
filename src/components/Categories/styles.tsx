import {StyleSheet} from 'react-native';
import {secondaryColor} from '../../styles/main';

const styles = StyleSheet.create({
  category: {
    borderColor: 'red',
    borderStyle: 'solid',
    padding: 10,
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockIcon: {
    width: 52,
    height: 52,
    padding: 20,
    backgroundColor: secondaryColor,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  icon: {
    width: 20,
    height: 20,
    zIndex: 5,
  },
});

export default styles;
