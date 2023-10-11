const { createApp } = Vue;

createApp({
  data() {
    return {
      baseURL: "https://movie-server.huseinhk.me",
      page: "login",
      passwordErrorMessage: "",
      emailErrorMessage: "",
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
      movies: [],
      genres: [],
      newMovie: {
        title: "",
        synopsis: "",
        genreId: "",
        rating: null,
        trailerUrl: "",
        imgUrl: "",
      },
    };
  },
  methods: {
    changePage(page) {
      this.page = page;
      localStorage.setItem("lastAccessedPage", this.page);
    },
    wipeData(obj) {
      for (key in obj) {
        key = "";
      }
    },
    async handleCredentialResponse(response) {
      try {
        const res = await axios({
          method: "post",
          url: this.baseURL + "/google-login",
          headers: {
            google_token: response.credential,
          },
        });

        localStorage.setItem("access_token", res.data.access_token);
        this.fetchMovies();
        this.fetchGenres();
        this.changePage("dashboard");
      } catch (error) {
        console.log(error);
      }
    },
    async submitLoginForm() {
      try {
        const response = await axios({
          method: "post",
          url: this.baseURL + "/login",
          data: this.loginForm,
        });

        const { access_token } = response.data;
        localStorage.access_token = access_token;

        this.wipeData(this.loginForm);
        this.fetchMovies();
        this.fetchGenres();
        this.page = "dashboard";
      } catch (error) {
        console.log(error);
      }
    },
    async submitRegisterForm() {
      try {
        await axios({
          method: "post",
          url: this.baseURL + "/register",
          data: this.registerForm,
        });

        const response = await axios({
          method: "post",
          url: this.baseURL + "/login",
          data: {
            email: this.registerForm.email,
            password: this.registerForm.password,
          },
        });

        const { access_token } = response.data;
        localStorage.access_token = access_token;

        this.wipeData(this.registerForm);
        this.fetchMovies();
        this.fetchGenres();
        this.page = "dashboard";
      } catch (error) {
        console.log(error);
      }
    },
    async submitNewMovie() {
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseURL + "/movies",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: this.newMovie,
        });

        await this.fetchMovies();
        this.wipeData(this.newMovie);
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      localStorage.removeItem("access_token");
      this.changePage("login");
    },
    async fetchMovies() {
      try {
        const { data } = await axios({
          method: "get",
          url: this.baseURL + "/movies",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.movies = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchGenres() {
      try {
        const { data } = await axios({
          method: "get",
          url: this.baseURL + "/genres",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.genres = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.fetchMovies();
      this.fetchGenres();
      this.page = localStorage.getItem("lastAccessedPage");
    }
  },
  watch: {
    "loginForm.email"(newValue, oldValue) {
      if (!newValue.includes("@") || !newValue.includes(".")) {
        this.emailErrorMessage = "Input type is not email";
      } else {
        this.emailErrorMessage = "";
      }
      if (!newValue.length) {
        this.emailErrorMessage = "";
      }
    },
    "registerForm.email"(newValue, oldValue) {
      if (!newValue.includes("@") || !newValue.includes(".")) {
        this.emailErrorMessage = "Input type is not email";
      } else {
        this.emailErrorMessage = "";
      }
      if (!newValue.length) {
        this.emailErrorMessage = "";
      }
    },
    "loginForm.password"(newValue, oldValue) {
      if (newValue.length < 5) {
        this.passwordErrorMessage = "Minimum length of password must be 5";
      } else {
        this.passwordErrorMessage = "";
      }
      if (!newValue.length) {
        this.passwordErrorMessage = "";
      }
    },
    "registerForm.password"(newValue, oldValue) {
      if (newValue.length < 5) {
        this.passwordErrorMessage = "Minimum length of password is 5";
        console.log("ha");
      } else {
        this.passwordErrorMessage = "";
      }
      if (!newValue.length) {
        this.passwordErrorMessage = "";
      }
    },
  },
  computed: {
    movieCount() {
      return this.movies.length;
    },
    genreCount() {
      return this.genres.length;
    },
  },
  mounted() {
    if (this.page === "login" || this.page === "register") {
      google.accounts.id.initialize({
        client_id: "782243135980-7dfmhrfqah531g5ob5u200trjrkl0ah2.apps.googleusercontent.com",
        callback: this.handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
  },
  updated() {
    if (this.page === "login" || this.page === "register") {
      google.accounts.id.initialize({
        client_id: "782243135980-7dfmhrfqah531g5ob5u200trjrkl0ah2.apps.googleusercontent.com",
        callback: this.handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
  },
}).mount("#app");
