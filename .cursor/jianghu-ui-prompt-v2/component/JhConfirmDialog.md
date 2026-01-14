# JhConfirmDialog - AI 快速集成指南

> 确认对话框组件

## 🎯 核心用法

```vue
<template>
  <div>
    <v-btn @click="showConfirm">删除</v-btn>
    
    <jh-confirm-dialog
      v-model="confirmVisible"
      title="确认删除"
      message="确定要删除这条记录吗？"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmVisible: false
    };
  },
  methods: {
    showConfirm() {
      this.confirmVisible = true;
    },
    handleConfirm() {
      console.log('确认删除');
      // 执行删除操作
      this.confirmVisible = false;
    }
  }
};
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `value` / `v-model` | Boolean | 显示/隐藏 | `false` |
| `title` | String | 标题 | `'确认'` |
| `message` | String | 提示信息 | `''` |
| `confirmText` | String | 确认按钮文本 | `'确定'` |
| `cancelText` | String | 取消按钮文本 | `'取消'` |

## 📡 事件

| 事件名 | 说明 |
|--------|------|
| `confirm` | 确认 |
| `cancel` | 取消 |

## ⚡ 快速模板

### 删除确认
```vue
<template>
  <div>
    <v-btn color="error" @click="handleDelete">删除</v-btn>
    
    <jh-confirm-dialog
      v-model="confirmVisible"
      title="确认删除"
      message="删除后数据将无法恢复，确定要删除吗？"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmVisible: false
    };
  },
  methods: {
    handleDelete() {
      this.confirmVisible = true;
    },
    async confirmDelete() {
      await this.$api.deleteItem();
      this.$message.success('删除成功');
      this.confirmVisible = false;
    }
  }
};
</script>
```

## 🔗 相关组件

- **JhModal**: 弹窗组件
