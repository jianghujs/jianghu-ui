<template>
  <v-overlay
    :value="value"
    :opacity="opacity"
    :color="color"
    :z-index="zIndex"
    @click="handleClick"
  >
    <slot>
      <v-progress-circular
        v-if="showLoading"
        :size="loadingSize"
        :width="loadingWidth"
        :color="loadingColor"
        indeterminate
      ></v-progress-circular>
    </slot>
  </v-overlay>
</template>

<script>
export default {
  name: 'JhMask',
  props: {
    // 是否显示遮罩
    value: {
      type: Boolean,
      default: false,
    },
    // 背景颜色
    color: {
      type: String,
      default: '#e3e3e3',
    },
    // 透明度 (0-1)
    opacity: {
      type: [Number, String],
      default: 0.8,
      validator: (v) => {
        const num = parseFloat(v);
        return num >= 0 && num <= 1;
      },
    },
    // z-index
    zIndex: {
      type: [Number, String],
      default: 300,
    },
    // 是否显示 loading 动画
    showLoading: {
      type: Boolean,
      default: false,
    },
    // loading 大小
    loadingSize: {
      type: [Number, String],
      default: 64,
    },
    // loading 宽度
    loadingWidth: {
      type: [Number, String],
      default: 7,
    },
    // loading 颜色
    loadingColor: {
      type: String,
      default: 'primary',
    },
    // 点击遮罩是否关闭
    closeOnClick: {
      type: Boolean,
      default: false,
    },
    // 自动关闭时间 (毫秒), 0 表示不自动关闭
    timeout: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  watch: {
    value(newVal) {
      if (newVal && this.timeout > 0) {
        this.startTimer();
      } else if (!newVal) {
        this.clearTimer();
      }
    },
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    handleClick() {
      if (this.closeOnClick) {
        this.$emit('input', false);
        this.$emit('click');
      }
    },
    startTimer() {
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.$emit('input', false);
        this.$emit('timeout');
      }, this.timeout);
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
  },
};
</script>

<style scoped>
/* 自定义样式可以在这里添加 */
</style>
