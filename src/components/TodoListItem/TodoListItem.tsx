import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useTodos } from '../../contexts/TodoContext';
import { useEffect } from 'react';

export default function TodoListItem() {
    const { state, addTodo, removeTodo } = useTodos()
    useEffect(() => {
        console.log(state);
        addTodo('Adicionando todo',1);
        console.log(state);

    }, []);
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