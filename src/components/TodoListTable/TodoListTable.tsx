import { StatusBar } from 'expo-status-bar';
import { SectionList, StyleSheet, Text, View,FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TodoListItem from '../TodoListItem/TodoListItem';
import { useTodos } from '../../contexts/TodoContext';
import React from 'react';

export default function TodoListTable(  { openModal }) {
  const { state } = useTodos()
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <FlatList
          data={state.todos} 
          keyExtractor={(item,k) => k.toString()}
          renderItem={({ item }) => (
            <TodoListItem item={item} openModal={openModal} />
          )}
          ListHeaderComponent={() => (
            <Text style={styles.header}>Meus Afazeres</Text>
          )}
          ItemSeparatorComponent={() => <View />}
          ListFooterComponent={() => <View />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});