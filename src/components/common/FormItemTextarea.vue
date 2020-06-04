<template>
  <v-row>
    <v-textarea
      :value="value"
      :label="label"
      :counter="counter"
      :clearable="clearable"
      :no-resize="noResize"
      :rows="rows"
      @input="input"
    />
  </v-row>
</template>

<script>
export default {
  props: {
    value: { type: String, require: true },
    label: { type: String, require: true },
    counter: { type: Boolean, default: true },
    clearable: { type: Boolean, default: true },
    noResize: { type: Boolean, default: true },
    rows: { type: Number, default: 3 }
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    }
  }
};
</script>
