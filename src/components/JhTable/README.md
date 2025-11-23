# JhTable - 高级表格组件

参考 Ant Design Pro 的 ProTable 设计的增强版数据表格组件，提供丰富的企业级功能。

## ✨ 核心特性

### 1. ProTable 样式系统

#### 表格标题区
- **headerTitle**: 表格标题显示
- **tooltip**: 标题提示信息
- **header-title 插槽**: 自定义标题内容

```vue
<jh-table
  header-title="用户列表"
  tooltip="这是用户管理列表"
>
  <template v-slot:header-title>
    <div class="custom-title">
      <v-icon>mdi-account-group</v-icon>
      <span>用户管理</span>
    </div>
  </template>
</jh-table>
```

#### 卡片样式
- **cardBordered**: 显示卡片边框和阴影（默认 true）
- **ghost**: 幽灵模式，无边框无背景（默认 false）

```vue
<!-- 卡片样式 -->
<jh-table :card-bordered="true" />

<!-- 幽灵模式 -->
<jh-table :ghost="true" />
```

### 2. 批量操作提示栏

当启用行选择时，选中数据后会自动显示批量操作提示栏。

```vue
<jh-table
  :show-select="true"
  @selection-change="handleSelectionChange"
>
  <!-- 自定义批量操作提示内容 -->
  <template v-slot:alert="{ selectedRowKeys, selectedRows }">
    <span>已选择 {{ selectedRows.length }} 项</span>
  </template>

  <!-- 自定义批量操作按钮 -->
  <template v-slot:alert-actions="{ selectedRowKeys, selectedRows }">
    <v-btn small text color="primary" @click="handleBatchExport">
      <v-icon small left>mdi-download</v-icon>
      导出
    </v-btn>
    <v-btn small text color="error" @click="handleBatchDelete">
      <v-icon small left>mdi-delete</v-icon>
      批量删除
    </v-btn>
  </template>
</jh-table>
```

### 3. 轮询和防抖

#### 轮询刷新
自动定时刷新表格数据，适用于实时监控场景。

```vue
<jh-table
  :request="fetchData"
  :polling="5000"
/>
```

#### 搜索防抖
减少搜索时的请求频率，提升性能。

```vue
<jh-table
  :request="fetchData"
  :debounce-time="500"
/>
```

### 4. 增强的工具栏

#### 工具栏配置
```vue
<jh-table
  :toolbar="{
    search: true,      // 搜索框
    refresh: true,     // 刷新按钮
    setting: true,     // 列设置
    density: true,     // 密度切换
    fullscreen: true   // 全屏
  }"
/>
```

#### 工具栏插槽
```vue
<jh-table>
  <!-- 左侧操作按钮（在标题区显示） -->
  <template v-slot:toolbar-actions>
    <v-btn color="success" @click="handleCreate">
      <v-icon left>mdi-plus</v-icon>
      新增
    </v-btn>
  </template>

  <!-- 右侧额外按钮 -->
  <template v-slot:toolbar-extra>
    <v-btn outlined>
      <v-icon left>mdi-download</v-icon>
      导出
    </v-btn>
  </template>
</jh-table>
```

### 5. 表格额外内容区

在表格下方添加额外内容，如统计信息、图表等。

```vue
<jh-table>
  <template v-slot:table-extra>
    <div class="pa-4">
      <v-row>
        <v-col cols="3">
          <v-card>
            <v-card-text>
              <div class="text-h4">1,234</div>
              <div class="text-caption">总用户数</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
</jh-table>
```

### 6. 高级筛选栏

集成 JhQueryFilter 组件，提供强大的筛选功能。

```vue
<jh-table
  :show-filter="true"
  :filter-fields="[
    { key: 'username', label: '用户名', type: 'text' },
    { key: 'status', label: '状态', type: 'select', options: [...] },
    { key: 'dateRange', label: '日期', type: 'daterange' }
  ]"
  :filter-collapsible="true"
  :filter-default-collapsed="true"
  @filter-search="handleFilterSearch"
  @filter-reset="handleFilterReset"
/>
```

### 7. 列增强功能

#### copyable - 可复制
```javascript
{
  text: '邮箱',
  value: 'email',
  copyable: true  // 显示复制按钮
}
```

#### ellipsis - 省略号
```javascript
{
  text: '描述',
  value: 'description',
  ellipsis: true  // 超长文本省略，hover 显示完整内容
}
```

### 8. 操作列配置化

```vue
<jh-table
  :action-column="{
    title: '操作',
    width: 180,
    fixed: 'right',
    buttons: [
      {
        text: '编辑',
        type: 'link',        // link / icon / button
        icon: 'mdi-pencil',
        color: 'primary',
        tooltip: '编辑记录',
        onClick: (row) => { console.log('编辑', row) },
        visible: (row) => row.status !== '禁用',
        confirm: '确认编辑？'
      },
      {
        text: '删除',
        type: 'link',
        icon: 'mdi-delete',
        color: 'error',
        onClick: (row) => { console.log('删除', row) },
        confirm: '确认删除？'
      }
    ]
  }"
/>
```

### 9. 服务端分页

```vue
<jh-table
  :request="fetchData"
  :pagination="{
    current: 1,
    pageSize: 20,
    pageSizeOptions: [10, 20, 50, 100]
  }"
/>
```

```javascript
async fetchData(params) {
  // params: { page, pageSize, search, sorter, filters }
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return {
    data: response.list,
    total: response.total,
    success: true,
  };
}
```

### 10. 行选择

```vue
<jh-table
  :show-select="true"
  :single-select="false"
  @selection-change="handleSelectionChange"
/>
```

```javascript
handleSelectionChange({ selectedRowKeys, selectedRows }) {
  console.log('选中的 keys:', selectedRowKeys);
  console.log('选中的行:', selectedRows);
}
```

### 11. 密度切换

三种密度自动适配：
- **default**: 48px 行高
- **medium**: 40px 行高
- **compact**: 32px 行高

```vue
<jh-table size="medium" />
```

## 📋 完整 Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| headers | 表格表头配置 | Array | [] |
| items | 表格数据（客户端分页） | Array | [] |
| request | 数据请求函数（服务端分页） | Function | null |
| headerTitle | 表格标题 | String | '' |
| tooltip | 标题提示信息 | String | '' |
| cardBordered | 是否显示卡片边框 | Boolean | true |
| ghost | 幽灵模式（无边框无背景） | Boolean | false |
| toolbar | 工具栏配置 | Object/Boolean | {...} |
| showFilter | 是否显示筛选栏 | Boolean | false |
| filterFields | 筛选字段配置 | Array | [] |
| filterCollapsible | 筛选栏是否可折叠 | Boolean | true |
| filterDefaultCollapsed | 筛选栏默认是否折叠 | Boolean | true |
| actionColumn | 操作列配置 | Object/Boolean | null |
| pagination | 分页配置 | Object/Boolean | {...} |
| showSelect | 是否显示选择框 | Boolean | false |
| singleSelect | 是否单选 | Boolean | false |
| polling | 轮询间隔（毫秒），0 表示不轮询 | Number | 0 |
| debounceTime | 搜索防抖时间（毫秒） | Number | 300 |
| loading | 加载状态 | Boolean | false |
| size | 表格密度 | String | 'default' |
| rowKey | 行数据的 Key | String | 'id' |

## 🎯 插槽

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| header-title | 自定义标题内容 | - |
| toolbar-actions | 工具栏左侧操作按钮 | - |
| toolbar-extra | 工具栏右侧额外内容 | - |
| alert | 自定义批量操作提示内容 | { selectedRowKeys, selectedRows } |
| alert-actions | 批量操作按钮区 | { selectedRowKeys, selectedRows } |
| table-extra | 表格额外内容区 | - |
| item.{column} | 自定义列内容 | { item, value } |
| header.{column} | 自定义表头 | { header } |

## 🔧 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| reload() | 重新加载数据（服务端分页） | - |
| reset() | 重置到第一页 | - |
| clearSelection() | 清空选择 | - |
| getSelectedRows() | 获取选中的行 | - |

## 📡 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| create-click | 点击新增按钮 | - |
| update-click | 点击详情按钮 | (item) |
| delete-click | 点击删除按钮 | (item) |
| row-click | 点击行 | (item, event) |
| selection-change | 选择改变 | { selectedRowKeys, selectedRows } |
| refresh | 点击刷新按钮 | - |
| copy-success | 复制成功 | (text) |
| request-error | 请求失败 | (error) |
| filter-search | 筛选查询 | (queryData) |
| filter-reset | 筛选重置 | - |

## 🎨 完整示例

```vue
<template>
  <jh-table
    ref="tableRef"
    header-title="用户管理"
    tooltip="管理系统用户信息"
    :card-bordered="true"
    :headers="headers"
    :request="fetchData"
    :show-select="true"
    :show-filter="true"
    :filter-fields="filterFields"
    :action-column="actionColumn"
    :polling="10000"
    :debounce-time="500"
    @selection-change="handleSelectionChange"
    @filter-search="handleFilterSearch"
  >
    <!-- 工具栏按钮 -->
    <template v-slot:toolbar-actions>
      <v-btn color="success" @click="handleCreate">
        <v-icon left>mdi-plus</v-icon>
        新增用户
      </v-btn>
    </template>

    <!-- 额外工具 -->
    <template v-slot:toolbar-extra>
      <v-btn outlined @click="handleExport">
        <v-icon left>mdi-download</v-icon>
        导出
      </v-btn>
    </template>

    <!-- 批量操作 -->
    <template v-slot:alert-actions="{ selectedRows }">
      <v-btn small text color="error" @click="handleBatchDelete">
        批量删除
      </v-btn>
    </template>

    <!-- 自定义状态列 -->
    <template v-slot:item.status="{ item }">
      <v-chip
        :color="item.status === '启用' ? 'success' : 'error'"
        small
      >
        {{ item.status }}
      </v-chip>
    </template>
  </jh-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id', width: 80 },
        { text: '用户名', value: 'username', copyable: true },
        { text: '邮箱', value: 'email', ellipsis: true, copyable: true },
        { text: '状态', value: 'status' },
        { text: '创建时间', value: 'createdAt' },
        { text: '操作', value: 'action', width: 180 },
      ],
      filterFields: [
        { key: 'username', label: '用户名', type: 'text' },
        { key: 'status', label: '状态', type: 'select', options: [...] },
      ],
      actionColumn: {
        title: '操作',
        width: 180,
        buttons: [
          {
            text: '编辑',
            type: 'link',
            icon: 'mdi-pencil',
            color: 'primary',
            onClick: this.handleEdit,
          },
          {
            text: '删除',
            type: 'link',
            icon: 'mdi-delete',
            color: 'error',
            confirm: '确认删除？',
            onClick: this.handleDelete,
          },
        ],
      },
    };
  },
  methods: {
    async fetchData(params) {
      const response = await this.$api.getUsers(params);
      return {
        data: response.list,
        total: response.total,
        success: true,
      };
    },
    handleCreate() {
      // 新增逻辑
    },
    handleEdit(row) {
      // 编辑逻辑
    },
    handleDelete(row) {
      // 删除逻辑
    },
    handleBatchDelete() {
      const rows = this.$refs.tableRef.getSelectedRows();
      // 批量删除逻辑
    },
    handleSelectionChange({ selectedRows }) {
      console.log('选中:', selectedRows);
    },
    handleFilterSearch(queryData) {
      console.log('筛选:', queryData);
    },
  },
};
</script>
```

## 🆚 对比 Ant Design ProTable

### ✅ 已实现的 ProTable 功能

- ✅ headerTitle - 表格标题
- ✅ tooltip - 标题提示
- ✅ cardBordered - 卡片边框
- ✅ ghost - 幽灵模式
- ✅ toolbar - 工具栏配置
- ✅ search - 搜索功能
- ✅ options - 列设置、密度、刷新、全屏
- ✅ request - 服务端分页
- ✅ polling - 轮询刷新
- ✅ debounceTime - 搜索防抖
- ✅ rowSelection - 行选择
- ✅ tableAlertRender - 批量操作提示栏
- ✅ tableAlertOptionRender - 批量操作按钮
- ✅ columns.copyable - 可复制列
- ✅ columns.ellipsis - 省略号
- ✅ actionColumn - 操作列配置

### 🎯 Jianghu UI 特色功能

- ✅ JhQueryFilter 集成 - 强大的高级筛选
- ✅ Vuetify 深度集成 - 完美的 Material Design
- ✅ 移动端优化 - 响应式设计
- ✅ 丰富的插槽系统 - 高度可定制

## 🚀 最新增强能力（v2.1）

### 1. 原生 v-data-table 属性透传
通过 `dataTableProps` 或直接在 `<jh-table>` 上声明属性，即可传递 Vuetify `v-data-table` 的原生能力（如 `hide-default-footer`、`show-expand`、`item-class` 等），迁移老项目时几乎零成本。

```vue
<jh-table
  :headers="headers"
  :items="items"
  hide-default-footer
  :data-table-props="{ showExpand: true, disablePagination: true }"
/>
```

### 2. 多列排序 & 受控排序
- 新增 `sortBy`、`sortDesc`、`multiSort`、`mustSort` 属性
- 新增 `sort-change`、`update:sortBy`、`update:sortDesc` 事件
- 服务端模式自动携带 `sorter` 信息，便于后端直接解析

```vue
<jh-table
  :headers="headers"
  :request="fetchData"
  multi-sort
  :sort-by="['createdAt']"
  :sort-desc="[true]"
  @sort-change="({ sorter }) => console.log(sorter)"
/>
```

### 3. 列状态持久化（columnsState）

```vue
<jh-table
  :headers="headers"
  :columns-state="{
    persistenceKey: 'user-table-columns',
    defaultVisible: { email: false },
    value: customState
  }"
  @columns-state-change="val => customState = val"
/>
```

> 会自动使用 `localStorage` 缓存列显示状态，刷新或重新登录依旧生效。

### 4. 对齐 ProTable 的 rowSelection API
- `rowSelection.type = 'radio' | 'checkbox'`
- `rowSelection.defaultSelectedRowKeys`
- `rowSelection.selectedRowKeys`（受控模式）
- `rowSelection.onChange(selectedKeys, selectedRows)`

```vue
<jh-table
  :headers="headers"
  :items="items"
  :row-selection="{
    type: 'radio',
    defaultSelectedRowKeys: [1],
    onChange: (keys, rows) => console.log(keys, rows)
  }"
/>
```

### 5. 自定义批量操作提示（tableAlertRender）

- `tableAlertRender`：函数或 `false`。函数签名为 `(h, { selectedRows, selectedRowKeys, onCleanSelected }) => VNode`，返回的内容会替换默认 “已选择 X 项” 提示；配置为 `false` 时隐藏默认提示。
- `tableAlertOptionRender`：函数或 `false`。同样接受 `{ selectedRows, selectedRowKeys, onCleanSelected }`，可输出批量操作按钮；也可以直接使用 `#alert-actions` slot。
- 插槽优先级高于 props，方便在单文件组件内直接书写模板；若同时设置 `tableAlertRender === false` 且无插槽，则整块提示区域不会出现。

```vue
<jh-table
  :headers="headers"
  :items="apps"
  show-select
  :table-alert-render="(h, { selectedRows, onCleanSelected }) => {
    const totalPods = selectedRows.reduce((sum, row) => sum + row.podCount, 0);
    const totalCalls = selectedRows.reduce((sum, row) => sum + row.callCount, 0);
    return h('div', { class: 'd-flex align-center flex-wrap gap-4' }, [
      h('span', { class: 'font-weight-medium' }, `已选 ${selectedRows.length} 项`),
      h('v-btn', {
        props: { text: true, xSmall: true, color: 'primary' },
        on: { click: onCleanSelected }
      }, '取消选择'),
      h('span', `容器数量：${totalPods} 个`),
      h('span', `调用量：${totalCalls} 次`)
    ]);
  }"
  :table-alert-option-render="(h, { selectedRows }) => h('div', [
    h('v-btn', { props: { small: true, color: 'error' } }, '批量删除'),
    h('v-btn', { props: { small: true, outlined: true, color: 'primary' } }, '导出数据')
  ])"
/>
```

## 📱 响应式设计

组件针对移动端进行了全面优化：
- 自动调整工具栏布局
- 操作列在移动端显示为下拉菜单
- 批量操作栏自适应布局
- 表格密度自动调整

## 🎨 主题定制

组件完全遵循 Vuetify 主题系统，支持：
- 颜色主题定制
- 暗黑模式
- 自定义样式覆盖

## 📝 更新日志

### v2.1.0 (2024-04)
- ♻️ `dataTableProps` + `$attrs` 透传原生 `v-data-table` 能力，迁移更顺滑
- ✨ 新增列状态持久化 `columnsState`，支持 `localStorage` 和受控模式
- ✨ 新增 `sortBy`/`sortDesc`/`multiSort`/`mustSort` 以及 `sort-change` 事件
- ✨ rowSelection 对齐 ProTable（`type`、`defaultSelectedRowKeys`、`selectedRowKeys`、`onChange`）
- 🧼 selection 事件、`page`、`items-per-page`、`click:row` 等事件与 Vuetify 行为保持一致

### v2.0.0 (2024-01)
- ✨ 新增 ProTable 样式系统（headerTitle, tooltip, cardBordered, ghost）
- ✨ 新增批量操作提示栏（alert, alert-actions 插槽）
- ✨ 新增轮询刷新功能（polling）
- ✨ 新增搜索防抖功能（debounceTime）
- 🎨 优化工具栏布局和样式
- 🎨 优化移动端适配
- 📝 完善文档和示例

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT
