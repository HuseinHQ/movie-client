<script>
import SidePanel from '../components/SidePanel.vue'
import TableRow from '../components/TableRow.vue'

export default {
  props: ['datas'],
  components: {
    SidePanel,
    TableRow
  },
  data() {
    return {
      movieTd: ['title', 'synopsis', 'trailerUrl', 'imgUrl', 'rating', 'genreId', 'authorId', 'status']
    }
  },
  methods: {
    changePage(page) {
      this.$emit('page', page)
    }
  }
}
</script>

<template>
    <section id="dashboard-section" class="d-flex">
    <!-- Side Panel -->
    <SidePanel @page="changePage" />

    <!-- Content -->
    <div id="content">
      <!-- Upper content -->
      <div class="upper d-flex">
        <h1>Movie List</h1>
      </div>

      <!-- Bottom content -->
      <div class="bottom d-flex gap-3">
        <div class="container bg-light rounded movie-table">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Synopsis</th>
                <th>Trailer</th>
                <th>Image</th>
                <th>Rating</th>
                <th>Genre</th>
                <th>Author</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <TableRow :datas="datas" :column="movieTd" />
            </tbody>
          </table>
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
}

.movie-table {
  height: 75vh;
  overflow: scroll;
}
</style>