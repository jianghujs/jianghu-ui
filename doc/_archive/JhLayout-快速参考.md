# JhLayout 快速参考

## 一分钟上手

```vue
<template>
  <jh-layout
    title="我的应用"
    :menu-data="menuData"
    :current-path="currentPath"
    @menu-click="handleMenuClick"
  >
    <v-container>
      <h1>欢迎使用</h1>
    </v-container>
  </jh-layout>
</template>

<script>
export default {
  data() {
    return {
      currentPath: '/dashboard',
      menuData: [
        { name: '工作台', path: '/dashboard', icon: 'mdi-view-dashboard' },
        {
          name: '用户管理',
          icon: 'mdi-account-group',
          children: [
            { name: '用户列表', path: '/users/list' }
          ]
        }
      ]
    };
  },
  methods: {
    handleMenuClick(item) {
      this.currentPath = item.path;
    }
  }
};
</script>
```

## 常用配置

### 三种布局模式

```vue
<!-- 侧边布局（默认） -->
<jh-layout layout="side" />

<!-- 顶部布局 -->
<jh-layout layout="top" />

<!-- 混合布局 -->
<jh-layout layout="mix" />
```

### 主题配置

```vue
<!-- 暗色主题 -->
<jh-layout
  header-theme="dark"
  sidebar-theme="dark"
/>

<!-- 亮色主题 -->
<jh-layout
  header-theme="light"
  sidebar-theme="light"
/>
```

### 显示/隐藏功能

```vue
<jh-layout
  :show-breadcrumb="true"    <!-- 面包屑 -->
  :show-page-header="true"   <!-- 页面头部 -->
  :show-footer="true"        <!-- 底部 -->
  :show-avatar="true"        <!-- 用户头像 -->
  :show-settings="true"      <!-- 设置按钮 -->
/>
```

## 常用插槽

```vue
<jh-layout>
  <!-- 自定义 Logo -->
  <template v-slot:logo>
    <img src="/logo.png" />
  </template>

  <!-- 页面头部额外操作 -->
  <template v-slot:pageHeaderExtra>
    <v-btn color="primary">新增</v-btn>
  </template>

  <!-- 主内容 -->
  <v-container>
    <!-- 您的内容 -->
  </v-container>

  <!-- 自定义底部 -->
  <template v-slot:footer>
    <div>© 2024 My Company</div>
  </template>
</jh-layout>
```

## 菜单数据结构

```javascript
const menuData = [
  {
    name: '一级菜单',
    path: '/path',
    icon: 'mdi-icon',
    children: [
      {
        name: '二级菜单',
        path: '/path/child',
        children: [
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

## 常用事件

```vue
<jh-layout
  @menu-click="handleMenuClick"
  @breadcrumb-click="handleBreadcrumbClick"
  @logout="handleLogout"
  @sidebar-toggle="handleSidebarToggle"
/>
```

## 完整示例

```vue
<template>
  <jh-layout
    title="用户管理系统"
    logo="mdi-account-group"
    layout="side"
    :menu-data="menuData"
    :current-path="currentPath"
    header-theme="light"
    sidebar-theme="dark"
    show-breadcrumb
    show-page-header
    page-title="用户列表"
    page-description="管理所有用户"
    show-footer
    :user-info="userInfo"
    :avatar-menu-list="avatarMenuList"
    show-settings
    @menu-click="handleMenuClick"
    @logout="handleLogout"
  >
    <!-- 页面头部操作 -->
    <template v-slot:pageHeaderExtra>
      <v-btn color="primary" @click="handleAdd">
        <v-icon left>mdi-plus</v-icon>
        新增用户
      </v-btn>
    </template>

    <!-- 主内容 -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="users"
      />
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
            { name: '用户列表', path: '/users/list' },
            { name: '角色管理', path: '/users/roles' }
          ]
        }
      ],
      userInfo: {
        username: '管理员',
        email: 'admin@example.com'
      },
      avatarMenuList: [
        { name: '个人中心', path: '/profile' },
        { name: '账户设置', path: '/settings' }
      ],
      headers: [
        { text: 'ID', value: 'id' },
        { text: '用户名', value: 'username' }
      ],
      users: []
    };
  },
  methods: {
    handleMenuClick(item) {
      if (item.path) {
        this.currentPath = item.path;
        this.$router.push(item.path);
      }
    },
    handleLogout() {
      // 退出登录
    },
    handleAdd() {
      // 新增用户
    }
  }
};
</script>
```

## Props 速查

| Props | 类型 | 默认值 | 说明 |
|-------|------|--------|------|
| title | String | 'JianghuJS' | 应用标题 |
| logo | String | '' | Logo 图标 |
| menuData | Array | [] | 菜单数据 |
| currentPath | String | '' | 当前路径 |
| layout | String | 'side' | 布局模式 |
| headerTheme | String | 'light' | 头部主题 |
| sidebarTheme | String | 'dark' | 侧边栏主题 |
| showBreadcrumb | Boolean | true | 显示面包屑 |
| showPageHeader | Boolean | false | 显示页面头部 |
| showFooter | Boolean | false | 显示底部 |
| showSettings | Boolean | false | 显示设置 |

## 最佳实践

1. **菜单数据**: 统一管理，支持从后端获取
2. **路由同步**: 使用 `currentPath` 与路由保持同步
3. **权限控制**: 在菜单数据中添加权限字段
4. **移动端**: 自动适配，无需额外处理
5. **主题**: 使用设置面板让用户自定义

## 常见问题

**Q: 如何自定义面包屑？**
```vue
<jh-layout
  :breadcrumbs="[
    { text: '首页', path: '/' },
    { text: '用户列表', disabled: true }
  ]"
/>
```

**Q: 如何实现路由跳转？**
```javascript
handleMenuClick(item) {
  this.$router.push(item.path);
  this.currentPath = item.path;
}
```

**Q: 如何隐藏用户菜单？**
```vue
<jh-layout :show-avatar="false" />
```

**Q: 如何自定义头部右侧？**
```vue
<jh-layout>
  <template v-slot:headerRight>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
  </template>
</jh-layout>
```
