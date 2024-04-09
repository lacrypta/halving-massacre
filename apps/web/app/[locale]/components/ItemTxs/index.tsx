import { Divider, Flex, Text } from '@lawallet/ui';

import { appTheme } from '../../../../config/exports';

import { Icon } from '../Icon';

import { formatToPreference } from '@lawallet/utils';
import type { AvailableLanguages } from '@lawallet/utils/types';
import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { es } from 'date-fns/locale/es';
import { useLocale, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { formatDistanceEN } from '../../../../utils/formatDistance/formatDistanceEN';
import { formatDistanceES } from '../../../../utils/formatDistance/formatDistanceES';
import { AutoAvatar } from '../AutoAvatar';
import { IconStyle, IndicatorStyle, ItemTxsStyle, MessageStyle } from './style';
import { useRouter } from '../../../../navigation';

interface MessageTxsProps {
  message?: string;
  icon?: ReactNode;
  walias?: string;
  time?: number;
  text?: string;
  value?: number;
  type?: 'undefined' | 'power' | 'last-zap';
}

const DEFAULT_BUY_TICKET_MESSAGE = 'Your first power!';

export function ItemTxs(props: MessageTxsProps) {
  const { icon, walias = '', time, text, value = 0, message = '', type = 'undefined' } = props;
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

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
            <Flex direction="column" onClick={() => router.push(`/profile/${walias}`)}>
              <Text>{walias}</Text>
              <Text size="small" color={appTheme.colors.gray50}>
                {/* {dateFormatter(locale as AvailableLanguages, new Date(time!))} */}
                {formatDistance(new Date(time!), Date.now(), {
                  locale:
                    locale === 'es'
                      ? { ...es, formatDistance: formatDistanceES }
                      : { ...enUS, formatDistance: formatDistanceEN },
                })}
              </Text>
            </Flex>
          ) : (
            <Text size="small">{text}</Text>
          )}
        </Flex>
        {type !== 'undefined' && (
          <Text color={appTheme.colors.primary}>
            +{formatToPreference('SAT', value / 1000, locale as AvailableLanguages)}
          </Text>
        )}
      </Flex>
      {message && (
        <MessageStyle>
          <div>
            <IndicatorStyle />
          </div>
          <Flex flex={1}>
            <Text>{message === DEFAULT_BUY_TICKET_MESSAGE ? t('BUY_FIRST_TICKET') : message}</Text>
          </Flex>
        </MessageStyle>
      )}
      <Divider y={12} />
    </ItemTxsStyle>
  );
}
