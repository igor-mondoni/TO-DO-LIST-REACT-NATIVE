jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Alert = {
    ...RN.Alert,
    alert: jest.fn(),
  };
  RN.ToastAndroid = {
    ...RN.ToastAndroid,
    showWithGravity: jest.fn(),
    BOTTOM: 'BOTTOM',
  };
  RN.Modal = ({ visible, children }) => {
    if (!visible) {
      return null;
    }
    return <>{children}</>;
  };

  return RN;
});

jest.mock('../../contexts/TodoContext', () => ({
  useTodos: jest.fn(),
}));

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import TodoModalInputUpdate from './TodoModalInputUpdate';
import { useTodos } from '../../contexts/TodoContext';

const mockedUseTodos = useTodos as jest.Mock;
const mockUpdateTodo = jest.fn();
const mockOnClose = jest.fn();

const mockAlert = jest.requireMock('react-native').Alert.alert;
const mockToast = jest.requireMock('react-native').ToastAndroid.showWithGravity;

const mockTodo = {
  id: '123',
  todotext: 'Texto inicial da tarefa',
};

const renderComponent = (props = {}) => {
  const defaultProps = {
    visible: true,
    item: mockTodo,
    onClose: mockOnClose,
  };

  return render(<TodoModalInputUpdate {...defaultProps} {...props} />);
};

describe('TodoModalInputUpdate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseTodos.mockReturnValue({
      updateTodo: mockUpdateTodo,
    });
  });

  it('não deve renderizar nada se visible for false', () => {
    renderComponent({ visible: false });

    expect(screen.queryByText('Editar Tarefa')).toBeNull();
    expect(screen.queryByPlaceholderText('Descreva o que deve ser feito')).toBeNull();
  });

  it('deve renderizar o modal corretamente quando visible for true', () => {
    renderComponent();

    expect(screen.getByText('Editar Tarefa')).toBeTruthy();

    expect(screen.getByText('Tarefa')).toBeTruthy();

    const input = screen.getByPlaceholderText('Descreva o que deve ser feito');
    expect(input).toBeTruthy();
    expect(input.props.value).toBe(mockTodo.todotext);

    expect(screen.getByText('Fechar')).toBeTruthy();
    expect(screen.getByText('Salvar')).toBeTruthy();
  });

  it('deve chamar onClose ao pressionar o botão "Fechar"', () => {
    renderComponent();
    fireEvent.press(screen.getByText('Fechar'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve mostrar um alerta se o input estiver vazio ao salvar', () => {
    renderComponent();

    const input = screen.getByPlaceholderText('Descreva o que deve ser feito');
    fireEvent.changeText(input, '   ');
    fireEvent.press(screen.getByText('Salvar'));
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith("Erro", "Por favor, preencha os campos.");
    expect(mockUpdateTodo).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('deve chamar updateTodo, mostrar toast e fechar ao salvar com sucesso', () => {
    renderComponent();

    const novoTexto = 'Tarefa atualizada';
    const input = screen.getByPlaceholderText('Descreva o que deve ser feito');

    fireEvent.changeText(input, novoTexto);
    fireEvent.press(screen.getByText('Salvar'));
    expect(mockUpdateTodo).toHaveBeenCalledTimes(1);
    expect(mockUpdateTodo).toHaveBeenCalledWith(mockTodo.id, novoTexto);
    expect(mockToast).toHaveBeenCalledTimes(1);
    expect(mockToast).toHaveBeenCalledWith(
      'Atualizado com sucesso!',
      2000,
      'BOTTOM'
    );
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockAlert).not.toHaveBeenCalled();
  });

  it('deve atualizar o valor do input quando o item prop mudar', () => {
    const { rerender } = renderComponent();
    expect(screen.getByPlaceholderText('Descreva o que deve ser feito').props.value).toBe('Texto inicial da tarefa');
    const newItem = { id: '456', todotext: 'Outra tarefa' };
    rerender(
      <TodoModalInputUpdate
        visible={true}
        item={newItem}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByPlaceholderText('Descreva o que deve ser feito').props.value).toBe('Outra tarefa');
  });

  it('deve limpar o input se o item for nulo', () => {
    const { rerender } = renderComponent();
    expect(screen.getByPlaceholderText('Descreva o que deve ser feito').props.value).toBe('Texto inicial da tarefa');
    rerender(
      <TodoModalInputUpdate
        visible={true}
        item={null}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByPlaceholderText('Descreva o que deve ser feito').props.value).toBe('');
  });
});