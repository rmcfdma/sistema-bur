<template>
    <el-card class="box-card ">
        <template #header>
            <div class="card-header">
                <span>Cadastro de Usuários</span>
            </div>
        </template>
        <el-form ref="usuarioFormRef" label-width="120px" label-position="right" :model="usuario" :rules="usuarioRules"
            class="demo-form-inline" status-icon>
            <el-form-item label="Usuário" prop="username">
                <el-input v-model="usuario.USERNAME" placeholder="Coloque o usuário" />
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Senha" prop="password">
                        <el-input v-model="usuario.PASSWORD" type="password" autocomplete="off"
                            placeholder="Escolha a senha" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Repita a senha" prop="checkPassword">
                        <el-input v-model="usuario.CHECKPASSWORD" type="password" autocomplete="off"
                            placeholder="Repita a senha" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Data Inclusão" prop="date_inclusao">
                        <el-date-picker v-model="usuario.DATA_INCLUSAO" type="date" label="Data Inclusão"
                            placeholder="Escolha uma data" format="DD/MM/YYYY" :disabled-date="disabledDate" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Data Exclusão" prop="date_inclusao">
                        <el-date-picker v-model="usuario.DATA_EXCLUSAO" type="date" label="Data Exclusão"
                            placeholder="Escolha uma data" format="DD/MM/YYYY" :disabled-date="disabledDate" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="BRUD" prop="region">
                <el-select v-model="brud" placeholder="BRUDS">
                    <el-option v-for="(item_brud, index_brud) in bruds" :key="index_brud" :label="item_brud['NOME']"
                        :value="item_brud['ID_BRUDS']" />
                </el-select>
            </el-form-item>
            <el-form-item label="Componente" placeholder="Componentes">
                <el-select v-model="usuario.FUNCOES_COMPONENTES_ID_COMPONENTES" placeholder="Componente"
                    no-data-text="Nenhum componente encontrado." style="width: 100%">
                    <el-option v-for="(item_componente, index_componente) in componentes" :key="index_componente"
                        :label="item_componente['NOME']" :value="item_componente['ID_COMPONENTES']" />
                </el-select>
            </el-form-item>
            <el-form-item label="Função" prop="region" placeholder="Funções">
                <el-select v-model="usuario.FUNCOES_COMPONENTES_ID_FUNCOES" placeholder="Função">
                    <el-option v-for="(item_funcao, index_funcao) in funcoes" :key="index_funcao"
                        :label="item_funcao['FUNCAO']" :value="item_funcao['ID_FUNCOES']" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(usuarioRef)">Cadastrar</el-button>
                <el-button @click="resetForm(usuarioRef)">Limpar</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
  
<script lang='ts' setup>
import type { FormInstance, FormRules } from 'element-plus'
import { getComponentesByBrud, getComponentesById } from '@/services/componentesService';
import { getFuncoes } from '@/services/funcoesService';
import { getBruds } from '@/services/brudsService';
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br.js'
dayjs.locale('pt-br')


const brud = ref(1);
const bruds = ref([]);
const componentes = ref([]);
const funcoes = ref([]);
const props = defineProps(['usuario']);
const usuarioRef = ref<FormInstance>()

interface IUsuario {
    USERNAME: string;
    PASSWORD: string;
    CHECKPASSWORD: string;
    DATA_INCLUSAO: Date,
    DATA_EXCLUSAO: Date,
    FUNCOES_COMPONENTES_ID_FUNCOES: number;
    FUNCOES_COMPONENTES_ID_COMPONENTES: number;
};

let usuario = reactive<IUsuario>({
    USERNAME: '',
    PASSWORD: '',
    CHECKPASSWORD: '',
    DATA_INCLUSAO: new Date(),
    DATA_EXCLUSAO: new Date(),
    FUNCOES_COMPONENTES_ID_FUNCOES: 1,
    FUNCOES_COMPONENTES_ID_COMPONENTES: 1
})

const validatePassword = (rule: any, value: any, callback: any) => {
    const re = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{8,32}$");
    if (value === '') {
        callback(new Error('Entre com a senha.'))
    } else if (!re.test(value)) {
        callback(new Error('Deve conter 1 minúscula, 1 maiúscula e um dos símbolos *.!@$%^&'))
    } else {
        callback()
    }
}

const validateCheckPassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Entre com a senha.'))
    } else if (usuario.PASSWORD !== value) {
        callback(new Error('Repita a senha anterior.'))
    } else {
        callback()
    }
}

const usuarioRules = reactive<FormRules<IUsuario>>({
    USERNAME: [
        { required: true, message: 'Usuário obrigatório.', trigger: 'blur' },
        { min: 3, max: 20, message: 'Tamanho entre 3 e 20 caracteres.', trigger: 'blur' },
    ],
    PASSWORD: [
        {
            required: true,
            validator: validatePassword,
            trigger: 'blur',
        },
    ],
    CHECKPASSWORD: [
        {
            required: true,
            validator: validateCheckPassword,
            trigger: 'blur',
        },
    ],
    DATA_INCLUSAO: [
        {
            type: 'date',
            required: true,
            message: 'Coloque a data de inclusão',
            trigger: 'change',
        },
    ],
    DATA_EXCLUSAO: [
        {
            type: 'date',
            required: true,
            message: 'Coloque a data de exclusão',
            trigger: 'change',
        },
    ],
    FUNCOES_COMPONENTES_ID_FUNCOES: [
        {
            type: 'number',
            required: true,
            message: 'Escolha a função.',
            trigger: 'change',
        },
    ],
    FUNCOES_COMPONENTES_ID_COMPONENTES: [
        {
            type: 'number',
            required: true,
            message: 'Escolha o componente.',
            trigger: 'change',
        },
    ],
})

const loadBruds = async () => {
    try {
        bruds.value = await getBruds();
    } catch (error) {
        console.error('Erro ao carregar as funções:', error);
    }
};

const loadComponentesByBrud = async (brud: number) => {
    try {
        componentes.value = await getComponentesByBrud(brud);
        if (componentes.value.length > 0)
            usuario.FUNCOES_COMPONENTES_ID_COMPONENTES = componentes.value[0]['ID_COMPONENTES']
        else {
            usuario.FUNCOES_COMPONENTES_ID_COMPONENTES = 0
        }
    } catch (error) {
        console.error('Erro ao carregar os componentes:', error);
    }
};

const loadFuncoes = async () => {
    try {
        funcoes.value = await getFuncoes();
    } catch (error) {
        console.error('Erro ao carregar as funções:', error);
    }
};

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

onMounted(async () => {
    await loadBruds()
    await loadComponentesByBrud(1)
    await loadFuncoes()

});

watch(brud, (newValue, oldValue) => {
    loadComponentesByBrud(newValue);
});



watch(props, async (newValue, oldValue) => {
    usuario.USERNAME = newValue['usuario'].USERNAME
    usuario.PASSWORD = newValue['usuario'].PASSWORD
    usuario.DATA_INCLUSAO = newValue['usuario'].DATA_INCLUSAO
    usuario.DATA_EXCLUSAO = newValue['usuario'].DATA_EXCLUSAO
    usuario.FUNCOES_COMPONENTES_ID_FUNCOES = newValue['usuario'].FUNCOES_COMPONENTES_ID_FUNCOES
    const componente = await getComponentesById(newValue['usuario'].FUNCOES_COMPONENTES_ID_COMPONENTES)
    brud.value = componente?.data['ID_BRUDS']
    await loadComponentesByBrud(componente?.data['ID_BRUDS'])
    usuario.FUNCOES_COMPONENTES_ID_COMPONENTES = newValue['usuario'].FUNCOES_COMPONENTES_ID_COMPONENTES
});

const disabledDate = (nova: Date) => {
    const hoje = new Date();
    return nova > hoje;
}
</script>

<style>
.box-card {
    width: 70%;
}
</style>
  
  
  