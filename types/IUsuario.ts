export interface IUsuario {
    id_usuarios: number;
    username: string;
    password: string;
    funcoes_componentes_id_componentes: number;
    funcoes_componentes_id_funcoes: number;
    data_inclusao: Date;
    data_exclusao: Date;
  }