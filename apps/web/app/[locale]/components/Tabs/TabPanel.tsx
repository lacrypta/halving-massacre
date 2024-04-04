import type { ReactNode } from 'react';
import { Flex } from '@lawallet/ui';

import { TabPanelStyle } from './style';

interface TabPanelProps {
  children: ReactNode;
  show?: boolean;
}

export function TabPanel(props: TabPanelProps) {
  const { children, show = false } = props;

  return (
    <TabPanelStyle $show={show}>
      <Flex direction="column" flex={1}>
        {children}
      </Flex>
    </TabPanelStyle>
  );
}
