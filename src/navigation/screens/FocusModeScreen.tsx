import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarStackParamList } from '../CalendarStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTodos } from '../../hooks/useTodos';

export default function FocusModeScreen() {
  const route = useRoute<RouteProp<CalendarStackParamList, 'FocusMode'>>();
  const navigation = useNavigation<NativeStackNavigationProp<CalendarStackParamList>>();
  const { toggleTodo } = useTodos();

  const [seconds, setSeconds] = useState(route.params.duration);
  const [isFinished, setIsFinished] = useState(false);

  // Disable back button
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (!isFinished) {
        e.preventDefault();
      }
    });
  }, [isFinished, navigation]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleComplete = () => {
    // Mark todo as completed if provided
    if (route.params.todoId) {
      toggleTodo(route.params.todoId, true);
    }
    navigation.goBack();
  };

  const handleSnooze = () => {
    setSeconds(300); // 5 minutes
    setIsFinished(false);
  };

  const handleExit = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <Text style={styles.title}>Focus Mode</Text>
      <Text style={styles.timer}>{seconds}s</Text>
      <Text style={styles.desc}>Stay focused 👀</Text>

      {isFinished && (
        <View style={styles.optionsContainer}>
          <Pressable style={styles.buttonComplete} onPress={handleComplete}>
            <Text style={styles.buttonText}>✓ Complete</Text>
          </Pressable>
          <Pressable style={styles.buttonSnooze} onPress={handleSnooze}>
            <Text style={styles.buttonText}>⏱ Snooze 5min</Text>
          </Pressable>
          <Pressable style={styles.buttonExit} onPress={handleExit}>
            <Text style={styles.buttonText}>✕ Exit</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  timer: {
    fontSize: 48,
    fontWeight: '800',
    color: '#fff',
  },
  desc: {
    marginTop: 12,
    color: '#fff',
    opacity: 0.8,
  },
  optionsContainer: {
    marginTop: 40,
    width: '100%',
    gap: 12,
  },
  buttonComplete: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonSnooze: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonExit: {
    backgroundColor: '#f44336',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
