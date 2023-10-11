<script>
export default {
  props: ['data', 'index', 'page'],
  data() {
    return {
      status: this.data.status
    }
  },
  methods: {
    changeHandler(id, status) {
      this.$emit('changeHandler', id, status)
    }
  }
}
</script>

<template>
  <!-- Movies -->
  <td v-if="page === 'movies'">{{ index + 1 }}</td>
  <td v-if="page === 'movies'">{{ data.title }}</td>
  <td v-if="page === 'movies'">{{ data.synopsis }}</td>
  <td v-if="page === 'movies'">{{ data.trailerUrl }}</td>
  <td v-if="page === 'movies'">{{ data.imgUrl }}</td>
  <td v-if="page === 'movies'">{{ data.rating }}</td>
  <td v-if="page === 'movies'">{{ data.Genre.name }}</td>
  <td v-if="page === 'movies'">{{ data.User.email }}</td>
  <td v-if="page === 'movies'">
    <select v-model="status" @change="changeHandler(data.id, status)">
      <option value="Active" :selected="data.status ==='Active'" :disabled="data.status === 'Active'">Active</option>
      <option value="Inactive" :selected="data.status ==='Inactive'" :disabled="data.status === 'Inactive'">Inactive</option>
      <option value="Archived" :selected="data.status ==='Archived'" :disabled="data.status === 'Archived'">Archived</option>
    </select>
  </td>

  <!-- Genres -->
  <td v-if="page === 'genres'">{{ index + 1 }}</td>
  <td v-if="page === 'genres'">{{ data.name }}</td>
</template>

<style scoped></style>