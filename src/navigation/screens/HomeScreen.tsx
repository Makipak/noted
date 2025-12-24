import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarStackParamList } from '../CalendarStack';
import { useTodos, type TodoSummary } from '../../hooks/useTodos';
import { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CalendarStackParamList>>();
  const { getDailySummary } = useTodos();

  const [summaries, setSummaries] = useState<Record<string, TodoSummary>>({});
  const todayStr = new Date().toISOString().split('T')[0];

  const loadSummaries = useCallback(() => {
    const data = getDailySummary();
    const map = data.reduce<Record<string, TodoSummary>>((acc, item) => {
      acc[item.date] = item;
      return acc;
    }, {});
    setSummaries(map);
  }, [getDailySummary]);

  useFocusEffect(
    useCallback(() => {
      loadSummaries();
    }, [loadSummaries])
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Calendar
        onDayPress={day =>
          navigation.navigate('DayTodos', { date: day.dateString })
        }
        dayComponent={({ date, state }) => {
          if (!date) return null;
          const isToday = date.dateString === todayStr;
          const summary = summaries[date.dateString];
          const total = summary?.total ?? 0;
          const done = summary?.completed ?? 0;
          const pending = Math.max(total - done, 0);
          const maxDots = 3;
          const filledSlots = Math.min(total, maxDots);
          const doneDots = Math.min(done, filledSlots);
          const pendingDots = Math.min(
            pending,
            Math.max(filledSlots - doneDots, 0)
          );
          const hasExtra = total > maxDots;

          return (
            <Pressable
              style={({ pressed }) => [
                styles.dayWrapper,
                isToday && styles.todayWrapper,
                pressed && styles.dayPressed,
              ]}
              onPress={() =>
                navigation.navigate('DayTodos', { date: date.dateString })
              }
            >
              <View style={styles.dayTop}>
                <Text
                  style={[
                    styles.dayText,
                    isToday && styles.todayText,
                    state === 'disabled' && styles.dayDisabled,
                  ]}
                >
                  {date.day}
                </Text>
              </View>

              <View style={styles.dotRow}>
                {Array.from({ length: filledSlots }).map((_, idx) => {
                  const isDone = idx < doneDots;
                  const isPending = !isDone && idx < doneDots + pendingDots;
                  const style = isDone
                    ? styles.dotDone
                    : isPending
                      ? styles.dotPending
                      : styles.dotEmpty;
                  return <View key={idx} style={[styles.dot, style]} />;
                })}

                {hasExtra && <View style={[styles.dot, styles.dotExtra]} />}
              </View>
            </Pressable>
          );
        }}
        theme={{
          todayTextColor: Colors.primary,
          arrowColor: Colors.primary,
          selectedDayBackgroundColor: Colors.primary,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  dayWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  todayWrapper: {
    backgroundColor: '#FFEAD4',
  },
  dayPressed: {
    backgroundColor: '#F5EFE7',
  },
  dayTop: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    textAlign: 'center',
    fontWeight: '700',
    color: Colors.textPrimary,
    fontSize: 14,
  },
  todayText: {
    color: Colors.primary,
  },
  dayDisabled: {
    color: Colors.textSecondary,
    opacity: 0.7,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotDone: {
    backgroundColor: Colors.success,
  },
  dotPending: {
    backgroundColor: Colors.primary,
  },
  dotEmpty: {
    backgroundColor: '#E3E3E3',
  },
  dotExtra: {
    width: 10,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.textSecondary,
    opacity: 0.6,
  },
});
