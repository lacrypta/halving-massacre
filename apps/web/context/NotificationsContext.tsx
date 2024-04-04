// Libraries
import React, { createContext, useContext } from 'react';
import { Alert } from '@lawallet/ui';

// Utils and hooks
import useAlert, { type UseAlertReturns } from '../hooks/useAlerts';

const NotificationsContext = createContext({} as UseAlertReturns);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const notifications = useAlert();

  return (
    <NotificationsContext.Provider value={notifications}>
      <Alert
        title={notifications.alert?.title}
        description={notifications.alert?.description ?? ''}
        type={notifications.alert?.type}
        isOpen={!!notifications.alert}
      />
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }

  return context;
};
