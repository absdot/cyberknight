<template>
  <!-- Page wrapper for sticky footer -->
  <!-- Wraps everything except footer to push footer to the bottom of the page if there is little content -->
  <!-- <main class="page-wrapper"> -->
  <Header />
  <!-- Page content -->
  <section class="container pt-5">
    <div class="row">
      <Sidebar />
      <slot />
    </div>
  </section>
  <!-- </main> -->
  <Footer />
</template>

<script setup>
import loadModule from "@/assets/js/module";
import { onMounted } from "vue";

onMounted(() => {
  loadModule();
});
</script>
