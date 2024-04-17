export interface Power {
  player: string; // Walias
  amount: number; // Millisats
  message?: string; // From zap
  type?: 'LIGHTNING' | 'ONCHAIN' | 'MASSACRE'; // Type
  createdAt: number; // Timestamp
  id: string; // Timestamp
}

export interface PlayersPower {
  [walias: string]: number;
}
