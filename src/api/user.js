import { request } from '../utils/request';

/**
 * 用户列表
 */
export const apiUserList = data => request.post('admin/user/list', data);

/**
 * 添加用户
 */
export const apiUserAdd = data => request.post('admin/user/add', data);

/**
 * 编辑用户
 */
export const apiUserEdit = data => request.post('admin/user/edit', data);

/**
 * 用户详情
 */
export const apiUserDetail = id => request.post('admin/user/edit/' + id);

/**
 * 删除用户
 */
export const apiUserDelete = id => request.post('admin/user/delete/' + id);
