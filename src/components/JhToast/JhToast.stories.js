import JhToast from './JhToast.vue';

export default {
  title: '反馈/JhToast',
  component: JhToast,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'boolean',
      description: '是否显示',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    message: {
      control: 'text',
      description: '消息内容',
      table: {
        defaultValue: { summary: '' },
      },
    },
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'loading'],
      description: '消息类型',
      table: {
        defaultValue: { summary: 'success' },
      },
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: '显示位置',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    timeout: {
      control: 'number',
      description: '自动关闭时间(毫秒), -1表示不自动关闭',
      table: {
        defaultValue: { summary: '3000' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: '是否显示关闭按钮',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

// 基础用法
export const Default = {
  render: () => ({
    components: { JhToast },
    data() {
      return {
        show: false,
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">显示提示</v-btn>
        <jh-toast
          v-model="show"
          message="这是一条成功消息"
          type="success"
        />
      </div>
    `,
  }),
};

// 不同类型
export const DifferentTypes = {
  render: () => ({
    components: { JhToast },
    data() {
      return {
        showSuccess: false,
        showError: false,
        showWarning: false,
        showInfo: false,
        showLoading: false,
      };
    },
    template: `
      <div>
        <v-btn class="mr-2 mb-2" color="success" @click="showSuccess = true">Success</v-btn>
        <v-btn class="mr-2 mb-2" color="error" @click="showError = true">Error</v-btn>
        <v-btn class="mr-2 mb-2" color="warning" @click="showWarning = true">Warning</v-btn>
        <v-btn class="mr-2 mb-2" color="info" @click="showInfo = true">Info</v-btn>
        <v-btn class="mb-2" color="primary" @click="showLoading = true">Loading</v-btn>

        <jh-toast
          v-model="showSuccess"
          message="操作成功完成!"
          type="success"
        />
        <jh-toast
          v-model="showError"
          message="操作失败,请重试"
          type="error"
        />
        <jh-toast
          v-model="showWarning"
          message="请注意此操作的风险"
          type="warning"
        />
        <jh-toast
          v-model="showInfo"
          message="这是一条提示信息"
          type="info"
        />
        <jh-toast
          v-model="showLoading"
          message="正在处理中..."
          type="loading"
        />
      </div>
    `,
  }),
};

// 不同位置
export const DifferentPositions = {
  render: () => ({
    components: { JhToast },
    data() {
      return {
        showTop: false,
        showBottom: false,
        showTopLeft: false,
        showTopRight: false,
        showBottomLeft: false,
        showBottomRight: false,
      };
    },
    template: `
      <div>
        <div class="mb-2">
          <v-btn class="mr-2" @click="showTopLeft = true">Top Left</v-btn>
          <v-btn class="mr-2" @click="showTop = true">Top</v-btn>
          <v-btn @click="showTopRight = true">Top Right</v-btn>
        </div>
        <div>
          <v-btn class="mr-2" @click="showBottomLeft = true">Bottom Left</v-btn>
          <v-btn class="mr-2" @click="showBottom = true">Bottom</v-btn>
          <v-btn @click="showBottomRight = true">Bottom Right</v-btn>
        </div>

        <jh-toast v-model="showTop" message="顶部居中" position="top" />
        <jh-toast v-model="showBottom" message="底部居中" position="bottom" />
        <jh-toast v-model="showTopLeft" message="顶部左侧" position="top-left" />
        <jh-toast v-model="showTopRight" message="顶部右侧" position="top-right" />
        <jh-toast v-model="showBottomLeft" message="底部左侧" position="bottom-left" />
        <jh-toast v-model="showBottomRight" message="底部右侧" position="bottom-right" />
      </div>
    `,
  }),
};

// 带操作按钮
export const WithAction = {
  render: () => ({
    components: { JhToast },
    data() {
      return {
        show: false,
        actionCount: 0,
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">显示带操作的提示</v-btn>
        <p class="mt-2">操作按钮点击次数: {{ actionCount }}</p>
        <jh-toast
          v-model="show"
          message="文件已删除"
          type="warning"
          action-text="撤销"
          @action="actionCount++; show = false"
        />
      </div>
    `,
  }),
};

// 自定义图标和颜色
export const CustomIconAndColor = {
  render: () => ({
    components: { JhToast },
    data() {
      return {
        show1: false,
        show2: false,
        show3: false,
      };
    },
    template: `
      <div>
        <v-btn class="mr-2" @click="show1 = true">自定义图标</v-btn>
        <v-btn class="mr-2" @click="show2 = true">自定义颜色</v-btn>
        <v-btn @click="show3 = true">自定义图标+颜色</v-btn>

        <jh-toast
          v-model="show1"
          message="有新消息"
          icon="mdi-email"
        />
        <jh-toast
          v-model="show2"
          message="自定义紫色"
          color="purple"
        />
        <jh-toast
          v-model="show3"
          message="点赞成功"
          icon="mdi-heart"
          color="pink"
        />
      </div>
    `,
  }),
};

// 长文本消息
export const LongMessage = {
  render: () => ({
    components: { JhToast },
    data() {
      return {
        show1: false,
        show2: false,
      };
    },
    template: `
      <div>
        <v-btn class="mr-2" @click="show1 = true">中等长度消息</v-btn>
        <v-btn @click="show2 = true">超长消息(会被截断)</v-btn>

        <jh-toast
          v-model="show1"
          message="这是一条中等长度的消息,用于测试消息内容的显示效果"
          type="info"
        />
        <jh-toast
          v-model="show2"
          message="这是一条非常非常长的消息内容,主要用于测试当消息内容超过最大长度限制时的显示效果,多余的内容会被自动截断并添加省略号。这样可以保证界面的整洁性,避免消息过长影响用户体验。"
          type="warning"
          :max-length="50"
        />
      </div>
    `,
  }),
};

// 不自动关闭
export const NoAutoClose = {
  render: () => ({
    components: { JhToast },
    data() {
      return {
        show: false,
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">显示不自动关闭的提示</v-btn>
        <p class="mt-2 text-caption">需要手动点击关闭按钮</p>
        <jh-toast
          v-model="show"
          message="重要提示:此消息不会自动关闭"
          type="warning"
          :timeout="-1"
        />
      </div>
    `,
  }),
};

// 垂直布局
export const VerticalLayout = {
  render: () => ({
    components: { JhToast },
    data() {
      return {
        show: false,
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">显示垂直布局</v-btn>
        <jh-toast
          v-model="show"
          message="这是一条使用垂直布局的消息,按钮会显示在下方"
          type="info"
          vertical
          action-text="查看详情"
        />
      </div>
    `,
  }),
};

// 不显示关闭按钮
export const NoCloseButton = {
  render: () => ({
    components: { JhToast },
    data() {
      return {
        show: false,
      };
    },
    template: `
      <div>
        <v-btn @click="show = true">显示无关闭按钮的提示</v-btn>
        <p class="mt-2 text-caption">3秒后自动关闭</p>
        <jh-toast
          v-model="show"
          message="此消息没有关闭按钮,会自动关闭"
          type="success"
          :show-close-button="false"
        />
      </div>
    `,
  }),
};

// 模拟实际场景
export const RealWorldExample = {
  render: () => ({
    components: { JhToast },
    data() {
      return {
        showToast: false,
        toastMessage: '',
        toastType: 'success',
        isProcessing: false,
      };
    },
    methods: {
      async simulateSave() {
        this.isProcessing = true;
        this.toastMessage = '正在保存...';
        this.toastType = 'loading';
        this.showToast = true;

        // 模拟异步操作
        setTimeout(() => {
          const success = Math.random() > 0.3;
          this.toastMessage = success ? '保存成功!' : '保存失败,请重试';
          this.toastType = success ? 'success' : 'error';
          this.isProcessing = false;
        }, 2000);
      },
      async simulateDelete() {
        const result = await this.confirmDelete();
        if (result) {
          this.toastMessage = '删除成功';
          this.toastType = 'warning';
          this.showToast = true;
        }
      },
      async confirmDelete() {
        // 这里应该使用 confirm dialog,这里简化处理
        return window.confirm('确定要删除吗?');
      },
    },
    template: `
      <div>
        <v-btn class="mr-2" @click="simulateSave" :loading="isProcessing">保存数据</v-btn>
        <v-btn @click="simulateDelete">删除数据</v-btn>

        <jh-toast
          v-model="showToast"
          :message="toastMessage"
          :type="toastType"
        />
      </div>
    `,
  }),
};
