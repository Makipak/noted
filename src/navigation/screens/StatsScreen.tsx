import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <Text>Total Completed vs Pending</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
});
