import { Text } from '@lawallet/ui';

import { ProgressPrimitive, Value, TextValue } from './style';

export interface ProgressProps {
  value: Number;
}

export default function Progress(props: ProgressProps) {
  const { value } = props;

  return (
    <ProgressPrimitive>
      <Value $width={value} />
      <TextValue>
        <Text isBold>{value}%</Text>
      </TextValue>
    </ProgressPrimitive>
  );
}
