# JianghuJS UI 组件 API 速查表

> **说明**: 所有组件的核心 Props、Events、Slots 快速查询

## 📋 目录

- [JhTable](#jhtable)
- [JhForm](#jhform)
- [JhFormList](#jhformlist)
- [JhDescriptions](#jhdescriptions)
- [JhLayout](#jhlayout)
- [JhCard](#jhcard)
- [JhModalForm](#jhmodalform)
- [JhDrawerForm](#jhdrawerform)
- [JhQueryFilter](#jhqueryfilter)
- [JhStatisticCard](#jhstatisticcard)

---

## JhTable

### Props
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| headers | Array | [] | 表头配置 |
| items | Array | [] | 数据（客户端分页） |
| request | Function | null | 数据请求函数（服务端分页） |
| headerTitle | String | '' | 表格标题 |
| tooltip | String | '' | 标题提示 |
| cardBordered | Boolean | true | 显示卡片边框 |
| ghost | Boolean | false | 幽灵模式 |
| showFilter | Boolean | false | 显示筛选栏 |
| filterFields | Array | [] | 筛选字段配置 |
| actionColumn | Object | null | 操作列配置 |
| showSelect | Boolean | false | 显示选择框 |
| singleSelect | Boolean | false | 单选模式 |
| polling | Number | 0 | 轮询间隔（毫秒） |
| debounceTime | Number | 300 | 搜索防抖时间 |
| loading | Boolean | false | 加载状态 |
| size | String | 'default' | 表格密度 |
| rowKey | String | 'id' | 行数据的 Key |

### Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| row-click | (item, event) | 点击行 |
| selection-change | { selectedRowKeys, selectedRows } | 选择改变 |
| filter-search | (queryData) | 筛选查询 |
| filter-reset | - | 筛选重置 |
| refresh | - | 点击刷新 |

### Slots
| 插槽名 | 参数 | 说明 |
|--------|------|------|
| header-title | - | 自定义标题 |
| toolbar-actions | - | 工具栏左侧按钮 |
| toolbar-extra | - | 工具栏右侧内容 |
| alert | { selectedRowKeys, selectedRows } | 批量操作提示 |
| alert-actions | { selectedRowKeys, selectedRows } | 批量操作按钮 |
| table-extra | - | 表格额外内容 |
| item.{column} | { item, value } | 自定义列内容 |

### Methods
| 方法名 | 说明 |
|--------|------|
| reload() | 重新加载数据 |
| reset() | 重置到第一页 |
| clearSelection() | 清空选择 |
| getSelectedRows() | 获取选中的行 |

---

## JhForm

### Props
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fields | Array | [] | 表单字段配置 |
| initialData | Object | {} | 初始表单数据 |
| layout | String | 'vertical' | 布局模式 |
| showLabels | Boolean | true | 显示标签 |
| labelWidth | Number/String | 'auto' | 标签宽度 |
| labelAlign | String | 'right' | 标签对齐 |
| showRequiredMark | Boolean | true | 显示必填标记 |
| readonly | Boolean | false | 只读模式 |
| disabled | Boolean | false | 禁用模式 |
| defaultDense | Boolean | true | 默认紧凑模式 |
| defaultFilled | Boolean | true | 默认填充样式 |
| defaultColsMd | Number | 6 | 默认列宽 |
| omitNil | Boolean | true | 忽略 null/undefined |

### Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| submit | (data) | 表单提交 |
| reset | (data) | 表单重置 |
| validate | (isValid, data) | 表单验证 |
| field-change | { key, value, formData } | 字段变化 |

### Slots
| 插槽名 | 参数 | 说明 |
|--------|------|------|
| actions | { formData, validate, resetForm } | 操作区域 |
| field-{key} | { field, formData, updateField } | 自定义字段 |

### Methods
| 方法名 | 说明 |
|--------|------|
| getFormData() | 获取表单数据 |
| setFieldsValue(values) | 设置多个字段值 |
| setFieldValue(key, value) | 设置单个字段值 |
| validate() | 验证表单 |
| resetForm() | 重置表单 |
| submit() | 提交表单 |

### Field Types
- `text`: 文本输入
- `textarea`: 多行文本
- `number`: 数字输入
- `select`: 下拉选择
- `autocomplete`: 自动完成
- `date`: 日期选择
- `time`: 时间选择
- `switch`: 开关
- `checkbox`: 复选框
- `radio`: 单选按钮
- `slot`: 自定义插槽
- `group`: 分组标题

---

## JhFormList

### Props
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value (v-model) | Array | [] | 表单列表数据 |
| fields | Array | [] | 字段配置 |
| min | Number | 0 | 最小项数 |
| max | Number | Infinity | 最大项数 |
| renderMode | String | 'card' | 渲染模式 |
| addButtonText | String | '添加' | 添加按钮文本 |
| removeButtonText | String | '删除' | 删除按钮文本 |
| showIndex | Boolean | true | 显示序号 |
| disabled | Boolean | false | 禁用状态 |

### Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| input | (value) | 数据变化 |
| add | (item, index) | 添加项 |
| remove | (item, index) | 删除项 |

### Render Modes
- `card`: 卡片模式（字段多）
- `table`: 表格模式（字段少）
- `inline`: 行内模式（单字段）

---

## JhDescriptions

### Props
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String | '' | 标题 |
| tooltip | String | '' | 标题提示 |
| columns | Array | [] | 列配置 |
| dataSource | Object | {} | 数据源 |
| request | Function | null | 请求数据方法 |
| params | Object | {} | 请求参数 |
| column | Number/Object | 3 | 列数 |
| layout | String | 'horizontal' | 布局方式 |
| bordered | Boolean | true | 显示边框 |
| size | String | 'default' | 尺寸 |
| colon | Boolean | true | 显示冒号 |
| editable | Boolean | false | 可编辑 |
| emptyText | String | '-' | 空值占位符 |
| loading | Boolean | false | 加载状态 |

### Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| save | (data) | 保存数据 |
| cancel | - | 取消编辑 |
| copy | { text, item } | 复制内容 |
| request-success | (data) | 请求成功 |
| request-error | (error) | 请求失败 |

### Slots
| 插槽名 | 参数 | 说明 |
|--------|------|------|
| title | - | 自定义标题 |
| extra | - | 额外内容 |
| item-{dataIndex} | { value, record, item } | 自定义字段内容 |

### ValueType
- `text`: 文本
- `digit`: 数字
- `money`: 金额
- `percent`: 百分比
- `date`: 日期
- `dateTime`: 日期时间
- `time`: 时间
- `option`: 选项
- `select`: 下拉选择

---

## JhLayout

### Props
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String | 'JianghuJS' | 应用标题 |
| logo | String | '' | Logo 图标 |
| menuData | Array | [] | 菜单数据 |
| currentPath | String | '' | 当前路由路径 |
| layout | String | 'side' | 布局模式 |
| sidebarWidth | Number | 256 | 侧边栏宽度 |
| headerHeight | Number | 64 | 头部高度 |
| headerTheme | String | 'light' | 头部主题 |
| sidebarTheme | String | 'dark' | 侧边栏主题 |
| showBreadcrumb | Boolean | true | 显示面包屑 |
| showPageHeader | Boolean | false | 显示页面头部 |
| pageTitle | String | '' | 页面标题 |
| showFooter | Boolean | false | 显示底部 |
| showAvatar | Boolean | true | 显示用户头像 |
| userInfo | Object | {} | 用户信息 |
| showLogout | Boolean | true | 显示退出登录 |
| showSettings | Boolean | false | 显示设置按钮 |

### Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| menu-click | (item) | 菜单点击 |
| breadcrumb-click | (item) | 面包屑点击 |
| logout | - | 退出登录 |
| sidebar-toggle | { collapsed, visible } | 侧边栏切换 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| logo | 自定义 Logo |
| headerRight | 头部右侧内容 |
| pageHeader | 页面头部 |
| pageHeaderExtra | 页面头部额外操作 |
| default | 主内容区域 |
| footer | 底部内容 |
| sidebarFooter | 侧边栏底部 |

### Layout Modes
- `side`: 侧边布局
- `top`: 顶部布局
- `mix`: 混合布局

---

## JhCard

### Props
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String | '' | 标题 |
| subtitle | String | '' | 副标题 |
| bordered | Boolean | true | 显示边框 |
| loading | Boolean | false | 加载状态 |
| hoverable | Boolean | false | 悬停效果 |
| size | String | 'default' | 尺寸 |

### Slots
| 插槽名 | 说明 |
|--------|------|
| title | 自定义标题 |
| extra | 额外内容 |
| default | 卡片内容 |
| actions | 操作区域 |

---

## JhModalForm

### Props
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value (v-model) | Boolean | false | 显示状态 |
| title | String | '' | 标题 |
| fields | Array | [] | 表单字段 |
| initialData | Object | {} | 初始数据 |
| width | Number/String | 600 | 宽度 |
| persistent | Boolean | false | 点击外部不关闭 |
| loading | Boolean | false | 加载状态 |
| confirmText | String | '确定' | 确认按钮文本 |
| cancelText | String | '取消' | 取消按钮文本 |

### Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| input | (value) | 显示状态变化 |
| confirm | (data) | 确认 |
| cancel | - | 取消 |

---

## JhDrawerForm

### Props
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value (v-model) | Boolean | false | 显示状态 |
| title | String | '' | 标题 |
| fields | Array | [] | 表单字段 |
| initialData | Object | {} | 初始数据 |
| width | Number/String | 600 | 宽度 |
| position | String | 'right' | 位置 |

### Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| input | (value) | 显示状态变化 |
| confirm | (data) | 确认 |
| cancel | - | 取消 |

---

## JhQueryFilter

### Props
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fields | Array | [] | 筛选字段 |
| collapsed | Boolean | false | 是否折叠 |
| defaultCollapsed | Boolean | true | 默认折叠 |
| searchText | String | '查询' | 查询按钮文本 |
| resetText | String | '重置' | 重置按钮文本 |

### Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| search | (queryData) | 查询 |
| reset | - | 重置 |
| collapse | (collapsed) | 折叠状态变化 |

---

## JhStatisticCard

### Props
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String | '' | 标题 |
| value | Number/String | 0 | 数值 |
| prefix | String | '' | 前缀 |
| suffix | String | '' | 后缀 |
| trend | String | '' | 趋势 (up/down) |
| trendValue | Number | 0 | 趋势值 |
| loading | Boolean | false | 加载状态 |

---

## 🎯 常用组合

### CRUD 页面核心组合
```vue
<jh-layout>
  <jh-table />
  <jh-modal-form />
  <jh-confirm-dialog />
</jh-layout>
```

### 复杂表单页面
```vue
<jh-layout>
  <jh-card>
    <jh-form>
      <jh-form-list />
    </jh-form>
  </jh-card>
</jh-layout>
```

### 详情页面
```vue
<jh-layout>
  <jh-descriptions />
  <jh-card>
    <jh-table />
  </jh-card>
</jh-layout>
```

### 仪表盘页面
```vue
<jh-layout>
  <jh-statistic-card />
  <jh-card>
    <jh-table />
  </jh-card>
</jh-layout>
```

---

## 💡 快速提示

### 服务端分页标准格式
```javascript
async request(params) {
  // params: { page, pageSize, search, sorter, filters }
  const response = await api.getData(params);
  return {
    data: response.list,    // 必须
    total: response.total,  // 必须
    success: true           // 必须
  };
}
```

### 字段联动标准格式
```javascript
{
  key: 'field',
  visible: (formData) => condition,
  disabled: (formData) => condition
}
```

### 验证规则标准格式
```javascript
// 内置规则
rules: 'require|email|phone'

// 自定义规则
rules: [
  v => !!v || '不能为空',
  v => condition || '错误提示'
]
```
