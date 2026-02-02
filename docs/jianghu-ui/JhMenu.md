# JhMenu - 响应式导航菜单

JhMenu 提供桌面/移动端统一的导航栏，集成多级菜单、右侧自定义菜单及用户头像菜单，适合后台管理与工作台场景。

## 功能特性

- 📱 **响应式布局**：自动在移动端显示抽屉菜单与头像抽屉
- 🌲 **多级菜单**：支持至多三级结构，含折叠/展开交互
- 🧭 **多入口组合**：左侧主菜单、右侧快捷菜单、头像下拉菜单可同时存在
- 🔔 **状态同步**：通过 `activeMenuIndex/activeSecondMenuId` 控制当前高亮
- 🔒 **账号信息展示**：内置用户名、角色标签、登出操作

## 基础用法

```vue
<template>
  <jh-menu
    :app-title="'工作台'"
    :menu-list="menus"
    :right-menu-list="[{ title: '帮助', icon: 'mdi-help-circle' }]"
    :avatar-menu-list="[{ title: '个人设置', id: 'profile' }]"
    :user-info="user"
    @menu-click="handleMenu"
    @logout="logout"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| appTitle | 应用标题 | string | `JianghuJS` |
| menuList | 左侧多级菜单数据 | Array | [] |
| rightMenuList | 顶部右侧快捷菜单数据 | Array | [] |
| avatarMenuList | 头像下拉菜单数据 | Array | [] |
| userInfo | 用户信息 `{ username,userId,roles }` | Object | `{ username: 'Guest', userId: '', roles: [] }` |
| showAvatar | 是否展示头像区域 | boolean | true |
| activeMenuIndex | 当前激活的一级菜单索引 | number | -1 |
| activeSecondMenuId | 当前激活的二级/三级菜单 id | string | null |
| temporary | 移动端抽屉是否点击遮罩关闭 | boolean | true |
| hideDrawers | Storybook 模式下隐藏抽屉 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| menu-click | 任意菜单被点击时触发 | (menuItem: object, index?: number) |
| logout | 点击登出按钮时触发 | - |

### Slots

该组件不暴露插槽，如需扩展请在 `menuList/rightMenuList` 数据中配置。

## 数据结构示例

```js
const menus = [
  {
    title: '首页',
    id: 'home',
    path: '/dashboard'
  },
  {
    title: '系统管理',
    children: [
      { title: '用户管理', id: 'user', path: '/user' },
      {
        title: '审批',
        children: [
          { title: '流程列表', id: 'flow', path: '/flow' }
        ]
      }
    ]
  }
];
```

## 使用建议

- 通过 `menu-item.active` 字段可默认展开某个有子级的菜单
- 所有菜单项建议带上唯一 `id`，方便与二级高亮、埋点等逻辑关联
- 移动端建议搭配 `temporary=true`，以便点击遮罩快速收起抽屉
