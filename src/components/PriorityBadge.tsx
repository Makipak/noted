import { View, Text, StyleSheet } from 'react-native';
import { Priority, PRIORITY_COLOR, PRIORITY_LABEL } from '../constants/priorities';

type Props = {
  priority: Priority;
};

export default function PriorityBadge({ priority }: Props) {
  return (
    <View style={[styles.badge, { backgroundColor: PRIORITY_COLOR[priority] }]}>
      <Text style={styles.text}>{PRIORITY_LABEL[priority]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
