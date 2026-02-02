# JhPageContainer - 页面容器组件

页面容器组件，提供统一的页面布局结构。这是与 test 目录中组件样式和功能保持一致的基础版本。

## 功能特性

- ✅ **统一的页面头部布局**: 标准化的页面标题区域
- ✅ **页面标题显示**: 清晰的页面标识
- ✅ **帮助按钮**: 可选的帮助功能入口
- ✅ **搜索栏插槽**: 灵活的搜索过滤区域
- ✅ **内容区域插槽**: 主要内容展示区域
- ✅ **响应式布局**: 自动适配不同屏幕尺寸
- ✅ **内置全局组件**: 集成 JhToast、JhMask、JhConfirmDialog

## 设计理念

`JhPageContainer` 是页面级的容器组件，通常与 `JhLayout` 配合使用：

- **JhLayout**: 应用级布局（导航、头部、侧边栏、底部）
- **JhPageContainer**: 页面级容器（页面标题、搜索栏、内容区域）

## 基础用法

```vue
<template>
  <jh-page-container
    page-name="用户管理"
    :show-help-button="true"
    @help-click="handleHelpClick"
  >
    <template v-slot:search-bar>
      <!-- 搜索栏内容 -->
      <jh-query-filter
        :keyword.sync="keyword"
        :keywordFieldList.sync="keywordFieldList"
        @search="handleSearch"
      />
    </template>

    <template v-slot:content>
      <!-- 主要内容 -->
      <jh-table
        :headers="headers"
        :items="items"
      />
    </template>
  </jh-page-container>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      keywordFieldList: ['username', 'email'],
      headers: [],
      items: []
    };
  },
  methods: {
    handleHelpClick() {
      // 显示帮助信息
    },
    handleSearch() {
      // 执行搜索
    }
  }
};
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| pageName | 页面标题 | String | '页面标题' |
| showHelpButton | 是否显示帮助按钮 | Boolean | true |

## 插槽

### menu
菜单区域插槽，用于放置顶部菜单组件

```vue
<jh-page-container page-name="用户管理">
  <template v-slot:menu>
    <jh-menu
      :items="menuItems"
      @select="handleMenuSelect"
    />
  </template>
</jh-page-container>
```

### search-bar
搜索栏区域插槽，通常放置搜索过滤组件

```vue
<jh-page-container page-name="用户管理">
  <template v-slot:search-bar>
    <jh-query-filter
      :keyword.sync="keyword"
      :keywordFieldList.sync="keywordFieldList"
      @search="handleSearch"
    />
  </template>
</jh-page-container>
```

### content
主要内容区域插槽，放置页面的主要内容

```vue
<jh-page-container page-name="用户管理">
  <template v-slot:content>
    <jh-table
      :headers="headers"
      :items="items"
    />
  </template>
</jh-page-container>
```

### default
默认插槽，用于放置其他内容（如抽屉、对话框等）

```vue
<jh-page-container page-name="用户管理">
  <template v-slot:content>
    <!-- 主要内容 -->
  </template>

  <!-- 默认插槽：抽屉、对话框等 -->
  <jh-drawer v-model="drawerVisible">
    <!-- 抽屉内容 -->
  </jh-drawer>
</jh-page-container>
```

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| help-click | 点击帮助按钮时触发 | - |

## 使用场景

### 列表页面

```vue
<template>
  <jh-page-container
    page-name="用户列表"
    @help-click="showHelp"
  >
    <template v-slot:search-bar>
      <jh-query-filter
        :keyword.sync="keyword"
        :keywordFieldList.sync="keywordFieldList"
        :headers="headers"
        @search="handleSearch"
      />
    </template>

    <template v-slot:content>
      <jh-table
        :headers="headers"
        :items="users"
        :loading="loading"
        @create-click="handleCreate"
        @update-click="handleUpdate"
        @delete-click="handleDelete"
      />
    </template>
  </jh-page-container>
</template>
```

### 详情页面

```vue
<template>
  <jh-page-container
    page-name="用户详情"
    :show-help-button="false"
  >
    <template v-slot:content>
      <jh-descriptions
        :columns="columns"
        :data="userDetail"
      />
    </template>
  </jh-page-container>
</template>
```

### 表单页面

```vue
<template>
  <jh-page-container
    page-name="新增用户"
    :show-help-button="false"
  >
    <template v-slot:content>
      <v-card>
        <v-card-text>
          <v-form>
            <v-text-field label="用户名" v-model="form.username" />
            <v-text-field label="邮箱" v-model="form.email" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="handleSubmit">提交</v-btn>
          <v-btn @click="handleCancel">取消</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </jh-page-container>
</template>
```

## 与 JhLayout 配合使用

推荐的完整页面结构：

```vue
<template>
  <jh-layout
    title="管理系统"
    :menu-data="menuData"
    :current-path="currentPath"
    show-breadcrumb
    :content-padding="false"
    :show-page-header="false"
  >
    <jh-page-container
      page-name="用户管理"
      :show-help-button="true"
      @help-click="handleHelpClick"
    >
      <template v-slot:search-bar>
        <jh-query-filter
          :keyword.sync="keyword"
          :keywordFieldList.sync="keywordFieldList"
          :headers="headers"
          @search="handleSearch"
        />
      </template>

      <template v-slot:content>
        <jh-table
          :headers="headers"
          :items="items"
          :loading="loading"
        />
      </template>
    </jh-page-container>
  </jh-layout>
</template>

<script>
export default {
  data() {
    return {
      currentPath: '/users/list',
      menuData: [
        {
          name: '用户管理',
          path: '/users/list',
          icon: 'mdi-account-group'
        }
      ],
      keyword: '',
      keywordFieldList: ['username', 'email'],
      headers: [
        { text: 'ID', value: 'id' },
        { text: '用户名', value: 'username' },
        { text: '邮箱', value: 'email' }
      ],
      items: [],
      loading: false
    };
  },
  methods: {
    handleHelpClick() {
      // 显示帮助信息
    },
    handleSearch() {
      this.loading = true;
      // 执行搜索逻辑
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }
};
</script>
```

**配置说明**：
- `JhLayout` 的 `content-padding` 设置为 `false`，避免与 `JhPageContainer` 的内边距重复
- `JhLayout` 的 `show-page-header` 设置为 `false`，使用 `JhPageContainer` 的页面标题
- `JhLayout` 提供应用级导航和面包屑
- `JhPageContainer` 提供页面级标题和搜索栏

## 内置全局组件

`JhPageContainer` 内置了以下全局组件，无需额外引入：

- **JhToast**: 消息提示组件
- **JhMask**: 遮罩层组件
- **JhConfirmDialog**: 确认对话框组件

这些组件可以在页面的任何地方通过事件总线或全局方法调用。

## 响应式设计

组件会自动适配不同屏幕尺寸：

- **桌面端（>= 960px）**: 搜索栏在右侧，与标题同行
- **移动端（< 960px）**: 搜索栏在标题下方，独占一行

## 样式定制

组件使用 Vuetify 的样式系统，可以通过以下方式定制：

```vue
<jh-page-container page-name="用户管理">
  <template v-slot:search-bar>
    <div class="custom-search-bar">
      <!-- 自定义样式的搜索栏 -->
    </div>
  </template>
</jh-page-container>

<style scoped>
.custom-search-bar {
  /* 自定义样式 */
}
</style>
```

## 最佳实践

1. **标题命名**: 使用清晰、简洁的页面标题，便于用户理解当前页面功能
2. **帮助按钮**: 对于复杂页面，建议显示帮助按钮，提供操作指引
3. **搜索栏**: 列表页面建议使用搜索栏，提供快速过滤功能
4. **内容区域**: 主要内容建议使用卡片或表格组件，保持视觉一致性
5. **与 JhLayout 配合**: 使用 JhLayout 时，注意避免重复的内边距和头部

## 常见问题

### 如何隐藏帮助按钮？

设置 `show-help-button` 为 `false`：

```vue
<jh-page-container
  page-name="用户管理"
  :show-help-button="false"
>
</jh-page-container>
```

### 如何自定义页面标题样式？

页面标题使用 Vuetify 的 `text-body-1` 和 `font-weight-bold` 类，可以通过全局样式覆盖：

```css
.jh-page-second-bar .text-body-1 {
  font-size: 18px !important;
  color: #333 !important;
}
```

### 可以不使用 JhLayout 吗？

可以。`JhPageContainer` 内置了 `v-app` 和 `v-main`，可以独立使用。但推荐与 `JhLayout` 配合使用，以获得完整的应用布局。

### 如何在内容区域添加多个卡片？

使用 Vuetify 的栅格系统：

```vue
<jh-page-container page-name="仪表盘">
  <template v-slot:content>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <!-- 卡片 1 -->
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <!-- 卡片 2 -->
        </v-card>
      </v-col>
    </v-row>
  </template>
</jh-page-container>
```

## 参考资料

- [JhLayout - 页面布局组件](../JhLayout/JhLayout.md)
- [JhTable - 数据表格组件](../JhTable/JhTable.md)
- [JhQueryFilter - 查询过滤组件](../JhQueryFilter/README.md)
- [Vuetify - Application](https://vuetifyjs.com/en/components/application/)
