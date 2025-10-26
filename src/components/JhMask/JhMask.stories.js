import JhMask from './JhMask.vue';

export default {
  title: '反馈/JhMask',
  component: JhMask,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'boolean',
      description: '是否显示遮罩层',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    color: {
      control: 'color',
      description: '背景颜色',
      table: {
        defaultValue: { summary: '#e3e3e3' },
      },
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '透明度 (0-1)',
      table: {
        defaultValue: { summary: '0.8' },
      },
    },
    zIndex: {
      control: 'number',
      description: 'z-index 层级',
      table: {
        defaultValue: { summary: '300' },
      },
    },
    showLoading: {
      control: 'boolean',
      description: '是否显示 loading 动画',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loadingSize: {
      control: 'number',
      description: 'loading 动画大小',
      table: {
        defaultValue: { summary: '64' },
      },
    },
    loadingWidth: {
      control: 'number',
      description: 'loading 动画线条宽度',
      table: {
        defaultValue: { summary: '7' },
      },
    },
    loadingColor: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'white'],
      description: 'loading 动画颜色',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    closeOnClick: {
      control: 'boolean',
      description: '点击遮罩是否关闭',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    timeout: {
      control: 'number',
      description: '自动关闭时间(毫秒), 0表示不自动关闭',
      table: {
        defaultValue: { summary: '0' },
      },
    },
  },
};

// 基础用法
export const Default = {
  args: {
    value: true,
  },
  render: (args) => ({
    components: { JhMask },
    data() {
      return {
        isVisible: args.value,
      };
    },
    template: `
      <div>
        <v-btn @click="isVisible = !isVisible">切换遮罩</v-btn>
        <jh-mask
          v-model="isVisible"
          v-bind="$props"
        />
      </div>
    `,
    props: Object.keys(args),
  }),
};

// 带 Loading 动画
export const WithLoading = {
  args: {
    value: true,
    showLoading: true,
  },
  render: (args) => ({
    components: { JhMask },
    data() {
      return {
        isVisible: args.value,
      };
    },
    template: `
      <div>
        <v-btn @click="isVisible = !isVisible">切换遮罩</v-btn>
        <jh-mask
          v-model="isVisible"
          v-bind="$props"
        />
      </div>
    `,
    props: Object.keys(args),
  }),
};

// 点击关闭
export const ClickToClose = {
  args: {
    value: true,
    closeOnClick: true,
    showLoading: true,
  },
  render: (args) => ({
    components: { JhMask },
    data() {
      return {
        isVisible: args.value,
      };
    },
    template: `
      <div>
        <v-btn @click="isVisible = !isVisible">切换遮罩</v-btn>
        <p class="mt-2 text-caption">点击遮罩可关闭</p>
        <jh-mask
          v-model="isVisible"
          v-bind="$props"
        />
      </div>
    `,
    props: Object.keys(args),
  }),
};

// 自动关闭
export const AutoClose = {
  args: {
    value: true,
    showLoading: true,
    timeout: 3000,
  },
  render: (args) => ({
    components: { JhMask },
    data() {
      return {
        isVisible: args.value,
      };
    },
    template: `
      <div>
        <v-btn @click="isVisible = true">显示遮罩(3秒后自动关闭)</v-btn>
        <jh-mask
          v-model="isVisible"
          v-bind="$props"
          @timeout="handleTimeout"
        />
      </div>
    `,
    methods: {
      handleTimeout() {
        console.log('遮罩已自动关闭');
      },
    },
    props: Object.keys(args),
  }),
};

// 自定义内容
export const CustomContent = {
  args: {
    value: true,
  },
  render: (args) => ({
    components: { JhMask },
    data() {
      return {
        isVisible: args.value,
      };
    },
    template: `
      <div>
        <v-btn @click="isVisible = !isVisible">切换遮罩</v-btn>
        <jh-mask
          v-model="isVisible"
          v-bind="$props"
        >
          <v-card width="300">
            <v-card-title>自定义内容</v-card-title>
            <v-card-text>这是自定义的遮罩内容</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="isVisible = false">关闭</v-btn>
            </v-card-actions>
          </v-card>
        </jh-mask>
      </div>
    `,
    props: Object.keys(args),
  }),
};

// 不同颜色
export const DifferentColors = {
  render: () => ({
    components: { JhMask },
    data() {
      return {
        mask1: false,
        mask2: false,
        mask3: false,
      };
    },
    template: `
      <div>
        <v-btn class="mr-2" @click="mask1 = !mask1">白色遮罩</v-btn>
        <v-btn class="mr-2" @click="mask2 = !mask2">黑色遮罩</v-btn>
        <v-btn @click="mask3 = !mask3">蓝色遮罩</v-btn>

        <jh-mask
          v-model="mask1"
          color="white"
          :opacity="0.9"
          show-loading
        />

        <jh-mask
          v-model="mask2"
          color="black"
          :opacity="0.7"
          show-loading
          loading-color="white"
        />

        <jh-mask
          v-model="mask3"
          color="primary"
          :opacity="0.5"
          show-loading
          loading-color="white"
        />
      </div>
    `,
  }),
};
