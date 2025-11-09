# JianghuJS UI 快速参考手册

> **说明**: 快速查找常用代码片段和配置示例

## 📋 目录

- [JhTable 快速参考](#jhtable-快速参考)
- [JhForm 快速参考](#jhform-快速参考)
- [JhDescriptions 快速参考](#jhdescriptions-快速参考)
- [JhLayout 快速参考](#jhlayout-快速参考)
- [常用代码片段](#常用代码片段)

---

## JhTable 快速参考

### 基础表格
```vue
<jh-table
  :headers="headers"
  :items="items"
/>
```

### 服务端分页
```vue
<jh-table
  :headers="headers"
  :request="fetchData"
  :pagination="{ pageSize: 20 }"
/>
```

```javascript
async fetchData(params) {
  // params: { page, pageSize, search, sorter, filters }
  const response = await api.getData(params);
  return {
    data: response.list,
    total: response.total,
    success: true
  };
}
```

### 带工具栏和筛选
```vue
<jh-table
  header-title="用户列表"
  :headers="headers"
  :request="fetchData"
  :show-filter="true"
  :filter-fields="filterFields"
>
  <template #toolbar-actions>
    <v-btn color="success" @click="handleCreate">
      <v-icon left>mdi-plus</v-icon>
      新增
    </v-btn>
  </template>
</jh-table>
```

### 行选择和批量操作
```vue
<jh-table
  :show-select="true"
  @selection-change="handleSelectionChange"
>
  <template #alert-actions="{ selectedRows }">
    <v-btn small text color="error" @click="handleBatchDelete(selectedRows)">
      批量删除
    </v-btn>
  </template>
</jh-table>
```

### 操作列配置
```javascript
actionColumn: {
  title: '操作',
  width: 180,
  fixed: 'right',
  buttons: [
    {
      text: '编辑',
      type: 'link',
      icon: 'mdi-pencil',
      color: 'primary',
      onClick: (row) => this.handleEdit(row)
    },
    {
      text: '删除',
      type: 'link',
      icon: 'mdi-delete',
      color: 'error',
      confirm: '确认删除？',
      onClick: (row) => this.handleDelete(row)
    }
  ]
}
```

### 自定义列渲染
```vue
<template #item.status="{ item }">
  <v-chip :color="item.status === '启用' ? 'success' : 'error'" small>
    {{ item.status }}
  </v-chip>
</template>
```

### 表头配置示例
```javascript
headers: [
  { text: 'ID', value: 'id', width: 80 },
  { text: '用户名', value: 'username', copyable: true },
  { text: '邮箱', value: 'email', ellipsis: true, copyable: true },
  { text: '状态', value: 'status', width: 100 },
  { text: '创建时间', value: 'createdAt' }
]
```

### 筛选字段配置
```javascript
filterFields: [
  { key: 'username', label: '用户名', type: 'text' },
  { 
    key: 'status', 
    label: '状态', 
    type: 'select',
    options: [
      { text: '启用', value: 'active' },
      { text: '禁用', value: 'inactive' }
    ]
  },
  { key: 'dateRange', label: '日期范围', type: 'daterange' }
]
```

---

## JhForm 快速参考

### 基础表单
```vue
<jh-form
  :fields="fields"
  :initial-data="formData"
  @submit="handleSubmit"
>
  <template #actions="{ validate, resetForm }">
    <v-btn @click="resetForm">重置</v-btn>
    <v-btn color="primary" @click="validate">提交</v-btn>
  </template>
</jh-form>
```

### 字段类型示例
```javascript
fields: [
  // 文本输入
  {
    key: 'username',
    label: '用户名',
    type: 'text',
    placeholder: '请输入用户名',
    required: true
  },
  
  // 数字输入
  {
    key: 'age',
    label: '年龄',
    type: 'number',
    rules: [v => v >= 18 || '年龄必须大于18岁']
  },
  
  // 下拉选择
  {
    key: 'role',
    label: '角色',
    type: 'select',
    options: [
      { text: '管理员', value: 'admin' },
      { text: '用户', value: 'user' }
    ],
    required: true
  },
  
  // 日期选择
  {
    key: 'birthday',
    label: '生日',
    type: 'date'
  },
  
  // 单选按钮
  {
    key: 'gender',
    label: '性别',
    type: 'radio',
    options: [
      { text: '男', value: 'male' },
      { text: '女', value: 'female' }
    ]
  },
  
  // 开关
  {
    key: 'enabled',
    label: '启用',
    type: 'switch',
    defaultValue: true
  },
  
  // 多行文本
  {
    key: 'description',
    label: '描述',
    type: 'textarea',
    rows: 4,
    cols: { md: 12 }
  }
]
```

### 字段分组
```javascript
fields: [
  { type: 'group', title: '基本信息' },
  { key: 'name', label: '姓名', type: 'text' },
  { key: 'email', label: '邮箱', type: 'text' },
  
  { type: 'group', title: '账户设置', divider: true },
  { key: 'username', label: '用户名', type: 'text' },
  { key: 'password', label: '密码', type: 'text', props: { type: 'password' } }
]
```

### 字段联动
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
    visible: (formData) => formData.userType === 'personal'
  },
  {
    key: 'companyName',
    label: '公司名称',
    type: 'text',
    visible: (formData) => formData.userType === 'company'
  }
]
```

### 响应式布局
```javascript
fields: [
  {
    key: 'field1',
    label: '字段1',
    type: 'text',
    cols: {
      xs: 12,  // 手机全宽
      sm: 6,   // 平板半宽
      md: 4,   // 桌面1/3宽
      lg: 3    // 大屏1/4宽
    }
  }
]
```

### 自定义验证
```javascript
{
  key: 'password',
  label: '密码',
  type: 'text',
  rules: [
    v => !!v || '密码不能为空',
    v => (v && v.length >= 8) || '密码至少8位',
    v => /[A-Z]/.test(v) || '密码必须包含大写字母'
  ]
}
```

---

## JhDescriptions 快速参考

### 基础用法
```vue
<jh-descriptions
  title="用户信息"
  :columns="columns"
  :data-source="dataSource"
  :column="3"
  bordered
/>
```

### 列配置示例
```javascript
columns: [
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true
  },
  {
    title: '金额',
    dataIndex: 'amount',
    valueType: 'money'
  },
  {
    title: '日期',
    dataIndex: 'date',
    valueType: 'dateTime'
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'option',
    valueEnum: {
      active: '启用',
      inactive: '禁用'
    }
  }
]
```

### 可编辑模式
```vue
<jh-descriptions
  title="个人信息"
  :columns="columns"
  :data-source="dataSource"
  :editable="true"
  @save="handleSave"
/>
```

### 异步加载
```vue
<jh-descriptions
  :columns="columns"
  :request="fetchDetail"
  :params="{ id: userId }"
/>
```

```javascript
async fetchDetail(params) {
  const response = await api.getDetail(params.id);
  return response.data;
}
```

### 自定义渲染
```vue
<jh-descriptions :columns="columns" :data-source="dataSource">
  <template #item-avatar="{ value }">
    <img :src="value" style="width: 48px; height: 48px; border-radius: 50%;" />
  </template>
</jh-descriptions>
```

---

## JhLayout 快速参考

### 基础用法
```vue
<jh-layout
  title="管理系统"
  logo="mdi-view-dashboard"
  :menu-data="menuData"
  :current-path="currentPath"
  content-background="#f5f5f5"
  show-settings
  @menu-click="handleMenuClick"
  @logout="handleLogout"
>
  <v-container>
    <!-- 页面内容 -->
  </v-container>
</jh-layout>
```

### 菜单数据结构
```javascript
menuData: [
  {
    name: '工作台',
    path: '/dashboard',
    icon: 'mdi-view-dashboard'
  },
  {
    name: '用户管理',
    icon: 'mdi-account-group',
    children: [
      {
        name: '用户列表',
        path: '/users/list',
        icon: 'mdi-account-multiple'
      },
      {
        name: '角色管理',
        path: '/users/roles',
        icon: 'mdi-shield-account'
      }
    ]
  }
]
```

### 用户信息和菜单
```vue
<jh-layout
  :user-info="{ 
    username: '管理员', 
    userId: 'admin',
    roles: ['超级管理员']
  }"
  :avatar-menu-list="[
    { name: '个人中心', icon: 'mdi-account-circle', path: '/profile' },
    { name: '账户设置', icon: 'mdi-cog', path: '/settings' }
  ]"
  :show-avatar="true"
  @logout="handleLogout"
/>
```

### 右侧菜单
```vue
<jh-layout
  :right-menu-list="[
    { title: '帮助中心', icon: 'mdi-help-circle', id: 'help' },
    { title: '消息通知', icon: 'mdi-bell', id: 'notification' }
  ]"
/>
```

### 自定义 Logo
```vue
<jh-layout>
  <template v-slot:logo>
    <div class="d-flex align-center">
      <v-avatar color="primary" size="32" class="mr-2">
        <span class="white--text">JH</span>
      </v-avatar>
      <span class="text-h6">JianghuJS</span>
    </div>
  </template>
</jh-layout>
```

### 设置面板
```vue
<jh-layout
  :show-settings="true"
  :content-background.sync="contentBg"
  :show-avatar.sync="showAvatar"
>
  <!-- 启用设置按钮，用户可以实时调整布局配置 -->
</jh-layout>
```

---

## 常用代码片段

### 弹窗表单
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
        { key: 'username', label: '用户名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' }
      ]
    };
  },
  methods: {
    async handleConfirm(data) {
      try {
        await this.$api.createUser(data);
        this.$toast.success('创建成功');
        this.showModal = false;
      } catch (error) {
        this.$toast.error('创建失败');
      }
    }
  }
};
</script>
```

### 确认对话框
```vue
<template>
  <div>
    <v-btn @click="handleDelete">删除</v-btn>
    
    <jh-confirm-dialog
      v-model="showConfirm"
      title="确认删除"
      content="确定要删除这条数据吗？"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConfirm: false
    };
  },
  methods: {
    handleDelete() {
      this.showConfirm = true;
    },
    async handleConfirmDelete() {
      try {
        await this.$api.deleteData();
        this.$toast.success('删除成功');
      } catch (error) {
        this.$toast.error('删除失败');
      }
    }
  }
};
</script>
```

### 动态表单列表
```vue
<jh-form-list
  v-model="orderItems"
  :fields="itemFields"
  :min="1"
  :max="10"
  render-mode="card"
  add-button-text="添加商品"
/>
```

```javascript
data() {
  return {
    orderItems: [],
    itemFields: [
      { key: 'productName', label: '商品名称', type: 'text', required: true },
      { key: 'quantity', label: '数量', type: 'number', defaultValue: 1 },
      { key: 'price', label: '单价', type: 'number', required: true }
    ]
  };
}
```

### 查询筛选器
```vue
<jh-query-filter
  :fields="filterFields"
  :collapsed="true"
  @search="handleSearch"
  @reset="handleReset"
/>
```

```javascript
filterFields: [
  { key: 'keyword', label: '关键词', type: 'text' },
  { 
    key: 'status', 
    label: '状态', 
    type: 'select',
    options: [
      { text: '全部', value: '' },
      { text: '启用', value: 'active' },
      { text: '禁用', value: 'inactive' }
    ]
  },
  { key: 'dateRange', label: '日期范围', type: 'daterange' }
]
```

### 统计卡片
```vue
<v-row>
  <v-col cols="12" sm="6" md="3">
    <jh-statistic-card
      title="总用户数"
      :value="1234"
      prefix="👥"
      trend="up"
      :trend-value="12.5"
    />
  </v-col>
  <v-col cols="12" sm="6" md="3">
    <jh-statistic-card
      title="总收入"
      :value="123456.78"
      prefix="¥"
      trend="down"
      :trend-value="-2.1"
    />
  </v-col>
</v-row>
```

### 卡片组件
```vue
<jh-card
  title="卡片标题"
  subtitle="副标题"
  bordered
>
  <template #extra>
    <v-btn small text>更多</v-btn>
  </template>
  
  <template #default>
    卡片内容
  </template>
  
  <template #actions>
    <v-btn text>取消</v-btn>
    <v-btn color="primary">确定</v-btn>
  </template>
</jh-card>
```

### API 请求封装
```javascript
// api/user.js
export default {
  // 获取用户列表
  async getUsers(params) {
    return await request({
      url: '/api/users',
      method: 'GET',
      params
    });
  },
  
  // 创建用户
  async createUser(data) {
    return await request({
      url: '/api/users',
      method: 'POST',
      data
    });
  },
  
  // 更新用户
  async updateUser(id, data) {
    return await request({
      url: `/api/users/${id}`,
      method: 'PUT',
      data
    });
  },
  
  // 删除用户
  async deleteUser(id) {
    return await request({
      url: `/api/users/${id}`,
      method: 'DELETE'
    });
  }
};
```

### 表格刷新
```javascript
// 在组件中
methods: {
  async handleSave() {
    await this.$api.saveData();
    // 刷新表格
    this.$refs.table.reload();
  }
}
```

### Toast 提示
```javascript
// 成功提示
this.$toast.success('操作成功');

// 错误提示
this.$toast.error('操作失败');

// 警告提示
this.$toast.warning('请先选择数据');

// 信息提示
this.$toast.info('这是一条提示信息');
```

### 响应式栅格布局
```vue
<v-row>
  <v-col cols="12" sm="6" md="4" lg="3">
    <!-- 内容 -->
  </v-col>
  <v-col cols="12" sm="6" md="4" lg="3">
    <!-- 内容 -->
  </v-col>
</v-row>
```

### 常用图标
```vue
<!-- 操作图标 -->
<v-icon>mdi-plus</v-icon>          <!-- 新增 -->
<v-icon>mdi-pencil</v-icon>        <!-- 编辑 -->
<v-icon>mdi-delete</v-icon>        <!-- 删除 -->
<v-icon>mdi-eye</v-icon>           <!-- 查看 -->
<v-icon>mdi-refresh</v-icon>       <!-- 刷新 -->
<v-icon>mdi-download</v-icon>      <!-- 下载 -->
<v-icon>mdi-upload</v-icon>        <!-- 上传 -->
<v-icon>mdi-magnify</v-icon>       <!-- 搜索 -->
<v-icon>mdi-filter</v-icon>        <!-- 筛选 -->
<v-icon>mdi-cog</v-icon>           <!-- 设置 -->

<!-- 状态图标 -->
<v-icon>mdi-check-circle</v-icon>  <!-- 成功 -->
<v-icon>mdi-close-circle</v-icon>  <!-- 失败 -->
<v-icon>mdi-alert-circle</v-icon>  <!-- 警告 -->
<v-icon>mdi-information</v-icon>   <!-- 信息 -->

<!-- 业务图标 -->
<v-icon>mdi-account</v-icon>       <!-- 用户 -->
<v-icon>mdi-account-group</v-icon> <!-- 用户组 -->
<v-icon>mdi-cart</v-icon>          <!-- 购物车 -->
<v-icon>mdi-file-document</v-icon> <!-- 文档 -->
<v-icon>mdi-view-dashboard</v-icon><!-- 仪表盘 -->
```

---

## 💡 快速提示

### 表单验证
```javascript
// 调用验证
const isValid = await this.$refs.form.validate();
if (!isValid) {
  this.$toast.warning('请检查表单');
  return;
}

// 获取表单数据
const formData = this.$refs.form.getFormData();
```

### 表格操作
```javascript
// 重新加载
this.$refs.table.reload();

// 重置到第一页
this.$refs.table.reset();

// 清空选择
this.$refs.table.clearSelection();

// 获取选中行
const selectedRows = this.$refs.table.getSelectedRows();
```

### 常用颜色
- `primary`: 主要操作按钮
- `success`: 成功状态、新增按钮
- `error`: 错误状态、删除按钮
- `warning`: 警告状态
- `info`: 信息提示
- `secondary`: 次要操作
