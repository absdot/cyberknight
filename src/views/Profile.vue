<template>
  <!-- Account details -->
  <div class="ps-md-3 ps-lg-0 mt-md-2 py-md-4">
    <h1 class="h2 pt-xl-1 pb-3">Profile</h1>

    <!-- Basic info -->
    <h2 class="h5 text-primary mb-4">Basic info</h2>
    <form
      class="needs-validation border-bottom pb-3 pb-lg-4"
      novalidate
      @submit.prevent="onUpdateProfile($event)"
    >
      <div class="row pb-2">
        <div class="col-sm-12 mb-4">
          <label for="fn" class="form-label fs-base">Name</label>
          <input
            v-model="authUser.displayName"
            type="text"
            id="fn"
            class="form-control form-control-lg"
            required
          />
          <div class="invalid-feedback">Please enter your full name!</div>
        </div>
        <div class="col-sm-6 mb-4">
          <label for="email" class="form-label fs-base">Email address</label>
          <input
            v-model="authUser.email"
            type="email"
            id="email"
            class="form-control form-control-lg"
            required
          />
          <div class="invalid-feedback">
            Please provide a valid email address!
          </div>
        </div>
        <div class="col-sm-6 mb-4">
          <label for="phone" class="form-label fs-base"
            >Phone <small class="text-muted">(optional)</small></label
          >
          <input
            v-model="authUser.phoneNumber"
            type="text"
            id="phone"
            class="form-control form-control-lg"
            data-format='{"numericOnly": true, "delimiters": ["+1 ", " ", " "], "blocks": [0, 3, 3, 2]}'
            placeholder="+1 ___ ___ __"
          />
        </div>
      </div>
      <div class="d-flex mb-3">
        <button type="reset" class="btn btn-secondary me-3">Cancel</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
    </form>

    <!-- Delete account -->
    <h2 class="h5 text-primary pt-1 pt-lg-3 mt-4">Delete account</h2>
    <p>
      When you delete your account, your public profile will be deactivated
      immediately. If you change your mind before the 14 days are up, sign in
      with your email and password, and we’ll send you a link to reactivate your
      account.
    </p>
    <div class="form-check mb-4">
      <input type="checkbox" id="delete-account" class="form-check-input" />
      <label for="delete-account" class="form-check-label fs-base"
        >Yes, I want to delete my account</label
      >
    </div>
    <button type="button" class="btn btn-danger">Delete</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";

const { authUser } = storeToRefs(mainStore());
const { updateUserProfile } = mainStore();

const route = useRoute();
const router = useRouter();

const onUpdateProfile = () => {
  console.log(authUser.value);
  const payload = (({ displayName, email, phoneNumber }) => ({
    displayName,
    email,
    phoneNumber,
  }))(authUser.value);

  console.log(payload);
  updateUserProfile(payload);
};
</script>
