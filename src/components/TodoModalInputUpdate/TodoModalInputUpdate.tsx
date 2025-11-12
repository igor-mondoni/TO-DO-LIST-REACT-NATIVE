import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { useTodos } from '../../contexts/TodoContext';

type Todo = {
  id: string;
  todotext: string;
  priority: number;
};

type TodoModalProps = {
  visible: boolean;
  item: Todo;
  onClose: () => void;
};

export default function TodoModalInputUpdate({ visible, item, onClose }: TodoModalProps) {
  const { updateTodo } = useTodos()
  const [textInputValueTodo, setTextInputValueTodo] = useState('');
  const [textInputValueTodoPriority, setTextInputValueTodoPriority] = useState('');
  const [todoId, setTodoId] = useState('');

  useEffect(() => {
    if (!item || Object.keys(item).length !== 0) {
      setTextInputValueTodo(item.todotext);
      setTextInputValueTodoPriority(item.priority.toString());
      setTodoId(item.id);
    } else {
      setTextInputValueTodo('');
      setTextInputValueTodoPriority('');
      setTodoId('');
    }
  }, [item]);

  if (!item || Object.keys(item).length === 0) {
    return null;
  }

  const handleUpdateTodo = () => {
    if (!textInputValueTodo.trim() || !textInputValueTodoPriority) {
      Alert.alert("Erro", "Por favor, preencha os dois campos.");
      return;
    }

    const priorityNumber = parseInt(textInputValueTodoPriority, 10);

    if (isNaN(priorityNumber)) {
      Alert.alert("Erro", "A prioridade deve ser um número.");
      return;
    }

    updateTodo(todoId, textInputValueTodo, priorityNumber);
    setTextInputValueTodo('');
    setTextInputValueTodoPriority('');
  }
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Detalhes da Tarefa</Text>
          <Text style={styles.modalText}>
            <Text style={{ fontWeight: 'bold' }}>Tarefa:</Text>
            <TextInput
              onChangeText={setTextInputValueTodo}
              value={textInputValueTodo}
            />
          </Text>
          <Text style={styles.modalText}>
            <Text style={{ fontWeight: 'bold' }}>Prioridade:</Text>
            <TextInput
              onChangeText={setTextInputValueTodoPriority}
              value={textInputValueTodoPriority}
              inputMode="numeric"
              placeholder="0"
              placeholderTextColor="#999"
            />
          </Text>
          <Button title="Salvar" onPress={handleUpdateTodo} color="#019b53ff" />
          <Button title="Fechar" onPress={onClose} color="#841584" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});