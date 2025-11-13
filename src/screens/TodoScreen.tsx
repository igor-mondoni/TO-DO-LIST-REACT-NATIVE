import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoListTable from '../components/TodoListTable/TodoListTable';
import TodoFormInput from '../components/TodoFormInput/TodoFormInput';
import TodoModalInputUpdate from '../components/TodoModalInputUpdate/TodoModalInputUpdate';
import { useState } from 'react';
import Constants from 'expo-constants';

export default function TodoScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState({});
  
  const openModal = (item) => {
    setIsModalVisible(true);
    setSelectedItemData(item);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItemData({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-do List</Text>
      <TodoModalInputUpdate visible={isModalVisible} item={selectedItemData} onClose={closeModal}/>
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
    paddingTop: Constants.statusBarHeight + 20,
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  }
});