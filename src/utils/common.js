import store from '../store';
import config from '../config';

/**
 * 全局成功消息
 * @param text 消息内容
 * @return {*}
 */
const successMessage = text => store.dispatch('actionChangeMessage', { success: true, text });

/**
 * 提取表单中不为空的字段生成一个新的对象
 * @param form 需要提取的表单对象
 * @return {Object}
 */
const getForm = form => {
  return Object.keys(form).reduce((obj, key) => {
    const value = form[key];
    if (value == null || value === '') {
      return obj;
    }
    return { ...obj, [key]: value };
  }, {});
};
// 炫技？🤔
// const isEmpty = val => val == null || val === '';
// const getForm = form => Object.keys(form).reduce((o, i) => (isEmpty(form[i]) ? o : { ...o, [i]: form[i] }), {});

export const common = {
  config,
  successMessage,
  getForm
};

// 全局公共方法
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$common', { value: common });
  }
};
