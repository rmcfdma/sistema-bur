import type { IPessoa } from '~/types/IPessoa'

export class Pessoa implements IPessoa {
  id: number;
  cpf: string;
  nome: string;
  data_nascimento: Date;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string[];
  email: string;
  foto_url: string;

  constructor(
    id: number,
    cpf: string,
    nome: string,
    data_nascimento: Date,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
    telefone: string[],
    email: string,
    foto_url: string
  ) {
    this.id = id;
    this.cpf = cpf;
    this.nome = nome;
    this.data_nascimento = data_nascimento;
    this.logradouro = logradouro;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
    this.telefone = telefone;
    this.email = email;
    this.foto_url = foto_url;
  }
}