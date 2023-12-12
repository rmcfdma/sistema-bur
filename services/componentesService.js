import axios from 'axios';

export const getComponentesByBrud = async (brud) => {
    try {
        const componentes = await axios.get(`http://localhost:4000/api/componentes/brud/${brud}`);
        return componentes.data;
    } catch (error) {
        console.error('Erro ao buscar componentes:', error);
        throw error; // Trate o erro conforme necessário
    }
};

export const getComponentes = async () => {
    let componentes = null
    try {
        componentes = await axios.get('http://localhost:4000/api/componentes', {})
    } catch (error) {
        console.error(error)
    }
    return componentes
}

export const getComponentesById = async (id) => {
    let componente = null
    try {
        componente = await axios.get(`http://localhost:4000/api/componentes/id/${String(id)}`, {})
    } catch (error) {
        console.error(error)
    }
    return componente
}