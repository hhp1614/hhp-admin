import { request } from '../utils/request';

/**
 * 用户登陆
 */
export const apiLogin = data => request.post('admin/login', data);

/**
 * 用户列表
 */
export const apiUserList = data => request.post('admin/user/list', data);
