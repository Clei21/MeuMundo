import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TelaLogin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Senha:', senha);
      
    navigation.navigate('Mundo');
  };

  return (
    <ImageBackground source={require('../../assets/LG.jpg')} resizeMode="cover" style={{ flex:  2}}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#777" style={styles.icon} /> 
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#777" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            onChangeText={(text) => setSenha(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="facebook" size={30} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="instagram" size={30} color="#e4405f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="google" size={30} color="#4285F4" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '80%',
    height: 40,
    marginBottom: 16,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#696DC9',
    width: '60%',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconContainer: {
    marginHorizontal: 10,
  },
  forgotPasswordText: {
    color: 'black',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
