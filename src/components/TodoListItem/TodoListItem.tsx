import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function TodoListItem() {
  return (
    <View style={styles.container}>
      <Text>Componente de itens dos afazeres a colocar na tabela de itens</Text>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ff88ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});