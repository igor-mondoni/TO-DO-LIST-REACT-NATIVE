import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoListItem from '../TodoListItem/TodoListItem';

export default function TodoListTable() {
  return (
    <View style={styles.container}>
      <Text>Componente da tabela dos itens dos afazeres</Text>
      <TodoListItem />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8c00ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});