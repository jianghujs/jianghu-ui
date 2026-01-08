import JhLayout from './JhLayout.vue';
import JhPageContainer from '../JhPageContainer/JhPageContainer.vue';
import JhTable from '../JhTable/JhTable.vue';
import JhQueryFilter from '../JhQueryFilter/JhQueryFilter.vue';

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

## 与 JhPageContainer 配合

推荐在 JhLayout 的内容区域使用 JhPageContainer 组件：
- JhLayout 提供应用级布局（导航、头部、侧边栏）
- JhPageContainer 提供页面级容器（页面标题、搜索栏）
- 配合使用时，建议设置 \`content-padding="false"\` 和 \`show-page-header="false"\`
        `
      }
    }
  }
};

// 基础示例（默认）
export const 基础示例 = {
  args: {
    title: 'JianghuJS Admin',
    logo: 'mdi-view-dashboard',
    menuData: sampleMenuData,
    currentPath: '/users/list',
    contentBackground: '#f5f5f5',
    userInfo: {
      username: '管理员',
      userId: 'admin',
      roles: ['超级管理员', '系统管理员']
    },
    avatarMenuList: avatarMenuData,
    showSettings: true,
    showAvatar: true
  },
  render: (args) => ({
    components: { JhLayout, JhPageContainer, JhTable, JhQueryFilter },
    data() {
      return {
        args,
        keyword: '',
        keywordFieldList: ['username', 'email'],
        headers: [
          { text: 'ID', value: 'id', dataIndex: 'id', width: '80px' },
          { text: '用户名', value: 'username', dataIndex: 'username', search: true },
          { text: '邮箱', value: 'email', dataIndex: 'email' },
          { text: '角色', value: 'role', dataIndex: 'role' },
          { text: '状态', value: 'status', dataIndex: 'status', width: '100px' },
          { text: '创建时间', value: 'createdAt', dataIndex: 'createdAt', width: '150px' }
        ],
        tableData: [
          { id: 1, username: '张三', email: 'zhangsan@example.com', role: '管理员', status: '启用', createdAt: '2024-01-01' },
          { id: 2, username: '李四', email: 'lisi@example.com', role: '编辑', status: '启用', createdAt: '2024-01-02' },
          { id: 3, username: '王五', email: 'wangwu@example.com', role: '用户', status: '禁用', createdAt: '2024-01-03' },
          { id: 4, username: '赵六', email: 'zhaoliu@example.com', role: '用户', status: '启用', createdAt: '2024-01-04' },
          { id: 5, username: '孙七', email: 'sunqi@example.com', role: '编辑', status: '启用', createdAt: '2024-01-05' },
          { id: 6, username: '周八', email: 'zhouba@example.com', role: '用户', status: '启用', createdAt: '2024-01-06' },
          { id: 7, username: '吴九', email: 'wujiu@example.com', role: '编辑', status: '禁用', createdAt: '2024-01-07' },
          { id: 8, username: '郑十', email: 'zhengshi@example.com', role: '用户', status: '启用', createdAt: '2024-01-08' }
        ],
        loading: false
      };
    },
    template: `
      <jh-layout
        v-bind="args"
        @menu-click="handleMenuClick"
        @logout="handleLogout"
      >
        <jh-page-container
          page-name="用户管理"
          :show-help-button="true"
          @help-click="handleHelpClick"
        >
          <template v-slot:search-bar>
            <jh-query-filter
              class="pa-0"
              :keyword.sync="keyword"
              :keywordFieldList.sync="keywordFieldList"
              :fields="headers"
              @search="handleSearch"
            />
          </template>

          <template v-slot:content>
            <jh-table
              :headers="headers"
              :items="tableData"
              :loading="loading"
              show-index
              header-title="用户列表"
              tooltip="管理系统中的所有用户信息"
              @create-click="handleCreate"
              @update-click="handleUpdate"
              @delete-click="handleDelete"
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
            </jh-table>
          </template>
        </jh-page-container>
      </jh-layout>
    `,
    methods: {
      handleMenuClick(item) {
        console.log('菜单点击:', item);
        this.args.currentPath = item.path || item.id;
      },
      handleLogout() {
        alert('退出登录');
      },
      handleHelpClick() {
        alert('帮助按钮被点击');
      },
      handleSearch() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          console.log('搜索:', this.keyword);
        }, 1000);
      },
      handleCreate() {
        alert('新增用户');
      },
      handleUpdate(item) {
        alert('编辑用户: ' + item.username);
      },
      handleDelete(item) {
        if (confirm('确定删除用户 ' + item.username + ' 吗？')) {
          console.log('删除用户:', item);
        }
      }
    }
  })
};

// 暗色主题
export const 暗色主题 = {
  args: {
    ...基础示例.args,
    contentBackground: '#1e1e1e'
  },
  render: 基础示例.render
};

// 无用户头像
export const 无用户头像 = {
  args: {
    ...基础示例.args,
    showAvatar: false
  },
  render: 基础示例.render
};

// 无设置按钮
export const 无设置按钮 = {
  args: {
    ...基础示例.args,
    showSettings: false
  },
  render: 基础示例.render
};

// 自定义 Logo
export const 自定义Logo = {
  args: {
    ...基础示例.args
  },
  render: (args) => ({
    components: { JhLayout, JhPageContainer },
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

        <jh-page-container page-name="自定义Logo示例">
          <template v-slot:content>
            <v-card>
              <v-card-title>自定义 Logo 示例</v-card-title>
              <v-card-text>
                通过 logo 插槽可以完全自定义 Logo 区域的内容。
              </v-card-text>
            </v-card>
          </template>
        </jh-page-container>
      </jh-layout>
    `
  })
};

// 右侧菜单示例
export const 右侧菜单 = {
  args: {
    ...基础示例.args,
    rightMenuList: [
      { title: '帮助中心', icon: 'mdi-help-circle', id: 'help' },
      { title: '消息通知', icon: 'mdi-bell', id: 'notification' }
    ]
  },
  render: 基础示例.render
};
