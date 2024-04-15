'use client';

// Libraries
import { NostrProvider, ProfileCacheProvider } from '@lawallet/react';
import { NextProvider } from '@lawallet/ui/next';

// Context
import { MassacreProvider } from '@/../context/MassacreContext';
import { NotificationsProvider } from '@/../context/NotificationsContext';

// Components
import Footer from '@/[locale]/components/Footer';
import { EmergencyLock } from '@/[locale]/components/EmergencyLock';

// Utils and hooks
import type { ConfigProps } from '@lawallet/utils/types';

// Theme
import { appTheme } from '@/../config/exports';
import '@lawallet/ui/styles';

// Config
import { mockConfig } from '@/../config/mock';
import { Suspense } from 'react';

const MASSACRE_SETUP_ID = process.env.NEXT_PUBLIC_MASSACRE_SETUP_ID!;
const nostrConfig = mockConfig as unknown as ConfigProps;

// const nostrConfig = createConfig({ relaysList }); // TODO: Fix BUG: Ignoring relaysList

const EMERGENCY_LOCK_SERVER = process.env.EMERGENCY_LOCK_SERVER === 'true';
const EMERGENCY_LOCK_SERVER_DISCLAIMER = process.env.EMERGENCY_LOCK_SERVER_DISCLAIMER;

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextProvider theme={appTheme}>
      <NostrProvider config={nostrConfig}>
        <Suspense>
          <ProfileCacheProvider>
            <MassacreProvider setupId={MASSACRE_SETUP_ID}>
              <NotificationsProvider>
                {EMERGENCY_LOCK_SERVER ? <EmergencyLock message={EMERGENCY_LOCK_SERVER_DISCLAIMER || ''} /> : children}
                <Footer />
              </NotificationsProvider>
            </MassacreProvider>
          </ProfileCacheProvider>
        </Suspense>
      </NostrProvider>
    </NextProvider>
  );
}
