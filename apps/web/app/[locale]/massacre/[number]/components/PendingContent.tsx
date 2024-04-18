import Card from '@/[locale]/components/Card';
import { Divider, Flex, Heading, Text } from '@lawallet/ui';
import { useTranslations } from 'next-intl';
import { appTheme } from '../../../../../config/exports';

type PendingContentProps = {
  survivals?: number;
};

const PendingContent = ({ survivals }: PendingContentProps) => {
  const t = useTranslations();

  return (
    <>
      <Divider y={16} />
      <Card size="small">
        <Flex>
          <Heading>{survivals}</Heading>
          <Text size="small">{t('SURVIVORS').toLowerCase()}</Text>
        </Flex>
      </Card>

      <Divider y={16} />

      <Text size="small" color={appTheme.colors.gray50}>
        {t('WAITING_PLAYERS_LIST')}
      </Text>
    </>
  );
};

export default PendingContent;
