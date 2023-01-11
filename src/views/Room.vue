<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";

const { chats, chatrooms } = storeToRefs(mainStore());
const { getChatrooms } = mainStore();

onMounted(() => {
  getChatrooms();
  console.log(chatrooms.value, chats.value);
});
</script>
