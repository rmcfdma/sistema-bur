import express from "express"
export const brudsRouters = express.Router();
import * as controller from '../controllers/brudsController.js';

// Rota para listar todos os usuários
brudsRouters.get('/', controller.getAllBruds);

// Rota para efetuar login
brudsRouters.get('/id/:id_bruds', controller.getBrudById);

// Rota para efetuar login
brudsRouters.get('/nome/:nome', controller.getBrudsByNome);

// Rota para efetuar login
brudsRouters.get('/estado/:estado', controller.getBrudsByEstado);