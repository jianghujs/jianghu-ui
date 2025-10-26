import JhPageContainer from './JhPageContainer.vue';

export default {
  title: '布局/JhPageContainer',
  component: JhPageContainer,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '页面标题',
      table: {
        defaultValue: { summary: '' },
      },
    },
    subTitle: {
      control: 'text',
      description: '页面子标题',
      table: {
        defaultValue: { summary: '' },
      },
    },
    description: {
      control: 'text',
      description: '页面描述',
      table: {
        defaultValue: { summary: '' },
      },
    },
    showBack: {
      control: 'boolean',
      description: '是否显示返回按钮',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fixedHeader: {
      control: 'boolean',
      description: '是否固定头部',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    contentCard: {
      control: 'boolean',
      description: '是否显示内容卡片背景',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    empty: {
      control: 'boolean',
      description: '是否显示空状态',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

// 基础用法
export const Default = {
  render: () => ({
    components: { JhPageContainer },
    template: `
      <jh-page-container
        title="基础页面"
        sub-title="这是一个基础的页面容器示例"
      >
        <v-card>
          <v-card-text>
            <p>这是页面的主要内容区域。</p>
            <p>JhPageContainer 组件提供了统一的页面布局结构。</p>
          </v-card-text>
        </v-card>
      </jh-page-container>
    `,
  }),
};

// 带面包屑导航
export const WithBreadcrumb = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        breadcrumb: [
          { text: '首页', to: '/', icon: 'mdi-home' },
          { text: '系统管理', to: '/system' },
          { text: '用户管理', disabled: true },
        ],
      };
    },
    template: `
      <jh-page-container
        title="用户管理"
        sub-title="管理系统用户信息"
        :breadcrumb="breadcrumb"
      >
        <v-card>
          <v-card-text>
            <p>带面包屑导航的页面容器。</p>
            <p>面包屑可以帮助用户了解当前位置和导航层级。</p>
          </v-card-text>
        </v-card>
      </jh-page-container>
    `,
  }),
};

// 带返回按钮
export const WithBackButton = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        breadcrumb: [
          { text: '首页', to: '/' },
          { text: '用户列表', to: '/users' },
          { text: '用户详情', disabled: true },
        ],
      };
    },
    methods: {
      handleBack() {
        alert('返回上一页');
      },
    },
    template: `
      <jh-page-container
        title="张三"
        sub-title="ID: 001"
        :breadcrumb="breadcrumb"
        :show-back="true"
        @back="handleBack"
      >
        <v-card>
          <v-card-title>用户信息</v-card-title>
          <v-card-text>
            <v-simple-table>
              <tbody>
                <tr>
                  <td>姓名</td>
                  <td>张三</td>
                </tr>
                <tr>
                  <td>邮箱</td>
                  <td>zhangsan@example.com</td>
                </tr>
                <tr>
                  <td>手机</td>
                  <td>13800138000</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </jh-page-container>
    `,
  }),
};

// 带额外操作按钮
export const WithExtraActions = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        breadcrumb: [
          { text: '首页', to: '/' },
          { text: '商品管理', disabled: true },
        ],
      };
    },
    template: `
      <jh-page-container
        title="商品列表"
        :breadcrumb="breadcrumb"
      >
        <template #extra>
          <v-btn color="primary" class="mr-2">
            <v-icon left>mdi-plus</v-icon>
            新增商品
          </v-btn>
          <v-btn color="default">
            <v-icon left>mdi-download</v-icon>
            导出
          </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th>商品名称</th>
                  <th>价格</th>
                  <th>库存</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>商品A</td>
                  <td>¥99.00</td>
                  <td>100</td>
                  <td><v-chip color="success" small>在售</v-chip></td>
                </tr>
                <tr>
                  <td>商品B</td>
                  <td>¥199.00</td>
                  <td>50</td>
                  <td><v-chip color="success" small>在售</v-chip></td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </jh-page-container>
    `,
  }),
};

// 带标签页
export const WithTabs = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        breadcrumb: [
          { text: '首页', to: '/' },
          { text: '订单管理', disabled: true },
        ],
        tabs: [
          {
            key: 'all',
            label: '全部订单',
            icon: 'mdi-format-list-bulleted',
          },
          {
            key: 'pending',
            label: '待付款',
            badge: 5,
          },
          {
            key: 'processing',
            label: '处理中',
            badge: 12,
          },
          {
            key: 'completed',
            label: '已完成',
          },
        ],
        activeTab: 'all',
      };
    },
    methods: {
      handleTabChange({ activeKey }) {
        console.log('切换到:', activeKey);
      },
    },
    template: `
      <jh-page-container
        title="订单管理"
        :breadcrumb="breadcrumb"
        :tabs="tabs"
        :tab-active-key.sync="activeTab"
        @tab-change="handleTabChange"
      >
        <template #extra>
          <v-btn color="primary">
            <v-icon left>mdi-plus</v-icon>
            新建订单
          </v-btn>
        </template>

        <template #tab-bar-extra>
          <v-btn icon small>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <p>当前标签页: {{ activeTab }}</p>
            <p>这里显示对应标签页的内容。</p>
          </v-card-text>
        </v-card>
      </jh-page-container>
    `,
  }),
};

// 固定头部
export const FixedHeader = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        breadcrumb: [
          { text: '首页', to: '/' },
          { text: '数据统计', disabled: true },
        ],
      };
    },
    template: `
      <div style="height: 100vh; overflow: auto;">
        <jh-page-container
          title="数据统计"
          sub-title="实时数据监控"
          :breadcrumb="breadcrumb"
          :fixed-header="true"
        >
          <template #extra>
            <v-btn color="primary">
              <v-icon left>mdi-refresh</v-icon>
              刷新数据
            </v-btn>
          </template>

          <v-card class="mb-4">
            <v-card-text>
              <p>滚动页面,头部会保持固定在顶部。</p>
            </v-card-text>
          </v-card>

          <v-card v-for="i in 20" :key="i" class="mb-4">
            <v-card-text>
              <p>内容区域 {{ i }}</p>
              <p>这是一个很长的页面,用于演示固定头部效果。</p>
            </v-card-text>
          </v-card>
        </jh-page-container>
      </div>
    `,
  }),
};

// 带页脚
export const WithFooter = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        breadcrumb: [
          { text: '首页', to: '/' },
          { text: '创建订单', disabled: true },
        ],
        selectedCount: 3,
      };
    },
    template: `
      <jh-page-container
        title="创建订单"
        :breadcrumb="breadcrumb"
        :show-back="true"
        :show-footer="true"
      >
        <v-card>
          <v-card-title>订单信息</v-card-title>
          <v-card-text>
            <v-text-field label="订单编号" outlined dense></v-text-field>
            <v-text-field label="客户名称" outlined dense></v-text-field>
            <v-textarea label="备注" outlined dense rows="3"></v-textarea>
          </v-card-text>
        </v-card>

        <template #footer>
          <div class="d-flex justify-space-between align-center">
            <span>已选择 {{ selectedCount }} 件商品</span>
            <div>
              <v-btn text class="mr-2">取消</v-btn>
              <v-btn color="primary">提交订单</v-btn>
            </div>
          </div>
        </template>
      </jh-page-container>
    `,
  }),
};

// 固定头部和页脚
export const FixedHeaderAndFooter = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        breadcrumb: [
          { text: '首页', to: '/' },
          { text: '批量操作', disabled: true },
        ],
      };
    },
    template: `
      <div style="height: 100vh; overflow: auto;">
        <jh-page-container
          title="批量操作"
          :breadcrumb="breadcrumb"
          :fixed-header="true"
          :show-footer="true"
          :fixed-footer="true"
        >
          <v-card v-for="i in 30" :key="i" class="mb-4">
            <v-card-text>
              <v-checkbox :label="'选项 ' + i"></v-checkbox>
            </v-card-text>
          </v-card>

          <template #footer>
            <div class="d-flex justify-end">
              <v-btn text class="mr-2">取消</v-btn>
              <v-btn color="primary">确认</v-btn>
            </div>
          </template>
        </jh-page-container>
      </div>
    `,
  }),
};

// 加载状态
export const Loading = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        loading: true,
      };
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
    template: `
      <jh-page-container
        title="加载中"
        sub-title="数据加载中,请稍候..."
        :loading="loading"
        :show-progress-bar="true"
      >
        <v-card>
          <v-card-text>
            <p>这段内容在加载完成后会显示。</p>
          </v-card-text>
        </v-card>
      </jh-page-container>
    `,
  }),
};

// 空状态
export const Empty = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        breadcrumb: [
          { text: '首页', to: '/' },
          { text: '我的收藏', disabled: true },
        ],
      };
    },
    template: `
      <jh-page-container
        title="我的收藏"
        :breadcrumb="breadcrumb"
        :empty="true"
        empty-text="您还没有收藏任何内容"
      >
        <template #extra>
          <v-btn color="primary">
            <v-icon left>mdi-plus</v-icon>
            添加收藏
          </v-btn>
        </template>
      </jh-page-container>
    `,
  }),
};

// 带水印
export const WithWatermark = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        breadcrumb: [
          { text: '首页', to: '/' },
          { text: '机密文档', disabled: true },
        ],
        watermark: {
          text: '机密文档',
          fontSize: 16,
          color: 'rgba(0,0,0,.15)',
          opacity: 0.5,
          rotate: -22,
        },
      };
    },
    template: `
      <jh-page-container
        title="机密文档管理"
        :breadcrumb="breadcrumb"
        :watermark="watermark"
      >
        <v-card>
          <v-card-title>文档内容</v-card-title>
          <v-card-text>
            <p>这是一份带有水印的机密文档。</p>
            <p>水印可以有效防止截图泄密。</p>
            <p>可以自定义水印的文字、颜色、透明度和旋转角度。</p>
          </v-card-text>
        </v-card>
      </jh-page-container>
    `,
  }),
};

// 自定义样式
export const CustomStyle = {
  render: () => ({
    components: { JhPageContainer },
    template: `
      <jh-page-container
        title="自定义样式"
        sub-title="自定义头部和内容的样式"
        :header-style="{ background: 'linear-gradient(to right, #667eea, #764ba2)', color: 'white' }"
        :content-style="{ background: '#f5f5f5' }"
        :content-padding="32"
      >
        <v-card>
          <v-card-text>
            <p>可以通过 headerStyle 和 contentStyle 自定义样式。</p>
            <p>还可以通过 contentPadding 调整内容区域的内边距。</p>
          </v-card-text>
        </v-card>
      </jh-page-container>
    `,
  }),
};

// 无卡片背景
export const NoCardBackground = {
  render: () => ({
    components: { JhPageContainer },
    template: `
      <jh-page-container
        title="无卡片背景"
        sub-title="内容区域不显示卡片背景"
        :content-card="false"
      >
        <v-alert type="info" class="mb-4">
          这是一个提示信息
        </v-alert>

        <v-card class="mb-4">
          <v-card-title>卡片1</v-card-title>
          <v-card-text>手动添加的卡片</v-card-text>
        </v-card>

        <v-card>
          <v-card-title>卡片2</v-card-title>
          <v-card-text>另一个手动添加的卡片</v-card-text>
        </v-card>
      </jh-page-container>
    `,
  }),
};

// 复杂示例 - 数据表格页面
export const ComplexTablePage = {
  render: () => ({
    components: { JhPageContainer },
    data() {
      return {
        breadcrumb: [
          { text: '首页', to: '/', icon: 'mdi-home' },
          { text: '系统管理', to: '/system' },
          { text: '用户管理', disabled: true },
        ],
        tabs: [
          { key: 'all', label: '全部用户', badge: 156 },
          { key: 'active', label: '在职', badge: 120 },
          { key: 'inactive', label: '离职', badge: 36 },
        ],
        activeTab: 'all',
        users: [
          { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '在职' },
          { id: 2, name: '李四', email: 'lisi@example.com', role: '普通用户', status: '在职' },
          { id: 3, name: '王五', email: 'wangwu@example.com', role: '普通用户', status: '离职' },
        ],
      };
    },
    template: `
      <jh-page-container
        title="用户管理"
        sub-title="管理系统用户的基本信息"
        :breadcrumb="breadcrumb"
        :tabs="tabs"
        :tab-active-key.sync="activeTab"
        :fixed-header="true"
      >
        <template #extra>
          <v-btn color="primary" class="mr-2">
            <v-icon left>mdi-plus</v-icon>
            新增用户
          </v-btn>
          <v-btn color="default">
            <v-icon left>mdi-download</v-icon>
            导出
          </v-btn>
        </template>

        <template #tab-bar-extra>
          <v-btn icon small>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <v-text-field
              label="搜索用户"
              prepend-inner-icon="mdi-magnify"
              outlined
              dense
              hide-details
              class="mb-4"
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="[
              { text: 'ID', value: 'id' },
              { text: '姓名', value: 'name' },
              { text: '邮箱', value: 'email' },
              { text: '角色', value: 'role' },
              { text: '状态', value: 'status' },
              { text: '操作', value: 'actions', sortable: false },
            ]"
            :items="users"
            :items-per-page="10"
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="item.status === '在职' ? 'success' : 'default'" small>
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
      </jh-page-container>
    `,
  }),
};
