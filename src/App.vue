<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const default_layout = "blank";

const layout = computed(() => {
  return (route.meta.layout || default_layout) + "-layout";
});
</script>
