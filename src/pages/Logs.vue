<script>
import SidePanel from '../components/SidePanel.vue'
import TableItem from '../components/TableItem.vue'

export default {
  emits: ['page'],
  props: ['logs'],
  components: {
    SidePanel,
    TableItem
  },
  methods: {
    changePage(page) {
      this.$emit('page', page)
    },
  },
}
</script>

<template>
  <section id="logs-section" class="d-flex">
    <!-- Side Panel -->
    <SidePanel @page="changePage" />

    <!-- Content -->
    <div id="content">
      <!-- Upper content -->
      <div class="upper d-flex">
        <h1>Logs</h1>
      </div>

      <!-- Bottom content -->
      <div class="bottom d-flex gap-3">
        <div class="container bg-light rounded movie-table">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log, index in logs" :key="log.id">
                <TableItem :data=log :index="index" page="logs" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#logs-section {
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