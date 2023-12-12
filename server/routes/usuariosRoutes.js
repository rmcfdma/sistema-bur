import express from "express"
export const usuariosRouters = express.Router();
import * as controller from '../controllers/usuariosController.js';

// Rota para criar um novo usuário
usuariosRouters.post('/', controller.novo);

// Rota para deletar usuário
usuariosRouters.delete('/', controller.removeAll);

// Rota para deletar usuário
usuariosRouters.delete('/:id', controller.remove);


// Rota para update usuário
usuariosRouters.put('/:id', controller.alterar);

// Rota para listar todos os usuários
usuariosRouters.get('/', controller.getAllUsuarios);

// Rota para efetuar login
usuariosRouters.post('/login', controller.login);

// Rota para buscar um usuário por ID
usuariosRouters.get('/id/:id_usuarios', controller.getUsuariosById);

// Rota para buscar um usuário por USENAME
usuariosRouters.get('/username/:username', controller.getUsuarioByUsername);

// Rota para buscar por paginação
usuariosRouters.post('/pagination', controller.getUsuariosByPage);

// Rota para buscar o total de usuários
usuariosRouters.get('/count', controller.getUsuariosCount);