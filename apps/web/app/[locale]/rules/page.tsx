'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container, Divider, Flex, Heading, Text } from '@lawallet/ui';

import { appTheme } from '@/../config/exports';

import { Navbar } from '../components/Navbar';

import pngIso from '../../../public/images/iso.png';

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
const listOrderStyles: React.CSSProperties = {
  width: '100%',
  listStyleType: 'decimal',
  textAlign: 'left',
  margin: '0 auto',
  paddingLeft: '48px',
};
const listUnorderStyles: React.CSSProperties = {
  width: '100%',
  listStyleType: 'disc',
  margin: '0 auto',
  paddingLeft: '48px',
};

export default function Page(): JSX.Element {
  const t = useTranslations();

  return (
    <>
      <Navbar>
        <Image width={23} height={30} alt="Halving Massacre by La Crypta" src={pngIso.src} />
      </Navbar>
      <Divider y={16} />
      <Container>
        <Heading>{t('RULES_OF_GAME')}</Heading>
        <Divider y={10} />
        <Text>
          {t('SURVIVE')} <b>{t('ALL_ROUNDS').toUpperCase()}</b> {t('AND_GET')} <b>{t('BIG_TESOURY')}</b>.
        </Text>
        <Divider y={20} />
        <Heading as="h2">{t('SUMMARY')}:</Heading>
        <Divider y={10} />
        <Text>{t('SUMMARY_DESC')}</Text>
        <Divider y={10} />
        <ol style={listOrderStyles}>
          <li>
            <Text>{t('BUY_YOUR_TICKET')}.</Text>
          </li>
          <li>
            <Text>{t('ACCUMULATE_SATS')}.</Text>
          </li>
          <li>
            <Text>{t('SURVIVE_THE_MASSACRE')}.</Text>
          </li>
          <li>
            <Text>{t('ACCUMULATE_MORE_SATS')}.</Text>
          </li>
        </ol>
        <Divider y={20} />
        <Heading as="h2">{t('HOW_TO_PLAY')}</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>{t('ENTER_THE_GAME')}.</Text>
          </li>
          <li>
            <Text>{t('BUY_TICKET_TO_PARTICIPATE')}.</Text>
          </li>
          <li>
            <Text>{t('ACCUMULATE_SATS')}.</Text>
          </li>
          <li>
            <Text>{t('BECOME_THE_WINNER')}</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">{t('WHAT_IS_POWER')}</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>{t('STRONG_OF_PLAYER')}.</Text>
          </li>
          <li>
            <Text>{t('INCREMENT_BY_ZAP')}.</Text>
          </li>
          <li>
            <Text>{t('PROBABILITY_OF_SURVIVE')}.</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">Massacres</Heading>
        <Divider y={10} />
        <Text>{t('DIVIDE_PLAYERS_DESC')}</Text>
        <Divider y={10} />
        {/* Cambiar X por la cantidad de bloques que pactemos */}
        <ul style={listUnorderStyles}>
          <li>
            <Text>{t('MASSACRE_DESC_1')}</Text>
          </li>
          <li>
            <Text>{t('MASSACRE_DESC_2')}</Text>
          </li>
          <li>
            <Text>{t('MASSACRE_DESC_3')}</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">{t('PLAYERS')}</Heading>
        <Divider y={20} />
        <Heading as="h3">{t('SURVIVORS')}</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>{t('ADDING_MORE_POWER')}</Text>
          </li>
          <li>
            <Text>{t('RECEIVED_MASSACRED_POWER')}</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h3">Massacrados</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>{t('MASSACRED_DESC_1')}</Text>
          </li>
          <li>
            <Text>{t('MASSACRED_DESC_2')}</Text>
          </li>
          <li>
            <Text>{t('MASSACRED_DESC_3')}</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">{t('WINNERS')}</Heading>
        <Divider y={10} />
        <Text>{t('WINNERS_DESC_1')}</Text>
        <Divider y={10} />
        <Text>{t('WINNERS_DESC_2')}</Text>
        <Divider y={20} />
        <Text>{t('TESOURY_DISTRIBUTION')}</Text>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>
              <b>50%</b> {t('FOR_THE_WINNER')}. <i>({t('DISTRIBUTION_DESC_1')})</i>
            </Text>
          </li>
          <li>
            <Text>
              <b>25%</b> {t('FOR_THE_LOSERS_1')}
              <i>({t('DISTRIBUTION_DESC_2')})</i>
            </Text>
          </li>
          <li>
            <Text>
              <b>12,5%</b> {t('FOR_THE_LOSERS_2')} <i>({t('DISTRIBUTION_DESC_3')})</i>
            </Text>
          </li>
        </ul>
        <Divider y={20} />
        <blockquote
          style={{
            backgroundColor: 'rgba(198, 188, 193, 0.16)',
            display: 'inline-block',
            margin: 'auto',
          }}
        >
          {t('DISTRIBUTION_DESC_FINAL')}
        </blockquote>
        <Divider y={20} />
        <Text>{t('RULES_TABLE_TITLE')}</Text>
        <Divider y={10} />
        <Text>
          <b>A, B y C:</b> {t('REPRESENT_PLAYERS')}
        </Text>
        <Divider y={10} />
        <Text>{t('THE_RED_LINE')}</Text>
        <Divider y={10} />
        <table style={tablaStyles}>
          <thead>
            <tr>
              <th style={thStyles}>
                <Text>{t('TESOURY_PERCENTAGE')}</Text>
              </th>
              <th style={thStyles}>
                <Text>{t('PLAYERS')}</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th style={thStyles}>
                <Text>{t('WINNER')}: 50%</Text>
              </th>
              <td style={tdStyles}>
                <Text>A</Text>
              </td>
            </tr>
            <tr>
              <th style={thStyles}>
                <Text>{t('FINAL')}: 25%</Text>
              </th>
              <td style={tdCenterStyles}>
                <Text>B B A</Text>
              </td>
            </tr>
            <tr>
              <th style={thStyles}>
                <Text>{t('SEMIFINAL')}: 12,5%</Text>
              </th>
              <td style={tdStyles}>
                <Text>C C C C B B A</Text>
              </td>
            </tr>
          </tbody>
        </table>
        <Divider y={20} />
        <Heading as="h2">{t('CLEAN_GAME')}</Heading>
        <Divider y={10} />
        <Text>{t('CLEAN_GAME_DESC')} </Text>
        {/* Tenemos alguna relay/lugar/forma de que cualquier persona pueda ver de forma facil las transacciones? */}
        <Divider y={20} />
        <Heading as="h2">{t('TRANSACTION_COST')}</Heading>
        <Divider y={10} />
        <Text>{t('TRANSACTION_COST_DESC')}</Text>
        <Divider y={20} />
        <Flex justify="center">
          <Heading as="h4" color={appTheme.colors.primary}>
            {t('TO_PLAY')}
          </Heading>
        </Flex>
      </Container>
    </>
  );
}
