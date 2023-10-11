<script>
export default {
  data() {
    return {
      passwordErrorMessage: "",
      emailErrorMessage: "",
      registerForm: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      }
    }
  },
  methods: {
    changePage(page) {
      this.$emit('page', page)
    },
    submitHandler() {
      this.$emit('submitHandler', this.registerForm)
      this.wipeData(this.registerForm)
    },
    wipeData(obj) {
      for (key in obj) {
        key = "";
      }
    },
  },
  watch: {
    'registerForm.email'(newValue) {
      if (!newValue.includes("@") || !newValue.includes(".")) {
        this.emailErrorMessage = "Input type is not email";
      } else {
        this.emailErrorMessage = "";
      }
      if (!newValue.length) {
        this.emailErrorMessage = "";
      }
    },
    'registerForm.password'(newValue) {
      if (newValue.length < 5) {
        this.passwordErrorMessage = "Minimum length of password is 5";
      } else {
        this.passwordErrorMessage = "";
      }
      if (!newValue.length) {
        this.passwordErrorMessage = "";
      }
    },
  }
}
</script>

<template>
  <section id="register-section">
    <form @submit.prevent="submitHandler" id="register-form" class="rounded-3 p-2">
      <div class="d-flex flex-wrap rounded-3 p-3 h-100 gap-2 justify-content-around" style="background-color: white;">
        <!-- Upper div -->
        <div style="width: 100%;">
          <h1 class="text-center">Welcome!</h1>
          <h2 class="text-center fs-5 text-secondary">Please enter your details</h2>
        </div>

        <!-- Left Div -->
        <div style="width: 45%;">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input v-model="registerForm.username" type="text" class="form-control" autofocus>
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="registerForm.email" type="text" class="form-control">
            <div v-if="emailErrorMessage.length" class="text-danger mt-1">{{ emailErrorMessage }}</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="registerForm.password" type="password" class="form-control">
            <div v-if="passwordErrorMessage.length" class="text-danger mt-1">{{ passwordErrorMessage }}</div>
          </div>
        </div>

        <!-- Right Div -->
        <div style="width: 45%;">
          <div class="mb-3">
            <label class="form-label">Phone Number</label>
            <input v-model="registerForm.phoneNumber" type="number" class="form-control">
          </div>

          <div class="mb-5">
            <label class="form-label">Address</label>
            <input v-model="registerForm.address" type="text" class="form-control">
          </div>

          <div class="mb-3">
            <button type="submit" class="btn btn-primary rounded-5 w-100">Register</button>
          </div>

          <p class="text-center text-secondary">or Sign up with</p>
          <div id="buttonDiv" class="d-flex justify-content-center"></div>
        </div>

        <!-- Bottom div -->
        <div style="width: 100%; align-self: flex-end;">
          <p class=" text-center mt-5" id="register-link">Already have an account? <a @click.prevent="changePage('login')"
              href="" class="link-body-emphasis">Sign in</a></p>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>
#register-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(38, 38, 45);
  background: linear-gradient(45deg, rgba(38, 38, 45, 1) 0%, rgba(56, 58, 66, 1) 43%, rgba(67, 71, 80, 1) 59%, rgba(74, 79, 89, 1) 71%, rgba(90, 97, 109, 1) 81%, rgba(115, 124, 139, 1) 93%, rgba(148, 161, 178, 1) 100%);
}

#register-form {
  background-color: #e9e9e9;
  width: 65vw;
  height: 80vh;
}
</style>