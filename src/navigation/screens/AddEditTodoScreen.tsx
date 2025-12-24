import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarStackParamList } from '../CalendarStack';
import { useTodos } from '../../hooks/useTodos';
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddEditTodoScreen() {
  const route = useRoute<RouteProp<CalendarStackParamList, 'AddEditTodo'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<CalendarStackParamList>>();

  const { insertTodo, getTodoById, updateTodo } = useTodos();

  const isEdit = route.params?.todoId != null;

  const [title, setTitle] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [priority, setPriority] = useState<'low' | 'normal' | 'high'>(
    'normal'
  );

  // Prefill data when editing
  useEffect(() => {
    if (!isEdit || !route.params.todoId) return;
    const todo = getTodoById(route.params.todoId);
    if (!todo) return;

    setTitle(todo.title);
    // parse time "HH:MM"
    if (todo.todo_time) {
      const now = new Date();
      const [h, m] = todo.todo_time.split(':').map(Number);
      const dt = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        h || 0,
        m || 0
      );
      setTime(dt);
    }
    if (
      todo.priority === 'low' ||
      todo.priority === 'normal' ||
      todo.priority === 'high'
    ) {
      setPriority(todo.priority);
    }
  }, [isEdit, route.params.todoId, getTodoById]);

  const handleSave = async () => {
    if (!title.trim()) return;

    const hhmm = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (isEdit && route.params.todoId) {
      updateTodo({
        id: route.params.todoId,
        title,
        time: hhmm,
        priority,
      });
    } else {
      await insertTodo({
        title,
        date: route.params.date,
        time: hhmm,
        priority,
      });
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <TextInput
        placeholder="Apa yang ingin kamu lakukan?"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      {/* TIME PICKER */}
      <Pressable style={styles.timeBtn} onPress={() => setShowTime(true)}>
        <Text style={styles.timeText}>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Pressable>

      {showTime && (
        <DateTimePicker
          mode="time"
          value={time}
          onChange={(_, selected) => {
            setShowTime(false);
            if (selected) setTime(selected);
          }}
        />
      )}

      {/* PRIORITY */}
      <View style={styles.priorityRow}>
        {(['low', 'normal', 'high'] as const).map(p => (
          <Pressable
            key={p}
            onPress={() => setPriority(p)}
            style={[
              styles.priorityBtn,
              priority === p && styles[`priority_${p}`],
            ]}
          >
            <Text style={styles.priorityText}>{p.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>

      {/* SAVE */}
      <Pressable style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Todo</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  timeBtn: {
    backgroundColor: Colors.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  priorityBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: Colors.card,
    alignItems: 'center',
  },
  priorityText: {
    fontWeight: '600',
  },
  priority_low: {
    backgroundColor: '#C7EDE6',
  },
  priority_normal: {
    backgroundColor: '#FFEE91',
  },
  priority_high: {
    backgroundColor: '#F5C857',
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
