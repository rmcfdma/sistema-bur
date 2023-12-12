import { Pessoa } from '~/models/Pessoa';
import type { IComponente } from '~/types/IComponente';
export class Componente extends Pessoa implements IComponente {
    tefa: string;
    data_inclusao: Date;
    data_exclusao: Date;
    id_brud: string;
    constructor(id: number,
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
        foto_url: string,
        tefa: string,
        data_inclusao: Date,
        data_exclusao: Date,
        id_brud: string) {
        super(id, cpf, nome, data_nascimento, logradouro, numero, bairro,
            cidade, estado, cep, telefone, email, foto_url);
        this.tefa = tefa;
        this.data_inclusao = data_inclusao;
        this.data_exclusao = data_exclusao;
        this.id_brud = id_brud;
    }
}