import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ToastAndroid } from 'react-native';
import TodoFormInput from './TodoFormInput'; // Ajuste o caminho se necessário
import { useTodos } from '../../contexts/TodoContext'; // Ajuste o caminho

// 1. Mockar o Contexto (useTodos)
// Criamos uma função mock para "espionar" o addTodo
const mockAddTodo = jest.fn();

// Mockamos o retorno do hook useTodos
jest.mock('../../contexts/TodoContext', () => ({
  useTodos: () => ({
    // Fornecemos nossa função mock
    addTodo: mockAddTodo,
    // Fornecemos um 'state' mockado, embora este componente não o utilize
    state: { todos: [] },
  }),
}));

// 2. Mockar Módulos Nativos (ToastAndroid)
// Usamos jest.spyOn para "espionar" as chamadas
jest.spyOn(ToastAndroid, 'showWithGravity').mockImplementation(() => {});

// Início da suíte de testes
describe('TodoFormInput', () => {
  // 3. 'beforeEach' para limpar os mocks antes de cada teste
  beforeEach(() => {
    mockAddTodo.mockClear();
    (ToastAndroid.showWithGravity as jest.Mock).mockClear();
  });

  // Teste 1: Renderização inicial
  it('deve renderizar o label, o input (placeholder) e o botão', () => {
    const { getByText, getByPlaceholderText } = render(<TodoFormInput />);

    // Verifica se os elementos de texto estão visíveis
    expect(getByText('O que fazer?')).toBeVisible();
    expect(getByText('Adicionar')).toBeVisible();

    // Verifica se o input está visível pelo placeholder
    expect(getByPlaceholderText('Descreva o que deve ser feito')).toBeVisible();
  });

  // Teste 2: Digitação no input
  it('deve atualizar o valor do input ao digitar', () => {
    const { getByPlaceholderText } = render(<TodoFormInput />);
    const input = getByPlaceholderText('Descreva o que deve ser feito');

    const novaTarefa = 'Testar o input';
    fireEvent.changeText(input, novaTarefa);

    // Verifica se o 'value' do input foi atualizado
    expect(input.props.value).toBe(novaTarefa);
  });

  // Teste 3: Submissão (caminho feliz)
  it('deve chamar addTodo, mostrar Toast e limpar o input ao pressionar "Adicionar"', () => {
    const { getByText, getByPlaceholderText } = render(<TodoFormInput />);

    const input = getByPlaceholderText('Descreva o que deve ser feito');
    const button = getByText('Adicionar');
    const novaTarefa = 'Comprar leite';

    // 1. Digita no input
    fireEvent.changeText(input, novaTarefa);
    expect(input.props.value).toBe(novaTarefa); // Garante que digitou

    // 2. Clica no botão
    fireEvent.press(button);

    // 3. Verifica as ações
    // 3a. Chamou o addTodo do contexto com o texto correto?
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith(novaTarefa);

    // 3b. Mostrou a mensagem de sucesso?
    expect(ToastAndroid.showWithGravity).toHaveBeenCalledTimes(1);
    expect(ToastAndroid.showWithGravity).toHaveBeenCalledWith(
      'Adicionado com sucesso!',
      2000,
      ToastAndroid.BOTTOM
    );

    // 3c. Limpou o input?
    expect(input.props.value).toBe('');
  });

  // Teste 4: Submissão sem validação (teste de comportamento atual)
  // Nota: Seu componente não tem validação para texto vazio.
  // Este teste verifica o comportamento ATUAL (que é adicionar um todo vazio).
  it('deve chamar addTodo com string vazia se o input estiver vazio', () => {
    const { getByText, getByPlaceholderText } = render(<TodoFormInput />);

    const input = getByPlaceholderText('Descreva o que deve ser feito');
    const button = getByText('Adicionar');

    expect(input.props.value).toBe(''); // Garante que está vazio

    // Clica no botão com input vazio
    fireEvent.press(button);

    // Verifica se o addTodo foi chamado mesmo assim (com string vazia)
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith('');

    // Verifica se o Toast foi mostrado
    expect(ToastAndroid.showWithGravity).toHaveBeenCalledTimes(1);
  });
});