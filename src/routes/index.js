import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "../pages/Home";


export const  RoutesSystem = () => {
    const Stack = createNativeStackNavigator();

   return ( 
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            </Stack.Navigator>
        </NavigationContainer>
    )
}