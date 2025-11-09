import JhList from './JhList.vue';

export default {
  title: '数据展示/JhList - 高级列表',
  component: JhList,
  tags: ['autodocs'],
};

// 模拟数据
const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `列表项标题 ${i + 1}`,
  subTitle: `副标题 ${i + 1}`,
  description: `这是列表项 ${i + 1} 的描述信息，可以包含更多详细内容。`,
  avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  status: ['success', 'processing', 'error', 'warning'][i % 4],
  progress: Math.floor(Math.random() * 100),
  createTime: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
}));

// 基础列表
export const Basic = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 10),
        metas: {
          title: 'title',
          description: 'description',
        },
      };
    },
    template: `
      <jh-list
        :data-source="dataSource"
        :metas="metas"
        header-title="基础列表"
      />
    `,
  }),
};

// 带头像的列表
export const WithAvatar = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 10),
        metas: {
          title: 'title',
          subTitle: 'subTitle',
          description: 'description',
          avatar: 'avatar',
        },
      };
    },
    template: `
      <jh-list
        :data-source="dataSource"
        :metas="metas"
        header-title="带头像的列表"
        tooltip="这是一个带头像的列表示例"
      />
    `,
  }),
};

// 带操作按钮的列表
export const WithActions = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 10).map(item => ({
          ...item,
          actions: [
            { text: '编辑', icon: 'mdi-pencil', color: 'primary' },
            { text: '删除', icon: 'mdi-delete', color: 'error' },
          ],
        })),
        metas: {
          title: 'title',
          description: 'description',
          avatar: 'avatar',
          actions: 'actions',
        },
      };
    },
    methods: {
      handleAction(action, item) {
        alert(`${action.text}: ${item.title}`);
      },
    },
    template: `
      <jh-list
        :data-source="dataSource"
        :metas="metas"
        header-title="带操作按钮的列表"
        @action-click="handleAction"
      />
    `,
  }),
};

// 带额外内容的列表
export const WithExtra = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 10),
        metas: {
          title: 'title',
          description: 'description',
          avatar: 'avatar',
        },
      };
    },
    template: `
      <jh-list
        :data-source="dataSource"
        :metas="metas"
        header-title="带额外内容的列表"
      >
        <template #extra="{ item }">
          <div style="text-align: right;">
            <div style="font-size: 20px; font-weight: bold; color: #1890ff;">{{ item.progress }}%</div>
            <div style="font-size: 12px; color: #999;">{{ item.createTime }}</div>
          </div>
        </template>
      </jh-list>
    `,
  }),
};

// 网格布局
export const GridLayout = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 12),
        metas: {
          title: 'title',
          description: 'description',
          avatar: 'avatar',
        },
        grid: {
          column: 12,
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
          xl: 3,
        },
      };
    },
    template: `
      <jh-list
        :data-source="dataSource"
        :metas="metas"
        :grid="grid"
        layout="grid"
        header-title="网格布局"
      />
    `,
  }),
};

// 可选择列表
export const WithSelection = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 10),
        metas: {
          title: 'title',
          description: 'description',
          avatar: 'avatar',
        },
        rowSelection: {
          onChange: (keys, rows) => {
            console.log('Selected:', keys, rows);
          },
        },
      };
    },
    template: `
      <jh-list
        :data-source="dataSource"
        :metas="metas"
        :row-selection="rowSelection"
        header-title="可选择列表"
      >
        <template #alert-actions="{ selectedRows }">
          <v-btn small color="primary">批量操作</v-btn>
          <v-btn small color="error">批量删除</v-btn>
        </template>
      </jh-list>
    `,
  }),
};

// 服务端分页
export const ServerPagination = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        metas: {
          title: 'title',
          description: 'description',
          avatar: 'avatar',
          subTitle: 'subTitle',
        },
      };
    },
    methods: {
      async request(params) {
        console.log('Request params:', params);
        // 模拟异步请求
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const { current, pageSize, search } = params;
        let data = [...mockData];
        
        // 搜索过滤
        if (search) {
          data = data.filter(item => 
            item.title.includes(search) || 
            item.description.includes(search)
          );
        }
        
        const total = data.length;
        const start = (current - 1) * pageSize;
        const end = start + pageSize;
        
        return {
          success: true,
          data: data.slice(start, end),
          total,
        };
      },
    },
    template: `
      <jh-list
        :request="request"
        :metas="metas"
        header-title="服务端分页列表"
        tooltip="支持搜索和分页"
      />
    `,
  }),
};

// 自定义渲染
export const CustomRender = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 10),
        metas: {
          title: 'title',
        },
      };
    },
    template: `
      <jh-list
        :data-source="dataSource"
        :metas="metas"
        header-title="自定义渲染"
      >
        <template #renderItem="{ item, index }">
          <v-card class="pa-4" elevation="2" style="width: 100%;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <v-avatar size="60" color="primary">
                <span class="white--text text-h6">{{ index + 1 }}</span>
              </v-avatar>
              <div style="flex: 1;">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">
                  {{ item.title }}
                </div>
                <div style="color: #666; margin-bottom: 8px;">
                  {{ item.description }}
                </div>
                <v-chip small :color="item.status === 'success' ? 'success' : 'warning'">
                  {{ item.status }}
                </v-chip>
              </div>
              <div style="text-align: right;">
                <v-progress-circular
                  :value="item.progress"
                  :color="item.progress > 80 ? 'success' : 'primary'"
                  size="60"
                  width="6"
                >
                  {{ item.progress }}%
                </v-progress-circular>
              </div>
            </div>
          </v-card>
        </template>
      </jh-list>
    `,
  }),
};

// 不同尺寸
export const DifferentSizes = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 5),
        metas: {
          title: 'title',
          description: 'description',
          avatar: 'avatar',
        },
      };
    },
    template: `
      <div>
        <h3>小尺寸</h3>
        <jh-list
          :data-source="dataSource"
          :metas="metas"
          size="small"
          header-title="小尺寸列表"
        />
        
        <h3 class="mt-6">默认尺寸</h3>
        <jh-list
          :data-source="dataSource"
          :metas="metas"
          size="default"
          header-title="默认尺寸列表"
        />
        
        <h3 class="mt-6">大尺寸</h3>
        <jh-list
          :data-source="dataSource"
          :metas="metas"
          size="large"
          header-title="大尺寸列表"
        />
      </div>
    `,
  }),
};

// 幽灵模式
export const GhostMode = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 10),
        metas: {
          title: 'title',
          description: 'description',
          avatar: 'avatar',
        },
      };
    },
    template: `
      <jh-list
        :data-source="dataSource"
        :metas="metas"
        ghost
        header-title="幽灵模式列表"
        tooltip="无边框无背景"
      />
    `,
  }),
};

// 工具栏配置
export const ToolbarConfig = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 10),
        metas: {
          title: 'title',
          description: 'description',
          avatar: 'avatar',
        },
        toolbar: {
          search: true,
          refresh: true,
          layout: true,
          size: true,
        },
      };
    },
    template: `
      <jh-list
        :data-source="dataSource"
        :metas="metas"
        :toolbar="toolbar"
        header-title="完整工具栏"
      >
        <template #toolbar-actions>
          <v-btn color="success" small>
            <v-icon left small>mdi-plus</v-icon>
            新增
          </v-btn>
          <v-btn color="primary" small>
            <v-icon left small>mdi-export</v-icon>
            导出
          </v-btn>
        </template>
        <template #toolbar-extra>
          <v-btn icon small>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
      </jh-list>
    `,
  }),
};

// 复杂示例
export const ComplexExample = {
  render: () => ({
    components: { JhList },
    data() {
      return {
        dataSource: mockData.slice(0, 20),
        metas: {
          title: 'title',
          subTitle: 'subTitle',
          description: 'description',
          avatar: 'avatar',
        },
        rowSelection: {
          onChange: (keys, rows) => {
            console.log('Selected:', keys, rows);
          },
        },
        grid: {
          column: 12,
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
        },
      };
    },
    methods: {
      handleRefresh() {
        alert('刷新列表');
      },
      handleBatchDelete() {
        alert('批量删除');
      },
    },
    template: `
      <jh-list
        :data-source="dataSource"
        :metas="metas"
        :row-selection="rowSelection"
        :grid="grid"
        header-title="项目管理"
        tooltip="管理您的所有项目"
        @refresh="handleRefresh"
      >
        <template #toolbar-actions>
          <v-btn color="success" small>
            <v-icon left small>mdi-plus</v-icon>
            新建项目
          </v-btn>
        </template>
        
        <template #toolbar-extra>
          <v-btn icon small>
            <v-icon>mdi-filter</v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
        
        <template #alert-actions="{ selectedRows }">
          <v-btn small color="primary">批量编辑</v-btn>
          <v-btn small color="error" @click="handleBatchDelete">批量删除</v-btn>
        </template>
        
        <template #extra="{ item }">
          <div style="text-align: right;">
            <v-chip small :color="item.status === 'success' ? 'success' : 'warning'">
              {{ item.status }}
            </v-chip>
            <div style="font-size: 12px; color: #999; margin-top: 4px;">
              {{ item.createTime }}
            </div>
          </div>
        </template>
        
        <template #actions="{ item }">
          <v-btn text x-small color="primary">
            <v-icon small left>mdi-eye</v-icon>
            查看
          </v-btn>
          <v-btn text x-small color="success">
            <v-icon small left>mdi-pencil</v-icon>
            编辑
          </v-btn>
          <v-btn text x-small color="error">
            <v-icon small left>mdi-delete</v-icon>
            删除
          </v-btn>
        </template>
      </jh-list>
    `,
  }),
};
