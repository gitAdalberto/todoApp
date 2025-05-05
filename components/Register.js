import { Text, View, TextInput, StyleSheet, Pressable, Keyboard, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../config";

export default function Register() {
    const [userId,setUserId] = useState(null);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const navi = useNavigation();

    const cleanFields = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const handleRegister = async  () => {
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            //algun campo esta vacio
            Alert.alert('Error al registrarse','No puede dejar campos vacios');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error al registrarse','Las contraseñas no coinciden');
            return;
        }

        console.log('valores de registro:');
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);

        const response = await fetch(`${API_URL}/user`,
            {
                headers: {
                    "Content-Type":"application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
            }
        );
        console.log("response status:", response.status);

        if (response.status === 409) {
            Alert.alert('Error al registrarse','Este email ya esta registrado');
            return;
        }

        if (response.status === 500) {
            Alert.alert('Error al registrarse','Error al crear el usuario');
            return;
        }

        if (response.status === 201) {
            const newUserId = await response.json();
            console.log(newUserId);
            Keyboard.dismiss();
            cleanFields();
            navi.replace('Home',{ id:newUserId });
        } else {
            console.log('no es 201');
        }
    }

    return (
        <View style={styles.Container}>
            <Text style={styles.title}>Registrarse</Text>
            <View style={styles.InputContainer}>
                <TextInput
                    placeholder="Nombre"
                    value={name}
                    onChangeText={setName}
                    style={styles.Input}
                    keyboardType="default"
                />
            </View>
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
            <View style={styles.InputContainer}>
                <TextInput
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.Input}
                    secureTextEntry
                />
            </View>
            <View style={styles.ButtonContainer}>
                <Pressable style={styles.Button} onPress={handleRegister}>
                    <Text style={styles.ButtonText}>Ingresar</Text>
                </Pressable>
                <Pressable style={styles.Button} onPress={()=>{navi.replace('Login');}}>
                    <Text style={styles.ButtonText}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
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
    ButtonContainer:{
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});