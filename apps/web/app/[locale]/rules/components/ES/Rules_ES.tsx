import { Container, Divider, Flex, Heading, Text } from '@lawallet/ui';
import Image from 'next/image';
import Link from 'next/link';

import { appTheme } from '@/../config/exports';
import { Navbar } from '@/[locale]/components/Navbar';
import { listOrderStyles, listUnorderStyles, tablaStyles, tdCenterStyles, tdStyles, thStyles } from '../rulesStyle';

const Rules_ES = () => {
  return (
    <>
      <Navbar />
      {/* <GameTime round={10} block="820.000" time="20" /> */}
      <Divider y={16} />
      <Container>
        <Heading>Reglas del juego</Heading>
        <Divider y={10} />
        <Text>
          Sobreviví <b>Todas las rondas</b> y llevate <b>TREMENDO tesoro</b>.
        </Text>
        <Divider y={20} />
        <Heading as="h2">Resumen:</Heading>
        <Divider y={10} />
        <Text>
          Sé el ultimo jugador en pie acumulando sats y aumentando tu poder para llevarte un gran porcentaje del tesoro
          recaudado.
        </Text>
        <Divider y={10} />
        <ol style={listOrderStyles}>
          <li>
            <Text>Comprá tu ticket.</Text>
          </li>
          <li>
            <Text>Acumulá sats para ganar poder.</Text>
          </li>
          <li>
            <Text>Sobreviví a la MASSACRE.</Text>
          </li>
          <li>
            <Text>Acumulá MÁS sats para ganar MÁS poder.</Text>
          </li>
        </ol>
        <Divider y={20} />
        <Heading as="h2">¿Cómo jugar?</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>Entrá al juego con tu Lightning Address (aka walias).</Text>
          </li>
          <li>
            <Text>Comprá tu ticket para participar.</Text>
          </li>
          <li>
            <Text>Acumulá sats para ganar poder.</Text>
          </li>
          <li>
            <Text>Convertite en el ganador del Halving Massacre gracias al poder de tus sats!</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">¿Qué es el poder?</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>Representa la fuerza del jugador.</Text>
          </li>
          <li>
            <Text>Incrementa zappeando sats al tesoro.</Text>
          </li>
          <li>
            <Text>Influye en la probabilidad de sobrevivir a las MASSACRES.</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">Massacres</Heading>
        <Divider y={10} />
        <Text>La cantidad de participantes se reduce a la mitad cada X cantidad de bloques.</Text>
        <Divider y={10} />
        {/* Cambiar X por la cantidad de bloques que pactemos */}
        <ul style={listUnorderStyles}>
          <li>
            <Text>
              El hash del bloque en el cual se hace la massacre determina, de manera aleatoria, los sobrevivientes que
              avanzan a la siguiente ronda.
            </Text>
          </li>
          <li>
            <Text>La mitad de los participantes, redondeando para abajo, son los sobrevivientes de la massacre.</Text>
          </li>
          <li>
            <Text>
              El poder de los jugadores massacrados es distribuido entre los sobrevivientes de manera igualitaria.
            </Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">Jugadores</Heading>
        <Divider y={20} />
        <Heading as="h3">Sobrevivientes</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>Pueden seguir acumulando sats para ganar más poder.</Text>
          </li>
          <li>
            <Text>
              Reciben el poder de los massacrados dividido en partes iguales. (poder total de los massacrados / cantidad
              de sobrevivientes)
            </Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h3">Massacrados</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>Quedan eliminados del juego y su poder permanece en el tesoro.</Text>
          </li>
          <li>
            <Text>No pueden volver a comprar un ticket para re-ingresar al juego</Text>
          </li>
          <li>
            <Text>Su poder es distribuido entre los sobrevivientes.</Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">Premios y ganadores</Heading>
        <Divider y={10} />
        <Heading as="h3">Tesoro inicial</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>
              La Crypta suma el total de <b>2.100.000 satoshis</b> al tesoro del juego.
            </Text>
          </li>
          <li>
            <Text>No es tomado en cuenta como poder ni en la redistribución luego de las massacres.</Text>
          </li>
          <li>
            <Text>Se distribuye a los ganadores, segun corresponda, al finalizar el juego.</Text>
          </li>
        </ul>
        <Divider y={10} />
        <Heading as="h3">Fin del juego</Heading>
        <Text>El juego termina cuando ocurre el halving, en el bloque 840.000, cuando sucede la ultima MASSACRE.</Text>
        <Divider y={10} />
        <Text>La cantidad de ganadores puede ser entre 4 y 7 dependiendo la cantidad de participantes iniciales.</Text>
        <Divider y={20} />
        <Text>El tesoro se distribuirá de la siguiente manera:</Text>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>
              <b>50%</b> para el ganador. <i>(un solo jugador. Véase el jugador A en la tabla de abajo)</i>
            </Text>
          </li>
          <li>
            <Text>
              <b>25%</b> para los que hayan sido massacrados en la final, distribuido igualitariamente.
              <i>(entre uno y dos jugadores. Véase el/los jugadores B en la tabla de abajo)</i>
            </Text>
          </li>
          <li>
            <Text>
              <b>12,5%</b> para los que hayan sido massacrados en la semifinal, distribuido igualitariamente.{' '}
              <i>(entre tres y cuatro jugadores. Véase los jugador C en la tabla de abajo)</i>
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
          El restante 12,5% va destinado para La Crypta.
        </blockquote>
        <Divider y={20} />
        <Text>La siguiente tabla muestra el avance de los ganadores una vez alcanzada la ronda de semifinal.</Text>
        <Divider y={10} />
        <Text>
          <b>A, B y C:</b> representan jugadores.
        </Text>
        <Divider y={10} />
        <Text>Las lineas rojas representan las massacres.</Text>
        <Divider y={10} />
        <table style={tablaStyles}>
          <thead>
            <tr>
              <th style={thStyles}>
                <Text>Porcentaje del tesoro</Text>
              </th>
              <th style={thStyles}>
                <Text>Jugadores</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th style={thStyles}>
                <Text>Ganador: 50%</Text>
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
        <Text>
          Los satoshis son enviados a la Lightning Address (aka walias) de los ganadores al finalizar el juego.
        </Text>
        <Divider y={20} />
        <Heading as="h2">Transparencia y juego limpio</Heading>
        <Divider y={10} />
        <Text>
          Todas las transacciones son publicadas en NOSTR. Logrando así transparencia y auditabilidad. Las
          manipulaciones externas del juego no están permitidas.{' '}
        </Text>
        {/* Tenemos alguna relay/lugar/forma de que cualquier persona pueda ver de forma facil las transacciones? */}
        <Divider y={20} />
        <Heading as="h2">Coste de transacciones</Heading>
        <Divider y={10} />
        <Text>
          Los participantes son los responsables de los costos de las transacciones por enviar satoshis a través de
          Lightning Network.
        </Text>
        <Divider y={20} />
        <Heading as="h2">Descargo de responsabilidad</Heading>
        <Divider y={10} />
        <ul style={listUnorderStyles}>
          <li>
            <Text>
              No se realizan reembolsos de los satoshis apostados. Los ganadores recibiran el premio en su Lightning
              Address (aka walias) al finalizar el juego
            </Text>
          </li>
          <li>
            <Text>
              Este juego implica apuestas, por lo tanto no nos responsabilizamos como decidas utilizar tus satoshis.
            </Text>
          </li>
        </ul>
        <Divider y={20} />
        <Heading as="h2">Sujeto a cambios</Heading>
        <Divider y={10} />
        <Text>
          Este reglamento esta sujeto a cambios. De todas maneras, no afectarán partes sensibles como la distribución
          del premio ni algoritmos del juego, solo modificaciones en cuanto a clarificación del juego.
        </Text>
        <Divider y={20} />
        <Heading as="h2">Código abierto</Heading>
        <Divider y={10} />
        <Text>
          Este es un juego de código abierto, por lo tanto pueden verificar todos los detalles, cambios y algoritmos
          utilizados en nuestro GitHub. También pueden colaborar.
        </Text>
        <Divider y={20} />
        <Flex justify="center">
          <Link href="/">
            <Heading as="h4" color={appTheme.colors.primary}>
              ¡A jugar!
            </Heading>
          </Link>
        </Flex>
      </Container>
    </>
  );
};

export default Rules_ES;
