import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
import {
  useRoute,
  useNavigation,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarStackParamList } from '../CalendarStack';
import { useTodos } from '../../hooks/useTodos';
import TodoItem from '../../components/TodoItem';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DayTodoScreen() {
  const route = useRoute<RouteProp<CalendarStackParamList, 'DayTodos'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<CalendarStackParamList>>();

  const { fetchTodosByDate, toggleTodo, deleteTodo } = useTodos();
  const [todos, setTodos] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchTodosByDate(route.params.date, setTodos);
    }, [route.params.date, fetchTodosByDate])
  );

  // Store todos in global state whenever they change
  useEffect(() => {
    (global as any).currentDayTodos = todos;
  }, [todos]);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TodoItem
            title={item.title}
            time={item.todo_time}
            priority={item.priority}
            completed={item.completed}
            onToggle={() => {
              toggleTodo(item.id, !item.completed);
              setTodos(prev =>
                prev.map(t =>
                  t.id === item.id
                    ? { ...t, completed: !t.completed }
                    : t
                )
              );
            }}
            onEdit={() =>
              navigation.navigate('AddEditTodo', {
                date: route.params.date,
                todoId: item.id,
              })
            }
            onDelete={() => {
              deleteTodo(item.id);
              setTodos(prev => prev.filter(t => t.id !== item.id));
            }}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No todos yet</Text>
        }
      />

      <Pressable
        style={styles.fab}
        onPress={() =>
          navigation.navigate('AddEditTodo', { date: route.params.date })
        }
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingBottom: 96,
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    color: Colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: Colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
