<script>
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Dashboard from './pages/Dashboard.vue'
import Movies from './pages/Movies.vue'
import Genres from './pages/Genres.vue'
import NewMovie from './pages/NewMovie.vue'
import EditMovie from './pages/EditMovie.vue'
import axios from 'axios'

export default {
  components: {
    Login,
    Register,
    Dashboard,
    Movies,
    Genres,
    NewMovie,
    EditMovie,
  },
  data() {
    return {
      baseURL: "https://movie-server.huseinhk.me",
      page: "login",
      movies: [],
      genres: [],
      movieId: 0
    }
  },
  methods: {
    changePage(page, id) {
      if(id) {
        this.movieId = id;
      }
      localStorage.setItem('prevPage', this.page)
      this.page = page;
      if(this.page !== 'newMovie' && this.page !== 'editMovie') {
        localStorage.setItem("lastAccessedPage", this.page);
      }
    },
    async patchMovieStatus(id, status) {
      try {
        await axios({
          method: 'patch',
          url: this.baseURL + '/movies/' + id,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            status
          }
        })

        this.fetchMovies()
      } catch (error) {
        console.log(error)
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
        this.changePage('dashoard');
      } catch (error) {
        console.log(error);
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

        // this.wipeData(this.registerForm);
        this.fetchMovies();
        this.fetchGenres();
        this.changePage('dashboard');
      } catch (error) {
        console.log(error);
      }
    },
    async submitNewMovie(newMovie) {
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseURL + "/movies",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: newMovie,
        });

        await this.fetchMovies();
        this.changePage('movies')
      } catch (error) {
        console.log(error);
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

        await this.fetchMovies();
        this.changePage('movies')
      } catch (error) {
        console.log(error)
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
  computed: {
    getMovieById() {
      return this.movies.find(movie => movie.id == this.movieId)
    }
  }
}
</script>

<template>
  <Login v-if="page === 'login'" @submitHandler="submitLoginForm" @page="changePage" />
  <Register v-else-if="page === 'register'" @submitHandler="submitRegisterForm" @page="changePage" />
  <Dashboard v-else-if="page === 'dashboard'" :movies="movies" :genres="genres" @page="changePage" />
  <Movies v-else-if="page === 'movies'" @page="changePage" :datas="movies" @changeHandler="patchMovieStatus"
  @editMoviePage="changePage" />
  <Genres v-else-if="page === 'genres'" @page="changePage" :datas="genres" />
  <EditMovie v-else-if="page === 'editMovie'" @page="changePage" :movie="getMovieById" :genres="genres" @submitHandler="submitEditMovie" />
  <NewMovie v-else @page="changePage" :genres="genres" @submitHandler="submitNewMovie" />
</template>

<style>
* {
  font-family: 'Fjalla One', sans-serif;
}
</style>