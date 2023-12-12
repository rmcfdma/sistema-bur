<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Login</span>
            </div>
        </template>
       
        <el-form status-icon ref="ruleFormRef" :rules="rules" :label-position="labelPosition" :model="form"
            label-width="80px">
            <el-form-item label="Usuário" prop="username">
                <el-input placeholder="Informe o usuário." v-model="form.username" />
            </el-form-item>
            <el-form-item label="Senha" prop="password">
                <el-input placeholder="Insira sua senha." show-password v-model="form.password" />
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="form.rememberMe">Lembrar-me</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" @click="login(ruleFormRef)">Login</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules, FormProps } from 'element-plus'
import { authStore } from '@/store/auth';
import { breadcrumbsStore } from '@/store/breadcrumbs';


const labelPosition = ref<FormProps['labelPosition']>('left')
const ruleFormRef = ref<FormInstance>()
const store = authStore();
const store_breadcrumbs = breadcrumbsStore();
const { setBreadcrumbs } = store_breadcrumbs;
const { setToken } = store;
const router = useRouter();

interface RuleForm {
    username: string
    password: string
}

const form = reactive({
    username: '',
    password: '',
    rememberMe: false,
})

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: 'Usuário Obrigatório.', trigger: 'blur' },
        { min: 3, max: 15, message: 'O Campo Usuário de ter entre 3 e 15 caracteres', trigger: 'blur' },
    ],
    password: [
        {
            required: true,
            message: 'Senha obrigatória.',
            trigger: 'change',
        },
    ]
})

const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        
        if (valid) {
            try {
                const response = await axios.post('http://localhost:4000/api/usuarios/login', {
                    username: form.username,
                    password: form.password,
                });
                const token = response.data.token;
                
                setToken(token); // Envia para a store
                setBreadcrumbs([[ '1', 'Home', '/','Seja Bem Vindo' ]]);
                await router.push('/');  //Redireciona para Home
            } catch (error) {
                console.error('Erro de autenticação', error);
            }
        } else {
            console.log('Erro ao efetuar Login!', fields)
        }
    })
}
</script>
<style>
.box-card {
    width: 400px;
}
</style>

