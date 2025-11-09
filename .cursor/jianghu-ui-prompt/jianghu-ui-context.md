# JianghuJS UI 组件库 - AI 开发上下文

> **适用于**: Cursor, GitHub Copilot, Claude, ChatGPT 等 AI 编程助手  
> **版本**: 1.0  
> **更新**: 2025-11-09

## 📌 核心信息

### 技术栈
- **Vue**: 2.7.x (使用 Options API，不是 Composition API)
- **Vuetify**: 2.x (Material Design 组件框架)
- **设计规范**: Material Design + Ant Design Pro
- **图标**: Material Design Icons (@mdi/font)

### 组件命名规范
- 所有组件以 `Jh` 前缀开头 (JiangHu 缩写)
- 使用 PascalCase: `JhTable`, `JhForm`, `JhLayout`
- Props 使用 camelCase: `showFilter`, `headerTitle`
- 事件使用 kebab-case: `@row-click`, `@field-change`
- 插槽使用 kebab-case: `#toolbar-actions`, `#item-status`

## 🎯 组件分类速查

### 布局组件
- **JhLayout**: 页面布局 (side/top/mix 三种模式)
- **JhPageContainer**: 页面容器
- **JhCard**: 高级卡片 (支持标题、分栏、栅格、标签页)

### 数据展示
- **JhTable**: 高级表格 (ProTable 风格)
- **JhDescriptions**: 描述列表 (详情展示)
- **JhList**: 列表组件
- **JhEditableTable**: 可编辑表格
- **JhStatisticCard**: 统计卡片
- **JhCheckCard**: 多选卡片

### 表单组件
- **JhForm**: 通用表单 (支持多种布局和字段类型)
- **JhFormList**: 动态表单列表 (订单明细、联系人等)
- **JhFormFields**: 表单字段集 (字段依赖和联动)
- **JhQueryFilter**: 查询筛选器 (高级搜索)
- **JhStepsForm**: 分步表单
- **JhModalForm**: 弹窗表单
- **JhDrawerForm**: 抽屉表单

### 输入组件
- **JhFileInput**: 文件上传
- **JhDateRangePicker**: 日期范围选择
- **JhTreeSelect**: 树形选择
- **JhJsonEditor**: JSON 编辑器
- **JhMarkdownEditor**: Markdown 编辑器

### 反馈组件
- **JhModal**: 模态框
- **JhDrawer**: 抽屉
- **JhToast**: 消息提示
- **JhConfirmDialog**: 确认对话框
- **JhMask**: 遮罩层

### 其他组件
- **JhMenu**: 菜单
- **JhDraggable**: 拖拽
- **JhWaterMark**: 水印
- **JhScene**: 场景容器

## 🚀 必须遵守的规则

### Vue 2 语法要点
```vue
<!-- ✅ 正确 - Vue 2 Options API -->
<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      users: []
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<!-- ❌ 错误 - 不要使用 Vue 3 Composition API -->
<script setup>
import { ref } from 'vue'
const users = ref([])
</script>
```

### Vuetify 2 组件
```vue
<!-- ✅ 正确 - Vuetify 2 -->
<v-btn color="primary">按钮</v-btn>
<v-data-table :headers="headers" :items="items" />

<!-- ❌ 错误 - 不要使用 Vuetify 3 语法 -->
<v-btn variant="flat">按钮</v-btn>
```

### 必须包裹在 v-app 中
```vue
<template>
  <v-app>
    <!-- 所有内容必须在 v-app 内 -->
    <jh-layout>
      <jh-table />
    </jh-layout>
  </v-app>
</template>
```

## 📋 常用字段类型

### JhForm / JhFormList 字段类型
- `text`: 文本输入框
- `textarea`: 多行文本
- `number`: 数字输入
- `select`: 下拉选择
- `autocomplete`: 自动完成
- `date`: 日期选择器
- `time`: 时间选择器
- `switch`: 开关
- `checkbox`: 复选框
- `radio`: 单选按钮组
- `slot`: 自定义插槽
- `group`: 分组标题

### JhDescriptions ValueType
- `text`: 普通文本
- `digit`: 数字 (1,234,567)
- `money`: 金额 (¥ 12,345.67)
- `percent`: 百分比 (85%)
- `date`: 日期 (2024-01-15)
- `dateTime`: 日期时间 (2024-01-15 14:30:00)
- `time`: 时间 (14:30:00)
- `option`: 选项 (配合 valueEnum)
- `select`: 下拉选择

## 🎨 响应式布局

### Vuetify 断点
- `xs`: 0-600px (手机竖屏)
- `sm`: 600-960px (手机横屏/平板竖屏)
- `md`: 960-1264px (平板横屏/小屏电脑)
- `lg`: 1264-1904px (桌面)
- `xl`: 1904px+ (大屏)

### 列宽配置
```javascript
// 简单配置
{ cols: 6 }

// 响应式配置
{ 
  cols: { 
    xs: 12,  // 手机全宽
    sm: 6,   // 平板半宽
    md: 4,   // 桌面1/3宽
    lg: 3    // 大屏1/4宽
  } 
}
```

## 🎯 验证规则

### 内置规则 (字符串引用)
```javascript
{ key: 'email', rules: 'email' }
{ key: 'phone', rules: 'phone' }
{ key: 'field', rules: 'require|email' }
```

### 自定义规则 (数组)
```javascript
{
  key: 'age',
  rules: [
    v => !!v || '年龄必填',
    v => v >= 18 || '年龄必须大于18岁'
  ]
}
```

### 快捷方式
```javascript
{ key: 'username', required: true }
```

## 🔧 常用 Props 模式

### 服务端分页
```javascript
// request 函数签名
async request(params) {
  // params: { page, pageSize, search, sorter, filters }
  const response = await api.getData(params)
  return {
    data: response.list,    // 数据数组
    total: response.total,  // 总数
    success: true
  }
}
```

### 字段联动
```javascript
{
  key: 'companyName',
  label: '公司名称',
  type: 'text',
  visible: (formData) => formData.userType === 'company',
  disabled: (formData) => !formData.canEdit
}
```

## 🎨 主题颜色

使用 Vuetify 颜色名称:
- `primary`: #1976D2 (主要操作)
- `secondary`: #424242 (次要操作)
- `success`: #4CAF50 (成功状态)
- `error`: #FF5252 (错误/删除)
- `warning`: #FB8C00 (警告)
- `info`: #2196F3 (提示信息)

## ⚠️ 常见错误避免

### 1. 不要混用 Vue 2/3 语法
```javascript
// ❌ 错误
import { ref, reactive } from 'vue'

// ✅ 正确
export default {
  data() {
    return {}
  }
}
```

### 2. 不要使用 Vuetify 3 API
```vue
<!-- ❌ 错误 -->
<v-btn variant="flat" />

<!-- ✅ 正确 -->
<v-btn text />
```

### 3. 服务端分页使用 request 而非 items
```vue
<!-- ❌ 错误 - 客户端分页 -->
<jh-table :items="items" />

<!-- ✅ 正确 - 服务端分页 -->
<jh-table :request="fetchData" />
```

### 4. 字段联动使用函数而非布尔值
```javascript
// ❌ 错误
visible: formData.userType === 'company'

// ✅ 正确
visible: (formData) => formData.userType === 'company'
```

## 📝 代码生成建议

当 AI 生成代码时应该:

1. **优先使用组件库组件** - 不要从头编写表格或表单
2. **遵循命名规范** - 组件名、Props、事件命名符合规范
3. **完整的错误处理** - 包含 try-catch 和用户友好提示
4. **响应式设计** - 使用 Vuetify 栅格系统
5. **字段配置抽离** - 将配置放在 data 中，保持模板简洁
6. **有意义的命名** - ref、方法、变量使用清晰的名称
7. **添加注释** - 为复杂业务逻辑添加注释

## 🔗 参考文档

- 详细 API: 查看各组件目录下的 README.md
- 在线文档: https://jianghujs.github.io/jianghu-ui/
- 代码示例: 查看各组件的 .stories.js 文件
