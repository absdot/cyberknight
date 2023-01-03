<template>
  <button
    type="button"
    class="btn btn-primary mb-3">
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: String,
});
</script>
