import React from 'react';
import { useCountdown } from '../../../../hooks/useCountdown';

const CountMinAndSec = ({ date }: { date: Date }) => {
  const { counterInfo } = useCountdown({ targetDate: date });

  return (
    <>
      {counterInfo.formatted.minutes}:{counterInfo.formatted.seconds}
    </>
  );
};

export default CountMinAndSec;
