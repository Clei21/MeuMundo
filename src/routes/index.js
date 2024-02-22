import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "../pages/Home";
import TelaLogin from "../../componentes/TelaLogin";
import TelaCadastro from '../../componentes/TelaCadastro/cadastro';
import TelaCamera from "../../componentes/TelaCamera/camera";
import Perfil from '../../componentes/Perfil/Mundo';
import Avatar from '../../componentes/Avatar/Bem Vindo';
import Prancha  from '../../componentes/Prancha/Minha Prancha';



export const RoutesSystem = () => {
    const Stack = createNativeStackNavigator();

    return ( 
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Login"
                    component={TelaLogin}
                    />
                    <Stack.Screen
                        name="Cadastro"
                        component={TelaCadastro}
                   
                        />
                        <Stack.Screen
                        name="Câmera"
                        component={TelaCamera}
                        />
    
                        <Stack.Screen
                        name="Mundo"
                        component={Perfil}
                        />
    
                        <Stack.Screen
                        name="Bem Vindo"
                        component={Avatar}
                        />
    
                        <Stack.Screen
                        name="Meu Álbum"
                        component={Prancha}
                        />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};




