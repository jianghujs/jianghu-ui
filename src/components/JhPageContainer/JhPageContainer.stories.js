import JhPageContainer from './JhPageContainer.vue';

export default {
  title: 'Layout/JhPageContainer',
  component: JhPageContainer,
  tags: ['autodocs'],
  argTypes: {
    pageTitle: {
      control: 'text',
      description: '页面标题文字',
    },
    showHelpButton: {
      control: 'boolean',
      description: '是否显示帮助按钮',
    },
    'help-click': {
      action: 'help-click',
      description: '帮助按钮点击事件',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'JhPageContainer 是一个页面容器组件,提供统一的页面布局结构,包含页面标题、搜索栏区域和内容区域。支持通过插槽自定义各个区域的内容。',
      },
    },
  },
};

// 基础示例
export const Default = {
  args: {
    pageTitle: '学生管理',
    showHelpButton: true,
  },
  render: (args) => ({
    components: { JhPageContainer },
    setup() {
      return { args };
    },
    template: `
      <jh-page-container v-bind="args">
        <template v-slot:content>
          <v-card>
            <v-card-text class="text-center pa-8">
              这里是页面主内容区域
            </v-card-text>
          </v-card>
        </template>
      </jh-page-container>
    `,
  }),
};

// 带搜索栏
export const WithSearchBar = {
  args: {
    pageTitle: '学生管理',
    showHelpButton: true,
  },
  render: (args) => ({
    components: { JhPageContainer },
    data() {
      return {
        args,
        keyword: '',
        className: '',
      };
    },
    template: `
      <jh-page-container v-bind="args">
        <template v-slot:search-bar>
          <v-row no-gutters class="align-center">
            <v-col cols="12" sm="6" md="4" class="pr-2">
              <v-text-field
                v-model="keyword"
                label="关键词搜索"
                placeholder="请输入学生姓名"
                dense
                outlined
                hide-details
                prepend-inner-icon="mdi-magnify"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="pr-2">
              <v-text-field
                v-model="className"
                label="班级"
                placeholder="请输入班级"
                dense
                outlined
                hide-details
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="auto">
              <v-btn color="primary" @click="() => {}">
                <v-icon left>mdi-magnify</v-icon>
                搜索
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:content>
          <v-card>
            <v-card-text class="text-center pa-8">
              <div>关键词: {{ keyword || '(空)' }}</div>
              <div>班级: {{ className || '(空)' }}</div>
            </v-card-text>
          </v-card>
        </template>
      </jh-page-container>
    `,
  }),
};

// 完整示例(带表格)
export const WithTable = {
  args: {
    pageTitle: '学生管理',
    showHelpButton: true,
  },
  render: (args) => ({
    components: { JhPageContainer },
    data() {
      return {
        args,
        keyword: '',
        headers: [
          { text: '学生ID', value: 'studentId', sortable: true },
          { text: '姓名', value: 'name', sortable: true },
          { text: '性别', value: 'gender', sortable: false },
          { text: '班级', value: 'className', sortable: true },
          { text: '操作', value: 'actions', sortable: false, align: 'center' },
        ],
        items: [
          { studentId: 'S001', name: '张三', gender: '男', className: '一年级1班' },
          { studentId: 'S002', name: '李四', gender: '女', className: '一年级2班' },
          { studentId: 'S003', name: '王五', gender: '男', className: '二年级1班' },
          { studentId: 'S004', name: '赵六', gender: '女', className: '二年级2班' },
          { studentId: 'S005', name: '钱七', gender: '男', className: '三年级1班' },
        ],
      };
    },
    template: `
      <jh-page-container v-bind="args" @help-click="handleHelpClick">
        <template v-slot:search-bar>
          <v-row no-gutters class="align-center">
            <v-col cols="12" sm="8" md="6" class="pr-2">
              <v-text-field
                v-model="keyword"
                label="搜索"
                placeholder="请输入学生姓名或班级"
                dense
                outlined
                hide-details
                prepend-inner-icon="mdi-magnify"
                clearable
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-btn color="primary">
                <v-icon left>mdi-plus</v-icon>
                新增学生
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:content>
          <v-card>
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="10"
              class="elevation-0"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn icon small color="primary" title="编辑">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small color="error" title="删除">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </jh-page-container>
    `,
    methods: {
      handleHelpClick() {
        alert('帮助按钮被点击了!');
      },
    },
  }),
};

// 自定义页面标题插槽
export const CustomPageTitle = {
  args: {
    showHelpButton: false,
  },
  render: (args) => ({
    components: { JhPageContainer },
    setup() {
      return { args };
    },
    template: `
      <jh-page-container v-bind="args">
        <template v-slot:page-title>
          <v-icon color="primary" class="mr-2">mdi-school</v-icon>
          <span style="color: #1976d2;">学生信息管理系统</span>
        </template>
        <template v-slot:content>
          <v-card>
            <v-card-text class="text-center pa-8">
              自定义页面标题样式
            </v-card-text>
          </v-card>
        </template>
      </jh-page-container>
    `,
  }),
};

// 带头部操作按钮
export const WithHeaderActions = {
  args: {
    pageTitle: '数据管理',
    showHelpButton: true,
  },
  render: (args) => ({
    components: { JhPageContainer },
    setup() {
      return { args };
    },
    template: `
      <jh-page-container v-bind="args">
        <template v-slot:header-actions>
          <v-btn icon small class="ml-2" title="刷新">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn icon small class="ml-1" title="设置">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <template v-slot:content>
          <v-card>
            <v-card-text class="text-center pa-8">
              页面标题区域带自定义操作按钮
            </v-card-text>
          </v-card>
        </template>
      </jh-page-container>
    `,
  }),
};

// 无帮助按钮
export const WithoutHelpButton = {
  args: {
    pageTitle: '简单页面',
    showHelpButton: false,
  },
  render: (args) => ({
    components: { JhPageContainer },
    setup() {
      return { args };
    },
    template: `
      <jh-page-container v-bind="args">
        <template v-slot:content>
          <v-card>
            <v-card-text class="text-center pa-8">
              没有帮助按钮的页面
            </v-card-text>
          </v-card>
        </template>
      </jh-page-container>
    `,
  }),
};

// 复杂布局示例
export const ComplexLayout = {
  args: {
    pageTitle: '仪表盘',
    showHelpButton: true,
  },
  render: (args) => ({
    components: { JhPageContainer },
    data() {
      return {
        args,
        stats: [
          { title: '总学生数', value: '1,234', icon: 'mdi-account-group', color: 'primary' },
          { title: '今日新增', value: '56', icon: 'mdi-account-plus', color: 'success' },
          { title: '请假人数', value: '12', icon: 'mdi-account-off', color: 'warning' },
          { title: '毕业学生', value: '234', icon: 'mdi-school', color: 'info' },
        ],
      };
    },
    template: `
      <jh-page-container v-bind="args">
        <template v-slot:search-bar>
          <v-row no-gutters class="align-center">
            <v-col cols="auto" class="pr-2">
              <v-select
                :items="['本月', '本季度', '本年']"
                value="本月"
                dense
                outlined
                hide-details
                style="min-width: 120px;"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-btn color="primary">
                <v-icon left>mdi-download</v-icon>
                导出报表
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:content>
          <v-row>
            <v-col
              v-for="(stat, index) in stats"
              :key="index"
              cols="12"
              sm="6"
              md="3"
            >
              <v-card>
                <v-card-text>
                  <div class="d-flex align-center justify-space-between">
                    <div>
                      <div class="text-caption text--secondary mb-1">{{ stat.title }}</div>
                      <div class="text-h5 font-weight-bold">{{ stat.value }}</div>
                    </div>
                    <v-avatar :color="stat.color" size="48">
                      <v-icon dark>{{ stat.icon }}</v-icon>
                    </v-avatar>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col cols="12">
              <v-card>
                <v-card-title>最近活动</v-card-title>
                <v-card-text class="text-center pa-8">
                  图表区域
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </jh-page-container>
    `,
  }),
};
