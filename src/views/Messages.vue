<template>
  <!-- Account messages -->
  <div class="ps-md-3 mt-md-2 pt-md-4 pb-md-2">
    <div
      class="row g-0 border rounded-3 shadow-sm position-relative overflow-hidden"
    >
      <!-- Contacts list -->
      <div class="col-lg-4">
        <div
          id="contactsList"
          class="offcanvas-lg offcanvas-start position-absolute position-lg-relative h-100 bg-secondary shadow-none border-end viewport"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          _style="max-height: 712px"
        >
          <div class="card-header w-100 border-0 p-4">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0">Messages</h1>
              <button
                type="button"
                class="btn btn-link nav-link bg-faded-primary-hover d-lg-none py-2 ps-2 pe-3 me-n3"
                data-bs-dismiss="offcanvas"
                data-bs-target="#contactsList"
              >
                <i class="bx bx-x fs-xl me-1"></i>
                Close
              </button>
            </div>
            <div class="position-relative">
              <input
                type="text"
                class="form-control pe-5"
                placeholder="Search"
              />
              <i
                class="bx bx-search fs-xl text-nav position-absolute top-50 end-0 translate-middle-y me-3"
              ></i>
            </div>
          </div>
          <swiper
            direction="vertical"
            slidesPerView="auto"
            :freeMode="true"
            :mousewheel="true"
            :_scrollbar="true"
            :scrollbar="{
              el: '.swiper-scrollbar',
            }"
            :modules="[FreeMode, Scrollbar, Mousewheel]"
            :class="'card-body scrollbar-hover overflow-hidden w-100 p-0'"
          >
            <swiper-slide class="h-auto">
              <a
                v-for="(user, i) in chatUsers"
                :key="i"
                href="#"
                class="d-flex align-items-start border-bottom text-decoration-none bg-faded-primary-hover py-3 px-4"
                :class="
                  activeUser.uid == user.uid
                    ? 'position-relative bg-light pe-none'
                    : ''
                "
                @click="activeUser = user"
              >
                <div
                  v-if="activeUser.uid == user.uid"
                  class="position-absolute top-0 start-0 bg-primary w-2 h-100"
                ></div>
                <img
                  :src="user.photoURL"
                  class="rounded-circle"
                  width="40"
                  :alt="user.displayName"
                />
                <div class="w-100 ps-2 ms-1">
                  <div
                    class="d-flex align-items-center justify-content-between mb-1"
                  >
                    <h6 class="mb-0 me-2">{{ user.displayName }}</h6>
                    <span class="fs-xs text-muted">{{
                      dayjs(user.createdAt).format("h:m A")
                    }}</span>
                  </div>
                  <p class="fs-sm text-body mb-0">Dolor, quam habitant...</p>
                </div>
              </a>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!-- Chat window -->
      <div class="col-lg-8 viewport" _style="max-height: 712px">
        <div class="card h-100 border-0 bg-transparent pb-3">
          <!-- Header -->
          <div
            class="navbar card-header d-flex align-items-center justify-content-between w-100 p-sm-4 p-3"
          >
            <div class="d-flex align-items-center pe-3">
              <button
                type="button"
                class="navbar-toggler d-lg-none me-3"
                data-bs-toggle="offcanvas"
                data-bs-target="#contactsList"
                aria-controls="contactsList"
                aria-label="Toggle contacts list"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <img
                :src="activeUser.photoURL"
                class="rounded-circle"
                width="40"
                alt="Albert Flores"
              />
              <h6 class="mb-0 px-1 mx-2">{{ activeUser.displayName }}</h6>
              <div
                class="bg-success rounded-circle"
                style="width: 8px; height: 8px"
              ></div>
            </div>
            <div class="d-flex d-none">
              <div class="dropdown me-sm-2">
                <button
                  type="button"
                  class="btn btn-outline-primary px-2 px-sm-3"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    class="bx bx-dots-horizontal-rounded fs-xl mx-1 mx-sm-0 me-xl-2"
                  ></i>
                  <span class="d-none d-xl-inline">More</span>
                </button>
                <div class="dropdown-menu dropdown-menu-end my-1">
                  <a href="#" class="dropdown-item">View profile</a>
                  <a href="#" class="dropdown-item">Disable notifications</a>
                  <a href="#" class="dropdown-item">Edit contact</a>
                  <a href="#" class="dropdown-item">Delete contact</a>
                  <a href="#" class="dropdown-item">Delete chat</a>
                  <a href="#" class="dropdown-item">Clear history</a>
                  <a href="#" class="dropdown-item">Block user</a>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-outline-danger d-none d-sm-inline-flex px-2 px-sm-3 ms-1"
              >
                <i class="bx bx-trash-alt fs-xl me-xl-2"></i>
                <span class="d-none d-xl-inline">Clear chat</span>
              </button>
            </div>
          </div>

          <!-- Messages -->
          <swiper
            direction="vertical"
            slidesPerView="auto"
            :freeMode="true"
            :mousewheel="true"
            :_scrollbar="true"
            :scrollbar="{
              el: '.swiper-scrollbar',
            }"
            :modules="[FreeMode, Scrollbar, Mousewheel]"
            :class="'card-body swiper scrollbar-hover overflow-hidden w-100 pb-0'"
          >
            <swiper-slide class="h-auto">
              <Message
                v-for="(message, i) in messages"
                :key="i"
                :message="message"
              />
            </swiper-slide>
          </swiper>

          <!-- Footer (Send message form) -->
          <form
            class="card-footer d-sm-flex w-100 border-0 pt-3 pb-3 px-4"
            @submit.prevent="onCreateMessage()"
          >
            <div class="position-relative w-100 me-2 mb-3 mb-sm-0">
              <input
                v-model="text"
                type="text"
                class="form-control form-control-lg"
                style="padding-right: 85px"
              />
              <div
                class="position-absolute top-50 end-0 translate-middle-y d-flex zindex-3 me-2"
              >
                <button
                  type="button"
                  class="btn btn-icon btn-sm btn-link nav-link bg-faded-primary-hover me-1"
                >
                  <i class="bx bx-paperclip fs-4"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-icon btn-sm btn-link nav-link bg-faded-primary-hover"
                >
                  <i class="bx bx-smile fs-4"></i>
                </button>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-icon btn-lg d-none d-sm-inline-flex ms-1"
            >
              <i class="bx bx-send"></i>
            </button>
            <button
              type="submit"
              class="btn btn-primary btn-lg w-100 d-sm-none"
            >
              <i class="bx bx-send fs-xl me-2"></i>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
// import { Navigation } from "swiper";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";

// Import Swiper styles
import "swiper/css";

import Message from "@/components/Message.vue";

import { computed, onMounted, ref } from "vue";
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";

const { authUser, activeUser, users, messages, chatrooms } = storeToRefs(
  mainStore()
);
const { getUsers, getChatrooms, getMessages, createMessage } = mainStore();

const text = ref("");
const chatUsers = computed(() =>
  users.value.filter((u) => u.uid != authUser.value.uid)
);
// const activeUser = ref({});

onMounted(() => {
  getUsers();
  getMessages();
  getChatrooms();
  console.log(messages.value);
  // ResKKassjqWjQ8xp0o4EZ1UE8HJ3
});

const onCreateMessage = () => {
  createMessage(text.value);
  text.value = "";
};
</script>

<style scoped>
.viewport {
  height: calc(100vh - 230px);
}
.swiper {
  padding: 20px;
}
</style>
