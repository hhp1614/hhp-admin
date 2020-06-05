<template>
  <v-row>
    <v-avatar v-if="value">
      <img :src="value" alt="头像" />
    </v-avatar>
    <v-file-input v-model="file" :label="label" :clearable="clearable" @change="change" accept=".jpg,.jpeg,.png,.gif" />
  </v-row>
</template>

<script>
import { apiUploadImage } from '../../api';

export default {
  props: {
    value: { type: String, require: true },
    label: { type: String, require: true },
    clearable: { type: Boolean, default: true }
  },
  data() {
    return {
      file: null
    };
  },
  methods: {
    async change(file) {
      if (!file) return;
      const fd = new FormData();
      fd.append('image', file);
      const res = await apiUploadImage(fd);
      this.$common.successMessage(res.msg);
      const url = this.$common.config.baseURL + res.data.url;
      this.$emit('input', url);
    }
  }
};
</script>
