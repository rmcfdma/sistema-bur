import type { IUsuario } from '~/types/IUsuario';

export class Usuario implements IUsuario {
    id_usuarios: number;
    username: string;
    password: string;
    funcoes_componentes_id_componentes: number;
    funcoes_componentes_id_funcoes: number;
    data_inclusao: Date;
    data_exclusao: Date;
    constructor(id_usuarios: number, username: string, password: string, funcoes_componentes_id_componentes: number,
        funcoes_componentes_id_funcoes: number,
        data_inclusao: Date,
        data_exclusao: Date) {
        this.id_usuarios = id_usuarios;
        this.username = username;
        this.password = password;
        this.funcoes_componentes_id_componentes = funcoes_componentes_id_componentes;
        this.funcoes_componentes_id_funcoes = funcoes_componentes_id_funcoes;
        this.data_inclusao = data_inclusao;
        this.data_exclusao = data_exclusao;
    }
}