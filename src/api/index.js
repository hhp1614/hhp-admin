import { request } from '../utils/request';

/**
 * 用户登陆
 */
export const apiLogin = data => request.post('admin/login', data);

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
 * 头像上传
 */
export const apiUploadImage = data => request.post('admin/upload/image', data);
