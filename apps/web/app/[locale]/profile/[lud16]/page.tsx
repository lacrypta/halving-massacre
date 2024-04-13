'use client';

// Libraries
import { Divider } from '@lawallet/ui';
import { useState } from 'react';

// Context
import { PlayerProvider } from '@/../context/PlayerContext';

// Generic components
import AddPowerSheet from '@/[locale]/components/AddPowerSheet/AddPowerSheet';
import InscriptionSheet from '@/[locale]/components/InscriptionSheet/InscriptionSheet';
import { Navbar } from '../../components/Navbar';
import { PlayerDashboard } from '../../components/PlayerDashboard';
import { GameTime } from '@/[locale]/components/GameTime';

interface PageProps {
  params: {
    lud16: string;
  };
}

const EMERGENCY_LOCK_TICKET = process.env.NEXT_PUBLIC_EMERGENCY_LOCK_TICKET === 'true';
const EMERGENCY_LOCK_POWER = process.env.NEXT_PUBLIC_EMERGENCY_LOCK_POWER === 'true';

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
      <GameTime round={10} block="819.200" time="20" />
      <Divider y={16} />
      <PlayerProvider walias={walias}>
        <PlayerDashboard
          walias={walias}
          onAddPower={() => setIsAddPowerOpen(true)}
          onBuyTicket={() => setIsInscriptionOpen(true)}
        />
        {!EMERGENCY_LOCK_POWER && <AddPowerSheet isOpen={isAddPowerOpen} onClose={() => setIsAddPowerOpen(false)} />}
        {!EMERGENCY_LOCK_TICKET && (
          <InscriptionSheet isOpen={isInscriptionOpen} onClose={() => setIsInscriptionOpen(false)} />
        )}
      </PlayerProvider>
    </>
  );
}
