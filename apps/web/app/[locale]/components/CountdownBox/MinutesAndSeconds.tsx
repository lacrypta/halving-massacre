import React from 'react';
import { useCountdown } from '../../../../hooks/useCountdown';

type CountMinAndSecProps = { date: Date; onFinish?: () => void };

const CountMinAndSec = ({ date, onFinish }: CountMinAndSecProps) => {
  const { counterInfo } = useCountdown({ targetDate: date, onFinish });

  return (
    <>
      {counterInfo.formatted.minutes}:{counterInfo.formatted.seconds}
    </>
  );
};

export default CountMinAndSec;
