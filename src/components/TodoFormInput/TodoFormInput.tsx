import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTodos } from '../../contexts/TodoContext';

export default function TodoFormInput() {
    /**
     * Exemplo de uso do provider criado para tratar os states referente aos itens do todo
     */
    const { state, addTodo, removeTodo } = useTodos()
    useEffect(() => {
        addTodo('Hello world', 1);
    }, []);
    return (
        <View style={styles.container}>
            <Text>Componente de formulário do aplicativo TODOLIST</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff0000ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});