<template>
  <v-app>
    <router-view />
    <!-- 全局消息组件 -->
    <message />
  </v-app>
</template>

<script>
import Message from './components/content/Message';

export default {
  components: { Message },
  created() {
    // 使用暗色主题
    this.$vuetify.theme.dark = true;
  }
};
</script>
