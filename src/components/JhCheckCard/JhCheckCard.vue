<template>
  <div
    :class="cardClasses"
    :style="cardStyles"
    @click="handleClick"
  >
    <!-- 选择指示器 -->
    <div v-if="!hideCheckbox" class="jh-check-card-checkbox">
      <v-icon
        :color="isChecked ? 'primary' : 'grey'"
        :size="checkboxSize"
      >
        {{ isChecked ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
      </v-icon>
    </div>

    <!-- 卡片内容 -->
    <div class="jh-check-card-content">
      <!-- 头部内容 -->
      <div v-if="hasHeader" class="jh-check-card-header">
        <!-- 标题 -->
        <div v-if="title" class="jh-check-card-title">
          {{ title }}
        </div>
        <!-- 标题插槽 -->
        <slot name="title"></slot>
        
        <!-- 描述 -->
        <div v-if="description" class="jh-check-card-description">
          {{ description }}
        </div>
        <!-- 描述插槽 -->
        <slot name="description"></slot>
      </div>

      <!-- 主体内容 -->
      <div class="jh-check-card-body">
        <!-- 封面图片 -->
        <div v-if="cover" class="jh-check-card-cover">
          <img :src="cover" :alt="title || 'cover'" />
        </div>
        <!-- 封面插槽 -->
        <slot name="cover"></slot>

        <!-- 默认插槽内容 -->
        <slot></slot>
      </div>

      <!-- 底部额外内容 -->
      <div v-if="extra || $slots.extra" class="jh-check-card-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>

    <!-- 加载遮罩 -->
    <div v-if="loading" class="jh-check-card-loading">
      <v-progress-circular
        indeterminate
        color="primary"
        size="24"
      />
    </div>

    <!-- 禁用遮罩 -->
    <div v-if="disabled" class="jh-check-card-disabled-mask"></div>
  </div>
</template>

<script>
export default {
  name: 'JhCheckCard',

  props: {
    // 卡片标题
    title: {
      type: String,
      default: '',
    },

    // 卡片描述
    description: {
      type: String,
      default: '',
    },

    // 卡片封面图片
    cover: {
      type: String,
      default: '',
    },

    // 右下角额外内容
    extra: {
      type: String,
      default: '',
    },

    // 卡片值，用于多选时的标识
    value: {
      type: [String, Number, Boolean],
      default: null,
    },

    // 是否选中
    checked: {
      type: Boolean,
      default: false,
    },

    // 默认选中状态
    defaultChecked: {
      type: Boolean,
      default: false,
    },

    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },

    // 是否加载中
    loading: {
      type: Boolean,
      default: false,
    },

    // 卡片尺寸 small | default | large
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['small', 'default', 'large'].includes(value),
    },

    // 是否显示边框
    bordered: {
      type: Boolean,
      default: true,
    },

    // 是否隐藏选择框
    hideCheckbox: {
      type: Boolean,
      default: false,
    },

    // 选择框位置 top-left | top-right | bottom-left | bottom-right
    checkboxPosition: {
      type: String,
      default: 'top-right',
      validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value),
    },

    // 是否可悬浮
    hoverable: {
      type: Boolean,
      default: true,
    },

    // 自定义样式
    bodyStyle: {
      type: Object,
      default: () => ({}),
    },

    // 自定义头部样式
    headStyle: {
      type: Object,
      default: () => ({}),
    },

    // 卡片宽度
    width: {
      type: [String, Number],
      default: '',
    },

    // 卡片高度
    height: {
      type: [String, Number],
      default: '',
    },
  },

  data() {
    return {
      internalChecked: this.checked || this.defaultChecked,
    };
  },

  computed: {
    // 是否选中
    isChecked() {
      return this.checked !== undefined ? this.checked : this.internalChecked;
    },

    // 是否有头部
    hasHeader() {
      return this.title || this.$slots.title || this.description || this.$slots.description;
    },

    // 卡片样式类
    cardClasses() {
      return [
        'jh-check-card',
        `jh-check-card--${this.size}`,
        `jh-check-card--checkbox-${this.checkboxPosition}`,
        {
          'jh-check-card--bordered': this.bordered,
          'jh-check-card--checked': this.isChecked,
          'jh-check-card--disabled': this.disabled,
          'jh-check-card--loading': this.loading,
          'jh-check-card--hoverable': this.hoverable && !this.disabled,
        },
      ];
    },

    // 卡片样式
    cardStyles() {
      const styles = { ...this.bodyStyle };
      
      if (this.width) {
        styles.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
      }
      
      if (this.height) {
        styles.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      }
      
      return styles;
    },

    // 选择框尺寸
    checkboxSize() {
      const sizeMap = {
        small: 16,
        default: 18,
        large: 20,
      };
      return sizeMap[this.size];
    },
  },

  watch: {
    checked(val) {
      this.internalChecked = val;
    },
  },

  methods: {
    // 处理点击事件
    handleClick(event) {
      if (this.disabled || this.loading) {
        return;
      }

      // 如果 checked 是受控的，不改变内部状态
      if (this.checked === undefined) {
        this.internalChecked = !this.internalChecked;
      }

      // 触发事件
      this.$emit('click', event);
      this.$emit('change', !this.isChecked, this.value);
      
      // 兼容 v-model
      this.$emit('input', !this.isChecked);
    },
  },
};
</script>

<style scoped>
/* 卡片容器 */
.jh-check-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow: hidden;
  user-select: none;
}

/* 边框 */
.jh-check-card--bordered {
  border: 1px solid #d9d9d9;
}

/* 选中状态 */
.jh-check-card--checked {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

/* 禁用状态 */
.jh-check-card--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.jh-check-card--disabled .jh-check-card-content {
  pointer-events: none;
}

/* 加载状态 */
.jh-check-card--loading {
  cursor: default;
}

/* 悬浮效果 */
.jh-check-card--hoverable:hover:not(.jh-check-card--disabled):not(.jh-check-card--loading) {
  border-color: #1890ff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}

/* 尺寸变体 */
.jh-check-card--small {
  min-height: 80px;
}

.jh-check-card--default {
  min-height: 100px;
}

.jh-check-card--large {
  min-height: 120px;
}

/* 选择框 */
.jh-check-card-checkbox {
  position: absolute;
  z-index: 2;
}

.jh-check-card--checkbox-top-left .jh-check-card-checkbox {
  top: 8px;
  left: 8px;
}

.jh-check-card--checkbox-top-right .jh-check-card-checkbox {
  top: 8px;
  right: 8px;
}

.jh-check-card--checkbox-bottom-left .jh-check-card-checkbox {
  bottom: 8px;
  left: 8px;
}

.jh-check-card--checkbox-bottom-right .jh-check-card-checkbox {
  bottom: 8px;
  right: 8px;
}

/* 卡片内容 */
.jh-check-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.jh-check-card--small .jh-check-card-content {
  padding: 12px;
}

.jh-check-card--large .jh-check-card-content {
  padding: 20px;
}

/* 头部 */
.jh-check-card-header {
  margin-bottom: 8px;
}

.jh-check-card-title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 1.5;
  margin-bottom: 4px;
}

.jh-check-card--small .jh-check-card-title {
  font-size: 14px;
}

.jh-check-card--large .jh-check-card-title {
  font-size: 18px;
}

.jh-check-card-description {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
}

.jh-check-card--small .jh-check-card-description {
  font-size: 12px;
}

.jh-check-card--large .jh-check-card-description {
  font-size: 14px;
}

/* 主体内容 */
.jh-check-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 封面图片 */
.jh-check-card-cover {
  margin-bottom: 12px;
}

.jh-check-card-cover img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
}

/* 额外内容 */
.jh-check-card-extra {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: right;
}

/* 加载遮罩 */
.jh-check-card-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

/* 禁用遮罩 */
.jh-check-card-disabled-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 5;
}

/* 响应式 */
@media (max-width: 768px) {
  .jh-check-card-content {
    padding: 12px;
  }
  
  .jh-check-card-title {
    font-size: 14px;
  }
  
  .jh-check-card-description {
    font-size: 12px;
  }
}
</style>
