import { Flex, Divider, Text } from '@lawallet/ui';

import { appTheme } from '../../../../config/exports';

import { Icon } from '../Icon';

import { ItemTxsStyle, IconStyle, MessageStyle, IndicatorStyle } from './style';
import type { ReactNode } from 'react';

interface MessageTxsProps {
  message?: string;
  icon: ReactNode;
  text: string;
  value?: number;
  type?: 'undefined' | 'power';
}

export function ItemTxs(props: MessageTxsProps) {
  const { icon, text, value = 0, message = '', type = 'undefined' } = props;

  return (
    <ItemTxsStyle>
      <Flex align="center" justify="space-between" gap={8}>
        <Flex align="center" gap={8}>
          {icon && (
            <IconStyle>
              <Icon size={4}>{icon}</Icon>
            </IconStyle>
          )}
          <Text size="small">{text}</Text>
        </Flex>
        {type === 'power' && <Text color={appTheme.colors.gray50}>+{value / 1000}</Text>}
      </Flex>
      {message && (
        <MessageStyle>
          <div>
            <IndicatorStyle />
          </div>
          <Flex flex={1}>
            <Text>{message}</Text>
          </Flex>
        </MessageStyle>
      )}
      <Divider y={12} />
    </ItemTxsStyle>
  );
}
