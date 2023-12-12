<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Usuários Cadastrados</span>
            </div>
        </template>
        <div class="tabela">
            <el-table :row-class-name="tableRowClassName" style="width:100%" :data="usuarios" :row-key="getRowKey"
                @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
                <el-table-column type="selection" :reserve-selection="true" />
                <el-table-column property="ID_USUARIOS" label="ID" />
                <el-table-column property="USERNAME" label="Usuário" />
                <el-table-column property="PASSWORD" label="Senha" />
                <el-table-column label="Inclusão">
                    <template #default="scope">{{ formatarData(scope.row.DATA_INCLUSAO) }}</template>
                </el-table-column>
                <el-table-column label="Exclusão">
                    <template #default="scope">{{ scope.row.DATA_EXCLUSAO ? formatarData(scope.row.DATA_EXCLUSAO) : null
                    }}
                    </template>
                </el-table-column>
                <el-table-column label="Operações">
                    <template #default="scope">
                        <el-icon @click="multipleSelection.length === 0 ? handleEdit(scope.$index, scope.row) : null"
                            :size="25">
                            <Edit :class="multipleSelection.length > 0 ? 'disabled-icon' : 'enabled-icon'" />
                        </el-icon>
                        <el-icon @click="multipleSelection.length === 0 ? handleDelete(scope.$index, scope.row) : null"
                            :size="25">
                            <Delete :class="multipleSelection.length > 0 ? 'disabled-icon' : 'enabled-icon'" />
                        </el-icon>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer_table">
                <span></span>
                <PaginationsPaginationTableUsuarios :usuarios="usuarios" @paginate="handlePaginateEvent" />
                <el-button :disabled="multipleSelection.length === 0" @click="removeTodos" type="primary">Apagar
                    Todos</el-button>
            </div>

        </div>
    </el-card>
</template>
  
<script lang='ts' setup>
import * as service from '@/services/usuariosService';
import { ElTable, ElNotification } from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'

interface IUsuario {
    ID_USUARIOS: number;
    USERNAME: string;
    PASSWORD: string;
    DATA_INCLUSAO: Date,
    DATA_EXCLUSAO: Date,
    FUNCOES_COMPONENTES_ID_FUNCOES: number;
    FUNCOES_COMPONENTES_ID_COMPONENTES: number;
};

const usuarios = ref<IUsuario[]>([])
const multipleSelection = ref<IUsuario[]>([])
const currentRow = ref<IUsuario>()
const emit = defineEmits(['linha-clicada']);

//Pega o usuário ao clicar em cima de uma determinada linha
const handleCurrentChange = (val: IUsuario | undefined) => {
    currentRow.value = val
    emit('linha-clicada',currentRow.value)
    console.log(currentRow.value)
}

//Altera a classe da linha ao clicar em cima dela
const tableRowClassName = ({ row, rowIndex, }: { row: IUsuario, rowIndex: number }) => {
    if (currentRow.value?.ID_USUARIOS === row.ID_USUARIOS)
        return 'warning-row'
}

const removeTodos = async () => {
    const lista = multipleSelection.value.map((usuario: IUsuario) => usuario.ID_USUARIOS)
    ElMessageBox.confirm(
        `Foram selecionados ${lista.length} usuário(s). Deseja excluir?`,
        'Exclusão de Usuários',
        {
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                const resposta = await service.removeAll(lista)
                ElMessage({
                    type: 'success',
                    message: `${lista.length} Usuário(s) excluído(s) com sucesso.`,
                })
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: 'Não foi possível excluir os usuários.',
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Exclusão cancelada pelo usuário.',
            })
        })
}

const handleSelectionChange = (val: IUsuario[]) => {
    multipleSelection.value = val
}

const getRowKey = (row: IUsuario) => {
    return String(row.ID_USUARIOS)
}

const handleEdit = async (index: number, row: IUsuario) => {
    ElMessageBox.confirm(
        'Deseja alterar o usuário selecionado?',
        'Alteração de Usuário',
        {
            confirmButtonText: 'Alterar',
            cancelButtonText: 'Cancelar',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                const resultado = await service.edit(row);
                ElMessage({
                    type: 'success',
                    message: 'Usuário alterado com sucesso.',
                })
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: 'Não foi possível alterar o usuário.',
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Alteração cancelada pelo usuário.',
            })
        })
}

const handleDelete = async (index: number, row: IUsuario) => {
    ElMessageBox.confirm(
        'Deseja remover o usuário selecionado?',
        'Exclusão de Usuário',
        {
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                const resultado = await service.remove(row.ID_USUARIOS);
                ElMessage({
                    type: 'success',
                    message: 'Usuário removido com sucesso.',
                })
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: 'Não foi possível remover o usuário.',
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Remoção cancelada pelo usuário.',
            })
        })
}


const loadUsuariosByPage = async (page: number, size: number) => {
    try {
        usuarios.value = await service.getUsuariosByPage(page, size);
    } catch (error) {
        console.error('Erro ao carregar os usuários:', error);
    }
};

const formatarData = (value: string) => {
    const data = new Date(value);
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();
    return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
};

const handlePaginateEvent = (dados: []) => {
    usuarios.value = dados
};

onMounted(async () => {
    await loadUsuariosByPage(1, 2)
});
</script>

<style>
.tabela {
    width: 100%;
}

.footer_table {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.delete {
    cursor: pointer;
}

.spacer {
    width: 1px
}

.disabled-icon {
    opacity: 0.5;
    color: #909399;
    cursor: not-allowed;
    margin-right: 5px;
}

.enabled-icon {
    cursor: pointer;
    margin-right: 5px;
    color: #409EFC;
}

.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}

tr:hover td {
    background-color: #f0f9eb;
    cursor: pointer;
}
</style>

  
  
  