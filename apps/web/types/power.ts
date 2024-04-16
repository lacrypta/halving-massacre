export interface Power {
  player: string; // Walias
  amount: number; // Millisats
  message?: string; // From zap
  createdAt: number; // Timestamp
  id: string; // Timestamp
}

export interface PlayersPower {
  [walias: string]: number;
}
