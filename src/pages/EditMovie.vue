<script>
import SidePanel from '../components/SidePanel.vue'
import MovieForm from '../components/MovieForm.vue'

export default {
  emits: ['page', 'submitHandler'],
  props: ['movie', 'genres', 'user'],
  components: {
    SidePanel,
    MovieForm
  },
  methods: {
    changePage(page) {
      this.$emit('page', page)
    },
    submitHandler(editedMovie, id) {
      this.$emit('submitHandler', editedMovie, id)
      this.wipeData(this.movie);
    },
    wipeData(obj) {
      for (let key in obj) {
        key = "";
      }
    },
  },
}
</script>

<template>
  <section id="new-edit-section" class="d-flex">
    <!-- Side Panel -->
    <SidePanel @page="changePage" :user="user" />

    <!-- Content -->
    <div id="content">
      <!-- Upper content -->
      <div class="upper d-flex">
        <h1>Edit Movie</h1>
      </div>

      <!-- Bottom content -->
      <div class="bottom d-flex gap-3">
        <MovieForm :movie="movie" :genres="genres" @submitHandler="submitHandler" :buttonTitle="['Cancel', 'Submit']" :buttonColor="['btn-outline-warning', 'btn-warning']" @changePage="changePage"/>
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