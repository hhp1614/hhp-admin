import Vue from 'vue';
import Vuex from 'vuex';
import { CHANGE_LOADING, CHANGE_MESSAGE, UPDATE_PAGINATION, UPDATE_USER_INFO } from './types';
import { common } from '../utils/common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 全局 loading
    loading: false,
    // 全局消息
    message: {
      // 是否显示
      show: false,
      // 是否使用 success 样式，false 为使用 error 样式
      success: false,
      // 显示的文本
      text: ''
    },
    // 用户信息
    userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {},
    // 分页信息
    pagination: {
      // 当前页数
      page: 1,
      // 每页显示数量
      size: common.config.pageSize,
      // 总数
      total: 0
    }
  },
  mutations: {
    [CHANGE_LOADING](state, data) {
      state.loading = data;
    },
    [CHANGE_MESSAGE](state, data) {
      state.message = data;
    },
    [UPDATE_USER_INFO](state, data) {
      state.userInfo = data;
    },
    [UPDATE_PAGINATION](state, data) {
      state.pagination = data;
    }
  },
  actions: {
    // 修改全局 loading
    actionChangeLoading({ commit }, loading) {
      commit(CHANGE_LOADING, loading);
    },
    // 修改全局消息
    actionChangeMessage({ commit }, data) {
      commit(CHANGE_MESSAGE, { show: true, success: data.success ?? false, text: data.text ?? '' });
    },
    // 更新用户信息
    actionUpdateUserInfo({ commit }, data) {
      commit(UPDATE_USER_INFO, data);
    },
    // 更新分页信息
    actionUpdatePagination({ commit }, data) {
      commit(UPDATE_PAGINATION, data);
    }
  },
  modules: {}
});
