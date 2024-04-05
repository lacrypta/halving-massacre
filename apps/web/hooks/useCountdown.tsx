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
  loading: boolean;
};

const defaultCounter: CounterType = {
  time: 0,
  formatted: {
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0',
  },
  loading: false,
};

export const formatTime = (time: number): FormattedCountdown => {
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

type UseCountdownProps = { targetDate: Date; onFinish?: () => void };

export const useCountdown = ({ targetDate, onFinish }: UseCountdownProps) => {
  const [counterInfo, setCounterInfo] = useState<CounterType>({ ...defaultCounter, loading: true });
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout>();

  const calculateTimeLeft = (date: Date) => {
    const difference = +date - Date.now();
    if (difference > 0) {
      const timeLeftInSeconds = Math.floor(difference / 1000);
      setCounterInfo({ time: timeLeftInSeconds, formatted: formatTime(timeLeftInSeconds), loading: false });
    } else {
      stopCountdown();
    }
  };

  const startCountdown = (date: Date) => {
    calculateTimeLeft(date);
    setTimerInterval(setInterval(() => calculateTimeLeft(date), 1000));
  };

  const stopCountdown = () => {
    clearInterval(timerInterval);
    setCounterInfo(defaultCounter);

    if (onFinish) onFinish();
  };

  useEffect(() => {
    startCountdown(targetDate);
    setTimerInterval(setInterval(() => calculateTimeLeft(targetDate), 1000));

    return () => clearInterval(timerInterval);
  }, []);

  return { counterInfo };
};
