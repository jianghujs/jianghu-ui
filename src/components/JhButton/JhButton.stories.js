import JhButton from './JhButton.vue';

export default {
  title: 'Components/JhButton',
  component: JhButton,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '按钮文本',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: '按钮颜色',
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'default', 'large', 'x-large'],
      description: '按钮尺寸',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
    },
    outlined: {
      control: 'boolean',
      description: '边框样式',
    },
    text: {
      control: 'boolean',
      description: '文本样式',
    },
    block: {
      control: 'boolean',
      description: '块级按钮',
    },
    rounded: {
      control: 'boolean',
      description: '圆角按钮',
    },
    onClick: { action: 'clicked' },
  },
};

// 默认故事
export const Default = {
  args: {
    label: '默认按钮',
    color: 'primary',
  },
};

// 不同颜色
export const Colors = () => ({
  components: { JhButton },
  template: `
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <jh-button label="Primary" color="primary" />
      <jh-button label="Secondary" color="secondary" />
      <jh-button label="Success" color="success" />
      <jh-button label="Error" color="error" />
      <jh-button label="Warning" color="warning" />
      <jh-button label="Info" color="info" />
    </div>
  `,
});

// 不同尺寸
export const Sizes = () => ({
  components: { JhButton },
  template: `
    <div style="display: flex; gap: 10px; align-items: center;">
      <jh-button label="X-Small" size="x-small" />
      <jh-button label="Small" size="small" />
      <jh-button label="Default" size="default" />
      <jh-button label="Large" size="large" />
      <jh-button label="X-Large" size="x-large" />
    </div>
  `,
});

// 带图标
export const WithIcons = () => ({
  components: { JhButton },
  template: `
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <jh-button label="前置图标" prepend-icon="mdi-heart" color="primary" />
      <jh-button label="后置图标" append-icon="mdi-arrow-right" color="secondary" />
      <jh-button label="双图标" prepend-icon="mdi-delete" append-icon="mdi-arrow-down" color="error" />
    </div>
  `,
});

// 不同样式
export const Variants = () => ({
  components: { JhButton },
  template: `
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <jh-button label="默认" color="primary" />
      <jh-button label="边框" color="primary" outlined />
      <jh-button label="文本" color="primary" text />
      <jh-button label="圆角" color="primary" rounded />
    </div>
  `,
});

// 状态
export const States = () => ({
  components: { JhButton },
  template: `
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <jh-button label="正常" color="primary" />
      <jh-button label="禁用" color="primary" disabled />
      <jh-button label="加载中" color="primary" loading />
    </div>
  `,
});

// 块级按钮
export const Block = () => ({
  components: { JhButton },
  template: `
    <jh-button label="块级按钮" color="primary" block />
  `,
});
