<template>
  <v-navigation-drawer
    v-model="isShownInternal"
    :permanent="isShownInternal"
    fixed
    temporary
    :right="position === 'right'"
    :left="position === 'left'"
    :bottom="isBottomPosition"
    :width="drawerWidth"
    :height="drawerHeight"
    v-bind="mergedDrawerProps"
    v-on="drawerListeners"
    :class="drawerClasses"
    :style="drawerStyles"
  >
    <!-- 抽屉标题 -->
    <v-row v-if="title" class="jh-drawer-header px-4 bg-white sticky top-0 z-10" no-gutters align="center">
      <span class="text-h7 font-weight-bold py-4">{{ title }}</span>
      <v-spacer></v-spacer>

      <!-- 操作按钮组 -->
      <div class="jh-drawer-action-btn-group">
        <!-- 自定义操作按钮插槽 -->
        <slot name="actions">
          <!-- 默认按钮组 -->
          <v-btn
            v-if="showCancelButton"
            class="elevation-0 grey lighten-4"
            @click="handleCancel"
            small
          >
            {{ cancelText }}
          </v-btn>
          
          <v-btn
            v-if="showConfirmButton"
            color="success"
            class="ml-2"
            small
            @click="handleConfirm"
          >
            {{ confirmText }}
          </v-btn>
        </slot>
      </div>
    </v-row>

    <v-divider class="jh-divider"></v-divider>

    <!-- 抽屉内容 -->
    <div :class="drawerContentClass">
      <!-- 完全自定义内容插槽 -->
      <slot></slot>
    </div>

    <!-- 抽屉关闭按钮 -->
    <v-btn
      v-if="shouldRenderCloseButton"
      elevation="0"
      color="success"
      fab
      absolute
      top
      left
      small
      tile
      class="drawer-close-float-btn"
      @click="handleCancel"
    >
      <jh-icon icon="mdi:close" width="24" height="24"></jh-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import JhIcon from '../JhIcon/JhIcon.vue';

export default {
  name: 'JhDrawer',
  inheritAttrs: false,

  components: {
    JhIcon
  },

  props: {
    // 抽屉显示状态
    value: {
      type: Boolean,
      default: false
    },

    // 抽屉标题
    title: {
      type: String,
      default: ''
    },

    // 抽屉位置
    position: {
      type: String,
      default: 'right',
      validator: (v) => ['left', 'right', 'bottom'].includes(v)
    },

    // 抽屉宽度
    width: {
      type: [String, Number],
      default: '90%'
    },

    // 底部抽屉高度
    height: {
      type: [String, Number],
      default: '60vh'
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
    showCloseButton: {
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
    },

    // 抽屉内容class
    drawerContentClass: {
      type: String,
      default: 'pa-4',
    },
  },

  data() {
    return {
      isShownInternal: this.value,
    };
  },
  computed: {
    isBottomPosition() {
      return this.position === 'bottom';
    },
    drawerWidth() {
      return this.isBottomPosition ? '100%' : this.width;
    },
    drawerHeight() {
      return this.isBottomPosition ? this.height : undefined;
    },
    shouldRenderCloseButton() {
      return this.showCloseButton && !this.isBottomPosition;
    },
    drawerClasses() {
      return [
        'elevation-24',
        { 'jh-drawer-bottom': this.isBottomPosition },
        this.$attrs.class
      ];
    },
    drawerStyles() {
      const attrsStyle = this.$attrs ? this.$attrs.style : null;
      if (!this.isBottomPosition) {
        return attrsStyle || null;
      }
      const baseStyle = {
        borderTopLeftRadius: 'var(--radius-lg)',
        borderTopRightRadius: 'var(--radius-lg)',
        top: 'auto',
        bottom: '0',
        left: '0',
        right: '0'
      };
      return attrsStyle ? [baseStyle, attrsStyle] : baseStyle;
    },
    // 合并透传属性，只排除组件内部明确处理的属性
    mergedDrawerProps() {
      // 只排除组件内部明确处理的属性，其他所有属性都透传给 v-navigation-drawer
      const excludedAttrs = [
        'class', 'style',
        // 这些属性在组件内部有特殊处理
        'value', 'modelValue', 'permanent', 'fixed', 'temporary', 'right', 'left', 'bottom', 'width', 'height',
        // JhDrawer 特有的 props（不在 v-navigation-drawer 中）
        'title', 'position', 'showConfirmButton', 'showCancelButton', 'showCloseButton',
        'confirmText', 'cancelText'
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
    drawerListeners() {
      // 只排除组件内部明确处理的事件，其他所有事件都透传给 v-navigation-drawer
      const excludedEvents = [
        // JhDrawer 特有的事件（不在 v-navigation-drawer 中）
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

    // 打开抽屉
    open() {
      this.isShownInternal = true;
    },

    // 关闭抽屉
    close() {
      this.isShownInternal = false;
    }
  }
};
</script>

<style scoped>
.jh-drawer-header {
  border-bottom: 1px solid var(--color-border-light);
}

.jh-drawer-action-btn-group {
  display: flex;
  align-items: center;
}

.jh-drawer-bottom {
  border-top-left-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-lg);
}

.drawer-close-float-btn {
  z-index: 1000;
}
</style>
