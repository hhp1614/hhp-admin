<template>
  <v-dialog :value="value" @input="input" :width="width">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-container>
          <slot />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="input(false)" text>取消</v-btn>
        <v-btn @click="$emit('submit')" text>提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, require: true },
    title: { type: String, require: true },
    width: { type: String, default: '50vmin' }
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    }
  }
};
</script>
