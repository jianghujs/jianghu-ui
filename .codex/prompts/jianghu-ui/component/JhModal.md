# JhModal - AI 快速集成指南

> 基础弹窗组件

## 🎯 核心用法

```vue
<template>
  <div>
    <v-btn @click="visible = true">打开弹窗</v-btn>
    
    <jh-modal
      v-model="visible"
      title="弹窗标题"
      width="600px"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <div>弹窗内容</div>
    </jh-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleConfirm() {
      console.log('确认');
      this.visible = false;
    },
    handleCancel() {
      console.log('取消');
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
| `width` | String/Number | 宽度 | `'500px'` |
| `persistent` | Boolean | 点击外部不关闭 | `false` |
| `showFooter` | Boolean | 显示底部按钮 | `true` |

## 📡 事件

| 事件名 | 说明 |
|--------|------|
| `confirm` | 确认 |
| `cancel` | 取消 |

## 🔗 相关组件

- **JhModalForm**: 弹窗表单
- **JhConfirmDialog**: 确认对话框
