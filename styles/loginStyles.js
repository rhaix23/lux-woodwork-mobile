import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    // justifyContent: 'center',
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  inputField: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    paddingLeft: 10,
  },

  button: {
    width: 100,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },

  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },

  signup: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },

  signUpButton: {
    backgroundColor: 'transparent',
    padding: 0,
  },

  signUpButtonText: {
    color: 'rgb(219, 39, 119)',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;
