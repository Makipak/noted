import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import Navigation from './navigation';
import { useNavigationContainerRef, CommonActions } from '@react-navigation/native';
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
  const navigationReadyRef = useRef(false);

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
          if (navigationReadyRef.current && navRef.isReady()) {
            navigateToFocusMode(navRef, pendingDeepLink.current);
            pendingDeepLink.current = null;
          }
        }
      }
    );

    return () => sub.remove();
  }, []);

  // Handle pending deep link when navigation becomes ready
  useEffect(() => {
    const checkNavReady = setTimeout(() => {
      navigationReadyRef.current = navRef.isReady();
      if (navigationReadyRef.current && pendingDeepLink.current) {
        navigateToFocusMode(navRef, pendingDeepLink.current);
        pendingDeepLink.current = null;
      }
    }, 500);

    return () => clearTimeout(checkNavReady);
  }, [navRef]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation navigationRef={navRef} onReady={() => { navigationReadyRef.current = true; }} />
    </GestureHandlerRootView>
  );
}

function navigateToFocusMode(navRef: any, params: any) {
  try {
    // Use dispatch with proper reset to ensure FocusMode opens directly
    navRef.dispatch(
      CommonActions.navigate({
        name: 'FocusMode',
        params: {
          duration: params.duration || 60,
          todoDate: params.todoDate,
          todoTime: params.todoTime,
        },
      })
    );
  } catch (error) {
    console.error('❌ Navigation error:', error);
  }
}
