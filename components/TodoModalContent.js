import { useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Keyboard, KeyboardAvoidingView, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { API_URL } from '@config';

export default function TodoModalContent({id, title, handleCloseModal}) {
    const [email, setEmail] = useState("");
    const [focus, setFocus] = useState(false);

    const handleSubmit = async () => {
        const response = await fetch(`${API_URL}/todos/shared_todos`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                todo_id: id,
                user_id: 1,
                email: email,
            }),
        });
        const data = await response.json();
        console.log(data);
        Keyboard.dismiss();
        setEmail("");
        setFocus(false);
        
        Alert.alert(
            "Congratulations *confeti*",
            `You succesfuly shared ${title} with ${email}`
            [{ text: "Okay"}]
        );
        handleCloseModal?.();
    };
    return (
        <BottomSheetView style={styles.contentContainer}>
            <Text style={[styles.title, { marginBottom: 20}]}>Comparte tu tarea</Text>
            <Text style={[styles.text, { marginBottom: 20}]}>"{title}"</Text>
            <Text style={[styles.text]}>
                Ingresa el email del usuario con que quieras compartir tu tarea. Comparte una tarea con alguien y sincroniza tus metas cada día.
            </Text>
            <TextInput
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
                onFocus={()=>setFocus(true)}
                onBlur={()=>setFocus(false)}
                keyboardType="email-address"
                placeholder="Introduce un email"
                style={[
                    styles.input,
                    focus && { borderWidth: 3, borderColor: "#000"},
                ]}
            />
            <Button
                title="Share"
                onPress={handleSubmit}
                disabled={email.length === 0}
            />
        </BottomSheetView>
    )
}
const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 15,
      backgroundColor: "#fff",
    },
    title: {
      fontWeight: "bold",
      letterSpacing: 0.5,
      fontSize: 20,
      textAlign: "center",
    },
    text: {
      fontWeight: "normal",
      letterSpacing: 0.5,
      fontSize: 20,
      color: "gray",
      textAlign: "center",
    },
    input: {
      borderWidth: 2,
      borderColor: "#00000020",
      padding: 15,
      borderRadius: 15,
      marginVertical: 15,
      width: "90%",
    },
  });