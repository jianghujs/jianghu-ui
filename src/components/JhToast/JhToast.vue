<template>
  <v-snackbar
    v-model="isVisible"
    :color="currentColor"
    :timeout="currentTimeout"
    :top="position.includes('top')"
    :bottom="position.includes('bottom')"
    :left="position.includes('left')"
    :right="position.includes('right')"
    :vertical="vertical"
    :elevation="elevation"
    :class="['jh-toast', `jh-toast--${type}`]"
    @input="handleInput"
  >
    <div class="jh-toast__content">
      <v-progress-circular
        v-if="type === 'loading'"
        :size="18"
        :width="3"
        color="white"
        indeterminate
        class="jh-toast__icon"
      ></v-progress-circular>
      <v-icon
        v-else-if="currentIcon"
        :color="iconColor"
        class="jh-toast__icon"
      >
        {{ currentIcon }}
      </v-icon>
      <span class="jh-toast__message">{{ currentMessage }}</span>
    </div>

    <template v-slot:action="{ attrs }">
      <v-btn
        v-if="showCloseButton"
        :color="closeButtonColor"
        text
        small
        v-bind="attrs"
        @click="close"
      >
        {{ closeButtonText }}
      </v-btn>
      <v-btn
        v-if="actionText"
        :color="actionButtonColor"
        text
        small
        v-bind="attrs"
        @click="handleAction"
      >
        {{ actionText }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'JhToast',
  props: {
    // 是否显示
    value: {
      type: Boolean,
      default: false,
    },
    // 消息内容
    message: {
      type: String,
      default: '',
    },
    // 类型: success, error, warning, info, loading
    type: {
      type: String,
      default: 'success',
      validator: (v) => ['success', 'error', 'warning', 'info', 'loading'].includes(v),
    },
    // 位置: top, bottom, top-left, top-right, bottom-left, bottom-right
    position: {
      type: String,
      default: 'top',
      validator: (v) => ['top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(v),
    },
    // 自动关闭时间(毫秒), -1 表示不自动关闭
    timeout: {
      type: Number,
      default: 3000,
    },
    // 自定义颜色
    color: {
      type: String,
      default: '',
    },
    // 自定义图标
    icon: {
      type: String,
      default: '',
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: 'white',
    },
    // 是否显示关闭按钮
    showCloseButton: {
      type: Boolean,
      default: true,
    },
    // 关闭按钮文本
    closeButtonText: {
      type: String,
      default: '关闭',
    },
    // 关闭按钮颜色
    closeButtonColor: {
      type: String,
      default: 'white',
    },
    // 操作按钮文本
    actionText: {
      type: String,
      default: '',
    },
    // 操作按钮颜色
    actionButtonColor: {
      type: String,
      default: 'white',
    },
    // 是否垂直布局
    vertical: {
      type: Boolean,
      default: false,
    },
    // 阴影高度
    elevation: {
      type: [Number, String],
      default: 24,
    },
    // 消息最大长度
    maxLength: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    currentMessage() {
      let msg = this.message || '';
      if (msg.length > this.maxLength) {
        msg = msg.substring(0, this.maxLength) + '...';
      }
      return msg;
    },
    currentColor() {
      if (this.color) return this.color;

      const colorMap = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info',
        loading: 'primary',
      };
      return colorMap[this.type] || 'success';
    },
    currentIcon() {
      if (this.icon) return this.icon;
      if (this.type === 'loading') return '';

      const iconMap = {
        success: 'mdi-check-circle',
        error: 'mdi-alert-circle',
        warning: 'mdi-alert',
        info: 'mdi-information',
      };
      return iconMap[this.type] || 'mdi-check-circle';
    },
    currentTimeout() {
      return this.type === 'loading' ? -1 : this.timeout;
    },
  },
  watch: {
    value(newVal) {
      this.isVisible = newVal;
    },
    isVisible(newVal) {
      if (!newVal) {
        this.$emit('input', false);
      }
    },
  },
  mounted() {
    this.isVisible = this.value;
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
      if (!value) {
        this.$emit('close');
      }
    },
    close() {
      this.isVisible = false;
    },
    handleAction() {
      this.$emit('action');
    },
  },
};
</script>

<style scoped>
.jh-toast__content {
  display: flex;
  align-items: center;
  flex: 1;
}

.jh-toast__icon {
  margin-right: 12px;
}

.jh-toast__message {
  flex: 1;
  word-break: break-word;
}

/* 响应式样式 */
@media screen and (max-width: 600px) {
  .jh-toast__message {
    max-width: calc(100vw - 200px);
  }
}
</style>
