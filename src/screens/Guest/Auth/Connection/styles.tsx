import {StyleSheet} from 'react-native';

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
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
    color: '#1E232C',
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
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default styles;
