<template>
  <div>
    <!-- 添加 & 搜索 -->
    <v-row>
      <add-btn @click="add" text="添加用户" />
      <search-item-text v-model="username" label="用户名" />
      <search-btn @click="getData" />
    </v-row>
    <!-- 表格 -->
    <v-data-table
      :headers="tableHeader"
      :items="tableData"
      :loading="$store.state.loading"
      :no-data-text="$common.config.noDataText"
      hide-default-footer
      disable-sort
    >
      <!-- 编辑 & 删除 -->
      <template v-slot:item.actions="{ item }">
        <table-actions :item="item" @edit="detail" @del="del" />
      </template>
    </v-data-table>
    <!-- 分页 -->
    <pagination @getData="getData" />
    <!-- 对话框 -->
    <dialog-form v-model="dialog.show" :title="dialog.title" @submit="submit">
      <form-item-text v-model="form.username" label="用户名" />
      <form-item-text v-model="form.password" label="密码" type="password" />
      <form-item-text v-model="form.email" label="邮箱" />
      <form-item-select v-model="form.role" :items="roleList" label="角色" />
      <form-item-textarea v-model="form.summary" label="简介" />
      <upload-image v-model="form.avatar" text="选择头像" />
    </dialog-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { apiUserAdd, apiUserDelete, apiUserDetail, apiUserEdit, apiUserList } from '../../api';

import AddBtn from '../../components/common/AddBtn';
import DialogForm from '../../components/common/DialogForm';
import FormItemSelect from '../../components/common/FormItemSelect';
import FormItemText from '../../components/common/FormItemText';
import FormItemTextarea from '../../components/common/FormItemTextarea';
import Pagination from '../../components/common/Pagination';
import SearchBtn from '../../components/common/SearchBtn';
import SearchItemText from '../../components/common/SearchItemText';
import TableActions from '../../components/common/TableActions';

import UploadImage from '../../components/content/UploadImage';

// 对话框默认值
const dialogDefault = { show: false, title: '' };
// 表单默认值
const formDefault = { id: '', username: '', password: '', email: '', role: '', avatar: '', summary: '' };

// 用户列表
export default {
  components: {
    UploadImage,
    FormItemTextarea,
    FormItemSelect,
    FormItemText,
    DialogForm,
    Pagination,
    TableActions,
    SearchBtn,
    SearchItemText,
    AddBtn
  },
  data() {
    return {
      // 表头
      tableHeader: [
        { text: 'ID', value: 'id', width: 100 },
        { text: '用户名', value: 'username', width: 180 },
        { text: '邮箱', value: 'email' },
        { text: '角色', value: 'role_text', width: 100 },
        { text: '注册时间', value: 'register_time', width: 180 },
        { text: '更新时间', value: 'update_time', width: 180 },
        { text: '登录时间', value: 'login_time', width: 180 },
        { text: '操作', value: 'actions', width: 100 }
      ],
      // 表数据
      tableData: [],
      // 搜索 用户名
      username: null,
      // 对话框
      dialog: { ...dialogDefault },
      // 表单
      form: { ...formDefault },
      // 角色列表
      roleList: [
        { text: '普通用户', value: 1 },
        { text: '管理员', value: 2 }
      ]
    };
  },
  computed: {
    ...mapState({ pagination: 'pagination' })
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapActions({ updatePagination: 'actionUpdatePagination' }),
    // 获取列表数据
    async getData() {
      const { page, size } = this.pagination;
      const res = await apiUserList({ page, size, username: this.username });
      this.tableData = res.data.map(item => {
        // role 对应的角色类型 1：普通用户 2：管理员
        item.role_text = this.roleList.find(i => i.value === item.role).text;
        return item;
      });
      // 更新分页信息
      this.updatePagination({ page: res.page, size: res.size, total: res.total });
    },
    // 事件 点击添加按钮
    add() {
      this.form = formDefault;
      this.dialog = { show: true, title: '添加用户' };
    },
    // 事件 点击编辑按钮
    async detail(item) {
      const res = await apiUserDetail(item.id);
      res.role += '';
      this.form = res;
      this.dialog.show = true;
      this.dialog.title = '编辑用户';
    },
    // 事件 点击删除按钮
    async del(item) {
      const ok = confirm('确定删除？');
      if (!ok) return;
      const res = await apiUserDelete(item.id);
      this.$common.successMessage(res.msg);
      this.clear();
    },
    // 事件 提交表单
    async submit() {
      const form = this.$common.getForm(this.form);
      // 根据 form.id 是否存在来判断是编辑还是添加
      const res = form.id ? await apiUserEdit(form) : await apiUserAdd(form);
      this.$common.successMessage(res.msg);
      this.clear();
    },
    // 还原对话框和表单为默认值，并重新获取数据
    clear() {
      this.dialog = { ...dialogDefault };
      this.form = { ...formDefault };
      this.getData();
    }
  }
};
</script>
