import { Componente } from '~/models/Componente';
export interface IBruds {
    id: number;
    nome: string;
    estado: string;
    cidade: string;
    componentes: Componente[];
    instrumentos: Instrumento[];
  }