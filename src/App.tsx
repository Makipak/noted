import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Navigation from './navigation';
import { useNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const navRef = useNavigationContainerRef<RootStackParamList>();

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(
      response => {
        const priority = response.notification.request.content.data?.priority;
        if (priority === 'high') {
          navRef.navigate('Main');
        }
      }
    );

    return () => sub.remove();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}
