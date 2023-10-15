<script>
import Button from './Button.vue';

export default {
  emits: ['submitHandler', 'changePage'],
  components: {
    Button
  },
  props: ['movie', 'genres', 'buttonTitle', 'buttonColor'],
  data() {
    return {
      id: this.movie ? this.movie.id : null,
      newMovie: {
        title: this.movie ? this.movie.title : "",
        synopsis: this.movie ? this.movie.synopsis : "",
        genreId: this.movie ? this.movie.genreId : 0,
        rating: this.movie ? this.movie.rating : null,
        trailerUrl: this.movie ? this.movie.trailerUrl : "",
        imgUrl: this.movie ? this.movie.imgUrl : "",
      },
    }
  },
  methods: {
    submitHandler() {
      this.$emit('submitHandler', this.newMovie, this.id)
    },
    changePage(page) {
      this.$emit('changePage', page)
    }
  },
}
</script>

<template>
  <form @submit.prevent="submitHandler" class="d-flex w-100 gap-4">
    <!-- Left Div -->
    <div class="w-50">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="newMovie.title" type="text" class="form-control" autofocus>
      </div>

      <div class="mb-3">
        <label class="form-label">Synopsis</label>
        <textarea v-model="newMovie.synopsis" class="form-control" rows="4"></textarea>
      </div>

      <div class="mb-5">
        <label class="form-label">Genre</label>
        <select v-model="newMovie.genreId" class="form-select">
          <option value="0" selected disabled>-- Select Genre --</option>
          <option v-for="genre in genres" :value="genre.id">{{ genre.name }}</option>
        </select>
      </div>

      <div class="d-flex gap-3">
        <Button @changePage="changePage" :title="buttonTitle[0]" :buttonColor="buttonColor[0]"/>
        <Button :title="buttonTitle[1]" :buttonColor="buttonColor[1]"/>
      </div>
    </div>

    <!-- Right Div -->
    <div class="w-50">
      <div class="mb-3">
        <label class="form-label">Rating</label>
        <input v-model="newMovie.rating" type="number" class="form-control">
      </div>

      <div class="mb-3">
        <label class="form-label">Trailer Url</label>
        <input v-model="newMovie.trailerUrl" type="text" class="form-control">
      </div>

      <div class="mb-3">
        <label class="form-label">Image Url</label>
        <input v-model="newMovie.imgUrl" type="text" class="form-control">
      </div>
    </div>
  </form>
</template>

<style scoped>
  
</style>