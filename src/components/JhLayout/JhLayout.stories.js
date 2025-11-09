import JhLayout from './JhLayout.vue';

// 示例菜单数据
const sampleMenuData = [
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
      },
      {
        name: '权限管理',
        path: '/users/permissions',
        icon: 'mdi-key'
      }
    ]
  },
  {
    name: '内容管理',
    icon: 'mdi-file-document-multiple',
    children: [
      {
        name: '文章管理',
        icon: 'mdi-file-document',
        children: [
          {
            name: '文章列表',
            path: '/content/articles/list'
          },
          {
            name: '分类管理',
            path: '/content/articles/categories'
          },
          {
            name: '标签管理',
            path: '/content/articles/tags'
          }
        ]
      },
      {
        name: '媒体库',
        path: '/content/media',
        icon: 'mdi-image-multiple'
      }
    ]
  },
  {
    name: '系统设置',
    icon: 'mdi-cog',
    children: [
      {
        name: '基础设置',
        path: '/settings/basic',
        icon: 'mdi-cog-outline'
      },
      {
        name: '安全设置',
        path: '/settings/security',
        icon: 'mdi-shield-check'
      },
      {
        name: '日志管理',
        path: '/settings/logs',
        icon: 'mdi-text-box-multiple'
      }
    ]
  }
];

// 用户菜单数据
const avatarMenuData = [
  {
    name: '个人中心',
    icon: 'mdi-account-circle',
    path: '/profile'
  },
  {
    name: '账户设置',
    icon: 'mdi-cog',
    path: '/account'
  }
];

export default {
  title: '布局/JhLayout - 页面布局',
  component: JhLayout,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '应用标题'
    },
    logo: {
      control: 'text',
      description: 'Logo 图标名称'
    },
    layout: {
      control: 'select',
      options: ['side', 'top', 'mix'],
      description: '布局模式'
    },
    headerTheme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '头部主题'
    },
    sidebarTheme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '侧边栏主题'
    },
    showBreadcrumb: {
      control: 'boolean',
      description: '是否显示面包屑'
    },
    showPageHeader: {
      control: 'boolean',
      description: '是否显示页面头部'
    },
    showFooter: {
      control: 'boolean',
      description: '是否显示底部'
    },
    showSettings: {
      control: 'boolean',
      description: '是否显示设置按钮'
    },
    contentPadding: {
      control: 'boolean',
      description: '内容区域是否有内边距'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `

基于 Ant Design Pro 的 ProLayout 设计的企业级页面布局组件，提供完整的中后台布局解决方案。

## 功能特性

### 🎨 多种布局模式
- **侧边布局 (side)**: 经典的侧边栏导航布局
- **顶部布局 (top)**: 顶部导航栏布局
- **混合布局 (mix)**: 顶部 + 侧边栏混合布局

### 🎯 核心功能
- **响应式设计**: 自动适配移动端和桌面端
- **可折叠侧边栏**: 支持侧边栏折叠/展开
- **自动面包屑**: 根据路由自动生成面包屑导航
- **多级菜单**: 支持三级菜单嵌套
- **主题切换**: 支持亮色/暗色主题
- **页面头部**: 可选的页面标题和描述区域
- **底部区域**: 可自定义的页脚内容
- **用户菜单**: 内置用户头像和下拉菜单
- **设置面板**: 实时调整布局配置

### 📦 插槽支持
- \`logo\`: 自定义 Logo 区域
- \`headerRight\`: 自定义头部右侧内容
- \`pageHeader\`: 自定义页面头部
- \`pageHeaderExtra\`: 页面头部额外操作区
- \`default\`: 主内容区域
- \`footer\`: 自定义底部内容
- \`sidebarFooter\`: 侧边栏底部内容

### 🎪 事件
- \`menu-click\`: 菜单点击事件
- \`breadcrumb-click\`: 面包屑点击事件
- \`avatar-menu-click\`: 用户菜单点击事件
- \`logout\`: 退出登录事件
- \`sidebar-toggle\`: 侧边栏切换事件
- \`update:layout\`: 布局模式更新
- \`update:headerTheme\`: 头部主题更新
- \`update:sidebarTheme\`: 侧边栏主题更新

## 使用场景

适用于所有中后台管理系统的页面布局：
- 企业管理系统
- 数据分析平台
- 内容管理系统
- 电商后台
- 任何需要统一布局的 Web 应用
        `
      }
    }
  }
};

// 侧边布局（默认）
export const 侧边布局 = {
  args: {
    title: 'JianghuJS Admin',
    logo: 'mdi-view-dashboard',
    layout: 'side',
    menuData: sampleMenuData,
    currentPath: '/users/list',
    headerTheme: 'light',
    sidebarTheme: 'dark',
    showBreadcrumb: true,
    showPageHeader: true,
    pageTitle: '用户列表',
    pageDescription: '管理系统中的所有用户信息',
    showFooter: true,
    footerText: 'Copyright © 2024 JianghuJS. All Rights Reserved.',
    userInfo: {
      username: '管理员',
      email: 'admin@jianghujs.com'
    },
    avatarMenuList: avatarMenuData,
    showSettings: true,
    contentPadding: true
  },
  render: (args) => ({
    components: { JhLayout },
    data() {
      return {
        args
      };
    },
    template: `
      <jh-layout
        v-bind="args"
        @menu-click="handleMenuClick"
        @breadcrumb-click="handleBreadcrumbClick"
        @avatar-menu-click="handleAvatarMenuClick"
        @logout="handleLogout"
      >
        <v-container>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="12" md="6" lg="4">
              <v-card>
                <v-card-title>卡片标题 {{ i }}</v-card-title>
                <v-card-text>
                  这是一个示例卡片内容，展示 JhLayout 组件的内容区域。
                  您可以在这里放置任何内容，如表格、表单、图表等。
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="primary">操作</v-btn>
                  <v-btn text>取消</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <template v-slot:pageHeaderExtra>
          <v-btn color="primary" elevation="0">
            <v-icon left>mdi-plus</v-icon>
            新增用户
          </v-btn>
        </template>
      </jh-layout>
    `,
    methods: {
      handleMenuClick(item) {
        console.log('菜单点击:', item);
      },
      handleBreadcrumbClick(item) {
        console.log('面包屑点击:', item);
      },
      handleAvatarMenuClick(item) {
        console.log('用户菜单点击:', item);
      },
      handleLogout() {
        console.log('退出登录');
      }
    }
  })
};

// 顶部布局
export const 顶部布局 = {
  args: {
    ...侧边布局.args,
    layout: 'top',
    headerTheme: 'dark'
  },
  render: 侧边布局.render
};

// 混合布局
export const 混合布局 = {
  args: {
    ...侧边布局.args,
    layout: 'mix',
    headerTheme: 'light',
    sidebarTheme: 'light'
  },
  render: 侧边布局.render
};

// 暗色主题
export const 暗色主题 = {
  args: {
    ...侧边布局.args,
    headerTheme: 'dark',
    sidebarTheme: 'dark',
    footerTheme: 'dark'
  },
  render: 侧边布局.render
};

// 无面包屑
export const 无面包屑 = {
  args: {
    ...侧边布局.args,
    showBreadcrumb: false
  },
  render: 侧边布局.render
};

// 无页面头部
export const 无页面头部 = {
  args: {
    ...侧边布局.args,
    showPageHeader: false
  },
  render: 侧边布局.render
};

// 无底部
export const 无底部 = {
  args: {
    ...侧边布局.args,
    showFooter: false
  },
  render: 侧边布局.render
};

// 无内边距
export const 无内边距 = {
  args: {
    ...侧边布局.args,
    contentPadding: false
  },
  render: 侧边布局.render
};

// 简洁模式
export const 简洁模式 = {
  args: {
    ...侧边布局.args,
    showBreadcrumb: false,
    showPageHeader: false,
    showFooter: false,
    showSettings: false
  },
  render: 侧边布局.render
};

// 自定义 Logo
export const 自定义Logo = {
  args: {
    ...侧边布局.args
  },
  render: (args) => ({
    components: { JhLayout },
    data() {
      return {
        args
      };
    },
    template: `
      <jh-layout v-bind="args">
        <template v-slot:logo>
          <div class="d-flex align-center">
            <v-avatar color="primary" size="32" class="mr-2">
              <span class="white--text font-weight-bold">JH</span>
            </v-avatar>
            <span class="text-h6 font-weight-bold primary--text">JianghuJS</span>
          </div>
        </template>

        <v-container>
          <v-card>
            <v-card-title>自定义 Logo 示例</v-card-title>
            <v-card-text>
              通过 logo 插槽可以完全自定义 Logo 区域的内容。
            </v-card-text>
          </v-card>
        </v-container>
      </jh-layout>
    `
  })
};

// 自定义头部右侧
export const 自定义头部右侧 = {
  args: {
    ...侧边布局.args,
    showAvatar: false
  },
  render: (args) => ({
    components: { JhLayout },
    data() {
      return {
        args,
        notifications: 5
      };
    },
    template: `
      <jh-layout v-bind="args">
        <template v-slot:headerRight>
          <v-btn icon class="mr-2">
            <v-badge :content="notifications" color="error" overlap>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
          <v-btn icon class="mr-2">
            <v-icon>mdi-email</v-icon>
          </v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-avatar size="32" color="primary">
                  <span class="white--text">A</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>管理员</v-list-item-title>
                  <v-list-item-subtitle>admin@example.com</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>个人中心</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>退出登录</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <v-container>
          <v-card>
            <v-card-title>自定义头部右侧内容</v-card-title>
            <v-card-text>
              通过 headerRight 插槽可以自定义头部右侧的内容，如通知、消息等。
            </v-card-text>
          </v-card>
        </v-container>
      </jh-layout>
    `
  })
};

// 自定义页面头部
export const 自定义页面头部 = {
  args: {
    ...侧边布局.args,
    showPageHeader: true
  },
  render: (args) => ({
    components: { JhLayout },
    data() {
      return {
        args,
        stats: [
          { label: '总用户数', value: '1,234', icon: 'mdi-account-group', color: 'primary' },
          { label: '活跃用户', value: '856', icon: 'mdi-account-check', color: 'success' },
          { label: '新增用户', value: '42', icon: 'mdi-account-plus', color: 'info' },
          { label: '待审核', value: '8', icon: 'mdi-account-clock', color: 'warning' }
        ]
      };
    },
    template: `
      <jh-layout v-bind="args">
        <template v-slot:pageHeader>
          <div>
            <h2 class="text-h5 font-weight-bold mb-3">用户管理</h2>
            <v-row>
              <v-col v-for="stat in stats" :key="stat.label" cols="6" md="3">
                <v-card outlined>
                  <v-card-text class="d-flex align-center">
                    <v-avatar :color="stat.color" size="48" class="mr-3">
                      <v-icon dark>{{ stat.icon }}</v-icon>
                    </v-avatar>
                    <div>
                      <div class="text-caption grey--text">{{ stat.label }}</div>
                      <div class="text-h6 font-weight-bold">{{ stat.value }}</div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </template>

        <template v-slot:pageHeaderExtra>
          <v-btn-toggle mandatory>
            <v-btn small>日</v-btn>
            <v-btn small>周</v-btn>
            <v-btn small>月</v-btn>
          </v-btn-toggle>
        </template>

        <v-container>
          <v-card>
            <v-card-title>用户列表</v-card-title>
            <v-card-text>
              通过 pageHeader 插槽可以完全自定义页面头部内容，如统计数据、操作按钮等。
            </v-card-text>
          </v-card>
        </v-container>
      </jh-layout>
    `
  })
};

// 自定义底部
export const 自定义底部 = {
  args: {
    ...侧边布局.args,
    showFooter: true
  },
  render: (args) => ({
    components: { JhLayout },
    data() {
      return {
        args
      };
    },
    template: `
      <jh-layout v-bind="args">
        <template v-slot:footer>
          <v-container class="mt-5">
            <v-row>
              <v-col cols="12" md="4">
                <div class="text-body-2 font-weight-bold mb-2">关于我们</div>
                <div class="text-caption grey--text">
                  JianghuJS 是一个企业级的中后台前端解决方案。
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-body-2 font-weight-bold mb-2">快速链接</div>
                <div class="text-caption">
                  <a href="#" class="grey--text text-decoration-none d-block mb-1">文档</a>
                  <a href="#" class="grey--text text-decoration-none d-block mb-1">GitHub</a>
                  <a href="#" class="grey--text text-decoration-none d-block">更新日志</a>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-body-2 font-weight-bold mb-2">联系我们</div>
                <div class="text-caption grey--text">
                  Email: contact@jianghujs.com<br>
                  GitHub: github.com/jianghujs
                </div>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <div class="text-center text-caption grey--text">
              Copyright © 2024 JianghuJS. All Rights Reserved.
            </div>
          </v-container>
        </template>

        <v-container>
          <v-card>
            <v-card-title>自定义底部示例</v-card-title>
            <v-card-text>
              通过 footer 插槽可以自定义底部内容，如版权信息、友情链接等。
            </v-card-text>
          </v-card>
        </v-container>
      </jh-layout>
    `
  })
};

// 完整示例（包含表格）
export const 完整示例 = {
  args: {
    ...侧边布局.args
  },
  render: (args) => ({
    components: { JhLayout },
    data() {
      return {
        args,
        search: '',
        headers: [
          { text: 'ID', value: 'id' },
          { text: '用户名', value: 'username' },
          { text: '邮箱', value: 'email' },
          { text: '角色', value: 'role' },
          { text: '状态', value: 'status' },
          { text: '创建时间', value: 'createdAt' },
          { text: '操作', value: 'actions', sortable: false }
        ],
        users: [
          { id: 1, username: '张三', email: 'zhangsan@example.com', role: '管理员', status: '启用', createdAt: '2024-01-01' },
          { id: 2, username: '李四', email: 'lisi@example.com', role: '编辑', status: '启用', createdAt: '2024-01-02' },
          { id: 3, username: '王五', email: 'wangwu@example.com', role: '用户', status: '禁用', createdAt: '2024-01-03' },
          { id: 4, username: '赵六', email: 'zhaoliu@example.com', role: '用户', status: '启用', createdAt: '2024-01-04' },
          { id: 5, username: '孙七', email: 'sunqi@example.com', role: '编辑', status: '启用', createdAt: '2024-01-05' }
        ]
      };
    },
    template: `
      <jh-layout v-bind="args">
        <template v-slot:pageHeaderExtra>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="搜索用户"
            single-line
            hide-details
            dense
            outlined
            style="max-width: 300px"
            class="mr-2"
          ></v-text-field>
          <v-btn color="primary" elevation="0">
            <v-icon left>mdi-plus</v-icon>
            新增用户
          </v-btn>
        </template>

        <v-card>
          <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
            class="elevation-0"
          >
            <template v-slot:item.status="{ item }">
              <v-chip
                small
                :color="item.status === '启用' ? 'success' : 'error'"
                text-color="white"
              >
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn icon small>
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon small>
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </jh-layout>
    `
  })
};

// 响应式预览
export const 响应式预览 = {
  args: {
    ...侧边布局.args
  },
  render: 侧边布局.render,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
