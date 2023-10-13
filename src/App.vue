<script>
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Dashboard from './pages/Dashboard.vue'
import Movies from './pages/Movies.vue'
import Genres from './pages/Genres.vue'
import Logs from './pages/Logs.vue'
import NewMovie from './pages/NewMovie.vue'
import EditMovie from './pages/EditMovie.vue'
import { useToast } from "vue-toastification";
import axios from 'axios'

export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  components: {
    Login,
    Register,
    Dashboard,
    Movies,
    Genres,
    Logs,
    NewMovie,
    EditMovie,
  },
  data() {
    return {
      baseURL: "https://movie-server.huseinhk.me",
      page: "login",
      movies: [],
      genres: [],
      logs: [],
      user: null,
      movieId: 0
    }
  },
  methods: {
    changePage(page, id) {
      if (id) {
        this.movieId = id;
      }
      localStorage.setItem('prevPage', this.page)
      this.page = page;
      if (this.page !== 'newMovie' && this.page !== 'editMovie') {
        localStorage.setItem("lastAccessedPage", this.page);
      }
    },
    async patchMovieStatus(id, status) {
      try {
        const {data} = await axios({
          method: 'patch',
          url: this.baseURL + '/movies/' + id,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            status
          }
        })

        this.fetchMovies();
        this.fetchLogs();
        this.toast.success(data.message, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      } catch (error) {
        console.log(error)
        this.toast.error(`${error.response.data.message}`, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      }
    },
    async submitLoginForm(email, password) {
      try {
        const response = await axios({
          method: "post",
          url: this.baseURL + "/login",
          data: {
            email,
            password
          },
        });

        const { access_token } = response.data;
        localStorage.access_token = access_token;

        this.fetchMovies();
        this.fetchGenres();
        this.fetchLogs();
        this.changePage('dashboard');
        this.toast.success("Signed in successfully!", {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      } catch (error) {
        console.log(error);
        this.toast.error(`${error.response.data.message}`, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      }
    },
    async submitRegisterForm(registerForm) {
      try {
        await axios({
          method: "post",
          url: this.baseURL + "/register",
          data: registerForm,
        });

        const response = await axios({
          method: "post",
          url: this.baseURL + "/login",
          data: {
            email: registerForm.email,
            password: registerForm.password,
          },
        });

        const { access_token } = response.data;
        localStorage.access_token = access_token;

        this.fetchMovies();
        this.fetchGenres();
        this.fetchLogs();
        this.changePage('dashboard');
        this.toast.success("Signed Up successfully!", {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      } catch (error) {
        console.log(error);
        this.toast.error(`${error.response.data.message}`, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      }
    },
    async submitNewMovie(newMovie) {
      try {
        await axios({
          method: "post",
          url: this.baseURL + "/movies",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: newMovie,
        });

        this.fetchMovies();
        this.fetchLogs();
        this.changePage('movies');
        this.toast.success('New movie added successfully', {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      } catch (error) {
        console.log(error);
        this.toast.error(`${error.response.data.message}`, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      }
    },
    async submitEditMovie(editedMovie, id) {
      try {
        await axios({
          method: 'put',
          url: this.baseURL + '/movies/' + id,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: editedMovie
        })

        this.fetchMovies();
        this.fetchLogs();
        this.changePage('movies');
        this.toast.success(`Movie with id ${id} edited successfully`, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      } catch (error) {
        console.log(error);
        this.toast.error(`${error.response.data.message}`, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
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
        this.fetchLogs();
        this.changePage("dashboard");
        this.toast.success("Signed in successfully!", {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      } catch (error) {
        console.log(error);
        this.toast.error('Failed to login', {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      }
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
        this.toast.error(`${error.response.data.message}`, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
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
        this.toast.error(`${error.response.data.message}`, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      }
    },
    async fetchLogs() {
      try {
        const { data } = await axios({
          method: 'get',
          url: this.baseURL + '/histories',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.logs = data
      } catch (error) {
        console.log(error);
        this.toast.error(`${error.response.data.message}`, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      }
    },
    async fetchUser() {
      try {
        const { data } = await axios({
          method: 'get',
          url: this.baseURL + '/users',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.user = data;
        console.log(this.user);
      } catch (error) {
        console.log(error);
        this.toast.error(`${error.data.message}`, {
          position: "top-right",
          timeout: 2500,
          pauseOnHover: false,
        });
      }
    }
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.fetchMovies();
      this.fetchGenres();
      this.fetchLogs();
      this.fetchUser();
      this.page = localStorage.getItem("lastAccessedPage");
    }
  },
  computed: {
    getMovieById() {
      return this.movies.find(movie => movie.id == this.movieId)
    }
  },
}
</script>

<template>
  <Login v-if="page === 'login'" @submitHandler="submitLoginForm" @page="changePage" @handleCredentialResponse="handleCredentialResponse" />
  <Register v-else-if="page === 'register'" @submitHandler="submitRegisterForm" @page="changePage" />
  <Dashboard v-else-if="page === 'dashboard'" :movies="movies" :genres="genres" @page="changePage" />
  <Movies v-else-if="page === 'movies'" @page="changePage" :datas="movies" @changeHandler="patchMovieStatus"
    @editMoviePage="changePage" />
  <Genres v-else-if="page === 'genres'" @page="changePage" :datas="genres" />
  <Logs v-else-if="page === 'logs'" :logs="logs" @page="changePage" />
  <EditMovie v-else-if="page === 'editMovie'" @page="changePage" :movie="getMovieById" :genres="genres"
    @submitHandler="submitEditMovie" />
  <NewMovie v-else @page="changePage" :genres="genres" @submitHandler="submitNewMovie" />
</template>

<style>
* {
  font-family: 'Fjalla One', sans-serif;
}
</style>