'use client';

// Libraries
import { useState } from 'react';
import Image from 'next/image';
import { Divider } from '@lawallet/ui';

// Context
import { PlayerProvider } from '@/../context/PlayerContext';

// Generic components
import InscriptionSheet from '../../components/InscriptionSheet/InscriptionSheet';
import { PlayerDashboard } from '../../components/PlayerDashboard';
import { Navbar } from '../../components/Navbar';

import pngIso from '../../../../public/images/iso.png';

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
      <Navbar>
        <Image width={23} height={30} alt="Halving Massacre by La Crypta" src={pngIso.src} />
      </Navbar>
      <Divider y={16} />
      <PlayerProvider walias={walias}>
        <PlayerDashboard walias={walias} onAddPower={onAddPower} onBuyTicket={() => setIsInscriptionOpen(true)} />
        <InscriptionSheet isOpen={isInscriptionOpen} onClose={() => setIsInscriptionOpen(false)} />
      </PlayerProvider>
    </>
  );
}
