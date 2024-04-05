import { Container, Divider, Heading, Sheet, Text } from '@lawallet/ui';
import { useTranslations } from 'next-intl';

const tablaStyles: React.CSSProperties = {
  width: '80%',
  borderCollapse: 'collapse',
  margin: 'auto',
};
const thStyles: React.CSSProperties = {
  border: '1px solid #000000',
  padding: '8px',
  backgroundColor: '#f9f9f9',
  color: '#000000',
};
const tdStyles: React.CSSProperties = {
  border: '1px solid #000000',
  padding: '8px',
  backgroundColor: '#9b9b9b',
  color: '#000000',
  whiteSpace: 'nowrap',
};
const tdCenterStyles: React.CSSProperties = {
  borderLeft: '1px solid #000000',
  borderRight: '1px solid #000000',
  borderTop: '2px solid #FF0000',
  borderBottom: '2px solid #FF0000',
  padding: '8px',
  backgroundColor: '#9b9b9b',
  color: '#000000',
  whiteSpace: 'nowrap',
};

const listContainerStyles: React.CSSProperties = {
  textAlign: 'center',
};
const listOrderStyles: React.CSSProperties = {
  listStyleType: 'decimal',
  textAlign: 'left',
  display: 'block',
  margin: '0 auto',
  width: '400px',
  maxWidth: '100%',
};
const listUnorderStyles: React.CSSProperties = {
  listStyleType: 'disc',
  textAlign: 'left',
  display: 'block',
  margin: '0 auto',
  width: '400px',
  maxWidth: '100%',
};

const RulesSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const t = useTranslations();
  return (
    <Sheet title={''} isOpen={isOpen} closeText={t('CLOSE')} onClose={onClose}>
      <Container>
        <Heading as="h1" align="center">
          {t('RULES_OF_GAME')}
        </Heading>
        <Divider y={10} />
        <Text align="center">
          {t('SURVIVE')} <b>{t('ALL_ROUNDS').toUpperCase()}</b> {t('AND_GET')} <b>{t('BIG_TESOURY')}</b>.
        </Text>

        <Divider y={20} />

        <Heading as="h2" align="center">
          {t('SUMMARY')}:
        </Heading>
        <Divider y={10} />
        <Text align="center">
          {t('SUMMARY_DESC')}
          <Divider y={18} />
          <div style={listContainerStyles}>
            <ol style={listOrderStyles}>
              <li>{t('BUY_YOUR_TICKET')}.</li>
              <li>{t('ACCUMULATE_SATS')}.</li>
              <li>{t('SURVIVE_THE_MASSACRE')}.</li>
              <li>{t('ACCUMULATE_MORE_SATS')}.</li>
            </ol>
          </div>
        </Text>

        <Divider y={20} />

        <Heading as="h2" align="center">
          {t('HOW_TO_PLAY')}
        </Heading>
        <Divider y={10} />
        <Text align="center">
          <ul style={listUnorderStyles}>
            <li>{t('ENTER_THE_GAME')}.</li>
            <li>{t('BUY_TICKET_TO_PARTICIPATE')}.</li>
            <li>{t('ACCUMULATE_SATS')}.</li>
            <li>{t('BECOME_THE_WINNER')}</li>
          </ul>
        </Text>

        <Divider y={20} />

        <Heading as="h2" align="center">
          {t('WHAT_IS_POWER')}
        </Heading>
        <Divider y={10} />
        <Text align="center">
          <ul style={listUnorderStyles}>
            <li>{t('STRONG_OF_PLAYER')}.</li>
            <li>{t('INCREMENT_BY_ZAP')}.</li>
            <li>{t('PROBABILITY_OF_SURVIVE')}.</li>
          </ul>
        </Text>

        <Divider y={20} />

        <Heading as="h2" align="center">
          Massacres
        </Heading>
        <Divider y={10} />
        <Text align="center">
          {t('DIVIDE_PLAYERS_DESC')}
          {/* Cambiar X por la cantidad de bloques que pactemos */}
          <ul style={listUnorderStyles}>
            <li>{t('MASSACRE_DESC_1')}</li>
            <li>{t('MASSACRE_DESC_2')}</li>
            <li>{t('MASSACRE_DESC_3')}</li>
          </ul>
        </Text>

        <Divider y={20} />

        <Heading as="h2" align="center">
          {t('PLAYERS')}
        </Heading>
        <Divider y={10} />
        <Heading as="h3" align="center">
          {t('SURVIVORS')}
        </Heading>
        <Divider y={10} />
        <Text align="center">
          <ul style={listUnorderStyles}>
            <li>{t('ADDING_MORE_POWER')}</li>
            <li>{t('RECEIVED_MASSACRED_POWER')}</li>
          </ul>
        </Text>
        <Divider y={10} />
        <Heading as="h3" align="center">
          Massacrados
        </Heading>
        <Divider y={10} />
        <Text align="center">
          <ul style={listUnorderStyles}>
            <li>{t('MASSACRED_DESC_1')}</li>
            <li>{t('MASSACRED_DESC_2')}</li>
            <li>{t('MASSACRED_DESC_3')}</li>
          </ul>
        </Text>

        <Divider y={20} />

        <Heading as="h2" align="center">
          {t('WINNERS')}
        </Heading>
        <Divider y={10} />
        <Text align="center">
          {t('WINNERS_DESC_1')}
          <br></br>
          {t('WINNERS_DESC_2')}
          <br></br>
          <br></br>
          {t('TESOURY_DISTRIBUTION')}
          <ul style={listUnorderStyles}>
            <li>
              <b>50%</b> {t('FOR_THE_WINNER')}. <i>({t('DISTRIBUTION_DESC_1')})</i>
            </li>
            <li>
              <b>25%</b> {t('FOR_THE_LOSERS_1')}
              <i>({t('DISTRIBUTION_DESC_2')})</i>
            </li>
            <li>
              <b>12,5%</b> {t('FOR_THE_LOSERS_2')} <i>({t('DISTRIBUTION_DESC_3')})</i>
            </li>
          </ul>
          <blockquote
            style={{
              backgroundColor: 'rgba(198, 188, 193, 0.16)',
              display: 'inline-block',
              margin: 'auto',
            }}
          >
            {t('DISTRIBUTION_DESC_FINAL')}
          </blockquote>
          <br></br>
          <br></br>
          {t('RULES_TABLE_TITLE')}
          <br></br>
          <b>A, B y C:</b> {t('REPRESENT_PLAYERS')}
          <br></br>
          {t('THE_RED_LINE')}
          <table style={tablaStyles}>
            <thead>
              <tr>
                <th style={thStyles}>{t('TESOURY_PERCENTAGE')}</th>
                <th style={thStyles}>{t('PLAYERS')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={thStyles}>{t('WINNER')}: 50%</th>
                <td style={tdStyles}>A</td>
              </tr>
              <tr>
                <th style={thStyles}>{t('FINAL')}: 25%</th>
                <td style={tdCenterStyles}>B B A</td>
              </tr>
              <tr>
                <th style={thStyles}>{t('SEMIFINAL')}: 12,5%</th>
                <td style={tdStyles}>C C C C B B A</td>
              </tr>
            </tbody>
          </table>
        </Text>

        <Divider y={20} />

        <Heading as="h2" align="center">
          {t('CLEAN_GAME')}
        </Heading>
        <Divider y={10} />
        <Text align="center">
          {t('CLEAN_GAME_DESC')}{' '}
          {/* Tenemos alguna relay/lugar/forma de que cualquier persona pueda ver de forma facil las transacciones? */}
        </Text>

        <Divider y={20} />

        <Heading as="h2" align="center">
          {t('TRANSACTION_COST')}
        </Heading>
        <Divider y={10} />
        <Text align="center">{t('TRANSACTION_COST_DESC')}</Text>

        <Divider y={20} />

        <Heading as="h1" align="center">
          {t('TO_PLAY')}
        </Heading>
      </Container>
    </Sheet>
  );
};

export default RulesSheet;
