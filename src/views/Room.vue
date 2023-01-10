<template>
  <div class="col-md-8 offset-lg-1 pb-5 mb-2 mb-lg-4 pt-md-5 mt-n3 mt-md-0">
    <div></div>
  </div>
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
