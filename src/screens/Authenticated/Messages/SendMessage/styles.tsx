import {StyleSheet} from 'react-native';
import {primaryColor} from '../../../../styles/main';
const styles = StyleSheet.create({
  content: {
    minHeight: '100%',
  },
  containerTop: {
    marginTop: 50,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    zIndex: 20,
    borderRadius: 50,
  },
  profileName: {
    color: 'black',
    fontSize: 16,
  },
  textWhySend: {
    textAlign: 'center',
    width: '100%',
    marginTop: 20,
  },
  blockSendMessage: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  sendMessage: {
    width: '80%',
  },
  blockIconSend: {
    width: 50,
    height: 50,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  iconSend: {
    color: primaryColor,
    height: 'auto',
  },
});

export default styles;
