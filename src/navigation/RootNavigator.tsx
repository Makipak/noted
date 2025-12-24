import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import { useFocusModeAutoTrigger } from '../hooks/useFocusModeAutoTrigger';

export type RootStackParamList = {
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // Now this hook can safely use useNavigation()
  useFocusModeAutoTrigger();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabs} />
    </Stack.Navigator>
  );
}
