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
    fontSize: 14,
    color: primaryColor,
    maxWidth: '90%',
    fontWeight: 'bold',
  },
  blockContacts: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  blockContact: {
    padding: 7,
    width: '100%',
  },
  blockUsers: {
    display: 'flex',
    flexDirection: 'column',
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
  containerContactInfos: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '85%',
    height: 50,
  },
  blockUsername: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  username: {
    fontWeight: 'normal',
    fontSize: 18,
    color: 'black',
    maxWidth: '90%',
  },
  usernameUnseen: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    maxWidth: '90%',
  },
  numberUnseenMessagesCount: {
    color: 'white',
    padding: 6,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: primaryColor,
    borderRadius: 50,
    fontSize: 10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  blockLastMessage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  lastMessage: {
    fontWeight: 'normal',
    fontSize: 14,
    maxWidth: '55%',
  },
  lastMessageUnseen: {
    fontWeight: 'bold',
    color: 'black',
  },
  dateLastMessage: {
    fontWeight: 'normal',
  },
  noContacts: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default styles;
