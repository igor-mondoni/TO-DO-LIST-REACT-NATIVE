import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoScreen from './src/screens/TodoScreen';
import { TodosProvider } from './src/contexts/TodoContext';
import 'react-native-get-random-values';
export default function App() {
  return (
    <TodosProvider>
      <TodoScreen />
    </TodosProvider>
  );
}


