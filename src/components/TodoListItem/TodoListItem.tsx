import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useTodos } from '../../contexts/TodoContext';
import { useEffect } from 'react';

type Todo = {
  id: string; 
  todotext: string;
  priority: number;
};

type TodoListItemProps = {
  item: Todo;
};

export default function TodoListItem({ item }: TodoListItemProps) {
    const { removeTodo } = useTodos()
    const handleRemove = () => {
        removeTodo(item.id);
    };
    return (
        <View>
            <Text>{item.todotext} - {item.priority}</Text>
            <Button
                title="Remover"
                onPress={handleRemove}
                color="#ff3b30"
            />
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