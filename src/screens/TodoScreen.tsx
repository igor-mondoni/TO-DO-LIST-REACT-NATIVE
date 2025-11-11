import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoListTable from '../components/TodoListTable/TodoListTable';
import TodoFormInput from '../components/TodoFormInput/TodoFormInput';

export default function TodoScreen() {
  return (
    <View style={styles.container}>
      <Text>Tela principal do aplicativo TODOLIST</Text>
      <TodoFormInput />
      <TodoListTable />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});