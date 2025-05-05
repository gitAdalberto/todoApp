import { TextInput, View, StyleSheet, Pressable, Text, Alert, Keyboard } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../config";

export default function Login() {

    const navi = useNavigation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = async () => {
        console.log('button ingresar');
        console.log(email);
        console.log(password);
        if (email && password) {
            const response = await fetch(`${API_URL}/users/login`,
                {
                    headers: {
                        "Content-Type":"application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );
            console.log("response status:", response.status);
            
            if (response.status === 404) {
                Alert.alert('Error al registrarse','Este usuario no esta registrado');
                return;
            }
    
            if (response.status === 500) {
                Alert.alert('Error al registrarse','Error al crear el usuario');
                return;
            }

            if (response.status === 200) {
                const data = await response.json();
                console.log("data:",data);
                console.log("id:",data.id);
                Keyboard.dismiss();
                navi.replace('Home',{ id: data.id });
            } else {
                console.log('nada');
            }
            
            
        } else {
            setEmail('user1@example.com');
            setPassword('1234');
        }
    }

    return (
        <View style={styles.Container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
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
            
            <View style={styles.ButtonContainer}>
                <Pressable style={styles.Button} onPress={handleLogin}>
                    <Text style={styles.ButtonText}>Ingresar</Text>
                </Pressable>
                <Pressable style={styles.Button} onPress={()=>{navi.navigate('Register');}}>
                    <Text style={styles.ButtonText}>Registrarse</Text>
                </Pressable>
            </View>
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
    title:{
        fontSize: 16,
        color: '#000',
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
        width: 120,
    },
    ButtonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center'
    },
    unCheckButton: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 8,
        borderWidth:2,
        borderColor: "gray",
        alignItems: 'center',
    },
    checkButton: {
        backgroundColor: '#09f',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    toggleContainer:{
        width:'90%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,        
    },
    toogleText:{
        fontSize: 16,
    },
    ButtonContainer:{
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});