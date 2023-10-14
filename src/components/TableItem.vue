<script>
export default {
  emits: ['changeHandler', 'editMoviePage'],
  props: ['data', 'index', 'page', 'user'],
  data() {
    return {
      status: this.data.status
    }
  },
  methods: {
    changeHandler(id, status) {
      this.$emit('changeHandler', id, status)
    },
    editMoviePage(page, id) {
      this.$emit('editMoviePage', page, id)
    }
  }
}
</script>

<template>
  <td>{{ index + 1 }}</td>

  <!-- Movies -->
  <td v-if="page === 'movies'">{{ data.title }}</td>
  <td v-if="page === 'movies'">{{ data.synopsis }}</td>
  <td v-if="page === 'movies'">{{ data.trailerUrl }}</td>
  <td v-if="page === 'movies'"><img :src="data.imgUrl" alt="movie image"></td>
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
  <td v-if="page === 'movies' && (user.role === 'admin' || (user.role !== 'admin' && user.id == data.authorId))"><a @click.prevent="editMoviePage('editMovie', data.id)" href=""><i class="fa-solid fa-pen-to-square"></i></a></td>

  <!-- if(pagehusein@mail.com === 'movies') {
    if(role !== 'admin') {
      if(user.id !== data.authorId)
    } 
  } -->

  <!-- Genres -->
  <td v-if="page === 'genres'">{{ data.name }}</td>

  <!-- Logs -->
  <td v-if="page === 'logs'">{{ data.title }}</td>
  <td v-if="page === 'logs'">{{ data.description }}</td>
  <td v-if="page === 'logs'">{{ data.createdAt }}</td>
  <td v-if="page === 'logs'">{{ data.updatedBy }}</td>
</template>

<style scoped></style>