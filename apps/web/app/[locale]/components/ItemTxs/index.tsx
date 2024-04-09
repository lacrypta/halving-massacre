import { Flex, Divider, Text } from '@lawallet/ui';

import { appTheme } from '../../../../config/exports';

import { Icon } from '../Icon';

import { ItemTxsStyle, IconStyle, MessageStyle, IndicatorStyle } from './style';
import type { ReactNode } from 'react';
import { AutoAvatar } from '../AutoAvatar';

interface MessageTxsProps {
  message?: string;
  icon?: ReactNode;
  walias?: string;
  time?: string;
  text?: string;
  value?: number;
  type?: 'undefined' | 'power' | 'last-zap';
}

export function ItemTxs(props: MessageTxsProps) {
  const { icon, walias = '', time, text, value = 0, message = '', type = 'undefined' } = props;

  return (
    <ItemTxsStyle>
      <Flex align="center" justify="space-between" gap={8}>
        <Flex align="center" gap={8}>
          {walias ? (
            <AutoAvatar walias={walias} size={7} />
          ) : (
            icon && (
              <IconStyle>
                <Icon size={4}>{icon}</Icon>
              </IconStyle>
            )
          )}
          {type === 'last-zap' ? (
            <Flex direction="column">
              <Text>{walias}</Text>
              <Text size="small" color={appTheme.colors.gray50}>
                {'Hace 2 minutos'}
              </Text>
            </Flex>
          ) : (
            <Text size="small">{text}</Text>
          )}
        </Flex>
        {type !== 'undefined' && <Text color={appTheme.colors.primary}>+{value / 1000}</Text>}
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
