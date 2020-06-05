<template>
  <v-row>
    <v-avatar v-if="value">
      <img :src="value" alt="头像" />
    </v-avatar>

    <!-- 上传按钮 -->
    <v-btn :loading="$store.state.loading" @click="$refs.uploader.click()" class="ml-4">
      <v-icon left>mdi-cloud-upload</v-icon>
      {{ text }}
    </v-btn>
    <input @change="change" ref="uploader" type="file" accept=".jpg,.jpeg,.png,.gif" hidden />
  </v-row>
</template>

<script>
import { apiUploadImage } from '../../api';

// 图片上传
export default {
  props: {
    // 图片地址
    value: { type: String, require: true },
    // 按钮文本
    text: { type: String, default: '选择图片' }
  },
  methods: {
    // 上传图片
    async change(e) {
      const file = e.target.files[0] ?? null;
      if (!file) return;

      const fd = new FormData();
      fd.append('image', file);

      const res = await apiUploadImage(fd);
      this.$common.successMessage(res.msg);

      // 更新图片地址到父组件 v-model 绑定的变量
      const url = this.$common.config.baseURL + res.data.url;
      this.$emit('input', url);
    }
  }
};
</script>
