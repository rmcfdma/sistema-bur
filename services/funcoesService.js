import axios from 'axios';

export const getFuncoes = async () => {
    try {
      const funcoes = await axios.get('http://localhost:4000/api/funcoes', {})
      return funcoes.data;
    } catch (error) {
      console.error(error)
    }
  }