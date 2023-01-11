<template>
  <!-- Page wrapper for sticky footer -->
  <!-- Wraps everything except footer to push footer to the bottom of the page if there is little content -->
  <!-- <main class="page-wrapper"> -->
  <Header />
  <!-- Page content -->
  <section class="container pt-5">
    <div class="row">
      <Sidebar />
      <!-- <div class="col-md-8 col-lg-9 pb-5 mb-lg-2 mb-lg-4 pt-md-5 mt-n3 mt-md-0"> -->
      <div class="col-md-8 col-lg-9 p-4">
        <slot />
      </div>
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
