// Libraries
import { useEffect, useState } from 'react';
import { ActionSheet, Button } from '@lawallet/ui';

// Theme
import { useTranslations } from 'next-intl';

// Types
import PowerOnchain from './PowerOnchain';
import PowerLightning from './PowerLightning';

type InvoiceInfoProps = {
  pr: string;
  expiry: Date | null;
};

const AddPowerSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const t = useTranslations();
  const [title, setTitle] = useState<null | string>(null);
  const [description, setDescription] = useState<null | string>(null);
  const [typePower, setTypePower] = useState<null | string>(null);

  const restartModal = () => {
    setTitle(null);
    setDescription(null);
    setTypePower(null);
    onClose();
  };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  return (
    <ActionSheet
      isOpen={isOpen}
      title={title || t('ADD_POWER')}
      description={description || t('ADD_POWER_DESC')}
      onClose={restartModal}
      cancelText={typePower ? t('CANCEL') : t('CLOSE')}
    >
      {!typePower && (
        <>
          <Button variant="bezeled" onClick={() => setTypePower('lightning')}>
            Lightning
          </Button>
          <Button variant="bezeled" onClick={() => setTypePower('onchain')}>
            Onchain
          </Button>
        </>
      )}

      {typePower === 'lightning' && (
        <PowerLightning changeTitle={handleChangeTitle} changeDescription={handleChangeDescription} />
      )}
      {typePower === 'onchain' && (
        <PowerOnchain changeTitle={handleChangeTitle} changeDescription={handleChangeDescription} />
      )}
    </ActionSheet>
  );
};

export default AddPowerSheet;
