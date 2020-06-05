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
        <v-btn :loading="$store.state.loading" @click="$emit('submit')" text>提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// 表单 对话框
export default {
  props: {
    // 是否显示
    value: { type: Boolean, require: true },
    // 标题
    title: { type: String, require: true },
    // 宽度
    width: { type: String, default: '50vmin' }
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    }
  }
};
</script>
