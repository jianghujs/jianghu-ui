# JhLayout - AI 快速集成指南

> 页面布局组件，提供标准的后台管理系统布局结构

## 🎯 核心用法

### 最简单的布局
```vue
<template>
  <v-app>
    <jh-layout
      app-name="我的应用"
      :menu-items="menuItems"
    >
      <router-view />
    </jh-layout>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          title: '首页',
          icon: 'mdi-home',
          path: '/home'
        },
        {
          title: '用户管理',
          icon: 'mdi-account-group',
          path: '/users'
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
| `appName` | String | 应用名称 | `''` |
| `logo` | String | Logo 图片URL | `''` |
| `menuItems` | Array | 菜单项配置 | `[]` |
| `userInfo` | Object | 用户信息 | `{}` |
| `showBreadcrumb` | Boolean | 显示面包屑 | `true` |
| `showUserMenu` | Boolean | 显示用户菜单 | `true` |
| `drawerWidth` | Number | 侧边栏宽度 | `256` |
| `miniVariant` | Boolean | 迷你模式 | `false` |

## 🔧 菜单配置

### 基础菜单
```javascript
menuItems: [
  {
    title: '首页',
    icon: 'mdi-home',
    path: '/home'
  },
  {
    title: '用户管理',
    icon: 'mdi-account-group',
    path: '/users'
  },
  {
    title: '设置',
    icon: 'mdi-cog',
    path: '/settings'
  }
]
```

### 多级菜单
```javascript
menuItems: [
  {
    title: '系统管理',
    icon: 'mdi-cog',
    children: [
      {
        title: '用户管理',
        icon: 'mdi-account',
        path: '/system/users'
      },
      {
        title: '角色管理',
        icon: 'mdi-shield-account',
        path: '/system/roles'
      },
      {
        title: '权限管理',
        icon: 'mdi-key',
        path: '/system/permissions'
      }
    ]
  },
  {
    title: '内容管理',
    icon: 'mdi-file-document',
    children: [
      {
        title: '文章管理',
        icon: 'mdi-text-box',
        path: '/content/articles'
      },
      {
        title: '分类管理',
        icon: 'mdi-folder',
        path: '/content/categories'
      }
    ]
  }
]
```

### 菜单项配置

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | String | 菜单标题 |
| `icon` | String | 图标（Vuetify 图标） |
| `path` | String | 路由路径 |
| `children` | Array | 子菜单 |
| `badge` | String/Number | 徽章内容 |
| `disabled` | Boolean | 是否禁用 |

## 🎨 用户信息配置

```vue
<jh-layout
  app-name="我的应用"
  :menu-items="menuItems"
  :user-info="{
    name: '张三',
    avatar: 'https://example.com/avatar.jpg',
    email: 'zhangsan@example.com',
    role: '管理员'
  }"
  @logout="handleLogout"
/>
```

## 📡 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `logout` | 用户登出 | - |
| `menu-click` | 菜单点击 | `(item)` |

## 🎨 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | 主内容区域 |
| `header-left` | 头部左侧内容 |
| `header-right` | 头部右侧内容 |
| `drawer-prepend` | 侧边栏顶部内容 |
| `drawer-append` | 侧边栏底部内容 |

## ⚡ 快速模板

### 标准后台布局
```vue
<template>
  <v-app>
    <jh-layout
      app-name="管理系统"
      logo="/logo.png"
      :menu-items="menuItems"
      :user-info="userInfo"
      @logout="handleLogout"
    >
      <template #header-right>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </template>
      
      <router-view />
    </jh-layout>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '管理员',
        avatar: '/avatar.jpg',
        email: 'admin@example.com',
        role: '超级管理员'
      },
      menuItems: [
        {
          title: '首页',
          icon: 'mdi-view-dashboard',
          path: '/dashboard'
        },
        {
          title: '系统管理',
          icon: 'mdi-cog',
          children: [
            {
              title: '用户管理',
              icon: 'mdi-account-group',
              path: '/system/users'
            },
            {
              title: '角色管理',
              icon: 'mdi-shield-account',
              path: '/system/roles'
            }
          ]
        },
        {
          title: '内容管理',
          icon: 'mdi-file-document',
          children: [
            {
              title: '文章管理',
              icon: 'mdi-text-box',
              path: '/content/articles'
            },
            {
              title: '分类管理',
              icon: 'mdi-folder',
              path: '/content/categories'
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleLogout() {
      // 登出逻辑
      this.$router.push('/login');
    }
  }
};
</script>
```

### 带徽章的菜单
```javascript
menuItems: [
  {
    title: '消息中心',
    icon: 'mdi-message',
    path: '/messages',
    badge: 5 // 显示未读消息数
  },
  {
    title: '待办事项',
    icon: 'mdi-clipboard-check',
    path: '/todos',
    badge: '新'
  }
]
```

### 自定义侧边栏内容
```vue
<jh-layout
  app-name="我的应用"
  :menu-items="menuItems"
>
  <template #drawer-prepend>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          欢迎回来
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
  </template>
  
  <template #drawer-append>
    <v-divider />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          版本 v1.0.0
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </template>
  
  <router-view />
</jh-layout>
```

## ⚠️ 注意事项

1. **必须包裹在 `<v-app>` 中**
   ```vue
   <v-app>
     <jh-layout>...</jh-layout>
   </v-app>
   ```

2. **菜单路径必须与路由配置一致**

3. **图标使用 Vuetify Material Design Icons**
   - 格式：`mdi-{icon-name}`
   - 查找图标：https://materialdesignicons.com/

4. **用户信息对象结构**
   ```javascript
   {
     name: '用户名',
     avatar: '头像URL',
     email: '邮箱',
     role: '角色'
   }
   ```

5. **主内容区域自动包含 padding 和响应式布局**

## 🔗 相关组件

- **JhPageContainer**: 页面容器组件
- **JhMenu**: 独立菜单组件
