import type { ReactNode } from 'react';

import { TabPanelStyle } from './style';

interface TabPanelProps {
  children: ReactNode;
  show?: boolean;
}

export function TabPanel(props: TabPanelProps) {
  const { children, show = false } = props;

  return <TabPanelStyle $show={show}>{children}</TabPanelStyle>;
}
