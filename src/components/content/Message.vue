<!-- 全局消息组件 -->
<template>
  <v-snackbar v-model="message.show" :timeout="timeout" :color="message.success ? 'success' : 'error'" top>
    {{ message.text }}
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      timeout: 2000
    };
  },
  computed: {
    ...mapState({ message: 'message' })
  }
};
</script>
