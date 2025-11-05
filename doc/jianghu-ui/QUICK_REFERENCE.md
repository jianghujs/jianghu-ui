# JianghuJS UI 快速参考手册

> **快速查阅版本** - 为 AI 代码助手提供的精简参考

---

## 🚀 一句话了解组件库

基于 Vue 2 + Vuetify 2 的企业级 UI 组件库，提供表格、表单、布局等常用组件，遵循 Material Design 规范。

---

## 📦 核心组件速查

### 数据表格 - JhTable

**用途**: 数据展示、列表管理、高级搜索

**必填属性**:
```vue
<jh-table :headers="headers" :items="items" />
```

**服务端分页**:
```vue
<jh-table :headers="headers" :request="loadData" />
```

**完整功能**:
```vue
<jh-table
  :headers="headers"
  :request="loadData"
  :show-filter="true"
  :filter-fields="filterFields"
  :show-select="true"
  @create-click="handleCreate"
  @update-click="handleUpdate"
  @delete-click="handleDelete"
/>
```

---

### 通用表单 - JhForm

**用途**: 数据录入、信息编辑

**基础用法**:
```vue
<jh-form
  :fields="[
    { key: 'name', label: '姓名', type: 'text', required: true },
    { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
  ]"
  :initial-data="formData"
  @submit="handleSubmit"
/>
```

**字段类型**: text | number | textarea | select | autocomplete | date | time | switch | checkbox | radio | slot

---

### 动态表单列表 - JhFormList

**用途**: 动态增删表单项、重复性数据录入

**基础用法**:
```vue
<jh-form-list
  v-model="list"
  :fields="[
    { key: 'name', label: '姓名', type: 'text' },
    { key: 'phone', label: '电话', type: 'text' },
  ]"
  :min="1"
  :max="5"
/>
```

**渲染模式**: card | table | inline

---

### 弹窗表单 - JhModalForm

**用途**: 快速新增/编辑

```vue
<jh-modal-form
  v-model="showModal"
  title="新增用户"
  :fields="formFields"
  @confirm="handleConfirm"
/>
```

---

### 查询筛选器 - JhQueryFilter

**用途**: 高级搜索、条件筛选

```vue
<jh-query-filter
  :fields="[
    { key: 'keyword', label: '关键词', type: 'text' },
    { key: 'status', label: '状态', type: 'select', options: [] },
  ]"
  @search="handleSearch"
  @reset="handleReset"
/>
```

---

## 🎯 常见场景代码模板

### 场景1: 标准 CRUD 页面

```vue
<template>
  <div>
    <!-- 表格 -->
    <jh-table
      ref="table"
      :headers="headers"
      :request="loadData"
      :show-filter="true"
      :filter-fields="filterFields"
      @create-click="handleCreate"
      @update-click="handleUpdate"
      @delete-click="handleDelete"
    />
    
    <!-- 新增/编辑弹窗 -->
    <jh-modal-form
      v-model="showModal"
      :title="isEdit ? '编辑' : '新增'"
      :fields="formFields"
      :initial-data="currentRow"
      @confirm="handleSubmit"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: '姓名', value: 'name' },
        { text: '操作', value: 'action' },
      ],
      filterFields: [
        { key: 'name', label: '姓名', type: 'text' },
      ],
      formFields: [
        { key: 'name', label: '姓名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
      ],
      showModal: false,
      isEdit: false,
      currentRow: null,
    };
  },
  methods: {
    async loadData({ page, pageSize, filters }) {
      const res = await this.$api.getList({ page, pageSize, ...filters });
      return { data: res.data.list, total: res.data.total };
    },
    handleCreate() {
      this.isEdit = false;
      this.currentRow = {};
      this.showModal = true;
    },
    handleUpdate(row) {
      this.isEdit = true;
      this.currentRow = { ...row };
      this.showModal = true;
    },
    async handleDelete(row) {
      await this.$api.delete(row.id);
      this.$refs.table.reload();
    },
    async handleSubmit(data) {
      if (this.isEdit) {
        await this.$api.update(data.id, data);
      } else {
        await this.$api.create(data);
      }
      this.showModal = false;
      this.$refs.table.reload();
    },
  },
};
</script>
```

---

### 场景2: 带高级搜索的表格

```vue
<template>
  <jh-table
    :headers="headers"
    :request="loadData"
    :show-filter="true"
    :filter-fields="filterFields"
    :filter-collapsible="true"
    :filter-default-collapsed="true"
  />
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: '姓名', value: 'name' },
        { text: '部门', value: 'department' },
        { text: '状态', value: 'status' },
      ],
      filterFields: [
        { key: 'name', label: '姓名', type: 'text', placeholder: '请输入姓名' },
        { 
          key: 'department', 
          label: '部门', 
          type: 'select',
          options: [
            { text: '技术部', value: 'tech' },
            { text: '市场部', value: 'market' },
          ]
        },
        { key: 'status', label: '状态', type: 'select', options: [] },
        { key: 'dateRange', label: '创建时间', type: 'daterange' },
      ],
    };
  },
  methods: {
    async loadData({ page, pageSize, search, filters }) {
      const res = await this.$api.getList({
        page,
        pageSize,
        keyword: search,
        ...filters,
      });
      return { data: res.data.list, total: res.data.total };
    },
  },
};
</script>
```

---

### 场景3: 多步骤表单

```vue
<template>
  <jh-steps-form
    :steps="steps"
    @finish="handleFinish"
  >
    <template v-slot:step1>
      <jh-form :fields="step1Fields" />
    </template>
    <template v-slot:step2>
      <jh-form :fields="step2Fields" />
    </template>
    <template v-slot:step3>
      <jh-form :fields="step3Fields" />
    </template>
  </jh-steps-form>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        { title: '基本信息', slot: 'step1' },
        { title: '详细信息', slot: 'step2' },
        { title: '确认信息', slot: 'step3' },
      ],
      step1Fields: [
        { key: 'name', label: '姓名', type: 'text', required: true },
      ],
      step2Fields: [
        { key: 'address', label: '地址', type: 'textarea' },
      ],
      step3Fields: [
        { key: 'remark', label: '备注', type: 'textarea' },
      ],
    };
  },
  methods: {
    async handleFinish(data) {
      await this.$api.submit(data);
    },
  },
};
</script>
```

---

### 场景4: 动态表单列表（订单明细）

```vue
<template>
  <div>
    <!-- 订单基本信息 -->
    <jh-form :fields="orderFields" :initial-data="orderData" />
    
    <!-- 订单明细 -->
    <jh-form-list
      v-model="orderData.items"
      :fields="itemFields"
      mode="table"
      title="订单明细"
      :min="1"
      add-button-text="添加商品"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderData: {
        customerName: '',
        orderDate: '',
        items: [],
      },
      orderFields: [
        { key: 'customerName', label: '客户名称', type: 'text', required: true },
        { key: 'orderDate', label: '订单日期', type: 'date', required: true },
      ],
      itemFields: [
        { key: 'productName', label: '商品名称', type: 'text', required: true },
        { key: 'price', label: '单价', type: 'number', required: true },
        { key: 'quantity', label: '数量', type: 'number', required: true },
      ],
    };
  },
};
</script>
```

---

## 🔧 字段配置速查

### 通用字段属性

```javascript
{
  key: 'fieldName',              // 字段标识（必填）
  label: '字段标签',              // 显示标签
  type: 'text',                  // 字段类型
  required: true,                // 是否必填
  rules: 'email',                // 验证规则
  placeholder: '请输入',          // 占位文本
  defaultValue: '',              // 默认值
  disabled: false,               // 是否禁用
  readonly: false,               // 是否只读
  visible: true,                 // 是否显示
  cols: 6,                       // 列宽（1-12）
  hideDetails: false,            // 隐藏详情
  props: {},                     // 传递给底层组件的属性
}
```

### 字段类型及特有属性

```javascript
// 文本输入
{ type: 'text', prefix: '¥', suffix: '元' }

// 文本域
{ type: 'textarea', rows: 3 }

// 数字输入
{ type: 'number' }

// 下拉选择
{ 
  type: 'select', 
  options: [{ text: '选项1', value: 1 }],
  multiple: true,
  chips: true,
}

// 自动完成
{ type: 'autocomplete', options: [] }

// 日期选择
{ type: 'date', locale: 'zh-cn' }

// 时间选择
{ type: 'time' }

// 开关
{ type: 'switch', switchLabel: '启用', color: 'success' }

// 复选框
{ type: 'checkbox', checkboxLabel: '我同意', color: 'success' }

// 单选按钮
{ 
  type: 'radio', 
  options: [{ text: '选项1', value: 1 }],
  row: true,
}

// 自定义插槽
{ type: 'slot' }

// 表单分组
{ type: 'group', title: '分组标题', description: '说明', divider: true }
```

---

## 💡 高级技巧

### 1. 字段联动

```javascript
// 动态显示/隐藏
{
  key: 'companyName',
  label: '公司名称',
  type: 'text',
  visible: (formData) => formData.userType === 'company',
}

// 动态禁用
{
  key: 'city',
  label: '城市',
  type: 'select',
  disabled: (formData) => !formData.province,
}
```

### 2. 自定义验证规则

```javascript
{
  key: 'password',
  label: '密码',
  type: 'text',
  rules: [
    v => !!v || '密码不能为空',
    v => (v && v.length >= 6) || '密码至少6位',
    v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v) || '密码需包含大小写字母和数字',
  ],
}
```

### 3. 表格自定义列

```vue
<jh-table :headers="headers" :items="items">
  <!-- 自定义状态列 -->
  <template v-slot:item.status="{ item, value }">
    <v-chip :color="value === 'active' ? 'success' : 'error'" small>
      {{ value === 'active' ? '正常' : '禁用' }}
    </v-chip>
  </template>
  
  <!-- 自定义操作列 -->
  <template v-slot:item.action="{ item }">
    <v-btn small text color="primary" @click="handleEdit(item)">编辑</v-btn>
    <v-btn small text color="error" @click="handleDelete(item)">删除</v-btn>
  </template>
</jh-table>
```

### 4. 表格配置化操作列

```javascript
{
  actionColumn: {
    title: '操作',
    width: 200,
    buttons: [
      {
        text: '编辑',
        type: 'link',
        icon: 'mdi-pencil',
        color: 'primary',
        onClick: (row) => this.handleEdit(row),
        visible: (row) => row.editable,
      },
      {
        text: '删除',
        type: 'link',
        icon: 'mdi-delete',
        color: 'error',
        onClick: (row) => this.handleDelete(row),
        confirm: '确定要删除吗？',
      },
    ],
  }
}
```

---

## 🎨 常用样式配置

### 响应式列宽

```javascript
// 简单配置
{ cols: 6 }  // 在所有屏幕尺寸下占6列

// 响应式配置
{ cols: { xs: 12, sm: 6, md: 4, lg: 3 } }
```

### 表单布局模式

```javascript
// 垂直布局（默认）
<jh-form layout="vertical" />

// 水平布局
<jh-form layout="horizontal" :label-width="100" />

// 行内布局
<jh-form layout="inline" />

// 网格布局
<jh-form layout="grid" />
```

---

## 🔍 调试技巧

### 获取表单数据

```javascript
// 方法1: 通过 ref
this.$refs.form.getFormData()

// 方法2: 监听事件
<jh-form @field-change="handleFieldChange" />
```

### 手动触发验证

```javascript
const isValid = await this.$refs.form.validate();
if (isValid) {
  // 验证通过
}
```

### 重置表单

```javascript
this.$refs.form.resetForm();
```

### 设置表单值

```javascript
// 设置多个字段
this.$refs.form.setFieldsValue({
  name: '张三',
  email: 'zhang@example.com',
});

// 设置单个字段
this.$refs.form.setFieldValue('name', '李四');
```

---

## 📝 代码规范建议

### 字段配置抽离

```javascript
// ❌ 不推荐：直接写在模板中
<jh-form :fields="[{ key: 'name', label: '姓名', type: 'text' }]" />

// ✅ 推荐：抽离到 data 或独立文件
export default {
  data() {
    return {
      formFields: [
        { key: 'name', label: '姓名', type: 'text' },
      ],
    };
  },
};
```

### API 请求封装

```javascript
// ❌ 不推荐：在组件中直接写请求
async loadData() {
  const res = await axios.get('/api/users');
  return res.data;
}

// ✅ 推荐：封装到 API 文件
// api/user.js
export const getUserList = (params) => request.get('/users', { params });

// 组件中使用
async loadData(params) {
  const res = await this.$api.getUserList(params);
  return { data: res.data.list, total: res.data.total };
}
```

---

## 🚨 常见问题解决

### 问题1: 表单验证不生效

**原因**: 没有设置 `required` 或 `rules`

**解决**:
```javascript
{ key: 'name', label: '姓名', type: 'text', required: true }
// 或
{ key: 'email', label: '邮箱', type: 'text', rules: 'email' }
```

---

### 问题2: 表格数据不刷新

**原因**: 没有调用 `reload` 方法

**解决**:
```javascript
// 在 CRUD 操作后调用
this.$refs.table.reload();
```

---

### 问题3: 字段联动不生效

**原因**: `visible` 或 `disabled` 使用了布尔值而不是函数

**解决**:
```javascript
// ❌ 错误
{ visible: false }

// ✅ 正确
{ visible: (formData) => formData.userType === 'company' }
```

---

## 📚 组件完整列表

| 组件名 | 说明 | 典型用途 |
|--------|------|----------|
| `JhTable` | 数据表格 | 列表展示、数据管理 |
| `JhForm` | 通用表单 | 数据录入、信息编辑 |
| `JhFormList` | 动态表单列表 | 重复性数据录入 |
| `JhModalForm` | 弹窗表单 | 快速新增/编辑 |
| `JhDrawerForm` | 抽屉表单 | 详情查看、侧边编辑 |
| `JhStepsForm` | 步骤表单 | 多步骤流程、向导 |
| `JhQueryFilter` | 查询筛选器 | 高级搜索、条件筛选 |
| `JhEditableTable` | 可编辑表格 | 批量数据录入 |
| `JhDateRangePicker` | 日期范围选择器 | 时间筛选、报表查询 |
| `JhMenu` | 导航菜单 | 侧边栏导航、顶部菜单 |
| `JhPageContainer` | 页面容器 | 标准页面布局 |
| `JhConfirmDialog` | 确认对话框 | 删除确认、操作确认 |
| `JhToast` | 消息提示 | 操作反馈、通知 |
| `JhFileInput` | 文件上传 | 图片上传、文件选择 |
| `JhJsonEditor` | JSON 编辑器 | API 调试、配置编辑 |
| `JhMarkdownEditor` | Markdown 编辑器 | 富文本编辑、文档编写 |

---

**快速参考手册 v1.0** | 专为 AI 代码助手优化

