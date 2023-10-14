<script>
import SidePanel from '../components/SidePanel.vue'
import TableItem from '../components/TableItem.vue'

export default {
  emits: ['page'],
  props: ['datas', 'user'],
  components: {
    SidePanel,
    TableItem
  },
  data() {
    return {
      genreTd: ['name']
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
    <SidePanel @page="changePage" :user="user" />

    <!-- Content -->
    <div id="content">
      <!-- Upper content -->
      <div class="upper d-flex">
        <h1>Genres List</h1>
      </div>

      <!-- Bottom content -->
      <div class="bottom d-flex gap-3">
        <div class="container bg-light rounded movie-table">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data, index in datas" :key="data.id">
                <TableItem :data=data :index="index" page="genres" />
              </tr>
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