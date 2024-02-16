import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Aplicativo</Text>
        <Image source={require('../../assets/an.jpg')} style={styles.logo} />
  
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Google</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableOpacity>
      </View>
    );
}
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'purple',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      color: '#212121',
      marginBottom: 16,
    },
    logo: {
      marginBottom: 30,
    },
    button: {
      backgroundColor: '#696DC9',
      width: '60%',
      borderRadius: 8,
      padding: 6,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      marginTop: 10,
      marginBottom: 10,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 20,
    },
  });