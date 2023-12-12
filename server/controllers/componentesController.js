import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Listar todos os usuários
export const getAllComponentes = async (req, res) => {
  const componentes = await prisma.componentes.findMany();
  res.json(componentes);
};

export const getComponentesById = async (req, res) => {
  const { id_componente } = req.params;
  const componente = await prisma.componentes.findUnique({ where: { ID_COMPONENTES: Number(id_componente) } });
  res.json(componente);
};

export const getComponentesByBrud = async (req, res) => {
  const { id_brud } = req.params;
  const componentes = await prisma.componentes.findMany({ where: { ID_BRUDS:{ equals: Number(id_brud)} } });
  res.json(componentes);
};

export const getComponentesByName = async (req, res) => {
  const { nome } = req.params;
  const componentes = await prisma.componentes.findMany({ where: { NOME: { startsWith: nome + '%' } } });
  res.json(componentes);
};

export const getComponentesByTefa = async (req, res) => {
  const { tefa } = req.params;
  const componente = await prisma.componentes.findUnique({ where: { TEFA: tefa } });
  res.json(componente);
};


export const getComponentesByCpf = async (req, res) => {
  const { cpf } = req.params;
  const componente = await prisma.componentes.findUnique({ where: { CPF: cpf } });
  res.json(componente);
};

export const getComponentesByNascimento = async (req, res) => {
  const { start, end } = req.params;
  const componentes = await prisma.componentes.findMany({
    where: {
      DATA_NASCIMENTO: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
  });
  res.json(componentes);
};




