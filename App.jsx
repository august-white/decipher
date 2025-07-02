import './global.css';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "Screens/HomeScreen"
import DictionaryScreen from 'Screens/DictionaryScreen'
import PlayScreen from 'Screens/PlayScreen'


const Stack = createNativeStackNavigator(); 

export default function App() {
    return (
        <NavigationContainer
            linking={{
                prefixes: [""], // leave empty for localhost
                config: {
                    screens: {
                        Home: "/", 
                    }
                }
            }}
        >
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name='Dictionary' component={DictionaryScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Play" component={PlayScreen} options={{headerShown: false}}/>

            </Stack.Navigator>


        </NavigationContainer>
    );
}
