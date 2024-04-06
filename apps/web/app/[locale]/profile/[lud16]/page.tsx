'use client';

// Libraries
import { useState } from 'react';
import Image from 'next/image';
import { Divider } from '@lawallet/ui';

// Context
import { PlayerProvider } from '@/../context/PlayerContext';

// Generic components
import AddPowerSheet from '@/[locale]/components/AddPowerSheet/AddPowerSheet';
import InscriptionSheet from '@/[locale]/components/InscriptionSheet/InscriptionSheet';
import { PlayerDashboard } from '../../components/PlayerDashboard';
import { Navbar } from '../../components/Navbar';

import pngIso from '../../../../public/images/iso.png';
import { Link } from '../../../../navigation';

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
      <Navbar>
        <Link href="/">
          <Image width={23} height={30} alt="Halving Massacre by La Crypta" src={pngIso} />
        </Link>
      </Navbar>
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
