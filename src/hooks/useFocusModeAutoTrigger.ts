import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useTodos } from './useTodos';

export function useFocusModeAutoTrigger() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { getOverdueHighPriorityTodos } = useTodos();

  useEffect(() => {
    // Check every 10 seconds for overdue high-priority todos
    const interval = setInterval(() => {
      const overdueTodos = getOverdueHighPriorityTodos();
      
      if (overdueTodos.length > 0) {
        // Auto-navigate to focus mode with correct nested path
        const todoId = overdueTodos[0].id;
        (navigation as any).navigate('Main', {
          screen: 'Calendar',
          params: {
            screen: 'FocusMode',
            params: {
              duration: 60,
              todoId,
            },
          },
        });
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [navigation, getOverdueHighPriorityTodos]);
}
