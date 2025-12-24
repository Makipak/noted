import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
  type DimensionValue,
} from 'react-native';
import Colors from '../../constants/Colors';
import { useTodos, type TodoSummary } from '../../hooks/useTodos';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const formatDateLabel = (date: string) => {
  const d = new Date(`${date}T00:00:00`);
  return d.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default function StatsScreen() {
  const { getDailySummary } = useTodos();
  const [data, setData] = useState<TodoSummary[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // keep stable to avoid focus-effect loops
  const load = useCallback(() => {
    const rows = getDailySummary();
    setData(rows);
  }, [getDailySummary]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load();
    setRefreshing(false);
  }, [load]);

  const renderItem = ({ item }: { item: TodoSummary }) => {
    const pending = Math.max(item.total - item.completed, 0);
    const progress = item.total === 0 ? 0 : item.completed / item.total;
    const progressWidth: DimensionValue = `${Math.round(progress * 100)}%`;

    return (
      <Pressable style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.date}>{formatDateLabel(item.date)}</Text>
            <Text style={styles.subtitle}>{item.total} tasks</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>
              {Math.round(progress * 100)}% done
            </Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        <View style={styles.row}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Completed</Text>
            <Text style={styles.statValue}>{item.completed}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={[styles.statValue, styles.pendingValue]}>
              {pending}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Daily stats</Text>
      {/* <Text style={styles.caption}>
        Pantau progres selesai vs belum per tanggal.
      </Text> */}

      <FlatList
        data={data}
        keyExtractor={item => item.date}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Belum ada data</Text>
            <Text style={styles.emptyDesc}>
              Tambah todo terlebih dahulu untuk melihat statistik.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  caption: {
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    color: Colors.textSecondary,
    marginTop: 2,
  },
  pill: {
    backgroundColor: '#F5E5D2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pillText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#F1F1F1',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {},
  statLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  pendingValue: {
    color: Colors.primary,
  },
  emptyBox: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  emptyDesc: {
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
