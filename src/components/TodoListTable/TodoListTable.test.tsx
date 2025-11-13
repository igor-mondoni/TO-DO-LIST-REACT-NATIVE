import React from 'react';
import { render } from '@testing-library/react-native';
import TodoListTable from './TodoListTable';
import { useTodos } from '../../contexts/TodoContext';
import TodoListItem from '../TodoListItem/TodoListItem';

jest.mock('../../contexts/TodoContext', () => ({
  useTodos: jest.fn(),
}));
jest.mock('../TodoListItem/TodoListItem');
const mockedUseTodos = useTodos as jest.Mock;
const MockedTodoListItem = TodoListItem as jest.Mock;
describe('TodoListTable', () => {
  beforeEach(() => {
    mockedUseTodos.mockClear();
    MockedTodoListItem.mockClear();
  });
  it('deve renderizar o cabeçalho e nenhuma tarefa se a lista estiver vazia', () => {
    mockedUseTodos.mockReturnValue({
      state: { todos: [] },
    });
    const mockOpenModal = jest.fn();
    const { getByText } = render(<TodoListTable openModal={mockOpenModal} />);
    expect(getByText('Meus Afazeres')).toBeVisible();
    expect(MockedTodoListItem).not.toHaveBeenCalled();
  });
  it('deve renderizar o cabeçalho e os itens da lista, passando as props corretas', () => {
    const mockTodos = [
      { id: 'd7c9e20f-354c-4ecc-af45-95815582a5ec', todotext: 'Tarefa 1' },
      { id: '2073c39e-fb1d-4f6c-bbc4-c099b7f9942d', todotext: 'Tarefa 2' },
    ];
    mockedUseTodos.mockReturnValue({
      state: { todos: mockTodos },
    });
    const mockOpenModal = jest.fn();
    const { getByText } = render(<TodoListTable openModal={mockOpenModal} />);
    expect(getByText('Meus Afazeres')).toBeVisible();
    expect(MockedTodoListItem).toHaveBeenCalledTimes(2);
    expect(MockedTodoListItem).toHaveBeenNthCalledWith(
      1,
      {
        item: mockTodos[0],
        openModal: mockOpenModal,
      },
      {}
    );
    expect(MockedTodoListItem).toHaveBeenNthCalledWith(
      2,
      {
        item: mockTodos[1],
        openModal: mockOpenModal,
      },
      {}
    );
  });
});