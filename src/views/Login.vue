<template>
  <div id="login">
    <v-card width="48vmin">
      <v-card-title class="align-center">用户登录</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="form.username" :rules="rules.username" label="用户名" required></v-text-field>
          <v-text-field
            v-model="form.password"
            :rules="rules.password"
            @keydown.enter="login"
            label="密码"
            type="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!valid" :loading="$store.state.loading" @click="login" color="primary" block>
          登录
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { apiLogin } from '../api';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          v => !!v || '用户名不能为空',
          v => (v && v.length >= 3) || '用户名长度不能少于3个字符',
          v => (v && v.length <= 32) || '用户名长度不能超过32个字符'
        ],
        password: [
          v => !!v || '密码不能为空',
          v => (v && v.length >= 3) || '密码长度不能少于3个字符',
          v => (v && v.length) <= 32 || '密码长度不能超过32个字符'
        ]
      }
    };
  },
  created() {
    localStorage.clear();
  },
  methods: {
    ...mapActions({ updateUserInfo: 'actionUpdateUserInfo' }),
    async login() {
      const res = await apiLogin(this.form);
      this.$common.successMessage(res.msg);

      localStorage.token = res.data.token;
      localStorage.userInfo = JSON.stringify(res.data);

      this.updateUserInfo(res.data);

      await this.$router.push('/');
    }
  }
};
</script>
