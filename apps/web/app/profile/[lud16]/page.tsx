'use client';

import React, { useState } from 'react';
import { Divider } from '@lawallet/ui';
import InscriptionSheet from '@/components/InscriptionSheet/InscriptionSheet';

import { PlayerProvider } from '../../../context/PlayerContext';
import { PlayerDashboard } from '@/components/PlayerDashboard';

interface PageProps {
  params: {
    lud16: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  const walias = decodeURIComponent(params.lud16);
  const [isInscriptionOpen, setIsInscriptionOpen] = useState(false);

  const onAddPower = () => {
    alert('Not implemented yet');
  };
  return (
    <>
      <PlayerProvider walias={walias}>
        <Divider y={64} />
        <PlayerDashboard walias={walias} onAddPower={onAddPower} onBuyTicket={() => setIsInscriptionOpen(true)} />
        <InscriptionSheet isOpen={isInscriptionOpen} onClose={() => setIsInscriptionOpen(false)} />
      </PlayerProvider>
    </>
  );
}
