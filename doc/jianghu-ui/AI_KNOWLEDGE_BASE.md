# JianghuJS UI 组件库 - AI 知识库

> **文档版本**: v1.0  
> **最后更新**: 2025-11-05  
> **目标**: 为 AI 大模型（如 Cursor、GitHub Copilot 等）提供快速理解和使用本组件库的完整参考

---

## 📚 目录

1. [项目概览](#项目概览)
2. [快速开始](#快速开始)
3. [组件分类](#组件分类)
4. [核心组件详解](#核心组件详解)
5. [设计规范](#设计规范)
6. [最佳实践](#最佳实践)
7. [常见问题](#常见问题)

---

## 项目概览

### 基本信息

- **项目名称**: @jianghujs/jianghu-ui
- **版本**: 1.0.0
- **技术栈**: Vue 2.7 + Vuetify 2.x + Storybook 7.x
- **设计规范**: Material Design
- **在线文档**: https://jianghujs.github.io/jianghu-ui/
- **许可证**: MIT

### 核心特性

1. **开箱即用**: 通过 CDN 引入，无需复杂配置
2. **Material Design**: 基于 Vuetify 2，遵循 Material Design 规范
3. **响应式设计**: 完美适配各种屏幕尺寸
4. **高度可定制**: 丰富的 props 和插槽支持
5. **完善的文档**: Storybook 交互式文档
6. **性能优化**: CDN 加速，按需加载

### 适用场景

- 企业管理系统 (ERP/CRM/OA)
- 数据可视化平台
- 内容管理系统 (CMS)
- 后台管理界面
- 表单密集型应用

---

## 快速开始

### 安装方式

#### 方式一：CDN 引入（推荐）

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  
  <!-- Vuetify CSS -->
  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  <!-- Material Design Icons -->
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
  <!-- Roboto 字体 -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
</head>
<body>
  <div id="app">
    <v-app>
      <!-- 你的应用内容 -->
    </v-app>
  </div>

  <!-- Vue 2 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7/dist/vue.js"></script>
  <!-- Vuetify -->
  <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.js"></script>
  
  <script>
    new Vue({
      el: '#app',
      vuetify: new Vuetify(),
    });
  </script>
</body>
</html>
```

#### 方式二：NPM 安装

```bash
npm install @jianghujs/jianghu-ui
```

### 基础使用

```vue
<template>
  <v-app>
    <jh-table
      :headers="headers"
      :items="items"
      @row-click="handleRowClick"
    />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: '姓名', value: 'name' },
        { text: '年龄', value: 'age' },
      ],
      items: [
        { name: '张三', age: 25 },
        { name: '李四', age: 30 },
      ],
    };
  },
  methods: {
    handleRowClick(item) {
      console.log('点击行:', item);
    },
  },
};
</script>
```

---

## 组件分类

### 基础组件 (Basic Components)

| 组件名 | 说明 | 常用场景 |
|--------|------|----------|
| `JhMenu` | 导航菜单 | 侧边栏导航、顶部菜单 |
| `JhScene` | 场景容器 | 页面布局、内容容器 |
| `JhDateRangePicker` | 日期范围选择器 | 时间筛选、报表查询 |

### 数据展示组件 (Data Display)

| 组件名 | 说明 | 常用场景 |
|--------|------|----------|
| `JhTable` | 数据表格 | 列表展示、数据管理 |
| `JhEditableTable` | 可编辑表格 | 批量数据录入 |
| `JhTableAttachment` | 附件表格 | 文件管理、上传下载 |

### 表单组件 (Form Components)

| 组件名 | 说明 | 常用场景 |
|--------|------|----------|
| `JhForm` | 通用表单 | 数据录入、信息编辑 |
| `JhModalForm` | 弹窗表单 | 快速新增/编辑 |
| `JhDrawerForm` | 抽屉表单 | 详情查看、侧边编辑 |
| `JhStepsForm` | 步骤表单 | 多步骤流程、向导 |
| `JhFormList` | 动态表单列表 | 重复性数据录入 |
| `JhQueryFilter` | 查询筛选器 | 高级搜索、条件筛选 |

### 布局组件 (Layout Components)

| 组件名 | 说明 | 常用场景 |
|--------|------|----------|
| `JhPageContainer` | 页面容器 | 标准页面布局 |

### 反馈组件 (Feedback Components)

| 组件名 | 说明 | 常用场景 |
|--------|------|----------|
| `JhMask` | 遮罩层 | 加载状态、模态弹窗 |
| `JhToast` | 消息提示 | 操作反馈、通知 |
| `JhConfirmDialog` | 确认对话框 | 删除确认、操作确认 |

### 高级组件 (Advanced Components)

| 组件名 | 说明 | 常用场景 |
|--------|------|----------|
| `JhFileInput` | 文件上传 | 图片上传、文件选择 |
| `JhJsonEditor` | JSON 编辑器 | API 调试、配置编辑 |
| `JhMarkdownEditor` | Markdown 编辑器 | 富文本编辑、文档编写 |
| `JhDraggable` | 拖拽组件 | 排序、布局调整 |

---

## 核心组件详解

### 1. JhTable - 数据表格

#### 组件描述
功能强大的数据表格组件，支持排序、搜索、分页、筛选、行选择等高级功能。适用于各种数据展示和管理场景。

#### 主要特性
- ✅ 支持客户端和服务端分页
- ✅ 高级筛选栏（可折叠）
- ✅ 工具栏（搜索、刷新、列设置、密度调整、全屏）
- ✅ 行选择（单选/多选）
- ✅ 自定义列渲染
- ✅ 操作列配置
- ✅ 响应式设计

#### Props API

```typescript
interface JhTableProps {
  // ========== 数据相关 ==========
  headers: Array<HeaderConfig>;           // 表头配置（必填）
  items?: Array<any>;                     // 表格数据（客户端分页）
  request?: (params) => Promise<any>;     // 数据请求函数（服务端分页）
  
  // ========== 筛选栏配置 ==========
  showFilter?: boolean;                   // 是否显示筛选栏，默认 false
  filterFields?: Array<FieldConfig>;      // 筛选字段配置
  filterInitialValues?: Object;           // 筛选初始值
  filterCollapsible?: boolean;            // 筛选栏是否可折叠，默认 true
  filterDefaultCollapsed?: boolean;       // 筛选栏默认是否折叠，默认 true
  filterDefaultVisibleCount?: number;     // 筛选栏默认显示字段数量，默认 3
  
  // ========== 工具栏配置 ==========
  toolbar?: Object | boolean;             // 工具栏配置
  showSearch?: boolean;                   // 显示搜索框，默认 true
  searchInput?: string;                   // 搜索输入值（v-model）
  
  // ========== 按钮配置 ==========
  showCreateButton?: boolean;             // 显示新增按钮，默认 true
  showUpdateAction?: boolean;             // 显示详情按钮，默认 true
  showDeleteAction?: boolean;             // 显示删除按钮，默认 true
  
  // ========== 操作列配置 ==========
  actionColumn?: Object | boolean;        // 操作列配置
  // {
  //   title: '操作',
  //   width: 180,
  //   buttons: [
  //     {
  //       text: '编辑',
  //       type: 'link',              // link | icon | button
  //       icon: 'mdi-pencil',
  //       color: 'primary',
  //       onClick: (row) => {},
  //       visible: (row) => true,
  //       confirm: '确认编辑？'
  //     }
  //   ]
  // }
  
  // ========== 分页配置 ==========
  pagination?: Object | boolean;          // 分页配置
  itemsPerPage?: number;                  // 每页条数，默认 20
  
  // ========== 选择配置 ==========
  showSelect?: boolean;                   // 显示复选框，默认 false
  singleSelect?: boolean;                 // 单选模式，默认 false
  
  // ========== 其他配置 ==========
  loading?: boolean;                      // 加载状态
  rowKey?: string;                        // 行唯一标识，默认 'id'
  size?: string;                          // 表格密度: default | medium | compact
  fixedHeader?: boolean;                  // 固定表头，默认 true
}

// 表头配置
interface HeaderConfig {
  text: string;                           // 列标题
  value: string;                          // 数据字段名
  width?: number | string;                // 列宽
  sortable?: boolean;                     // 是否可排序
  align?: string;                         // 对齐方式: start | center | end
  ellipsis?: boolean;                     // 文本过长显示省略号
  copyable?: boolean;                     // 显示复制按钮
  visible?: boolean;                      // 是否显示，默认 true
  slot?: boolean;                         // 是否使用自定义插槽
}

// 筛选字段配置
interface FieldConfig {
  key: string;                            // 字段标识
  label: string;                          // 字段标签
  type: string;                           // 字段类型: text | select | date | daterange
  options?: Array<{text, value}>;         // 下拉选项（select 类型）
  placeholder?: string;                   // 占位文本
  defaultValue?: any;                     // 默认值
  cols?: number | Object;                 // 列宽配置
}
```

#### Events

```typescript
interface JhTableEvents {
  'row-click': (item, event) => void;           // 行点击
  'create-click': () => void;                   // 新增按钮点击
  'update-click': (item) => void;               // 详情按钮点击
  'delete-click': (item) => void;               // 删除按钮点击
  'selection-change': (selection) => void;      // 选择变化
  'filter-search': (queryData) => void;         // 筛选查询
  'filter-reset': () => void;                   // 筛选重置
  'refresh': () => void;                        // 刷新
  'copy-success': (text) => void;               // 复制成功
  'request-error': (error) => void;             // 请求错误
}
```

#### 使用示例

##### 基础表格

```vue
<template>
  <jh-table
    :headers="headers"
    :items="items"
    @row-click="handleRowClick"
  />
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id', width: 80 },
        { text: '姓名', value: 'name', sortable: true },
        { text: '邮箱', value: 'email', ellipsis: true, copyable: true },
        { text: '状态', value: 'status' },
        { text: '操作', value: 'action', width: 120 },
      ],
      items: [
        { id: 1, name: '张三', email: 'zhang@example.com', status: '正常' },
        { id: 2, name: '李四', email: 'li@example.com', status: '禁用' },
      ],
    };
  },
};
</script>
```

##### 服务端分页 + 高级筛选

```vue
<template>
  <jh-table
    :headers="headers"
    :request="loadData"
    :show-filter="true"
    :filter-fields="filterFields"
    @create-click="handleCreate"
    @update-click="handleUpdate"
    @delete-click="handleDelete"
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
        { text: '创建时间', value: 'createdAt' },
        { text: '操作', value: 'action' },
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
        { key: 'dateRange', label: '创建时间', type: 'daterange' },
      ],
    };
  },
  methods: {
    async loadData({ page, pageSize, search, filters }) {
      const response = await this.$api.getUserList({
        page,
        pageSize,
        keyword: search,
        ...filters,
      });
      return {
        data: response.data.list,
        total: response.data.total,
      };
    },
    handleCreate() {
      // 新增逻辑
    },
    handleUpdate(row) {
      // 编辑逻辑
    },
    handleDelete(row) {
      // 删除逻辑
    },
  },
};
</script>
```

##### 自定义列渲染

```vue
<template>
  <jh-table :headers="headers" :items="items">
    <!-- 自定义状态列 -->
    <template v-slot:item.status="{ item }">
      <v-chip :color="getStatusColor(item.status)" small>
        {{ item.status }}
      </v-chip>
    </template>
    
    <!-- 自定义操作列 -->
    <template v-slot:item.action="{ item }">
      <v-btn small text color="primary" @click="handleEdit(item)">编辑</v-btn>
      <v-btn small text color="error" @click="handleDelete(item)">删除</v-btn>
    </template>
  </jh-table>
</template>
```

---

### 2. JhForm - 通用表单

#### 组件描述
强大的表单组件，支持多种输入类型、多种布局模式、完整的验证机制、只读模式等。适用于各种数据录入和编辑场景。

#### 主要特性
- ✅ 多种字段类型（text、number、select、date、time、switch、checkbox、radio）
- ✅ 多种布局模式（vertical、horizontal、inline、grid）
- ✅ 完整的验证机制
- ✅ 只读模式
- ✅ 字段联动（visible、disabled 支持函数）
- ✅ 自定义字段插槽
- ✅ 表单分组

#### Props API

```typescript
interface JhFormProps {
  // ========== 基础配置 ==========
  fields: Array<FormField>;               // 表单字段配置（必填）
  initialData?: Object;                   // 初始表单数据
  formRef?: string;                       // 表单引用名称，默认 'jhForm'
  
  // ========== 布局配置 ==========
  layout?: string;                        // 布局模式: vertical | horizontal | inline | grid，默认 vertical
  labelWidth?: number | string;           // 标签宽度（horizontal 布局），默认 'auto'
  labelAlign?: string;                    // 标签对齐: left | right | center，默认 'right'
  showLabels?: boolean;                   // 是否显示标签，默认 true
  showRequiredMark?: boolean;             // 是否显示必填标记，默认 true
  
  // ========== 状态配置 ==========
  readonly?: boolean;                     // 只读模式，默认 false
  disabled?: boolean;                     // 禁用模式，默认 false
  
  // ========== 样式配置 ==========
  defaultDense?: boolean;                 // 默认紧凑模式，默认 true
  defaultFilled?: boolean;                // 默认填充样式，默认 true
  defaultOutlined?: boolean;              // 默认边框样式，默认 false
  defaultSingleLine?: boolean;            // 默认单行模式，默认 true
  defaultColsMd?: number;                 // 默认列宽（md），默认 6
  hideDetails?: boolean | string;         // 隐藏详情信息，默认 false
  
  // ========== 验证配置 ==========
  lazyValidation?: boolean;               // 懒加载验证，默认 true
  validationRules?: Object;               // 验证规则集合
}

// 字段配置
interface FormField {
  key: string;                            // 字段标识（必填）
  label?: string;                         // 字段标签
  type?: string;                          // 字段类型: text | number | textarea | select | autocomplete | date | time | switch | checkbox | radio | slot | group
  
  // 验证相关
  required?: boolean;                     // 是否必填
  rules?: Array | string;                 // 验证规则
  
  // 显示控制
  visible?: boolean | Function;           // 是否显示（支持函数动态控制）
  disabled?: boolean | Function;          // 是否禁用（支持函数动态控制）
  readonly?: boolean | Function;          // 是否只读（支持函数动态控制）
  
  // 布局
  cols?: number | Object;                 // 列宽配置: 12 | { xs: 12, sm: 6, md: 4 }
  layout?: string;                        // 单独的布局模式
  
  // 选项（select/radio 类型）
  options?: Array<{text, value}>;         // 选项列表
  itemText?: string;                      // 选项文本字段，默认 'text'
  itemValue?: string;                     // 选项值字段，默认 'value'
  
  // 其他
  defaultValue?: any;                     // 默认值
  placeholder?: string;                   // 占位文本
  prefix?: string;                        // 前缀
  suffix?: string;                        // 后缀
  hideDetails?: boolean;                  // 隐藏详情
  props?: Object;                         // 传递给底层组件的其他 props
  
  // 分组类型特有
  title?: string;                         // 分组标题
  description?: string;                   // 分组描述
  divider?: boolean;                      // 是否显示分隔线
}
```

#### Methods

```typescript
interface JhFormMethods {
  validate(): Promise<boolean>;           // 验证表单
  resetForm(): void;                      // 重置表单
  resetValidation(): void;                // 重置验证状态
  submit(): Promise<boolean>;             // 提交表单（先验证）
  getFormData(): Object;                  // 获取表单数据
  setFieldsValue(values): void;           // 设置多个字段值
  setFieldValue(key, value): void;        // 设置单个字段值
}
```

#### Events

```typescript
interface JhFormEvents {
  'input': (key, value, formData) => void;        // 字段输入
  'change': (key, value, formData) => void;       // 字段变化
  'blur': (key, value, formData) => void;         // 字段失焦
  'field-change': (event) => void;                // 字段变化（统一事件）
  'validate': (isValid, formData) => void;        // 验证完成
  'submit': (formData) => void;                   // 表单提交
  'reset': (formData) => void;                    // 表单重置
}
```

#### 使用示例

##### 基础表单

```vue
<template>
  <jh-form
    :fields="formFields"
    :initial-data="formData"
    @submit="handleSubmit"
  >
    <template v-slot:actions="{ validate }">
      <v-btn color="primary" @click="validate">提交</v-btn>
    </template>
  </jh-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        age: null,
      },
      formFields: [
        { key: 'name', label: '姓名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
        { key: 'age', label: '年龄', type: 'number' },
      ],
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

##### 水平布局 + 字段联动

```vue
<template>
  <jh-form
    :fields="formFields"
    :initial-data="formData"
    layout="horizontal"
    :label-width="100"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        userType: 'personal',
        company: '',
      },
      formFields: [
        {
          key: 'userType',
          label: '用户类型',
          type: 'radio',
          required: true,
          options: [
            { text: '个人', value: 'personal' },
            { text: '企业', value: 'company' },
          ],
        },
        {
          key: 'company',
          label: '公司名称',
          type: 'text',
          required: true,
          // 动态显示：仅当用户类型为企业时显示
          visible: (formData) => formData.userType === 'company',
        },
      ],
    };
  },
};
</script>
```

##### 表单分组

```vue
<template>
  <jh-form :fields="formFields" />
</template>

<script>
export default {
  data() {
    return {
      formFields: [
        // 分组1
        {
          type: 'group',
          title: '基本信息',
          description: '请填写您的基本信息',
          divider: true,
        },
        { key: 'name', label: '姓名', type: 'text', required: true },
        { key: 'phone', label: '手机', type: 'text', rules: 'phone' },
        
        // 分组2
        {
          type: 'group',
          title: '地址信息',
          divider: true,
        },
        { key: 'province', label: '省份', type: 'select', options: [] },
        { key: 'city', label: '城市', type: 'select', options: [] },
        { key: 'address', label: '详细地址', type: 'textarea', rows: 3 },
      ],
    };
  },
};
</script>
```

---

### 3. JhFormList - 动态表单列表

#### 组件描述
用于动态增删改查表单项列表的高级表单组件，类似于 Ant Design Pro 的 ProFormList。适用于需要维护可变长度数据列表的场景。

#### 主要特性
- ✅ 动态增删改查列表项
- ✅ 多种渲染模式（card、table、inline）
- ✅ 拖拽排序（需引入 SortableJS）
- ✅ 复制功能
- ✅ 列表级和项级验证
- ✅ 嵌套表单支持

#### Props API

```typescript
interface JhFormListProps {
  // ========== 数据配置 ==========
  value: Array<any>;                      // 列表数据（v-model）
  fields: Array<FormField>;               // 字段配置
  
  // ========== 模式配置 ==========
  mode?: string;                          // 渲染模式: card | table | inline，默认 card
  
  // ========== 基础配置 ==========
  title?: string;                         // 列表标题
  description?: string;                   // 列表说明
  min?: number;                           // 最小项数，默认 0
  max?: number;                           // 最大项数，默认 Infinity
  
  // ========== 功能配置 ==========
  sortable?: boolean;                     // 是否可排序，默认 false
  copyable?: boolean;                     // 是否可复制，默认 true
  showIndex?: boolean;                    // 是否显示序号，默认 true
  showItemActions?: boolean;              // 是否显示项操作按钮，默认 true
  
  // ========== 新增配置 ==========
  defaultValue?: Object | Function;       // 新增项默认值
  addButtonText?: string;                 // 添加按钮文本，默认 '添加'
  addButtonProps?: Object;                // 添加按钮 props
  
  // ========== 删除配置 ==========
  deleteConfirm?: boolean;                // 删除确认，默认 false
  deleteConfirmText?: string;             // 删除确认文本
  
  // ========== 样式配置 ==========
  itemLayout?: string;                    // 列表项表单布局，默认 horizontal
  itemLabelWidth?: number | string;       // 列表项标签宽度，默认 'auto'
  dense?: boolean;                        // 紧凑模式，默认 true
  outlined?: boolean;                     // 边框样式，默认 true
  
  // ========== 状态配置 ==========
  disabled?: boolean;                     // 禁用，默认 false
  readonly?: boolean;                     // 只读，默认 false
  
  // ========== 验证配置 ==========
  rules?: Array;                          // 列表级验证规则
  
  // ========== 其他配置 ==========
  actionColumn?: Object;                  // 操作列配置（table 模式）
  cardProps?: Object;                     // 卡片 props（card 模式）
  itemClass?: string;                     // 列表项自定义样式类
  inlineDisplayKey?: string;              // Inline 模式显示字段
}
```

#### Methods

```typescript
interface JhFormListMethods {
  addItem(item?, index?): void;           // 添加项
  removeItem(index): void;                // 删除项
  copyItem(index): void;                  // 复制项
  moveItem(oldIndex, newIndex): void;     // 移动项
  getItems(): Array;                      // 获取列表数据
  setItems(items): void;                  // 设置列表数据
  getItemValue(index): Object;            // 获取指定项数据
  setItemValue(index, value): void;       // 设置指定项数据
  validate(): Promise<boolean>;           // 验证整个列表
  validateItem(index): Promise<boolean>;  // 验证指定项
  resetValidation(): void;                // 重置验证状态
  reset(): void;                          // 重置列表
}
```

#### Events

```typescript
interface JhFormListEvents {
  'input': (value) => void;                       // v-model 更新
  'change': (value) => void;                      // 列表变化
  'add': (item, index) => void;                   // 添加项
  'remove': (item, index) => void;                // 删除项
  'copy': (sourceItem, newItem) => void;          // 复制项
  'sort': (oldIndex, newIndex) => void;           // 排序
  'item-change': (index, item) => void;           // 单项变化
  'validate': (isValid, errors) => void;          // 验证完成
  'min-limit': (min) => void;                     // 达到最小限制
  'max-limit': (max) => void;                     // 达到最大限制
}
```

#### 使用示例

##### Card 模式（默认）

```vue
<template>
  <jh-form-list
    v-model="contacts"
    :fields="contactFields"
    title="联系人列表"
    description="请填写至少一位联系人信息"
    :min="1"
    :max="5"
  />
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        { name: '张三', phone: '13800138000', email: 'zhang@example.com' }
      ],
      contactFields: [
        { key: 'name', label: '姓名', type: 'text', required: true, cols: 4 },
        { key: 'phone', label: '电话', type: 'text', rules: 'phone', cols: 4 },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email', cols: 4 },
      ],
    };
  },
};
</script>
```

##### Table 模式 + 拖拽排序

```vue
<template>
  <jh-form-list
    v-model="items"
    :fields="fields"
    mode="table"
    :sortable="true"
    :show-index="true"
  />
</template>

<script>
export default {
  data() {
    return {
      items: [],
      fields: [
        { key: 'name', label: '名称', type: 'text', required: true },
        { key: 'price', label: '价格', type: 'number', required: true },
        { key: 'quantity', label: '数量', type: 'number', required: true },
      ],
    };
  },
};
</script>
```

##### Inline 模式

```vue
<template>
  <jh-form-list
    v-model="tags"
    :fields="[{ key: 'name', label: '标签名称', type: 'text' }]"
    mode="inline"
    inline-display-key="name"
    add-button-text="添加标签"
  />
</template>
```

---

### 4. JhModalForm - 弹窗表单

#### 组件描述
基于 `v-dialog` 和 `JhForm` 封装的弹窗表单组件，适用于快速新增/编辑场景。

#### Props API

```typescript
interface JhModalFormProps {
  value: boolean;                         // v-model 控制显示/隐藏
  title?: string;                         // 标题，默认 '表单'
  fields: Array<FormField>;               // 表单字段配置
  initialData?: Object;                   // 初始表单数据
  width?: number | string;                // 弹窗宽度，默认 600
  persistent?: boolean;                   // 是否持久化，默认 false
  fullscreen?: boolean;                   // 是否全屏，默认 false
  closable?: boolean;                     // 是否显示关闭按钮，默认 true
  showConfirmButton?: boolean;            // 是否显示确认按钮，默认 true
  confirmText?: string;                   // 确认按钮文本，默认 '确定'
  cancelText?: string;                    // 取消按钮文本，默认 '取消'
  loading?: boolean;                      // 加载状态
  // ... 其他 JhForm props
}
```

#### Events

```typescript
interface JhModalFormEvents {
  'input': (visible) => void;             // v-model 更新
  'confirm': (formData) => void;          // 确认
  'cancel': () => void;                   // 取消
  'close': () => void;                    // 关闭
  'field-change': (event) => void;        // 字段变化
}
```

#### 使用示例

```vue
<template>
  <div>
    <v-btn @click="showModal = true">打开表单</v-btn>
    
    <jh-modal-form
      v-model="showModal"
      title="新增用户"
      :fields="formFields"
      :initial-data="formData"
      @confirm="handleConfirm"
      @cancel="showModal = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      formData: {},
      formFields: [
        { key: 'name', label: '姓名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
        { key: 'role', label: '角色', type: 'select', options: [] },
      ],
    };
  },
  methods: {
    async handleConfirm(data) {
      await this.$api.createUser(data);
      this.showModal = false;
      this.$message.success('创建成功');
    },
  },
};
</script>
```

---

### 5. JhQueryFilter - 查询筛选器

#### 组件描述
高级查询筛选组件，支持多种字段类型、可折叠、响应式布局。通常与 `JhTable` 配合使用。

#### Props API

```typescript
interface JhQueryFilterProps {
  fields: Array<FieldConfig>;             // 筛选字段配置
  initialValues?: Object;                 // 初始值
  collapsible?: boolean;                  // 是否可折叠，默认 true
  defaultCollapsed?: boolean;             // 默认是否折叠，默认 true
  defaultVisibleCount?: number;           // 默认显示字段数量，默认 3
  colSpan?: Object;                       // 列宽配置
  dense?: boolean;                        // 紧凑模式，默认 true
  outlined?: boolean;                     // 边框样式，默认 true
  showLabels?: boolean;                   // 显示标签，默认 true
  searchText?: string;                    // 查询按钮文本，默认 '查询'
  resetText?: string;                     // 重置按钮文本，默认 '重置'
}
```

#### Events

```typescript
interface JhQueryFilterEvents {
  'search': (queryData) => void;          // 查询
  'reset': () => void;                    // 重置
  'field-change': (key, value) => void;   // 字段变化
}
```

#### 使用示例

```vue
<template>
  <jh-query-filter
    :fields="filterFields"
    :initial-values="filterValues"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script>
export default {
  data() {
    return {
      filterValues: {},
      filterFields: [
        { key: 'keyword', label: '关键词', type: 'text', placeholder: '请输入关键词' },
        { 
          key: 'status', 
          label: '状态', 
          type: 'select',
          options: [
            { text: '全部', value: '' },
            { text: '启用', value: 'enabled' },
            { text: '禁用', value: 'disabled' },
          ]
        },
        { key: 'dateRange', label: '创建时间', type: 'daterange' },
      ],
    };
  },
  methods: {
    handleSearch(queryData) {
      console.log('查询参数:', queryData);
      // 执行查询逻辑
    },
    handleReset() {
      this.filterValues = {};
    },
  },
};
</script>
```

---

### 6. 其他常用组件

#### JhConfirmDialog - 确认对话框

```vue
<template>
  <jh-confirm-dialog
    v-model="showConfirm"
    title="确认删除"
    content="确定要删除这条记录吗？此操作不可恢复。"
    @confirm="handleDelete"
  />
</template>
```

#### JhToast - 消息提示

```javascript
// 方法调用
this.$toast.success('操作成功');
this.$toast.error('操作失败');
this.$toast.warning('警告信息');
this.$toast.info('提示信息');
```

#### JhFileInput - 文件上传

```vue
<template>
  <jh-file-input
    v-model="files"
    :accept="'image/*'"
    :multiple="true"
    :max-size="5242880"
    @change="handleFileChange"
  />
</template>
```

---

## 设计规范

### 命名规范

#### 组件命名
- 所有组件以 `Jh` 开头（JiangHu 缩写）
- 使用 PascalCase 命名法
- 名称应清晰表达组件功能

#### Props 命名
- 使用 camelCase 命名法
- 布尔类型使用 `is`、`has`、`show` 等前缀或直接描述状态
- 避免缩写，使用完整单词

#### 事件命名
- 使用 kebab-case 命名法
- 不使用 `on-` 前缀
- 常见事件：`click`、`change`、`input`、`submit`、`reset`

#### 插槽命名
- 使用 kebab-case 命名法
- 常见插槽：`header`、`footer`、`default`、`actions`

### 颜色系统

| 颜色名称 | 色值 | 用途 |
|---------|------|------|
| Primary | #1976D2 | 主要操作、重要信息 |
| Secondary | #424242 | 次要操作 |
| Success | #4CAF50 | 成功状态 |
| Error | #FF5252 | 错误状态 |
| Warning | #FB8C00 | 警告状态 |
| Info | #2196F3 | 提示信息 |

### 间距系统

采用 8px 基准的间距系统：

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

### 响应式断点

```javascript
{
  xs: 0,      // 手机竖屏
  sm: 600,    // 手机横屏 / 平板竖屏
  md: 960,    // 平板横屏 / 小屏电脑
  lg: 1264,   // 桌面
  xl: 1904,   // 大屏
}
```

---

## 最佳实践

### 1. 表单设计

#### 字段配置复用

```javascript
// 定义可复用的字段配置
const commonFields = {
  name: { key: 'name', label: '姓名', type: 'text', required: true },
  email: { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
  phone: { key: 'phone', label: '手机', type: 'text', rules: 'phone' },
};

// 在不同表单中复用
const userFormFields = [
  commonFields.name,
  commonFields.email,
  { key: 'role', label: '角色', type: 'select', options: [] },
];
```

#### 表单验证

```javascript
// 自定义验证规则
const customRules = {
  password: [
    v => !!v || '密码不能为空',
    v => (v && v.length >= 6) || '密码至少6位',
    v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v) || '密码需包含大小写字母和数字',
  ],
};

// 在字段中使用
{ key: 'password', label: '密码', type: 'text', rules: customRules.password }
```

### 2. 表格设计

#### 服务端分页最佳实践

```javascript
// 统一的数据请求格式
async loadTableData({ page, pageSize, search, filters, sorter }) {
  try {
    const response = await this.$api.getList({
      page,
      pageSize,
      keyword: search,
      ...filters,
      orderBy: sorter.field,
      orderDirection: sorter.order,
    });
    
    return {
      data: response.data.list,
      total: response.data.total,
      success: true,
    };
  } catch (error) {
    console.error('数据加载失败:', error);
    return { data: [], total: 0, success: false };
  }
}
```

#### 自定义操作列

```vue
<template>
  <jh-table
    :headers="headers"
    :items="items"
    :action-column="actionColumn"
  />
</template>

<script>
export default {
  data() {
    return {
      actionColumn: {
        title: '操作',
        width: 200,
        buttons: [
          {
            text: '编辑',
            type: 'link',
            color: 'primary',
            icon: 'mdi-pencil',
            onClick: this.handleEdit,
            visible: (row) => row.editable,
          },
          {
            text: '删除',
            type: 'link',
            color: 'error',
            icon: 'mdi-delete',
            onClick: this.handleDelete,
            confirm: '确定要删除这条记录吗？',
            visible: (row) => row.deletable,
          },
        ],
      },
    };
  },
};
</script>
```

### 3. 模态表单 CRUD 模式

```vue
<template>
  <div>
    <!-- 表格 -->
    <jh-table
      :headers="headers"
      :request="loadData"
      @create-click="handleCreate"
      @update-click="handleUpdate"
      @delete-click="handleDelete"
    />
    
    <!-- 新增/编辑弹窗 -->
    <jh-modal-form
      v-model="showModal"
      :title="modalTitle"
      :fields="formFields"
      :initial-data="currentRow"
      @confirm="handleSubmit"
    />
    
    <!-- 删除确认 -->
    <jh-confirm-dialog
      v-model="showConfirm"
      title="确认删除"
      content="确定要删除这条记录吗？"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [],
      formFields: [],
      showModal: false,
      showConfirm: false,
      modalTitle: '',
      currentRow: null,
    };
  },
  methods: {
    handleCreate() {
      this.modalTitle = '新增';
      this.currentRow = {};
      this.showModal = true;
    },
    handleUpdate(row) {
      this.modalTitle = '编辑';
      this.currentRow = { ...row };
      this.showModal = true;
    },
    handleDelete(row) {
      this.currentRow = row;
      this.showConfirm = true;
    },
    async handleSubmit(data) {
      if (data.id) {
        await this.$api.update(data.id, data);
      } else {
        await this.$api.create(data);
      }
      this.showModal = false;
      this.$refs.table.reload();
    },
    async confirmDelete() {
      await this.$api.delete(this.currentRow.id);
      this.showConfirm = false;
      this.$refs.table.reload();
    },
  },
};
</script>
```

### 4. 字段联动

```javascript
// 省市区三级联动示例
const formFields = [
  {
    key: 'province',
    label: '省份',
    type: 'select',
    options: provinces,
    onChange: (value, formData) => {
      // 省份变化时，重置城市和区县
      formData.city = '';
      formData.district = '';
    },
  },
  {
    key: 'city',
    label: '城市',
    type: 'select',
    options: [], // 动态加载
    disabled: (formData) => !formData.province,
  },
  {
    key: 'district',
    label: '区县',
    type: 'select',
    options: [], // 动态加载
    disabled: (formData) => !formData.city,
  },
];
```

### 5. 性能优化

#### 大数据表格

```vue
<template>
  <jh-table
    :headers="headers"
    :request="loadData"
    :items-per-page="50"
    :footer-props="{
      itemsPerPageOptions: [20, 50, 100],
    }"
  />
</template>
```

#### 表单优化

```vue
<template>
  <jh-form
    :fields="formFields"
    :lazy-validation="true"
    :hide-details="'auto'"
  />
</template>
```

---

## 常见问题

### Q1: 如何在表格中实现自定义列渲染？

使用作用域插槽：

```vue
<jh-table :headers="headers" :items="items">
  <template v-slot:item.status="{ item, value }">
    <v-chip :color="value === 'active' ? 'success' : 'error'">
      {{ value }}
    </v-chip>
  </template>
</jh-table>
```

### Q2: 如何实现表单的条件显示？

使用 `visible` 函数：

```javascript
{
  key: 'companyName',
  label: '公司名称',
  type: 'text',
  visible: (formData) => formData.userType === 'company',
}
```

### Q3: 如何在 JhFormList 中实现嵌套表单？

使用插槽：

```vue
<jh-form-list v-model="orders" :fields="orderFields">
  <template #field-items="{ item, index, updateItem }">
    <jh-form-list
      :value="item.items"
      :fields="itemFields"
      @input="updateItem('items', $event)"
      mode="table"
    />
  </template>
</jh-form-list>
```

### Q4: 如何处理服务端分页的数据？

使用 `request` 函数：

```javascript
async loadData({ page, pageSize, search, filters }) {
  const response = await this.$api.getList({
    page,
    pageSize,
    keyword: search,
    ...filters,
  });
  
  return {
    data: response.data.list,
    total: response.data.total,
  };
}
```

### Q5: 如何自定义表单验证规则？

```javascript
// 在组件 data 中定义
customRules: {
  idCard: [
    v => !!v || '身份证号不能为空',
    v => /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(v) || '身份证号格式不正确',
  ],
}

// 在字段配置中使用
{ key: 'idCard', label: '身份证号', type: 'text', rules: this.customRules.idCard }
```

---

## 快速参考卡片

### 组件导入

```javascript
// 全局注册
import JianghuUI from '@jianghujs/jianghu-ui';
import '@jianghujs/jianghu-ui/dist/jianghu-ui.css';

Vue.use(JianghuUI);

// 按需引入
import { JhTable, JhForm } from '@jianghujs/jianghu-ui';

export default {
  components: {
    JhTable,
    JhForm,
  },
};
```

### 常用 Props 速查

#### JhTable

```javascript
{
  headers: [],          // 表头配置
  items: [],            // 数据数组（客户端分页）
  request: fn,          // 数据请求函数（服务端分页）
  showFilter: false,    // 显示筛选栏
  filterFields: [],     // 筛选字段
  showSelect: false,    // 显示复选框
  actionColumn: {},     // 操作列配置
}
```

#### JhForm

```javascript
{
  fields: [],           // 字段配置
  initialData: {},      // 初始数据
  layout: 'vertical',   // 布局模式
  readonly: false,      // 只读模式
  disabled: false,      // 禁用模式
}
```

#### JhFormList

```javascript
{
  value: [],            // v-model
  fields: [],           // 字段配置
  mode: 'card',         // 渲染模式
  min: 0,               // 最小项数
  max: Infinity,        // 最大项数
  sortable: false,      // 可排序
}
```

### 常用事件速查

```javascript
// JhTable
@row-click="handleRowClick"
@create-click="handleCreate"
@update-click="handleUpdate"
@delete-click="handleDelete"
@selection-change="handleSelectionChange"
@filter-search="handleFilterSearch"

// JhForm
@submit="handleSubmit"
@field-change="handleFieldChange"
@validate="handleValidate"

// JhFormList
@add="handleAdd"
@remove="handleRemove"
@change="handleChange"
```

---

## 版本信息

- **当前版本**: 1.0.0
- **Vue 版本要求**: 2.7+
- **Vuetify 版本要求**: 2.x
- **浏览器支持**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## 相关链接

- **在线文档**: https://jianghujs.github.io/jianghu-ui/
- **GitHub**: https://github.com/jianghujs/jianghu-ui
- **Vue 2 文档**: https://v2.vuejs.org/
- **Vuetify 2 文档**: https://v2.vuetifyjs.com/
- **Material Design Icons**: https://materialdesignicons.com/

---

**注**: 本知识库专门为 AI 大模型优化，提供了结构化的组件信息和使用示例。在实际开发中，AI 工具可以基于这些信息快速生成代码、提供建议和解决问题。

