import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { PrismaClient } from '@prisma/client'
import { usuariosRouters } from '../routes/usuariosRoutes.js'
import { componentesRouters } from '../routes/componentesRoutes.js'
import { funcoesRouters } from "../routes/funcoesRoutes.js"
import { brudsRouters } from "../routes/brudsRoutes.js"

const prisma = new PrismaClient()

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/usuarios', usuariosRouters);
app.use('/api/componentes', componentesRouters);
app.use('/api/funcoes', funcoesRouters);
app.use('/api/bruds', brudsRouters);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Backend rodando na porta' + port);
});