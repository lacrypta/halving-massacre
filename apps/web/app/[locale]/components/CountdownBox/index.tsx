import { Flex, Heading, Text } from '@lawallet/ui';
import { NumbersBox } from '../Countdown/style';
import { useTranslations } from 'next-intl';
import { useCountdown } from '../../../../hooks/useCountdown';

interface CountdownBoxProps {
  targetDate: Date;
}

export default function CountdownBox({ targetDate }: CountdownBoxProps) {
  const { counterInfo } = useCountdown({ targetDate });
  const t = useTranslations();

  // if (counterInfo.loading)
  //   return (
  //     <Flex justify="center">
  //       <Loader />
  //     </Flex>
  //   );

  return (
    <NumbersBox>
      <Flex direction="column" align="center">
        <Heading as="h2">{counterInfo.formatted.days}</Heading>
        <Text>{t('DAYS')}</Text>
      </Flex>
      <Flex direction="column" align="center">
        <Heading as="h2">{counterInfo.formatted.hours}</Heading>
        <Text>{t('HOURS')}</Text>
      </Flex>
      <Flex direction="column" align="center">
        <Heading as="h2">{counterInfo.formatted.minutes}</Heading>
        <Text>{t('MINUTES')}</Text>
      </Flex>
      <Flex direction="column" align="center">
        <Heading as="h2">{counterInfo.formatted.seconds}</Heading>
        <Text>{t('SECONDS')}</Text>
      </Flex>
    </NumbersBox>
  );
}
