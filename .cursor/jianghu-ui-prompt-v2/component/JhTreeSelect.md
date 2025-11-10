# JhTreeSelect - AI 快速集成指南

> 树形选择组件

## 🎯 核心用法

```vue
<jh-tree-select
  v-model="selectedValue"
  :items="treeData"
  label="选择分类"
/>

<script>
export default {
  data() {
    return {
      selectedValue: null,
      treeData: [
        {
          id: 1,
          name: '一级分类',
          children: [
            { id: 11, name: '二级分类1' },
            { id: 12, name: '二级分类2' }
          ]
        }
      ]
    };
  }
};
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `value` / `v-model` | Any | 选中值 | `null` |
| `items` | Array | 树形数据 | `[]` |
| `itemText` | String | 显示字段 | `'name'` |
| `itemValue` | String | 值字段 | `'id'` |
| `itemChildren` | String | 子节点字段 | `'children'` |

## ⚡ 快速模板

```vue
<template>
  <jh-form :fields="fields" @submit="handleSubmit">
    <template #actions="{ validate }">
      <v-btn color="primary" @click="validate">提交</v-btn>
    </template>
  </jh-form>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'categoryId',
          label: '分类',
          type: 'slot'
        }
      ]
    };
  }
};
</script>
```
