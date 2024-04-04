// Libraries
import React from 'react';
import { Text } from '@lawallet/ui';

// Styles
import { CheckDiv, RadioItem, RadioContainer, RadioInput } from './styles';

interface RadioProps {
  text: string;
  checked: boolean;
  onClick: () => void;
}

export function Radio(props: RadioProps) {
  const { text, checked, onClick } = props;

  return (
    <RadioContainer>
      <RadioItem onClick={onClick}>
        <Text>{text}</Text>
        <RadioInput type="radio" onChange={() => null} name="date-time" checked={checked} />
        <CheckDiv checked={checked}></CheckDiv>
      </RadioItem>
    </RadioContainer>
  );
}
