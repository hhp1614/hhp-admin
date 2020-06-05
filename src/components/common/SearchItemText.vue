<template>
  <v-col>
    <v-text-field
      :value="value"
      :label="label"
      :type="type"
      :counter="counter"
      :clearable="clearable"
      @input="input"
      dense
    />
  </v-col>
</template>

<script>
// 搜索项 文本框
export default {
  props: {
    value: { type: String, require: true },
    label: { type: String, require: true },
    type: { type: String, default: 'text' },
    counter: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true }
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    }
  }
};
</script>
