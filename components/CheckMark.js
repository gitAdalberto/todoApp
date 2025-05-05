import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { API_URL } from "@config";


export default function CheckMark({id, completed, toggleTodo}){

    async function toggle(){
        console.log("Toggle begin")
        const response = await fetch(`${API_URL}/todos/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: completed ? false : true,
            })
        }); 
        const data = await response.json();
        toggleTodo(id);
        console.log("Toggle todo");
        console.log(response.status);
        console.log(data);
        console.log("Toggle end");
    }

    return(
        <View>
        {
            completed === 0 ? (
                <Pressable style={styles.unCheckButton} onPress={toggle}>
                <FontAwesome name='check' size={20} color="transparent"></FontAwesome>
                </Pressable>
            ):(
                <Pressable style={styles.checkButton} onPress={toggle}>
                <FontAwesome name='check' size={20} color="#fff"></FontAwesome>
                </Pressable>
            )
        }
    </View>
    )
}

const styles = StyleSheet.create( {
    unCheckButton: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 32,
        borderWidth:2,
        borderColor: "gray",
        margin: 10,
        alignItems: 'center',
      },
      checkButton: {
        backgroundColor: '#09f',
        padding: 12,
        borderRadius: 32,
        margin: 10,
        alignItems: 'center',
      },
})