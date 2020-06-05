import { request } from '../utils/request';

/**
 * 用户登陆
 */
export const apiLogin = data => request.post('admin/login', data);

/**
 * 头像上传
 */
export const apiUploadImage = data => request.post('admin/upload/image', data);

// 用户管理
export * from './user';

// 标签管理
export * from './tag';
