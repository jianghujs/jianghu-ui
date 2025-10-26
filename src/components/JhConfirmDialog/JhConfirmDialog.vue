<template>
  <v-dialog
    v-model="isVisible"
    :max-width="maxWidth"
    :persistent="persistent"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title v-if="title || $slots.title">
        <slot name="title">{{ title }}</slot>
      </v-card-title>

      <v-card-text v-if="content || $slots.default" :class="contentClass">
        <slot>
          <div v-html="content"></div>
        </slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="showCancelButton"
          :color="cancelButtonColor"
          :text="cancelButtonText !== ''"
          :disabled="loading"
          @click="handleCancel"
        >
          {{ cancelButtonText || '取消' }}
        </v-btn>
        <v-btn
          :color="confirmButtonColor"
          :text="confirmButtonText !== ''"
          :loading="loading"
          @click="handleConfirm"
        >
          {{ confirmButtonText || '确定' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'JhConfirmDialog',
  props: {
    // 是否显示
    value: {
      type: Boolean,
      default: false,
    },
    // 标题
    title: {
      type: String,
      default: '提示',
    },
    // 内容 (支持 HTML)
    content: {
      type: String,
      default: '',
    },
    // 内容样式类
    contentClass: {
      type: String,
      default: 'pa-6 text-pre-line',
    },
    // 最大宽度
    maxWidth: {
      type: [String, Number],
      default: 420,
    },
    // 是否显示取消按钮
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    // 确认按钮文本
    confirmButtonText: {
      type: String,
      default: '确定',
    },
    // 取消按钮文本
    cancelButtonText: {
      type: String,
      default: '取消',
    },
    // 确认按钮颜色
    confirmButtonColor: {
      type: String,
      default: 'primary',
    },
    // 取消按钮颜色
    cancelButtonColor: {
      type: String,
      default: 'default',
    },
    // 是否持久化(点击外部不关闭)
    persistent: {
      type: Boolean,
      default: false,
    },
    // 是否在确认时显示加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 确认前的钩子函数,返回 false 可阻止关闭
    beforeConfirm: {
      type: Function,
      default: null,
    },
    // 取消前的钩子函数,返回 false 可阻止关闭
    beforeCancel: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  watch: {
    value(newVal) {
      this.isVisible = newVal;
    },
    isVisible(newVal) {
      if (newVal !== this.value) {
        this.$emit('input', newVal);
      }
    },
  },
  mounted() {
    this.isVisible = this.value;
  },
  methods: {
    async handleConfirm() {
      if (this.beforeConfirm) {
        const result = await this.beforeConfirm();
        if (result === false) {
          return;
        }
      }

      this.$emit('confirm');
      if (!this.loading) {
        this.close();
      }
    },
    async handleCancel() {
      if (this.beforeCancel) {
        const result = await this.beforeCancel();
        if (result === false) {
          return;
        }
      }

      this.$emit('cancel');
      this.close();
    },
    handleClickOutside() {
      if (!this.persistent) {
        this.$emit('click-outside');
        this.$emit('cancel');
      }
    },
    close() {
      this.isVisible = false;
    },
    open() {
      this.isVisible = true;
    },
  },
};
</script>

<style scoped>
.text-pre-line {
  white-space: pre-line;
}
</style>
