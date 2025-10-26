<template>
  <v-dialog
    :value="value"
    :max-width="width"
    :persistent="persistent"
    :fullscreen="fullscreen"
    @input="handleDialogInput"
    @keydown.esc="handleCancel"
  >
    <v-card>
      <!-- 标题栏 -->
      <v-card-title class="d-flex align-center justify-space-between">
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

      <!-- 表单内容 -->
      <v-card-text class="pa-6">
        <jh-pro-form
          ref="formRef"
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
          <!-- 透传所有插槽 -->
          <template
            v-for="(_, slot) in $scopedSlots"
            #[slot]="scope"
          >
            <slot :name="slot" v-bind="scope" />
          </template>
        </jh-pro-form>
      </v-card-text>

      <v-divider />

      <!-- 底部按钮 -->
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn
          text
          :disabled="submitting"
          @click="handleCancel"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          color="primary"
          :loading="submitting"
          :disabled="submitting"
          @click="handleConfirm"
        >
          {{ submitText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import JhProForm from '../JhProForm/JhProForm.vue';

export default {
  name: 'JhModalForm',

  components: {
    JhProForm,
  },

  props: {
    // v-model 控制显示/隐藏
    value: {
      type: Boolean,
      default: false,
    },

    // 标题
    title: {
      type: String,
      default: '表单',
    },

    // 表单字段配置
    fields: {
      type: Array,
      required: true,
      default: () => [],
    },

    // 初始值
    initialValues: {
      type: Object,
      default: () => ({}),
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
      default: false,
    },

    // 提交请求函数
    request: {
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
    };
  },

  methods: {
    // 处理弹窗输入事件
    handleDialogInput(value) {
      if (!value) {
        this.handleCancel();
      }
    },

    // 取消
    handleCancel() {
      if (this.submitting) return;

      this.$emit('input', false);
      this.$emit('cancel');

      // 延迟重置表单，避免关闭动画时看到表单重置
      setTimeout(() => {
        this.resetForm();
      }, 300);
    },

    // 确认提交
    async handleConfirm() {
      try {
        // 验证表单
        const valid = await this.$refs.formRef.validate();
        if (!valid) {
          return;
        }

        // 获取表单数据
        let formData = this.$refs.formRef.getFormData();

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
      if (this.$refs.formRef) {
        this.$refs.formRef.resetForm();
        this.$refs.formRef.resetValidation();
      }
    },

    // 获取表单数据
    getFormData() {
      return this.$refs.formRef?.getFormData() || {};
    },

    // 设置表单数据
    setFieldsValue(values) {
      this.$refs.formRef?.setFieldsValue(values);
    },

    // 验证表单
    async validate() {
      return await this.$refs.formRef?.validate();
    },

    // 设置提交状态（外部控制提交时使用）
    setSubmitting(loading) {
      this.submitting = loading;
    },
  },
};
</script>

<style scoped>
/* 样式由 Vuetify 提供，无需额外样式 */
</style>
