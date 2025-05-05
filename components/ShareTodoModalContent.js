import { StyleSheet, View, Text} from "react-native";
import { useState, useEffect } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { API_URL } from '@config';

export default function ShareTodoModalContent({
    id,
    title,
    shared_with_id,
    completed,
}) {
    const [author, setAuthor] = useState([]);
    const [sharedWith, setSharedWith] = useState([]);

    useEffect(() => {
        fetchInfo();
    },[]);

    async function fetchInfo() {
        console.log("fetch info");
        const response = await fetch(
            `${API_URL}/todos/shared_todos/${id}`, 
          {
            method: "GET",
          }
        );
        const data = await response.json();
        console.log(data);
        setAuthor(data.author);
        setSharedWith(data.shared_with);
    }

    return (
        <BottomSheetView style = {styles.contentContainer}>
            <Text style={[styles.title, { marginBottom: 20}]}>Shared Task</Text>
            <Text style={[styles.title, { marginBottom: 20}]}>{title}</Text>
            <Text style={[styles.title]}>Status</Text>
            <View
                style = {[
                    styles.status,
                    { backgroundColor: completed === 1 ? "#4ade80":"#f87171"}
                ]}
            >
                <Text style={[styles.title, { color: "#fff" }]}>
                    {completed ===1 ? "Completed" : "Incompleted"}
                </Text>
            </View>
            <Text style={[styles.description]}>PARTICIPANTS</Text>
            <View style = {{ flexDirection: "row" }}>
                <View style={styles.participant}>
                    <Text style={[styles.description, {color: "#fff"}]}>
                        {author?.name}
                    </Text>
                </View>
                <View style={styles.participant}>
                    <Text style={[styles.description, {color: "#fff"}]}>
                        {sharedWith?.name}
                    </Text>
                </View>
            </View>
        </BottomSheetView>
    );
}
const styles = StyleSheet.create({
    contentContainer:{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "#fff",
    },
    title: {
        fontWeight: "900",
        letterSpacing: 0.5,
        fontSize: 20,
        textAlign: "center",
    },
    participant:{
      backgroundColor: "#8b5cf6",
      padding: 5,
      paddingHorizontal: 10,
      margin: 5,
      borderRadius: 20,
      fontWeight: "900",
        color: "#fff",    
    },
    input:{
        borderWidth: 2,
        bordercolor: "#00000020",
        padding: 15,
        borderRadius : 15,
        marginVertical: 15,
    },
    status: {
        padding: 5,
        paddingHorizontal: 10,
        marginTop: 5,
        marginBottom: 20,
        borderRadius: 20,
        fontWeight: "900",
        color: "#fff",
    }
})