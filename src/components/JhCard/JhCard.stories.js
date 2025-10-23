import JhCard from './JhCard.vue';
import JhButton from '../JhButton/JhButton.vue';

export default {
  title: 'Components/JhCard',
  component: JhCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '卡片标题',
    },
    subtitle: {
      control: 'text',
      description: '卡片副标题',
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: '阴影深度',
    },
    outlined: {
      control: 'boolean',
      description: '边框样式',
    },
    shaped: {
      control: 'boolean',
      description: '形状样式',
    },
    hover: {
      control: 'boolean',
      description: '悬停效果',
    },
  },
};

// 默认故事
export const Default = {
  args: {
    title: '卡片标题',
    subtitle: '卡片副标题',
  },
  render: (args) => ({
    components: { JhCard },
    setup() {
      return { args };
    },
    template: `
      <jh-card v-bind="args">
        这是卡片的内容区域。可以放置任何内容。
      </jh-card>
    `,
  }),
};

// 带操作按钮
export const WithActions = () => ({
  components: { JhCard, JhButton },
  template: `
    <jh-card title="用户信息" subtitle="个人资料">
      <p>姓名: 张三</p>
      <p>邮箱: zhangsan@example.com</p>
      <p>电话: 138-0000-0000</p>
      <template v-slot:actions>
        <jh-button label="编辑" color="primary" text />
        <jh-button label="删除" color="error" text />
      </template>
    </jh-card>
  `,
});

// 不同样式
export const Variants = () => ({
  components: { JhCard },
  template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
      <jh-card title="默认卡片" elevation="2">
        默认样式的卡片
      </jh-card>
      <jh-card title="边框卡片" outlined>
        带边框的卡片
      </jh-card>
      <jh-card title="形状卡片" shaped elevation="4">
        特殊形状的卡片
      </jh-card>
      <jh-card title="悬停卡片" hover elevation="2">
        鼠标悬停时有效果
      </jh-card>
    </div>
  `,
});

// 不同阴影深度
export const Elevations = () => ({
  components: { JhCard },
  template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
      <jh-card title="阴影 0" elevation="0">
        无阴影
      </jh-card>
      <jh-card title="阴影 2" elevation="2">
        轻微阴影
      </jh-card>
      <jh-card title="阴影 8" elevation="8">
        中等阴影
      </jh-card>
      <jh-card title="阴影 16" elevation="16">
        较深阴影
      </jh-card>
    </div>
  `,
});

// 彩色卡片
export const ColoredCards = () => ({
  components: { JhCard },
  template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
      <jh-card title="主色" color="primary" elevation="4" style="color: white;">
        主题色卡片
      </jh-card>
      <jh-card title="成功" color="success" elevation="4" style="color: white;">
        成功色卡片
      </jh-card>
      <jh-card title="警告" color="warning" elevation="4" style="color: white;">
        警告色卡片
      </jh-card>
      <jh-card title="错误" color="error" elevation="4" style="color: white;">
        错误色卡片
      </jh-card>
    </div>
  `,
});

// 复杂内容
export const ComplexContent = () => ({
  components: { JhCard, JhButton },
  template: `
    <jh-card
      title="产品展示"
      subtitle="最新款智能手机"
      hover
      elevation="4"
    >
      <div>
        <img src="https://via.placeholder.com/300x200" style="width: 100%; margin-bottom: 10px;" />
        <h3>iPhone 15 Pro</h3>
        <p>最新的 A17 Pro 芯片，钛金属边框设计，带来前所未有的性能体验。</p>
        <p style="color: #1976D2; font-size: 24px; font-weight: bold;">¥7,999</p>
      </div>
      <template v-slot:actions>
        <jh-button label="加入购物车" color="primary" outlined />
        <jh-button label="立即购买" color="primary" />
      </template>
    </jh-card>
  `,
});
