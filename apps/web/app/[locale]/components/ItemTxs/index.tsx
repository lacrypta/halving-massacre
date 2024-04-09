import type { ReactNode } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { es } from 'date-fns/locale/es';
import { Divider, Flex, Text } from '@lawallet/ui';
import { formatToPreference } from '@lawallet/utils';
import type { AvailableLanguages } from '@lawallet/utils/types';

import { appTheme } from '../../../../config/exports';

import { Icon } from '../Icon';
import { AutoAvatar } from '../AutoAvatar';

import { formatDistanceEN } from '../../../../utils/formatDistance/formatDistanceEN';
import { formatDistanceES } from '../../../../utils/formatDistance/formatDistanceES';
import { useRouter } from '../../../../navigation';

import { IconStyle, IndicatorStyle, ItemTxsStyle, MessageStyle } from './style';

interface MessageTxsProps {
  message?: string;
  icon?: ReactNode;
  walias?: string;
  time?: number;
  text?: string;
  value?: number;
  type?: 'undefined' | 'power' | 'last-zap';
  href?: string;
}

const DEFAULT_BUY_TICKET_MESSAGE = 'Your first power!';

export function ItemTxs(props: MessageTxsProps) {
  const { icon, walias = '', time, text, value = 0, message = '', type = 'undefined', href = '' } = props;
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  return (
    <ItemTxsStyle>
      <Flex align="center" justify="space-between" gap={8}>
        <Flex align="center" gap={8}>
          {walias ? (
            <Link href={`/profile/${walias}`} title={walias}>
              <AutoAvatar walias={walias} size={7} />
            </Link>
          ) : (
            icon && (
              <IconStyle>
                <Icon size={4}>{icon}</Icon>
              </IconStyle>
            )
          )}
          {type === 'last-zap' ? (
            <Flex direction="column" onClick={() => router.push(`/profile/${walias}`)}>
              <Link href={`/profile/${walias}`} title={walias}>
                <Text>{walias}</Text>
              </Link>
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
