# JhLayout 组件更新总结

> **更新日期**: 2025-11-09  
> **版本**: v2.0

## 📝 更新概述

JhLayout 组件进行了简化重构，从原来的多模式布局简化为基于 JhMenu 的顶部导航布局，更加专注和易用。

## 🔄 主要变化

### 移除的功能

以下 Props 已被移除：

- ~~`layout`~~ - 布局模式（side/top/mix）
- ~~`sidebarWidth`~~ - 侧边栏宽度
- ~~`headerHeight`~~ - 头部高度
- ~~`headerTheme`~~ - 头部主题
- ~~`sidebarTheme`~~ - 侧边栏主题
- ~~`footerTheme`~~ - 底部主题
- ~~`showBreadcrumb`~~ - 显示面包屑
- ~~`breadcrumbs`~~ - 面包屑数据
- ~~`showPageHeader`~~ - 显示页面头部
- ~~`pageTitle`~~ - 页面标题
- ~~`pageDescription`~~ - 页面描述
- ~~`showFooter`~~ - 显示底部
- ~~`footerText`~~ - 底部文字
- ~~`contentPadding`~~ - 内容内边距
- ~~`showLogout`~~ - 显示退出登录
- ~~`defaultCollapsed`~~ - 初始折叠状态

以下插槽已被移除：

- ~~`headerRight`~~ - 头部右侧内容
- ~~`pageHeader`~~ - 页面头部
- ~~`pageHeaderExtra`~~ - 页面头部额外操作
- ~~`footer`~~ - 底部内容
- ~~`sidebarFooter`~~ - 侧边栏底部

以下事件已被移除：

- ~~`breadcrumb-click`~~ - 面包屑点击
- ~~`avatar-menu-click`~~ - 用户菜单点击
- ~~`sidebar-toggle`~~ - 侧边栏切换
- ~~`update:layout`~~ - 布局模式更新
- ~~`update:headerTheme`~~ - 头部主题更新
- ~~`update:sidebarTheme`~~ - 侧边栏主题更新
- ~~`update:showBreadcrumb`~~ - 面包屑显示更新
- ~~`update:showFooter`~~ - 底部显示更新
- ~~`update:contentPadding`~~ - 内容内边距更新

### 保留的核心功能

**Props**:
- `title` - 应用标题
- `logo` - Logo 图标
- `menuData` - 菜单数据
- `currentPath` - 当前路由路径
- `contentBackground` - 内容区域背景色
- `showAvatar` - 显示用户头像
- `userInfo` - 用户信息
- `avatarMenuList` - 用户菜单列表
- `showSettings` - 显示设置按钮

**新增 Props**:
- `rightMenuList` - 右侧菜单列表

**Events**:
- `menu-click` - 菜单点击（参数变更为 `(menu, index)`）
- `logout` - 退出登录

**新增 Events**:
- `update:contentBackground` - 内容背景色更新
- `update:showAvatar` - 显示头像更新

**Slots**:
- `logo` (原 `title`) - 自定义 Logo 区域
- `default` - 主内容区域

### 新增功能

#### 设置抽屉

启用 `showSettings` 后，页面右下角会显示设置按钮，点击打开设置抽屉：

1. **内容背景色**: 实时调整内容区域背景色
2. **功能开关**: 显示/隐藏用户头像
3. **快速预设**: 
   - 默认主题（#f5f5f5 背景）
   - 暗色主题（#1e1e1e 背景）
   - 紧凑模式（#ffffff 背景）
4. **重置按钮**: 恢复默认设置

#### 右侧菜单

支持在顶部导航右侧添加额外菜单项：

```javascript
rightMenuList: [
  { title: '帮助中心', icon: 'mdi-help-circle', id: 'help' },
  { title: '消息通知', icon: 'mdi-bell', id: 'notification' }
]
```

## 📋 迁移指南

### 从旧版本迁移

#### 1. 移除布局模式配置

```vue
<!-- 旧版本 -->
<jh-layout
  layout="side"
  sidebar-theme="dark"
  header-theme="light"
  :sidebar-width="256"
/>

<!-- 新版本 - 移除这些配置 -->
<jh-layout />
```

#### 2. 使用 JhPageContainer 替代页面头部

```vue
<!-- 旧版本 -->
<jh-layout
  show-page-header
  page-title="用户管理"
  page-description="管理系统用户"
>
  <template #pageHeaderExtra>
    <v-btn>新增</v-btn>
  </template>
</jh-layout>

<!-- 新版本 - 使用 JhPageContainer -->
<jh-layout>
  <jh-page-container
    page-name="用户管理"
    description="管理系统用户"
  >
    <template #actions>
      <v-btn>新增</v-btn>
    </template>
  </jh-page-container>
</jh-layout>
```

#### 3. 移除面包屑配置

```vue
<!-- 旧版本 -->
<jh-layout
  show-breadcrumb
  :breadcrumbs="breadcrumbs"
/>

<!-- 新版本 - 移除面包屑，使用菜单导航 -->
<jh-layout />
```

#### 4. 移除底部配置

```vue
<!-- 旧版本 -->
<jh-layout
  show-footer
  footer-text="© 2024 Company"
>
  <template #footer>
    <div>自定义底部</div>
  </template>
</jh-layout>

<!-- 新版本 - 在内容区域自行添加底部 -->
<jh-layout>
  <div>
    <!-- 页面内容 -->
  </div>
  <v-footer>© 2024 Company</v-footer>
</jh-layout>
```

#### 5. 使用设置面板替代主题切换

```vue
<!-- 旧版本 -->
<jh-layout
  :header-theme.sync="headerTheme"
  :sidebar-theme.sync="sidebarTheme"
/>

<!-- 新版本 - 使用设置面板 -->
<jh-layout
  :show-settings="true"
  :content-background.sync="contentBg"
  :show-avatar.sync="showAvatar"
/>
```

## 💡 最佳实践

### 推荐的组件组合

**JhLayout + JhPageContainer + JhTable**

这是最常用的页面结构组合：

```vue
<jh-layout
  title="管理系统"
  :menu-data="menuData"
  :current-path="currentPath"
  show-settings
>
  <jh-page-container page-name="用户管理">
    <template #search-bar>
      <jh-query-filter />
    </template>
    
    <template #content>
      <jh-table />
    </template>
  </jh-page-container>
</jh-layout>
```

### 菜单数据结构

支持三级菜单嵌套：

```javascript
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
        icon: 'mdi-shield-account',
        children: [
          {
            name: '角色列表',
            path: '/users/roles/list'
          },
          {
            name: '权限配置',
            path: '/users/roles/permissions'
          }
        ]
      }
    ]
  }
]
```

### 用户信息配置

```javascript
userInfo: {
  username: '管理员',
  userId: 'admin',
  roles: ['超级管理员', '系统管理员']
}

avatarMenuList: [
  { name: '个人中心', icon: 'mdi-account-circle', path: '/profile' },
  { name: '账户设置', icon: 'mdi-cog', path: '/settings' }
]
```

## 🎯 设计理念

### 简化原则

1. **专注核心功能**: 移除复杂的布局模式，专注于顶部导航布局
2. **组件协同**: 与 JhMenu、JhPageContainer 等组件配合使用
3. **灵活扩展**: 通过插槽和设置面板提供定制能力
4. **降低复杂度**: 减少配置项，提高易用性

### 职责分离

- **JhLayout**: 应用级布局（导航、头部）
- **JhPageContainer**: 页面级容器（页面标题、搜索栏）
- **JhMenu**: 菜单导航（一级、二级、三级菜单）

## 📚 相关文档

- [JhLayout README](../../src/components/JhLayout/README.md)
- [JhMenu README](../../src/components/JhMenu/README.md)
- [JhPageContainer README](../../src/components/JhPageContainer/README.md)
- [组件 API 速查表](./component-api-cheatsheet.md)
- [快速参考手册](./quick-reference.md)

## ⚠️ 注意事项

1. **不再支持侧边栏布局**: 如需侧边栏，请使用 `v-navigation-drawer` 自行实现
2. **不再支持面包屑**: 建议使用菜单导航或在页面内自行实现
3. **设置持久化**: 设置面板的配置不会自动持久化，需要监听 `update:*` 事件自行保存
4. **响应式**: 组件会自动适配移动端，但不再提供移动端抽屉式侧边栏

## 🔗 相关链接

- [Ant Design Pro - ProLayout](https://procomponents.ant.design/components/layout)
- [Vuetify - Application](https://vuetifyjs.com/en/components/application/)
- [Material Design Icons](https://materialdesignicons.com/)
