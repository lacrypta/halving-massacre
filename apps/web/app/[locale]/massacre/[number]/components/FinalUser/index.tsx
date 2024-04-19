import { Flex, Divider, Heading, Text } from '@lawallet/ui';

import { appTheme } from '../../../../../../config/exports';

import { formatAmount } from '../../../../../../lib/utils';

import { AutoAvatar } from '@/[locale]/components/AutoAvatar';
import { Icon } from '@/[locale]/components/Icon';
import { Shield } from '@/[locale]/components/Icons';
import { QRStyled } from '@/[locale]/components/QRCode';

import { FinalUserStyle } from './style';

interface FinalUserProps {
  walias: string;
  value: number;
  showQr: boolean;
  variant: 'primary' | 'secondary';
}

export function FinalUser(props: FinalUserProps) {
  const { walias, value, showQr, variant } = props;

  return (
    <FinalUserStyle $showQr={showQr}>
      <Flex direction="column" align="center">
        <AutoAvatar walias={walias} size={20} />
        <Divider y={12} />
        <Text align="center">{walias}</Text>
        <Divider y={8} />
        <Flex align="center" gap={4} justify="center">
          <Heading as="h4" color={appTheme.colors[variant]}>
            {formatAmount(value)}
          </Heading>
          <Icon size={4}>
            <Shield color={appTheme.colors[variant]} />
          </Icon>
        </Flex>
      </Flex>

      {showQr && <QRStyled size={150} value={walias} />}
    </FinalUserStyle>
  );
}
