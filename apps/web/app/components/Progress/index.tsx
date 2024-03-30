import { ProgressPrimitive, Value } from './style';

export interface ProgressProps {
  value: number;
}

export default function Progress(props: ProgressProps) {
  const { value } = props;

  return (
    <ProgressPrimitive>
      <Value $width={value} />
    </ProgressPrimitive>
  );
}
