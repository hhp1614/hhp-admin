import { request } from '../utils/request';

/**
 * 用户登陆
 */
export const apiLogin = data => request.post('admin/login', data);
