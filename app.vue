<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang='ts' setup>
import { watch, onBeforeMount } from "vue";
import { authStore } from "~~/store/auth";

const as = authStore();

onBeforeMount(() => {
  as.$state = JSON.parse(localStorage.getItem("authStore") as string);
});
watch(as.$state, (value) => {
  localStorage.setItem("authStore", JSON.stringify(as.$state));
});
</script>