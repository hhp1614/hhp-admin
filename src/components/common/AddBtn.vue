<template>
  <v-col>
    <v-btn class="mb-2" @click="$emit('click')">{{ text }}</v-btn>
  </v-col>
</template>

<script>
// 添加按钮
export default {
  props: {
    // 按钮文本
    text: { type: String, require: true }
  }
};
</script>
