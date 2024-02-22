import React, { useState } from 'react';
import { View, ImageBackground, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Avatar() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');

  const handleConfirmar = () => {
    if (nome.trim() === '') {
      alert('Por favor, digite seu nome.');
    } else {
      navigation.navigate('Meu Álbum');
    }
  };

  const handleInputSubmit = () => {
    if (nome.trim() !== '') {
      alert(`Olá, ${nome}!`);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/fe.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/fotoClei1.png')}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            onChangeText={text => setNome(text)}
            value={nome}
            onSubmitEditing={handleInputSubmit}
            textAlign="center"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleConfirmar}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#696DC9',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
