import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Image, ImageBackground, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { ImageManipulator } from 'expo-image-manipulator';


export default function Perfil() {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária para acessar a câmera');
      }
    })();
  }, []);

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      const processedImage = await applyGrayscaleFilter(result.uri);
      setImage(processedImage);
    }
  };

  const applyGrayscaleFilter = async (uri) => {
    const processedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ grayscale: true }],
      { format: 'png' }
    );
    return processedImage.uri;
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const showAlert = () => {
    if (name.trim() !== '') {
      Alert.alert(`Nome salvo: ${name}`);
    } else {
      Alert.alert('Por favor, digite seu nome antes de prosseguir.');
    }
  };

  const confirmAndNavigate = () => {
    console.log('Confirmado!');
    navigation.navigate('Bem Vindo');
  };

  return (
    <ImageBackground source={require('../../assets/th.jpg')} resizeMode="cover" style={styles.background}>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.cameraIconContainer}>
          <TouchableOpacity onPress={openCamera} style={{ alignItems: 'center' }}>
            <FontAwesome name="camera" size={60} color="#696DC9"/>
          </TouchableOpacity>
        </View>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Text style={styles.startText}>APERTE NA CÂMERA!</Text>
       
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity onPress={confirmAndNavigate} style={[styles.button, { backgroundColor: '#696DC9' }]}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  cameraIconContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  startText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008FCB',
  }
});
