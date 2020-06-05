<template>
  <div>
    <v-icon @click="$emit('edit', item)" class="mr-2">mdi-pencil</v-icon>
    <v-icon @click="$emit('del', item)">mdi-delete</v-icon>
  </div>
</template>

<script>
// 表格通用操作列
export default {
  props: {
    // 当前行的数据
    item: { type: Object, require: true }
  }
};
</script>
