import { Button, Container, Divider, Flex, Sheet, Text } from '@lawallet/ui';
import Link from 'next/link';
import { appTheme } from '@/../config/exports';
import { useTranslations } from 'next-intl';

const LightingAddressSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const t = useTranslations();

  return (
    <Sheet title={t('WHAT_IS_LN_ADDRESS')} isOpen={isOpen} closeText={t('CLOSE')} onClose={onClose}>
      <Container>
        <Text isBold>{t('LN_ADDRESS_DESC_1')}</Text>

        <Divider y={16} />

        <Text>{t('LN_ADDRESS_DESC_2')}</Text>

        <Divider y={16} />

        <Flex direction="column" justify="center" align="center" gap={4}>
          <Text color={appTheme.colors.gray50} size="small">
            {t('EXAMPLE')}:
          </Text>
          <Flex justify="center">
            <Text isBold>{t('LN_ADDRESS_EXAMPLE')}</Text>
            <Text isBold color={appTheme.colors.primary}>
              @lawallet.ar
            </Text>
          </Flex>
        </Flex>

        <Divider y={16} />

        <Flex direction="column" align="center">
          <Link href="https://app.lawallet.ar/signup" rel="noopener noreferrer" target="_blank">
            <Button>{t('GET_LN_ADDRESS')}</Button>
          </Link>
        </Flex>
      </Container>
    </Sheet>
  );
};

export default LightingAddressSheet;
