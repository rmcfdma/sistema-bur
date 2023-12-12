import express from "express"
export const funcoesRouters = express.Router();
import * as controller from '../controllers/funcoesController.js';

// // Rota para criar um novo usuário
// router.post('/usuarios', usuariosController.createUsuario);

// Rota para listar todos os usuários
funcoesRouters.get('/', controller.getAllFuncoes);

// Rota para efetuar login
funcoesRouters.get('/id/:id_funcoes', controller.getFuncoesById);

// Rota para efetuar login
funcoesRouters.get('/funcao/:funcao', controller.getFuncoesByFuncao);