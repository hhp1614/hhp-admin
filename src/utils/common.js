import store from '../store';

export const successMessage = text => store.dispatch('actionChangeMessage', { success: true, text });

const common = {
  successMessage
};

// 全局公共方法
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$common', { value: common });
  }
};
