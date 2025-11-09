# JhFormFields - 表单字段集组件

JhFormFields 是基于 Ant Design ProComponents FieldSet 设计的表单字段集组件,支持字段依赖、动态联动等高级特性。可以独立使用,也可以在 JhForm 中组合使用。

## ✨ 特性

- 🔗 **字段依赖** - 类似 ProFormDependency,支持字段间的依赖关系
- 🎯 **动态联动** - 字段的显示/隐藏、启用/禁用可根据其他字段值动态变化
- 📦 **字段分组** - 支持字段分组展示,提高表单可读性
- 🎨 **多种布局** - 支持 horizontal、vertical、inline 三种布局模式
- 📐 **响应式** - 支持响应式栅格布局
- 💡 **提示信息** - 支持 title、description、tooltip 等多种提示方式
- 🎭 **只读模式** - 支持只读展示
- 🔧 **灵活配置** - 支持边框样式、紧凑模式等多种配置
- 🧩 **组合使用** - 可在 JhForm 中组合多个 JhFormFields

## 📦 安装

```javascript
import JhFormFields from '@/components/JhFormFields/JhFormFields.vue';
```

## 🔨 基础用法

### 简单示例

```vue
<template>
  <JhFormFields
    v-model="formData"
    :fields="fields"
    title="基本信息"
    description="请填写您的基本信息"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
      },
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
    };
  },
};
</script>
```

## 📋 API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value (v-model) | 表单数据对象 | `Object` | `{}` |
| fields | 字段配置数组 | `Array<FieldConfig>` | `[]` |
| title | 标题 | `String` | `''` |
| description | 描述信息 | `String` | `''` |
| tooltip | 提示信息 | `String` | `''` |
| layout | 布局模式 | `'horizontal' \| 'vertical' \| 'inline'` | `'vertical'` |
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
| dense | 紧凑模式 | `Boolean` | `false` |
| bordered | 显示边框 | `Boolean` | `false` |
| dependencies | 依赖字段数组 | `Array<String>` | `[]` |

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
| visible | 是否可见 | `Boolean \| Function` | `true` |
| disabled | 是否禁用 | `Boolean \| Function` | `false` |
| readonly | 是否只读 | `Boolean \| Function` | `false` |
| tooltip | 提示信息 | `String` | - |
| extra | 额外提示信息 | `String` | - |
| dependencies | 依赖字段数组 | `Array<String>` | - |
| onDependencyChange | 依赖变化回调 | `Function` | - |
| options | 选项数据 | `Array \| Function` | - |
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
| input | 值变化(v-model) | `(values: Object)` |
| field-input | 字段输入 | `{ key, value, values }` |
| field-change | 字段改变 | `{ key, value, values }` |
| field-blur | 字段失焦 | `{ key, value, values }` |
| dependency-change | 依赖字段变化 | `{ key, value, oldValue, values }` |
| field-dependency-change | 字段依赖变化 | `{ field, dependency, value, oldValue, values }` |
| reset | 重置 | `(values: Object)` |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| getValues | 获取所有字段值 | - | `Object` |
| setFieldsValue | 设置多个字段值 | `(values: Object)` | - |
| setFieldValue | 设置单个字段值 | `(key: String, value: Any)` | - |
| resetFields | 重置所有字段 | - | - |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| title | 自定义标题 | - |
| footer | 底部内容 | `{ values }` |
| field-{key} | 自定义字段(type='slot') | `{ field, value, values, updateField }` |

## 🎯 核心特性详解

### 1. 字段依赖 (ProFormDependency)

字段依赖是 JhFormFields 的核心特性,类似于 Ant Design ProComponents 的 ProFormDependency。

#### 基础依赖

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
    label: '真实姓名',
    type: 'text',
    // 根据 userType 动态显示
    visible: (values) => values.userType === 'personal',
    dependencies: ['userType'],
  },
  {
    key: 'companyName',
    label: '公司名称',
    type: 'text',
    visible: (values) => values.userType === 'company',
    dependencies: ['userType'],
  },
]
```

#### 多字段依赖

```javascript
{
  key: 'discountAmount',
  label: '优惠金额',
  type: 'number',
  // 依赖多个字段
  visible: (values) => values.hasDiscount && values.discountType === 'fixed',
  dependencies: ['hasDiscount', 'discountType'],
}
```

#### 动态选项

```javascript
{
  key: 'province',
  label: '省份',
  type: 'select',
  // 根据国家动态生成省份选项
  options: (values) => {
    const provinceMap = {
      china: [
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
      ],
      usa: [
        { text: '加利福尼亚', value: 'california' },
        { text: '纽约', value: 'newyork' },
      ],
    };
    return provinceMap[values.country] || [];
  },
  dependencies: ['country'],
}
```

#### 动态禁用

```javascript
{
  key: 'username',
  label: '用户名',
  type: 'text',
  // 根据条件动态禁用
  disabled: (values) => !values.agreeTerms,
  dependencies: ['agreeTerms'],
}
```

### 2. 依赖变化回调

```javascript
{
  key: 'province',
  label: '省份',
  type: 'select',
  dependencies: ['country'],
  // 当依赖字段变化时触发
  onDependencyChange: (depKey, newVal, oldVal, values) => {
    console.log(`${depKey} 从 ${oldVal} 变为 ${newVal}`);
    // 可以在这里执行额外的逻辑
  },
}
```

### 3. 全局依赖监听

```vue
<JhFormFields
  v-model="formData"
  :fields="fields"
  :dependencies="['country', 'userType']"
  @dependency-change="handleDependencyChange"
/>
```

```javascript
methods: {
  handleDependencyChange({ key, value, oldValue, values }) {
    console.log(`依赖字段 ${key} 变化:`, value);
    // 执行全局依赖逻辑
  },
}
```

## 🎨 使用示例

### 1. 基础用法

```vue
<JhFormFields
  v-model="formData"
  :fields="fields"
  title="基本信息"
  description="请填写您的基本信息"
/>
```

### 2. 水平布局

```vue
<JhFormFields
  v-model="formData"
  :fields="fields"
  layout="horizontal"
  :labelWidth="100"
  labelAlign="right"
  :defaultColsMd="12"
/>
```

### 3. 行内布局(搜索表单)

```vue
<JhFormFields
  v-model="formData"
  :fields="searchFields"
  layout="inline"
>
  <template #footer>
    <v-btn color="primary">搜索</v-btn>
    <v-btn text>重置</v-btn>
  </template>
</JhFormFields>
```

### 4. 字段分组

```javascript
fields: [
  { type: 'group', title: '基本信息' },
  { key: 'username', label: '用户名', type: 'text' },
  { key: 'email', label: '邮箱', type: 'text' },
  
  { type: 'group', title: '联系方式', divider: true, description: '请填写您的联系方式' },
  { key: 'phone', label: '手机号', type: 'text' },
  { key: 'address', label: '地址', type: 'textarea', cols: { md: 12 } },
]
```

### 5. 带边框样式

```vue
<JhFormFields
  v-model="formData"
  :fields="fields"
  title="基本信息"
  bordered
/>
```

### 6. 只读模式

```vue
<JhFormFields
  v-model="formData"
  :fields="fields"
  title="用户详情"
  readonly
/>
```

### 7. 自定义字段插槽

```vue
<JhFormFields v-model="formData" :fields="fields">
  <template #field-rating="{ value, updateField }">
    <v-rating
      :value="value"
      @input="updateField('rating', $event)"
      color="warning"
    />
  </template>
  
  <template #field-color="{ value, updateField }">
    <v-color-picker
      :value="value"
      @input="updateField('color', $event)"
    />
  </template>
</JhFormFields>
```

```javascript
fields: [
  {
    key: 'rating',
    label: '评分',
    type: 'slot',
    defaultValue: 3,
  },
  {
    key: 'color',
    label: '颜色',
    type: 'slot',
    defaultValue: '#1976D2',
  },
]
```

### 8. 响应式布局

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

## 🔧 在 JhForm 中使用

JhFormFields 可以在 JhForm 中组合使用,实现更灵活的表单布局:

```vue
<template>
  <v-form>
    <!-- 基本信息字段集 -->
    <JhFormFields
      v-model="formData"
      :fields="basicFields"
      title="基本信息"
      bordered
    />
    
    <!-- 用户类型字段集 -->
    <JhFormFields
      v-model="formData"
      :fields="typeFields"
      title="用户类型"
      bordered
      class="mt-4"
    />
    
    <!-- 联系方式字段集 -->
    <JhFormFields
      v-model="formData"
      :fields="contactFields"
      title="联系方式"
      bordered
      class="mt-4"
    />
    
    <!-- 提交按钮 -->
    <v-row class="mt-4">
      <v-col cols="12" class="text-right">
        <v-btn class="mr-2" @click="resetForm">重置</v-btn>
        <v-btn color="primary" @click="submitForm">提交</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      basicFields: [
        { key: 'username', label: '用户名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
      ],
      typeFields: [
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
          label: '真实姓名',
          type: 'text',
          visible: (values) => values.userType === 'personal',
          dependencies: ['userType'],
        },
      ],
      contactFields: [
        { key: 'phone', label: '手机号', type: 'text', rules: 'phone' },
        { key: 'address', label: '地址', type: 'textarea', cols: { md: 12 } },
      ],
    };
  },
  methods: {
    submitForm() {
      console.log('提交数据:', this.formData);
    },
    resetForm() {
      this.formData = {};
    },
  },
};
</script>
```

## 💡 高级用法

### 复杂联动示例

```javascript
fields: [
  {
    key: 'productType',
    label: '商品类型',
    type: 'radio',
    options: [
      { text: '实物商品', value: 'physical' },
      { text: '虚拟商品', value: 'virtual' },
      { text: '服务商品', value: 'service' },
    ],
  },
  {
    key: 'weight',
    label: '重量(kg)',
    type: 'number',
    visible: (values) => values.productType === 'physical',
    dependencies: ['productType'],
  },
  {
    key: 'downloadUrl',
    label: '下载链接',
    type: 'text',
    visible: (values) => values.productType === 'virtual',
    dependencies: ['productType'],
  },
  {
    key: 'serviceTime',
    label: '服务时长(小时)',
    type: 'number',
    visible: (values) => values.productType === 'service',
    dependencies: ['productType'],
  },
  { type: 'group', title: '优惠设置', divider: true },
  {
    key: 'hasDiscount',
    label: '启用优惠',
    type: 'checkbox',
    checkboxLabel: '启用优惠价格',
  },
  {
    key: 'discountType',
    label: '优惠类型',
    type: 'radio',
    options: [
      { text: '固定金额', value: 'fixed' },
      { text: '百分比', value: 'percent' },
    ],
    visible: (values) => values.hasDiscount,
    dependencies: ['hasDiscount'],
  },
  {
    key: 'discountAmount',
    label: '优惠金额',
    type: 'number',
    visible: (values) => values.hasDiscount && values.discountType === 'fixed',
    dependencies: ['hasDiscount', 'discountType'],
  },
  {
    key: 'discountPercent',
    label: '优惠百分比',
    type: 'number',
    suffix: '%',
    visible: (values) => values.hasDiscount && values.discountType === 'percent',
    dependencies: ['hasDiscount', 'discountType'],
  },
]
```

## 🎯 最佳实践

1. **合理使用字段依赖** - 使用 `dependencies` 数组明确声明字段间的依赖关系
2. **避免循环依赖** - 确保字段依赖关系不形成循环
3. **使用字段分组** - 将相关字段分组,提高表单可读性
4. **动态选项优化** - 使用函数动态生成选项时,注意性能优化
5. **边框样式** - 使用 `bordered` 属性区分不同的字段集
6. **组合使用** - 在复杂表单中,使用多个 JhFormFields 组合
7. **响应式设计** - 使用 `cols` 配置实现响应式布局
8. **只读模式** - 详情页面使用只读模式展示数据

## 🔗 与 ProComponents 的对应关系

| ProComponents | JhFormFields | 说明 |
|---------------|--------------|------|
| ProFormFieldSet | JhFormFields | 字段集组件 |
| ProFormDependency | dependencies + visible/disabled | 字段依赖 |
| fieldProps | props | 字段属性 |
| dependencies | dependencies | 依赖字段数组 |
| transform | - | 暂不支持 |

## 📚 相关组件

- [JhForm](../JhForm) - 高级表单组件
- [JhFormList](../JhFormList) - 动态表单列表
- [JhTable](../JhTable) - 高级表格

## 📄 License

MIT
