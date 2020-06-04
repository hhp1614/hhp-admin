<template>
  <v-btn class="mb-2" @click="$emit('click')">{{ text }}</v-btn>
</template>

<script>
export default {
  props: {
    text: { type: String, require: true }
  }
};
</script>
