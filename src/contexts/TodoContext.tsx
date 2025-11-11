import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    ReactNode,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'

type Todo = {
    id: string
    todotext: string
    priority: number
    completed: boolean
}

type TodosState = {
    todos: Todo[]
    loading: boolean
}

type Action =
    | { type: 'SET_TODOS_LIST'; payload: Todo[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'ADD_TODO'; payload: string, priority: number }
    | { type: 'REMOVE_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: string }

type TodosContextType = {
    state: TodosState
    addTodo: (text: string, priority: number) => void
    removeTodo: (id: string) => void
    toggleTodo: (id: string) => void
}

const TODOS_STORAGE_KEY = '@TodoAppReactNative:todos'

const TodosContext = createContext<TodosContextType | undefined>(undefined)

const todosReducer = (state: TodosState, action: Action): TodosState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        case 'SET_TODOS_LIST':
            return { ...state, todos: action.payload, loading: false }
        case 'ADD_TODO':
            const UuidTodo = uuidv4();
            const newTodo: Todo = {
                id: UuidTodo,
                priority: 0, /** WIP - FUNÇÃO DE PRIORIDADE DA LISTA */
                todotext: action.payload,
                completed: false,
            }
            return { ...state, todos: [...state.todos, newTodo] }
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            }
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
            }
        default:
            return state
    }
}

export const TodosProvider = ({ children }: { children: ReactNode }) => {
    const initialState: TodosState = {
        todos: [],
        loading: true,
    }

    const [state, dispatch] = useReducer(todosReducer, initialState)

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const storedTodos = await AsyncStorage.getItem(TODOS_STORAGE_KEY)
                if (storedTodos) {
                    dispatch({ type: 'SET_TODOS_LIST', payload: JSON.parse(storedTodos) })
                } else {
                    dispatch({ type: 'SET_LOADING', payload: false })
                }
            } catch (e) {
                console.error('Falha ao carregar todos.', e)
                dispatch({ type: 'SET_LOADING', payload: false })
            }
        }
        loadTodos()
    }, [])

    useEffect(() => {
        if (!state.loading) {
            AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(state.todos))
        }
    }, [state.todos, state.loading])

    const addTodo = (text: string, priority: number) => dispatch({ type: 'ADD_TODO', payload: text, priority })
    const removeTodo = (id: string) => dispatch({ type: 'REMOVE_TODO', payload: id })
    const toggleTodo = (id: string) => dispatch({ type: 'TOGGLE_TODO', payload: id })

    const value = {
        state,
        addTodo,
        removeTodo,
        toggleTodo,
    }

    return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}

export const useTodos = () => {
    const context = useContext(TodosContext)
    if (context === undefined) {
        throw new Error('useTodos deve ser usado dentro de um TodosProvider')
    }
    return context
}