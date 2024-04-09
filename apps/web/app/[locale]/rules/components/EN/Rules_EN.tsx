import React from 'react';
import { Container, Divider, Flex, Heading, Text } from '@lawallet/ui';
import Image from 'next/image';
import Link from 'next/link';

import { appTheme } from '@/../config/exports';
import { Navbar } from '@/[locale]/components/Navbar';
import { listOrderStyles, listUnorderStyles, tablaStyles, tdCenterStyles, tdStyles, thStyles } from '../rulesStyle';

const Rules_EN = () => {
  return (
    <>
      <Navbar>
        <Link href="/">
          <Image width={23} height={30} alt="Halving Massacre by La Crypta" src={'/images/iso.png'} />
        </Link>
      </Navbar>
      {/* <GameTime round={10} block="820.000" time="20" /> */}
      <Divider y={16} />
      <Container>
        <Heading>Game Rules</Heading>
        <Divider y={10} />
        <Text>
          Survive <b>ALL ROUNDS</b> and get a <b>EPIC treasure</b>.
        </Text>
        <Divider y={20} />
        <Heading as="h2">Summary:</Heading>
        <Divider y={10} />
        <Text>
          Be the last player standing by accumulating sats and increasing your power to take a large percentage of the
          collected treasure.
        </Text>
        <Divider y={10} />
        <ol style={listOrderStyles}>
          <li>
            <Text>Buy your ticket.</Text>
          </li>
          <li>
            <Text>Accumulate sats to gain power.</Text>
          </li>
          <li>
            <Text>Survive the MASSACRE.</Text>
          </li>
          <li>
            <Text>Accumulate MORE sats to gain MORE power.</Text>
          </li>
        </ol>
        <Divider y={20} />
        <Heading as="h2">How to play?</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>Enter the game with your Lightning Address (aka walias).</Text>
          </li>
          <li>
            <Text>Buy your ticket to participate.</Text>
          </li>
          <li>
            <Text>Accumulate sats to gain power.</Text>
          </li>
          <li>
            <Text>Become the winner of the Halving Massacre thanks to the power of your sats!</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">What is power?</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>Represents the player's strength.</Text>
          </li>
          <li>
            <Text>Increases by zapping sats to the treasure.</Text>
          </li>
          <li>
            <Text>Influences the probability of surviving the MASSACRES.</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">Massacres</Heading>
        <Divider y={10} />
        <Text>The number of participants is halved every X number of blocks.</Text>
        <Divider y={10} />
        {/* Cambiar X por la cantidad de bloques que pactemos */}
        <ul style={listUnorderStyles}>
          <li>
            <Text>
              The hash of the block in which the massacre occurs determines, randomly, the survivors who advance to the
              next round.
            </Text>
          </li>
          <li>
            <Text>Half of the participants, rounded down, are the survivors of the massacre.</Text>
          </li>
          <li>
            <Text>The power of the massacred players is distributed among the survivors evenly.</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">Players</Heading>
        <Divider y={20} />
        <Heading as="h3">Survivors</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>They can continue to accumulate sats to gain more power.</Text>
          </li>
          <li>
            <Text>
              They receive the power of the massacred divided equally. (total power of the massacred / number of
              survivors)
            </Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h3">Massacrateds</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>They are eliminated from the game and their power remains in the treasure.</Text>
          </li>
          <li>
            <Text>They may not buy another ticket to re-enter the game.</Text>
          </li>
          <li>
            <Text>Their power is distributed among the survivors.</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">Prizes and winners</Heading>
        <Divider y={10} />
        <Heading as="h3">Initial treasury</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>
              La Crypta adds the total of <b>2.100.000 satoshis</b> to the game tresury.
            </Text>
          </li>
          <li>
            <Text>It is not considered as power, neither in the redistribution nor after the massacres.</Text>
          </li>
          <li>
            <Text>It is distributed to the winners, as appropriate, at the end of the game.</Text>
          </li>
        </ul>
        <Divider y={10} />
        <Heading as="h3">Game over</Heading>
        <Divider y={10} />
        <Text>The game ends when the halving occurs, at block 840,000, when the last MASSACRE occurs.</Text>
        <Divider y={10} />
        <Text>The number of winners can be between 4 and 7 depending on the initial number of participants.</Text>
        <Divider y={20} />
        <Text>The treasure will be distributed in three levels of winners:</Text>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>
              <b>50%</b> for the winner. <i>(a single player. See player A in the table below)</i>
            </Text>
          </li>
          <li>
            <Text>
              <b>25%</b> for those who are massacred in the final, distributed equally.
              <i>(between one and two players, not including the winner. See player(s) B in the table below)</i>
            </Text>
          </li>
          <li>
            <Text>
              <b>12,5%</b> for those who are massacred in the semifinal, distributed equally.{' '}
              <i>(between three and four players, not including the finalists. See players C in the table below)</i>
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
          The remaining 12.5% is alloted to La Crypta.
        </blockquote>
        <Divider y={20} />
        <Text>The following table shows the progress of the winners once the semifinal round is reached.</Text>
        <Divider y={10} />
        <Text>
          <b>A, B y C:</b> represent players.
        </Text>
        <Divider y={10} />
        <Text>The red lines represent the massacres.</Text>
        <Divider y={10} />
        <table style={tablaStyles}>
          <thead>
            <tr>
              <th style={thStyles}>
                <Text>Treasure percentage</Text>
              </th>
              <th style={thStyles}>
                <Text>Players</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th style={thStyles}>
                <Text>Winner: 50%</Text>
              </th>
              <td style={tdStyles}>
                <Text>A</Text>
              </td>
            </tr>
            <tr>
              <th style={thStyles}>
                <Text>Final: 25%</Text>
              </th>
              <td style={tdCenterStyles}>
                <Text>B B A</Text>
              </td>
            </tr>
            <tr>
              <th style={thStyles}>
                <Text>Semifinal: 12,5%</Text>
              </th>
              <td style={tdStyles}>
                <Text>C C C C B B A</Text>
              </td>
            </tr>
          </tbody>
        </table>
        <Divider y={20} />
        <Text>The satoshis are sent to the Lightning Address (aka walias) of the winners at the end of the game.</Text>
        <Divider y={20} />
        <Heading as="h2">Transparency and fair play</Heading>
        <Divider y={10} />
        <Text>
          All transactions are published in NOSTR, achieving transparency and auditability. External manipulations of
          the game are not allowed.{' '}
        </Text>
        {/* Tenemos alguna relay/lugar/forma de que cualquier persona pueda ver de forma facil las transacciones? */}
        <Divider y={20} />
        <Heading as="h2">Transaction cost</Heading>
        <Divider y={10} />
        <Text>
          Participants are responsible for the costs of transactions for sending satoshis through the Lightning Network.
        </Text>
        <Divider y={20} />
        <Heading as="h2">Disclaimer</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>
              There are no refunds of the staked satoshis. The winners will receive the prize in their Lightning Address
              (aka walias) at the end of the game
            </Text>
          </li>
          <li>
            <Text>
              This game involves betting, therefore we are not responsible for how you decide to use your satoshis.
            </Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">Subject to changes</Heading>
        <Divider y={10} />
        <Text>
          This rules is subject to change. In any case, sensitive parts such as the distribution of the prize or game
          algorithms will not be affected, only modifications in terms of clarification of the game.
        </Text>
        <Divider y={20} />
        <Heading as="h2">Open source</Heading>
        <Divider y={10} />
        <Text>
          This is an open source game, so you can check all the details, changes and algorithms used on our GitHub. They
          can also collaborate.
        </Text>
        <Divider y={20} />
        <Flex justify="center">
          <Link href="/">
            <Heading as="h4" color={appTheme.colors.primary}>
              Let's play!
            </Heading>
          </Link>
        </Flex>
      </Container>
    </>
  );
};

export default Rules_EN;
