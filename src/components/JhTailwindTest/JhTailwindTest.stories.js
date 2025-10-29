import JhTailwindTest from './JhTailwindTest.vue';

export default {
  title: 'Test/JhTailwindTest',
  component: JhTailwindTest,
  tags: ['autodocs'],
  argTypes: {
    showCustomContent: {
      control: 'boolean',
      description: '是否显示自定义内容区域',
    },
    customMessage: {
      control: 'text',
      description: '自定义消息文本',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '这是一个用于测试 Tailwind CSS v4 功能的组件。展示了颜色、间距、阴影、圆角、渐变、Flex 布局等常用 Tailwind 样式。',
      },
    },
  },
};

/**
 * 默认展示 - 包含所有 Tailwind 样式测试
 */
export const Default = {
  args: {
    showCustomContent: true,
    customMessage: 'Tailwind CSS v4 正在正常工作！',
  },
};

/**
 * 不显示自定义内容
 */
export const WithoutCustomContent = {
  args: {
    showCustomContent: false,
  },
};

/**
 * 自定义消息
 */
export const CustomMessage = {
  args: {
    showCustomContent: true,
    customMessage: '这是一条自定义的测试消息，验证 Tailwind 样式是否生效。',
  },
};

/**
 * 响应式测试 - 建议在不同屏幕尺寸下查看效果
 */
export const ResponsiveTest = {
  args: {
    showCustomContent: true,
    customMessage: '尝试调整浏览器窗口大小，查看响应式布局效果！',
  },
  parameters: {
    docs: {
      description: {
        story: '这个示例展示了 Tailwind 的响应式特性。尝试调整浏览器窗口大小，观察网格布局的变化。',
      },
    },
  },
};
