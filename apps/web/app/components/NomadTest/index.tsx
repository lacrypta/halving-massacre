import { numberOfRounds } from "../../lib/lottery";

export const NomadTest = () => {
  return (
    <div>
      <div>
        <h1>Simulador</h1>
      </div>
      <div></div>
      <div>
        <div>Participantes en JSON</div>
        <div>
          <textarea></textarea>
        </div>
      </div>
      <div>
        <div>
          <button>CALCULAR</button>
        </div>
      </div>

      <div>
        <div>RESULTADO</div>
        <div>
          <div>Sobrevivientes:</div>
          <div>
            <li>
              <span>Cyber : </span>
              <span>1000 (+500) = 1500</span>
            </li>
          </div>
        </div>
        <div>
          <div>Muertos:</div>
          <div>
            <li>
              <s>
                <span>Cyber : </span>
                <span>1000</span>
              </s>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};
