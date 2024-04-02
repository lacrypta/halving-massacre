'use client';
import { NextProvider } from '@lawallet/ui/next';
import { NostrProvider, ProfileCacheProvider } from '@lawallet/react';
import '@lawallet/ui/styles';
import { appTheme } from '../config/exports';
import Footer from './components/Footer';
import { MassacreProvider } from '../context/MassacreContext';
import { mockConfig } from '../config/mock';
import type { ConfigProps } from '@lawallet/utils/types';

const MASSACRE_SETUP_ID = process.env.NEXT_PUBLIC_MASSACRE_SETUP_ID!;

const nostrConfig = mockConfig as unknown as ConfigProps;
// const nostrConfig = createConfig({ relaysList }); // TODO: Fix BUG: Ignoring relaysList

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <NextProvider theme={appTheme}>
      <NostrProvider config={nostrConfig}>
        <ProfileCacheProvider>
          <MassacreProvider setupId={MASSACRE_SETUP_ID}>
            {children}
            <Footer />
          </MassacreProvider>
        </ProfileCacheProvider>
      </NostrProvider>
    </NextProvider>
  );
}
