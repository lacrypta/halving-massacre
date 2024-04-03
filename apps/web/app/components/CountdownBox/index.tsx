import { Flex, Heading, Text } from '@lawallet/ui';
import { NumbersBox } from '../Countdown/style';
import { useEffect, useState } from 'react';

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

interface CountdownBoxProps {
  targetDate: Date;
}

export default function CountdownBox({ targetDate }: CountdownBoxProps) {
  const [counterInfo, setCounterInfo] = useState<CounterType>(defaultCounter);

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout>();

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
    setTimerInterval(setInterval(calculateTimeLeft, 1000));

    return () => clearInterval(timerInterval);
  }, []);

  return (
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
  );
}
