<template>
  <PageHeader />
  <div class="conteudo">
      <FormsFormUsuarios :usuario="usuario" class="formulario"/>
      <TablesTableUsuarios @linha-clicada="preencherFormulario" class="tabela" />
  </div>
</template>
<script lang="ts" setup>
const usuario = ref<IUsuario>()

interface IUsuario {
    ID_USUARIOS: number;
    USERNAME: string;
    PASSWORD: string;
    DATA_INCLUSAO: Date,
    DATA_EXCLUSAO: Date,
    FUNCOES_COMPONENTES_ID_FUNCOES: number;
    FUNCOES_COMPONENTES_ID_COMPONENTES: number;
};

const preencherFormulario = (linhaClicada: IUsuario) => {
  usuario.value = linhaClicada  
};


definePageMeta({
    middleware: [
        'auth',
        // Add in more middleware here
    ]
});
</script>

<style>
.conteudo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0px;
}
.tabela{
  margin-top: 10px;
}
</style>


