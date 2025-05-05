import { TextInput, View,Button, StyleSheet, Pressable, Text } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../config";

export default function Login() {

    const navi = useNavigation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = async () => {
        console.log('button ingresar');
        
        if (email) {
            const response = await fetch(`${API_URL}/users/email/${email}`);
            const data = await response.json();
            console.log('información del usuario:');
            console.log(data);
            console.log('fin información')
            navi.replace('Home',{ id: data.id });
        } else {
            setEmail('user1@example.com');
        }
    }

    return (
        <View style={styles.Container}>
            <View style={styles.InputContainer}>
                <TextInput
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.Input}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.InputContainer}>
                <TextInput
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.Input}
                    secureTextEntry
                />
            </View>
            <Pressable style={styles.Button} onPress={handleLogin}>
                <Text style={styles.ButtonText}>Ingresar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#00000010',
        width: '100%',
        gap: 16,
    },
    InputContainer:{
        alignSelf: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        borderRadius: 32,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 1.0,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    Input:{
        backgroundColor: 'transparent',
        width: '100%',
        borderRadius: 32,
        paddingHorizontal: 16,
    },
    Button:{
        backgroundColor: '#09f',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 32,
        
    },
    ButtonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});