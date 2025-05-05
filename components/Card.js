import * as React from 'react';
import { useState, useRef } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CheckMark from './CheckMark';
import ShareMark from './ShareMark';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import ShareTodoModalContent from './ShareTodoModalContent';
import TodoModalContent from './TodoModalContent';
import EditModalContent from './EditModalContent';
import { API_URL } from '@config';


export default function Card({
  id,
  title,
  user_id,
  shared_with_id,
  completed,
  clearTodo,
  toggleTodo,
  updateTodoTitle,
  fetchData,
}) {
  
  const bottomSheetModalRef = useRef(null);
  const sharedBottomSheetRef = useRef(null);
  const editBottomSheetRef = useRef(null);
  const [isEditActive, setIsEditActive] = useState(false);

  const snapPoints = ["25%", "48%", "75%"];
  const snapPointsShared = ["40%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  function handleCloseModal() {
    bottomSheetModalRef.current?.close();
  }

  function handlePresentShared() {
    sharedBottomSheetRef.current?.present();
  }

  function handleCloseShared(){
    sharedBottomSheetRef.current?.close();
  }

  function handlePresentEdit() {
    editBottomSheetRef.current?.present();
  }

  function handleCloseEdit() {
    editBottomSheetRef.current?.close();
  }

  const deleteTodo = async () => {
    console.log("eliminando tarea");
    Alert.alert(
        'Eliminar Tarea',
        '¿Está seguro de eliminar la tarea?',
        [
            { text: 'OK', onPress: async() => {
              console.log("deleteTodo begin");
              const response = await fetch(`${API_URL}/todos/${id}`, {
                method: "DELETE",
              });
              clearTodo(id);
              console.log(response.status);
              console.log("deleteTodo end");
            }},
            { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' }
        ]
    );
    
  }


  return (
    <TouchableOpacity 
      style={styles.card}
      onLongPress={() => { setIsEditActive(true);}}
      onPress={() => {setIsEditActive(false);}}
      activeOpacity={0.8}
    >

      <CheckMark completed={completed} id={id} toggleTodo={toggleTodo} />
      <Text style={styles.text}>{title}</Text>

      {
        !isEditActive && (
          <ShareMark 
          shared_with_id={shared_with_id}
          handlePresentShared={handlePresentShared}
          handlePresentModal={handlePresentModal}
        />
        )
      }

      {isEditActive && (
        <View style={{ flex:1, flexDirection: "row", justifyContent:"flex-end" }}>
          <Pressable style={styles.button} onPress={() => {
            handlePresentEdit();
          }}>
            <FontAwesome name="pencil" size={20} color="green"/>
          </Pressable>
          <Pressable onPress={deleteTodo} style={[styles.button, { marginRight:10 }]}>
            <FontAwesome name="trash" size={20} color="red" />
          </Pressable>
        </View>
      )}
      
      {/* modal share */}
      <BottomSheetModal
        index={1}
        ref={sharedBottomSheetRef}
        snapPoints={snapPointsShared}
        backgroundStyle={styles.backgroundStyle}
        style={{ flex: 1 }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close" 
          />
        )}
      >
        <ShareTodoModalContent
          id={id}
          title={title}
          shared_with_id={shared_with_id}
          completed={completed}
        />
      </BottomSheetModal>

      {/*modal no share */}
      <BottomSheetModal
        index={1}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backgroundStyle={styles.backgroundStyle}
        style={{ flex: 1 }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close" 
          />
        )}
      >
        <TodoModalContent id={id} title={title}/>
      </BottomSheetModal>

        {/*modal edit */}
      <BottomSheetModal
        index={1}
        ref={editBottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={styles.backgroundStyle}
        style={{ flex: 1 }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close" 
          />
        )}
      >
        <EditModalContent id={id} title={title} updateTodoTitle={updateTodoTitle} 
        handleCloseEdit={handleCloseEdit}/>
      </BottomSheetModal>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 4,
    margin: 14,
    borderRadius: 32,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    width: '90%',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 12,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  backgroundStyle:{
    backgroundColor: '#fff',
    borderRadius: 24,
  },
});
