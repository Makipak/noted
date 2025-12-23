import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

type Props = {
  title: string;
  time: string;
  priority: string;
  completed: boolean;
  onToggle: () => void;
};

export default function TodoItem({
  title,
  time,
  priority,
  completed,
  onToggle,
}: Props) {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.98 }] },
        completed && styles.cardCompleted,
      ]}
    >
      {/* CHECKBOX */}
      <Ionicons
        name={completed ? 'checkmark-circle' : 'ellipse-outline'}
        size={22}
        color={completed ? Colors.primary : Colors.textSecondary}
        style={styles.checkbox}
      />

      {/* CONTENT */}
      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            completed && styles.titleCompleted,
          ]}
        >
          {title}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.time}>⏰ {time}</Text>

          <View style={styles.priorityBadge}>
            <Text style={styles.priorityText}>
              {priority.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,

    // shadow android
    elevation: 3,

    // shadow ios
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardCompleted: {
    opacity: 0.45,
  },
  checkbox: {
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  priorityBadge: {
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 0.4,
  },
});
