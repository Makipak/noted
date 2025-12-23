import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

type Props = {
  duration: number; // seconds
  onFinish: () => void;
};

export default function FocusTimer({ duration, onFinish }: Props) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FOCUS MODE</Text>
      <Text style={styles.timer}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </Text>
      <Text style={styles.subtitle}>
        Stay focused on your task
      </Text>
    </View>
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
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 12,
  },
  timer: {
    color: '#fff',
    fontSize: 72,
    fontWeight: '700',
  },
  subtitle: {
    color: '#FFF7ED',
    fontSize: 14,
    marginTop: 12,
  },
});
