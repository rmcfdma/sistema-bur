import jwt from "jsonwebtoken"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Chave secreta para assinar tokens JWT
const secretKey = 'fabiane';

// Listar todos os usuários
export const getAllUsuarios = async (req, res) => {
  const usuarios = await prisma.usuarios.findMany();
  res.json(usuarios);
};

export const getUsuariosById = async (req, res) => {
  const { id_usuarios } = req.params;
  const usuarios = await prisma.usuarios.findUnique({ where: { ID_USUARIOS: Number(id_usuarios) } });
  res.json(usuarios);
};

export const getUsuarioByUsername = async (req, res) => {
  const { username } = req.params;
  const usuario = await prisma.usuarios.findUnique({ where: { USERNAME: String(username) } });
  res.json(usuario);
};

export const getUsuariosCount = async (req, res) => {
  const count = await prisma.usuarios.count();
  res.json(count);
};

export const getUsuariosByPage = async (req, res) => {
  const { page, size } = req.body;
  const startIndex = ((Number(page) - 1) * Number(size));
  const usuarios = await prisma.usuarios.findMany({
    skip: startIndex, //Pula para startIndex
    take: Number(size),       //Pega size linhas
  });
  res.json(usuarios);
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const usuario = await prisma.usuarios.findMany({
    where: {
      USERNAME: {
        equals: username,
      },
      PASSWORD: {
        equals: password,
      },
    }
  });

  if (usuario) {
    const novo = { ...usuario } //Cria um novo usuário com as mesmas propriedades e valores mas com referência em memória diferente.
    const token = jwt.sign(novo, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
};

export const novo = async (req, res) => {
  const usuario = req.body;
  try {
    const usuarioCriado = await prisma.usuarios.create({
      data: {
        "USERNAME": usuario.USERNAME,
        "PASSWORD": usuario.PASSWORD,
        "FUNCOES_COMPONENTES_ID_FUNCOES": Number(usuario.FUNCOES_COMPONENTES_ID_FUNCOES),
        "FUNCOES_COMPONENTES_ID_COMPONENTES": Number(usuario.FUNCOES_COMPONENTES_ID_COMPONENTES),
        "DATA_INCLUSAO": new Date(usuario.DATA_INCLUSAO),
        "DATA_EXCLUSAO": new Date(usuario.DATA_EXCLUSAO)
      },
    });
    res.status(201).json(usuarioCriado);
  } catch (erro) {
    console.log(erro)
  }
}

export const removeAll = async (req, res) => {
  const { lista_usuarios } = req.body;
  const array = lista_usuarios.map(valor => Number(valor));
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.usuarios.deleteMany({
        where: {
          ID_USUARIOS:
            { in: array }
        },
      })
    })
    res.json({ "resultado": "1" });
  } catch (erro) {
    res.status(500).json({ "resultado": "0" });
  } finally {
    await prisma.$disconnect();
  }
}

export const remove = async (req, res) => {
  const id_usuarios = parseInt(req.params.id);
  try {
    await prisma.usuarios.delete({
      where: { ID_USUARIOS: id_usuarios },
    });
    res.json({ "resultado": "1" });
  } catch (erro) {
    res.status(500).json({ "resultado": "0" });
  }
}


export const alterar = async (req, res) => {
  const id_usuarios = parseInt(req.params.id);
  const usuario = req.body;
  try {
    const usuarioAtualizado = await prisma.usuarios.update({
      where: {
        ID_USUARIOS: Number(id_usuarios)
      },
      data: {
        "USERNAME": usuario.USERNAME,
        "PASSWORD": usuario.PASSWORD,
        "FUNCOES_COMPONENTES_ID_FUNCOES": Number(usuario.FUNCOES_COMPONENTES_ID_FUNCOES),
        "FUNCOES_COMPONENTES_ID_COMPONENTES": Number(usuario.FUNCOES_COMPONENTES_ID_COMPONENTES),
        "DATA_INCLUSAO": new Date(usuario.DATA_INCLUSAO),
        "DATA_EXCLUSAO": new Date(usuario.DATA_EXCLUSAO)
      },
    });
    res.json(usuarioAtualizado);
  } catch (erro) {
    console.log(erro)
  }
}





