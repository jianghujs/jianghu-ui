# JhList - AI 快速集成指南

> 列表组件，支持卡片列表、网格列表等多种展示方式

## 🎯 核心用法

```vue
<jh-list
  :items="items"
  :item-key="'id'"
  @item-click="handleItemClick"
>
  <template #item="{ item }">
    <v-card>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text>{{ item.description }}</v-card-text>
    </v-card>
  </template>
</jh-list>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `items` | Array | 列表数据 | `[]` |
| `itemKey` | String | 唯一标识字段 | `'id'` |
| `grid` | Boolean | 网格模式 | `false` |
| `cols` | Object | 响应式列数 | `{ xs: 12, sm: 6, md: 4 }` |
| `loading` | Boolean | 加载状态 | `false` |

## ⚡ 快速模板

### 卡片列表
```vue
<template>
  <jh-list
    :items="articles"
    :loading="loading"
    grid
    :cols="{ xs: 12, sm: 6, md: 4, lg: 3 }"
  >
    <template #item="{ item }">
      <v-card hover @click="handleView(item)">
        <v-img :src="item.cover" height="200" />
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-subtitle>{{ item.author }}</v-card-subtitle>
        <v-card-text>{{ item.summary }}</v-card-text>
        <v-card-actions>
          <v-btn text color="primary">查看详情</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </jh-list>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      articles: []
    };
  },
  methods: {
    handleView(item) {
      this.$router.push(`/articles/${item.id}`);
    }
  }
};
</script>
```

## 🔗 相关组件

- **JhTable**: 表格展示
- **JhCard**: 卡片组件
