<template>
  <v-navigation-drawer
    v-if="value"
    :value="value"
    @input="handleDrawerInput"
    :permanent="value"
    fixed
    temporary
    :right="placement === 'right'"
    :left="placement === 'left'"
    :width="drawerWidth"
    class="elevation-24 jh-drawer-form"
  >
    <v-form ref="formRef" lazy-validation>
      <!-- 抽屉头部 -->
      <v-row
        class="jh-drawer-header px-4"
        :class="{ 'pl-[30px] md:pl-4': true }"
        no-gutters
        align="center"
      >
        <!-- 移动端返回按钮 -->
        <v-icon
          v-if="isMobile"
          @click="handleClose"
          class="mr-2"
        >
          mdi-chevron-left
        </v-icon>

        <div class="d-flex justify-center py-3 flex-grow-1 align-center">
          <span class="text-h7 font-weight-bold">{{ title }}</span>
          <v-spacer></v-spacer>
        </div>

        <!-- 头部操作按钮 -->
        <div
          v-if="headerActions && headerActions.length > 0"
          class="jh-drawer-action-btn-group pa-3"
        >
          <div class="d-flex gap-2">
            <v-btn
              v-for="(action, index) in headerActions"
              :key="index"
              :color="action.color || 'success'"
              :disabled="action.disabled || submitting"
              :loading="action.loading"
              small
              @click="action.handler"
            >
              <v-icon v-if="action.icon" left small>{{ action.icon }}</v-icon>
              {{ action.label }}
            </v-btn>
          </div>
        </div>
      </v-row>

      <v-divider class="jh-divider"></v-divider>

      <!-- 抽屉内容 -->
      <div class="jh-drawer-content">
        <!-- 如果使用默认插槽，完全自定义内容 -->
        <slot v-if="$slots.default"></slot>

        <!-- 否则使用 JhProForm -->
        <div v-else class="pa-4">
          <jh-pro-form
            ref="proFormRef"
            label-position="top"
            :fields="fields"
            :initial-data="initialValues"
            :layout="layout"
            :label-width="labelWidth"
            :outlined="outlined"
            :dense="dense"
            :show-buttons="false"
            :disabled="submitting"
            @submit="handleSubmit"
          >
            <!-- 透传所有具名插槽 -->
            <template
              v-for="(_, slot) in $scopedSlots"
              #[slot]="scope"
            >
              <slot :name="slot" v-bind="scope" />
            </template>
          </jh-pro-form>
        </div>

        <!-- 底部操作按钮 (仅在非插槽模式下显示) -->
        <div
          v-if="!$slots.default && showFooterButtons"
          class="jh-drawer-footer pa-4 d-flex justify-end"
        >
          <v-btn
            text
            :disabled="submitting"
            @click="handleCancel"
          >
            {{ cancelText }}
          </v-btn>
          <v-btn
            color="primary"
            class="ml-2"
            :loading="submitting"
            :disabled="submitting"
            @click="handleConfirm"
          >
            {{ submitText }}
          </v-btn>
        </div>
      </div>
    </v-form>

    <!-- PC端浮动关闭按钮 -->
    <!-- <v-btn
      v-if="!isMobile && showCloseButton"
      elevation="0"
      color="success"
      fab
      absolute
      top
      :left="placement === 'right'"
      :right="placement === 'left'"
      small
      tile
      class="jh-drawer-close-float-btn"
      @click="handleClose"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn> -->
  </v-navigation-drawer>
</template>

<script>
import JhProForm from '../JhProForm/JhProForm.vue';

export default {
  name: 'JhDrawerForm',

  components: {
    JhProForm,
  },

  props: {
    // v-model 控制显示/隐藏
    value: {
      type: Boolean,
      default: false,
    },

    // 抽屉标题
    title: {
      type: String,
      default: '表单',
    },

    // 表单字段配置（仅在不使用插槽时有效）
    fields: {
      type: Array,
      default: () => [],
    },

    // 初始值
    initialValues: {
      type: Object,
      default: () => ({}),
    },

    // 抽屉宽度
    width: {
      type: [Number, String],
      default: null,
    },

    // 抽屉位置
    placement: {
      type: String,
      default: 'right',
      validator: (v) => ['left', 'right'].includes(v),
    },

    // 是否显示关闭按钮
    showCloseButton: {
      type: Boolean,
      default: true,
    },

    // 是否显示底部按钮（仅在非插槽模式下有效）
    showFooterButtons: {
      type: Boolean,
      default: true,
    },

    // 提交按钮文本
    submitText: {
      type: String,
      default: '确定',
    },

    // 取消按钮文本
    cancelText: {
      type: String,
      default: '取消',
    },

    // 头部操作按钮配置
    // 格式: [{ label: '保存', color: 'success', icon: 'mdi-content-save', handler: () => {}, disabled: false, loading: false }]
    headerActions: {
      type: Array,
      default: () => [],
    },

    // 表单布局
    layout: {
      type: String,
      default: 'vertical',
    },

    // 标签宽度
    labelWidth: {
      type: [Number, String],
      default: 100,
    },

    // 是否显示边框
    outlined: {
      type: Boolean,
      default: true,
    },

    // 紧凑模式
    dense: {
      type: Boolean,
      default: true,
    },

    // 提交请求函数
    request: {
      type: Function,
      default: null,
    },

    // 关闭前的确认回调
    onBeforeClose: {
      type: Function,
      default: null,
    },

    // 数据转换函数（提交前）
    transformBeforeSubmit: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      submitting: false,
      isMobile: false,
    };
  },

  computed: {
    drawerWidth() {
      if (this.width) {
        return this.width;
      }
      return this.isMobile ? '90%' : 600;
    },
  },

  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },

  methods: {
    // 检测移动端
    checkMobile() {
      this.isMobile = window.innerWidth < 600;
    },

    // 处理抽屉输入事件
    handleDrawerInput(value) {
      if (!value) {
        this.handleClose();
      }
    },

    // 关闭抽屉
    async handleClose() {
      if (this.submitting) return;

      // 如果有关闭前回调，先执行
      if (this.onBeforeClose) {
        const shouldClose = await this.onBeforeClose();
        if (shouldClose === false) {
          return;
        }
      }

      this.$emit('input', false);
      this.$emit('close');

      // 延迟重置表单，避免关闭动画时看到表单重置
      setTimeout(() => {
        this.resetForm();
      }, 300);
    },

    // 取消
    handleCancel() {
      this.handleClose();
      this.$emit('cancel');
    },

    // 确认提交（仅在非插槽模式下调用）
    async handleConfirm() {
      // 如果使用插槽模式，不处理提交
      if (this.$slots.default) {
        this.$emit('confirm');
        return;
      }

      try {
        // 验证表单
        const valid = await this.validate();
        if (!valid) {
          return;
        }

        // 获取表单数据
        let formData = this.getFormData();

        // 数据转换
        if (this.transformBeforeSubmit) {
          formData = this.transformBeforeSubmit(formData);
        }

        // 如果提供了 request 函数，自动处理提交
        if (this.request) {
          this.submitting = true;
          try {
            const response = await this.request(formData);
            this.$emit('success', response, formData);
            this.$emit('input', false);

            // 延迟重置表单
            setTimeout(() => {
              this.resetForm();
            }, 300);
          } catch (error) {
            this.$emit('error', error, formData);
          } finally {
            this.submitting = false;
          }
        } else {
          // 否则触发 submit 事件，由外部处理
          this.$emit('submit', formData);
        }
      } catch (error) {
        console.error('Form validation failed:', error);
      }
    },

    // 处理提交（表单内部触发）
    handleSubmit(formData) {
      // 由 handleConfirm 统一处理
    },

    // 重置表单
    resetForm() {
      if (this.$refs.proFormRef) {
        this.$refs.proFormRef.resetForm();
        this.$refs.proFormRef.resetValidation();
      }
      if (this.$refs.formRef) {
        this.$refs.formRef.resetValidation();
      }
    },

    // 获取表单数据
    getFormData() {
      if (this.$refs.proFormRef) {
        return this.$refs.proFormRef.getFormData() || {};
      }
      return {};
    },

    // 设置表单数据
    setFieldsValue(values) {
      this.$refs.proFormRef?.setFieldsValue(values);
    },

    // 验证表单
    async validate() {
      if (this.$refs.proFormRef) {
        return await this.$refs.proFormRef.validate();
      }
      if (this.$refs.formRef) {
        return await this.$refs.formRef.validate();
      }
      return true;
    },

    // 重置验证
    resetValidation() {
      if (this.$refs.proFormRef) {
        this.$refs.proFormRef.resetValidation();
      }
      if (this.$refs.formRef) {
        this.$refs.formRef.resetValidation();
      }
    },

    // 设置提交状态（外部控制提交时使用）
    setSubmitting(loading) {
      this.submitting = loading;
    },
  },
};
</script>

<style scoped>
/* 抽屉样式 */
.jh-drawer-form >>> .v-navigation-drawer__content {
  overflow: hidden;
}

/* 头部样式 */
.jh-drawer-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  min-height: 64px;
}

.jh-drawer-action-btn-group {
  display: flex;
  align-items: center;
}

/* 内容区域 */
.jh-drawer-content {
  overflow-y: auto;
  height: calc(100vh - 65px);
  display: flex;
  flex-direction: column;
}

/* 底部按钮区域 */
.jh-drawer-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  background: white;
  margin-top: auto;
}

/* 分割线 */
.jh-divider {
  margin: 0;
}

/* 浮动关闭按钮 */
.jh-drawer-close-float-btn {
  z-index: 10;
  margin-top: 16px;
}

/* 左侧抽屉的关闭按钮 */
.jh-drawer-form >>> .v-navigation-drawer--left .jh-drawer-close-float-btn {
  margin-right: -28px;
}

/* 右侧抽屉的关闭按钮 */
.jh-drawer-form >>> .v-navigation-drawer--right .jh-drawer-close-float-btn {
  margin-left: -28px;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .jh-drawer-header {
    min-height: 56px;
  }

  .jh-drawer-close-float-btn {
    display: none;
  }
}

/* 间隙工具类 */
.gap-2 > * + * {
  margin-left: 8px;
}
</style>
