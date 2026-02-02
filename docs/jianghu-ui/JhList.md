# JhList 高级列表

基于 Ant Design ProList 设计的高级列表组件，提供了丰富的数据展示和交互功能。

## 特性

- 📋 **多种布局** - 支持列表、网格等多种布局方式
- 🎨 **灵活配置** - 通过 metas 配置快速定义数据展示
- 🔍 **搜索过滤** - 内置搜索功能，支持客户端和服务端搜索
- 📄 **分页支持** - 支持客户端和服务端分页
- ✅ **行选择** - 支持单选和多选
- 🎯 **操作按钮** - 灵活的操作按钮配置
- 🔄 **数据刷新** - 支持手动刷新和轮询
- 📱 **响应式** - 完美适配移动端
- 🎭 **自定义渲染** - 支持完全自定义列表项渲染

## 基础用法

```vue
<template>
  <jh-list
    :data-source="dataSource"
    :metas="metas"
    header-title="用户列表"
  />
</template>

<script>
export default {
  data() {
    return {
      dataSource: [
        {
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com',
          avatar: 'https://example.com/avatar1.jpg',
        },
        // ...
      ],
      metas: {
        title: 'name',
        description: 'email',
        avatar: 'avatar',
      },
    };
  },
};
</script>
```

## Metas 配置

Metas 用于定义列表项的数据映射关系：

```javascript
{
  // 标题
  title: 'name',  // 字符串：直接映射字段
  // 或
  title: { dataIndex: 'name' },  // 对象：使用 dataIndex
  // 或
  title: (item) => item.firstName + ' ' + item.lastName,  // 函数：自定义处理
  
  // 副标题
  subTitle: 'role',
  
  // 描述
  description: 'email',
  
  // 头像
  avatar: 'avatarUrl',
  
  // 额外内容
  extra: 'status',
  
  // 内容区
  content: 'bio',
  
  // 操作按钮
  actions: (item) => [
    { text: '编辑', icon: 'mdi-pencil', color: 'primary' },
    { text: '删除', icon: 'mdi-delete', color: 'error' },
  ],
}
```

## 网格布局

```vue
<template>
  <jh-list
    :data-source="dataSource"
    :metas="metas"
    :grid="grid"
    layout="grid"
    header-title="项目列表"
  />
</template>

<script>
export default {
  data() {
    return {
      grid: {
        column: 12,  // 总列数
        xs: 12,      // 超小屏：1列
        sm: 6,       // 小屏：2列
        md: 4,       // 中屏：3列
        lg: 3,       // 大屏：4列
        xl: 3,       // 超大屏：4列
      },
    };
  },
};
</script>
```

## 服务端分页

```vue
<template>
  <jh-list
    :request="request"
    :metas="metas"
    header-title="用户列表"
  />
</template>

<script>
export default {
  data() {
    return {
      metas: {
        title: 'name',
        description: 'email',
        avatar: 'avatar',
      },
    };
  },
  methods: {
    async request(params) {
      // params: { current, pageSize, search }
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(params),
      });
      const data = await response.json();
      
      return {
        success: true,
        data: data.list,
        total: data.total,
      };
    },
  },
};
</script>
```

## 行选择

```vue
<template>
  <jh-list
    :data-source="dataSource"
    :metas="metas"
    :row-selection="rowSelection"
    header-title="可选择列表"
  >
    <template #alert-actions="{ selectedRows }">
      <v-btn small color="primary" @click="handleBatchEdit(selectedRows)">
        批量编辑
      </v-btn>
      <v-btn small color="error" @click="handleBatchDelete(selectedRows)">
        批量删除
      </v-btn>
    </template>
  </jh-list>
</template>

<script>
export default {
  data() {
    return {
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log('选中的行:', selectedRowKeys, selectedRows);
        },
      },
    };
  },
  methods: {
    handleBatchEdit(rows) {
      console.log('批量编辑:', rows);
    },
    handleBatchDelete(rows) {
      console.log('批量删除:', rows);
    },
  },
};
</script>
```

## 自定义渲染

```vue
<template>
  <jh-list
    :data-source="dataSource"
    :metas="metas"
    header-title="自定义列表"
  >
    <template #renderItem="{ item, index }">
      <v-card class="pa-4">
        <div class="d-flex align-center">
          <v-avatar size="60" color="primary">
            <span class="white--text">{{ index + 1 }}</span>
          </v-avatar>
          <div class="ml-4 flex-grow-1">
            <div class="text-h6">{{ item.title }}</div>
            <div class="text-body-2 grey--text">{{ item.description }}</div>
          </div>
          <v-chip :color="item.status === 'active' ? 'success' : 'grey'">
            {{ item.status }}
          </v-chip>
        </div>
      </v-card>
    </template>
  </jh-list>
</template>
```

## 插槽自定义

```vue
<template>
  <jh-list
    :data-source="dataSource"
    :metas="metas"
    header-title="项目列表"
  >
    <!-- 自定义标题 -->
    <template #title="{ item }">
      <span style="color: #1890ff; font-weight: bold;">{{ item.name }}</span>
    </template>
    
    <!-- 自定义描述 -->
    <template #description="{ item }">
      <div>
        <v-chip x-small>{{ item.category }}</v-chip>
        <span class="ml-2">{{ item.description }}</span>
      </div>
    </template>
    
    <!-- 自定义额外内容 -->
    <template #extra="{ item }">
      <div style="text-align: right;">
        <div style="font-size: 20px; font-weight: bold;">{{ item.progress }}%</div>
        <v-progress-linear :value="item.progress" height="4" class="mt-1" />
      </div>
    </template>
    
    <!-- 自定义操作按钮 -->
    <template #actions="{ item }">
      <v-btn text x-small color="primary" @click="handleView(item)">查看</v-btn>
      <v-btn text x-small color="success" @click="handleEdit(item)">编辑</v-btn>
      <v-btn text x-small color="error" @click="handleDelete(item)">删除</v-btn>
    </template>
    
    <!-- 工具栏左侧按钮 -->
    <template #toolbar-actions>
      <v-btn color="success" small>
        <v-icon left small>mdi-plus</v-icon>
        新增项目
      </v-btn>
    </template>
    
    <!-- 工具栏右侧额外内容 -->
    <template #toolbar-extra>
      <v-btn icon small>
        <v-icon>mdi-filter</v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </template>
  </jh-list>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| dataSource | 数据源（客户端分页） | Array | [] |
| request | 数据请求函数（服务端分页） | Function | null |
| rowKey | 数据项的唯一标识字段 | String \| Function | 'id' |
| metas | 列表项元数据配置 | Object | {} |
| layout | 布局类型 | 'list' \| 'grid' \| 'card' | 'list' |
| grid | 网格配置 | Object | null |
| size | 列表尺寸 | 'small' \| 'default' \| 'large' | 'default' |
| split | 是否显示分割线 | Boolean | true |
| pagination | 分页配置 | Object \| Boolean | { current: 1, pageSize: 10 } |
| rowSelection | 行选择配置 | Object \| Boolean | null |
| checkboxColor | 复选框颜色 | String | 'primary' |
| expandable | 展开配置 | Object \| Boolean | null |
| headerTitle | 列表标题 | String | '' |
| tooltip | 标题提示信息 | String | '' |
| cardBordered | 是否显示卡片边框 | Boolean | true |
| ghost | 幽灵模式（无边框无背景） | Boolean | false |
| toolbar | 工具栏配置 | Object \| Boolean | { search: true, refresh: true, layout: true, size: true } |
| search | 搜索配置 | Object \| Boolean | false |
| loading | 加载状态 | Boolean | false |
| polling | 轮询间隔（毫秒） | Number | 0 |
| debounceTime | 搜索防抖时间（毫秒） | Number | 300 |

### Metas 配置

| 参数 | 说明 | 类型 |
|------|------|------|
| title | 标题 | String \| Object \| Function |
| subTitle | 副标题 | String \| Object \| Function |
| description | 描述 | String \| Object \| Function |
| avatar | 头像 | String \| Object \| Function |
| content | 内容区 | String \| Object \| Function |
| extra | 额外内容 | String \| Object \| Function |
| actions | 操作按钮 | String \| Object \| Function |

### Grid 配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| column | 总列数 | Number | 12 |
| xs | 超小屏列数 | Number | - |
| sm | 小屏列数 | Number | - |
| md | 中屏列数 | Number | - |
| lg | 大屏列数 | Number | - |
| xl | 超大屏列数 | Number | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| item-click | 列表项点击 | (item, index) |
| action-click | 操作按钮点击 | (action, item) |
| selection-change | 选择改变 | ({ selectedRowKeys, selectedRows }) |
| page-change | 页码改变 | (page) |
| page-size-change | 每页条数改变 | (pageSize) |
| refresh | 刷新 | - |
| request-error | 请求错误 | (error) |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| header-title | 自定义标题 | - |
| toolbar-actions | 工具栏左侧操作按钮 | - |
| toolbar-extra | 工具栏右侧额外内容 | - |
| alert | 自定义批量操作提示 | { selectedRowKeys, selectedRows } |
| alert-actions | 批量操作按钮 | { selectedRowKeys, selectedRows } |
| renderItem | 自定义列表项渲染 | { item, index } |
| title | 自定义标题 | { item } |
| subTitle | 自定义副标题 | { item } |
| description | 自定义描述 | { item } |
| content | 自定义内容区 | { item } |
| extra | 自定义额外内容 | { item } |
| actions | 自定义操作按钮 | { item } |
| expandedRowRender | 自定义展开内容 | { item, index } |

## 高级用法

### 轮询

```vue
<jh-list
  :request="request"
  :metas="metas"
  :polling="5000"
  header-title="实时监控列表"
/>
```

### 搜索防抖

```vue
<jh-list
  :request="request"
  :metas="metas"
  :debounce-time="500"
  header-title="搜索列表"
/>
```

### 不同尺寸

```vue
<!-- 小尺寸 -->
<jh-list :data-source="dataSource" :metas="metas" size="small" />

<!-- 默认尺寸 -->
<jh-list :data-source="dataSource" :metas="metas" size="default" />

<!-- 大尺寸 -->
<jh-list :data-source="dataSource" :metas="metas" size="large" />
```

### 幽灵模式

```vue
<jh-list
  :data-source="dataSource"
  :metas="metas"
  ghost
  header-title="幽灵模式列表"
/>
```

## 最佳实践

1. **使用 metas 配置** - 优先使用 metas 配置来定义数据映射，保持代码简洁
2. **服务端分页** - 大数据量时使用 request 函数实现服务端分页
3. **合理使用插槽** - 对于复杂的自定义需求，使用插槽而不是完全自定义渲染
4. **响应式布局** - 使用 grid 配置实现响应式网格布局
5. **防抖优化** - 搜索功能使用 debounceTime 避免频繁请求

## 注意事项

- `dataSource` 和 `request` 二选一，优先使用 `request`
- 使用 `rowKey` 确保每个列表项有唯一标识
- 网格布局需要配置 `grid` 属性并设置 `layout="grid"`
- 自定义渲染时注意保持样式一致性

## 与 JhTable 的区别

- **JhList** 适合卡片式、图文混排的数据展示
- **JhTable** 适合表格式、结构化的数据展示
- JhList 基于 ProTable 实现，支持大部分 ProTable 的 API
- 两者可以通过配置轻松切换
