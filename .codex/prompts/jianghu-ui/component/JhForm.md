# JhForm - AI 快速集成指南

> 高级表单组件，参考 Ant Design ProForm 设计，支持多种布局和字段类型

## 🎯 核心用法

### 最简单的表单
```vue
<jh-form
  :fields="[
    { key: 'username', label: '用户名', type: 'text', required: true },
    { key: 'email', label: '邮箱', type: 'text', rules: 'email' }
  ]"
  :initialData="{ username: '', email: '' }"
  @submit="handleSubmit"
>
  <template #actions="{ validate, resetForm }">
    <v-btn @click="resetForm">重置</v-btn>
    <v-btn color="primary" @click="validate">提交</v-btn>
  </template>
</jh-form>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `fields` | Array | 字段配置数组 | `[]` |
| `initialData` | Object | 初始数据 | `{}` |
| `layout` | String | 布局模式 | `'vertical'` |
| `readonly` | Boolean | 只读模式 | `false` |
| `disabled` | Boolean | 禁用模式 | `false` |
| `labelWidth` | Number/String | 标签宽度 | `'auto'` |
| `defaultColsMd` | Number | 默认列宽 | `6` |
| `grid` | Boolean | 启用 24 栏自动栅格（等价 `layout="grid"`） | `false` |
| `colProps` | Object | Grid 模式列配置（支持 `span`、`cols`、`md/lg/xl`） | `{}` |
| `rowProps` | Object | Grid 模式行属性（透传给 `v-row`，可设置 `dense/align`） | `{}` |

## 🎨 字段类型 (type)

| 类型 | 说明 | 配置示例 |
|------|------|----------|
| `text` | 文本输入 | `{ key: 'name', label: '姓名', type: 'text' }` |
| `textarea` | 文本域 | `{ key: 'desc', label: '描述', type: 'textarea', rows: 4 }` |
| `number` | 数字输入 | `{ key: 'age', label: '年龄', type: 'number' }` |
| `select` | 下拉选择 | `{ key: 'role', label: '角色', type: 'select', options: [...] }` |
| `autocomplete` | 自动完成 | `{ key: 'city', label: '城市', type: 'autocomplete', options: [...] }` |
| `date` | 日期选择 | `{ key: 'birthday', label: '生日', type: 'date' }` |
| `time` | 时间选择 | `{ key: 'startTime', label: '开始时间', type: 'time' }` |
| `switch` | 开关 | `{ key: 'enabled', label: '启用', type: 'switch' }` |
| `checkbox` | 复选框 | `{ key: 'agree', label: '同意协议', type: 'checkbox' }` |
| `radio` | 单选按钮 | `{ key: 'gender', label: '性别', type: 'radio', options: [...] }` |
| `slot` | 自定义插槽 | `{ key: 'custom', label: '自定义', type: 'slot' }` |
| `group` | 分组标题 | `{ type: 'group', title: '基本信息' }` |

## 🔧 常用功能

### 1. 字段分组
```javascript
fields: [
  { type: 'group', title: '基本信息', divider: false },
  { key: 'username', label: '用户名', type: 'text' },
  { key: 'email', label: '邮箱', type: 'text' },
  
  { type: 'group', title: '账户设置', divider: true },
  { key: 'role', label: '角色', type: 'select', options: [...] }
]
```

### 2. 字段联动（重要）
```javascript
fields: [
  {
    key: 'userType',
    label: '用户类型',
    type: 'radio',
    options: [
      { text: '个人', value: 'personal' },
      { text: '企业', value: 'company' }
    ]
  },
  {
    key: 'personalName',
    label: '姓名',
    type: 'text',
    // 动态显示：根据 userType 决定是否显示
    visible: (formData) => formData.userType === 'personal'
  },
  {
    key: 'companyName',
    label: '公司名称',
    type: 'text',
    visible: (formData) => formData.userType === 'company'
  },
  {
    key: 'remarks',
    label: '备注',
    type: 'textarea',
    // 动态禁用
    disabled: (formData) => !formData.agreeTerms
  }
]
```

### 3. 数据转换
```javascript
fields: [
  {
    key: 'price',
    label: '价格',
    type: 'number',
    // 提交时转换为分
    transform: (value) => value * 100
  },
  {
    key: 'tags',
    label: '标签',
    type: 'select',
    multiple: true,
    // 转换为逗号分隔字符串
    transform: (value) => Array.isArray(value) ? value.join(',') : value
  }
]
```

### 4. 验证规则
```javascript
fields: [
  // 方式1: 使用 required 快捷方式
  { key: 'username', label: '用户名', type: 'text', required: true },
  
  // 方式2: 使用内置规则字符串
  { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
  { key: 'phone', label: '手机', type: 'text', rules: 'phone' },
  
  // 方式3: 自定义规则数组
  {
    key: 'age',
    label: '年龄',
    type: 'number',
    rules: [
      v => !!v || '年龄必填',
      v => v >= 18 || '年龄必须大于18岁'
    ]
  }
]
```

### 5. 响应式布局
```javascript
fields: [
  {
    key: 'field1',
    label: '字段1',
    type: 'text',
    cols: {
      xs: 12,  // 手机端全宽
      sm: 6,   // 平板端半宽
      md: 4,   // 桌面端1/3宽
      lg: 3    // 大屏1/4宽
    }
  }
]
```

### 6. 提示信息
```javascript
fields: [
  {
    key: 'password',
    label: '密码',
    type: 'text',
    tooltip: '密码长度至少8位',
    extra: '建议使用强密码',
    props: { type: 'password' }
  }
]
```

### 7. 自定义字段
```vue
<jh-form :fields="fields">
  <template #field-customField="{ field, formData, updateField }">
    <v-slider
      :value="formData[field.key]"
      @input="updateField(field.key, $event)"
      min="0"
      max="100"
    />
  </template>
</jh-form>
```

```javascript
fields: [
  { key: 'customField', label: '自定义字段', type: 'slot' }
]
```

## 📐 布局模式

### 1. 垂直布局（默认）
```vue
<jh-form :fields="fields" layout="vertical" />
```

### 2. 水平布局
```vue
<jh-form 
  :fields="fields" 
  layout="horizontal"
  labelWidth="120"
  labelAlign="right"
/>
```

### 3. 行内布局（搜索表单）
```vue
<jh-form :fields="fields" layout="inline">
  <template #actions="{ validate, resetForm }">
    <v-btn color="primary" @click="validate">查询</v-btn>
    <v-btn text @click="resetForm">重置</v-btn>
  </template>
</jh-form>
```

### 4. 栅格布局
```vue
<jh-form 
  layout="grid"
  :grid="true"
  :col-props="{ span: 8, lg: 6 }"
  :row-props="{ dense: true, align: 'center' }"
  :fields="[
    { type: 'group', title: '基本信息' },
    { key: 'code', label: '项目编号', type: 'text', colSpan: 6 },
    { key: 'name', label: '项目名称', type: 'text', colSpan: 12 },
    { key: 'owner', label: '负责人', type: 'text' },
    { key: 'status', label: '状态', type: 'select', options: statusOptions, colProps: { md: 3 } }
  ]"
>
  <template #actions="{ validate, resetForm }">
    <v-btn text @click="resetForm">重置</v-btn>
    <v-btn color="primary" @click="validate">提交</v-btn>
  </template>
</jh-form>
```
- `colSpan` 采用 24 栏语义，组件会自动映射到 Vuetify 12 栏。
- `colProps`/`rowProps` 可覆盖断点列宽与 `v-row` 属性，操作区在 Grid 模式下会占满最后一行保持对齐。

## 🔨 常用方法

```javascript
// 获取表单实例
const form = this.$refs.formRef;

form.getFormData()              // 获取表单数据
form.setFieldsValue({ ... })    // 设置多个字段值
form.setFieldValue('key', val)  // 设置单个字段值
form.validate()                 // 验证表单（返回 Promise）
form.resetForm()                // 重置表单
form.submit()                   // 提交表单
form.getTransformedData()       // 获取转换后的数据
```

## 📡 常用事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `submit` | 表单提交 | `(data)` |
| `reset` | 表单重置 | `(data)` |
| `validate` | 表单验证 | `(isValid, data)` |
| `field-change` | 字段变化 | `{ key, value, formData }` |

## ⚡ 快速模板

### 标准表单
```vue
<template>
  <jh-form
    ref="formRef"
    :fields="fields"
    :initialData="formData"
    :onFinish="handleSubmit"
    @field-change="handleFieldChange"
  >
    <template #actions="{ validate, resetForm }">
      <v-row class="mt-4">
        <v-col cols="12" class="text-right">
          <v-btn class="mr-2" @click="resetForm">重置</v-btn>
          <v-btn color="success" @click="validate">提交</v-btn>
        </v-col>
      </v-row>
    </template>
  </jh-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      fields: [
        { type: 'group', title: '基本信息' },
        {
          key: 'username',
          label: '用户名',
          type: 'text',
          placeholder: '请输入用户名',
          required: true,
          tooltip: '用户名用于登录'
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'text',
          placeholder: '请输入邮箱',
          rules: 'email'
        },
        {
          key: 'role',
          label: '角色',
          type: 'select',
          options: [
            { text: '管理员', value: 'admin' },
            { text: '用户', value: 'user' }
          ]
        },
        
        { type: 'group', title: '其他信息', divider: true },
        {
          key: 'bio',
          label: '个人简介',
          type: 'textarea',
          rows: 4,
          cols: { md: 12 }
        }
      ]
    };
  },
  methods: {
    async handleSubmit(values) {
      console.log('提交:', values);
      await this.$api.submit(values);
      this.$message.success('提交成功');
    },
    handleFieldChange({ key, value }) {
      console.log('字段变化:', key, value);
    }
  }
};
</script>
```

### 搜索表单
```vue
<template>
  <jh-form
    :fields="searchFields"
    layout="inline"
    @submit="handleSearch"
  >
    <template #actions="{ validate, resetForm }">
      <v-btn color="primary" @click="validate">查询</v-btn>
      <v-btn text @click="resetForm">重置</v-btn>
    </template>
  </jh-form>
</template>

<script>
export default {
  data() {
    return {
      searchFields: [
        { key: 'keyword', label: '关键词', type: 'text' },
        { key: 'status', label: '状态', type: 'select', options: [...] },
        { key: 'dateRange', label: '日期', type: 'daterange' }
      ]
    };
  },
  methods: {
    handleSearch(values) {
      console.log('搜索:', values);
      // 调用搜索 API
    }
  }
};
</script>
```

## ⚠️ 注意事项

1. **字段联动必须用函数，不能用布尔值**
   ```javascript
   // ✅ 正确
   visible: (formData) => formData.type === 'A'
   
   // ❌ 错误
   visible: this.formData.type === 'A'
   ```

2. **`actions` 插槽必须使用，否则没有提交按钮**

3. **验证规则字符串：`'require'` 不是 `'required'`**

4. **select/radio/checkbox 的 options 格式**
   ```javascript
   // 正确格式
   options: [
     { text: '显示文本', value: '实际值' }
   ]
   ```

5. **只读模式用于详情展示**
   ```vue
   <jh-form :fields="fields" :initialData="userData" readonly />
   ```

## 🔗 相关组件

- **JhFormList**: 动态表单列表（数组字段）
- **JhModalForm**: 弹窗表单
- **JhDrawerForm**: 抽屉表单
- **JhStepsForm**: 分步表单
