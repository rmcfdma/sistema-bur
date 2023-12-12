import axios from 'axios';

export const getBruds = async () => {
    try {
      const bruds = await axios.get('http://localhost:4000/api/bruds', {})
      return bruds.data;
    } catch (error) {
      console.error(error)
    }
  }