'use client';

// Libraries
import { Divider } from '@lawallet/ui';
import Image from 'next/image';
import { useState } from 'react';

// Context
import { PlayerProvider } from '@/../context/PlayerContext';

// Generic components
import AddPowerSheet from '@/[locale]/components/AddPowerSheet/AddPowerSheet';
import InscriptionSheet from '@/[locale]/components/InscriptionSheet/InscriptionSheet';
import { Navbar } from '../../components/Navbar';
import { PlayerDashboard } from '../../components/PlayerDashboard';

import { Link } from '../../../../navigation';
import pngIso from '../../../../public/images/iso.png';

interface PageProps {
  params: {
    lud16: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  const walias = decodeURIComponent(params.lud16);
  const [isAddPowerOpen, setIsAddPowerOpen] = useState(false);
  const [isInscriptionOpen, setIsInscriptionOpen] = useState(false);

  const onAddPower = () => {
    setIsAddPowerOpen(true);
  };
  return (
    <>
      <Navbar />
      {/* <GameTime round={10} block="820.000" time="20" /> */}
      <Divider y={16} />
      <PlayerProvider walias={walias}>
        <PlayerDashboard
          walias={walias}
          onAddPower={() => setIsAddPowerOpen(true)}
          onBuyTicket={() => setIsInscriptionOpen(true)}
        />
        <AddPowerSheet isOpen={isAddPowerOpen} onClose={() => setIsAddPowerOpen(false)} />
        <InscriptionSheet isOpen={isInscriptionOpen} onClose={() => setIsInscriptionOpen(false)} />
      </PlayerProvider>
    </>
  );
}
