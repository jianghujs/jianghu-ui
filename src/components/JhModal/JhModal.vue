<template>
  <v-dialog
    v-model="isShownInternal"
    :max-width="width"
    :persistent="persistent"
    :fullscreen="fullscreen"
    v-bind="mergedDialogProps"
    v-on="dialogListeners"
    @keydown.esc="handleCancel"
  >
    <v-card>
      <!-- 标题栏 -->
      <v-card-title class="d-flex align-center justify-space-between pa-4 sticky top-0 z-10 bg-white darken-1">
        <span class="text-h6">{{ title }}</span>
        <v-btn
          v-if="closable"
          icon
          small
          @click="handleCancel"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <!-- 弹窗内容 -->
      <v-card-text class="pa-6">
        <!-- 完全自定义内容插槽 -->
        <slot></slot>
      </v-card-text>

      <!-- 底部按钮 -->
      <template v-if="showActions">
        <v-divider />
        <v-card-actions class="pa-4">
          <!-- 自定义操作按钮插槽 -->
          <slot name="actions">
            <!-- 默认按钮组 -->
            <v-spacer />
            <v-btn
              v-if="showCancelButton"
              text
              @click="handleCancel"
            >
              {{ cancelText }}
            </v-btn>
            <v-btn
              v-if="showConfirmButton"
              color="success"
              @click="handleConfirm"
            >
              {{ confirmText }}
            </v-btn>
          </slot>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'JhModal',
  inheritAttrs: false,

  props: {
    // v-model 控制显示/隐藏
    value: {
      type: Boolean,
      default: false,
    },

    // 标题
    title: {
      type: String,
      default: '弹窗',
    },

    // 弹窗宽度
    width: {
      type: [Number, String],
      default: 600,
    },

    // 是否全屏
    fullscreen: {
      type: Boolean,
      default: false,
    },

    // 是否持久化（点击外部不关闭）
    persistent: {
      type: Boolean,
      default: true,
    },

    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: true,
    },

    // 是否显示底部操作区域
    showActions: {
      type: Boolean,
      default: true,
    },

    // 按钮配置
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },

  data() {
    return {
      isShownInternal: this.value,
    };
  },
  computed: {
    // 合并透传属性，只排除组件内部明确处理的属性
    mergedDialogProps() {
      // 只排除组件内部明确处理的属性，其他所有属性都透传给 v-dialog
      const excludedAttrs = [
        'class', 'style',
        // 这些属性在组件内部有特殊处理
        'value', 'modelValue', 'max-width', 'maxWidth', 'persistent', 'fullscreen',
        // JhModal 特有的 props（不在 v-dialog 中）
        'title', 'width', 'closable', 'showActions', 'showConfirmButton',
        'showCancelButton', 'confirmText', 'cancelText'
      ];
      
      const { class: cls, style, ...rest } = this.$attrs || {};
      const filteredAttrs = {};
      
      Object.keys(rest).forEach(key => {
        const keyKebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        // 只排除明确处理的属性，其他都透传
        if (!excludedAttrs.includes(key) && !excludedAttrs.includes(keyKebab)) {
          filteredAttrs[key] = rest[key];
        }
      });
      
      return filteredAttrs;
    },
    // 透传所有事件，只排除组件内部明确处理的事件
    dialogListeners() {
      // 只排除组件内部明确处理的事件，其他所有事件都透传给 v-dialog
      const excludedEvents = [
        // JhModal 特有的事件（不在 v-dialog 中）
        'open', 'close', 'confirm', 'cancel'
      ];
      
      const listeners = { ...this.$listeners || {} };
      const filteredListeners = {};
      
      Object.keys(listeners).forEach(key => {
        // 只排除明确处理的事件，其他都透传
        if (!excludedEvents.includes(key)) {
          filteredListeners[key] = listeners[key];
        }
      });
      
      return filteredListeners;
    }
  },

  watch: {
    value(val) {
      this.isShownInternal = val;
      if (val) {
        this.$emit('open');
      }
    },
    isShownInternal(val) {
      if (!val) {
        this.$emit('input', false);
        this.$emit('close');
      }
    }
  },

  methods: {
    // 处理取消
    handleCancel() {
      this.$emit('cancel');
      this.isShownInternal = false;
    },

    // 处理确认
    handleConfirm() {
      this.$emit('confirm');
    },

    // 打开弹窗
    open() {
      this.isShownInternal = true;
    },

    // 关闭弹窗
    close() {
      this.isShownInternal = false;
    }
  },
};
</script>

<style scoped>
/* 输入标签 */
.jh-input-label {
  display: block;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
}

/* 输入框样式 */
.jh-v-input {
  margin-top: 0;
}
</style>
