import type { ReactNode } from 'react';
import { Button } from '@lawallet/ui';

import { TabStyle } from './style';

interface TabProps {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  // Valor opcional
  onClick?: () => void;
}

export function Tab(props: TabProps) {
  const { children, active = false, disabled = false } = props;

  return (
    <TabStyle $active={active}>
      <Button disabled={disabled} size="small" variant="borderless">
        {children}
      </Button>
    </TabStyle>
  );
}
