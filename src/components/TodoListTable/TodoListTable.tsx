import { StyleSheet, Text, View, FlatList } from 'react-native';
import TodoListItem from '../TodoListItem/TodoListItem';
import { useTodos } from '../../contexts/TodoContext';
import React from 'react';

export default function TodoListTable({ openModal }) {
  const { state } = useTodos();
  
  return (
    <View style={styles.container}>
      <FlatList
        data={state.todos} 
        keyExtractor={(item, k) => k.toString()}
        renderItem={({ item }) => (
          <TodoListItem item={item} openModal={openModal} />
        )}
        ListHeaderComponent={() => (
          <Text style={styles.header}>Meus Afazeres</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
    marginBottom: 10, 
  },
});