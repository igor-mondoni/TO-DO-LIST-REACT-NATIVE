import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoListTable from '../components/TodoListTable/TodoListTable';
import TodoFormInput from '../components/TodoFormInput/TodoFormInput';
import TodoModalInputUpdate from '../components/TodoModalInputUpdate/TodoModalInputUpdate';
import { useState } from 'react';

export default function TodoScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState({});
  
  const openModal = (item) => {
    console.log("teste")
    console.log(item)
    setIsModalVisible(true);
    setSelectedItemData(item);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItemData({});
  };

  return (
    <View style={styles.container}>
      <TodoModalInputUpdate visible={isModalVisible} item={selectedItemData} onClose={() => closeModal}/>
      <TodoFormInput />
      <TodoListTable openModal={openModal}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});