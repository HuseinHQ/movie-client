<script>
import SidePanel from '../components/SidePanel.vue'
export default {
  components: {
    SidePanel
  },
  data() {
    return {
      newMovie: {
        title: "",
        synopsis: "",
        genreId: "",
        rating: null,
        trailerUrl: "",
        imgUrl: "",
      },
    }
  },
  methods: {
    changePage(page) {
      this.$emit('page', page)
    },
    submitHandler() {
      this.$emit('submitHandler', this.newMovie)
    }
  }
}
</script>

<template>
  <section id="new-edit-section" class="d-flex">
    <!-- Side Panel -->
    <SidePanel @page="changePage" />

    <!-- Content -->
    <div id="content">
      <!-- Upper content -->
      <div class="upper d-flex">
        <h1>New Movie</h1>
      </div>

      <!-- Bottom content -->
      <div class="bottom d-flex gap-3">
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
                <option value="1">Action</option>
                <option value="2">Romance</option>
                <option value="3">Horror</option>
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
      </div>
    </div>
  </section>
</template>

<style scoped>
#new-edit-section {
  height: 100vh;
}

#content {
  width: 84vw;
  background-color: #26262d;
}

#content h1 {
  color: #fffffe;
}

#content .upper {
  margin: 3rem;
}

#content .bottom {
  margin: 3rem;
  color: #fffffe;
}
</style>