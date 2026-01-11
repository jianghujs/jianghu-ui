<template>
  <v-navigation-drawer
    v-model="isShownInternal"
    :permanent="isShownInternal"
    fixed
    temporary
    :right="position === 'right'"
    :left="position === 'left'"
    :width="width"
    v-bind="mergedDrawerProps"
    class="elevation-24"
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
    <div class="pa-4">
      <!-- 完全自定义内容插槽 -->
      <slot></slot>
    </div>

    <!-- 抽屉关闭按钮 -->
    <v-btn
      v-if="showCloseButton"
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
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'JhDrawer',

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
      validator: (v) => ['left', 'right'].includes(v)
    },

    // 抽屉宽度
    width: {
      type: String,
      default: '90%'
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
  },

  data() {
    return {
      isShownInternal: this.value,
    };
  },
  computed: {
    // 合并透传属性，排除已处理的属性
    mergedDrawerProps() {
      const excludedAttrs = ['value', 'modelValue', 'permanent', 'fixed', 'temporary', 'right', 'left', 'width'];
      const { class: cls, style, ...rest } = this.$attrs || {};
      const filteredAttrs = {};
      
      Object.keys(rest).forEach(key => {
        if (!excludedAttrs.includes(key) && !excludedAttrs.includes(key.replace(/([A-Z])/g, '-$1').toLowerCase())) {
          filteredAttrs[key] = rest[key];
        }
      });
      
      return filteredAttrs;
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
  border-bottom: 1px solid #e0e0e0;
}

.jh-drawer-action-btn-group {
  display: flex;
  align-items: center;
}

.drawer-close-float-btn {
  z-index: 1000;
}
</style>
