import JhMenu from './JhMenu.vue';

// 示例菜单数据
const sampleMenuList = [
  {
    id: 'dashboard',
    title: '首页',
    path: '/dashboard',
  },
  {
    id: 'users',
    title: '用户管理',
    children: [
      { id: 'user-list', title: '用户列表', path: '/users/list' },
      { id: 'user-roles', title: '角色管理', path: '/users/roles' },
      { id: 'user-permissions', title: '权限管理', path: '/users/permissions' },
    ],
  },
  {
    id: 'content',
    title: '内容管理',
    children: [
      { id: 'articles', title: '文章管理', path: '/content/articles' },
      { id: 'categories', title: '分类管理', path: '/content/categories' },
      { id: 'tags', title: '标签管理', path: '/content/tags' },
    ],
  },
  {
    id: 'settings',
    title: '系统设置',
    path: '/settings',
  },
  {
    id: 'help',
    title: '帮助文档',
    path: '/help',
  },
];

const sampleRightMenuList = [
  {
    id: 'notifications',
    title: '消息',
    icon: 'mdi-bell-outline',
    path: '/notifications',
  },
  {
    id: 'docs',
    title: '文档',
    icon: 'mdi-book-open-outline',
    path: '/docs',
  },
];

const sampleAvatarMenuList = [
  {
    id: 'profile',
    title: '个人资料',
    path: '/profile',
  },
  {
    id: 'account',
    title: '账号设置',
    path: '/account',
  },
];

const sampleUserInfo = {
  username: '张三',
  userId: 'zhangsan',
  roles: ['管理员', '编辑者'],
};

export default {
  title: '基础组件/JhMenu - 导航菜单',
  component: JhMenu,
  tags: ['autodocs'],
  argTypes: {
    appTitle: {
      control: 'text',
      description: '应用标题',
    },
    showAvatar: {
      control: 'boolean',
      description: '是否显示用户头像和菜单',
    },
    temporary: {
      control: 'boolean',
      description: '移动端抽屉是否临时显示（点击外部关闭）',
    },
    hideDrawers: {
      control: 'boolean',
      description: '隐藏抽屉（用于Storybook预览时避免抽屉遮挡）',
    },
    activeMenuIndex: {
      control: { type: 'number', min: -1, max: 10 },
      description: '当前激活的菜单索引',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `

一个功能完整的导航菜单组件，支持：
- 响应式设计（PC端和移动端不同布局）
- 一级和二级菜单
- 用户信息和头像菜单
- 右侧工具菜单
- 移动端抽屉菜单

## 菜单数据结构

\`\`\`javascript
// 一级菜单
{
  id: 'menu-id',
  title: '菜单标题',
  path: '/menu/path',
}

// 二级菜单
{
  id: 'parent-menu',
  title: '父菜单',
  children: [
    { id: 'child-1', title: '子菜单1', path: '/path1' },
    { id: 'child-2', title: '子菜单2', path: '/path2' },
  ]
}
\`\`\`

## 事件

- \`menu-click\`: 点击菜单时触发，参数为 (menuItem, menuIndex)
- \`logout\`: 点击登出时触发
        `,
      },
    },
  },
};

// 基础示例
export const 基础示例 = {
  args: {
    appTitle: 'JianghuJS Admin',
    menuList: sampleMenuList,
    rightMenuList: sampleRightMenuList,
    avatarMenuList: sampleAvatarMenuList,
    userInfo: sampleUserInfo,
    showAvatar: true,
    temporary: true,
    hideDrawers: false,
    activeMenuIndex: 0,
    activeSecondMenuId: null,
  },
  render: (args) => ({
    components: { JhMenu },
    data() {
      return { args };
    },
    template: `
      <div>
        <jh-menu
          v-bind="args"
          @menu-click="handleMenuClick"
          @logout="handleLogout"
        >
          <template v-slot:title>{{ args.appTitle }}</template>
        </jh-menu>
        <v-main class="mt-15">
          <v-container>
            <h3>菜单组件演示</h3>
            <p>点击菜单项查看效果</p>
            <v-alert type="info" dense text>
              <strong>提示：</strong>在小屏幕下，菜单会自动切换为移动端抽屉模式
            </v-alert>
          </v-container>
        </v-main>
      </div>
    `,
    methods: {
      handleMenuClick(menu, index) {
        console.log('Menu clicked:', menu, index);
        if (index !== undefined) {
          this.args.activeMenuIndex = index;
        }
        if (menu.id) {
          this.args.activeSecondMenuId = menu.id;
        }
      },
      handleLogout() {
        console.log('Logout clicked');
        alert('登出功能被触发');
      },
    },
  }),
};

// 活动菜单
export const 活动菜单 = {
  args: {
    ...基础示例.args,
    activeMenuIndex: 1,
    activeSecondMenuId: 'user-list',
  },
  render: 基础示例.render,
};

// 无用户头像
export const 无用户头像 = {
  args: {
    ...基础示例.args,
    showAvatar: false,
  },
  render: 基础示例.render,
};

// 最小化菜单
export const 最小化菜单 = {
  args: {
    appTitle: 'Simple App',
    menuList: [
      { id: 'home', title: '首页', path: '/' },
      { id: 'about', title: '关于', path: '/about' },
      { id: 'contact', title: '联系', path: '/contact' },
    ],
    rightMenuList: [],
    avatarMenuList: [],
    userInfo: sampleUserInfo,
    showAvatar: false,
    hideDrawers: false,
  },
  render: 基础示例.render,
};

// 一级菜单
export const 一级菜单 = {
  args: {
    ...基础示例.args,
    menuList: [
      { id: 'dashboard', title: '仪表盘', path: '/dashboard' },
      { id: 'analytics', title: '数据分析', path: '/analytics' },
      { id: 'reports', title: '报表', path: '/reports' },
      { id: 'settings', title: '设置', path: '/settings' },
    ],
  },
  render: 基础示例.render,
};

// 二级菜单
export const 二级菜单 = {
  args: {
    ...基础示例.args,
    menuList: [
      {
        id: 'system',
        title: '系统管理',
        children: [
          { id: 'users', title: '用户管理', path: '/system/users' },
          { id: 'roles', title: '角色管理', path: '/system/roles' },
          { id: 'logs', title: '日志管理', path: '/system/logs' },
        ],
      },
      {
        id: 'content',
        title: '内容管理',
        children: [
          { id: 'posts', title: '文章', path: '/content/posts' },
          { id: 'pages', title: '页面', path: '/content/pages' },
          { id: 'media', title: '媒体', path: '/content/media' },
        ],
      },
    ],
  },
  render: 基础示例.render,
};

// 自定义标题
export const 自定义标题 = {
  args: {
    ...基础示例.args,
  },
  render: (args) => ({
    components: { JhMenu },
    data() {
      return { args };
    },
    template: `
      <div>
        <jh-menu
          v-bind="args"
          @menu-click="handleMenuClick"
          @logout="handleLogout"
        >
          <template v-slot:title>
            <v-icon color="success" class="mr-2">mdi-account-group</v-icon>
            <span class="success--text">{{ args.appTitle }}</span>
          </template>
          <template v-slot:subtitle>
            欢迎使用
          </template>
        </jh-menu>
        <v-main class="mt-15">
          <v-container>
            <h3>自定义标题插槽演示</h3>
            <p>标题区域可以通过插槽自定义内容</p>
          </v-container>
        </v-main>
      </div>
    `,
    methods: {
      handleMenuClick(menu, index) {
        console.log('Menu clicked:', menu, index);
      },
      handleLogout() {
        console.log('Logout clicked');
        alert('登出功能被触发');
      },
    },
  }),
};

// 长菜单列表
export const 长菜单列表 = {
  args: {
    ...基础示例.args,
    menuList: [
      { id: 'menu1', title: '菜单1', path: '/menu1' },
      { id: 'menu2', title: '菜单2', path: '/menu2' },
      { id: 'menu3', title: '菜单3', path: '/menu3' },
      { id: 'menu4', title: '菜单4', path: '/menu4' },
      { id: 'menu5', title: '菜单5', path: '/menu5' },
      { id: 'menu6', title: '菜单6', path: '/menu6' },
      { id: 'menu7', title: '菜单7', path: '/menu7' },
      { id: 'menu8', title: '菜单8', path: '/menu8' },
      {
        id: 'menu9',
        title: '菜单9',
        children: [
          { id: 'submenu1', title: '子菜单1', path: '/menu9/sub1' },
          { id: 'submenu2', title: '子菜单2', path: '/menu9/sub2' },
        ],
      },
      { id: 'menu10', title: '菜单10', path: '/menu10' },
    ],
  },
  render: 基础示例.render,
};

// 三级菜单
export const 三级菜单 = {
  args: {
    ...基础示例.args,
    menuList: [
      {
        id: 'system',
        title: '系统管理',
        children: [
          {
            id: 'users',
            title: '用户管理',
            children: [
              { id: 'user-list', title: '用户列表', path: '/system/users/list' },
              { id: 'user-add', title: '新增用户', path: '/system/users/add' },
            ],
          },
          { id: 'roles', title: '角色管理', path: '/system/roles' },
        ],
      },
      {
        id: 'content',
        title: '内容管理',
        children: [
          { id: 'posts', title: '文章', path: '/content/posts' },
          { id: 'pages', title: '页面', path: '/content/pages' },
        ],
      },
    ],
    activeMenuIndex: 0,
    activeSecondMenuId: 'user-list',
  },
  render: 基础示例.render,
};
