<template>
    <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
        <template v-for="(item, index) in (items as string[][])" :key="index">
            <el-sub-menu v-if="(item[4]).length > 0" :index="(item[0])" :route="item[2]">
                <template #title>{{ item[1] }}</template>
                <el-menu-item v-for="(subItem, subIndex) in (item[4])" :key="subIndex" :index="(subItem[0])"
                    :route="(subItem[2])">
                    {{ subItem[1] }}
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="(item[0])" :route="item[2] as string">
                {{ item[1] }}
            </el-menu-item>
        </template>
        <el-menu-item index='9' :route='!!auth_store.token ? "/" : "/login"'>
            {{ !!auth_store.token ? 'Sair' : 'Login' }}
        </el-menu-item>
    </el-menu> -->

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
        <el-menu-item key="1" index='1' route="/">Home</el-menu-item>
        <el-sub-menu key="2" index='2' route="/eventos">
            <template #title>Eventos</template>
            <el-menu-item key="2.1" index="2.1" route="/eventos/proximos">Próximos</el-menu-item>
            <el-menu-item key="2.2" index="2.2" route="/eventos/nacionais">Nacionais</el-menu-item>
            <el-menu-item key="2.3" index="2.3" route="/eventos/internacionais">Internacionais</el-menu-item>
            <el-menu-item key="2.4" index="2.4" route="/eventos/culturais">Culturais</el-menu-item>
        </el-sub-menu>
        <el-sub-menu key="3" index='3' route="/repertorio">
            <template #title>Repertório</template>
            <el-menu-item key="3.1" index="3.1" route="/repertorio/racionais">Racionais</el-menu-item>
            <el-menu-item key="3.2" index="3.2" route="/repertorio/hinos">Hinos</el-menu-item>
            <el-menu-item key="3.3" index="3.3" route="/repertorio/toques">Toques</el-menu-item>
            <el-menu-item key="3.4" index="3.4" route="/repertorio/culturais">Culturais</el-menu-item>
            <el-menu-item key="3.5" index="3.5" route="/repertorio/rjb">Racional Jazz Band</el-menu-item>
            <el-menu-item key="3.6" index="3.6" route="/repertorio/diversas">Diversas</el-menu-item>
        </el-sub-menu>
        <el-sub-menu key="4" index='4' route="/musica">
            <template #title>Música</template>
            <el-menu-item key="4.1" index="4.1" route="/musica/teoria_musical">Teoria Musical</el-menu-item>
            <el-menu-item key="4.2" index="4.2" route="/musica/regencia">Regência</el-menu-item>
            <el-menu-item key="4.3" index="4.3" route="/musica/harmonia">Harmonia</el-menu-item>
            <el-menu-item key="4.4" index="4.4" route="/musica/digitacao">Digitação</el-menu-item>
            <el-menu-item key="4.5" index="4.5" route="/musica/divisao">Divisão</el-menu-item>
            <el-menu-item key="4.6" index="4.6" route="/musica/solfejo">Solfejo</el-menu-item>
            <el-menu-item key="4.7" index="4.7" route="/musica/sopro">Sôpro</el-menu-item>
            <el-menu-item key="4.8" index="4.8" route="/musica/percussao">Percussão</el-menu-item>
            <el-menu-item key="4.9" index="4.9" route="/musica/video_aulas">Vídeo Aulas</el-menu-item>
            <el-menu-item key="4.10" index="4.10" route="/musica/provas">Provas</el-menu-item>
        </el-sub-menu>
        <el-sub-menu v-show="!!auth_store.token" key="5" index='5' route="/administracao">
            <template #title>Administração</template>
            <el-menu-item key="5.1" index="5.1" route="/administracao/bandas">Bandas</el-menu-item>
            <el-menu-item key="5.2" index="5.2" route="/administracao/eventos">Eventos</el-menu-item>
            <el-menu-item key="5.3" index="5.3" route="/administracao/repertorio">Repertório</el-menu-item>
            <el-menu-item key="5.4" index="5.4" route="/administracao/componentes">componentes</el-menu-item>
            <el-menu-item key="5.5" index="5.5" route="/administracao/instrumentos">Instrumentos</el-menu-item>
            <el-menu-item key="5.6" index="5.6" route="/administracao/usuarios">Usuários</el-menu-item>
            <el-menu-item key="5.7" index="5.7" route="/administracao/relatorios">Relatórios</el-menu-item>
            <el-menu-item key="5.8" index="5.8" route="/administracao/configuracao">Configuração</el-menu-item>
        </el-sub-menu>
        <el-menu-item key="6" index='6' route="/sobre">Sobre</el-menu-item>
        <el-menu-item key="7" index='7' route="/contato">Contato</el-menu-item>
        <el-menu-item key="8" index='8' :route='!!auth_store.token ? "/" : "/login"'>
            {{ !!auth_store.token ? 'Sair' : 'Login' }}
        </el-menu-item>
    </el-menu>
</template>

<script lang='ts' setup>
import { breadcrumbsStore } from '~/store/breadcrumbs';
import { authStore } from '@/store/auth';
import items from '@/assets/json/menu-topo-rotas.json';

const store = breadcrumbsStore();
const auth_store = authStore();
const router = useRouter();
const { setBreadcrumbs } = store;
const activeIndex = ref('1');
let breadcrumb: string[][] = [];


const handleSelect = (index: string) => {
    console.log(index)
    if (index !== "8") {
        activeIndex.value = index;
        let array_index: string[] = expandIndex(index)
        let breads: (string | string[])[] = findForIndexes(items as (string | string[])[], array_index)
        let breadcrumbs: string[][] = [];
        breads.forEach(item => breadcrumbs.push(item as string[]))
        setBreadcrumbs(breadcrumbs)
    }
    else {
        handleAuth();
    }
}

const handleAuth = () => {

    if (!!auth_store.token) {
        auth_store.clearToken();
        setBreadcrumbs([['1', 'Home', '/', 'Seja Bem Vindo']]);
        router.push('/');
    }
    else {
        setBreadcrumbs([["8", "Login", "/login", "Página de Login"]]);
        router.push('/login');
    }
}

//Transforma um indice do tipo 2.1.3 em ['2','2.1','2.1.3']
function expandIndex(string: string) {
    let lista: string[] = []
    if (string.includes("."))
        string.split(".").forEach((item, index, array) => {
            if (index === 0)
                lista.push(item)
            else {
                lista.push(lista[index - 1] + "." + array[index])
            }
        })
    else
        lista.push(string)
    return lista
}

//Coloca um array e os subarrays em um único array
function orderedArray(array: (string | string[])[]) {
    const superarray: (string | string[])[] = []
    array.forEach((item: (string | string[])) => {
        superarray.push(item.slice(0, 4))
        if (item[4].length > 0) {
            superarray.push(...item[4]);
        }
    });
    return superarray
}

//Retorna os registros requeridos
function findForIndexes(array: (string | string[])[], indices: string[]) {
    let lista: (string | string[])[] = []
    const lista_ordenada = orderedArray(array)
    indices.forEach(indice => {
        lista_ordenada.forEach((item: string | string[]) => {
            if (item[0] === indice) {
                lista.push(item.slice(0, 4));
            }
        })
    })
    return lista
}

</script>

<style>
.link-toolbar {
    text-decoration: none;
}
</style>