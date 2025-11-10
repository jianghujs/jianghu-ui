# JhDrawer - AI 快速集成指南

> 抽屉组件，从侧边滑出

## 🎯 核心用法

```vue
<template>
  <div>
    <v-btn @click="visible = true">打开抽屉</v-btn>
    
    <jh-drawer
      v-model="visible"
      title="抽屉标题"
      width="500"
    >
      <div>抽屉内容</div>
    </jh-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  }
};
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `value` / `v-model` | Boolean | 显示/隐藏 | `false` |
| `title` | String | 标题 | `''` |
| `width` | Number | 宽度 | `500` |
| `right` | Boolean | 从右侧滑出 | `true` |

## 🔗 相关组件

- **JhDrawerForm**: 抽屉表单
- **JhModal**: 弹窗组件
