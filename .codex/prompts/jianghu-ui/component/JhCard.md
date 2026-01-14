# JhCard - AI 快速集成指南

> 高级卡片组件，参考 Ant Design ProCard 设计，支持分栏、栅格、折叠等功能

## 🎯 核心用法

### 最简单的卡片
```vue
<jh-card title="卡片标题" tooltip="提示信息" extra="额外内容">
  <div>卡片内容</div>
</jh-card>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `title` | String | 标题 | - |
| `subTitle` | String | 副标题 | - |
| `tooltip` | String | 提示信息 | - |
| `extra` | String | 右上角额外内容 | - |
| `bordered` | Boolean | 显示边框 | `true` |
| `headerBordered` | Boolean | 标题分割线 | `false` |
| `ghost` | Boolean | 幽灵模式 | `false` |
| `collapsible` | Boolean | 可折叠 | `false` |
| `size` | String | 尺寸 | `'default'` |
| `loading` | Boolean | 加载状态 | `false` |
| `hoverable` | Boolean | 悬浮效果 | `false` |
| `split` | String | 分栏模式 | `''` |
| `colSpan` | Number/String | 栅格占比 | `24` |
| `gutter` | Number/Array | 栅格间距 | `0` |

## 🔧 常用功能

### 1. 基础卡片
```vue
<jh-card
  title="默认尺寸"
  tooltip="这是提示"
  extra="extra"
  bordered
>
  <div>Card content</div>
</jh-card>
```

### 2. 小尺寸卡片
```vue
<jh-card title="小尺寸卡片" size="small">
  <div>Card content</div>
</jh-card>
```

### 3. 带分割线的标题
```vue
<jh-card title="标题" header-bordered>
  <div>Card content</div>
</jh-card>
```

### 4. 可折叠卡片
```vue
<jh-card
  title="可折叠卡片"
  collapsible
  :default-collapsed="false"
  @collapse="handleCollapse"
>
  <div>Card content</div>
</jh-card>
```

### 5. 加载状态
```vue
<jh-card title="加载中" loading>
  <div>Card content</div>
</jh-card>
```

### 6. 操作项
```vue
<jh-card
  title="Actions 操作项"
  :actions="[
    { icon: 'mdi-cog', text: '设置', onClick: () => {} },
    { icon: 'mdi-pencil', text: '编辑', onClick: () => {} },
    { icon: 'mdi-delete', text: '删除', onClick: () => {} }
  ]"
>
  <div>Card content</div>
</jh-card>
```

### 7. 栅格布局
```vue
<jh-card :gutter="8">
  <jh-card :col-span="12" bordered>
    colSpan - 12
  </jh-card>
  <jh-card :col-span="6" bordered>
    colSpan - 6
  </jh-card>
  <jh-card :col-span="6" bordered>
    colSpan - 6
  </jh-card>
</jh-card>
```

### 8. 左右分栏
```vue
<jh-card title="左右分栏" split="vertical" bordered>
  <jh-card title="左侧" col-span="30%">
    左侧内容
  </jh-card>
  <jh-card title="右侧">
    右侧内容
  </jh-card>
</jh-card>
```

### 9. 上下分栏
```vue
<jh-card title="上下分栏" split="horizontal" bordered>
  <jh-card title="上部">
    上部内容
  </jh-card>
  <jh-card title="下部">
    下部内容
  </jh-card>
</jh-card>
```

### 10. 幽灵模式（无背景）
```vue
<jh-card ghost>
  <div>无背景色和 padding</div>
</jh-card>
```

### 11. 居中布局
```vue
<jh-card layout="center" style="min-height: 200px;">
  <div>内容居中</div>
</jh-card>
```

### 12. 悬浮效果
```vue
<jh-card hoverable>
  <div>鼠标悬浮时有阴影</div>
</jh-card>
```

### 13. 自定义样式
```vue
<jh-card
  title="自定义样式"
  :body-style="{ padding: '24px', backgroundColor: '#f5f5f5' }"
  :head-style="{ backgroundColor: '#1890ff', color: '#fff' }"
>
  <div>自定义样式内容</div>
</jh-card>
```

## 🎨 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | 卡片内容 |
| `title` | 自定义标题 |
| `extra` | 自定义右上角内容 |

```vue
<jh-card>
  <template #title>
    <div style="display: flex; align-items: center;">
      <v-icon color="primary" class="mr-2">mdi-account</v-icon>
      自定义标题
    </div>
  </template>
  
  <template #extra>
    <v-btn small text>更多</v-btn>
  </template>
  
  <div>卡片内容</div>
</jh-card>
```

## 📡 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `collapse` | 折叠状态改变 | `(collapsed: boolean)` |
| `tab-change` | 标签页切换 | `(key: string \| number)` |

## ⚡ 快速模板

### 仪表盘卡片
```vue
<template>
  <v-row>
    <v-col cols="12" md="6" lg="3">
      <jh-card hoverable>
        <div class="text-center">
          <div class="text-h4 primary--text">1,234</div>
          <div class="text-caption grey--text">总用户数</div>
        </div>
      </jh-card>
    </v-col>
    
    <v-col cols="12" md="6" lg="3">
      <jh-card hoverable>
        <div class="text-center">
          <div class="text-h4 success--text">567</div>
          <div class="text-caption grey--text">活跃用户</div>
        </div>
      </jh-card>
    </v-col>
  </v-row>
</template>
```

### 详情页布局
```vue
<template>
  <div>
    <!-- 基本信息 -->
    <jh-card title="基本信息" header-bordered class="mb-4">
      <jh-descriptions :columns="basicColumns" :data-source="userData" />
    </jh-card>
    
    <!-- 左右分栏 -->
    <jh-card split="vertical" bordered>
      <jh-card title="账户信息" col-span="40%">
        <jh-descriptions :columns="accountColumns" :data-source="userData" />
      </jh-card>
      
      <jh-card title="操作记录">
        <jh-table :headers="logHeaders" :items="logs" />
      </jh-card>
    </jh-card>
  </div>
</template>
```

### 可折叠分组卡片
```vue
<template>
  <div>
    <jh-card
      title="基本设置"
      collapsible
      :default-collapsed="false"
      class="mb-4"
    >
      <jh-form :fields="basicFields" />
    </jh-card>
    
    <jh-card
      title="高级设置"
      collapsible
      :default-collapsed="true"
    >
      <jh-form :fields="advancedFields" />
    </jh-card>
  </div>
</template>
```

### 栅格布局示例
```vue
<template>
  <jh-card :gutter="16">
    <jh-card :col-span="8" bordered>
      <div class="pa-4">左侧内容</div>
    </jh-card>
    
    <jh-card :col-span="16" bordered>
      <jh-card :gutter="[16, 16]">
        <jh-card :col-span="12" bordered>
          <div class="pa-4">右上</div>
        </jh-card>
        <jh-card :col-span="12" bordered>
          <div class="pa-4">右下</div>
        </jh-card>
      </jh-card>
    </jh-card>
  </jh-card>
</template>
```

## ⚠️ 注意事项

1. **colSpan 支持多种格式**
   - 数字（0-24）: `12`
   - 像素值: `"200px"`
   - 百分比: `"30%"`

2. **gutter 可以是数字或数组**
   - 数字: `16` （水平和垂直间距相同）
   - 数组: `[16, 24]` （[水平间距, 垂直间距]）

3. **幽灵模式（ghost）会取消背景色和 padding**
   - 适合用于页面布局容器

4. **分栏布局（split）时，子卡片圆角会被设置为 0**

5. **嵌套使用时，自动切换为 flex 弹性盒布局**

## 🔗 相关组件

- **JhDescriptions**: 描述列表（常在卡片中使用）
- **JhTable**: 表格（常在卡片中使用）
- **JhForm**: 表单（常在卡片中使用）
- **JhStatisticCard**: 统计卡片
