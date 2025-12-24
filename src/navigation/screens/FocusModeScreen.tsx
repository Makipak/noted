import { Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FocusModeScreen() {
  const route = useRoute<RouteProp<any, 'FocusMode'>>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [seconds, setSeconds] = useState(route.params.duration);

  // Disable back button during focus mode
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (seconds > 0) {
        e.preventDefault();
      }
    });
  }, [seconds, navigation]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto navigate to stats screen after timer ends
          setTimeout(() => {
            navigation.navigate('Main' as never, {
              screen: 'Stats',
            } as never);
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <Text style={styles.timer}>{seconds}s</Text>
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
  timer: {
    fontSize: 72,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
});
