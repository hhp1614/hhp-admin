<template>
  <v-row>
    <v-text-field :value="value" :label="label" :type="type" :counter="counter" :clearable="clearable" @input="input" />
  </v-row>
</template>

<script>
export default {
  props: {
    value: { type: String, require: true },
    label: { type: String, require: true },
    type: { type: String, default: 'text' },
    counter: { type: Boolean, default: true },
    clearable: { type: Boolean, default: true }
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    }
  }
};
</script>
