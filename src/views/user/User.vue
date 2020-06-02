<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">用户名</th>
            <th class="text-left">邮箱</th>
            <th class="text-left">角色</th>
            <th class="text-left">注册时间</th>
            <th class="text-left">更新时间</th>
            <th class="text-left">登录时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.role | roleFilter }}</td>
            <td>{{ item.register_time }}</td>
            <td>{{ item.update_time }}</td>
            <td>{{ item.login_time }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { apiUserList } from '../../api';

export default {
  data() {
    return {
      tableData: [],
      page: 1,
      size: 10,
      total: 0
    };
  },
  computed: {
    ...mapState(['loading'])
  },
  filters: {
    roleFilter(val) {
      return val === 2 ? '管理员' : '普通用户';
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      apiUserList({ page: 1, size: 10, username: '' }).then(res => {
        this.tableData = res.data;
        this.page = res.page;
        this.size = res.size;
        this.total = res.total;
      });
    }
  }
};
</script>
