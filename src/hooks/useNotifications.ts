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
    data?: any,
    notificationId?: string
  ) => {
    if (Platform.OS !== 'android') return null;

    try {
      const result = await Notifications.scheduleNotificationAsync({
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
      return result;
    } catch (error) {
      console.error('❌ Error scheduling notification:', error);
      return null;
    }
  };

  // Schedule notification 1 minute before todo time
  const scheduleTodoReminder = async (
    todoTime: string, // format: "HH:MM"
    todoDate: string, // format: "YYYY-MM-DD"
    todos: Array<{ title: string; priority: string }>
  ) => {
    if (Platform.OS !== 'android') return null;

    try {
      // Parse time
      const [hours, minutes] = todoTime.split(':').map(Number);
      
      // Create date object
      const [year, month, day] = todoDate.split('-').map(Number);
      let notificationDate = new Date(year, month - 1, day, hours, minutes, 0);
      
      // Subtract 1 minute for reminder
      let reminderDate = new Date(notificationDate.getTime() - 60000);
      
      const now = new Date();

      // If reminder time is in the past, schedule for next occurrence (7 days later)
      if (reminderDate < now) {
        notificationDate = new Date(notificationDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        reminderDate = new Date(notificationDate.getTime() - 60000);
      }

      // Create unique notification ID based on date and time
      const notificationId = `reminder_${todoDate}_${todoTime}`;

      // Build notification body with all todos
      const todosText = todos
        .map(t => `[${t.priority.toUpperCase()}] ${t.title}`)
        .join('\n');

      const body = `Upcoming todos at ${todoTime}:\n${todosText}`;

      return scheduleNotification(
        'Time for todos!',
        body,
        reminderDate,
        { todoDate, todoTime },
        notificationId
      );
    } catch (error) {
      console.error('❌ Error scheduling todo reminder:', error);
      return null;
    }
  };

  return { requestPermission, scheduleNotification, scheduleTodoReminder, cancelNotification: Notifications.cancelScheduledNotificationAsync };
}
