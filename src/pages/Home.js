import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/an.jpg')}  resizeMode="cover"  style={{  flex: 1,
    alignItems: 'center', justifyContent: 'center' }} >
        <Text style={styles.title}>Aplicativo</Text>
  
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
        </ImageBackground>
      </View>
    );
}
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
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