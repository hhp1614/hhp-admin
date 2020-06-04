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
    this.$vuetify.theme.dark = true;
  }
};
</script>
