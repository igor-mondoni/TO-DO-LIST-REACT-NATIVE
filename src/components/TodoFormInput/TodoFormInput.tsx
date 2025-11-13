import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useTodos } from '../../contexts/TodoContext';

type Todo = {
    todotext: string
}
export default function TodoFormInput() {
    const [textInputValueTodo, setTextInputValueTodo] = useState<Todo['todotext']>('');
    const { state, addTodo } = useTodos()

    const handleAddTodo = () => {
        addTodo(textInputValueTodo);
        setTextInputValueTodo('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>

                <Text style={styles.label}>{'O que fazer?'}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTextInputValueTodo}
                    value={textInputValueTodo}
                    placeholder="Descreva o que deve ser feito"
                    placeholderTextColor="#999"
                />

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={handleAddTodo}
                        title={"Adicionar"}
                        color="#841584"
                        accessibilityLabel="Adicionar nova tarefa"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    formContainer: {
        width: '100%',
        padding: 24,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },

    input: {
        backgroundColor: '#FCFCFC',
        height: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
    },

    buttonContainer: {
        marginTop: 10,
        borderRadius: 8,
        overflow: 'hidden',
    }
});