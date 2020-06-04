<template>
  <v-row>
    <v-col>
      <v-pagination v-show="pageLength > 1" :value="page" :length="pageLength" @input="pageChange" />
    </v-col>
    <v-col cols="2">
      <v-select
        :value="size"
        :items="$common.config.pageSizes"
        :label="$common.config.pageSizesText"
        @change="sizeChange"
        dense
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      // 当前页数
      page: state => state.pagination.page,
      // 每页显示数量
      size: state => state.pagination.size,
      // 总数
      total: state => state.pagination.total
    }),
    // 总共页数
    pageLength() {
      return Math.ceil(this.total / this.size);
    }
  },
  methods: {
    ...mapActions({ updatePagination: 'actionUpdatePagination' }),
    // 改变页数
    async pageChange(page) {
      await this.updatePagination({ page, size: this.size, total: this.total });
      this.$emit('getData');
    },
    // 改变每页显示数量
    async sizeChange(size) {
      await this.updatePagination({ size, page: 1, total: this.total });
      this.$emit('getData');
    }
  }
};
</script>
