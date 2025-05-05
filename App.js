import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView,StatusBar,ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Card from './components/Card';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InputCard from './components/InputCard';
import { API_URL } from './config';

export default function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(`${API_URL}/todos/1`);
    const data = await response.json();
    setTodos(data);
    console.log(data);
  }

  //funciones todo
  function clearTodo(id){
    setTodos( todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id){
    setTodos(
      todos.map((todo) =>
        todo.id === id
        ? {...todo, completed: todo.completed === 1 ? 0: 1}
        :todo 
      )
    );
  }

  function updateTodoTitle(id, newTitle){
    setTodos(
      todos.map((todo) => 
        todo.id === id
        ? {...todo, title: newTitle}
        : todo
      )
    );
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={todos}
              keyExtractor={(todo) => todo.id.toString()}
              renderItem={({item})=><Card {...item}  clearTodo={clearTodo} toggleTodo={toggleTodo} updateTodoTitle={updateTodoTitle} ></Card>}
              ListHeaderComponent={() => <Text style={styles.topText}>Today</Text>}
              contentContainerStyle = {styles.taskContainer}
              keyboardShouldPersistTaps='handled'
            />
            <InputCard todos={todos} setTodos={setTodos}/>
          </SafeAreaView>
          <StatusBar style="auto" />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection:'column',
    alignItems:"center",
    width: '100%',
    backgroundColor: '#00000010',
  },
  taskContainer: {
    flexDirection:'column',
  },
  topText:{
    margin:16,
    fontWeight:'bold',
    fontSize:32,
  }
});
