<script>
export default {
  methods: {
    changePage(page) {
      this.$emit('page', page)
    },
    logout(page) {
      localStorage.removeItem('access_token')
      this.$emit('page', page)
    },
  }
}
</script>

<template>
  <div id="side-panel" class="d-flex flex-column align-items-center gap-2">
    <i class="fa-solid fa-gear py-4" style="font-size: 6rem;"></i>
    <ul class="d-flex flex-column gap-3">
      <li class="fs-5 side-panel-list d-flex gap-2">
        <i class="fa-solid fa-chart-line"></i>
        <a @click.prevent="changePage('dashboard')" href="">Dashboard</a>
      </li>
      <li class="fs-5 side-panel-list d-flex gap-2">
        <i class="fa-solid fa-film"></i>
        <a @click.prevent="changePage('movies')" href="">Movies</a>
      </li>
      <li class="fs-5 side-panel-list d-flex gap-2">
        <i class="fa-solid fa-genderless"></i>
        <a @click.prevent="changePage('genres')" href="">Genre</a>
      </li>
      <li class="fs-5 side-panel-list d-flex gap-2">
        <i class="fa-solid fa-user"></i>
        <a @click.prevent="" href="">Hello, User</a>
      </li>
      <li class="fs-5 side-panel-list d-flex gap-2">
        <i class="fa-solid fa-right-from-bracket"></i>
        <a @click.prevent="logout('login')" href="">Log Out</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#side-panel {
  width: 16vw;
  background: rgb(22, 22, 26);
  background: linear-gradient(180deg, rgba(22, 22, 26, 1) 0%, rgba(38, 38, 45, 1) 83%, rgba(38, 38, 45, 1) 100%);
}

ul {
  margin: 0;
  padding: 0;
}

ul li:nth-child(1) a {
  color: #fffffe;
}

ul li:nth-child(1) i {
  color: #fffffe;
}

.side-panel-list {
  list-style: none;
}

.side-panel-list i {
  color: #94a1b2;
}

.side-panel-list a {
  text-decoration: none;
  color: #94a1b2;
}
</style>