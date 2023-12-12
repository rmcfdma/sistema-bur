import type { IPatrimonio } from '~/types/IPatrimonio'

export class Patrimonio implements IPatrimonio {
    id_patrimonio: number;
    id_tipos_patrimonio: number;
    id_bruds: number;
    num_serie: string;
    data_inclusao: Date;
    data_exclusao: Date;
    nome: string;
    descricao: string;
    observacao: string;
    marca: string;
    acessorios: string;
    constructor(id_patrimonio: number,
        id_tipos_patrimonio: number,
        id_bruds: number,
        num_serie: string,
        data_inclusao: Date,
        data_exclusao: Date,
        nome: string,
        descricao: string,
        observacao: string,
        marca: string,
        acessorios: string){
            this.id_patrimonio = id_patrimonio,
            this.id_tipos_patrimonio = id_tipos_patrimonio,
            this.id_bruds = id_bruds,
            this.num_serie = num_serie,
            this.data_inclusao = data_inclusao,
            this.data_exclusao = data_exclusao,
            this.nome = nome,
            this.descricao = descricao,
            this.observacao = observacao,
            this.marca = marca,
            this.acessorios = acessorios
    }
}