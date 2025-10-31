import JhPageContainer from './JhPageContainer.vue';
import JhQueryFilter from '../JhQueryFilter/JhQueryFilter.vue';
import JhTable from '../JhTable/JhTable.vue';
import JhMenu from '../JhMenu/JhMenu.vue';

// 示例数据
const sampleHeaders = [
  { text: 'ID', value: 'id' },
  { text: '用户名', value: 'username' },
  { text: '邮箱', value: 'email' },
  { text: '状态', value: 'status' },
  { text: '创建时间', value: 'createdAt' },
  { text: '操作', value: 'action', width: '150px', sortable: false },
];

const sampleItems = [
  { id: 1, username: '张三', email: 'zhangsan@example.com', status: '启用', createdAt: '2024-01-01' },
  { id: 2, username: '李四', email: 'lisi@example.com', status: '启用', createdAt: '2024-01-02' },
  { id: 3, username: '王五', email: 'wangwu@example.com', status: '禁用', createdAt: '2024-01-03' },
];

export default {
  title: '布局/JhPageContainer',
  component: JhPageContainer,
  tags: ['autodocs'],
  argTypes: {
    pageName: {
      control: 'text',
      description: '页面标题',
    },
    showHelpButton: {
      control: 'boolean',
      description: '是否显示帮助按钮',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# JhPageContainer - 江湖页面容器组件（基础版）

页面容器组件，提供统一的页面布局结构。这是与 test 目录中组件样式和功能保持一致的基础版本。

## 功能特性

- 统一的页面头部布局
- 页面标题显示
- 帮助按钮
- 搜索栏插槽
- 内容区域插槽
- 响应式布局

## 使用场景

适用于所有标准页面布局，提供统一的外观和体验：
- 列表页面
- 详情页面
- 表单页面

## 事件

- \`help-click\`: 点击帮助按钮时触发

## 插槽

- \`search-bar\`: 搜索栏区域
- \`content\`: 主要内容区域
- \`default\`: 其他内容（如抽屉、对话框等）
        `,
      },
    },
  },
};


// 完整列表页面示例
export const Default = {
  args: {
    pageName: '用户管理',
    showHelpButton: true,
  },
  render: (args) => ({
    components: { JhPageContainer, JhQueryFilter, JhTable, JhMenu },
    data() {
      return {
        args,
        keyword: '',
        keywordFieldList: ['username', 'email'],
        headers: sampleHeaders,
        items: sampleItems,
        loading: false,
      };
    },
    template: `
      <jh-page-container
        v-bind="args"
        @help-click="handleHelpClick"
      >
        <template v-slot:menu>
          <jh-menu
            :items="menuItems"
            @select="handleMenuSelect"
          />
        </template>
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
            @create-click="handleCreate"
            @update-click="handleUpdate"
            @delete-click="handleDelete"
          />
        </template>
      </jh-page-container>
    `,
    methods: {
      handleHelpClick() {
        alert('帮助按钮被点击');
      },
      handleSearch() {
        console.log('Search:', this.keyword);
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      handleCreate() {
        alert('新增用户');
      },
      handleUpdate(item) {
        alert('详情：' + item.username);
      },
      handleDelete(item) {
        alert('删除：' + item.username);
      },
    },
  }),
};

// 不显示帮助按钮
export const WithoutHelpButton = {
  args: {
    ...Default.args,
    showHelpButton: false,
  },
  render: Default.render,
};

// 自定义页面标题
export const CustomPageName = {
  args: {
    ...Default.args,
    pageName: '订单管理系统',
  },
  render: Default.render,
};

// 空内容
export const EmptyContent = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    components: { JhPageContainer },
    data() {
      return {
        args,
      };
    },
    template: `
      <jh-page-container
        v-bind="args"
        @help-click="handleHelpClick"
      >
        <template v-slot:content>
          <v-card outlined>
            <v-card-text class="text-center pa-8">
              <v-icon size="64" color="grey lighten-1">mdi-inbox</v-icon>
              <div class="text-h6 grey--text mt-4">暂无数据</div>
              <div class="grey--text text--lighten-1 mt-2">请点击"新增"按钮添加数据</div>
            </v-card-text>
          </v-card>
        </template>
      </jh-page-container>
    `,
    methods: {
      handleHelpClick() {
        alert('帮助按钮被点击');
      },
    },
  }),
};
