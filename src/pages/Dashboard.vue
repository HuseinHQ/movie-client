<script>
import SidePanel from '../components/SidePanel.vue'
export default {
  emits: ['page'],
  props: ['movies', 'genres', 'user'],
  components: {
    SidePanel
  },
  methods: {
    changePage(page) {
      this.$emit('page', page)
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
}
</script>

<template>
  <section id="dashboard-section" class="d-flex">
    <!-- Side Panel -->
    <SidePanel @page="changePage" :user="user" />

    <!-- Content -->
    <div id="content">
      <!-- Upper content -->
      <div class="upper d-flex">
        <h1>Dashboard</h1>
      </div>

      <!-- Bottom content -->
      <div class="bottom d-flex gap-3">
        <div>
          <h2 class="fs-5">Total Movies</h2>
          <div class="border rounded count-box fs-1">{{ movieCount }}</div>
        </div>
        <div>
          <h2 class="fs-5">Total Genres</h2>
          <div class="border rounded count-box fs-1">{{ genreCount }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#dashboard-section {
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

.count-box {
  background-color: white;
  color: black;
  width: 10rem;
  padding: 1rem;
}
</style>