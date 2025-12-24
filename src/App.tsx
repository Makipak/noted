import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Navigation from './navigation';
import { useNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const navRef = useNavigationContainerRef<RootStackParamList>();

  useEffect(() => {
    // Listen for incoming notifications (when app is in foreground)
    const notificationReceivedSub = Notifications.addNotificationReceivedListener(
      notification => {
        // Notification received while app is in foreground
      }
    );

    const sub = Notifications.addNotificationResponseReceivedListener(
      response => {
        const priority = response.notification.request.content.data?.priority;
        if (priority === 'high') {
          navRef.navigate('Main');
        }
      }
    );

    return () => {
      notificationReceivedSub.remove();
      sub.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}
