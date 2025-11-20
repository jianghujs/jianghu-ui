# JhDescriptions 快速参考

## 基础用法

```vue
<jh-descriptions
  title="用户信息"
  :columns="columns"
  :data-source="dataSource"
/>
```

## 常用配置

### 1. 布局模式

```vue
<!-- 水平布局（默认） -->
<jh-descriptions layout="horizontal" :column="3" />

<!-- 垂直布局 -->
<jh-descriptions layout="vertical" :column="3" />
```

### 2. 可编辑

```vue
<jh-descriptions
  :editable="true"
  @save="handleSave"
/>
```

### 3. 异步加载

```vue
<jh-descriptions
  :request="fetchData"
  :params="{ id: 1 }"
/>
```

## Column 配置速查

```javascript
{
  title: '字段标题',           // 必填
  dataIndex: 'fieldName',      // 必填
  valueType: 'text',           // 值类型
  span: 1,                     // 跨列数
  copyable: true,              // 可复制
  editable: true,              // 可编辑
  tooltip: '提示信息',         // 提示
  render: (value) => {},       // 自定义渲染
  valueEnum: {},               // 选项映射
}
```

## ValueType 速查

| 类型 | 显示效果 | 编辑组件 |
|------|---------|---------|
| text | 普通文本 | v-text-field |
| textarea | 多行文本 | v-textarea |
| digit | 1,234,567 | v-text-field(number) |
| money | ¥ 12,345.67 | v-text-field(number) |
| percent | 85% | v-text-field(number) |
| date | 2024-01-15 | v-text-field(date) |
| dateTime | 2024-01-15 14:30:00 | v-text-field(datetime-local) |
| time | 14:30:00 | v-text-field(time) |
| option | 映射文本 | - |
| select | 下拉选项 | v-select |

## 事件速查

```vue
<jh-descriptions
  @save="handleSave"              // 保存数据
  @save-success="handleSuccess"   // 保存成功
  @save-error="handleError"       // 保存失败
  @cancel="handleCancel"          // 取消编辑
  @edit-start="handleEditStart"   // 开始编辑
  @field-change="handleChange"    // 字段变化
  @copy="handleCopy"              // 复制内容
  @request-success="handleSuccess" // 请求成功
  @request-error="handleError"    // 请求失败
/>
```

## 插槽速查

```vue
<jh-descriptions>
  <!-- 自定义标题 -->
  <template #title>
    <span>自定义标题</span>
  </template>
  
  <!-- 额外内容 -->
  <template #extra>
    <v-btn>操作</v-btn>
  </template>
  
  <!-- 自定义字段 -->
  <template #item-username="{ value, record }">
    <strong>{{ value }}</strong>
  </template>
</jh-descriptions>
```

## 响应式列数

```javascript
column: {
  xs: 1,    // 手机
  sm: 2,    // 平板
  md: 3,    // 小屏
  lg: 3,    // 中屏
  xl: 4,    // 大屏
  xxl: 4,   // 超大屏
}
```

## 完整示例

```vue
<template>
  <jh-descriptions
    title="用户详情"
    tooltip="用户的详细信息"
    layout="horizontal"
    :column="3"
    :columns="columns"
    :data-source="dataSource"
    :editable="true"
    bordered
    colon
    @save="handleSave"
  >
    <template #item-avatar="{ value }">
      <v-avatar>
        <img :src="value" />
      </v-avatar>
    </template>
  </jh-descriptions>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          copyable: true,
        },
        {
          title: '年龄',
          dataIndex: 'age',
          valueType: 'digit',
          editable: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          valueType: 'option',
          valueEnum: {
            active: '活跃',
            inactive: '未激活',
          },
        },
        {
          title: '注册时间',
          dataIndex: 'createTime',
          valueType: 'dateTime',
        },
        {
          title: '个人简介',
          dataIndex: 'bio',
          span: 3,
        },
      ],
      dataSource: {
        username: '张三',
        age: 28,
        status: 'active',
        createTime: '2024-01-15 10:00:00',
        bio: '热爱编程的开发者',
      },
    };
  },
  methods: {
    async handleSave(data) {
      console.log('保存:', data);
      // 调用 API
      await api.updateUser(data);
    },
  },
};
</script>
```

## 常见问题

### 1. 如何隐藏某个字段？

```javascript
{
  title: '内部ID',
  dataIndex: 'id',
  hideInDescriptions: true,
}
```

### 2. 如何让字段占据整行？

```javascript
{
  title: '详细描述',
  dataIndex: 'description',
  span: 3, // 假设 column=3
}
```

### 3. 如何自定义编辑组件？

```javascript
{
  title: '评分',
  dataIndex: 'rating',
  editable: true,
  fieldComponent: 'v-rating',
  fieldProps: {
    length: 5,
    color: 'yellow',
  },
}
```

### 4. 如何格式化显示？

```javascript
{
  title: '状态',
  dataIndex: 'status',
  render: (value) => {
    return value === 1 
      ? '<span style="color: green;">✓ 启用</span>'
      : '<span style="color: red;">✗ 禁用</span>';
  },
}
```

### 5. 如何实现字段联动？

```vue
<jh-descriptions
  :columns="columns"
  :data-source="dataSource"
  @field-change="handleFieldChange"
/>

<script>
export default {
  methods: {
    handleFieldChange({ field, value }) {
      if (field === 'country') {
        // 根据国家更新城市列表
        this.updateCityOptions(value);
      }
    },
  },
};
</script>
```

## 性能优化建议

1. **大量字段**: 使用 `hideInDescriptions` 隐藏不必要的字段
2. **异步加载**: 使用 `request` 方法而不是直接传递 `dataSource`
3. **自定义渲染**: 避免在 `render` 函数中执行复杂计算
4. **响应式列数**: 合理配置不同屏幕的列数

## 样式定制

```vue
<style>
/* 修改标签背景色 */
.jh-descriptions ::v-deep .jh-descriptions-item-label {
  background: #f5f5f5;
}

/* 修改内容文字颜色 */
.jh-descriptions ::v-deep .jh-descriptions-item-content {
  color: #333;
}
</style>
```

## 与其他组件配合

### 与 JhTable 共享配置

```javascript
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    hideInTable: false,        // 在表格中显示
    hideInDescriptions: false, // 在描述列表中显示
  },
];

// 表格使用
<jh-table :columns="columns" />

// 描述列表使用
<jh-descriptions :columns="columns" />
```

### 与 JhModal 配合

```vue
<jh-modal v-model="visible" title="用户详情">
  <jh-descriptions
    :columns="columns"
    :data-source="currentUser"
  />
</jh-modal>
```

### 与 JhCard 嵌套

```vue
<jh-card title="基本信息">
  <jh-descriptions
    :columns="basicColumns"
    :data-source="dataSource"
    :bordered="false"
  />
</jh-card>

<jh-card title="详细信息" class="mt-4">
  <jh-descriptions
    :columns="detailColumns"
    :data-source="dataSource"
    :bordered="false"
  />
</jh-card>
```
