# JhModalForm - AI 快速集成指南

> 弹窗表单组件，结合 JhModal 和 JhForm，用于快速创建弹窗表单

## 🎯 核心用法

```vue
<template>
  <div>
    <v-btn @click="dialogVisible = true">打开表单</v-btn>
    
    <jh-modal-form
      v-model="dialogVisible"
      title="新增用户"
      :fields="fields"
      :form-data="formData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      formData: {},
      fields: [
        { key: 'username', label: '用户名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
        { key: 'role', label: '角色', type: 'select', options: [
          { text: '管理员', value: 'admin' },
          { text: '用户', value: 'user' }
        ]}
      ]
    };
  },
  methods: {
    async handleSubmit(data) {
      await this.$api.createUser(data);
      this.$message.success('创建成功');
      this.dialogVisible = false;
    }
  }
};
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `value` / `v-model` | Boolean | 显示/隐藏 | `false` |
| `title` | String | 标题 | `''` |
| `fields` | Array | 表单字段配置 | `[]` |
| `formData` | Object | 表单数据 | `{}` |
| `width` | String/Number | 宽度 | `'600px'` |
| `loading` | Boolean | 加载状态 | `false` |
| `confirmText` | String | 确认按钮文本 | `'确定'` |
| `cancelText` | String | 取消按钮文本 | `'取消'` |

## 📡 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `submit` | 表单提交 | `(data)` |
| `cancel` | 取消 | - |
| `input` | v-model 更新 | `(visible)` |

## ⚡ 快速模板

### 新增/编辑通用表单
```vue
<template>
  <div>
    <v-btn color="success" @click="handleCreate">新增</v-btn>
    
    <jh-modal-form
      v-model="dialogVisible"
      :title="isEdit ? '编辑用户' : '新增用户'"
      :fields="fields"
      :form-data="formData"
      :loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      loading: false,
      formData: {},
      fields: [
        { key: 'username', label: '用户名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
        { key: 'phone', label: '手机号', type: 'text', rules: 'phone' },
        { key: 'role', label: '角色', type: 'select', options: [
          { text: '管理员', value: 'admin' },
          { text: '用户', value: 'user' }
        ]}
      ]
    };
  },
  methods: {
    handleCreate() {
      this.isEdit = false;
      this.formData = {};
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.isEdit = true;
      this.formData = { ...row };
      this.dialogVisible = true;
    },
    async handleSubmit(data) {
      this.loading = true;
      try {
        if (this.isEdit) {
          await this.$api.updateUser(data);
          this.$message.success('更新成功');
        } else {
          await this.$api.createUser(data);
          this.$message.success('创建成功');
        }
        this.dialogVisible = false;
        this.$emit('refresh');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
```

## ⚠️ 注意事项

1. **使用 `v-model` 控制显示/隐藏**
2. **`formData` 用于编辑模式，传入初始数据**
3. **`fields` 配置与 JhForm 完全一致**
4. **提交成功后需要手动关闭弹窗：`this.dialogVisible = false`**

## 🔗 相关组件

- **JhModal**: 基础弹窗组件
- **JhForm**: 表单组件
- **JhDrawerForm**: 抽屉表单
