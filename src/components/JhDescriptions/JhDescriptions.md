# JhDescriptions 描述列表

基于 Ant Design ProDescriptions 设计的数据展示组件，用于展示结构化的详情信息。

## 功能特性

- 📋 **多种布局** - 支持水平和垂直两种布局方式
- ✏️ **可编辑模式** - 支持行内编辑，快速修改数据
- 🎨 **丰富的 ValueType** - 内置多种数据类型格式化
- 📱 **响应式列数** - 支持不同屏幕尺寸自适应列数
- 📋 **一键复制** - 支持字段内容快速复制
- 🔄 **异步加载** - 支持通过 request 方法异步获取数据
- 🎯 **自定义渲染** - 支持自定义渲染函数和插槽
- 🎭 **多种尺寸** - 支持 small 和 default 两种尺寸

## 基础用法

```vue
<template>
  <jh-descriptions
    title="用户信息"
    :columns="columns"
    :data-source="dataSource"
    :column="3"
    bordered
  />
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
        },
      ],
      dataSource: {
        username: '张三',
        phone: '13800138000',
        email: 'zhangsan@example.com',
      },
    };
  },
};
</script>
```

## 垂直布局

```vue
<template>
  <jh-descriptions
    title="产品详情"
    layout="vertical"
    :columns="columns"
    :data-source="dataSource"
    :column="3"
  />
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '产品名称',
          dataIndex: 'productName',
        },
        {
          title: '产品价格',
          dataIndex: 'price',
          valueType: 'money',
        },
        {
          title: '库存数量',
          dataIndex: 'stock',
          valueType: 'digit',
        },
      ],
      dataSource: {
        productName: 'iPhone 15 Pro',
        price: 7999,
        stock: 1234,
      },
    };
  },
};
</script>
```

## 可编辑模式

```vue
<template>
  <jh-descriptions
    title="个人信息"
    :columns="columns"
    :data-source="dataSource"
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
          editable: true,
        },
        {
          title: '年龄',
          dataIndex: 'age',
          valueType: 'digit',
          editable: true,
        },
        {
          title: '性别',
          dataIndex: 'gender',
          valueType: 'select',
          editable: true,
          valueEnum: {
            male: '男',
            female: '女',
          },
        },
      ],
      dataSource: {
        name: '李四',
        age: 28,
        gender: 'male',
      },
    };
  },
  methods: {
    handleSave(data) {
      console.log('保存数据:', data);
      // 调用 API 保存数据
    },
  },
};
</script>
```

## ValueType 类型

组件支持多种内置的数据类型格式化：

```vue
<template>
  <jh-descriptions
    title="ValueType 示例"
    :columns="columns"
    :data-source="dataSource"
  />
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '金额',
          dataIndex: 'money',
          valueType: 'money', // ¥ 12,345.67
        },
        {
          title: '百分比',
          dataIndex: 'percent',
          valueType: 'percent', // 85%
        },
        {
          title: '数字',
          dataIndex: 'digit',
          valueType: 'digit', // 1,234,567
        },
        {
          title: '日期',
          dataIndex: 'date',
          valueType: 'date', // 2024-01-15
        },
        {
          title: '日期时间',
          dataIndex: 'dateTime',
          valueType: 'dateTime', // 2024-01-15 14:30:00
        },
        {
          title: '时间',
          dataIndex: 'time',
          valueType: 'time', // 14:30:00
        },
        {
          title: '选项',
          dataIndex: 'status',
          valueType: 'option',
          valueEnum: {
            success: '成功',
            error: '失败',
          },
        },
      ],
      dataSource: {
        money: 12345.67,
        percent: 85,
        digit: 1234567,
        date: '2024-01-15',
        dateTime: '2024-01-15 14:30:00',
        time: '14:30:00',
        status: 'success',
      },
    };
  },
};
</script>
```

## 自定义渲染

### 使用 render 函数

```vue
<template>
  <jh-descriptions
    :columns="columns"
    :data-source="dataSource"
  />
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '状态',
          dataIndex: 'status',
          render: (value) => {
            const statusMap = {
              active: '<span style="color: #52c41a;">● 活跃</span>',
              inactive: '<span style="color: #ff4d4f;">● 未激活</span>',
            };
            return statusMap[value] || value;
          },
        },
        {
          title: '进度',
          dataIndex: 'progress',
          render: (value) => {
            const color = value >= 80 ? '#52c41a' : '#faad14';
            return `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="flex: 1; height: 8px; background: #f0f0f0; border-radius: 4px;">
                  <div style="width: ${value}%; height: 100%; background: ${color};"></div>
                </div>
                <span>${value}%</span>
              </div>
            `;
          },
        },
      ],
      dataSource: {
        status: 'active',
        progress: 75,
      },
    };
  },
};
</script>
```

### 使用插槽

```vue
<template>
  <jh-descriptions
    :columns="columns"
    :data-source="dataSource"
  >
    <template #item-avatar="{ value }">
      <img :src="value" alt="avatar" style="width: 48px; height: 48px; border-radius: 50%;" />
    </template>
    
    <template #item-tags="{ value }">
      <div style="display: flex; gap: 8px;">
        <span
          v-for="tag in value"
          :key="tag"
          style="padding: 2px 8px; background: #f0f0f0; border-radius: 4px;"
        >
          {{ tag }}
        </span>
      </div>
    </template>
  </jh-descriptions>
</template>
```

## 可复制

```vue
<template>
  <jh-descriptions
    title="API 配置"
    :columns="columns"
    :data-source="dataSource"
    @copy="handleCopy"
  />
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: 'API Key',
          dataIndex: 'apiKey',
          copyable: true, // 显示复制按钮
        },
        {
          title: 'Secret Key',
          dataIndex: 'secretKey',
          copyable: true,
        },
      ],
      dataSource: {
        apiKey: 'sk_test_1234567890abcdef',
        secretKey: 'sk_live_abcdef1234567890',
      },
    };
  },
  methods: {
    handleCopy({ text, item }) {
      console.log('已复制:', text);
      this.$toast.success('复制成功');
    },
  },
};
</script>
```

## 异步加载数据

```vue
<template>
  <jh-descriptions
    title="文章详情"
    :columns="columns"
    :request="fetchArticle"
    :params="{ id: articleId }"
    @request-success="handleSuccess"
    @request-error="handleError"
  />
</template>

<script>
export default {
  data() {
    return {
      articleId: 1,
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
        },
        {
          title: '作者',
          dataIndex: 'author',
        },
        {
          title: '发布时间',
          dataIndex: 'publishTime',
          valueType: 'dateTime',
        },
      ],
    };
  },
  methods: {
    async fetchArticle(params) {
      const response = await fetch(`/api/articles/${params.id}`);
      return response.json();
    },
    handleSuccess(data) {
      console.log('数据加载成功:', data);
    },
    handleError(error) {
      console.error('数据加载失败:', error);
    },
  },
};
</script>
```

## 响应式列数

```vue
<template>
  <jh-descriptions
    :columns="columns"
    :data-source="dataSource"
    :column="{
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 4,
      xxl: 4,
    }"
  />
</template>
```

## API

### JhDescriptions Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | - |
| tooltip | 标题提示信息 | `string` | - |
| columns | 列配置 | `Column[]` | `[]` |
| dataSource | 数据源 | `object` | `{}` |
| request | 请求数据的方法 | `(params) => Promise<object>` | - |
| params | 请求参数 | `object` | `{}` |
| column | 列数 | `number \| object` | `3` |
| layout | 布局方式 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| size | 尺寸 | `'small' \| 'default'` | `'default'` |
| colon | 是否显示冒号 | `boolean` | `true` |
| labelWidth | 标签宽度比例（仅水平布局） | `number \| string` | `'auto'` |
| editable | 是否可编辑 | `boolean \| object` | `false` |
| editText | 编辑按钮文本 | `string` | `'编辑'` |
| cancelText | 取消按钮文本 | `string` | `'取消'` |
| saveText | 保存按钮文本 | `string` | `'保存'` |
| emptyText | 空值占位符 | `string` | `'-'` |
| loading | 加载状态 | `boolean` | `false` |
| responsive | 响应式配置 | `boolean` | `true` |

### Column 配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | - |
| label | 标签（同 title） | `string` | - |
| dataIndex | 数据字段名 | `string` | - |
| key | 唯一标识 | `string` | - |
| valueType | 值类型 | `ValueType` | `'text'` |
| valueEnum | 值枚举（用于 option 类型） | `object` | - |
| span | 跨列数 | `number` | `1` |
| tooltip | 提示信息 | `string` | - |
| copyable | 是否可复制 | `boolean` | `false` |
| editable | 是否可编辑 | `boolean` | `true` |
| disabled | 是否禁用编辑 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| render | 自定义渲染函数 | `(value, record, item) => string` | - |
| fieldComponent | 编辑时的字段组件 | `string` | - |
| fieldProps | 字段组件属性 | `object` | - |
| visible | 是否可见 | `boolean \| (record) => boolean` | `true` |
| hideInDescriptions | 是否在描述列表中隐藏 | `boolean` | `false` |
| labelCol | 标签列宽（仅水平布局） | `number` | `6` |

### ValueType 类型

| 类型 | 说明 | 示例 |
|------|------|------|
| text | 文本 | 普通文本 |
| textarea | 多行文本 | 长文本 |
| digit | 数字 | 1,234,567 |
| money | 金额 | ¥ 12,345.67 |
| percent | 百分比 | 85% |
| date | 日期 | 2024-01-15 |
| dateTime | 日期时间 | 2024-01-15 14:30:00 |
| time | 时间 | 14:30:00 |
| option | 选项 | 需配合 valueEnum 使用 |
| select | 下拉选择 | 编辑模式下显示 |
| radio | 单选 | 编辑模式下显示 |
| checkbox | 复选框 | 编辑模式下显示 |
| switch | 开关 | 编辑模式下显示 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| save | 保存数据 | `(data: object)` |
| save-success | 保存成功 | `(data: object)` |
| save-error | 保存失败 | `(error: Error)` |
| cancel | 取消编辑 | - |
| edit-start | 开始编辑 | - |
| field-change | 字段值变化 | `{ field, value, item }` |
| copy | 复制内容 | `{ text, item }` |
| request-success | 请求成功 | `(data: object)` |
| request-error | 请求失败 | `(error: Error)` |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| title | 自定义标题 | - |
| extra | 额外内容 | - |
| item-{dataIndex} | 自定义字段内容 | `{ value, record, item }` |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| reload | 重新加载数据 | - |

## 响应式断点

| 断点 | 屏幕宽度 |
|------|----------|
| xs | < 576px |
| sm | ≥ 576px |
| md | ≥ 768px |
| lg | ≥ 992px |
| xl | ≥ 1200px |
| xxl | ≥ 1920px |

## 样式定制

组件使用 scoped 样式，可以通过以下 CSS 变量进行定制：

```css
.jh-descriptions {
  /* 标签背景色 */
  --jh-descriptions-label-bg: #fafafa;
  
  /* 标签文字颜色 */
  --jh-descriptions-label-color: rgba(0, 0, 0, 0.85);
  
  /* 内容文字颜色 */
  --jh-descriptions-content-color: rgba(0, 0, 0, 0.65);
  
  /* 边框颜色 */
  --jh-descriptions-border-color: #f0f0f0;
}
```

## 最佳实践

### 1. 合理使用 span

对于需要占据更多空间的字段，使用 `span` 属性：

```javascript
{
  title: '详细地址',
  dataIndex: 'address',
  span: 2, // 占据 2 列的空间
}
```

### 2. 编辑模式的表单验证

在编辑模式下，建议配合表单验证：

```javascript
{
  title: '邮箱',
  dataIndex: 'email',
  editable: true,
  fieldProps: {
    rules: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
    ],
  },
}
```

### 3. 异步数据加载

使用 `request` 方法时，建议添加错误处理：

```vue
<template>
  <jh-descriptions
    :request="fetchData"
    @request-error="handleError"
  />
</template>

<script>
export default {
  methods: {
    async fetchData(params) {
      try {
        const response = await api.getData(params);
        return response.data;
      } catch (error) {
        console.error('数据加载失败:', error);
        throw error;
      }
    },
    handleError(error) {
      this.$toast.error('数据加载失败，请稍后重试');
    },
  },
};
</script>
```

### 4. 性能优化

对于大量数据，建议使用 `hideInDescriptions` 隐藏不必要的字段：

```javascript
{
  title: '内部ID',
  dataIndex: 'internalId',
  hideInDescriptions: true, // 不在描述列表中显示
}
```

## 与 ProTable 共享配置

`JhDescriptions` 和 `JhTable` 可以共享相同的 columns 配置：

```javascript
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    hideInTable: false,        // 在表格中显示
    hideInDescriptions: false, // 在描述列表中显示
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInTable: false,
    hideInDescriptions: false,
  },
];

// 在表格中使用
<jh-table :columns="columns" />

// 在描述列表中使用
<jh-descriptions :columns="columns" />
```

## 注意事项

1. `dataIndex` 或 `key` 必须提供其中之一
2. 使用 `render` 函数时返回的 HTML 字符串会被渲染，注意 XSS 安全
3. 编辑模式下，`editable: false` 的字段不可编辑
4. `request` 方法应该返回一个对象，而不是数组
5. 响应式列数配置时，至少要提供 `default` 值

## 更新日志

### v1.0.0 (2024-01-15)

- ✨ 初始版本发布
- ✨ 支持水平和垂直布局
- ✨ 支持可编辑模式
- ✨ 支持多种 ValueType
- ✨ 支持异步数据加载
- ✨ 支持自定义渲染
- ✨ 支持响应式列数
- ✨ 支持复制功能
