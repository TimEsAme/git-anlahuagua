<template>
  <div>
    <button v-permission="['read']">read</button>
    <button v-permission="['write']">write</button>
    <button v-permission="['admin']">admin</button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Permission",
});
</script>

<style scoped lang="scss">
button {
  margin-right: 10px;
}
</style>
