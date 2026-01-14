# JhDescriptions - AI 快速集成指南

> 描述列表组件，参考 Ant Design ProDescriptions 设计，用于展示结构化详情信息

## 🎯 核心用法

### 最简单的描述列表
```vue
<jh-descriptions
  title="用户信息"
  :columns="[
    { title: '用户名', dataIndex: 'username' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '手机号', dataIndex: 'phone' }
  ]"
  :data-source="{
    username: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000'
  }"
  :column="3"
  bordered
/>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `title` | String | 标题 | - |
| `columns` | Array | 列配置 | `[]` |
| `dataSource` | Object | 数据源 | `{}` |
| `request` | Function | 异步请求数据 | - |
| `column` | Number/Object | 列数 | `3` |
| `layout` | String | 布局 | `'horizontal'` |
| `bordered` | Boolean | 显示边框 | `true` |
| `editable` | Boolean | 可编辑模式 | `false` |
| `size` | String | 尺寸 | `'default'` |

## 🎨 ValueType 类型

| 类型 | 说明 | 显示效果 |
|------|------|----------|
| `text` | 文本 | 普通文本 |
| `digit` | 数字 | 1,234,567 |
| `money` | 金额 | ¥ 12,345.67 |
| `percent` | 百分比 | 85% |
| `date` | 日期 | 2024-01-15 |
| `dateTime` | 日期时间 | 2024-01-15 14:30:00 |
| `time` | 时间 | 14:30:00 |
| `option` | 选项 | 需配合 valueEnum |
| `select` | 下拉选择 | 编辑模式 |

## 🔧 常用功能

### 1. 垂直布局
```vue
<jh-descriptions
  title="产品详情"
  layout="vertical"
  :columns="columns"
  :data-source="dataSource"
  :column="3"
/>
```

### 2. 可编辑模式
```vue
<jh-descriptions
  title="个人信息"
  :columns="[
    { title: '姓名', dataIndex: 'name', editable: true },
    { title: '年龄', dataIndex: 'age', valueType: 'digit', editable: true },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'select',
      editable: true,
      valueEnum: {
        male: '男',
        female: '女'
      }
    }
  ]"
  :data-source="userData"
  :editable="true"
  @save="handleSave"
/>
```

### 3. ValueType 示例
```javascript
columns: [
  {
    title: '金额',
    dataIndex: 'money',
    valueType: 'money' // ¥ 12,345.67
  },
  {
    title: '百分比',
    dataIndex: 'percent',
    valueType: 'percent' // 85%
  },
  {
    title: '数字',
    dataIndex: 'digit',
    valueType: 'digit' // 1,234,567
  },
  {
    title: '日期',
    dataIndex: 'date',
    valueType: 'date' // 2024-01-15
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'option',
    valueEnum: {
      success: '成功',
      error: '失败'
    }
  }
]
```

### 4. 自定义渲染
```javascript
columns: [
  {
    title: '状态',
    dataIndex: 'status',
    render: (value) => {
      const statusMap = {
        active: '<span style="color: #52c41a;">● 活跃</span>',
        inactive: '<span style="color: #ff4d4f;">● 未激活</span>'
      };
      return statusMap[value] || value;
    }
  }
]
```

### 5. 使用插槽自定义
```vue
<jh-descriptions :columns="columns" :data-source="dataSource">
  <template #item-avatar="{ value }">
    <img :src="value" style="width: 48px; height: 48px; border-radius: 50%;" />
  </template>
  
  <template #item-tags="{ value }">
    <v-chip v-for="tag in value" :key="tag" small class="mr-1">
      {{ tag }}
    </v-chip>
  </template>
</jh-descriptions>
```

### 6. 可复制
```vue
<jh-descriptions
  :columns="[
    {
      title: 'API Key',
      dataIndex: 'apiKey',
      copyable: true // 显示复制按钮
    },
    {
      title: 'Secret Key',
      dataIndex: 'secretKey',
      copyable: true
    }
  ]"
  :data-source="apiConfig"
  @copy="handleCopy"
/>
```

### 7. 异步加载数据
```vue
<jh-descriptions
  title="文章详情"
  :columns="columns"
  :request="fetchArticle"
  :params="{ id: articleId }"
  @request-success="handleSuccess"
  @request-error="handleError"
/>

<script>
export default {
  methods: {
    async fetchArticle(params) {
      const res = await this.$api.getArticle(params.id);
      return res.data;
    }
  }
}
</script>
```

### 8. 响应式列数
```vue
<jh-descriptions
  :columns="columns"
  :data-source="dataSource"
  :column="{
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4
  }"
/>
```

### 9. 字段跨列
```javascript
columns: [
  { title: '用户名', dataIndex: 'username' },
  { title: '邮箱', dataIndex: 'email' },
  {
    title: '详细地址',
    dataIndex: 'address',
    span: 2 // 占据 2 列空间
  }
]
```

## 📡 常用事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `save` | 保存数据 | `(data)` |
| `cancel` | 取消编辑 | - |
| `copy` | 复制内容 | `{ text, item }` |
| `request-success` | 请求成功 | `(data)` |
| `request-error` | 请求失败 | `(error)` |

## 🔨 常用方法

```javascript
// 获取实例
this.$refs.descRef.reload() // 重新加载数据
```

## ⚡ 快速模板

### 详情页展示
```vue
<template>
  <jh-descriptions
    title="用户详情"
    :columns="columns"
    :data-source="userData"
    :column="3"
    bordered
  >
    <template #item-avatar="{ value }">
      <v-avatar size="48">
        <img :src="value" />
      </v-avatar>
    </template>
    
    <template #item-status="{ value }">
      <v-chip :color="value === '启用' ? 'success' : 'error'" small>
        {{ value }}
      </v-chip>
    </template>
  </jh-descriptions>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { title: 'ID', dataIndex: 'id' },
        { title: '头像', dataIndex: 'avatar' },
        { title: '用户名', dataIndex: 'username', copyable: true },
        { title: '邮箱', dataIndex: 'email', copyable: true },
        { title: '手机号', dataIndex: 'phone' },
        { title: '状态', dataIndex: 'status' },
        {
          title: '余额',
          dataIndex: 'balance',
          valueType: 'money'
        },
        {
          title: '注册时间',
          dataIndex: 'createdAt',
          valueType: 'dateTime'
        },
        {
          title: '个人简介',
          dataIndex: 'bio',
          span: 3
        }
      ],
      userData: {}
    };
  }
};
</script>
```

### 可编辑详情页
```vue
<template>
  <jh-descriptions
    title="个人信息"
    :columns="columns"
    :data-source="userData"
    :editable="true"
    @save="handleSave"
  />
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          editable: true
        },
        {
          title: '年龄',
          dataIndex: 'age',
          valueType: 'digit',
          editable: true
        },
        {
          title: '性别',
          dataIndex: 'gender',
          valueType: 'select',
          editable: true,
          valueEnum: {
            male: '男',
            female: '女'
          }
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          editable: true,
          fieldProps: {
            rules: [
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '邮箱格式不正确' }
            ]
          }
        }
      ],
      userData: {}
    };
  },
  methods: {
    async handleSave(data) {
      console.log('保存:', data);
      await this.$api.updateUser(data);
      this.$message.success('保存成功');
    }
  }
};
</script>
```

## ⚠️ 注意事项

1. **字段标识用 `dataIndex` 或 `key`，不是 `value`**
2. **`request` 方法返回对象，不是数组**
3. **自定义插槽名是 `item-{dataIndex}`，不是 `item.{dataIndex}`**
4. **`valueEnum` 用于 `option` 类型，格式是 `{ value: 'text' }`**
5. **编辑模式下，`editable: false` 的字段不可编辑**

## 🔗 相关组件

- **JhTable**: 列表展示（可共享 columns 配置）
- **JhCard**: 卡片容器
- **JhForm**: 表单编辑
