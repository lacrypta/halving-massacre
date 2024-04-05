import { Container, Divider, Heading, Sheet, Text } from '@lawallet/ui';

const tablaStyles: React.CSSProperties= {
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
}
const listUnorderStyles: React.CSSProperties = {
  listStyleType: 'disc',
  textAlign: 'left',
  display: 'block',
  margin: '0 auto',
  width: '400px',
  maxWidth: '100%',
}

const RulesSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Sheet title={''} isOpen={isOpen} closeText={'Cerrar'} onClose={onClose}>
      <Container>
        <Heading as="h1" align="center">
          Reglas de juego
        </Heading>  
        <Divider y={10}/>
        <Text align="center">
          Sobreviví <b>TODAS LAS RONDAS</b> y llevate <b>TREMENDO tesoro</b>.
        </Text>

        <Divider y={20}/>

        <Heading as="h2" align="center">
          Resumen:
        </Heading>
        <Divider y={10}/>
        <Text align="center">
          Sé el <b>ultimo jugador</b> en pie <b>acumulando sats</b> y <b>amuentando tu poder</b> para llevarte un gran porcentaje del <b>tesoro recaudado</b>.
          <div style={listContainerStyles}>
            <ol style={listOrderStyles}>
            <li>Comprá tu ticket.</li>
            <li>Acumulá sats para ganar poder.</li>
            <li>Sobreviví a la MASSACRE.</li>
            <li>Acumulá MÁS sats para ganar MÁS poder.</li>
            </ol>
          </div>
        </Text>

        <Divider y={20}/>
        
        <Heading as="h2" align="center">
          ¿Cómo jugar?
        </Heading>
        <Divider y={10}/>
        <Text align="center">
          <ul style={listUnorderStyles}>
            <li>Entrá al juego con tu Lightning (walias).</li>
            <li>Comprá tu ticket para participar.</li>
            <li>Acumulá sats para ganar poder.</li>
            <li>Convertite en el ganador del Halving Massacre gracias al <b>poder</b> de tus sats!</li>
          </ul>
        </Text>

        <Divider y={20}/>
        
        <Heading as="h2" align="center">
          ¿Qué es el poder?
        </Heading>
        <Divider y={10}/>
        <Text align="center">
          <ul style={listUnorderStyles}>
            <li>Representa la fuerza del jugador.</li>
            <li>Incrementa zappeando sats a el tesoro.</li>
            <li>Influye en la probabilidad de sobrevivir a las MASSACRES.</li>
          </ul>
        </Text>

        <Divider y={20}/>
        
        <Heading as="h2" align="center">
          Massacres
        </Heading>
        <Divider y={10}/>
        <Text align="center">
          La cantidad de participantes se reduce a la mitad cada X cantidad de bloques. { /* Cambiar X por la cantidad de bloques que pactemos */}
          <ul style={listUnorderStyles}>
            <li>El hash del bloque de en el cual se hace la massacre determina, de manera aleatoria, los sobrevivientes que avanzan a la siguiente ronda.</li>
            <li>La mitad de los participantes, redondeando para abajo, son los sobrevivientes de la massacre.</li>
            <li>El poder de los jugadores massacrados es distribuido entre los sobrevivientes de manera igualitaria.</li>
          </ul>
        </Text>

        <Divider y={20}/>

        <Heading as="h2" align="center">
          Jugadores
        </Heading>
        <Divider y={10}/>
        <Heading as="h3" align="center">
          Sobrevivientes
        </Heading>
        <Divider y={10}/>
        <Text align="center">
          <ul style={listUnorderStyles}>
            <li>Pueden seguir acumulando sats para ganar más poder.</li>
            <li>Reciben el poder de los massacrados dividido en partes iguales. (poder total de los massacrados / cantidad de sobrevivientes)</li>
          </ul>
        </Text>
        <Divider y={10}/>
        <Heading as="h3" align="center">
          Massacrados
        </Heading>
        <Divider y={10}/>
        <Text align="center">
          <ul style={listUnorderStyles}>
            <li>Quedan eliminados del juego y su poder permanece en el tesoro.</li>
            <li>No pueden volver a comprar un ticket para re-ingresar al juego.</li>
            <li>Su poder es distribuido entre los sobrevivientes.</li>
          </ul>
        </Text>

        <Divider y={20}/>
        
        <Heading as="h2" align="center">
          Ganadores
        </Heading>
        <Divider y={10}/>
        <Text align="center">
          El juego termina cuando ocurre el halving, en el bloque 840.000, cuando sucede la ultima MASSACRE.<br></br>
          La cantidad de ganadores puede ser entre 4 y 7 dependiendo la cantidad de participantes iniciales.<br></br><br></br>
          El tesoro se distribuirá en tres niveles de ganadores:
          <ul style={listUnorderStyles}>
            <li><b>50%</b> para el ganador. <i>(un solo jugador. Véase el jugador <b>A</b> en la tabla de abajo)</i></li>
            <li><b>25%</b> para los que sean massacrados en la final, distribuido igualitariamente. <i>(entre uno y dos jugadores, sin contar al ganador. Véase el/los jugadores <b>B</b> en la tabla de abajo)</i></li>
            <li><b>12,5%</b> para los que sean massacrados en la semifinal, distribuido igualitariamente. <i>(entre tres y cuatro jugadores, sin contar a los finalistas. Véase los jugador <b>C</b> en la tabla de abajo)</i></li>
          </ul>
          <blockquote style={{
            backgroundColor: 'rgba(198, 188, 193, 0.16)', display: 'inline-block', margin:'auto' }}>El restante 12,5% va destinado para  La Crypta.</blockquote><br></br><br></br>
          La siguiente tabla muestra el avance de los ganadores una vez alcanzada la ronda de semifinal.<br></br>
          <b>A, B y C:</b> representan jugadores.<br></br>
          Las <b>lineas rojas</b> representan las massacres.
          <table style={tablaStyles}>
                <thead>
                  <tr>
                    <th style={thStyles}>Porcentaje del tesoro</th>
                    <th style={thStyles}>Jugadores</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={thStyles}>Ganador: 50%</th>
                    <td style={tdStyles}>A</td>
                  </tr>
                  <tr>
                    <th style={thStyles}>Final: 25%</th>
                    <td style={tdCenterStyles}>B B A</td>
                  </tr>
                  <tr>
                    <th style={thStyles}>Semifinal: 12,5%</th>
                    <td style={tdStyles}>C C C C B B A</td>
                  </tr>
                </tbody>
          </table>
        </Text>

        <Divider y={20}/>
        
        <Heading as="h2" align="center">
          Transparencia y juego limpio
        </Heading>
        <Divider y={10}/>
        <Text align="center">
          Todas las transacciones son publicadas en NOSTR. Logrando así transparencia y  auditabilidad. Las manipulaciones externas del juego no están permitidas. { /* Tenemos alguna relay/lugar/forma de que cualquier persona pueda ver de forma facil las transacciones? */ }
        </Text>

        <Divider y={20}/>

        <Heading as="h2" align="center">
          Coste de transacciones
        </Heading>
        <Divider y={10}/>
        <Text align="center">
          Los participantes son los responsables de los costos de las tansacciones por enviar satoshis a través de Lightning Network.
        </Text>

        <Divider y={20}/>

        <Heading as="h1" align="center">
          ¡A jugar!
        </Heading>
      </Container> 
    </Sheet>
  );
};

export default RulesSheet;