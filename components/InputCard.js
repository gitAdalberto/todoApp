import { 
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Platform,
    View,
    Pressable
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import { API_URL } from '@config';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InputCard({todos, setTodos}) {
    const [focus, setFocus] = useState(false);
    const [task, setTask] = useState("");
    const navi = useNavigation();

    const handleSubmit = async () => {
        console.log("hola mundo");
        if (task === "") {
            console.log("task null");
            return;
        } else {
            console.log(`task ${task}`);
            const response = await fetch(`${API_URL}/todos`,
            {
                headers: {
                    "Content-Type":"application/json", 
                },
                method: "POST",
                body: JSON.stringify({
                    user_id: 1,
                    title: task,
                }),
            });
            console.log("response status: ", response.status);
            const newTodo = await response.json();
            console.log(newTodo);
            setTodos([...todos,{...newTodo, shared_with_id: null}]);
            Keyboard.dismiss();
            setTask("");
        }
    }

    const handleLogOut = async () => {
        console.log('hola mundo');
        await AsyncStorage.removeItem('remember');
        await AsyncStorage.removeItem('user_id');
        navi.replace('Login');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                
                <View style={styles.inputContainer}>
                    <Pressable onPress={handleLogOut}>
                        <FontAwesome name="sign-out" size={45} color={"gray"}/>
                    </Pressable>
                    <TextInput
                        placeholder="Nueva Tarea"
                        style={[styles.textInput, focus && { borderWidth: 2, borderColor: "black"}]}
                        scrollEnabled={true}
                        onChangeText={setTask}
                        value={task}
                        onFocus={()=>setFocus(true)}
                        onBlur={()=>setFocus(false)}
                    />
                    <Pressable onPress={handleSubmit}>
                        <FontAwesome name="plus-circle" size={45} color={task?"#09f":"gray"} />
                    </Pressable>
                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    
    inputContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 4,
    },
    textInput:{
        backgroundColor:"#fff",        
        width: "70%",
        fontSize: 16,
        borderRadius: 32,
        padding: 15,
        borderWidth: 2,
        borderColor: "lightgray"
    },
    plusButton:{
        backgroundColor: '#09f',
        width: 48,         
        height: 48,       
        borderRadius: 24, 
        margin: 10,
        alignItems: 'center',
        justifyContent: "center",
    }
})