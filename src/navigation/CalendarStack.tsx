import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DayTodoScreen from './screens/DayTodoScreen';
import AddEditTodoScreen from './screens/AddEditTodoScreen';
import FocusModeScreen from './screens/FocusModeScreen';
import Colors from '../constants/Colors';

export type CalendarStackParamList = {
  Home: undefined;
  DayTodos: { date: string };
  AddEditTodo: { date: string; todoId?: number };
  FocusMode: { duration: number; todoId?: number; todoDate?: string; todoTime?: string };
};

const Stack = createNativeStackNavigator<CalendarStackParamList>();

function CalendarStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Calendar' }}
      />
      <Stack.Screen
        name="DayTodos"
        component={DayTodoScreen}
        options={{ title: 'Your Todos' }}
      />
      <Stack.Screen
        name="AddEditTodo"
        component={AddEditTodoScreen}
        options={{ title: 'Todo' }}
      />
      <Stack.Screen
        name="FocusMode"
        component={FocusModeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

CalendarStack.displayName = 'CalendarStack';

export default CalendarStack;
