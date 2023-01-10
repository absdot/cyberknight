<template>
  <!-- Navbar -->
  <!-- Remove "navbar-sticky" class to make navigation bar scrollable with the page -->
  <header
    class="header navbar navbar-expand-lg navbar-sticky"
    :class="
      route.meta.layout == 'default'
        ? 'position-absolute navbar-dark'
        : 'bg-light border-bottom border-light shadow-sm fixed-top'
    "
  >
    <div class="container px-3">
      <a href="/" class="navbar-brand pe-3">
        <img src="/vite.svg" width="47" alt="CyberKnight" />
        CyberKnight
      </a>
      <div id="navbarNav" class="offcanvas offcanvas-end bg-dark">
        <div class="offcanvas-header border-bottom border-light">
          <h5 class="offcanvas-title text-white">Menu</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-header border-top border-light">
          <router-link
            :to="{ name: 'messages' }"
            class="btn btn-primary w-100"
            rel="noopener"
          >
            <i class="bx bx-lock fs-4 lh-1 me-1"></i>
            &nbsp;Sign In
          </router-link>
        </div>
      </div>
      <button
        type="button"
        class="navbar-toggler"
        data-bs-toggle="offcanvas"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <template v-if="!authenticated">
        <!-- <button
          class="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#signInModal"
        >
          <i class="bx bx-lock-open fs-5 lh-1 me-1"></i>
          &nbsp;Sign In
        </button> -->
        <button
          class="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex"
          type="button"
          @click="onSignIn()"
        >
          <i class="bx bx-lock-open fs-5 lh-1 me-1"></i>
          &nbsp;Sign In
        </button>
      </template>
      <template v-else>
        <template v-if="!route.meta.auth">
          <router-link
            :to="{ name: 'messages' }"
            class="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex"
            rel="noopener"
          >
            <i class="bx bx-home fs-5 lh-1 me-1"></i>
            &nbsp;Dashboard
          </router-link>
        </template>
        <template v-else>
          <button
            class="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex"
            type="button"
            @click="onSignOut()"
          >
            <i class="bx bx-log-out fs-5 lh-1 me-1"></i>
            &nbsp;Sign Out
          </button>
        </template>
      </template>
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const { authenticated, authUser } = storeToRefs(mainStore());
const { googleSignIn, signUserOut } = mainStore();

const route = useRoute();
const router = useRouter();

onMounted(() => {
  console.log('authUser:', authUser.value);
})

const onSignIn = () => {
  googleSignIn().then(() => {
    console.log("onSignIn");
    router.push({ name: "home" });
  });
};

const onSignOut = () => {
  signUserOut().then(() => {
    router.push({ name: "home" });
  });
};
</script>
