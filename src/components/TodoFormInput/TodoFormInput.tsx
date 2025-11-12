import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useTodos } from '../../contexts/TodoContext';
type Todo = {
    todotext: string
    priority: number
}
export default function TodoFormInput() {
    const [textInputValueTodo, setTextInputValueTodo] = useState<Todo['todotext']>('');
    const [textInputValueTodoPriority, setTextInputValueTodoPriority] = useState<string>('');
    const { state,addTodo } = useTodos()
    useEffect(() => {
        console.log(textInputValueTodo);
        console.log(textInputValueTodoPriority);
    }, [textInputValueTodo,textInputValueTodoPriority]);

    const handleAddTodo = () => {
        if (!textInputValueTodo.trim() || !textInputValueTodoPriority) {
            Alert.alert("Erro", "Por favor, preencha os dois campos.");
            return;
        }

        const priorityNumber = parseInt(textInputValueTodoPriority, 10);

        if (isNaN(priorityNumber)) {
            Alert.alert("Erro", "A prioridade deve ser um número.");
            return;
        }

        addTodo(textInputValueTodo,priorityNumber);
        console.log(state.todos)
        setTextInputValueTodo('');
        setTextInputValueTodoPriority('');
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>{'O que fazer?'}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTextInputValueTodo}
                    value={textInputValueTodo} />

                <Text>{'Prioridade'}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTextInputValueTodoPriority}
                    value={textInputValueTodoPriority}
                    inputMode="numeric" />
                <Button
                    onPress={handleAddTodo}
                    title={"Adicionar"}
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
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
    input: {
        backgroundColor: '#ff0000ff',
    }
});