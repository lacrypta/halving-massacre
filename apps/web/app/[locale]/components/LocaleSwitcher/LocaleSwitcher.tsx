// Libraries
import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button, Flex, Sheet, Container, Text } from '@lawallet/ui';

// New ui-components
import { Radio } from '../Radio';

// Theme
import { appTheme } from '../../../../config/exports';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  const [sheetLanguage, setSheetLanguage] = useState<boolean>(false);

  function changeLanguage(nextLocale: string) {
    startTransition(() => {
      const expire = new Date(Date.now() + 86400 * 365 * 1000).toUTCString();
      document.cookie = `NEXT_LOCALE=${nextLocale}; expires=${expire}; path=/`;
      window.location.reload();
    });
  }

  return (
    <>
      <Flex align="center" justify="end" gap={8} flex={0}>
        <Text size="small" color={appTheme.colors.gray50}>
          {t('LANGUAGE')}:
        </Text>
        <Button size="small" variant="bezeled" onClick={() => setSheetLanguage(!sheetLanguage)}>
          {locale.toLocaleUpperCase()}
        </Button>
      </Flex>

      <Sheet
        title={t('CHANGE_LANGUAGE')}
        isOpen={sheetLanguage}
        closeText={t('CLOSE')}
        onClose={() => setSheetLanguage(false)}
      >
        <Container>
          <Flex direction="column" flex={1}>
            <Radio
              text={t('ENGLISH')}
              checked={locale === 'en'}
              onClick={() => {
                if (locale !== 'en') changeLanguage('en');
              }}
            />

            <Radio
              text={t('SPANISH')}
              checked={locale === 'es'}
              onClick={() => {
                if (locale !== 'es') changeLanguage('es');
              }}
            />
          </Flex>
        </Container>
      </Sheet>
    </>
  );
}
