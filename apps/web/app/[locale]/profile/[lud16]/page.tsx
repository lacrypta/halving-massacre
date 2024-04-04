'use client';

import { Divider } from '@lawallet/ui';
import { useState } from 'react';
import InscriptionSheet from '../../components/InscriptionSheet/InscriptionSheet';

import { PlayerProvider } from '@/../context/PlayerContext';
import { PlayerDashboard } from '../../components/PlayerDashboard';
import { Navbar } from '@/[locale]/components/Navbar';

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
      <Navbar />
      <Divider y={16} />
      <PlayerProvider walias={walias}>
        <PlayerDashboard walias={walias} onAddPower={onAddPower} onBuyTicket={() => setIsInscriptionOpen(true)} />
        <InscriptionSheet isOpen={isInscriptionOpen} onClose={() => setIsInscriptionOpen(false)} />
      </PlayerProvider>
    </>
  );
}
