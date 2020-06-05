<template>
  <div>
    <!-- 添加 & 搜索 -->
    <v-row>
      <add-btn @click="add" text="添加标签" />
      <search-item-text v-model="tagName" label="标签名" />
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
      <form-item-text v-model="form.name" label="标签名" />
      <form-item-textarea v-model="form.summary" label="说明" />
    </dialog-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { apiTagAdd, apiTagDelete, apiTagDetail, apiTagEdit, apiTagList } from '../../api';

import AddBtn from '../../components/common/AddBtn';
import SearchItemText from '../../components/common/SearchItemText';
import SearchBtn from '../../components/common/SearchBtn';
import TableActions from '../../components/common/TableActions';
import Pagination from '../../components/common/Pagination';
import DialogForm from '../../components/common/DialogForm';
import FormItemText from '../../components/common/FormItemText';
import FormItemTextarea from '../../components/common/FormItemTextarea';

// 对话框默认值
const dialogDefault = { show: false, title: '' };
// 表单默认值
const formDefault = { id: '', name: '', summary: '' };

export default {
  components: {
    FormItemTextarea,
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
        { text: '标签名', value: 'name', width: 180 },
        { text: '说明', value: 'summary' },
        { text: '创建时间', value: 'create_time', width: 180 },
        { text: '更新时间', value: 'update_time', width: 180 },
        { text: '操作', value: 'actions', width: 100 }
      ],
      // 表数据
      tableData: [],
      // 搜索 标签名
      tagName: null,
      // 对话框
      dialog: { ...dialogDefault },
      // 表单
      form: { ...formDefault }
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
      const res = await apiTagList({ page, size, name: this.tagName });
      this.tableData = res.data;
      // 更新分页信息
      this.updatePagination({ page: res.page, size: res.size, total: res.total });
    },
    // 事件 点击添加按钮
    add() {
      this.form = formDefault;
      this.dialog = { show: true, title: '添加标签' };
    },
    // 事件 点击编辑按钮
    async detail(item) {
      const res = await apiTagDetail(item.id);
      res.role += '';
      this.form = res;
      this.dialog.show = true;
      this.dialog.title = '编辑标签';
    },
    // 事件 点击删除按钮
    async del(item) {
      const ok = confirm('确定删除？');
      if (!ok) return;
      const res = await apiTagDelete(item.id);
      this.$common.successMessage(res.msg);
      this.clear();
    },
    // 事件 提交表单
    async submit() {
      const form = this.$common.getForm(this.form);
      // 根据 form.id 是否存在来判断是编辑还是添加
      const res = form.id ? await apiTagEdit(form) : await apiTagAdd(form);
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
