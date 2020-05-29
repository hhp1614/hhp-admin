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
            label="密码"
            type="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!valid" :loading="loading" @click="login" color="primary" block>登录</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { apiLogin } from '../api';
import { mapActions, mapState } from 'vuex';

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
  computed: {
    ...mapState(['loading'])
  },
  created() {
    localStorage.clear();
  },
  methods: {
    ...mapActions(['actionUpdateUserInfo']),
    login() {
      apiLogin(this.form).then(res => {
        this.$common.successMessage(res['msg']);
        localStorage.token = res.data.token;
        localStorage.userInfo = JSON.stringify(res.data);
        this['actionUpdateUserInfo'](res.data);
        console.log(res.data);
        this.$router.push('/');
      });
    }
  }
};
</script>
