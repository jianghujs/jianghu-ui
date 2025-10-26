# JianghuJS UI Pro 组件库施工方案

## 一、项目背景与目标

### 1.1 项目背景
- JianghuJS 是一个企业级低代码开发框架，主要服务于 CRM、HR、ERP 等企业管理系统场景
- 当前 jianghu-ui 组件库基于 Vue 2.7 + Vuetify 2.x，提供基础组件封装
- 现有组件功能较为基础，开发者需要编写大量重复代码来实现常见业务场景
- 参考 Ant Design Pro 的设计理念，需要提供更高级的业务组件，提升开发效率

### 1.2 项目目标
1. **提升开发效率**：通过配置化、模板化减少重复代码 60% 以上
2. **统一交互体验**：提供一致的企业级 UI 交互规范
3. **保持技术栈**：基于现有 Vue 2.7 + Vuetify 2.x，保证与江湖项目兼容
4. **易于集成**：CDN 引入方式，零配置使用
5. **良好文档**：Storybook 提供完整示例和 API 文档

### 1.3 核心原则
- **配置优先，插槽补充**：常见场景用配置，特殊需求用插槽
- **向后兼容**：不破坏现有组件 API
- **轻量封装**：基于 Vuetify 封装，不引入额外依赖
- **实战导向**：解决真实业务场景，不过度设计

---

## 二、整体架构设计

### 2.1 组件分层

```
┌─────────────────────────────────────────────────────────────┐
│                      业务组件层                              │
│  JhProLayout, JhPageContainer, JhProTable, JhProForm...     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     基础组件层                               │
│         JhTable, JhForm, JhButton, JhCard...                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              Vuetify 2.x + Tailwind CSS                     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 完整组件清单（参考 Ant Design Pro）

#### 📐 布局组件 (Layout)

| 组件名称 | 优先级 | 对应 AntD Pro | 功能描述 |
|---------|--------|--------------|----------|
| JhProLayout | P1 | ProLayout | 高级布局，侧边栏+顶栏+内容区 |
| JhPageContainer (JhProContainer) | P0 | PageContainer | 页面容器，提供统一的页面头部(标题、面包屑、标签页、返回按钮、额外操作区)、内容区域和页脚 |
| JhProCard | P1 | ProCard | 高级卡片，支持分栏、Tab、折叠 |
| JhStatisticCard | P2 | StatisticCard | 统计数据卡片 |
| JhCheckCard | P2 | CheckCard | 多选卡片 |
| JhWaterMark | P2 | WaterMark | 水印组件 |

#### 📝 数据录入组件 (Data Entry)

| 组件名称 | 优先级 | 对应 AntD Pro | 功能描述 |
|---------|--------|--------------|----------|
| ✅JhProForm | P0 | ProForm | 高级表单，集成多种表单场景 |
| JhQueryForm | P0 | Query/LightFilter | 查询表单，折叠/轻量筛选 |
| JhModalForm | P0 | ModalForm | 弹窗表单 |
| JhDrawerForm | P0 | DrawerForm | 抽屉表单 |
| JhStepsForm | P1 | StepsForm | 分步表单 |
| JhSchemaForm | P2 | SchemaForm | JSON Schema 表单 |
| JhLoginForm | P2 | LoginForm/Page | 登录表单页 |
| JhProFormFields | P1 | ProFormFields | 高级表单字段（日期范围、级联选择等） |
| JhProFormList | P1 | ProFormList | 动态增删表单项 |
| JhProFormDependency | P1 | ProFormDependency | 字段依赖联动 |

#### 📊 数据展示组件 (Data Display)

| 组件名称 | 优先级 | 对应 AntD Pro | 功能描述 |
|---------|--------|--------------|----------|
| ✅JhProTable | P0 | ProTable | 高级表格，集成查询、工具栏、操作列 |
| JhEditableTable | P1 | EditableProTable | 可编辑表格 |
| JhDragSortTable | P2 | DragSortTable | 拖拽排序表格 |
| JhProList | P2 | ProList | 高级列表 |
| JhDescriptions | P1 | ProDescriptions | 详情描述列表 |

#### 🔧 通用组件 (General)

| 组件名称 | 优先级 | 对应 AntD Pro | 功能描述 |
|---------|--------|--------------|----------|
| JhProField | P2 | ProField | 原子字段组件 |
| JhSkeleton | P2 | ProSkeleton | 骨架屏 |
| JhDrawer | P1 | - | 抽屉（基础增强） |
| JhDialog | P1 | - | 弹窗（基础增强） |

### 2.3 技术栈
- **Vue 版本**：2.7.x（支持 Composition API 语法）
- **UI 框架**：Vuetify 2.x（提供基础组件能力）
- **CSS 框架**：Tailwind CSS（提供原子化样式，辅助快速布局）
- **浏览器兼容**：现代浏览器（Chrome/Firefox/Safari/Edge 最新两个版本）
- **CDN 部署**：所有组件支持 UMD 格式
- **样式策略**：
  - Vuetify 组件样式保持原生
  - 自定义样式优先使用 Tailwind CSS 类
  - 复杂样式使用 scoped CSS
  - 避免全局样式污染

---

## 三、核心组件详细设计

### 3.1 JhProTable - 高级表格

#### 3.1.1 功能特性
1. **工具栏** (Toolbar)
   - 搜索框：快速全局搜索
   - 刷新按钮：重新加载数据
   - 列设置：显示/隐藏列，拖拽排序
   - 密度切换：default / medium / compact
   - 全屏切换
   - 自定义按钮插槽

2. **查询表单** (Search Form)
   - 集成 JhQueryForm
   - 支持折叠/展开
   - 查询、重置、清空操作
   - 可配置字段类型（input/select/date/daterange）

3. **表格主体**
   - 基于 v-data-table
   - 列配置增强（支持 render、slots、tooltip、copy）
   - 自定义单元格渲染
   - 固定列（左固定/右固定）
   - 排序、筛选

4. **操作列** (Action Column)
   - 内置操作：编辑、删除、详情、复制
   - 自定义操作按钮
   - 权限控制
   - 下拉菜单（操作过多时）

5. **批量操作**
   - 行选择（单选/多选）
   - 批量删除
   - 批量导出
   - 自定义批量操作

6. **分页**
   - 前端分页：基于本地数据
   - 服务端分页：自动请求远程数据
   - 自定义分页配置

#### 3.1.2 API 设计

```vue
<template>
  <jh-pro-table
    ref="tableRef"
    :columns="columns"
    :request="fetchTableData"
    :search-config="searchConfig"
    :toolbar="toolbar"
    :action-column="actionColumn"
    :pagination="pagination"
    :row-selection="rowSelection"
    @row-click="handleRowClick"
    @search="handleSearch"
    @reset="handleReset"
  >
    <!-- 工具栏额外按钮 -->
    <template #toolbar-actions>
      <v-btn color="primary" @click="handleAdd">
        <v-icon left>mdi-plus</v-icon>
        新增
      </v-btn>
    </template>

    <!-- 自定义列渲染 -->
    <template #column-status="{ row }">
      <v-chip :color="row.status === 'active' ? 'success' : 'error'" small>
        {{ row.status }}
      </v-chip>
    </template>

    <!-- 自定义操作列 -->
    <template #action="{ row }">
      <v-btn icon small @click="handleEdit(row)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon small @click="handleDelete(row)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </jh-pro-table>
</template>

<script>
export default {
  data() {
    return {
      // 列配置
      columns: [
        {
          key: 'id',
          title: 'ID',
          dataIndex: 'id',
          width: 80,
          fixed: 'left',
          sortable: true,
        },
        {
          key: 'name',
          title: '姓名',
          dataIndex: 'name',
          width: 120,
          searchable: true, // 在查询表单中显示
          ellipsis: true,   // 超长省略
          copyable: true,   // 支持复制
        },
        {
          key: 'status',
          title: '状态',
          dataIndex: 'status',
          width: 100,
          slot: 'column-status', // 使用自定义插槽渲染
        },
        {
          key: 'createTime',
          title: '创建时间',
          dataIndex: 'createTime',
          width: 180,
          sortable: true,
        },
      ],

      // 查询表单配置
      searchConfig: {
        labelWidth: 80,
        layout: 'inline', // inline / grid
        collapsed: true,  // 是否默认折叠
        fields: [
          {
            key: 'name',
            label: '姓名',
            type: 'text',
            placeholder: '请输入姓名',
          },
          {
            key: 'status',
            label: '状态',
            type: 'select',
            options: [
              { text: '激活', value: 'active' },
              { text: '禁用', value: 'inactive' },
            ],
          },
          {
            key: 'dateRange',
            label: '创建时间',
            type: 'daterange',
          },
        ],
      },

      // 工具栏配置
      toolbar: {
        search: true,     // 显示搜索框
        refresh: true,    // 显示刷新按钮
        setting: true,    // 显示列设置
        density: true,    // 显示密度切换
        fullscreen: true, // 显示全屏按钮
      },

      // 操作列配置
      actionColumn: {
        title: '操作',
        width: 180,
        fixed: 'right',
        buttons: [
          {
            text: '编辑',
            type: 'link',
            onClick: (row) => this.handleEdit(row),
          },
          {
            text: '删除',
            type: 'link',
            color: 'error',
            confirm: '确认删除该记录？',
            onClick: (row) => this.handleDelete(row),
          },
        ],
        // 或使用插槽： slot: 'action'
      },

      // 分页配置
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
        showTotal: true,
        showSizeChanger: true,
        showQuickJumper: true,
      },

      // 行选择配置
      rowSelection: {
        type: 'checkbox', // checkbox / radio
        selectedRowKeys: [],
        onChange: (selectedRowKeys, selectedRows) => {
          console.log('选中的行', selectedRows);
        },
      },
    };
  },
  methods: {
    // 数据请求函数（服务端分页）
    async fetchTableData(params) {
      // params: { page, pageSize, sorter, filters, search }
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(params),
      });
      const data = await response.json();

      return {
        data: data.list,
        total: data.total,
        success: true,
      };
    },

    handleSearch(values) {
      console.log('查询参数', values);
    },

    handleReset() {
      console.log('重置查询');
    },

    handleEdit(row) {
      console.log('编辑', row);
    },

    handleDelete(row) {
      console.log('删除', row);
    },
  },
};
</script>
```

#### 3.1.3 Props 定义

```javascript
props: {
  // 列配置
  columns: {
    type: Array,
    required: true,
    default: () => [],
  },

  // 数据请求函数（服务端分页）
  request: {
    type: Function,
    default: null,
  },

  // 静态数据（前端分页）
  dataSource: {
    type: Array,
    default: () => [],
  },

  // 查询表单配置
  searchConfig: {
    type: Object,
    default: null,
  },

  // 工具栏配置
  toolbar: {
    type: [Object, Boolean],
    default: () => ({
      search: true,
      refresh: true,
      setting: true,
      density: false,
      fullscreen: false,
    }),
  },

  // 操作列配置
  actionColumn: {
    type: [Object, Boolean],
    default: null,
  },

  // 分页配置
  pagination: {
    type: [Object, Boolean],
    default: () => ({
      current: 1,
      pageSize: 10,
    }),
  },

  // 行选择配置
  rowSelection: {
    type: [Object, Boolean],
    default: null,
  },

  // 行唯一标识字段
  rowKey: {
    type: String,
    default: 'id',
  },

  // 表格大小
  size: {
    type: String,
    default: 'default', // default / medium / compact
    validator: (v) => ['default', 'medium', 'compact'].includes(v),
  },

  // 加载状态
  loading: {
    type: Boolean,
    default: false,
  },
}
```

#### 3.1.4 Events 定义

```javascript
// 行点击事件
this.$emit('row-click', row);

// 查询事件
this.$emit('search', searchValues);

// 重置事件
this.$emit('reset');

// 刷新事件
this.$emit('refresh');

// 选择改变事件
this.$emit('selection-change', { selectedRowKeys, selectedRows });
```

#### 3.1.5 Methods 定义

```javascript
// 刷新表格
this.$refs.tableRef.reload();

// 重置到第一页
this.$refs.tableRef.reset();

// 清空选择
this.$refs.tableRef.clearSelection();

// 获取选中的行
const selectedRows = this.$refs.tableRef.getSelectedRows();
```

---

### 3.2 JhProForm - 高级表单（详细设计）

#### 3.2.1 功能特性

参考 Ant Design ProForm，JhProForm 提供以下核心能力：

1. **丰富的字段类型**
   - 基础输入：text、number、password、email、tel、url
   - 文本域：textarea
   - 选择器：select（单选/多选）、autocomplete、cascader（级联）、treeselect（树形）
   - 日期时间：date、datetime、daterange、datetimerange
   - 开关选项：checkbox、radio、switch
   - 评分滑块：rating、slider
   - 文件上传：upload
   - 金额输入：money
   - 自定义：slot（插槽）

2. **多种布局方式**
   - horizontal - 水平布局（标签在左，内容在右）
   - vertical - 垂直布局（标签在上，内容在下）
   - inline - 行内布局（适合查询表单）
   - grid - 栅格布局（响应式，支持 cols/sm/md/lg）

3. **表单分组**
   - 支持 `type: 'group'` 字段类型
   - 自动生成分组标题和分割线
   - 支持嵌套分组

4. **字段联动**
   - 支持 `visible` 函数动态显示/隐藏字段
   - 支持 `disabled` 函数动态禁用/启用字段
   - 支持字段变更事件 `@field-change`

5. **数据处理**
   - 支持初始值填充
   - 支持字段默认值
   - 支持表单验证（必填、自定义规则）
   - 支持数据转换（提交前/加载后）

6. **只读模式**
   - 支持整体只读 `readonly`
   - 支持单个字段只读
   - 只读模式下以文本形式展示

#### 3.2.2 完整字段类型示例

```javascript
const fieldTypes = [
  // 【基础输入】
  {
    name: 'username',
    label: '用户名',
    type: 'text',
    placeholder: '请输入用户名',
    required: true,
    rules: [
      { pattern: /^[a-zA-Z0-9_]{3,16}$/, message: '用户名为3-16位字母数字下划线' },
    ],
  },
  {
    name: 'age',
    label: '年龄',
    type: 'number',
    min: 0,
    max: 150,
    placeholder: '请输入年龄',
  },
  {
    name: 'email',
    label: '邮箱',
    type: 'email',
    placeholder: '请输入邮箱地址',
    required: true,
  },
  {
    name: 'phone',
    label: '手机号',
    type: 'tel',
    placeholder: '请输入手机号',
    rules: [
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
    ],
  },
  {
    name: 'website',
    label: '个人网站',
    type: 'url',
    placeholder: 'https://example.com',
  },
  {
    name: 'password',
    label: '密码',
    type: 'password',
    placeholder: '请输入密码',
    hint: '密码长度至少8位',
  },

  // 【文本域】
  {
    name: 'description',
    label: '个人简介',
    type: 'textarea',
    rows: 4,
    placeholder: '请输入个人简介，不超过500字',
    rules: [
      { max: 500, message: '简介不能超过500字' },
    ],
  },

  // 【选择器】
  {
    name: 'role',
    label: '用户角色',
    type: 'select',
    placeholder: '请选择角色',
    options: [
      { text: '超级管理员', value: 'superadmin' },
      { text: '管理员', value: 'admin' },
      { text: '普通用户', value: 'user' },
      { text: '访客', value: 'guest' },
    ],
    required: true,
  },
  {
    name: 'skills',
    label: '技能标签',
    type: 'select',
    multiple: true,
    placeholder: '请选择技能标签',
    options: [
      { text: 'Vue.js', value: 'vue' },
      { text: 'React', value: 'react' },
      { text: 'Node.js', value: 'node' },
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
    ],
  },
  {
    name: 'city',
    label: '城市',
    type: 'autocomplete',
    placeholder: '输入城市名称搜索',
    options: [
      { text: '北京市', value: 'beijing' },
      { text: '上海市', value: 'shanghai' },
      { text: '广州市', value: 'guangzhou' },
      { text: '深圳市', value: 'shenzhen' },
      { text: '杭州市', value: 'hangzhou' },
    ],
  },

  // 【日期时间】
  {
    name: 'birthdate',
    label: '出生日期',
    type: 'date',
    placeholder: '请选择出生日期',
  },
  {
    name: 'contractPeriod',
    label: '合同期限',
    type: 'daterange',
    placeholder: '请选择合同开始和结束日期',
  },

  // 【开关选项】
  {
    name: 'gender',
    label: '性别',
    type: 'radio',
    row: true, // 水平排列
    options: [
      { text: '男', value: 'male' },
      { text: '女', value: 'female' },
      { text: '保密', value: 'secret' },
    ],
  },
  {
    name: 'interests',
    label: '兴趣爱好',
    type: 'checkbox',
    // 多个 checkbox 使用 checkboxGroup
  },
  {
    name: 'subscribe',
    label: '订阅邮件通知',
    type: 'checkbox',
  },
  {
    name: 'enabled',
    label: '启用账户',
    type: 'switch',
  },

  // 【评分滑块】
  {
    name: 'satisfaction',
    label: '满意度',
    type: 'rating',
    length: 5,
    hint: '请为我们的服务打分',
  },
  {
    name: 'experience',
    label: '工作年限',
    type: 'slider',
    min: 0,
    max: 30,
    step: 1,
    hint: '拖动滑块选择工作年限',
  },
];
```

#### 3.2.3 实际业务场景示例

##### 场景1：用户注册表单

```vue
<template>
  <jh-pro-form
    :fields="registerFields"
    :initial-data="formData"
    submit-button-text="注册"
    reset-button-text="清空"
    @submit="handleRegister"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      registerFields: [
        { type: 'group', title: '账户信息' },
        {
          name: 'username',
          label: '用户名',
          type: 'text',
          placeholder: '请输入用户名',
          required: true,
          hint: '3-16位字母、数字或下划线',
          rules: [
            { pattern: /^[a-zA-Z0-9_]{3,16}$/, message: '用户名格式不正确' },
          ],
          cols: 12,
          md: 6,
        },
        {
          name: 'email',
          label: '邮箱地址',
          type: 'email',
          placeholder: '请输入邮箱地址',
          required: true,
          cols: 12,
          md: 6,
        },
        {
          name: 'phone',
          label: '手机号',
          type: 'tel',
          placeholder: '请输入手机号',
          required: true,
          rules: [
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
          ],
          cols: 12,
          md: 6,
        },
        {
          name: 'password',
          label: '密码',
          type: 'password',
          placeholder: '请输入密码',
          required: true,
          hint: '密码长度8-20位，需包含字母和数字',
          rules: [
            { min: 8, message: '密码至少8位' },
            { pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/, message: '密码需包含字母和数字' },
          ],
          cols: 12,
          md: 6,
        },

        { type: 'group', title: '个人信息' },
        {
          name: 'realname',
          label: '真实姓名',
          type: 'text',
          placeholder: '请输入真实姓名',
          required: true,
          cols: 12,
          md: 4,
        },
        {
          name: 'gender',
          label: '性别',
          type: 'radio',
          row: true,
          options: [
            { text: '男', value: 'male' },
            { text: '女', value: 'female' },
          ],
          default: 'male',
          cols: 12,
          md: 4,
        },
        {
          name: 'birthdate',
          label: '出生日期',
          type: 'date',
          placeholder: '请选择出生日期',
          cols: 12,
          md: 4,
        },
        {
          name: 'city',
          label: '所在城市',
          type: 'autocomplete',
          placeholder: '请选择城市',
          options: [
            { text: '北京市', value: 'beijing' },
            { text: '上海市', value: 'shanghai' },
            { text: '广州市', value: 'guangzhou' },
            { text: '深圳市', value: 'shenzhen' },
            { text: '杭州市', value: 'hangzhou' },
            { text: '成都市', value: 'chengdu' },
            { text: '武汉市', value: 'wuhan' },
          ],
          cols: 12,
          md: 6,
        },
        {
          name: 'industry',
          label: '所属行业',
          type: 'select',
          placeholder: '请选择行业',
          options: [
            { text: '互联网/IT', value: 'it' },
            { text: '金融/保险', value: 'finance' },
            { text: '教育/培训', value: 'education' },
            { text: '医疗/健康', value: 'healthcare' },
            { text: '制造业', value: 'manufacturing' },
            { text: '其他', value: 'other' },
          ],
          cols: 12,
          md: 6,
        },

        { type: 'group', title: '其他设置' },
        {
          name: 'subscribe',
          label: '订阅产品资讯和优惠信息',
          type: 'checkbox',
          default: true,
          cols: 12,
        },
        {
          name: 'agreement',
          label: '我已阅读并同意《用户协议》和《隐私政策》',
          type: 'checkbox',
          required: true,
          cols: 12,
        },
      ],
    };
  },
  methods: {
    async handleRegister(values) {
      console.log('注册数据:', values);
      // 调用注册 API
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const result = await response.json();
        if (result.success) {
          this.$message.success('注册成功！');
          this.$router.push('/login');
        }
      } catch (error) {
        this.$message.error('注册失败，请重试');
      }
    },
  },
};
</script>
```

##### 场景2：员工入职表单

```vue
<template>
  <jh-pro-form
    :fields="employeeFields"
    :initial-data="employeeData"
    submit-button-text="提交入职信息"
    @submit="handleSubmit"
    @field-change="handleFieldChange"
  />
</template>

<script>
export default {
  data() {
    return {
      employeeData: {},
      employeeFields: [
        { type: 'group', title: '基本信息', divider: true },
        {
          name: 'employeeName',
          label: '员工姓名',
          type: 'text',
          placeholder: '请输入员工姓名',
          required: true,
          cols: 12,
          md: 4,
        },
        {
          name: 'gender',
          label: '性别',
          type: 'radio',
          row: true,
          options: [
            { text: '男', value: 'male' },
            { text: '女', value: 'female' },
          ],
          required: true,
          cols: 12,
          md: 4,
        },
        {
          name: 'birthdate',
          label: '出生日期',
          type: 'date',
          placeholder: '请选择出生日期',
          required: true,
          cols: 12,
          md: 4,
        },
        {
          name: 'idCard',
          label: '身份证号',
          type: 'text',
          placeholder: '请输入身份证号',
          required: true,
          rules: [
            {
              pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
              message: '请输入正确的身份证号',
            },
          ],
          cols: 12,
          md: 6,
        },
        {
          name: 'phone',
          label: '手机号码',
          type: 'tel',
          placeholder: '请输入手机号码',
          required: true,
          rules: [
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
          ],
          cols: 12,
          md: 6,
        },
        {
          name: 'email',
          label: '邮箱地址',
          type: 'email',
          placeholder: '请输入邮箱地址',
          required: true,
          cols: 12,
          md: 6,
        },
        {
          name: 'education',
          label: '学历',
          type: 'select',
          placeholder: '请选择学历',
          options: [
            { text: '高中及以下', value: 'high_school' },
            { text: '大专', value: 'college' },
            { text: '本科', value: 'bachelor' },
            { text: '硕士', value: 'master' },
            { text: '博士', value: 'phd' },
          ],
          required: true,
          cols: 12,
          md: 6,
        },

        { type: 'group', title: '岗位信息', divider: true },
        {
          name: 'department',
          label: '所属部门',
          type: 'select',
          placeholder: '请选择部门',
          options: [
            { text: '技术部', value: 'tech' },
            { text: '产品部', value: 'product' },
            { text: '市场部', value: 'marketing' },
            { text: '销售部', value: 'sales' },
            { text: '人力资源部', value: 'hr' },
            { text: '财务部', value: 'finance' },
          ],
          required: true,
          cols: 12,
          md: 6,
        },
        {
          name: 'position',
          label: '职位',
          type: 'text',
          placeholder: '请输入职位',
          required: true,
          cols: 12,
          md: 6,
        },
        {
          name: 'employeeType',
          label: '员工类型',
          type: 'radio',
          row: true,
          options: [
            { text: '正式员工', value: 'fulltime' },
            { text: '实习生', value: 'intern' },
            { text: '外包', value: 'contractor' },
          ],
          required: true,
          cols: 12,
          md: 6,
        },
        {
          name: 'entryDate',
          label: '入职日期',
          type: 'date',
          placeholder: '请选择入职日期',
          required: true,
          cols: 12,
          md: 6,
        },

        // 正式员工才需要填写合同信息
        {
          name: 'contractPeriod',
          label: '合同期限',
          type: 'daterange',
          placeholder: '请选择合同开始和结束日期',
          visible: (formData) => formData.employeeType === 'fulltime',
          required: true,
          cols: 12,
        },
        {
          name: 'probationPeriod',
          label: '试用期（月）',
          type: 'number',
          placeholder: '请输入试用期',
          min: 0,
          max: 6,
          visible: (formData) => formData.employeeType === 'fulltime',
          cols: 12,
          md: 6,
        },
        {
          name: 'baseSalary',
          label: '基本工资',
          type: 'number',
          placeholder: '请输入基本工资',
          min: 0,
          visible: (formData) => formData.employeeType === 'fulltime',
          hint: '单位：元/月',
          cols: 12,
          md: 6,
        },

        // 实习生需要填写实习信息
        {
          name: 'internPeriod',
          label: '实习期限',
          type: 'daterange',
          placeholder: '请选择实习开始和结束日期',
          visible: (formData) => formData.employeeType === 'intern',
          required: true,
          cols: 12,
        },
        {
          name: 'internSubsidy',
          label: '实习补贴',
          type: 'number',
          placeholder: '请输入实习补贴',
          min: 0,
          visible: (formData) => formData.employeeType === 'intern',
          hint: '单位：元/月',
          cols: 12,
          md: 6,
        },
        {
          name: 'mentor',
          label: '导师',
          type: 'text',
          placeholder: '请输入导师姓名',
          visible: (formData) => formData.employeeType === 'intern',
          cols: 12,
          md: 6,
        },

        { type: 'group', title: '紧急联系人', divider: true },
        {
          name: 'emergencyContact',
          label: '联系人姓名',
          type: 'text',
          placeholder: '请输入紧急联系人姓名',
          required: true,
          cols: 12,
          md: 4,
        },
        {
          name: 'emergencyRelation',
          label: '关系',
          type: 'select',
          placeholder: '请选择关系',
          options: [
            { text: '父母', value: 'parent' },
            { text: '配偶', value: 'spouse' },
            { text: '子女', value: 'child' },
            { text: '兄弟姐妹', value: 'sibling' },
            { text: '其他', value: 'other' },
          ],
          required: true,
          cols: 12,
          md: 4,
        },
        {
          name: 'emergencyPhone',
          label: '联系电话',
          type: 'tel',
          placeholder: '请输入紧急联系人电话',
          required: true,
          rules: [
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
          ],
          cols: 12,
          md: 4,
        },

        { type: 'group', title: '其他信息', divider: true },
        {
          name: 'skills',
          label: '技能特长',
          type: 'select',
          multiple: true,
          placeholder: '请选择技能特长',
          options: [
            { text: 'Java', value: 'java' },
            { text: 'Python', value: 'python' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'Vue.js', value: 'vue' },
            { text: 'React', value: 'react' },
            { text: 'Node.js', value: 'node' },
            { text: 'SQL', value: 'sql' },
            { text: '项目管理', value: 'pm' },
            { text: 'UI设计', value: 'ui' },
          ],
          cols: 12,
        },
        {
          name: 'selfIntroduction',
          label: '自我介绍',
          type: 'textarea',
          rows: 4,
          placeholder: '请简要介绍个人经历、特长、期望等',
          cols: 12,
        },
      ],
    };
  },
  methods: {
    handleSubmit(values) {
      console.log('员工入职信息:', values);
      // 提交到后端
    },
    handleFieldChange({ field, values }) {
      console.log('字段变化:', field, values);
    },
  },
};
</script>
```

##### 场景3：商品发布表单

```vue
<template>
  <jh-pro-form
    :fields="productFields"
    :initial-data="productData"
    submit-button-text="发布商品"
    reset-button-text="重置"
    @submit="handlePublish"
  />
</template>

<script>
export default {
  data() {
    return {
      productData: {},
      productFields: [
        { type: 'group', title: '基本信息' },
        {
          name: 'productName',
          label: '商品名称',
          type: 'text',
          placeholder: '请输入商品名称',
          required: true,
          hint: '不超过60个字符',
          rules: [
            { max: 60, message: '商品名称不能超过60个字符' },
          ],
          cols: 12,
        },
        {
          name: 'category',
          label: '商品分类',
          type: 'select',
          placeholder: '请选择商品分类',
          options: [
            { text: '电子产品', value: 'electronics' },
            { text: '服装鞋包', value: 'clothing' },
            { text: '食品饮料', value: 'food' },
            { text: '家居用品', value: 'home' },
            { text: '图书音像', value: 'books' },
            { text: '运动户外', value: 'sports' },
          ],
          required: true,
          cols: 12,
          md: 6,
        },
        {
          name: 'brand',
          label: '品牌',
          type: 'autocomplete',
          placeholder: '请输入或选择品牌',
          options: [
            { text: '苹果 Apple', value: 'apple' },
            { text: '华为 Huawei', value: 'huawei' },
            { text: '小米 Xiaomi', value: 'xiaomi' },
            { text: '三星 Samsung', value: 'samsung' },
            { text: '索尼 Sony', value: 'sony' },
          ],
          cols: 12,
          md: 6,
        },

        { type: 'group', title: '价格库存' },
        {
          name: 'price',
          label: '商品价格',
          type: 'number',
          placeholder: '请输入价格',
          min: 0,
          step: 0.01,
          required: true,
          hint: '单位：元',
          prependIcon: 'mdi-currency-cny',
          cols: 12,
          md: 4,
        },
        {
          name: 'stock',
          label: '库存数量',
          type: 'number',
          placeholder: '请输入库存',
          min: 0,
          required: true,
          cols: 12,
          md: 4,
        },
        {
          name: 'unit',
          label: '单位',
          type: 'select',
          placeholder: '请选择单位',
          options: [
            { text: '件', value: 'piece' },
            { text: '个', value: 'unit' },
            { text: '盒', value: 'box' },
            { text: '套', value: 'set' },
            { text: '箱', value: 'case' },
          ],
          default: 'piece',
          cols: 12,
          md: 4,
        },

        { type: 'group', title: '商品详情' },
        {
          name: 'description',
          label: '商品描述',
          type: 'textarea',
          rows: 4,
          placeholder: '请输入商品描述，包括特点、用途、注意事项等',
          required: true,
          cols: 12,
        },
        {
          name: 'tags',
          label: '商品标签',
          type: 'select',
          multiple: true,
          placeholder: '请选择商品标签',
          options: [
            { text: '热销', value: 'hot' },
            { text: '新品', value: 'new' },
            { text: '包邮', value: 'free_shipping' },
            { text: '促销', value: 'promotion' },
            { text: '限量', value: 'limited' },
          ],
          cols: 12,
        },

        { type: 'group', title: '销售设置' },
        {
          name: 'saleType',
          label: '销售方式',
          type: 'radio',
          row: true,
          options: [
            { text: '立即开售', value: 'immediate' },
            { text: '定时开售', value: 'scheduled' },
            { text: '暂不开售', value: 'draft' },
          ],
          default: 'immediate',
          required: true,
          cols: 12,
        },
        {
          name: 'saleTime',
          label: '开售时间',
          type: 'date',
          placeholder: '请选择开售时间',
          visible: (formData) => formData.saleType === 'scheduled',
          required: true,
          cols: 12,
          md: 6,
        },
        {
          name: 'promotionPeriod',
          label: '促销期限',
          type: 'daterange',
          placeholder: '请选择促销开始和结束日期',
          cols: 12,
        },
        {
          name: 'allowReturn',
          label: '支持7天无理由退货',
          type: 'switch',
          default: true,
          cols: 12,
          md: 6,
        },
        {
          name: 'allowExchange',
          label: '支持换货',
          type: 'switch',
          default: true,
          cols: 12,
          md: 6,
        },

        { type: 'group', title: '物流信息' },
        {
          name: 'shippingType',
          label: '配送方式',
          type: 'select',
          multiple: true,
          placeholder: '请选择配送方式',
          options: [
            { text: '快递配送', value: 'express' },
            { text: '到店自提', value: 'pickup' },
            { text: '同城配送', value: 'local' },
          ],
          required: true,
          cols: 12,
        },
        {
          name: 'shippingFee',
          label: '运费',
          type: 'number',
          placeholder: '请输入运费',
          min: 0,
          step: 0.01,
          hint: '0表示包邮',
          prependIcon: 'mdi-currency-cny',
          cols: 12,
          md: 6,
        },
        {
          name: 'deliveryTime',
          label: '发货时效',
          type: 'select',
          placeholder: '请选择发货时效',
          options: [
            { text: '24小时内', value: '24h' },
            { text: '48小时内', value: '48h' },
            { text: '3天内', value: '3d' },
            { text: '7天内', value: '7d' },
          ],
          cols: 12,
          md: 6,
        },
      ],
    };
  },
  methods: {
    async handlePublish(values) {
      console.log('商品发布信息:', values);
      try {
        const response = await fetch('/api/products/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const result = await response.json();
        if (result.success) {
          this.$message.success('商品发布成功！');
          this.$router.push('/products');
        }
      } catch (error) {
        this.$message.error('发布失败，请重试');
      }
    },
  },
};
</script>
```

##### 场景4：查询筛选表单（轻量级）

```vue
<template>
  <jh-pro-form
    :fields="queryFields"
    layout="inline"
    :show-buttons="false"
    :dense="true"
    @field-change="handleQuery"
  >
    <template #buttons>
      <v-btn color="primary" @click="handleSearch">
        <v-icon left small>mdi-magnify</v-icon>
        查询
      </v-btn>
      <v-btn text @click="handleReset">
        <v-icon left small>mdi-refresh</v-icon>
        重置
      </v-btn>
    </template>
  </jh-pro-form>
</template>

<script>
export default {
  data() {
    return {
      queryFields: [
        {
          name: 'keyword',
          label: '关键词',
          type: 'text',
          placeholder: '请输入订单号/商品名称',
        },
        {
          name: 'status',
          label: '订单状态',
          type: 'select',
          placeholder: '全部',
          options: [
            { text: '全部', value: '' },
            { text: '待付款', value: 'pending' },
            { text: '待发货', value: 'paid' },
            { text: '已发货', value: 'shipped' },
            { text: '已完成', value: 'completed' },
            { text: '已取消', value: 'cancelled' },
          ],
        },
        {
          name: 'dateRange',
          label: '下单日期',
          type: 'daterange',
        },
      ],
    };
  },
  methods: {
    handleQuery({ field, values }) {
      console.log('查询参数变化:', values);
      // 可以实现实时查询
    },
    handleSearch() {
      // 手动触发查询
    },
    handleReset() {
      // 重置查询
    },
  },
};
</script>
```

#### 3.2.4 Props 定义（完整）

```javascript
props: {
  // 表单字段配置
  fields: {
    type: Array,
    required: true,
    default: () => [],
  },

  // 初始数据
  initialData: {
    type: Object,
    default: () => ({}),
  },

  // 表单布局
  layout: {
    type: String,
    default: 'vertical', // vertical / horizontal / inline / grid
    validator: (v) => ['vertical', 'horizontal', 'inline', 'grid'].includes(v),
  },

  // 标签宽度（horizontal 布局时生效）
  labelWidth: {
    type: [Number, String],
    default: 100,
  },

  // 标签对齐方式
  labelAlign: {
    type: String,
    default: 'right', // left / right
  },

  // 表单项默认列宽（grid 布局）
  colSpan: {
    type: Number,
    default: 12,
  },

  // 表单验证模式
  lazyValidation: {
    type: Boolean,
    default: true,
  },

  // 是否流式布局
  fluid: {
    type: Boolean,
    default: false,
  },

  // 紧凑模式
  dense: {
    type: Boolean,
    default: false,
  },

  // 输入框样式
  outlined: {
    type: Boolean,
    default: true,
  },

  // 只读模式
  readonly: {
    type: Boolean,
    default: false,
  },

  // 禁用模式
  disabled: {
    type: Boolean,
    default: false,
  },

  // 是否显示按钮
  showButtons: {
    type: Boolean,
    default: true,
  },

  // 提交按钮文本
  submitButtonText: {
    type: String,
    default: '提交',
  },

  // 重置按钮文本
  resetButtonText: {
    type: String,
    default: '重置',
  },

  // 提交按钮颜色
  submitButtonColor: {
    type: String,
    default: 'primary',
  },

  // 重置按钮颜色
  resetButtonColor: {
    type: String,
    default: 'secondary',
  },

  // 按钮对齐方式
  buttonAlign: {
    type: String,
    default: 'text-right', // text-left / text-center / text-right
  },

  // 提交中状态
  submitting: {
    type: Boolean,
    default: false,
  },

  // 数据转换函数（提交前）
  transformBeforeSubmit: {
    type: Function,
    default: null,
  },

  // 数据转换函数（加载后）
  transformAfterLoad: {
    type: Function,
    default: null,
  },
}
```

#### 3.2.5 Events 定义

```javascript
// 提交事件
this.$emit('submit', formData);

// 重置事件
this.$emit('reset');

// 字段变化事件
this.$emit('field-change', { field: fieldName, values: formData });

// 整体数据变化事件
this.$emit('change', formData);

// 验证失败事件
this.$emit('validate-error', errors);
```

#### 3.2.6 Methods 定义

```javascript
// 验证表单
await this.$refs.formRef.validate();

// 重置验证
this.$refs.formRef.resetValidation();

// 重置表单
this.$refs.formRef.resetForm();

// 获取表单数据
const data = this.$refs.formRef.getFormData();

// 获取字段值
const value = this.$refs.formRef.getFieldValue('username');

// 设置字段值
this.$refs.formRef.setFieldValue('username', 'zhangsan');

// 批量设置字段值
this.$refs.formRef.setFieldsValue({
  username: 'zhangsan',
  email: 'zhangsan@example.com',
});

// 设置字段可见性
this.$refs.formRef.setFieldVisible('address', false);

// 设置字段禁用状态
this.$refs.formRef.setFieldDisabled('username', true);
```

---

### 3.3 JhQueryForm - 查询表单

#### 3.2.1 功能特性
1. 轻量级查询表单，专门用于表格顶部查询
2. 支持折叠/展开（默认显示 3 个字段）
3. 查询、重置、清空三个操作
4. 响应式布局（自动适配屏幕宽度）
5. 常用字段类型：text、select、date、daterange、number

#### 3.2.2 API 设计

```vue
<template>
  <jh-query-form
    ref="queryFormRef"
    :fields="fields"
    :initial-values="initialValues"
    :collapsed="true"
    :col-span="{ xs: 24, sm: 12, md: 8, lg: 6 }"
    @search="handleSearch"
    @reset="handleReset"
  >
    <!-- 自定义字段 -->
    <template #field-customField="{ value, onChange }">
      <v-text-field
        :value="value"
        @input="onChange"
        label="自定义字段"
      />
    </template>
  </jh-query-form>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'keyword',
          label: '关键词',
          type: 'text',
          placeholder: '请输入关键词',
        },
        {
          key: 'status',
          label: '状态',
          type: 'select',
          options: [
            { text: '全部', value: '' },
            { text: '激活', value: 'active' },
            { text: '禁用', value: 'inactive' },
          ],
        },
        {
          key: 'dateRange',
          label: '日期范围',
          type: 'daterange',
        },
      ],
      initialValues: {
        status: '',
      },
    };
  },
  methods: {
    handleSearch(values) {
      console.log('查询参数', values);
    },
    handleReset() {
      console.log('重置');
    },
  },
};
</script>
```

---

### 3.3 JhDrawer - 抽屉组件

#### 3.3.1 功能特性
1. 基于 v-navigation-drawer 封装
2. 支持左侧/右侧弹出
3. 内置标题、关闭按钮
4. 底部操作按钮（确定/取消）
5. 支持宽度配置（像素/百分比）
6. 支持 v-model 控制显示/隐藏

#### 3.3.2 API 设计

```vue
<template>
  <jh-drawer
    v-model="visible"
    title="编辑用户"
    :width="600"
    :footer="true"
    :loading="submitting"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <!-- 内容区域 -->
    <jh-form
      ref="formRef"
      :fields="formFields"
      :initial-data="formData"
    />
  </jh-drawer>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      submitting: false,
      formData: {},
      formFields: [
        { name: 'username', label: '用户名', type: 'text', required: true },
        { name: 'email', label: '邮箱', type: 'email', required: true },
      ],
    };
  },
  methods: {
    async handleConfirm() {
      const valid = await this.$refs.formRef.validate();
      if (!valid) return;

      this.submitting = true;
      try {
        // 提交数据
        await this.submitData();
        this.visible = false;
      } finally {
        this.submitting = false;
      }
    },
    handleCancel() {
      this.visible = false;
    },
  },
};
</script>
```

#### 3.3.3 Props 定义

```javascript
props: {
  value: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: [Number, String],
    default: 600,
  },
  placement: {
    type: String,
    default: 'right', // left / right
    validator: (v) => ['left', 'right'].includes(v),
  },
  footer: {
    type: Boolean,
    default: true,
  },
  confirmText: {
    type: String,
    default: '确定',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: true,
  },
}
```

---

### 3.4 JhModalForm - 弹窗表单

#### 3.4.1 功能特性
1. 基于 v-dialog + JhForm 组合
2. 支持新增/编辑模式自动切换
3. 内置提交/取消按钮
4. 支持异步提交和 loading 状态
5. 自动表单验证
6. 支持宽度配置

#### 3.4.2 API 设计

```vue
<template>
  <jh-modal-form
    v-model="visible"
    :title="modalTitle"
    :fields="formFields"
    :initial-values="formData"
    :width="600"
    :request="handleSubmit"
    @success="handleSuccess"
  />
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      formData: null, // null=新增, object=编辑
      formFields: [
        { name: 'username', label: '用户名', type: 'text', required: true },
        { name: 'email', label: '邮箱', type: 'email', required: true },
        { name: 'role', label: '角色', type: 'select', options: [...] },
      ],
    };
  },
  computed: {
    modalTitle() {
      return this.formData ? '编辑用户' : '新增用户';
    },
  },
  methods: {
    // 打开新增弹窗
    openAddModal() {
      this.formData = null;
      this.visible = true;
    },

    // 打开编辑弹窗
    openEditModal(record) {
      this.formData = { ...record };
      this.visible = true;
    },

    // 提交请求
    async handleSubmit(values) {
      const api = this.formData ? '/api/users/update' : '/api/users/create';
      const response = await fetch(api, {
        method: 'POST',
        body: JSON.stringify(values),
      });
      return response.json();
    },

    // 提交成功回调
    handleSuccess() {
      this.$message.success('操作成功');
      this.$refs.tableRef.reload(); // 刷新表格
    },
  },
};
</script>
```

---

### 3.5 JhDrawerForm - 抽屉表单

与 JhModalForm 类似，但使用抽屉展示，适合表单字段较多的场景。

---

### 3.6 JhDescriptions - 详情描述列表

#### 3.6.1 功能特性
1. 用于展示详情数据
2. 支持多列布局
3. 支持响应式
4. 支持插槽自定义渲染
5. 支持复制功能

#### 3.6.2 API 设计

```vue
<template>
  <jh-descriptions
    title="用户详情"
    :column="3"
    :data="userData"
    :schema="schema"
    bordered
  >
    <template #item-status="{ value }">
      <v-chip :color="value === 'active' ? 'success' : 'error'" small>
        {{ value }}
      </v-chip>
    </template>
  </jh-descriptions>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: 'zhangsan',
        email: 'zhangsan@example.com',
        phone: '13800138000',
        status: 'active',
        address: '北京市朝阳区xxx',
        createTime: '2024-01-01 12:00:00',
      },
      schema: [
        { label: '用户名', key: 'username', span: 1 },
        { label: '邮箱', key: 'email', span: 1, copyable: true },
        { label: '手机', key: 'phone', span: 1 },
        { label: '状态', key: 'status', span: 1, slot: 'item-status' },
        { label: '地址', key: 'address', span: 2 },
        { label: '创建时间', key: 'createTime', span: 1 },
      ],
    };
  },
};
</script>
```

---

### 3.7 JhDialog - 增强弹窗

#### 3.7.1 功能特性
1. 基于 v-dialog 增强
2. 支持拖拽
3. 支持全屏切换
4. 内置确定/取消按钮
5. 支持 loading 状态
6. 支持最大/最小宽高限制

#### 3.7.2 API 设计

```vue
<template>
  <jh-dialog
    v-model="visible"
    title="提示"
    :width="600"
    :footer="true"
    :draggable="true"
    :fullscreen-button="true"
    :loading="loading"
    @confirm="handleConfirm"
  >
    <p>确认执行该操作？</p>
  </jh-dialog>
</template>
```

---

### 3.8 JhCrudPage - CRUD 页面模板（P2）

#### 3.8.1 功能特性
这是一个高度封装的页面级组件，整合了：
- JhProTable
- JhModalForm / JhDrawerForm
- JhDescriptions

一个配置即可生成完整的 CRUD 页面。

#### 3.8.2 API 设计

```vue
<template>
  <jh-crud-page
    :table-config="tableConfig"
    :form-config="formConfig"
    :api-config="apiConfig"
  />
</template>

<script>
export default {
  data() {
    return {
      tableConfig: {
        columns: [...],
        searchConfig: {...},
      },
      formConfig: {
        fields: [...],
        type: 'modal', // modal / drawer
      },
      apiConfig: {
        list: '/api/users/list',
        create: '/api/users/create',
        update: '/api/users/update',
        delete: '/api/users/delete',
        detail: '/api/users/detail',
      },
    };
  },
};
</script>
```

---

### 3.9 JhPageContainer (JhProContainer) - 页面容器

参考 Ant Design Pro PageContainer 组件设计。

#### 3.9.1 功能特性

1. **页面头部 (Page Header)**
   - 页面标题 (title)
   - 页面子标题/描述 (subTitle / description)
   - 面包屑导航 (breadcrumb) - 自动或手动配置
   - 返回按钮 (backIcon / onBack)
   - 额外操作区域 (extra) - 页面级按钮插槽
   - 标签页切换 (tabs)
   - 头部固定 (fixedHeader)

2. **内容区域 (Content)**
   - 主要内容区域 (default slot)
   - 内容加载状态 (loading)
   - 空状态提示

3. **页脚区域 (Footer)**
   - 底部操作按钮区域 (footer slot)
   - 固定底部 (fixedFooter)

4. **其他特性**
   - 响应式布局
   - 自定义样式类
   - 水印支持
   - 页面级进度条

#### 3.9.2 完整 API 设计

```vue
<template>
  <jh-page-container
    title="用户管理"
    sub-title="管理系统用户的基本信息"
    :breadcrumb="breadcrumb"
    :show-back="true"
    @back="handleBack"
    :tabs="tabs"
    :tab-active-key.sync="activeTab"
    :loading="pageLoading"
    :fixed-header="true"
  >
    <!-- 页面标题右侧操作区 -->
    <template #extra>
      <v-btn color="primary" @click="handleAdd">
        <v-icon left>mdi-plus</v-icon>
        新增用户
      </v-btn>
      <v-btn color="default" class="ml-2" @click="handleExport">
        <v-icon left>mdi-download</v-icon>
        导出
      </v-btn>
    </template>

    <!-- 标签右侧额外内容 -->
    <template #tab-bar-extra>
      <v-btn icon small>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </template>

    <!-- 页面主要内容 -->
    <jh-pro-table
      :columns="columns"
      :request="fetchData"
      @selection-change="handleSelectionChange"
    />

    <!-- 页脚操作按钮 -->
    <template #footer>
      <v-btn color="primary" :disabled="selectedRows.length === 0">
        批量删除 ({{ selectedRows.length }})
      </v-btn>
    </template>
  </jh-page-container>
</template>

<script>
export default {
  data() {
    return {
      pageLoading: false,
      selectedRows: [],

      // 面包屑配置
      breadcrumb: [
        { text: '首页', to: '/', icon: 'mdi-home' },
        { text: '系统管理', to: '/system' },
        { text: '用户管理', disabled: true },
      ],

      // 标签页配置
      tabs: [
        {
          key: 'all',
          label: '全部用户',
          icon: 'mdi-account-multiple',
        },
        {
          key: 'active',
          label: '在职用户',
          badge: 120,
        },
        {
          key: 'inactive',
          label: '离职用户',
          badge: 30,
        },
      ],
      activeTab: 'all',

      columns: [...],
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    handleAdd() {
      // 新增用户
    },
    handleExport() {
      // 导出数据
    },
    handleSelectionChange({ selectedRows }) {
      this.selectedRows = selectedRows;
    },
    async fetchData(params) {
      // 加载数据
    },
  },
};
</script>
```

#### 3.9.3 Props 定义

```javascript
props: {
  // ========== 页面头部 ==========

  // 页面标题
  title: {
    type: String,
    default: '',
  },

  // 页面子标题/描述
  subTitle: {
    type: String,
    default: '',
  },

  // 页面描述 (更详细的说明文字)
  description: {
    type: String,
    default: '',
  },

  // 面包屑配置 (数组或自动生成)
  breadcrumb: {
    type: [Array, Boolean],
    default: () => [],
    // false 表示隐藏面包屑
    // [] 表示使用路由自动生成
    // 手动配置: [{ text, to, icon, disabled }]
  },

  // 是否显示返回按钮
  showBack: {
    type: Boolean,
    default: false,
  },

  // 返回按钮图标
  backIcon: {
    type: String,
    default: 'mdi-arrow-left',
  },

  // 标签页配置
  tabs: {
    type: Array,
    default: null,
    // [{ key, label, icon, badge, disabled }]
  },

  // 当前激活的标签页 key
  tabActiveKey: {
    type: String,
    default: '',
  },

  // 标签页变化事件
  tabBarExtraContent: {
    type: String,
    default: '',
  },

  // ========== 布局控制 ==========

  // 是否固定头部
  fixedHeader: {
    type: Boolean,
    default: false,
  },

  // 头部样式
  headerStyle: {
    type: Object,
    default: () => ({}),
  },

  // 内容样式
  contentStyle: {
    type: Object,
    default: () => ({}),
  },

  // 内容内边距
  contentPadding: {
    type: [String, Number],
    default: 24,
  },

  // 是否显示内容卡片背景
  contentCard: {
    type: Boolean,
    default: true,
  },

  // ========== 状态控制 ==========

  // 加载状态
  loading: {
    type: Boolean,
    default: false,
  },

  // 是否显示页面级进度条
  showProgressBar: {
    type: Boolean,
    default: false,
  },

  // ========== 页脚控制 ==========

  // 是否显示页脚
  showFooter: {
    type: Boolean,
    default: false,
  },

  // 是否固定页脚
  fixedFooter: {
    type: Boolean,
    default: false,
  },

  // 页脚样式
  footerStyle: {
    type: Object,
    default: () => ({}),
  },

  // ========== 其他 ==========

  // 水印配置
  watermark: {
    type: [Object, Boolean],
    default: false,
    // { text, fontSize, color, opacity, rotate }
  },

  // 自定义样式类
  contentClass: {
    type: String,
    default: '',
  },

  // 页面级空状态
  empty: {
    type: Boolean,
    default: false,
  },

  // 空状态文本
  emptyText: {
    type: String,
    default: '暂无数据',
  },
}
```

#### 3.9.4 Events 定义

```javascript
// 返回按钮点击
this.$emit('back');

// 标签页切换
this.$emit('tab-change', { activeKey, prevKey });

// update:tabActiveKey (支持 .sync 修饰符)
this.$emit('update:tabActiveKey', newKey);
```

#### 3.9.5 Slots 定义

```javascript
// 头部插槽
slots: {
  // 标题前面的内容 (如图标)
  'title-prefix': {},

  // 标题后面的内容 (如标签)
  'title-suffix': {},

  // 额外操作区域 (页面级按钮)
  'extra': {},

  // 标签页右侧额外内容
  'tab-bar-extra': {},

  // 自定义头部 (完全自定义)
  'header': {},

  // 主要内容区域
  'default': {},

  // 页脚操作区域
  'footer': {},
}
```

#### 3.9.6 Methods 定义

```javascript
// 刷新页面内容
this.$refs.pageContainerRef.refresh();

// 设置加载状态
this.$refs.pageContainerRef.setLoading(true);

// 切换标签页
this.$refs.pageContainerRef.setActiveTab('active');
```

#### 3.9.7 使用场景示例

##### 场景1: 标准列表页

```vue
<template>
  <jh-page-container
    title="商品列表"
    :breadcrumb="breadcrumb"
    :tabs="tabs"
    :tab-active-key.sync="activeTab"
  >
    <template #extra>
      <v-btn color="primary" @click="handleAdd">
        <v-icon left>mdi-plus</v-icon>
        新增商品
      </v-btn>
    </template>

    <jh-pro-table
      :columns="columns"
      :request="fetchProducts"
    />
  </jh-page-container>
</template>
```

##### 场景2: 详情页 (带返回)

```vue
<template>
  <jh-page-container
    title="用户详情"
    :sub-title="`ID: ${userData.id}`"
    :breadcrumb="breadcrumb"
    :show-back="true"
    @back="handleBack"
    :loading="loading"
  >
    <template #extra>
      <v-btn color="primary" @click="handleEdit">
        <v-icon left>mdi-pencil</v-icon>
        编辑
      </v-btn>
      <v-btn color="error" text class="ml-2" @click="handleDelete">
        <v-icon left>mdi-delete</v-icon>
        删除
      </v-btn>
    </template>

    <v-row>
      <v-col cols="12" md="8">
        <jh-pro-card title="基本信息">
          <jh-descriptions
            :data="userData"
            :schema="userSchema"
            :column="2"
          />
        </jh-pro-card>
      </v-col>

      <v-col cols="12" md="4">
        <jh-pro-card title="操作记录">
          <jh-timeline :items="operationLogs" />
        </jh-pro-card>
      </v-col>
    </v-row>
  </jh-page-container>
</template>
```

##### 场景3: 表单页 (带底部操作)

```vue
<template>
  <jh-page-container
    title="创建订单"
    :breadcrumb="breadcrumb"
    :show-back="true"
    :show-footer="true"
    :fixed-footer="true"
  >
    <jh-steps-form
      ref="stepsFormRef"
      :steps="steps"
    >
      <!-- 步骤表单内容 -->
    </jh-steps-form>

    <template #footer>
      <v-btn text @click="handleCancel">
        取消
      </v-btn>
      <v-btn
        color="primary"
        class="ml-2"
        :loading="submitting"
        @click="handleSubmit"
      >
        提交订单
      </v-btn>
    </template>
  </jh-page-container>
</template>
```

##### 场景4: 带水印的页面

```vue
<template>
  <jh-page-container
    title="机密文档管理"
    :breadcrumb="breadcrumb"
    :watermark="{
      text: userInfo.name,
      fontSize: 16,
      color: 'rgba(0,0,0,.15)',
      opacity: 0.5,
      rotate: -22,
    }"
  >
    <!-- 页面内容 -->
  </jh-page-container>
</template>
```

##### 场景5: 固定头部和底部

```vue
<template>
  <jh-page-container
    title="数据统计"
    :breadcrumb="breadcrumb"
    :tabs="tabs"
    :tab-active-key.sync="activeTab"
    :fixed-header="true"
    :show-footer="true"
    :fixed-footer="true"
  >
    <!-- 可滚动的长内容 -->
    <div style="height: 2000px;">
      长内容区域...
    </div>

    <template #footer>
      <div class="d-flex justify-space-between align-center">
        <span>已选择 {{ selectedCount }} 项</span>
        <div>
          <v-btn text>取消</v-btn>
          <v-btn color="primary" class="ml-2">确认</v-btn>
        </div>
      </div>
    </template>
  </jh-page-container>
</template>
```

##### 场景6: 空状态页面

```vue
<template>
  <jh-page-container
    title="我的收藏"
    :breadcrumb="breadcrumb"
    :empty="favorites.length === 0"
    empty-text="您还没有收藏任何内容"
  >
    <template v-if="favorites.length > 0">
      <!-- 收藏列表 -->
    </template>
  </jh-page-container>
</template>
```

#### 3.9.8 样式定制

```vue
<template>
  <jh-page-container
    title="自定义样式页面"
    :header-style="{ background: 'linear-gradient(to right, #667eea, #764ba2)' }"
    :content-style="{ background: '#f5f5f5' }"
    :content-padding="16"
    content-class="custom-content"
  >
    <!-- 内容 -->
  </jh-page-container>
</template>

<style scoped>
.custom-content {
  min-height: 500px;
}
</style>
```

#### 3.9.9 实现要点

1. **面包屑自动生成**
   - 如果 `breadcrumb` 为空数组,从路由配置自动生成
   - 支持路由 meta 中定义面包屑信息

2. **头部固定**
   - 使用 `position: sticky` 或 `position: fixed`
   - 滚动时保持头部可见

3. **响应式设计**
   - 移动端自动调整布局
   - 标签页在小屏幕下可横向滚动

4. **性能优化**
   - 虚拟滚动支持 (内容过长时)
   - 懒加载标签页内容

5. **无障碍支持**
   - 正确的 ARIA 标签
   - 键盘导航支持

---

### 3.10 JhProCard - 高级卡片

#### 3.10.1 功能特性
1. 基于 v-card 增强
2. 支持分栏布局（响应式）
3. 支持 Tabs 切换
4. 支持折叠/展开
5. 支持加载状态
6. 支持悬浮阴影效果

#### 3.10.2 API 设计

```vue
<template>
  <!-- 分栏卡片 -->
  <jh-pro-card :split="'vertical'">
    <jh-pro-card title="左侧内容" :col-span="8">
      左侧内容
    </jh-pro-card>
    <jh-pro-card title="右侧内容" :col-span="16">
      右侧内容
    </jh-pro-card>
  </jh-pro-card>

  <!-- 带 Tabs 的卡片 -->
  <jh-pro-card
    :tabs="cardTabs"
    :tab-active-key.sync="activeCardTab"
  >
    <template v-if="activeCardTab === 'info'">
      基本信息
    </template>
    <template v-else>
      详细信息
    </template>
  </jh-pro-card>

  <!-- 可折叠卡片 -->
  <jh-pro-card
    title="可折叠卡片"
    :collapsible="true"
    :default-collapsed="false"
  >
    内容区域
  </jh-pro-card>
</template>
```

---

### 3.11 JhProFormList - 动态表单项

#### 3.11.1 功能特性
1. 支持动态增加/删除表单项
2. 支持最大/最小数量限制
3. 支持拖拽排序
4. 支持复制表单项
5. 支持自定义操作按钮

#### 3.11.2 API 设计

```vue
<template>
  <jh-pro-form>
    <jh-pro-form-list
      name="members"
      label="团队成员"
      :min="1"
      :max="10"
      :initial-value="[{}]"
    >
      <template #default="{ index }">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="formData.members[index].name"
              label="姓名"
              outlined
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="formData.members[index].email"
              label="邮箱"
              outlined
            />
          </v-col>
        </v-row>
      </template>
    </jh-pro-form-list>
  </jh-pro-form>
</template>
```

---

### 3.12 JhProFormDependency - 字段依赖

#### 3.12.1 功能特性
1. 监听指定字段变化
2. 根据字段值动态显示/隐藏其他字段
3. 根据字段值动态修改其他字段配置（如选项列表）
4. 支持复杂的联动逻辑

#### 3.12.2 API 设计

```vue
<template>
  <jh-pro-form ref="formRef" :fields="formFields">
    <jh-pro-form-dependency :watch="['type']">
      <template #default="{ values }">
        <!-- 当 type 为 'company' 时显示公司相关字段 -->
        <v-text-field
          v-if="values.type === 'company'"
          v-model="formData.companyName"
          label="公司名称"
          outlined
        />
        <!-- 当 type 为 'personal' 时显示个人相关字段 -->
        <v-text-field
          v-else-if="values.type === 'personal'"
          v-model="formData.personalId"
          label="身份证号"
          outlined
        />
      </template>
    </jh-pro-form-dependency>
  </jh-pro-form>
</template>
```

---

### 3.13 JhEditableTable - 可编辑表格

#### 3.13.1 功能特性
1. 基于 JhProTable 扩展
2. 支持单元格内联编辑
3. 支持整行编辑
4. 支持新增/删除行
5. 支持表单验证
6. 支持批量保存

#### 3.13.2 API 设计

```vue
<template>
  <jh-editable-table
    ref="editableTableRef"
    :columns="columns"
    :value="dataSource"
    :editable-config="editableConfig"
    @save="handleSave"
  >
    <template #toolbar-actions>
      <v-btn color="primary" @click="handleAddRow">
        <v-icon left>mdi-plus</v-icon>
        新增行
      </v-btn>
    </template>
  </jh-editable-table>
</template>

<script>
export default {
  data() {
    return {
      dataSource: [],
      columns: [
        {
          key: 'name',
          title: '姓名',
          dataIndex: 'name',
          editable: true,
          editType: 'text',
          rules: [{ required: true, message: '请输入姓名' }],
        },
        {
          key: 'age',
          title: '年龄',
          dataIndex: 'age',
          editable: true,
          editType: 'number',
        },
        {
          key: 'status',
          title: '状态',
          dataIndex: 'status',
          editable: true,
          editType: 'select',
          options: [
            { text: '在职', value: 'active' },
            { text: '离职', value: 'inactive' },
          ],
        },
      ],
      editableConfig: {
        type: 'multiple', // single / multiple
        saveMode: 'manual', // manual / auto
      },
    };
  },
  methods: {
    handleAddRow() {
      this.$refs.editableTableRef.addRow({
        name: '',
        age: '',
        status: 'active',
      });
    },
    async handleSave(rows) {
      // 保存数据
      console.log('保存的行', rows);
    },
  },
};
</script>
```

---

### 3.14 JhStepsForm - 分步表单

#### 3.14.1 功能特性
1. 多步骤表单向导
2. 支持步骤跳转
3. 支持步骤验证
4. 支持当前步骤数据保存
5. 支持最终提交

#### 3.14.2 API 设计

```vue
<template>
  <jh-steps-form
    ref="stepsFormRef"
    :steps="steps"
    @finish="handleFinish"
  >
    <!-- 步骤1：基本信息 -->
    <template #step-1>
      <jh-pro-form
        ref="step1FormRef"
        :fields="step1Fields"
        :initial-data="formData.step1"
      />
    </template>

    <!-- 步骤2：详细信息 -->
    <template #step-2>
      <jh-pro-form
        ref="step2FormRef"
        :fields="step2Fields"
        :initial-data="formData.step2"
      />
    </template>

    <!-- 步骤3：确认信息 -->
    <template #step-3>
      <jh-descriptions
        :data="allFormData"
        :schema="descriptionSchema"
      />
    </template>
  </jh-steps-form>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        { title: '基本信息', slot: 'step-1' },
        { title: '详细信息', slot: 'step-2' },
        { title: '确认信息', slot: 'step-3' },
      ],
      formData: {
        step1: {},
        step2: {},
      },
    };
  },
  methods: {
    async handleFinish(values) {
      // 提交所有步骤的数据
      console.log('完成', values);
    },
  },
};
</script>
```

---

### 3.15 JhProLayout - 高级布局

#### 3.15.1 功能特性
1. 标准中后台布局（侧边栏 + 顶栏 + 内容区）
2. 支持菜单配置（路由自动生成菜单）
3. 支持菜单折叠/展开
4. 支持顶部面包屑
5. 支持用户信息展示
6. 支持主题切换
7. 响应式布局（移动端自动切换为抽屉菜单）

#### 3.15.2 API 设计

```vue
<template>
  <jh-pro-layout
    :menu-data="menuData"
    :user-info="userInfo"
    :logo="logo"
    :title="title"
    :theme="theme"
    @logout="handleLogout"
  >
    <router-view />
  </jh-pro-layout>
</template>

<script>
export default {
  data() {
    return {
      logo: '/logo.png',
      title: '江湖管理系统',
      theme: 'light', // light / dark
      menuData: [
        {
          path: '/dashboard',
          name: 'dashboard',
          title: '仪表盘',
          icon: 'mdi-view-dashboard',
        },
        {
          path: '/system',
          name: 'system',
          title: '系统管理',
          icon: 'mdi-cog',
          children: [
            {
              path: '/system/user',
              name: 'user',
              title: '用户管理',
            },
            {
              path: '/system/role',
              name: 'role',
              title: '角色管理',
            },
          ],
        },
      ],
      userInfo: {
        name: '张三',
        avatar: '/avatar.png',
        email: 'zhangsan@example.com',
      },
    };
  },
  methods: {
    handleLogout() {
      // 退出登录
    },
  },
};
</script>
```

---

### 3.16 其他辅助组件简述

#### JhStatisticCard - 统计卡片
用于 Dashboard 展示统计数据，支持趋势、百分比、图标等。

#### JhCheckCard - 多选卡片
用于多选场景，如选择套餐、选择主题等，提供卡片式的多选体验。

#### JhWaterMark - 水印
为页面添加水印，防止截图泄密，支持文字水印、图片水印。

#### JhSkeleton - 骨架屏
数据加载时显示骨架屏，提升用户体验。

#### JhProField - 原子字段
统一的字段渲染组件，根据类型自动选择渲染方式（文本、日期、金额等）。

#### JhSchemaForm - JSON Schema 表单
通过 JSON Schema 配置生成表单，适合动态表单场景。

#### JhLoginForm - 登录表单
开箱即用的登录页面，支持账号密码、手机验证码、扫码登录等模式。

#### JhDragSortTable - 拖拽排序表格
支持拖拽行排序的表格，适合优先级、顺序调整场景。

#### JhProList - 高级列表
列表视图，支持卡片、列表两种模式，集成搜索、筛选、分页。

---

## 四、实施计划

按照 P0 → P1 → P2 优先级分阶段实施，确保核心功能优先交付。

### 4.1 Phase 1 - P0 核心组件（3-4周）

**目标**：交付最核心的 CRUD 业务组件，满足 80% 的日常开发需求。

**Week 1: 基础容器与布局**
- [x] ✅ JhPageContainer (JhProContainer) - 页面容器，包含标题、面包屑、标签页、返回按钮、额外操作区、页脚等完整功能（2天）
- [x] ✅ JhDrawer - 抽屉（2天）
- [ ] JhDialog - 增强弹窗（1天）

**Week 2: 表单组件**
- [x] ✅ JhProForm - 高级表单基础版（3天）
- [ ] JhQueryForm - 查询表单（2天）
- [ ] JhModalForm - 弹窗表单（2天）

**Week 3: 表格组件**
- [x] ✅ JhProTable - 高级表格（5天）
  - 基础表格 + 服务端分页
  - 工具栏（搜索、刷新、列设置）
  - 操作列
  - 集成 JhQueryForm

**Week 4: 完善 P0 组件**
- [ ] JhDrawerForm - 抽屉表单（2天）
- [ ] JhDescriptions - 详情描述（2天）
- [ ] P0 组件 Stories + 文档（3天）

### 4.2 Phase 2 - P1 增强组件（2-3周）

**目标**：增强表单能力，补充布局和高级表格功能。

**Week 5: 高级表单**
- [ ] JhProFormFields - 高级表单字段（3天）
  - 日期范围选择器
  - 级联选择器
  - 树选择器
- [ ] JhProFormList - 动态表单项（2天）
- [ ] JhProFormDependency - 字段依赖（2天）

**Week 6: 布局与高级表格**
- [x] ✅ JhProLayout - 高级布局（3天）
- [ ] JhProCard - 高级卡片（2天）
- [ ] JhEditableTable - 可编辑表格（2天）

**Week 7: 分步表单与完善**
- [ ] JhStepsForm - 分步表单（3天）
- [ ] P1 组件 Stories + 文档（2天）
- [ ] 集成测试与 Bug 修复（2天）

### 4.3 Phase 3 - P2 扩展组件（2周）

**目标**：补充辅助组件和高级功能，提升用户体验。

**Week 8: 辅助组件**
- [ ] JhStatisticCard - 统计卡片（1天）
- [ ] JhCheckCard - 多选卡片（1天）
- [ ] JhWaterMark - 水印（1天）
- [ ] JhSkeleton - 骨架屏（1天）
- [ ] JhProField - 原子字段（1天）

**Week 9: 高级功能**
- [ ] JhDragSortTable - 拖拽排序表格（2天）
- [ ] JhProList - 高级列表（2天）
- [ ] JhSchemaForm - JSON Schema 表单（选做）（2天）
- [ ] JhLoginForm - 登录表单（选做）（1天）

### 4.4 Phase 4 - 测试、优化与发布（1-2周）

**Week 10-11: 质量保障**
- [ ] 单元测试（所有组件 80% 覆盖率）（3天）
- [ ] 在 test/jianghu-project 中集成测试（2天）
- [ ] 性能优化（虚拟滚动、懒加载）（2天）
- [ ] 浏览器兼容性测试（1天）
- [ ] 文档完善和示例补充（2天）
- [ ] CDN 构建和发布准备（2天）

**总工期**：10-12 周

**里程碑**：
- **M1（Week 4）**：P0 组件交付，可支持基本 CRUD 开发
- **M2（Week 7）**：P1 组件交付，支持复杂表单和布局
- **M3（Week 9）**：P2 组件交付，功能完整
- **M4（Week 11）**：正式发布 v1.0

---

## 五、技术实现细节

### 5.1 Tailwind CSS 集成策略

#### 5.1.1 样式优先级
1. **Vuetify 原生样式**：保持 Vuetify 组件的原生样式不变
2. **Tailwind 工具类**：用于布局、间距、响应式等场景
3. **Scoped CSS**：用于组件特有的复杂样式

#### 5.1.2 使用场景

```vue
<template>
  <!-- 使用 Tailwind 进行布局和间距 -->
  <div class="flex items-center justify-between p-4 mb-6">
    <!-- Vuetify 组件保持原生 -->
    <v-btn color="primary" @click="handleClick">
      操作按钮
    </v-btn>

    <!-- Tailwind 处理响应式和间距 -->
    <div class="hidden md:flex space-x-4">
      <v-chip class="mx-2">标签1</v-chip>
      <v-chip class="mx-2">标签2</v-chip>
    </div>
  </div>
</template>

<style scoped>
/* 复杂的组件特有样式使用 scoped CSS */
.custom-table-header {
  background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
}
</style>
```

#### 5.1.3 常用 Tailwind 类

**布局类**：
- `flex`, `grid`, `block`, `inline-block`
- `flex-row`, `flex-col`, `items-center`, `justify-between`
- `gap-4`, `space-x-2`, `space-y-4`

**间距类**：
- `p-4`, `px-6`, `py-2`, `m-4`, `mx-auto`
- `mt-2`, `mb-4`, `ml-2`, `mr-2`

**响应式**：
- `hidden md:block` - 中等屏幕及以上显示
- `sm:w-1/2 lg:w-1/3` - 响应式宽度
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - 响应式栅格

**文本样式**：
- `text-sm`, `text-base`, `text-lg`
- `font-bold`, `font-medium`, `font-normal`
- `text-gray-600`, `text-primary`

**注意事项**：
- 避免覆盖 Vuetify 的核心样式
- 优先使用 Vuetify 的 grid 系统（v-row/v-col），Tailwind 作为补充
- 主题色使用 Vuetify 的 color props，不用 Tailwind 颜色类

### 5.2 状态管理
组件内部使用 Vue 2.7 Composition API：
```javascript
import { ref, computed, watch } from 'vue';

export default {
  setup(props, { emit }) {
    const tableData = ref([]);
    const loading = ref(false);

    const fetchData = async () => {
      loading.value = true;
      try {
        const response = await props.request();
        tableData.value = response.data;
      } finally {
        loading.value = false;
      }
    };

    return {
      tableData,
      loading,
      fetchData,
    };
  },
};
```

### 5.3 服务端分页实现
```javascript
// JhProTable 内部实现
async function reload() {
  if (!props.request) return;

  loading.value = true;
  try {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      sorter: sorter.value,
      filters: filters.value,
      search: searchValues.value,
    };

    const response = await props.request(params);

    if (response.success) {
      tableData.value = response.data;
      pagination.total = response.total;
    }
  } finally {
    loading.value = false;
  }
}
```

### 5.4 列设置持久化
使用 localStorage 保存用户的列显示/隐藏配置：
```javascript
const STORAGE_KEY = 'jh-pro-table-columns';

function saveColumnSettings(tableId, columns) {
  const settings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  settings[tableId] = columns.map(col => ({
    key: col.key,
    visible: col.visible,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function loadColumnSettings(tableId) {
  const settings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return settings[tableId] || [];
}
```

### 5.5 插槽与配置混合使用
```vue
<!-- JhProTable 内部实现 -->
<template>
  <v-data-table>
    <!-- 操作列 -->
    <template #item.action="{ item }">
      <!-- 优先使用插槽 -->
      <slot v-if="$scopedSlots.action" name="action" :row="item" />

      <!-- 否则使用配置 -->
      <div v-else-if="actionColumn && actionColumn.buttons">
        <v-btn
          v-for="btn in actionColumn.buttons"
          :key="btn.text"
          :color="btn.color"
          text
          small
          @click="handleActionClick(btn, item)"
        >
          {{ btn.text }}
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>
```

---

## 六、质量保障

### 6.1 代码规范
- ESLint + Prettier 统一代码风格
- 组件命名：PascalCase
- Props 命名：camelCase
- Events 命名：kebab-case

### 6.2 测试策略
1. **单元测试**（Jest + Vue Test Utils）
   - 每个组件至少 80% 覆盖率
   - 重点测试 Props、Events、Methods

2. **集成测试**
   - 在 test/jianghu-project 中测试实际集成
   - 测试与后端 API 交互

3. **手动测试**
   - Storybook 手动测试各种场景
   - 浏览器兼容性测试

### 6.3 文档要求
1. 每个组件必须包含 Storybook Stories
2. Stories 中包含：
   - 基础用法示例
   - 高级功能示例
   - API 文档（autodocs）
3. CLAUDE.md 更新组件使用说明

---

## 七、风险与应对

### 7.1 技术风险

| 风险项 | 可能性 | 影响 | 应对措施 |
|-------|-------|------|---------|
| Vuetify 2 功能限制 | 中 | 中 | 研究 Vuetify API，必要时自行实现 |
| 性能问题（大数据量） | 中 | 高 | 虚拟滚动、分页、懒加载 |
| 浏览器兼容性 | 低 | 中 | Babel 转译，Polyfill |
| CDN 加载慢 | 低 | 中 | 国内 CDN 镜像、懒加载 |

### 7.2 进度风险
- **风险**：功能设计过于复杂，开发周期延长
- **应对**：严格按照 P0/P1/P2 优先级开发，P2 功能可选

### 7.3 兼容性风险
- **风险**：与现有江湖项目集成时出现冲突
- **应对**：
  1. 早期在 test/jianghu-project 中集成测试
  2. 保持 API 简洁，减少副作用
  3. 样式使用 scoped，避免全局污染

---

## 八、后续演进方向

### 8.1 Vue 3 升级路径
当江湖项目升级到 Vue 3 时：
1. 利用 Vue 2.7 Composition API 语法，降低迁移成本
2. Vuetify 2 → Vuetify 3 升级
3. 组件 API 保持稳定，内部实现调整

### 8.2 更多业务组件
- JhStepForm - 分步表单
- JhEditableTable - 可编辑表格
- JhTreeTable - 树形表格
- JhImportExport - 导入导出
- JhChartCard - 图表卡片

### 8.3 主题定制
- 提供主题配置系统
- 支持暗黑模式
- 组件级别样式覆盖

---

## 九、附录

### 9.1 Ant Design Pro 完整组件对比

#### 布局组件

| Ant Design Pro | JianghuJS UI | 优先级 | 备注 |
|---------------|--------------|-------|------|
| ProLayout | JhProLayout | P1 | 标准中后台布局 |
| PageContainer | JhPageContainer (JhProContainer) | P0 | 页面容器，提供标题、面包屑、标签页、返回按钮、额外操作区、页脚等完整功能 |
| ProCard | JhProCard | P1 | 高级卡片，支持分栏/Tab/折叠 |
| StatisticCard | JhStatisticCard | P2 | 统计卡片 |
| CheckCard | JhCheckCard | P2 | 多选卡片 |
| WaterMark | JhWaterMark | P2 | 水印组件 |

#### 数据录入组件

| Ant Design Pro | JianghuJS UI | 优先级 | 备注 |
|---------------|--------------|-------|------|
| ProForm | JhProForm | P0 | 高级表单 |
| QueryFilter / LightFilter | JhQueryForm | P0 | 查询/筛选表单 |
| ModalForm | JhModalForm | P0 | 弹窗表单 |
| DrawerForm | JhDrawerForm | P0 | 抽屉表单 |
| StepsForm | JhStepsForm | P1 | 分步表单 |
| SchemaForm | JhSchemaForm | P2 | JSON Schema 表单 |
| LoginForm/Page | JhLoginForm | P2 | 登录表单页 |
| ProFormFields | JhProFormFields | P1 | 高级表单字段 |
| ProFormList | JhProFormList | P1 | 动态表单项 |
| ProFormDependency | JhProFormDependency | P1 | 字段依赖 |

#### 数据展示组件

| Ant Design Pro | JianghuJS UI | 优先级 | 备注 |
|---------------|--------------|-------|------|
| ProTable | JhProTable | P0 | 高级表格 |
| EditableProTable | JhEditableTable | P1 | 可编辑表格 |
| DragSortTable | JhDragSortTable | P2 | 拖拽排序表格 |
| ProList | JhProList | P2 | 高级列表 |
| ProDescriptions | JhDescriptions | P1 | 详情描述列表 |

#### 通用组件

| Ant Design Pro | JianghuJS UI | 优先级 | 备注 |
|---------------|--------------|-------|------|
| ProField | JhProField | P2 | 原子字段组件 |
| ProSkeleton | JhSkeleton | P2 | 骨架屏 |
| - | JhDrawer | P1 | 抽屉（基础增强） |
| - | JhDialog | P1 | 弹窗（基础增强） |

**组件总数统计**：
- **P0 组件**：8 个（核心 CRUD 组件）
- **P1 组件**：10 个（增强功能组件）
- **P2 组件**：9 个（扩展辅助组件）
- **总计**：27 个组件

### 9.2 参考资料
- [Ant Design Pro Components](https://procomponents.ant.design/)
- [Vuetify 2.x Documentation](https://v2.vuetifyjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vue 2.7 Composition API](https://blog.vuejs.org/posts/vue-2-7-naruto.html)
- [Storybook 7 Documentation](https://storybook.js.org/)

---

## 十、总结

本方案以 **提升开发效率** 为核心目标，参考 Ant Design Pro 的设计理念，在 **Vue 2.7 + Vuetify 2.x + Tailwind CSS** 技术栈下，构建一套完整的企业级业务组件库。

### 核心亮点

1. **完整的组件体系**
   - 27 个组件，覆盖布局、表单、表格、通用 4 大类
   - 对标 Ant Design Pro，提供同等丰富度
   - 分 P0/P1/P2 三级优先级，确保核心功能优先交付

2. **配置化开发**
   - 通过 JSON 配置快速搭建 CRUD 页面
   - 支持服务端分页、查询表单、操作列等常见场景
   - 减少重复代码 60% 以上

3. **灵活扩展**
   - 插槽系统保留高度灵活性
   - 配置与插槽混合使用，兼顾效率与定制
   - 支持字段依赖、动态表单等复杂场景

4. **现代化技术栈**
   - Vue 2.7 Composition API，降低未来迁移成本
   - Vuetify 2.x 提供企业级 UI 基础
   - Tailwind CSS 提供原子化样式能力
   - Storybook 7 提供完整文档和示例

5. **开箱即用**
   - CDN 引入，零配置使用
   - 与 JianghuJS 项目无缝集成
   - 完整的 TypeScript 类型提示（可选）

### 实施建议

1. **严格按优先级开发**
   - **M1（4周）**：P0 组件交付，满足 80% 日常需求
   - **M2（7周）**：P1 组件交付，支持复杂场景
   - **M3（9周）**：P2 组件交付，功能完整
   - **M4（11周）**：正式发布 v1.0

2. **质量优先**
   - 每个组件必须包含 Storybook Stories
   - 单元测试覆盖率 80% 以上
   - 早期在 test/jianghu-project 中集成验证
   - 持续进行性能优化和浏览器兼容性测试

3. **文档先行**
   - API 设计评审通过后再编码
   - 开发过程中同步更新文档
   - 提供丰富的示例代码

### 预期收益

- **开发效率提升**：通过配置化开发，减少 60% 重复代码
- **代码质量提升**：统一的组件规范，减少 Bug 和维护成本
- **学习成本降低**：与 Ant Design Pro 对标，降低新人学习成本
- **项目一致性**：统一的 UI 交互，提升用户体验

### 下一步行动

1. **确认方案**：请您审阅本方案，提出调整建议
2. **技术预研**：Tailwind CSS 集成、Vuetify 2 能力边界探索
3. **开发环境准备**：配置 ESLint、Prettier、测试框架
4. **启动 Phase 1**：开始 P0 组件开发

期待您的反馈和建议！
