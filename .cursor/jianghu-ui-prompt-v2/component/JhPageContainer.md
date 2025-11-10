# JhPageContainer - AI 快速集成指南

> 页面容器组件，提供标准的页面头部和内容区域

## 🎯 核心用法

```vue
<jh-page-container
  title="页面标题"
  :breadcrumb="['首页', '用户管理', '用户列表']"
>
  <template #extra>
    <v-btn color="primary">操作按钮</v-btn>
  </template>
  
  <div>页面内容</div>
</jh-page-container>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `title` | String | 页面标题 | `''` |
| `breadcrumb` | Array | 面包屑 | `[]` |
| `loading` | Boolean | 加载状态 | `false` |

## 🎨 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | 页面内容 |
| `extra` | 标题右侧额外内容 |

## ⚡ 快速模板

```vue
<template>
  <jh-page-container
    title="用户管理"
    :breadcrumb="['首页', '系统管理', '用户管理']"
  >
    <template #extra>
      <v-btn color="success" @click="handleCreate">
        <v-icon left>mdi-plus</v-icon>新增用户
      </v-btn>
    </template>
    
    <jh-table :headers="headers" :request="fetchData" />
  </jh-page-container>
</template>
```

## 🔗 相关组件

- **JhLayout**: 页面布局
- **JhCard**: 卡片组件
