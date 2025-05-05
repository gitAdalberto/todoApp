import { useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Keyboard, KeyboardAvoidingView, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { API_URL } from '@config';


export default function EditModalContent({id, title, updateTodoTitle, handleCloseEdit}) {
    const [newTitle,setNewTitle] = useState(title);
    const [focus, setFocus] = useState(false);

    //request
    async function handleUpdateTitle() {
        console.log("updateTitle begin");
        if (newTitle=== "") {
            console.log("newTitle null");
            return;
        } else {
            console.log("no null")
            const response = await fetch(`${API_URL}/todos/${id}/title`,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        title: newTitle,
                    })
                }
            );
            console.log(response.status);
            
            const data = await response.json();
            console.log(data);
            updateTodoTitle(id, newTitle);
            setFocus(false);
            setNewTitle("");
            Keyboard.dismiss();
            handleCloseEdit?.();
        }
        
        console.log("updateTitle end");
    }

    return (
        <BottomSheetView style={styles.contentContainer}>
            <Text>{id}</Text>
            <Text style={[styles.title, { marginBottom: 20}]}>Edita tu tarea</Text>
            <Text style={[styles.text, { marginBottom: 20}]}>"{title}"</Text>
            <TextInput
                value={newTitle}
                onChangeText={(text) => setNewTitle(text)}
                onFocus={()=>setFocus(true)}
                onBlur={()=>setFocus(false)}
                keyboardType="default"
                placeholder="Introduce un nuevo titulo"
                style={[
                    styles.input,
                    focus && { borderWidth: 3, borderColor: "#000"},
                ]}
            />
            <Button
                title="Edit"
                disabled={newTitle == title}
                onPress={handleUpdateTitle}
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