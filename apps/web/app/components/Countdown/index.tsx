import { Button, Divider, Flex, Heading, Input, Loader, Text } from '@lawallet/ui';
import { useCallback, useEffect, useState } from 'react';

import { appTheme } from '../../../config/exports';

import { useRouter } from 'next/navigation';
import { useActionOnKeypress } from '../../../hooks/useActionOnKeypress';
import Link from '../Icons/Link';
import LightingAddressSheet from '../InscriptionSheet/LightingAddressSheet';
import { CountdownPrimitive, NumbersBox } from './style';

let timerInterval: NodeJS.Timeout;

type FormattedCountdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type CounterType = {
  time: number;
  formatted: FormattedCountdown;
};

const targetDate: Date = new Date('2024-04-13T12:00:00');

const defaultCounter: CounterType = {
  time: 0,
  formatted: {
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0',
  },
};

const formatTime = (time: number): FormattedCountdown => {
  const days: number = Math.floor(time / (3600 * 24));
  time -= days * 3600 * 24;
  const hours: number = Math.floor(time / 3600);
  time -= hours * 3600;
  const minutes: number = Math.floor(time / 60);
  const seconds: number = Math.floor(time - minutes * 60);

  const formattedDays: string = days < 10 ? '0' + days : String(days);
  const formattedHours: string = hours < 10 ? '0' + hours : String(hours);
  const formattedMinutes: string = minutes < 10 ? '0' + minutes : String(minutes);
  const formattedSeconds: string = seconds < 10 ? '0' + seconds : String(seconds);

  return {
    days: formattedDays,
    hours: formattedHours,
    minutes: formattedMinutes,
    seconds: formattedSeconds,
  };
};

export default function Countdown() {
  const router = useRouter();
  const [walias, setWalias] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setError] = useState<string>();
  const [openLNInfo, setOpenLNInfo] = useState(false);

  const [counterInfo, setCounterInfo] = useState<CounterType>(defaultCounter);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - Date.now();
      if (difference > 0) {
        const timeLeftInSeconds = Math.floor(difference / 1000);
        setCounterInfo({ time: timeLeftInSeconds, formatted: formatTime(timeLeftInSeconds) });
      } else {
        clearInterval(timerInterval);
        setCounterInfo(defaultCounter);
      }
    };

    calculateTimeLeft();
    timerInterval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const checkValidLightningAddress = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        if (walias === '') {
          setIsLoading(false);
          throw new Error('Debe ingresar un Lightning Address valido');
        }
        router.push(`/profile/${walias}`);
      } catch (error: unknown) {
        setIsLoading(false);
        setError((error as Error).message);
      }
    }, 2000);
  }, [walias]);

  useActionOnKeypress('Enter', checkValidLightningAddress, [walias]);

  return (
    <>
      <CountdownPrimitive>
        <Text size="small" align="center" color={appTheme.colors.gray50}>
          Cierre de inscripcion en
        </Text>
        <Divider y={8} />
        <NumbersBox>
          <Flex direction="column" align="center">
            <Heading as="h2">{counterInfo.formatted.days}</Heading>
            <Text>Dias</Text>
          </Flex>
          <Flex direction="column" align="center">
            <Heading as="h2">{counterInfo.formatted.hours}</Heading>
            <Text>Hrs</Text>
          </Flex>
          <Flex direction="column" align="center">
            <Heading as="h2">{counterInfo.formatted.minutes}</Heading>
            <Text>Min</Text>
          </Flex>
          <Flex direction="column" align="center">
            <Heading as="h2">{counterInfo.formatted.seconds}</Heading>
            <Text>Secs</Text>
          </Flex>
        </NumbersBox>
        <Divider y={8} />
        <Input
          disabled={isLoading}
          value={walias}
          onChange={(e) => setWalias(e.target.value)}
          type="email"
          placeholder="Lightning Address"
        />
        <Divider y={8} />
        <Flex>
          {isLoading ? <Loader /> : <Button onClick={() => checkValidLightningAddress()}>Anotarme ahora</Button>}
        </Flex>
        <Divider y={4} />
        <Flex>
          <Button variant="borderless" onClick={() => setOpenLNInfo(true)}>
            ¿Qué es esto? <Link />
          </Button>
        </Flex>
      </CountdownPrimitive>

      <LightingAddressSheet isOpen={openLNInfo} onClose={() => setOpenLNInfo(false)} />
    </>
  );
}
