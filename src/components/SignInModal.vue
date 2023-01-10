<template>
  <!-- Modal with tabs and forms -->
  <div class="modal fade" tabindex="-1" role="dialog" id="signInModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <!-- Modal header with nav tabs -->
        <div class="modal-header">
          <ul class="nav nav-tabs mb-0" role="tablist">
            <li class="nav-item fs-sm mb-0">
              <a
                class="nav-link active"
                href="#signin"
                data-bs-toggle="tab"
                role="tab"
                aria-selected="true"
              >
                <i class="bx bx-lock-open fs-base me-2"></i>
                Sign in
              </a>
            </li>
            <li class="nav-item fs-sm mb-0">
              <a
                class="nav-link"
                href="#signup"
                data-bs-toggle="tab"
                role="tab"
                aria-selected="false"
              >
                <i class="bx bx-user fs-base me-2"></i>
                Sign up
              </a>
            </li>
          </ul>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Modal body with tab panes -->
        <div class="modal-body tab-content py-4">
          <!-- Sign in form -->
          <form
            class="tab-pane fade show active"
            autocomplete="off"
            id="signin"
            @submit.prevent="onSignIn($event)"
          >
            <div class="mb-3">
              <label class="form-label" for="email1">Email address</label>
              <input
                v-model="_signIn.email"
                class="form-control"
                type="email"
                id="email1"
                placeholder="johndoe@example.com"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="pass1">Password</label>
              <div class="password-toggle">
                <input
                  v-model="_signIn.password"
                  class="form-control"
                  type="password"
                  id="pass1"
                />
                <label class="password-toggle-btn">
                  <input class="password-toggle-check" type="checkbox" /><span
                    class="password-toggle-indicator"
                  ></span>
                </label>
              </div>
            </div>
            <!-- <div class="mb-3 d-flex flex-wrap justify-content-between">
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="remember" />
                <label class="form-check-label" for="remember"
                  >Remember me</label
                >
              </div>
              <a class="fs-sm" href="#">Forgot password?</a>
            </div> -->
            <button class="btn btn-primary d-block w-100" type="submit">
              Sign in
            </button>
          </form>

          <!-- Sign up form -->
          <form
            class="tab-pane fade"
            autocomplete="off"
            id="signup"
            @submit.prevent="onSignUp($event)"
          >
            <div class="mb-3">
              <label class="form-label" for="name">Full name</label>
              <input
                v-model="_signUp.displayName"
                class="form-control"
                type="text"
                id="name"
                placeholder="John Doe"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="email2">Email address</label>
              <input
                v-model="_signUp.email"
                class="form-control"
                type="email"
                id="email2"
                placeholder="johndoe@example.com"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="pass2">Password</label>
              <div class="password-toggle">
                <input
                  v-model="_signUp.password"
                  class="form-control"
                  type="password"
                  id="pass2"
                />
                <label class="password-toggle-btn">
                  <input class="password-toggle-check" type="checkbox" /><span
                    class="password-toggle-indicator"
                  ></span>
                </label>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label" for="pass3">Confirm password</label>
              <div class="password-toggle">
                <input
                  v-model="_signUp.password_confirmation"
                  class="form-control"
                  type="password"
                  id="pass3"
                />
                <label class="password-toggle-btn">
                  <input class="password-toggle-check" type="checkbox" /><span
                    class="password-toggle-indicator"
                  ></span>
                </label>
              </div>
            </div>
            <button class="btn btn-primary d-block" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { mainStore } from "@/store";
const { signIn, signUp } = mainStore();

const _signIn = ref({});
const _signUp = ref({});

const onSignIn = () => {
  signIn(_signIn.value).then(() => {
    location.href = "/messages";
  });
};

const onSignUp = () => {
  signUp(_signUp.value).then(() => {
    location.href = "/messages";
  });
};
</script>
