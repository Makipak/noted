import { useEffect, useRef } from 'react';
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
  const pendingDeepLink = useRef<any>(null);

  useEffect(() => {
    // Handle notification response (user tap notification)
    const sub = Notifications.addNotificationResponseReceivedListener(
      response => {
        const data = response.notification.request.content.data;
        
        // Check if notification has deep link for focus mode
        if (data?.todoTime && data?.todoDate) {
          // Store the deep link data and wait for navigation to be ready
          pendingDeepLink.current = {
            duration: 60,
            todoDate: data.todoDate,
            todoTime: data.todoTime,
          };

          // If navigation is ready, navigate immediately
          if (navRef.isReady()) {
            navigateToFocusMode(navRef, pendingDeepLink.current);
            pendingDeepLink.current = null;
          }
        }
      }
    );

    return () => sub.remove();
  }, [navRef]);

  // Handle pending deep link when navigation becomes ready
  useEffect(() => {
    if (navRef.isReady() && pendingDeepLink.current) {
      navigateToFocusMode(navRef, pendingDeepLink.current);
      pendingDeepLink.current = null;
    }
  }, [navRef]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation navigationRef={navRef} />
    </GestureHandlerRootView>
  );
}

function navigateToFocusMode(navRef: any, params: any) {
  try {
    navRef.navigate('FocusMode' as never, {
      duration: params.duration || 60,
      todoDate: params.todoDate,
      todoTime: params.todoTime,
    } as never);
  } catch (error) {
    console.error('❌ Navigation error:', error);
  }
}
