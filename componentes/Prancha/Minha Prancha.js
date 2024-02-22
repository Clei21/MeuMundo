import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Image, ImageBackground, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import * as Camera from 'expo-camera';

export default function Prancha() {
  const navigation = useNavigation();
  const [nomePrancha, setNomePrancha] = useState('');
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de câmera necessária');
      }
    })();
  }, []);

  const handleCameraPress = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setImagem(result.uri);
        }
      } else {
        Alert.alert('Permissão de câmera necessária');
      }
    } catch (error) {
      console.log('Erro ao acessar a câmera:', error);
    }
  };

  const handleNomePranchaChange = (text) => {
    setNomePrancha(text);
  };

  const handleNomePranchaSubmit = () => {
    Alert.alert('Nome do Álbum', nomePrancha);
  };

  const handleCriarCartaoPress = () => {
 navigation.navigate('Câmera');
  };

  return (
    <ImageBackground
      source={require('../../assets/bus.jpg')}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <TouchableOpacity onPress={() => {}} style={{ position: 'absolute', top: 20, right: 20 }}>
        <FontAwesome name="user-circle" size={30} color="#696DC9" />
      </TouchableOpacity>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        {imagem && (
          <Image source={{ uri: imagem }} style={{ width: 300, height: 300, marginTop: 20 }} />
        )}
        <TouchableOpacity onPress={handleCameraPress} style={styles.cameraButton}>
          <FontAwesome name="camera" size={70} color="#696DC9" />
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Ábum"
            onChangeText={handleNomePranchaChange}
            value={nomePrancha}
            onSubmitEditing={handleNomePranchaSubmit}
            textAlign="center"
          />
        </View>
        <TouchableOpacity onPress={handleCriarCartaoPress} style={styles.button}>
          <Text style={styles.buttonText}>Criar Cartão</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    width: 200,
  },
  button: {
    backgroundColor: '#696DC9',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraButton: {
    alignItems: 'center',
    marginTop: 20,
  },
});
