import axios from 'axios';

export const getUsuarios = async () => {
  try {
    const usuarios = await axios.get('http://localhost:4000/api/usuarios', {})
    return usuarios.data;
  } catch (error) {
    console.error(error)
  }
}

export const removeAll = async (lista) => {
  try {
    const usuarios = await axios.delete('http://localhost:4000/api/usuarios', { lista })
    return usuarios.data;
  } catch (error) {
    console.error(error)
  }
}

export const remove = async (id) => {
  console.log(id)
  try {
    const resultado = await axios.delete(`http://localhost:4000/api/usuarios/${id}`, {})
    return resultado;
  } catch (error) {
    console.error(error)
  }
}

export const edit = async (usuario) => {
  console.log(usuario)
  try {
    const resultado = await axios.put(`http://localhost:4000/api/usuarios/${usuario['ID_USUARIOS']}`, {usuario})
    return resultado;
  } catch (error) {
    console.error(error)
  }
}

export const getUsuariosByPage = async (page, size) => {
  try {
    const usuarios = await axios.post('http://localhost:4000/api/usuarios/pagination', {
      "page": page, "size": size
    })
    return usuarios.data;

  } catch (error) {
    console.error(error)
  }
}

export const getUsuarioByUsername = async (username) => {
  try {
    const usuario = await axios.post(`http://localhost:4000/api/usuarios/username/${username}`, {})
    return usuario.data;

  } catch (error) {
    console.error(error)
  }
}

export const getUsuariosCount = async (page, size) => {
  try {
    const count = await axios.get('http://localhost:4000/api/usuarios/count', {})
    console.log(`O total de Usuários é: ${count.data}`)
    return count.data;

  } catch (error) {
    console.error(error)
  }
}