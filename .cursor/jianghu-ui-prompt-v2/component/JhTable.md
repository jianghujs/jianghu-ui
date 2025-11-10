# JhTable - AI 快速集成指南

> 高级数据表格组件，参考 Ant Design ProTable 设计

## 🎯 核心用法

### 最简单的表格
```vue
<jh-table
  :headers="[
    { text: 'ID', value: 'id' },
    { text: '用户名', value: 'username' },
    { text: '邮箱', value: 'email' }
  ]"
  :items="[
    { id: 1, username: 'user1', email: 'user1@example.com' },
    { id: 2, username: 'user2', email: 'user2@example.com' }
  ]"
/>
```

### 服务端分页（常用）
```vue
<jh-table
  header-title="用户列表"
  :headers="headers"
  :request="fetchData"
  :show-select="true"
  @selection-change="handleSelectionChange"
>
  <template v-slot:toolbar-actions>
    <v-btn color="success" @click="handleCreate">
      <v-icon left>mdi-plus</v-icon>新增
    </v-btn>
  </template>
</jh-table>

<script>
export default {
  methods: {
    async fetchData(params) {
      // params: { page, pageSize, search, sorter, filters }
      const res = await this.$api.getUsers(params);
      return {
        data: res.list,
        total: res.total,
        success: true
      };
    }
  }
}
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 示例 |
|------|------|------|------|
| `headers` | Array | 表头配置 | `[{ text: '姓名', value: 'name' }]` |
| `items` | Array | 客户端数据 | `[{ id: 1, name: '张三' }]` |
| `request` | Function | 服务端请求 | `async (params) => ({ data, total })` |
| `headerTitle` | String | 表格标题 | `"用户管理"` |
| `showSelect` | Boolean | 显示选择框 | `true` |
| `actionColumn` | Object | 操作列配置 | 见下方示例 |
| `showFilter` | Boolean | 显示筛选栏 | `true` |
| `polling` | Number | 轮询间隔(ms) | `5000` |
| `debounceTime` | Number | 搜索防抖(ms) | `500` |

## 🔧 常用功能

### 1. 操作列配置
```javascript
actionColumn: {
  title: '操作',
  width: 180,
  fixed: 'right',
  buttons: [
    {
      text: '编辑',
      type: 'link',
      icon: 'mdi-pencil',
      color: 'primary',
      onClick: (row) => this.handleEdit(row)
    },
    {
      text: '删除',
      type: 'link',
      icon: 'mdi-delete',
      color: 'error',
      confirm: '确认删除？',
      onClick: (row) => this.handleDelete(row)
    }
  ]
}
```

### 2. 列配置增强
```javascript
headers: [
  { text: 'ID', value: 'id', width: 80 },
  { text: '邮箱', value: 'email', copyable: true }, // 可复制
  { text: '描述', value: 'desc', ellipsis: true }, // 超长省略
  { text: '状态', value: 'status' } // 自定义渲染见下方
]
```

### 3. 自定义列内容
```vue
<template v-slot:item.status="{ item }">
  <v-chip :color="item.status === '启用' ? 'success' : 'error'" small>
    {{ item.status }}
  </v-chip>
</template>
```

### 4. 批量操作
```vue
<template v-slot:alert-actions="{ selectedRows }">
  <v-btn small text color="error" @click="handleBatchDelete">
    批量删除
  </v-btn>
</template>
```

### 5. 高级筛选
```vue
<jh-table
  :show-filter="true"
  :filter-fields="[
    { key: 'username', label: '用户名', type: 'text' },
    { key: 'status', label: '状态', type: 'select', options: statusOptions },
    { key: 'dateRange', label: '日期', type: 'daterange' }
  ]"
  @filter-search="handleFilterSearch"
/>
```

## 🎨 常用插槽

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| `toolbar-actions` | 工具栏左侧按钮 | - |
| `toolbar-extra` | 工具栏右侧内容 | - |
| `alert-actions` | 批量操作按钮 | `{ selectedRows, selectedRowKeys }` |
| `item.{column}` | 自定义列内容 | `{ item, value }` |

## 📡 常用事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `selection-change` | 选择改变 | `{ selectedRows, selectedRowKeys }` |
| `filter-search` | 筛选查询 | `(queryData)` |
| `row-click` | 点击行 | `(item, event)` |

## 🔨 常用方法

```javascript
// 获取表格实例
this.$refs.tableRef.reload()          // 重新加载
this.$refs.tableRef.reset()           // 重置到第一页
this.$refs.tableRef.clearSelection()  // 清空选择
this.$refs.tableRef.getSelectedRows() // 获取选中行
```

## ⚡ 快速模板

### CRUD 列表页
```vue
<template>
  <jh-table
    ref="tableRef"
    header-title="用户管理"
    :headers="headers"
    :request="fetchData"
    :show-select="true"
    :show-filter="true"
    :filter-fields="filterFields"
    :action-column="actionColumn"
    @selection-change="handleSelectionChange"
  >
    <template v-slot:toolbar-actions>
      <v-btn color="success" @click="handleCreate">
        <v-icon left>mdi-plus</v-icon>新增
      </v-btn>
    </template>
    
    <template v-slot:alert-actions="{ selectedRows }">
      <v-btn small text color="error" @click="handleBatchDelete">
        批量删除
      </v-btn>
    </template>
    
    <template v-slot:item.status="{ item }">
      <v-chip :color="item.status === '启用' ? 'success' : 'error'" small>
        {{ item.status }}
      </v-chip>
    </template>
  </jh-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id', width: 80 },
        { text: '用户名', value: 'username', copyable: true },
        { text: '邮箱', value: 'email', ellipsis: true },
        { text: '状态', value: 'status' },
        { text: '创建时间', value: 'createdAt' }
      ],
      filterFields: [
        { key: 'username', label: '用户名', type: 'text' },
        { key: 'status', label: '状态', type: 'select', options: [
          { text: '启用', value: '启用' },
          { text: '禁用', value: '禁用' }
        ]}
      ],
      actionColumn: {
        title: '操作',
        width: 180,
        buttons: [
          {
            text: '编辑',
            type: 'link',
            icon: 'mdi-pencil',
            color: 'primary',
            onClick: this.handleEdit
          },
          {
            text: '删除',
            type: 'link',
            icon: 'mdi-delete',
            color: 'error',
            confirm: '确认删除？',
            onClick: this.handleDelete
          }
        ]
      }
    };
  },
  methods: {
    async fetchData(params) {
      const res = await this.$api.getUsers(params);
      return { data: res.list, total: res.total, success: true };
    },
    handleCreate() { /* 新增逻辑 */ },
    handleEdit(row) { /* 编辑逻辑 */ },
    handleDelete(row) { /* 删除逻辑 */ },
    handleBatchDelete() { /* 批量删除 */ },
    handleSelectionChange({ selectedRows }) {
      console.log('选中:', selectedRows);
    }
  }
};
</script>
```

## ⚠️ 注意事项

1. **服务端分页必须用 `request`，不要用 `items`**
2. **`request` 必须返回 `{ data, total, success }` 格式**
3. **自定义列用 `item.{column}` 插槽，不是 `item.{value}`**
4. **操作列的 `onClick` 接收 `row` 参数，不是 `item`**
5. **工具栏按钮放在 `toolbar-actions` 插槽，不是 `actions`**

## 🔗 相关组件

- **JhQueryFilter**: 高级筛选组件（JhTable 内置集成）
- **JhModalForm**: 配合表格使用的弹窗表单
- **JhDescriptions**: 详情页展示
