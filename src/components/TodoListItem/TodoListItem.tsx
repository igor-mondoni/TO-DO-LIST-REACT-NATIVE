import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useTodos } from '../../contexts/TodoContext';
import { useEffect } from 'react';

export default function TodoListItem({ item }) {
    const { state, addTodo, removeTodo } = useTodos()
    useEffect(() => {
        console.log(state)
    }, []);
    return (
        <View>
            <Text>{item.todotext} - {item.priority}</Text>
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