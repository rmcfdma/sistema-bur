import express from "express"
export const componentesRouters = express.Router();
import * as controller from '../controllers/componentesController.js';

// // Rota para criar um novo usuário
// router.post('/usuarios', usuariosController.createUsuario);

// Rota para listar todos os componentes
componentesRouters.get('/', controller.getAllComponentes);

// Rota para buscar um componentes por ID
componentesRouters.get('/id/:id_componente', controller.getComponentesById);

// Rota para buscar um componentes por Brud
componentesRouters.get('/brud/:id_brud', controller.getComponentesByBrud);

// Rota para buscar um componentes por Nome
componentesRouters.get('/nome/:nome', controller.getComponentesByName);

// Rota para buscar um componentes por Data de Nascimento
componentesRouters.get('/nascimento/:start/:end', controller.getComponentesByNascimento);

// Rota para buscar um componentes por CPF
componentesRouters.get('/cpf/:cpf', controller.getComponentesByCpf);

// Rota para buscar um componentes por TEFA
componentesRouters.get('/tefa/:tefa', controller.getComponentesByTefa);
