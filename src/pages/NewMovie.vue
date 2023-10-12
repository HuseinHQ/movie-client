<script>
import SidePanel from '../components/SidePanel.vue'
import MovieForm from '../components/MovieForm.vue'

export default {
  props: ['genres'],
  components: {
    SidePanel,
    MovieForm
  },
  data() {
    return {
      movie: {
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
        <MovieForm :movie="movie" :genres="genres" @submitHandler="submitHandler" :buttonTitle="['Cancel', 'Add']" :buttonColor="['btn-outline-primary', 'btn-primary']" />
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