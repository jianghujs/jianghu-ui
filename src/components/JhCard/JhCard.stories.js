import JhCard from './JhCard.vue';

export default {
  title: '布局/JhCard - 高级卡片',
  component: JhCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '高级卡片组件，参考 Ant Design ProCard 设计规范。支持标题、提示、操作项、分栏布局、栅格布局、标签页等多种功能。',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '卡片标题',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    tooltip: {
      control: 'text',
      description: '标题旁边的提示信息',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    extra: {
      control: 'text',
      description: '右上角额外内容',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    bordered: {
      control: 'boolean',
      description: '是否有边框',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    headerBordered: {
      control: 'boolean',
      description: '标题和内容之间是否有分割线',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ghost: {
      control: 'boolean',
      description: '幽灵模式，即是否取消卡片内容区域的 padding 和卡片的背景颜色',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: '是否可折叠',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small'],
      description: '卡片尺寸',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    layout: {
      control: { type: 'select' },
      options: ['default', 'center'],
      description: '布局方式',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
      description: 'Flex 方向',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'column' },
      },
    },
    split: {
      control: { type: 'select' },
      options: ['', 'vertical', 'horizontal'],
      description: '分栏模式',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    hoverable: {
      control: 'boolean',
      description: '鼠标悬浮时是否有阴影效果',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

// 基础用法
export const Basic = {
  render: (args) => ({
    components: { JhCard },
    setup() {
      return { args };
    },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          v-bind="args"
          title="默认尺寸"
          tooltip="这是提示"
          extra="extra"
          style="max-width: 400px;"
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '基础卡片，包含标题、提示信息和额外内容。',
      },
    },
  },
};

// 小尺寸卡片
export const SmallSize = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="小尺寸卡片"
          tooltip="这是提示"
          extra="extra"
          size="small"
          style="max-width: 400px;"
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '小尺寸卡片，适合紧凑布局。',
      },
    },
  },
};

// 带分割线的标题
export const HeaderBordered = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="带分割线的标题"
          extra="2024年11月9日"
          header-bordered
          style="max-width: 400px;"
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '标题和内容之间有分割线。',
      },
    },
  },
};

// 可折叠卡片
export const Collapsible = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="可折叠卡片"
          collapsible
          style="max-width: 400px;"
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '可以折叠的卡片，点击右上角按钮展开/收起。',
      },
    },
  },
};

// 加载状态
export const Loading = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="加载中"
          loading
          style="max-width: 400px; min-height: 200px;"
        >
          <div>Card content</div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '显示加载状态的卡片。',
      },
    },
  },
};

// 操作项
export const WithActions = {
  render: () => ({
    components: { JhCard },
    data() {
      return {
        actions: [
          { icon: 'mdi-cog', text: '设置', onClick: () => alert('设置') },
          { icon: 'mdi-pencil', text: '编辑', onClick: () => alert('编辑') },
          { icon: 'mdi-dots-horizontal', text: '更多', onClick: () => alert('更多') },
        ],
      };
    },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="Actions 操作项"
          :actions="actions"
          style="max-width: 400px;"
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '底部带操作项的卡片，操作项之间自动有分割线。',
      },
    },
  },
};

// 无边框
export const NoBorder = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="无边框卡片"
          :bordered="false"
          style="max-width: 400px;"
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '没有边框的卡片。',
      },
    },
  },
};

// 幽灵模式
export const Ghost = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="幽灵模式卡片"
          ghost
          style="max-width: 400px;"
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '幽灵模式，取消背景色和 padding，适合页面布局。',
      },
    },
  },
};

// 悬浮效果
export const Hoverable = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="悬浮效果"
          hoverable
          style="max-width: 400px;"
        >
          <div>鼠标悬浮时会有阴影效果</div>
          <div>Card content</div>
          <div>Card content</div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '鼠标悬浮时显示阴影效果。',
      },
    },
  },
};

// 内容居中
export const CenterLayout = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          layout="center"
          bordered
          style="max-width: 400px; min-height: 200px;"
        >
          <div>内容居中显示</div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '内容上下左右居中显示。',
      },
    },
  },
};

// 栅格布局
export const GridLayout = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card direction="column" ghost :gutter="[0, 8]">
          <jh-card layout="center" bordered>
            colSpan - 24
          </jh-card>
          <jh-card :col-span="12" layout="center" bordered>
            colSpan - 12
          </jh-card>
          <jh-card :col-span="8" layout="center" bordered>
            colSpan - 8
          </jh-card>
        </jh-card>

        <jh-card :gutter="8" title="24栅格" style="margin-top: 16px;">
          <jh-card :col-span="12" layout="center" bordered>
            colSpan - 12
          </jh-card>
          <jh-card :col-span="6" layout="center" bordered>
            colSpan - 6
          </jh-card>
          <jh-card :col-span="6" layout="center" bordered>
            colSpan - 6
          </jh-card>
        </jh-card>

        <jh-card style="margin-top: 16px;" :gutter="8" ghost>
          <jh-card col-span="200px" layout="center" bordered>
            colSpan - 200px
          </jh-card>
          <jh-card layout="center" bordered>
            Auto
          </jh-card>
        </jh-card>

        <jh-card style="margin-top: 16px;" :gutter="8" ghost>
          <jh-card bordered layout="center">
            Auto
          </jh-card>
          <jh-card col-span="30%" bordered layout="center">
            colSpan - 30%
          </jh-card>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '栅格布局，支持数字、像素值、百分比等多种 colSpan 设置。',
      },
    },
  },
};

// 左右分栏
export const VerticalSplit = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="左右分栏带标题"
          extra="2024年11月9日"
          split="vertical"
          bordered
          header-bordered
        >
          <jh-card title="左侧详情" col-span="30%">
            <div style="height: 100px;">左侧内容</div>
          </jh-card>
          <jh-card title="流量占用情况">
            <div style="height: 100px;">右侧内容</div>
          </jh-card>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '左右分栏布局，使用垂直分割线分隔。',
      },
    },
  },
};

// 上下分栏
export const HorizontalSplit = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="上下分栏带标题"
          extra="2024年11月9日"
          split="horizontal"
          bordered
          header-bordered
        >
          <jh-card title="上部详情" col-span="50%">
            <div style="height: 100px;">上部内容</div>
          </jh-card>
          <jh-card title="下部详情">
            <div style="height: 100px;">下部内容</div>
          </jh-card>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '上下分栏布局，使用水平分割线分隔。',
      },
    },
  },
};

// 复杂布局
export const ComplexLayout = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card split="vertical" bordered>
          <jh-card title="左侧菜单" col-span="200px" header-bordered>
            <div style="height: 300px;">
              <div style="padding: 8px;">菜单项 1</div>
              <div style="padding: 8px;">菜单项 2</div>
              <div style="padding: 8px;">菜单项 3</div>
            </div>
          </jh-card>
          <jh-card split="horizontal">
            <jh-card title="顶部信息" header-bordered>
              <div style="height: 100px;">顶部内容区域</div>
            </jh-card>
            <jh-card title="主要内容" header-bordered>
              <div style="height: 200px;">主要内容区域</div>
            </jh-card>
          </jh-card>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '复杂的嵌套分栏布局，左侧固定宽度，右侧上下分栏。',
      },
    },
  },
};

// 统计卡片示例
export const StatisticCards = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card title="核心指标" direction="row" :gutter="16">
          <jh-card layout="center" bordered style="min-height: 120px;">
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #1890ff;">79.0</div>
              <div style="color: rgba(0,0,0,0.45); margin-top: 8px;">今日UV</div>
            </div>
          </jh-card>
          <jh-card layout="center" bordered style="min-height: 120px;">
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #52c41a;">112,893</div>
              <div style="color: rgba(0,0,0,0.45); margin-top: 8px;">冻结金额</div>
            </div>
          </jh-card>
          <jh-card layout="center" bordered style="min-height: 120px;">
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #faad14;">93 / 100</div>
              <div style="color: rgba(0,0,0,0.45); margin-top: 8px;">信息完整度</div>
            </div>
          </jh-card>
          <jh-card layout="center" bordered style="min-height: 120px;">
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #f5222d;">8</div>
              <div style="color: rgba(0,0,0,0.45); margin-top: 8px;">待处理</div>
            </div>
          </jh-card>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '统计卡片示例，展示多个指标数据。',
      },
    },
  },
};

// 响应式布局
export const ResponsiveLayout = {
  render: () => ({
    components: { JhCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card title="响应式卡片组" :gutter="[16, 16]" ghost>
          <jh-card :col-span="8" bordered>
            <div style="padding: 20px; text-align: center;">卡片 1</div>
          </jh-card>
          <jh-card :col-span="8" bordered>
            <div style="padding: 20px; text-align: center;">卡片 2</div>
          </jh-card>
          <jh-card :col-span="8" bordered>
            <div style="padding: 20px; text-align: center;">卡片 3</div>
          </jh-card>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '响应式布局示例，使用 gutter 设置间距。',
      },
    },
  },
};

// 所有功能组合
export const AllFeatures = {
  render: () => ({
    components: { JhCard },
    data() {
      return {
        actions: [
          { icon: 'mdi-cog', onClick: () => alert('设置') },
          { icon: 'mdi-pencil', onClick: () => alert('编辑') },
          { icon: 'mdi-delete', onClick: () => alert('删除') },
        ],
      };
    },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-card
          title="功能完整的卡片"
          tooltip="这是一个包含所有功能的卡片示例"
          extra="额外信息"
          bordered
          header-bordered
          hoverable
          collapsible
          :actions="actions"
          style="max-width: 600px;"
        >
          <div style="padding: 20px;">
            <p>这是一个展示所有功能的卡片：</p>
            <ul>
              <li>标题和提示信息</li>
              <li>右上角额外内容</li>
              <li>标题分割线</li>
              <li>可折叠功能</li>
              <li>悬浮效果</li>
              <li>底部操作项</li>
            </ul>
          </div>
        </jh-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '包含所有功能的完整示例。',
      },
    },
  },
};
