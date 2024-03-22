import { useNomad } from "../../../hooks/useNomad";
import { codeEvent, repoManifest } from "./nostrEvents";

type ILotteryABI = {
  halve: (
    seed: string,
    weightedPlayers: { [player: string]: number }
  ) => { [player: string]: number };
  lottery: (seed: string, winners: number, players: string[]) => string[];
};

() => {
  const { halve, lottery, eventEmitter, isLoaded, isLoading, status, error } =
    useNomad<ILotteryABI>(
      codeEvent.id // Using EventID
    );

  const {} = useNomad<ILotteryABI>(`${repoManifest.pubkey}/lottery`); // Using PubKey
  const {} = useNomad<ILotteryABI>("timba@hodl.ar/lottery"); // Using NIP05
};
