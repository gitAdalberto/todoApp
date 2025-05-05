import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InputCard from './InputCard';
import { API_URL } from '../config';

export default function Home({ route }) {

  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(-1);


  useEffect(() => {
    setUserId(route.params?.id);
    fetchData(route.params?.id);
    
    console.log('datos del usuario: ', route.params?.id);
  }, []);

  async function fetchData(id) {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`);
      const data = await response.json();
      if (data) {
        setTodos(data);
        console.log('Todos del usuario:', data);
      } else {
        console.log('No se encontraron todos para este usuario.');
      }
    } catch (error) {
      console.error('Error al obtener los todos:', error);
    }
  }

  // Funciones para manejar los todos
  function clearTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }

  function updateTodoTitle(id, newTitle) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          {todos.length === 0 ? (
            <>
              <Text style={styles.noTaskTitle}>To do</Text>
              <View style={styles.noTaskContainer}>
                <Text>No hay tareas disponibles</Text>
              </View>
            </>
          ) : (
            <FlatList
              data={todos}
              keyExtractor={(todo) => todo.id.toString()}
              renderItem={({ item }) => (
                <Card
                  {...item}
                  clearTodo={clearTodo}
                  toggleTodo={toggleTodo}
                  updateTodoTitle={updateTodoTitle}
                />
              )}
              ListHeaderComponent={() => <Text style={styles.topText}>Today</Text>}
              contentContainerStyle={styles.taskContainer}
              keyboardShouldPersistTaps="handled"
            />
          )}
          <InputCard todos={todos} setTodos={setTodos} user_id={userId}/>
        </SafeAreaView>
        <StatusBar style="auto" />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#00000010',
  },
  taskContainer: {
    flexDirection: 'column',
  },
  topText: {
    margin: 16,
    fontWeight: 'bold',
    fontSize: 32,
  },
  noTaskContainer:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  noTaskTitle:{
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    margin:12,
    fontWeight: 'bold',
    fontSize: 32,
  }
});
