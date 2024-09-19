import type {
  AccountNotifications,
  AtlassifyNotification,
  SettingsState,
} from '../types';
import { getAccountUUID } from './auth/utils';

export function removeNotification(
  settings: SettingsState,
  notification: AtlassifyNotification,
  notifications: AccountNotifications[],
): AccountNotifications[] {
  if (settings.delayNotificationState) {
    return notifications;
  }

  const notificationId = notification.id;

  const accountIndex = notifications.findIndex(
    (accountNotifications) =>
      getAccountUUID(accountNotifications.account) ===
      getAccountUUID(notification.account),
  );

  if (accountIndex !== -1) {
    const updatedNotifications = [...notifications];
    updatedNotifications[accountIndex] = {
      ...updatedNotifications[accountIndex],
      notifications: updatedNotifications[accountIndex].notifications.filter(
        (notification) => notification.id !== notificationId,
      ),
    };
    return updatedNotifications;
  }

  return notifications;
}
