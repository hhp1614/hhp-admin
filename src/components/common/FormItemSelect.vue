<template>
  <v-row>
    <v-select :value="value" :items="items" :label="label" @input="input" />
  </v-row>
</template>

<script>
export default {
  props: {
    value: { type: [Number, String], require: true },
    label: { type: String, require: true },
    items: { type: Array, require: true },
    clearable: { type: Boolean, default: true }
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    }
  }
};
</script>
