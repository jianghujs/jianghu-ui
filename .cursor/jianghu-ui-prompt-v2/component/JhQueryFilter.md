# JhQueryFilter - AI 快速集成指南

> 高级筛选组件，提供可折叠的查询表单

## 🎯 核心用法

```vue
<jh-query-filter
  :fields="filterFields"
  :collapsible="true"
  :default-collapsed="true"
  @search="handleSearch"
  @reset="handleReset"
/>

<script>
export default {
  data() {
    return {
      filterFields: [
        { key: 'keyword', label: '关键词', type: 'text' },
        { key: 'status', label: '状态', type: 'select', options: [
          { text: '全部', value: '' },
          { text: '启用', value: '1' },
          { text: '禁用', value: '0' }
        ]},
        { key: 'dateRange', label: '日期范围', type: 'daterange' }
      ]
    };
  },
  methods: {
    handleSearch(queryData) {
      console.log('查询:', queryData);
      // 调用 API 查询
    },
    handleReset() {
      console.log('重置');
    }
  }
};
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `fields` | Array | 字段配置 | `[]` |
| `collapsible` | Boolean | 可折叠 | `true` |
| `defaultCollapsed` | Boolean | 默认折叠 | `true` |
| `showReset` | Boolean | 显示重置按钮 | `true` |
| `searchText` | String | 查询按钮文本 | `'查询'` |
| `resetText` | String | 重置按钮文本 | `'重置'` |

## 🎨 字段类型

| 类型 | 说明 |
|------|------|
| `text` | 文本输入 |
| `select` | 下拉选择 |
| `daterange` | 日期范围 |
| `date` | 日期选择 |
| `number` | 数字输入 |

## 📡 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `search` | 查询 | `(queryData)` |
| `reset` | 重置 | - |

## ⚡ 快速模板

### 配合 JhTable 使用
```vue
<template>
  <div>
    <jh-query-filter
      :fields="filterFields"
      @search="handleSearch"
      @reset="handleReset"
    />
    
    <jh-table
      ref="tableRef"
      :headers="headers"
      :request="fetchData"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryParams: {},
      filterFields: [
        { key: 'username', label: '用户名', type: 'text' },
        { key: 'status', label: '状态', type: 'select', options: [
          { text: '全部', value: '' },
          { text: '启用', value: '1' },
          { text: '禁用', value: '0' }
        ]},
        { key: 'dateRange', label: '注册日期', type: 'daterange' }
      ],
      headers: [
        { text: 'ID', value: 'id' },
        { text: '用户名', value: 'username' },
        { text: '状态', value: 'status' }
      ]
    };
  },
  methods: {
    handleSearch(queryData) {
      this.queryParams = queryData;
      this.$refs.tableRef.reload();
    },
    handleReset() {
      this.queryParams = {};
      this.$refs.tableRef.reload();
    },
    async fetchData(params) {
      const res = await this.$api.getUsers({
        ...params,
        ...this.queryParams
      });
      return { data: res.list, total: res.total, success: true };
    }
  }
};
</script>
```

## ⚠️ 注意事项

1. **JhTable 已内置 JhQueryFilter，可通过 `showFilter` 和 `filterFields` 使用**
2. **`daterange` 类型返回数组 `[startDate, endDate]`**
3. **查询参数会自动过滤空值**

## 🔗 相关组件

- **JhTable**: 表格组件（内置集成）
- **JhForm**: 表单组件
