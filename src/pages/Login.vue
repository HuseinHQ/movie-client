<template>
  <section id="login-section">
    <div class="row rounded-3 p-2 login-div-container">
      <!-- Left Div -->
      <div class="col-7">
        <img src="../assets/img/login-img.png" alt="login-img" class="w-100 p-5">
      </div>
      <!-- Right Div -->
      <div class="col-5 right-div-login rounded-3 p-5">
        <h1 class="text-center">Welcome Back!</h1>
        <h2 class="text-center fs-5 text-secondary">Please enter your details</h2>
        <form @submit.prevent="submitHandler">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="text" class="form-control">
            <div v-if="emailErrorMessage.length" class="text-danger mt-1">{{ emailErrorMessage }}</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control">
            <div v-if="passwordErrorMessage.length" class="text-danger mt-1">{{ passwordErrorMessage }}</div>
          </div>

          <div class="mb-3">
            <button type="submit" class="btn btn-primary rounded-5 w-100">Login</button>
          </div>

          <p class="text-center text-secondary">or Sign in with</p>
          <div id="buttonDiv" class="d-flex justify-content-center"></div>
        </form>
        <p class=" text-center mt-5">Don't have an account? <a @click.prevent="changePage('register')" href=""
            class="link-body-emphasis">Sign up</a></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      passwordErrorMessage: "",
      emailErrorMessage: "",
      email: "",
      password: "",
    }
  },
  methods: {
    changePage(page) {
      this.$emit('page', page)
    },
    submitHandler() {
      this.$emit('submitHandler', this.email, this.password)
    }
  },
  watch: {
    "email"(newValue, oldValue) {
      if (!newValue.includes("@") || !newValue.includes(".")) {
        this.emailErrorMessage = "Input type is not email";
      } else {
        this.emailErrorMessage = "";
      }
      if (!newValue.length) {
        this.emailErrorMessage = "";
      }
    },
    "password"(newValue) {
      if (newValue.length < 5) {
        this.passwordErrorMessage = "Minimum length of password must be 5";
      } else {
        this.passwordErrorMessage = "";
      }
      if (!newValue.length) {
        this.passwordErrorMessage = "";
      }
    }
  }
}
</script>

<style scoped>
#login-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(38, 38, 45);
  background: linear-gradient(45deg, rgba(38, 38, 45, 1) 0%, rgba(56, 58, 66, 1) 43%, rgba(67, 71, 80, 1) 59%, rgba(74, 79, 89, 1) 71%, rgba(90, 97, 109, 1) 81%, rgba(115, 124, 139, 1) 93%, rgba(148, 161, 178, 1) 100%);
}

.login-div-container {
  background-color: #e9e9e9;
  width: 70vw;
  height: 80vh;
}

.right-div-login {
  background-color: white;
  color: #333;
  height: 100%;
}
</style>