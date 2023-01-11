<template>
  <template v-if="authUser.uid == message.uid">
    <div class="d-flex align-items-start justify-content-end mb-3">
      <div class="pe-2 me-1" style="max-width: 348px">
        <div
          class="bg-primary text-light p-3 mb-1"
          style="
            border-top-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          "
        >
          {{ message.text }}
        </div>
        <div
          class="d-flex justify-content-end align-items-center fs-sm text-muted"
        >
        <!-- <div class="fs-sm text-muted">{{ dayjs(message.createdAt.toDate()).format('hh:mm a') }}</div> -->
          <i class="bx bx-check-double fs-xl text-primary ms-2"></i>
        </div>
      </div>
      <img
        :src="message.photoURL"
        class="rounded-circle"
        width="40"
        :alt="message.displayName"
      />
    </div>
  </template>
  <template v-else>
    <!-- User message -->
    <div class="d-flex align-items-start mb-3">
      <img
        :src="message.photoURL"
        class="rounded-circle"
        width="40"
        alt="Albert Flores"
      />
      <div class="ps-2 ms-1" style="max-width: 348px">
        <div
          class="bg-secondary p-3 mb-1"
          style="
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          "
        >
          {{ message.text }}
        </div>
        <!-- <div class="fs-sm text-muted">{{ message.createdAt }}</div> -->
        <!-- <div class="fs-sm text-muted">{{ dayjs(message.createdAt.toDate()).format('hh:mm a') }}</div> -->
      </div>
    </div>
  </template>
</template>

<script setup>
import { mainStore } from "@/store";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const { authUser, activeUser } = storeToRefs(mainStore());

const props = defineProps({
  message: { type: Object, default: {} },
});

onMounted(() => console.log('message:', props.message))
</script>
