import type { ReactNode } from 'react';

import { TabListStyle } from './style';

interface TabListProps {
  children: ReactNode;
}

export function TabList(props: TabListProps) {
  const { children } = props;

  return <TabListStyle>{children}</TabListStyle>;
}
