<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-avatar size="48">
        <v-img src="../../assets/avatar.png" alt="Avatar" transition="scale-transition" contain />
      </v-avatar>
    </div>

    <v-spacer></v-spacer>

    <span class="mr-2">{{ userInfo.username }}，{{ greetingText }}</span>
    <v-menu open-on-hover bottom left offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="fff" icon fab>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>退出登录</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import config from '../../config';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      baseURL: config.baseURL
    };
  },
  computed: {
    ...mapState(['userInfo']),
    greetingText() {
      const h = new Date().getHours();
      if (h >= 23 || h <= 3) return '深夜了，早点休息~';
      if (h <= 5) return '凌晨了，赶紧休息吧~';
      if (h >= 5 && h <= 10) return '早上好~';
      if (h <= 13) return '中午好~';
      if (h <= 18) return '下午好~';
      else return '晚上好~';
    }
  },
  methods: {
    logout() {
      this.$router.push('/login');
    }
  }
};
</script>
