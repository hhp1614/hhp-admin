<template>
  <div>
    <v-icon @click="$emit('edit', item)" class="mr-2">mdi-pencil</v-icon>
    <v-icon @click="$emit('del', item)">mdi-delete</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, require: true }
  }
};
</script>
