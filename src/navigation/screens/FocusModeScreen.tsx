import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CalendarStackParamList } from '../CalendarStack';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FocusModeScreen() {
  const route =
    useRoute<RouteProp<CalendarStackParamList, 'FocusMode'>>();

  const [seconds, setSeconds] = useState(route.params.duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <Text style={styles.title}>Focus Mode</Text>
      <Text style={styles.timer}>{seconds}s</Text>
      <Text style={styles.desc}>Stay focused 👀</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
});
