'use client';

// Libraries
import { useFormatter } from '@lawallet/react';
import { Button, Container, Divider, Flex, Heading, Text } from '@lawallet/ui';
import type { AvailableLanguages } from '@lawallet/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Context
import { RoundsContext } from '../../../../context/RoundsContext';

// Theme
import { appTheme } from '../../../../config/exports';

// Hooks and utils
import { useMassacre } from '../../../../hooks/useMassacre';

// New ui-components
import Badge from '@/[locale]/components/Badge';
import { Icon } from '@/[locale]/components/Icon';
import { ArrowLeft, ArrowRight } from '@/[locale]/components/Icons';

// Generic components
import { GameTime } from '@/[locale]/components/GameTime';
import type { RoundEventContent, RoundStatus } from '../../../../types/round';
import { Navbar } from '../../components/Navbar';
import ActualContent from './components/ActualContent';
import FinishedContent from './components/FinishedContent';
import PendingContent from './components/PendingContent';

interface PageProps {
  params: {
    number: string;
  };
}

type MassacreRoundType = (RoundEventContent & { totalDistributedPower: number }) | null;

export default function Page({ params }: PageProps): JSX.Element {
  const t = useTranslations();
  const locale = useLocale() as AvailableLanguages;
  const { formatAmount } = useFormatter({ currency: 'SAT', locale });

  const round = parseInt(decodeURIComponent(params.number));

  // Context
  const { players } = useMassacre();
  const { currentRound, rounds, getMassacreByRoundIndex } = useContext(RoundsContext);
  const { currentBlock } = useMassacre();

  const [massacreRound, setMassacreRound] = useState<MassacreRoundType>(null);

  const roundStatus: RoundStatus = useMemo(() => {
    if (!currentRound) {
      return 'PENDING';
    }
    return currentRound.index === round ? 'ACTUAL' : currentBlock < rounds[round]!.height ? 'PENDING' : 'FINISHED';
  }, [currentRound, round, rounds, currentBlock]);

  const getMassacre = useCallback(async () => {
    const massacre = await getMassacreByRoundIndex(round);
    if (massacre)
      setMassacreRound({
        ...massacre,
        totalDistributedPower: (massacre.delta / 1000) * Object.keys(massacre.deadPlayers).length,
      });
  }, [round, roundStatus]);

  const renderMassacreTitle = (roundIndex: number) => {
    if (roundIndex === rounds.length - 1) return `${t('SEMIFINAL')}`;
    if (roundIndex === rounds.length) return `${t('FINAL')}`;

    return `${t('MASSACRE')} ${roundIndex}`;
  };

  useEffect(() => {
    if (roundStatus === 'FINISHED') getMassacre();
  }, [round, roundStatus]);

  return (
    <>
      <Navbar />
      <GameTime />
      <Divider y={16} />
      <Flex direction="column" align="center">
        <Container size="small">
          <Flex align="center">
            <Flex direction="column">
              <Heading as="h3">{renderMassacreTitle(round + 1)}</Heading>
              {(rounds || rounds[round]) && (
                <Text color={appTheme.colors.gray50}>#{formatAmount(rounds[round]?.height || 0)}</Text>
              )}
            </Flex>
            <Badge color={roundStatus === 'FINISHED' ? 'white' : roundStatus === 'ACTUAL' ? 'success' : 'warning'}>
              {roundStatus === 'FINISHED' ? t('FINISHED') : roundStatus === 'ACTUAL' ? t('IN_PROGRESS') : t('PENDING')}
            </Badge>
          </Flex>
        </Container>
        <Divider y={16} />
        <Container size="small">
          <Flex justify="space-between" gap={4}>
            <div>
              {round > 0 && (
                <Link href={`/massacre/${round - 1}`}>
                  <Button size="small" variant="borderless" disabled={round === 0}>
                    <Icon size={4}>
                      <ArrowLeft />
                    </Icon>
                    {renderMassacreTitle(round)}
                    {/* {t('MASSACRE')} {round} */}
                  </Button>
                </Link>
              )}
            </div>
            {round <= rounds.length - 2 && (
              <Link href={`/massacre/${round + 1}`}>
                <Button size="small" variant="borderless">
                  {renderMassacreTitle(round + 2)}
                  {/* {t('MASSACRE')} {round + 2} */}
                  <Icon size={4}>
                    <ArrowRight />
                  </Icon>
                </Button>
              </Link>
            )}
          </Flex>

          {/* {roundStatus === 'FINISHED' ? (
            <FinishedContent
              players={massacreRound?.players}
              deadPlayers={massacreRound?.deadPlayers}
              powerDistributedByPlayer={massacreRound?.delta}
              totalDistributedPower={massacreRound?.totalDistributedPower}
            />
          ) : roundStatus === 'PENDING' ? (
            <PendingContent survivals={rounds[round]?.survivors} round={round} />
          ) : (
            // ActualContent here
          )} */}
          <ActualContent
            currentBlock={currentBlock}
            freezeHeight={rounds[round]?.freezeHeight}
            players={players}
            round={round}
          />
        </Container>
      </Flex>
    </>
  );
}
