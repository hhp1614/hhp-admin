<template>
  <v-app-bar app clipped-left>
    <div class="d-flex align-center">
      <v-app-bar-nav-icon @click.stop="$emit('toggleDrawer')"></v-app-bar-nav-icon>
      <h2 class="ml-6">后台管理</h2>
    </div>

    <v-spacer />

    <span class="mr-2">{{ info.username }}，{{ greetingText }}</span>
    <v-menu open-on-hover bottom left offset-y>
      <template #activator="{ on }">
        <v-btn v-on="on" color="fff" icon fab>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$router.push('/login')">
          <v-list-item-title>退出登录</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

// 头部
export default {
  computed: {
    ...mapState({ info: 'userInfo' }),
    // 问候语
    greetingText() {
      const h = new Date().getHours();
      if (h >= 23 || h <= 3) return '深夜了，早点休息~';
      if (h <= 5) return '凌晨了，赶紧休息吧~';
      if (h >= 5 && h <= 10) return '早上好~';
      if (h <= 13) return '中午好~';
      if (h <= 18) return '下午好~';
      else return '晚上好~';
    }
  }
};
</script>
