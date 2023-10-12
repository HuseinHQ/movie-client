<script>
export default {
  props: ['title', 'buttonColor'],
  data() {
    return {
      prevPage: localStorage.getItem('prevPage')
    }
  }
}
</script>

<template>
  <button type="submit" :class="'btn rounded w-50 ' + buttonColor">{{ title }}</button>
</template>

<style scoped></style>