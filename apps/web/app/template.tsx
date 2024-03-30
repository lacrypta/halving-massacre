'use client';
import { NextProvider } from '@lawallet/ui/next';
import { NostrProvider, ProfileCacheProvider, createConfig } from '@lawallet/react';
import '@lawallet/ui/styles';
import { appTheme } from '../config/exports';
import Footer from './components/Footer';

const relaysList: string[] = [
  'wss://relay.hodl.ar',
  'wss://relay.lawallet.ar',
  'wss://relay.primal.net',
  'wss://relay.snort.social',
  'wss://nos.lol',
  'wss://relay.damus.io',
  'wss://nostr-pub.wellorder.net',
];
const nostrConfig = createConfig({ relaysList });

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <NextProvider theme={appTheme}>
      <NostrProvider config={nostrConfig}>
        <ProfileCacheProvider>
          {children}
          <Footer />
        </ProfileCacheProvider>
      </NostrProvider>
    </NextProvider>
  );
}
