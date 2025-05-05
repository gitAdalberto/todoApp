import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function ShareMark({ shared_with_id, handlePresentModal, handlePresentShared }) {
  return (
    <View style={styles.unCheckButton}>
      {
        shared_with_id != null ? ( // Usar != para que también capture undefined
          <Feather
            onPress={() => {
              handlePresentShared();
            }}
            name="users"
            size={20}
            color="gray"
          />
        ) : (
          <FontAwesome5
            onPress={() => {
              handlePresentModal();
            }}
            name="share-square"
            size={20}
            color="gray"
          />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  unCheckButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    margin: 10,
    alignItems: 'center',
  },
});
