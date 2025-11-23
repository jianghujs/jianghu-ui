# JhDrawerForm - AI 快速集成指南

> 抽屉表单组件，结合 JhDrawer 和 JhForm

## 🎯 核心用法

```vue
<template>
  <div>
    <v-btn @click="visible = true">打开表单</v-btn>
    
    <jh-drawer-form
      v-model="visible"
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
      visible: false,
      formData: {},
      fields: [
        { key: 'username', label: '用户名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' }
      ]
    };
  },
  methods: {
    async handleSubmit(data) {
      await this.$api.createUser(data);
      this.$message.success('创建成功');
      this.visible = false;
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
| `fields` | Array | 字段配置 | `[]` |
| `formData` | Object | 表单数据 | `{}` |
| `width` | Number | 宽度 | `500` |

## 📡 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `submit` | 提交 | `(data)` |
| `cancel` | 取消 | - |

## 🔗 相关组件

- **JhDrawer**: 抽屉组件
- **JhForm**: 表单组件
- **JhModalForm**: 弹窗表单
