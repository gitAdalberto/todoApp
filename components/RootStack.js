import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Home from "./Home";

export default function RootStack() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator initialRouteName="Login"
        screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
    );
}