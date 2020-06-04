// 全局配置
export default {
  // 接口地址
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:16000/' : 'http://localhost:16000/',
  // 没有数据时显示的文本
  noDataText: '暂时没有数据',
  // 表格每页显示数量
  pageSize: 10,
  // 表格每页显示数量的选项
  pageSizes: [5, 10, 20, 50],
  // 表格每页显示数量的说明文本
  pageSizesText: '每页显示数量'
};
