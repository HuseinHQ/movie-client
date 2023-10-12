<script>
export default {
  props: ['title', 'buttonColor'],
  data() {
    return {
      prevPage: localStorage.getItem('prevPage')
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<template>
  <button v-if="title === 'Cancel'" @click="changePage(prevPage)" :class="'btn rounded w-50 ' + buttonColor">{{ title }}</button>
  <button v-else type="submit" :class="'btn rounded w-50 ' + buttonColor">{{ title }}</button>
</template>

<style scoped></style>