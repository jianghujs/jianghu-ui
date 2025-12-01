# JhForm - 高级表单组件

JhForm 是一个功能强大的表单组件,参考 Ant Design ProComponents Form 设计,在 Vuetify 的基础上增加了更多语法糖和布局设置,帮助快速开发表单。

## ✨ 特性

- 🎯 **多种字段类型** - 支持 text、textarea、number、select、autocomplete、date、time、switch、checkbox、radio 等
- 📐 **灵活布局** - 支持 horizontal、vertical、inline、grid 四种布局模式
- 🔄 **字段联动** - 支持字段的显示/隐藏、启用/禁用联动
- 📦 **字段分组** - 支持表单字段分组展示
- ✅ **表单验证** - 内置常用验证规则,支持自定义验证
- 🎨 **样式定制** - 支持 filled、outlined、dense 等多种样式
- 📱 **响应式** - 支持响应式栅格布局
- 🔧 **数据转换** - 支持提交时数据转换(transform)
- 💡 **提示信息** - 支持 tooltip 和 extra 额外提示
- 🎭 **只读模式** - 支持表单只读展示

## 📦 安装

```javascript
import JhForm from '@/components/JhForm/JhForm.vue';
```

## 🔨 基础用法

### 简单示例

```vue
<template>
  <JhForm
    :fields="fields"
    :initialData="formData"
    @submit="handleSubmit"
  >
    <template #actions="{ validate, resetForm }">
      <v-btn @click="resetForm">重置</v-btn>
      <v-btn color="primary" @click="validate">提交</v-btn>
    </template>
  </JhForm>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'username',
          label: '用户名',
          type: 'text',
          placeholder: '请输入用户名',
          required: true,
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'text',
          placeholder: '请输入邮箱',
          rules: 'email',
        },
      ],
      formData: {
        username: '',
        email: '',
      },
    };
  },
  methods: {
    handleSubmit(data) {
      console.log('提交数据:', data);
    },
  },
};
</script>
```

## 📋 API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| fields | 表单字段配置数组 | `Array<FieldConfig>` | `[]` |
| initialData | 初始表单数据 | `Object` | `{}` |
| layout | 表单布局模式 | `'horizontal' \| 'vertical' \| 'inline' \| 'grid'` | `'vertical'` |
| showLabels | 是否显示标签 | `Boolean` | `true` |
| labelWidth | 标签宽度(horizontal 布局) | `Number \| String` | `'auto'` |
| labelAlign | 标签对齐方式 | `'left' \| 'right' \| 'center'` | `'right'` |
| showRequiredMark | 是否显示必填标记 | `Boolean` | `true` |
| readonly | 只读模式 | `Boolean` | `false` |
| disabled | 禁用模式 | `Boolean` | `false` |
| defaultDense | 默认紧凑模式 | `Boolean` | `true` |
| defaultFilled | 默认填充样式 | `Boolean` | `true` |
| defaultOutlined | 默认轮廓样式 | `Boolean` | `false` |
| defaultColsMd | 默认列宽(md 断点) | `Number` | `6` |
| hideDetails | 隐藏详情信息 | `Boolean \| String` | `false` |
| onFinish | 提交成功回调 | `Function` | - |
| onFinishFailed | 提交失败回调 | `Function` | - |
| omitNil | 忽略 null/undefined 值 | `Boolean` | `true` |
| grid | Grid 模式 | `Boolean` | `false` |
| colProps | Grid 列配置 | `Object` | `{}` |
| rowProps | Grid 行配置（透传 `v-row`） | `Object` | `{}` |

### FieldConfig 字段配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | 字段唯一标识 | `String` | - |
| label | 字段标签 | `String` | - |
| type | 字段类型 | `String` | `'text'` |
| placeholder | 占位符 | `String` | - |
| required | 是否必填 | `Boolean` | `false` |
| rules | 验证规则 | `Array \| String` | - |
| defaultValue | 默认值 | `Any` | - |
| cols | 响应式列宽配置 | `Number \| Object` | - |
| colSpan | Grid 模式 24 栏列宽 | `Number` | - |
| colProps | 字段级列配置（优先级高于全局） | `Object` | - |
| visible | 是否可见 | `Boolean \| Function` | `true` |
| disabled | 是否禁用 | `Boolean \| Function` | `false` |
| readonly | 是否只读 | `Boolean \| Function` | `false` |
| tooltip | 提示信息 | `String` | - |
| extra | 额外提示信息 | `String` | - |
| transform | 提交时数据转换函数 | `Function` | - |
| dependencies | 依赖字段数组 | `Array<String>` | - |
| layout | 字段布局(覆盖全局) | `String` | - |
| labelWidth | 标签宽度(覆盖全局) | `Number \| String` | - |
| labelAlign | 标签对齐(覆盖全局) | `String` | - |

### 字段类型 (type)

- **text** - 文本输入框
- **textarea** - 文本域
- **number** - 数字输入框
- **select** - 下拉选择框
- **autocomplete** - 自动完成
- **date** - 日期选择器
- **time** - 时间选择器
- **switch** - 开关
- **checkbox** - 复选框
- **radio** - 单选按钮组
- **slot** - 自定义插槽
- **group** - 分组标题

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 表单提交 | `(data: Object)` |
| reset | 表单重置 | `(data: Object)` |
| validate | 表单验证 | `(isValid: Boolean, data: Object)` |
| input | 字段输入 | `(key: String, value: Any, formData: Object)` |
| change | 字段改变 | `(key: String, value: Any, formData: Object)` |
| blur | 字段失焦 | `(key: String, value: Any, formData: Object)` |
| field-change | 字段变化(统一事件) | `{ key, value, formData }` |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| getFormData | 获取表单数据 | - | `Object` |
| setFieldsValue | 设置多个字段值 | `(values: Object)` | - |
| setFieldValue | 设置单个字段值 | `(key: String, value: Any)` | - |
| validate | 验证表单 | - | `Promise<Boolean>` |
| resetForm | 重置表单 | - | - |
| resetValidation | 重置验证 | - | - |
| submit | 提交表单 | - | `Promise<Boolean>` |
| getTransformedData | 获取转换后的数据 | - | `Object` |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| actions | 表单操作区域 | `{ formData, validate, resetForm }` |
| field-{key} | 自定义字段(type='slot') | `{ field, formData, updateField }` |

## 🎯 使用示例

### 1. 水平布局

```vue
<JhForm
  :fields="fields"
  layout="horizontal"
  labelWidth="120"
  labelAlign="right"
/>
```

### 2. 行内布局(搜索表单)

```vue
<JhForm
  :fields="searchFields"
  layout="inline"
>
  <template #actions="{ validate, resetForm }">
    <v-btn color="primary" @click="validate">查询</v-btn>
    <v-btn text @click="resetForm">重置</v-btn>
  </template>
</JhForm>
```

### Grid 栅格布局
```vue
<JhForm
  layout="grid"
  :grid="true"
  :col-props="{ span: 8, lg: 6 }"
  :row-props="{ dense: true }"
  :fields="[
    { type: 'group', title: '项目信息' },
    { key: 'projectCode', label: '编号', type: 'text', colSpan: 6 },
    { key: 'projectName', label: '名称', type: 'text', colSpan: 12 },
    { key: 'owner', label: '负责人', type: 'text' },
    { key: 'status', label: '状态', type: 'select', colProps: { md: 3 }, options: statusOptions }
  ]"
>
  <template #actions="{ validate, resetForm }">
    <v-btn text @click="resetForm">重置</v-btn>
    <v-btn color="primary" @click="validate">提交</v-btn>
  </template>
</JhForm>
```
- `colSpan` 采用 24 栏语义（8=三等分、12=半行），JhForm 会自动映射到 Vuetify 12 栅格。
- `colProps` 与 `rowProps` 可继续覆盖断点与 `v-row` 属性，actions 会在 Grid 模式下占满最后一行保持对齐。

### 3. 字段分组

```javascript
fields: [
  { type: 'group', title: '基本信息', divider: false },
  { key: 'username', label: '用户名', type: 'text' },
  { key: 'email', label: '邮箱', type: 'text' },
  
  { type: 'group', title: '账户设置', divider: true, description: '设置账户相关信息' },
  { key: 'role', label: '角色', type: 'select', options: [...] },
]
```

### 4. 字段联动

```javascript
fields: [
  {
    key: 'userType',
    label: '用户类型',
    type: 'radio',
    options: [
      { text: '个人用户', value: 'personal' },
      { text: '企业用户', value: 'company' },
    ],
  },
  {
    key: 'personalName',
    label: '姓名',
    type: 'text',
    // 根据 userType 动态显示
    visible: (formData) => formData.userType === 'personal',
  },
  {
    key: 'companyName',
    label: '公司名称',
    type: 'text',
    visible: (formData) => formData.userType === 'company',
  },
  {
    key: 'remarks',
    label: '备注',
    type: 'textarea',
    // 根据条件动态禁用
    disabled: (formData) => !formData.agreeTerms,
  },
]
```

### 5. 数据转换

```javascript
fields: [
  {
    key: 'price',
    label: '价格',
    type: 'number',
    // 提交时转换为分
    transform: (value) => value * 100,
  },
  {
    key: 'tags',
    label: '标签',
    type: 'select',
    multiple: true,
    // 提交时转换为逗号分隔的字符串
    transform: (value) => Array.isArray(value) ? value.join(',') : value,
  },
]
```

### 6. 提示信息

```javascript
fields: [
  {
    key: 'password',
    label: '密码',
    type: 'text',
    tooltip: '密码长度至少8位,包含字母和数字',
    extra: '建议使用强密码以保护账户安全',
    props: { type: 'password' },
  },
]
```

### 7. 响应式布局

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
      lg: 3,   // 大屏1/4宽
    },
  },
]
```

### 8. 自定义字段

```vue
<JhForm :fields="fields">
  <template #field-customField="{ field, formData, updateField }">
    <v-slider
      :value="formData[field.key]"
      @input="updateField(field.key, $event)"
      min="0"
      max="100"
    />
  </template>
</JhForm>
```

```javascript
fields: [
  {
    key: 'customField',
    label: '自定义字段',
    type: 'slot',
  },
]
```

### 9. 提交处理

```vue
<JhForm
  :fields="fields"
  :onFinish="handleFinish"
  :onFinishFailed="handleFinishFailed"
  :omitNil="true"
/>
```

```javascript
methods: {
  async handleFinish(values) {
    console.log('提交成功:', values);
    // 调用 API
    await this.$api.submit(values);
  },
  handleFinishFailed(values) {
    console.log('验证失败:', values);
  },
}
```

### 10. 只读模式

```vue
<JhForm
  :fields="fields"
  :initialData="userData"
  readonly
/>
```

## 🎨 样式定制

### 全局样式

```vue
<JhForm
  :fields="fields"
  defaultDense
  defaultFilled
  inputClass="custom-input"
  labelClass="custom-label"
/>
```

### 字段级样式

```javascript
fields: [
  {
    key: 'field1',
    label: '字段1',
    type: 'text',
    dense: false,      // 覆盖全局 dense
    filled: false,     // 覆盖全局 filled
    outlined: true,    // 使用轮廓样式
    colClass: 'px-2',  // 自定义列样式
  },
]
```

## 📝 验证规则

### 内置规则

- `require` - 必填
- `email` - 邮箱格式
- `phone` - 手机号格式
- `number` - 数字
- `integer` - 整数

### 使用方式

```javascript
// 方式1: 字符串(使用内置规则)
{ key: 'email', rules: 'email' }

// 方式2: 多个内置规则
{ key: 'field', rules: 'require|email' }

// 方式3: 数组(自定义规则)
{
  key: 'age',
  rules: [
    v => !!v || '年龄必填',
    v => v >= 18 || '年龄必须大于18岁',
  ],
}

// 方式4: required 快捷方式
{ key: 'username', required: true }
```

### 自定义验证规则集

```vue
<JhForm
  :fields="fields"
  :validationRules="customRules"
/>
```

```javascript
data() {
  return {
    customRules: {
      require: [v => !!v || '必填'],
      email: [v => !v || /.+@.+\..+/.test(v) || '邮箱格式不正确'],
      idCard: [v => !v || /^\d{18}$/.test(v) || '身份证号格式不正确'],
    },
  };
}
```

## 🔧 高级特性

### 混合布局

可以为单个字段指定不同的布局:

```javascript
fields: [
  {
    key: 'title',
    label: '标题',
    type: 'text',
    cols: { md: 12 },
  },
  {
    key: 'category',
    label: '分类',
    type: 'select',
    layout: 'horizontal',  // 单独使用水平布局
    labelWidth: 100,
    cols: { md: 6 },
  },
]
```

### 字段依赖

```javascript
fields: [
  {
    key: 'country',
    label: '国家',
    type: 'select',
    options: [...],
  },
  {
    key: 'province',
    label: '省份',
    type: 'select',
    dependencies: ['country'],  // 声明依赖
    // options 可以根据 country 动态变化
  },
]
```

## 📚 完整示例

```vue
<template>
  <v-container>
    <JhForm
      ref="jhForm"
      :fields="fields"
      :initialData="formData"
      layout="vertical"
      :defaultColsMd="6"
      :onFinish="handleSubmit"
      :onFinishFailed="handleError"
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
    </JhForm>
  </v-container>
</template>

<script>
import JhForm from '@/components/JhForm/JhForm.vue';

export default {
  components: { JhForm },
  
  data() {
    return {
      formData: {
        userType: 'personal',
      },
      
      fields: [
        // 基本信息分组
        { type: 'group', title: '基本信息' },
        {
          key: 'username',
          label: '用户名',
          type: 'text',
          placeholder: '请输入用户名',
          required: true,
          tooltip: '用户名用于登录系统',
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'text',
          placeholder: '请输入邮箱',
          rules: 'email',
          extra: '用于接收系统通知',
        },
        {
          key: 'phone',
          label: '手机号',
          type: 'text',
          placeholder: '请输入手机号',
          rules: 'phone',
        },
        
        // 用户类型
        { type: 'group', title: '用户信息', divider: true },
        {
          key: 'userType',
          label: '用户类型',
          type: 'radio',
          options: [
            { text: '个人用户', value: 'personal' },
            { text: '企业用户', value: 'company' },
          ],
          defaultValue: 'personal',
          cols: { md: 12 },
        },
        
        // 个人用户字段
        {
          key: 'realName',
          label: '真实姓名',
          type: 'text',
          placeholder: '请输入真实姓名',
          required: true,
          visible: (formData) => formData.userType === 'personal',
        },
        
        // 企业用户字段
        {
          key: 'companyName',
          label: '公司名称',
          type: 'text',
          placeholder: '请输入公司名称',
          required: true,
          visible: (formData) => formData.userType === 'company',
        },
        
        // 其他信息
        { type: 'group', title: '其他信息', divider: true },
        {
          key: 'bio',
          label: '个人简介',
          type: 'textarea',
          placeholder: '请输入个人简介',
          rows: 4,
          cols: { md: 12 },
        },
      ],
    };
  },
  
  methods: {
    async handleSubmit(values) {
      console.log('提交数据:', values);
      // 调用 API
      try {
        await this.$api.submitForm(values);
        this.$message.success('提交成功');
      } catch (error) {
        this.$message.error('提交失败');
      }
    },
    
    handleError(values) {
      console.log('验证失败:', values);
      this.$message.warning('请检查表单');
    },
    
    handleFieldChange({ key, value, formData }) {
      console.log('字段变化:', key, value);
    },
  },
};
</script>
```

## 🎯 最佳实践

1. **使用字段分组** - 将相关字段分组,提高表单可读性
2. **合理使用布局** - 根据场景选择合适的布局模式
3. **添加提示信息** - 使用 tooltip 和 extra 提供必要的提示
4. **字段联动** - 使用 visible 和 disabled 函数实现动态表单
5. **数据转换** - 使用 transform 在提交时转换数据格式
6. **响应式设计** - 使用 cols 配置实现响应式布局
7. **验证规则** - 合理使用内置规则和自定义规则
8. **只读模式** - 详情页面使用只读模式展示数据

## 🔗 相关组件

- [JhFormList](../JhFormList) - 动态表单列表
- [JhTable](../JhTable) - 高级表格
- [JhDialog](../JhDialog) - 对话框

## 📄 License

MIT
