import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image, TextInput, Alert, Dimensions, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';

export default function TelaCamera() {
    const navigation = useNavigation();
    const camRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);
    const [prancha, setPrancha] = useState('');
    const [cartao, setCartao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [confirmado, setConfirmado] = useState(false);
    const [imageWidth, setImageWidth] = useState(null);
    const [showCapturedData, setShowCapturedData] = useState(false); 

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        (async () => {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            setHasPermission(status === 'granted');
        })();
    }, []);

    useLayoutEffect(() => {
        if (capturedPhoto) {
            Image.getSize(capturedPhoto, (width, height) => {
                const screenWidth = Dimensions.get('window').width;
                const scaleFactor = width / screenWidth;
                const imageHeight = height / scaleFactor;
                setImageWidth(screenWidth);
            });
        }
    }, [capturedPhoto]);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>Acesso Negado!</Text>;
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpen(true);
        }
    }

    async function savePicture() {
        if (capturedPhoto && confirmado) {
            try {
                const asset = await MediaLibrary.createAssetAsync(capturedPhoto);

                setShowCapturedData(true);

                Alert.alert(
                    'Imagem salva com sucesso!',
                    `Nome da Prancha: ${prancha}\nNome do Cartão: ${cartao}\nDescrição: ${descricao}`,
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ]
                );

                setOpen(false);
            } catch (error) {
                console.error('Erro ao salvar:', error);
            }
        } else {
            Alert.alert('Por favor, confirme a descrição antes de salvar.');
        }
    }

    function handleVoltar() {
        setShowCapturedData(false);
        navigation.navigate('Meu Álbum'); 
    }

    if (showCapturedData) {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/branco.jpg')} style={styles.backgroundImage}>
                    <View style={styles.overlay}>
                        <View style={styles.cardContainer}>
                            <Image
                                source={{ uri: capturedPhoto }}
                                style={styles.cardImage}
                            />
                            <View style={styles.cardContent}>
                                <View style={styles.dataContainer}>
                                    <Text style={styles.dataText}>Nome do Álbum:</Text>
                                    <Text style={styles.dataText}>{prancha}</Text>
                                </View>
                                <View style={styles.dataContainer}>
                                    <Text style={styles.dataText}>Nome do Cartão:</Text>
                                    <Text style={styles.dataText}>{cartao}</Text>
                                </View>
                                <View style={styles.dataContainer}>
                                    <Text style={styles.dataText}>Descrição:</Text>
                                    <Text style={styles.dataText}>{descricao}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.buttonConfirmar, { backgroundColor: '#696DC9' }]} onPress={handleVoltar}>
                            <Text style={{ color: '#FFF', fontSize: 18 }}>Voltar</Text>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera style={{ flex: 1 }} type={type} ref={camRef}>
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            bottom: 20,
                            right: 20,
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}
                    >
                        <FontAwesome name="refresh" size={30} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </Camera>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
                <FontAwesome name="camera" size={30} color="white" style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
            <Modal
                animationType='slide'
                transparent={false}
                visible={open}
            >
                <ImageBackground source={require('../../assets/branco.jpg')} style={styles.backgroundImage}>
                    <View style={styles.modalContent}>
                        <Image
                            style={{ width: '100%', height: '50%', borderRadius: 20 }}
                            source={{ uri: capturedPhoto }}
                        />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
                                <FontAwesome name="window-close" size={50} color="#be2929" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonUpload} onPress={savePicture}>
                                <FontAwesome name="upload" size={50} color="#699934" />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do Álbum"
                            onChangeText={text => setPrancha(text)}
                            value={prancha}
                        />


                        <TextInput
                            style={styles.input}
                            placeholder="Nome do Cartão"
                            onChangeText={text => setCartao(text)}
                            value={cartao}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição"
                            onChangeText={text => setDescricao(text)}
                            value={descricao}
                        />
                        <TouchableOpacity
                            style={[styles.buttonConfirmar, { backgroundColor: '#696DC9' }]}
                            onPress={() => setConfirmado(true)}
                        >
                            <Text style={{ color: '#FFF', fontSize: 18 }}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        margin: 20,
        borderRadius: 15,
        height: 50,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    buttonClose: {
        margin: 10,
    },
    buttonUpload: {
        margin: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '90%',
    },
    buttonConfirmar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        paddingVertical: 12,
        borderRadius: 10,
        width: '90%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        width: '90%',
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        marginBottom: 20,
    },
    cardContent: {
        alignItems: 'flex-start',
        width: '100%',
    },
    dataContainer: {
        marginBottom: 10,
    },
    dataText: {
        fontSize: 18,
    }
});
