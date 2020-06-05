<template>
  <v-col :cols="cols">
    <v-btn @click="$emit('click')">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-col>
</template>

<script>
// 搜索按钮
export default {
  props: {
    // 宽度 默认1
    cols: { type: [Number, String], default: '1' }
  }
};
</script>
