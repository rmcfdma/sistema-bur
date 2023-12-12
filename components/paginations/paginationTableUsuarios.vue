<template>
    <el-pagination 
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[2, 5, 10, 20]"
    :small="small" 
    :disabled="disabled"
    :background="background" 
    layout="total,sizes, prev, pager, next" 
    :total="total" 
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>
<script lang="ts" setup>
import { getUsuariosByPage, getUsuariosCount } from '@/services/usuariosService';

const currentPage = ref(1)
const pageSize = ref(2)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref(0)

const emit = defineEmits(['paginate']);

const handleSizeChange = async (val: number) => {
    pageSize.value = val;
    emitirEvento(await loadUsuariosByPage(currentPage.value, pageSize.value))
}
const handleCurrentChange = async (val: number) => {
    currentPage.value = val;
    emitirEvento(await loadUsuariosByPage(currentPage.value, pageSize.value))
}

const emitirEvento = (array: []) => {
    emit('paginate', array)
}

const loadUsuariosByPage = async (page: number, size: number) => {
    try {
        return await getUsuariosByPage(page, size);
    } catch (error) {
        console.error('Erro ao carregar os usuários:', error);
    }
};

onMounted(async () => {
    emitirEvento(await loadUsuariosByPage(currentPage.value, pageSize.value))
    total.value = Number(await getUsuariosCount())
});
</script>