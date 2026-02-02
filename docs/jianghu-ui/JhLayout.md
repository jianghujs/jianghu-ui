# JhLayout - 页面布局组件

基于 Ant Design Pro 的 ProLayout 设计的企业级页面布局组件，提供完整的中后台布局解决方案。

## 功能特性

### 🎨 多种布局模式

- **侧边布局 (side)**: 经典的侧边栏导航布局，适合菜单项较多的场景
- **顶部布局 (top)**: 顶部导航栏布局，适合菜单项较少的场景
- **混合布局 (mix)**: 顶部 + 侧边栏混合布局，适合复杂的导航结构

### 🎯 核心功能

- ✅ **响应式设计**: 自动适配移动端和桌面端
- ✅ **可折叠侧边栏**: 支持侧边栏折叠/展开，节省空间
- ✅ **自动面包屑**: 根据路由自动生成面包屑导航
- ✅ **多级菜单**: 支持三级菜单嵌套
- ✅ **主题切换**: 支持亮色/暗色主题
- ✅ **页面头部**: 可选的页面标题和描述区域
- ✅ **底部区域**: 可自定义的页脚内容
- ✅ **用户菜单**: 内置用户头像和下拉菜单
- ✅ **设置面板**: 实时调整布局配置

## 基础用法

```vue
<template>
  <jh-layout
    title="我的应用"
    logo="mdi-view-dashboard"
    :menu-data="menuData"
    :current-path="currentPath"
    @menu-click="handleMenuClick"
  >
    <!-- 主内容区域 -->
    <v-container>
      <h1>欢迎使用 JhLayout</h1>
    </v-container>
  </jh-layout>
</template>

<script>
export default {
  data() {
    return {
      currentPath: '/dashboard',
      menuData: [
        {
          name: '工作台',
          path: '/dashboard',
          icon: 'mdi-view-dashboard'
        },
        {
          name: '用户管理',
          icon: 'mdi-account-group',
          children: [
            {
              name: '用户列表',
              path: '/users/list',
              icon: 'mdi-account-multiple'
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleMenuClick(item) {
      this.currentPath = item.path;
      // 路由跳转逻辑
    }
  }
};
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 应用标题 | String | 'JianghuJS' |
| logo | Logo 图标名称（Material Design Icons） | String | '' |
| menuData | 菜单数据 | Array | [] |
| currentPath | 当前路由路径 | String | '' |
| layout | 布局模式：side/top/mix | String | 'side' |
| sidebarWidth | 侧边栏宽度 | Number | 256 |
| headerHeight | 头部高度 | Number | 64 |
| headerTheme | 头部主题：light/dark | String | 'light' |
| sidebarTheme | 侧边栏主题：light/dark | String | 'dark' |
| footerTheme | 底部主题：light/dark | String | 'light' |
| showBreadcrumb | 是否显示面包屑 | Boolean | true |
| breadcrumbs | 自定义面包屑数据 | Array | [] |
| showPageHeader | 是否显示页面头部 | Boolean | false |
| pageTitle | 页面标题 | String | '' |
| pageDescription | 页面描述 | String | '' |
| showFooter | 是否显示底部 | Boolean | false |
| footerText | 底部文字 | String | '' |
| contentBackground | 内容区域背景色 | String | '#f5f5f5' |
| contentPadding | 内容区域是否有内边距 | Boolean | true |
| showAvatar | 是否显示用户头像 | Boolean | true |
| userInfo | 用户信息对象 | Object | { username: 'Guest', email: '' } |
| avatarMenuList | 用户菜单列表 | Array | [] |
| showLogout | 是否显示退出登录 | Boolean | true |
| showSettings | 是否显示设置按钮 | Boolean | false |
| defaultCollapsed | 初始折叠状态 | Boolean | false |

## 菜单数据结构

```javascript
const menuData = [
  {
    name: '菜单名称',
    path: '/path',           // 菜单路径
    icon: 'mdi-icon-name',   // 图标（可选）
    children: [              // 子菜单（可选）
      {
        name: '子菜单',
        path: '/path/child',
        icon: 'mdi-icon-name',
        children: [          // 三级菜单（可选）
          {
            name: '三级菜单',
            path: '/path/child/grandchild'
          }
        ]
      }
    ]
  }
];
```

## 插槽

### logo
自定义 Logo 区域

```vue
<jh-layout>
  <template v-slot:logo>
    <div class="d-flex align-center">
      <v-avatar color="primary" size="32" class="mr-2">
        <span class="white--text">JH</span>
      </v-avatar>
      <span class="text-h6">JianghuJS</span>
    </div>
  </template>
</jh-layout>
```

### headerRight
自定义头部右侧内容

```vue
<jh-layout>
  <template v-slot:headerRight>
    <v-btn icon>
      <v-badge content="5" color="error">
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>
  </template>
</jh-layout>
```

### pageHeader
自定义页面头部

```vue
<jh-layout show-page-header>
  <template v-slot:pageHeader>
    <div>
      <h2>自定义页面头部</h2>
      <p>这里可以放置统计数据、图表等内容</p>
    </div>
  </template>
</jh-layout>
```

### pageHeaderExtra
页面头部额外操作区

```vue
<jh-layout show-page-header>
  <template v-slot:pageHeaderExtra>
    <v-btn color="primary">新增</v-btn>
  </template>
</jh-layout>
```

### default
主内容区域（默认插槽）

```vue
<jh-layout>
  <v-container>
    <!-- 您的页面内容 -->
  </v-container>
</jh-layout>
```

### footer
自定义底部内容

```vue
<jh-layout show-footer>
  <template v-slot:footer>
    <div class="text-center">
      © 2024 My Company
    </div>
  </template>
</jh-layout>
```

### sidebarFooter
侧边栏底部内容

```vue
<jh-layout>
  <template v-slot:sidebarFooter>
    <v-btn block small>帮助文档</v-btn>
  </template>
</jh-layout>
```

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| menu-click | 菜单点击事件 | (item: MenuItem) |
| breadcrumb-click | 面包屑点击事件 | (item: BreadcrumbItem) |
| avatar-menu-click | 用户菜单点击事件 | (item: MenuItem) |
| logout | 退出登录事件 | - |
| sidebar-toggle | 侧边栏切换事件 | { collapsed: Boolean, visible: Boolean } |
| update:layout | 布局模式更新 | (layout: String) |
| update:headerTheme | 头部主题更新 | (theme: String) |
| update:sidebarTheme | 侧边栏主题更新 | (theme: String) |
| update:showBreadcrumb | 面包屑显示更新 | (show: Boolean) |
| update:showFooter | 底部显示更新 | (show: Boolean) |
| update:contentPadding | 内容内边距更新 | (padding: Boolean) |

## 使用示例

### 侧边布局

```vue
<template>
  <jh-layout
    title="管理系统"
    logo="mdi-view-dashboard"
    layout="side"
    :menu-data="menuData"
    :current-path="currentPath"
    sidebar-theme="dark"
    header-theme="light"
    show-breadcrumb
    show-page-header
    :page-title="pageTitle"
    @menu-click="handleMenuClick"
  >
    <v-container>
      <!-- 页面内容 -->
    </v-container>
  </jh-layout>
</template>
```

### 顶部布局

```vue
<template>
  <jh-layout
    title="管理系统"
    layout="top"
    :menu-data="menuData"
    header-theme="dark"
  >
    <v-container>
      <!-- 页面内容 -->
    </v-container>
  </jh-layout>
</template>
```

### 混合布局

```vue
<template>
  <jh-layout
    title="管理系统"
    layout="mix"
    :menu-data="menuData"
    sidebar-theme="light"
  >
    <v-container>
      <!-- 页面内容 -->
    </v-container>
  </jh-layout>
</template>
```

### 完整示例（带表格）

```vue
<template>
  <jh-layout
    title="用户管理系统"
    logo="mdi-account-group"
    :menu-data="menuData"
    :current-path="currentPath"
    show-breadcrumb
    show-page-header
    page-title="用户列表"
    page-description="管理系统中的所有用户"
    show-footer
    footer-text="Copyright © 2024 My Company"
    :user-info="userInfo"
    :avatar-menu-list="avatarMenuList"
    show-settings
    @menu-click="handleMenuClick"
    @logout="handleLogout"
  >
    <template v-slot:pageHeaderExtra>
      <v-btn color="primary" @click="handleAdd">
        <v-icon left>mdi-plus</v-icon>
        新增用户
      </v-btn>
    </template>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
      >
        <!-- 表格内容 -->
      </v-data-table>
    </v-card>
  </jh-layout>
</template>

<script>
export default {
  data() {
    return {
      currentPath: '/users/list',
      menuData: [
        {
          name: '工作台',
          path: '/dashboard',
          icon: 'mdi-view-dashboard'
        },
        {
          name: '用户管理',
          icon: 'mdi-account-group',
          children: [
            {
              name: '用户列表',
              path: '/users/list',
              icon: 'mdi-account-multiple'
            },
            {
              name: '角色管理',
              path: '/users/roles',
              icon: 'mdi-shield-account'
            }
          ]
        }
      ],
      userInfo: {
        username: '管理员',
        email: 'admin@example.com'
      },
      avatarMenuList: [
        {
          name: '个人中心',
          icon: 'mdi-account-circle',
          path: '/profile'
        },
        {
          name: '账户设置',
          icon: 'mdi-cog',
          path: '/settings'
        }
      ],
      headers: [
        { text: 'ID', value: 'id' },
        { text: '用户名', value: 'username' },
        { text: '邮箱', value: 'email' }
      ],
      users: [],
      loading: false
    };
  },
  methods: {
    handleMenuClick(item) {
      if (item.path) {
        this.currentPath = item.path;
        // 路由跳转
      }
    },
    handleLogout() {
      // 退出登录逻辑
    },
    handleAdd() {
      // 新增用户逻辑
    }
  }
};
</script>
```

## 响应式设计

JhLayout 组件会自动适配不同屏幕尺寸：

- **桌面端（>= 960px）**: 显示完整的侧边栏和菜单
- **移动端（< 960px）**: 侧边栏自动转换为抽屉式，通过按钮控制显示/隐藏

## 主题定制

### 使用内置主题

```vue
<jh-layout
  header-theme="dark"
  sidebar-theme="dark"
  footer-theme="dark"
>
</jh-layout>
```

### 自定义背景色

```vue
<jh-layout
  content-background="#ffffff"
>
</jh-layout>
```

## 最佳实践

1. **菜单数据管理**: 建议将菜单数据统一管理，可以从后端获取或在配置文件中定义
2. **路由同步**: 使用 `currentPath` 属性与路由保持同步
3. **权限控制**: 在菜单数据中添加权限字段，根据用户权限动态过滤菜单
4. **面包屑**: 如果路由结构复杂，建议自定义 `breadcrumbs` 数据
5. **移动端优化**: 在移动端建议隐藏页面头部和底部，保持界面简洁

## 与其他组件配合

JhLayout 可以与其他 JianghuJS 组件完美配合：

- **JhPageContainer**: 推荐在 JhLayout 的内容区域使用 JhPageContainer 作为页面容器，提供统一的页面头部和内容布局
- **JhTable**: 在内容区域展示数据表格
- **JhForm**: 在内容区域展示表单
- **JhQueryFilter**: 在页面头部额外操作区添加搜索过滤
- **JhDrawer**: 作为侧边抽屉使用
- **JhModal**: 作为弹窗使用

### 推荐的组件组合

**JhLayout + JhPageContainer + JhTable**

这是最常用的页面结构组合，适用于大多数列表页面：

```vue
<template>
  <jh-layout
    title="管理系统"
    :menu-data="menuData"
    :current-path="currentPath"
    show-breadcrumb
    :content-padding="false"
  >
    <jh-page-container
      page-name="用户管理"
      :show-help-button="true"
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
```

**说明**：
- `JhLayout` 提供应用级布局（导航、头部、侧边栏）
- `JhPageContainer` 提供页面级容器（页面标题、搜索栏）
- `JhTable` 提供数据表格展示
- 当使用 `JhPageContainer` 时，建议设置 `JhLayout` 的 `content-padding="false"` 和 `show-page-header="false"`，避免重复的内边距和头部

## 常见问题

### 如何自定义面包屑？

通过 `breadcrumbs` 属性传入自定义面包屑数据：

```vue
<jh-layout
  :breadcrumbs="[
    { text: '首页', path: '/', icon: 'mdi-home' },
    { text: '用户管理', path: '/users' },
    { text: '用户列表', disabled: true }
  ]"
>
</jh-layout>
```

### 如何隐藏某些功能？

通过对应的 `show*` 属性控制：

```vue
<jh-layout
  :show-breadcrumb="false"
  :show-page-header="false"
  :show-footer="false"
  :show-avatar="false"
  :show-settings="false"
>
</jh-layout>
```

### 如何实现路由跳转？

在 `menu-click` 事件中处理路由跳转：

```javascript
handleMenuClick(item) {
  if (item.path) {
    this.$router.push(item.path);
    this.currentPath = item.path;
  }
}
```

### 如何保存用户的布局设置？

监听 `update:*` 事件，将设置保存到 localStorage 或后端：

```vue
<jh-layout
  @update:layout="saveLayoutSetting"
  @update:headerTheme="saveThemeSetting"
>
</jh-layout>
```

## 更新日志

### v1.0.0 (2024-01-01)

- ✨ 初始版本发布
- ✨ 支持侧边、顶部、混合三种布局模式
- ✨ 支持亮色/暗色主题
- ✨ 自动生成面包屑导航
- ✨ 响应式设计
- ✨ 设置面板
- ✨ 多级菜单支持

## 参考资料

- [Ant Design Pro - ProLayout](https://procomponents.ant.design/components/layout)
- [Vuetify - Application](https://vuetifyjs.com/en/components/application/)
- [Material Design Icons](https://materialdesignicons.com/)
