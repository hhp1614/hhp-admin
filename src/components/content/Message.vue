<template>
  <v-snackbar v-model="message.show" :timeout="timeout" :color="message.success ? 'success' : 'error'" top>
    {{ message.text }}
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

// 全局消息组件
export default {
  data() {
    return {
      // 持续时间
      timeout: 2000
    };
  },
  computed: {
    ...mapState({ message: 'message' })
  }
};
</script>
