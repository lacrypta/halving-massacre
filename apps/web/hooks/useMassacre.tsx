import { useContext } from 'react';
import { MassacreContext, type MassacreContextType } from '../context/MassacreContext';

export const useMassacre = (): MassacreContextType => {
  return useContext(MassacreContext);
};
