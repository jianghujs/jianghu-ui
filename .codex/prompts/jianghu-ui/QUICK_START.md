# JianghuJS UI - 快速开始指南

> 5分钟快速上手 jianghu-ui 组件库

## 🚀 技术栈

- **Vue 2.7** + Options API（⚠️ 不是 Vue 3）
- **Vuetify 2.x**（⚠️ 不是 Vuetify 3）
- **组件前缀**: `Jh`

## 📦 最常用的 5 个组件

### 1. JhTable - 数据表格
**用途**: 列表页、数据展示

```vue
<jh-table
  header-title="用户列表"
  :headers="[
    { text: 'ID', value: 'id' },
    { text: '用户名', value: 'username' }
  ]"
  :request="async (params) => {
    const res = await api.getUsers(params);
    return { data: res.list, total: res.total, success: true };
  }"
/>
```

### 2. JhForm - 表单
**用途**: 新增、编辑、搜索表单

```vue
<jh-form
  :fields="[
    { key: 'username', label: '用户名', type: 'text', required: true },
    { key: 'email', label: '邮箱', type: 'text', rules: 'email' }
  ]"
  @submit="handleSubmit"
>
  <template #actions="{ validate }">
    <v-btn color="primary" @click="validate">提交</v-btn>
  </template>
</jh-form>
```

### 3. JhDescriptions - 详情展示
**用途**: 详情页

```vue
<jh-descriptions
  title="用户详情"
  :columns="[
    { title: '用户名', dataIndex: 'username' },
    { title: '邮箱', dataIndex: 'email' }
  ]"
  :data-source="userData"
/>
```

### 4. JhModalForm - 弹窗表单
**用途**: 新增/编辑弹窗

```vue
<jh-modal-form
  v-model="visible"
  title="新增用户"
  :fields="fields"
  @submit="handleSubmit"
/>
```

### 5. JhCard - 卡片
**用途**: 页面布局、内容容器

```vue
<jh-card title="标题" bordered>
  <div>内容</div>
</jh-card>
```

## 🎯 3 个常见页面模板

### 1. CRUD 列表页（最常用）

```vue
<template>
  <v-app>
    <jh-table
      ref="tableRef"
      header-title="用户管理"
      :headers="headers"
      :request="fetchData"
      :show-select="true"
      :action-column="actionColumn"
    >
      <template v-slot:toolbar-actions>
        <v-btn color="success" @click="handleCreate">
          <v-icon left>mdi-plus</v-icon>新增
        </v-btn>
      </template>
    </jh-table>
    
    <jh-modal-form
      v-model="dialogVisible"
      :title="isEdit ? '编辑' : '新增'"
      :fields="fields"
      :form-data="formData"
      @submit="handleSubmit"
    />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      formData: {},
      headers: [
        { text: 'ID', value: 'id' },
        { text: '用户名', value: 'username' },
        { text: '邮箱', value: 'email' }
      ],
      fields: [
        { key: 'username', label: '用户名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' }
      ],
      actionColumn: {
        title: '操作',
        buttons: [
          {
            text: '编辑',
            type: 'link',
            onClick: (row) => {
              this.isEdit = true;
              this.formData = { ...row };
              this.dialogVisible = true;
            }
          },
          {
            text: '删除',
            type: 'link',
            color: 'error',
            confirm: '确认删除？',
            onClick: async (row) => {
              await this.$api.delete(row.id);
              this.$refs.tableRef.reload();
            }
          }
        ]
      }
    };
  },
  methods: {
    handleCreate() {
      this.isEdit = false;
      this.formData = {};
      this.dialogVisible = true;
    },
    async fetchData(params) {
      const res = await this.$api.getUsers(params);
      return { data: res.list, total: res.total, success: true };
    },
    async handleSubmit(data) {
      if (this.isEdit) {
        await this.$api.update(data);
      } else {
        await this.$api.create(data);
      }
      this.dialogVisible = false;
      this.$refs.tableRef.reload();
    }
  }
};
</script>
```

### 2. 表单页

```vue
<template>
  <v-app>
    <jh-card title="用户信息">
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
    </jh-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      fields: [
        { type: 'group', title: '基本信息' },
        { key: 'username', label: '用户名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
        { type: 'group', title: '其他信息', divider: true },
        { key: 'bio', label: '简介', type: 'textarea', rows: 4 }
      ]
    };
  },
  methods: {
    async handleSubmit(data) {
      await this.$api.submit(data);
      this.$message.success('提交成功');
    }
  }
};
</script>
```

### 3. 详情页

```vue
<template>
  <v-app>
    <jh-card title="用户详情">
      <jh-descriptions
        :columns="columns"
        :data-source="userData"
        :column="3"
        bordered
      />
    </jh-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      userData: {},
      columns: [
        { title: 'ID', dataIndex: 'id' },
        { title: '用户名', dataIndex: 'username', copyable: true },
        { title: '邮箱', dataIndex: 'email', copyable: true },
        { title: '创建时间', dataIndex: 'createdAt', valueType: 'dateTime' }
      ]
    };
  },
  async created() {
    const res = await this.$api.getUser(this.$route.params.id);
    this.userData = res.data;
  }
};
</script>
```

## ⚠️ 5 个必须遵守的规则

1. **所有组件必须包裹在 `<v-app>` 中**
   ```vue
   <v-app>
     <jh-layout>...</jh-layout>
   </v-app>
   ```

2. **服务端分页用 `request`，不要用 `items`**
   ```vue
   <!-- ✅ 正确 -->
   <jh-table :request="fetchData" />
   
   <!-- ❌ 错误 -->
   <jh-table :request="fetchData" :items="data" />
   ```

3. **字段联动必须用函数**
   ```javascript
   // ✅ 正确
   visible: (formData) => formData.type === 'A'
   
   // ❌ 错误
   visible: this.formData.type === 'A'
   ```

4. **使用 Vue 2 Options API，不要用 Composition API**
   ```vue
   <!-- ✅ 正确 -->
   <script>
   export default {
     data() { return {} }
   }
   </script>
   
   <!-- ❌ 错误 -->
   <script setup>
   const data = ref([])
   </script>
   ```

5. **`request` 方法必须返回 `{ data, total, success }` 格式**
   ```javascript
   async fetchData(params) {
     const res = await api.getUsers(params);
     return {
       data: res.list,
       total: res.total,
       success: true
     };
   }
   ```

## 🎨 常用图标

```
mdi-home          首页
mdi-account       用户
mdi-account-group 用户组
mdi-cog           设置
mdi-plus          新增
mdi-pencil        编辑
mdi-delete        删除
mdi-eye           查看
mdi-download      下载
mdi-upload        上传
mdi-refresh       刷新
mdi-search        搜索
mdi-filter        筛选
mdi-close         关闭
mdi-check         确认
```

查找更多图标: https://materialdesignicons.com/

## 📚 下一步

- 查看 [README.md](./README.md) 了解完整组件列表
- 查看具体组件文档学习详细用法
- 参考模板代码快速开发

---

**开始使用 JianghuJS UI 吧! 🎉**
