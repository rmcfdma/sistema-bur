import { getUsuarioByUsername } from '@/services/usuariosService';

const validateUsername = async (value) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getUsuarioByUsername(value)

            if (user) {
                reject('Usuário já cadastrado');
            } else {
                resolve();
            }
        } catch (error) {
            console.error('Erro durante a validação do usuário:', error);
            reject('Erro durante a validação do usuário');
        }
    }

    )
}

validateUsername('CLARINETABEST')