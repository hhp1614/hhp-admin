import { request } from '../utils/request';

/**
 * 标签列表
 */
export const apiTagList = data => request.post('admin/tag/list', data);

/**
 * 添加标签
 */
export const apiTagAdd = data => request.post('admin/tag/add', data);

/**
 * 编辑标签
 */
export const apiTagEdit = data => request.post('admin/tag/edit', data);

/**
 * 标签详情
 */
export const apiTagDetail = id => request.post('admin/tag/edit/' + id);

/**
 * 删除标签
 */
export const apiTagDelete = id => request.post('admin/tag/delete/' + id);
