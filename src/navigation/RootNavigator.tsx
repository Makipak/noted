import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import FocusModeScreen from './screens/FocusModeScreen';
import { useFocusModeAutoTrigger } from '../hooks/useFocusModeAutoTrigger';
import Colors from '../constants/Colors';

export type RootStackParamList = {
  Main: undefined;
  FocusMode: { duration: number; todoId?: number; todoDate?: string; todoTime?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // Now this hook can safely use useNavigation()
  useFocusModeAutoTrigger();

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Group>
      
      {/* FocusMode as full screen modal */}
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal', animationEnabled: false }}>
        <Stack.Screen 
          name="FocusMode" 
          component={FocusModeScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
