import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarStackParamList } from '../CalendarStack';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CalendarStackParamList>>();

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day =>
          navigation.navigate('DayTodos', { date: day.dateString })
        }
        theme={{
          todayTextColor: Colors.primary,
          arrowColor: Colors.primary,
          selectedDayBackgroundColor: Colors.primary,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
