<template>
  <v-dialog
    v-model="isShownInternal"
    :max-width="width"
    :persistent="persistent"
    :fullscreen="fullscreen"
    @keydown.esc="handleCancel"
  >
    <v-card>
      <!-- 标题栏 -->
      <v-card-title class="d-flex align-center justify-space-between pa-4">
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
        <!-- 支持完全自定义内容 -->
        <slot name="content">
          <!-- 使用 JhForm 组件渲染表单 -->
          <jh-form
            ref="jhForm"
            :form-ref="formRef"
            :fields="fields"
            :initial-data="initialData"
            :validation-rules="validationRules"
            :default-cols-md="6"
            @field-change="handleFieldChange"
          >
            <!-- 传递自定义字段插槽 -->
            <template v-for="field in slotFields" v-slot:[`field-${field.key}`]="slotProps">
              <slot :name="`field-${field.key}`" v-bind="slotProps"></slot>
            </template>
          </jh-form>
        </slot>
      </v-card-text>

      <v-divider />

      <!-- 底部按钮 -->
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import JhForm from '../JhForm/JhForm.vue';

export default {
  name: 'JhModalForm',

  components: {
    JhForm,
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
      default: () => [],
    },

    // 初始表单数据
    initialData: {
      type: Object,
      default: () => ({})
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

    // 按钮配置
    showConfirmButton: {
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

    // 表单引用名称
    formRef: {
      type: String,
      default: 'modalForm'
    },

    // 是否在确认前验证表单
    validateBeforeConfirm: {
      type: Boolean,
      default: true
    },

    // 验证规则集合
    validationRules: {
      type: Object,
      default: () => ({
        require: [v => !!v || '必填'],
        email: [v => !v || /.+@.+\..+/.test(v) || '邮箱格式不正确'],
        phone: [v => !v || /^1[3-9]\d{9}$/.test(v) || '手机号格式不正确'],
        number: [v => !v || !isNaN(v) || '请输入数字'],
        integer: [v => !v || Number.isInteger(Number(v)) || '请输入整数']
      })
    }
  },

  data() {
    return {
      isShownInternal: this.value,
    };
  },

  computed: {
    // 获取所有 slot 类型的字段
    slotFields() {
      return this.fields.filter(field => field.type === 'slot');
    },
  },

  watch: {
    value(val) {
      this.isShownInternal = val;
      // 当弹窗打开时,重置表单数据和验证状态
      if (val) {
        this.$nextTick(() => {
          this.resetForm();
        });
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
    async handleConfirm() {
      // 如果需要验证表单
      if (this.validateBeforeConfirm) {
        const isValid = await this.validate();
        if (!isValid) {
          return;
        }
      }

      this.$emit('confirm', this.getFormData());
    },

    // 处理字段变化
    handleFieldChange(event) {
      this.$emit('field-change', event);
    },

    // 获取 JhForm 实例
    getJhForm() {
      return this.$refs.jhForm;
    },

    // 获取表单引用（供父组件调用）
    getForm() {
      const jhForm = this.getJhForm();
      return jhForm ? jhForm.getForm() : null;
    },

    // 获取表单数据
    getFormData() {
      const jhForm = this.getJhForm();
      return jhForm ? jhForm.getFormData() : {};
    },

    // 设置表单数据
    setFieldsValue(values) {
      const jhForm = this.getJhForm();
      if (jhForm) {
        jhForm.setFieldsValue(values);
      }
    },

    // 设置单个字段值
    setFieldValue(key, value) {
      const jhForm = this.getJhForm();
      if (jhForm) {
        jhForm.setFieldValue(key, value);
      }
    },

    // 重置表单
    resetForm() {
      const jhForm = this.getJhForm();
      if (jhForm) {
        jhForm.resetForm();
      }
    },

    // 重置表单验证
    resetValidation() {
      const jhForm = this.getJhForm();
      if (jhForm) {
        jhForm.resetValidation();
      }
    },

    // 验证表单
    async validate() {
      const jhForm = this.getJhForm();
      if (jhForm) {
        return await jhForm.validate();
      }
      return true;
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
