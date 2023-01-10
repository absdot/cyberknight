<template>
  <!-- Account security -->
  <div class="col-md-8 offset-lg-1 pb-5 mb-lg-2 mb-lg-4 pt-md-5 mt-n3 mt-md-0">
    <div class="ps-md-3 ps-lg-0 mt-md-2 pt-md-4 pb-md-2">
      <h1 class="h2 pt-xl-1 pb-3">Security</h1>

      <!-- Password -->
      <h2 class="h5 text-primary mb-4">Password</h2>
      <form
        class="needs-validation pb-3 pb-lg-4"
        novalidate
        @submit.prevent="onUpdatePassword($event)"
      >
        <div class="row">
          <div class="col-sm-6 mb-4">
            <label for="cp" class="form-label fs-base">Current password</label>
            <div class="password-toggle">
              <input
                v-model="payload.password"
                type="password"
                id="cp"
                class="form-control form-control-lg"
                required
              />
              <label
                class="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <input class="password-toggle-check" type="checkbox" />
                <span class="password-toggle-indicator"></span>
              </label>
              <div class="invalid-tooltip position-absolute top-100 start-0">
                Incorrect password!
              </div>
            </div>
          </div>
        </div>
        <div class="row pb-2">
          <div class="col-sm-6 mb-4">
            <label for="np" class="form-label fs-base">New password</label>
            <div class="password-toggle">
              <input
                v-model="payload.new_password"
                type="password"
                id="np"
                class="form-control form-control-lg"
                required
              />
              <label
                class="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <input class="password-toggle-check" type="checkbox" />
                <span class="password-toggle-indicator"></span>
              </label>
              <div class="invalid-tooltip position-absolute top-100 start-0">
                Incorrect password!
              </div>
            </div>
          </div>
          <div class="col-sm-6 mb-4">
            <label for="cnp" class="form-label fs-base"
              >Confirm new password</label
            >
            <div class="password-toggle">
              <input
                v-model="payload.new_password_confirmation"
                type="password"
                id="cnp"
                class="form-control form-control-lg"
                required
              />
              <label
                class="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <input class="password-toggle-check" type="checkbox" />
                <span class="password-toggle-indicator"></span>
              </label>
              <div class="invalid-tooltip position-absolute top-100 start-0">
                Incorrect password!
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex mb-3">
          <button type="reset" class="btn btn-secondary me-3">Cancel</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { mainStore } from "@/store";

const { updatePassword } = mainStore();
const payload = ref({});

const onUpdatePassword = () => {
  updatePassword(payload).value.then(() => {
    console.log("onUpdatePassword");
  });
};
</script>
