const { createApp } = Vue;

createApp({
  data() {
    return {
      baseURL: "https://movie-server.huseinhk.me",
      page: "login",
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

        this.fetchMovies();
        this.fetchGenres();
        this.page = "dashboard";
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      localStorage.removeItem("access_token");
      this.page = "login";
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
      this.page = "dashboard";
    }
  },
  mounted() {
    this.fetchMovies();
    this.fetchGenres();
  },
}).mount("#app");
