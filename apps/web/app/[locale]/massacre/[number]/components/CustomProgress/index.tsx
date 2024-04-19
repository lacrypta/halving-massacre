import { Text } from '@lawallet/ui';

import { CustomProgressStyle, ValueStyle } from './style';

interface CustomProgressProps {
  valueOne: number;
  valueTwo: number;
}

export function CustomProgress(props: CustomProgressProps) {
  const { valueOne, valueTwo } = props;

  return (
    <CustomProgressStyle>
      <ValueStyle $width={valueOne}>
        <Text size="small" isBold>
          {valueOne}%
        </Text>
      </ValueStyle>
      <ValueStyle $width={valueTwo}>
        <Text size="small" isBold>
          {valueTwo}%
        </Text>
      </ValueStyle>
    </CustomProgressStyle>
  );
}
