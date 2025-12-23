import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export function useNotifications() {
  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  };

  const scheduleNotification = async (
    title: string,
    body: string,
    triggerDate: Date,
    data?: any
  ) => {
    if (Platform.OS !== 'android') return null;

    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        data,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });
  };

  return { requestPermission, scheduleNotification };
}
