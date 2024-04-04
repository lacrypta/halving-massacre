import { Container, Divider, Heading, Sheet, Text } from '@lawallet/ui';
import { useTranslations } from 'next-intl';

const RulesSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const t = useTranslations();

  return (
    <Sheet title={''} isOpen={isOpen} closeText={t('CLOSE')} onClose={onClose}>
      <Heading as="h3" align="center">
        {t('RULES_OF_GAME')}
      </Heading>
      <Divider y={20} />
      <Container>
        <Text align="center" isBold>
          {t('LN_ADDRESS_DESC_1')}
        </Text>

        <Divider y={20} />

        <Text align="center">
          {t('TICKET_COST')} <b>210 sats</b> ({t('ONLY_THIS_TIME')}).
        </Text>
        <Divider y={20} />
        <Text align="center">
          {t('YOU_ARE_ADDED')} <b>{t('ONE_POWER_SAT')}</b>
        </Text>
        <Divider y={20} />
        <Text align="center">{t('CAN_CONTINUE_ADDING_POWER')}</Text>
      </Container>
    </Sheet>
  );
};

export default RulesSheet;
