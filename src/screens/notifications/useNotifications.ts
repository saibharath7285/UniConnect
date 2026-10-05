import { useState, useEffect, useRef } from 'react';
import type { EventSubscription } from 'expo-notifications';
import {
  requestNotificationPermission,
  scheduleLocalNotification,
  addNotificationReceivedListener,
  removeNotificationSubscription,
} from '../../services/notifications.service';

export function useNotifications() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [notifTitle, setNotifTitle] = useState('UniConnect');
  const [notifBody, setNotifBody] = useState('This is a test notification.');
  const [lastReceived, setLastReceived] = useState<string | null>(null);
  const listenerRef = useRef<EventSubscription | null>(null);

  useEffect(() => {
    listenerRef.current = addNotificationReceivedListener((notification) => {
      setLastReceived(notification.request.content.title ?? 'Notification received');
    });
    return () => {
      if (listenerRef.current) {
        removeNotificationSubscription(listenerRef.current);
      }
    };
  }, []);

  const handleRequestPermission = async (): Promise<boolean> => {
    const granted = await requestNotificationPermission();
    setPermissionGranted(granted);
    return granted;
  };

  const handleSendNotification = async (): Promise<void> => {
    let granted = permissionGranted;
    if (granted === null) {
      granted = await handleRequestPermission();
    }
    if (!granted) return;
    await scheduleLocalNotification(
      notifTitle.trim() || 'UniConnect',
      notifBody.trim() || 'Test notification'
    );
  };

  return {
    permissionGranted,
    notifTitle,
    setNotifTitle,
    notifBody,
    setNotifBody,
    lastReceived,
    handleRequestPermission,
    handleSendNotification,
  };
}
