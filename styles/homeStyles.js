import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  hero: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  heroText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    zIndex: 3,
    fontFamily: 'Roboto',
  },

  heroContent: {
    position: 'relative',
    zIndex: 3,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnContainer: {
    marginTop: 20,
  },

  button: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 3,
    borderRadius: '10px',
    width: 40,

    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
      cursor: 'pointer',
    },
  },

  tiles: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderRadius: 10,
    marginTop: 30,
  },
});

export default styles;
