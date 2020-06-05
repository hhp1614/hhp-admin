<template>
  <div>
    <add-btn @click="add" text="添加用户" />
    <v-data-table
      :headers="tableHeader"
      :items="tableData"
      :loading="$store.state.loading"
      :no-data-text="$common.config.noDataText"
      hide-default-footer
      disable-sort
    >
      <template v-slot:item.actions="{ item }">
        <table-actions :item="item" @edit="detail" @del="del" />
      </template>
    </v-data-table>
    <pagination @getData="getData" />
    <dialog-form v-model="dialog.show" :title="dialog.title" @submit="submit">
      <form-item-text v-model="form.username" label="用户名" />
      <form-item-text v-model="form.password" label="密码" type="password" />
      <form-item-text v-model="form.email" label="邮箱" />
      <form-item-select v-model="form.role" :items="roleList" label="角色" />
      <form-item-textarea v-model="form.summary" label="简介" />
      <upload-image v-model="form.avatar" />
    </dialog-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { apiUserAdd, apiUserDelete, apiUserDetail, apiUserEdit, apiUserList } from '../../api';
import TableActions from '../../components/common/TableActions';
import Pagination from '../../components/common/Pagination';
import DialogForm from '../../components/common/DialogForm';
import AddBtn from '../../components/common/AddBtn';
import FormItemText from '../../components/common/FormItemText';
import FormItemSelect from '../../components/common/FormItemSelect';
import FormItemTextarea from '../../components/common/FormItemTextarea';
import UploadImage from '../../components/content/UploadImage';

const dialogDefault = { show: false, title: '' };
const formDefault = { id: '', username: '', password: '', email: '', role: '', avatar: '', summary: '' };

export default {
  components: {
    UploadImage,
    FormItemTextarea,
    FormItemSelect,
    FormItemText,
    AddBtn,
    DialogForm,
    Pagination,
    TableActions
  },
  data() {
    return {
      tableHeader: [
        { text: 'ID', value: 'id' },
        { text: '用户名', value: 'username' },
        { text: '邮箱', value: 'email' },
        { text: '角色', value: 'role_text' },
        { text: '注册时间', value: 'register_time' },
        { text: '更新时间', value: 'update_time' },
        { text: '登录时间', value: 'login_time' },
        { text: '操作', value: 'actions' }
      ],
      tableData: [],
      username: '',
      dialog: { ...dialogDefault },
      form: { ...formDefault },
      roleList: [
        { text: '普通用户', value: 1 },
        { text: '管理员', value: 2 }
      ]
    };
  },
  computed: {
    ...mapState({ pagination: 'pagination' })
  },
  filters: {
    roleFilter(value) {
      return value === 2 ? '管理员' : '普通用户';
    }
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapActions({ updatePagination: 'actionUpdatePagination' }),
    async getData() {
      const { page, size } = this.pagination;
      const res = await apiUserList({ page, size, username: this.username });
      this.tableData = res.data.map(item => {
        item.role_text = this.roleList.find(i => i.value === item.role).text;
        return item;
      });
      this.updatePagination({ page: res.page, size: res.size, total: res.total });
    },
    add() {
      this.form = formDefault;
      this.dialog = { show: true, title: '添加用户' };
    },
    async detail(item) {
      const res = await apiUserDetail(item.id);
      res.role += '';
      this.form = res;
      this.dialog.show = true;
      this.dialog.title = '编辑用户';
    },
    async del(item) {
      const ok = confirm('确定删除？');
      if (!ok) return;
      const res = await apiUserDelete(item.id);
      this.$common.successMessage(res.msg);
      await this.getData();
    },
    async submit() {
      const form = this.$common.getForm(this.form);
      const res = form.id ? await apiUserEdit(form) : await apiUserAdd(form);
      this.$common.successMessage(res.msg);
      this.clear();
      await this.getData();
    },
    clear() {
      this.dialog = dialogDefault;
      this.form = formDefault;
    }
  }
};
</script>
