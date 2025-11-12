import React, { useEffect } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

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
  if (!item) {
    return null;
  }
  useEffect(() => {
    console.log(visible)
  },[visible,item])
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
            <Text style={{ fontWeight: 'bold' }}>Tarefa:</Text> {item.todotext}
          </Text>
          <Text style={styles.modalText}>
            <Text style={{ fontWeight: 'bold' }}>Prioridade:</Text> {item.priority}
          </Text>
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