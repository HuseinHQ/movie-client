<script>
export default {
  props: ['datas', 'column'],
}
</script>

<template>
  <tr v-for="data, index in datas">
    <td>{{ index + 1 }}</td>
    <td v-for="el in column">
        {{ data[el] }}
    </td>
  </tr>
</template>

<style scoped></style>