import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Alert, Pressable, ToastAndroid } from 'react-native';
import { useTodos } from '../../contexts/TodoContext';

type Todo = {
  id: string;
  todotext: string;
};

type TodoModalProps = {
  visible: boolean;
  item: Todo;
  onClose: () => void;
};

export default function TodoModalInputUpdate({ visible, item, onClose }: TodoModalProps) {
  const { updateTodo } = useTodos();
  const [textInputValueTodo, setTextInputValueTodo] = useState('');
  const [todoId, setTodoId] = useState('');

  useEffect(() => {
    if (item && item.id) {
      setTextInputValueTodo(item.todotext);
      setTodoId(item.id);
    } else {
      setTextInputValueTodo('');
      setTodoId('');
    }
  }, [item]);


  const handleUpdateTodo = () => {
    if (!textInputValueTodo.trim()) {
      Alert.alert("Erro", "Por favor, preencha os campos.");
      return;
    }

    updateTodo(todoId, textInputValueTodo);
    onClose();
    ToastAndroid.showWithGravity(
      'Atualizado com sucesso!',
      2000,
      ToastAndroid.BOTTOM
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Editar Tarefa</Text>

          <Text style={styles.label}>Tarefa</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTextInputValueTodo}
            value={textInputValueTodo}
            placeholder="Descreva o que deve ser feito"
            placeholderTextColor="#999"
          />

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={handleUpdateTodo}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>
          </View>
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
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    width: '100%',
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
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonSave: {
    backgroundColor: '#019b53ff',
  },
  buttonClose: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});