<script>
export default {
  props: ['movie', 'genres'],
  data() {
    return {
      id: this.movie.id,
      newMovie: {
        title: this.movie.title,
        synopsis: this.movie.synopsis,
        genreId: this.movie.genreId,
        rating: this.movie.rating,
        trailerUrl: this.movie.trailerUrl,
        imgUrl: this.movie.imgUrl,
      },
    }
  },
  methods: {
    submitHandler() {
      this.$emit('submitHandler', this.newMovie, this.id)
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
          <option selected disabled>-- Select Genre --</option>
          <option v-for="genre in genres" :value="genre.id" :selected="genre.id == movie.genreId">{{ genre.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <button type="submit" class="btn btn-success rounded-5 w-100">Submit</button>
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