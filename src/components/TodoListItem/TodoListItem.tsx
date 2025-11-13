import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTodos } from '../../contexts/TodoContext';

type Todo = {
    id: string;
    todotext: string;
};

type TodoListItemProps = {
    item: Todo;
    openModal: (item: Todo) => void;
};

export default function TodoListItem({ item, openModal }: TodoListItemProps) {
    const { removeTodo } = useTodos();
    const handleRemove = () => {
        removeTodo(item.id);
    };

    return (
        <Pressable 
            onPress={() => openModal(item)} 
            style={({ pressed }) => [
                styles.itemContainer,
                {
                    backgroundColor: pressed ? '#E0E0E0' : '#FFFFFF',
                }
            ]}
        >
            <View style={styles.textContainer}>
                <Text style={styles.todoText}>{item.todotext}</Text>
               
            </View>

            <Pressable 
                onPress={handleRemove} 
                style={({ pressed }) => [
                    styles.removeButton,
                    {
                        backgroundColor: pressed ? '#c0392b' : '#ff3b30',
                    }
                ]}
            >
                <Text style={styles.removeButtonText}>-</Text>
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        marginVertical: 8,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    todoText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    removeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 28,
    },
});