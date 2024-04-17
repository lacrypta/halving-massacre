import { Text } from '@lawallet/ui';

import { ProgressPrimitive, Value, TextValue } from './style';

export interface ProgressProps {
  value: number;
}

export default function Progress(props: ProgressProps) {
  const { value } = props;

  return (
    <ProgressPrimitive>
      <Value $width={value} />
      <TextValue>
        <Text isBold>{Number(value.toFixed(2))}%</Text>
      </TextValue>
    </ProgressPrimitive>
  );
}
