import {StyleSheet} from 'react-native';
import {primaryColor} from '../../../styles/main';

const styles = StyleSheet.create({
  content: {
    height: '100%',
    width: '90%',
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 24,
    color: 'black',
    zIndex: 2,
  },
  containerContacts: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
  },
  containerTypeAnnonce: {
    marginBottom: 20,
  },
  annonceTitle: {
    fontSize: 20,
    color: primaryColor,
    maxWidth: 300,
    fontWeight: 'bold',
  },
  blockContacts: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
  },
  blockContact: {
    padding: 7,
    width: '100%',
  },
  blockUsers: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 20,
  },
  blockContactInfos: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 10.74,
  },
  userAvatar: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  contactInfos: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userNameAnnonceTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  blockUsername: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  noContacts: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default styles;
