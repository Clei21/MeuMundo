import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function TelaCadastro() {
  const navigation = useNavigation(); 
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleCadastro = () => {
    if (nome.trim() === '' || email.trim() === '' || senha.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Home');
  };

  return (
    <ImageBackground source={require('../../assets/CADASTRO.jpg')} resizeMode="cover" style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="#777" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            onChangeText={(text) => setNome(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#777" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#777" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={!mostrarSenha}
            onChangeText={(text) => setSenha(text)}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <MaterialIcons name={mostrarSenha ? "visibility" : "visibility-off"} size={24} color="#777" style={[styles.icon, styles.eyeIcon]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
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
    paddingLeft: 10,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
  },
  icon: {
    marginLeft: 8,
  },
  eyeIcon: {
    marginRight: 8, 
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
});
