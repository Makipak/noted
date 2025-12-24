import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Swipeable } from 'react-native-gesture-handler';

type Props = {
  title: string;
  time: string;
  priority: string;
  completed: boolean;
  onToggle: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function TodoItem({
  title,
  time,
  priority,
  completed,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Swipeable
      enabled={Boolean(onEdit || onDelete)}
      renderRightActions={() =>
        (onEdit || onDelete) && (
          <View style={styles.actionsContainer}>
            {onEdit && (
              <Pressable style={[styles.actionBtn, styles.editBtn]} onPress={onEdit}>
                <Ionicons name="pencil-outline" size={18} color="#fff" />
                <Text style={styles.actionText}>Edit</Text>
              </Pressable>
            )}
            {onDelete && (
              <Pressable
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={onDelete}
              >
                <Ionicons name="trash-outline" size={18} color="#fff" />
                <Text style={styles.actionText}>Hapus</Text>
              </Pressable>
            )}
          </View>
        )
      }
    >
      <View style={[styles.card, completed && styles.cardCompleted]}>
        {/* LEFT: TOGGLE */}
        <Pressable onPress={onToggle} style={styles.checkboxPress}>
          <Ionicons
            name={completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={completed ? Colors.primary : Colors.textSecondary}
            style={styles.checkbox}
          />
        </Pressable>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text
            numberOfLines={1}
            style={[styles.title, completed && styles.titleCompleted]}
          >
            {title}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.time}>{time}</Text>

            <View style={styles.priorityBadge}>
              <Text style={styles.priorityText}>{priority.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
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
  checkboxPress: {
    paddingRight: 8,
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    marginRight: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 8,
  },
  editBtn: {
    backgroundColor: Colors.textSecondary,
  },
  deleteBtn: {
    backgroundColor: Colors.danger,
  },
  actionText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
});
