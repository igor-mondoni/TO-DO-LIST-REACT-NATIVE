import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ToastAndroid } from 'react-native';
import TodoListItem from './TodoListItem';
import { useTodos } from '../../contexts/TodoContext';

const mockRemoveTodo = jest.fn();
jest.mock('../../contexts/TodoContext', () => ({
  useTodos: () => ({
    removeTodo: mockRemoveTodo,
  }),
}));

jest.spyOn(ToastAndroid, 'showWithGravity').mockImplementation(() => {});

describe('TodoListItem', () => {
  const mockOpenModal = jest.fn();
  const mockItem = {
    id: '123',
    todotext: 'Minha Tarefa de Teste',
  };

  beforeEach(() => {
    mockRemoveTodo.mockClear();
    mockOpenModal.mockClear();
    (ToastAndroid.showWithGravity as jest.Mock).mockClear();
  });
  const renderComponent = () =>
    render(<TodoListItem item={mockItem} openModal={mockOpenModal} />);
  it('deve renderizar o texto da tarefa e o botão de remover', () => {
    const { getByText } = renderComponent();

    expect(getByText(mockItem.todotext)).toBeVisible();
    expect(getByText('-')).toBeVisible();
  });

  it('deve chamar openModal com o item correto ao pressionar o container', () => {
    const { getByText } = renderComponent();
    fireEvent.press(getByText(mockItem.todotext));
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
    expect(mockOpenModal).toHaveBeenCalledWith(mockItem);
    expect(mockRemoveTodo).not.toHaveBeenCalled();
  });

  it('deve chamar removeTodo e ToastAndroid ao pressionar o botão de remover', () => {
    const { getByText } = renderComponent();
    fireEvent.press(getByText('-'));
    expect(mockRemoveTodo).toHaveBeenCalledTimes(1);
    expect(mockRemoveTodo).toHaveBeenCalledWith(mockItem.id);
    expect(ToastAndroid.showWithGravity).toHaveBeenCalledTimes(1);
    expect(ToastAndroid.showWithGravity).toHaveBeenCalledWith(
      'Removido com sucesso!',
      2000,
      ToastAndroid.BOTTOM
    );
    expect(mockOpenModal).not.toHaveBeenCalled();
  });
});