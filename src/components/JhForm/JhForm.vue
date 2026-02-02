<template>
  <v-form
    :ref="formRef"
    :lazy-validation="lazyValidation"
    :class="formClasses"
    v-bind="mergedFormProps"
    v-on="formListeners"
  >
    <jh-form-fields
      v-model="formData"
      :fields="normalizedFields"
      :layout="internalLayout"
      :show-labels="showLabels"
      :label-width="labelWidth"
      :label-align="labelAlign"
      :show-required-mark="showRequiredMark"
      :readonly="readonly"
      :disabled="disabled"
      :default-dense="defaultDense"
      :default-filled="defaultFilled"
      :default-outlined="defaultOutlined"
      :default-single-line="defaultSingleLine"
      :default-cols-md="defaultColsMd"
      :hide-details="hideDetails"
      :label-class="labelClass"
      :input-class="inputClass"
      :row-class="rowClass"
      :validation-rules="validationRules"
      :row-props="gridRowProps"
      @field-input="handleFieldInput"
      @field-change="handleFieldChange"
      @field-blur="handleFieldBlur"
    >
      <template v-for="field in slotFields" v-slot:[`field-${field.key}`]="slotProps">
        <slot :name="`field-${field.key}`" v-bind="slotProps"></slot>
      </template>
    </jh-form-fields>

    <template v-if="isGridLayout">
      <v-row class="jh-form-grid-actions-row" v-bind="rowProps">
        <v-col cols="12" class="jh-form-actions-col">
          <slot name="actions" :formData="formData" :validate="validate" :resetForm="resetForm"></slot>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <slot name="actions" :formData="formData" :validate="validate" :resetForm="resetForm"></slot>
    </template>
  </v-form>
</template>

<script>
import JhFormFields from '../JhFormFields/JhFormFields.vue';

export default {
  name: 'JhForm',
  inheritAttrs: false,

  components: {
    JhFormFields,
  },

  props: {
    // 表单字段配置
    fields: {
      type: Array,
      default: () => [],
    },

    // 初始表单数据
    initialData: {
      type: Object,
      default: () => ({}),
    },

    // 表单引用名称
    formRef: {
      type: String,
      default: 'jhForm',
    },

    // 懒加载验证
    lazyValidation: {
      type: Boolean,
      default: true,
    },

    // 表单布局模式: 'horizontal' | 'vertical' | 'inline' | 'grid'
    layout: {
      type: String,
      default: 'vertical',
      validator: (v) => ['horizontal', 'vertical', 'inline', 'grid'].includes(v),
    },

    // 是否显示标签
    showLabels: {
      type: Boolean,
      default: true,
    },

    // 标签位置 ('top' | 'left') - 已废弃,使用 layout 替代
    labelPosition: {
      type: String,
      default: 'top',
      validator: (v) => ['top', 'left'].includes(v),
    },

    // 标签宽度 (horizontal 布局时生效)
    labelWidth: {
      type: [Number, String],
      default: 'auto',
    },

    // 标签对齐方式 (horizontal 布局时生效)
    labelAlign: {
      type: String,
      default: 'right',
      validator: (v) => ['left', 'right', 'center'].includes(v),
    },

    // 是否显示必填标记
    showRequiredMark: {
      type: Boolean,
      default: true,
    },

    // 只读模式
    readonly: {
      type: Boolean,
      default: false,
    },

    // 禁用模式
    disabled: {
      type: Boolean,
      default: false,
    },

    // 默认输入框样式
    defaultDense: {
      type: Boolean,
      default: true,
    },

    defaultFilled: {
      type: Boolean,
      default: true,
    },

    defaultOutlined: {
      type: Boolean,
      default: false,
    },

    defaultSingleLine: {
      type: Boolean,
      default: true,
    },

    // 默认列宽 (md)
    defaultColsMd: {
      type: Number,
      default: 6,
    },

    // 隐藏详情信息
    hideDetails: {
      type: [Boolean, String],
      default: true,
    },

    // 自定义标签样式类
    labelClass: {
      type: String,
      default: 'jh-input-label',
    },

    // 自定义输入框样式类
    inputClass: {
      type: String,
      default: 'jh-v-input',
    },

    // 自定义行样式类
    rowClass: {
      type: String,
      default: '',
    },

    // 验证规则集合
    validationRules: {
      type: Object,
      default: () => ({
        require: [v => !!v || '必填'],
        email: [v => !v || /.+@.+\..+/.test(v) || '邮箱格式不正确'],
        phone: [v => !v || /^1[3-9]\d{9}$/.test(v) || '手机号格式不正确'],
        number: [v => !v || !isNaN(v) || '请输入数字'],
        integer: [v => !v || Number.isInteger(Number(v)) || '请输入整数'],
      }),
    },

    // 提交按钮配置
    submitter: {
      type: [Object, Boolean],
      default: undefined,
    },

    // 提交成功回调
    onFinish: {
      type: Function,
      default: undefined,
    },

    // 提交失败回调
    onFinishFailed: {
      type: Function,
      default: undefined,
    },

    // 日期格式化
    dateFormatter: {
      type: [String, Function, Boolean],
      default: 'YYYY-MM-DD',
    },

    // 忽略 null/undefined 值
    omitNil: {
      type: Boolean,
      default: true,
    },

    // Grid 模式配置
    grid: {
      type: Boolean,
      default: false,
    },

    // Grid 列配置
    colProps: {
      type: Object,
      default: () => ({}),
    },

    // Grid 行配置
    rowProps: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      formData: {},
      // 表单提交状态
      submitLoading: false,
      submitError: null,
    };
  },

  computed: {
    // 表单样式类
    formClasses() {
      return {
        'jh-form': true,
        [`jh-form--${this.layout}`]: true,
        'jh-form--readonly': this.readonly,
        'jh-form--disabled': this.disabled,
      };
    },

    // 是否启用 Grid 布局
    isGridLayout() {
      return this.grid || this.layout === 'grid';
    },

    // 需要转交给 JhFormFields 的字段配置
    normalizedFields() {
      if (!this.isGridLayout) {
        return this.fields;
      }

      return this.fields.map(field => {
        if (field.type === 'group') {
          return { ...field };
        }

        const bindings = this.getColBindings(field);
        const colConfig = {};

        if (bindings.cols !== undefined) colConfig.xs = bindings.cols;
        if (bindings.sm !== undefined) colConfig.sm = bindings.sm;
        if (bindings.md !== undefined) colConfig.md = bindings.md;
        if (bindings.lg !== undefined) colConfig.lg = bindings.lg;
        if (bindings.xl !== undefined) colConfig.xl = bindings.xl;

        if (!Object.keys(colConfig).length) {
          return { ...field };
        }

        const existing = field.cols && typeof field.cols === 'object' ? field.cols : {};
        return {
          ...field,
          cols: {
            ...existing,
            ...colConfig,
          },
        };
      });
    },

    internalLayout() {
      return this.isGridLayout ? 'vertical' : this.layout;
    },

    slotFields() {
      return this.fields.filter(field => field.type === 'slot');
    },

    gridRowProps() {
      return this.isGridLayout ? (this.rowProps || {}) : {};
    },
    // 合并透传属性，只排除组件内部明确处理的属性
    mergedFormProps() {
      // 只排除组件内部明确处理的属性，其他所有属性都透传给 v-form
      const excludedAttrs = [
        'class', 'style',
        // 这些属性在组件内部有特殊处理
        'lazy-validation', 'lazyValidation',
        // JhForm 特有的 props（不在 v-form 中）
        'fields', 'initialData', 'formRef', 'layout', 'showLabels',
        'labelPosition', 'labelWidth', 'labelAlign', 'showRequiredMark',
        'readonly', 'disabled', 'defaultDense', 'defaultFilled', 'defaultOutlined',
        'defaultSingleLine', 'defaultColsMd', 'hideDetails', 'labelClass',
        'inputClass', 'rowClass', 'validationRules', 'submitter', 'onFinish',
        'onFinishFailed', 'dateFormatter', 'omitNil', 'grid', 'colProps', 'rowProps'
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
    formListeners() {
      // 只排除组件内部明确处理的事件，其他所有事件都透传给 v-form
      const excludedEvents = [
        // JhForm 特有的事件（不在 v-form 中）
        'field-change'
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
    initialData: {
      handler(val) {
        this.formData = { ...val };
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    // 初始化表单数据
    this.initFormData();
  },

  methods: {
    // 初始化表单数据
    initFormData() {
      const data = { ...this.initialData };

      // 从 fields 中提取默认值
      this.fields.forEach(field => {
        if (field.defaultValue !== undefined && data[field.key] === undefined) {
          data[field.key] = field.defaultValue;
        }
      });

      this.formData = data;
    },

    // Grid 模式下合并列配置
    getColBindings(field) {
      const bindings = { ...(this.colProps || {}), ...(field.colProps || {}) };

      // 兼容字段 cols 写法
      if (field.cols) {
        if (typeof field.cols === 'object') {
          Object.assign(bindings, field.cols);
        } else {
          bindings.cols = field.cols;
        }
      }

      const span = field.colSpan !== undefined ? field.colSpan : bindings.span;
      const mappedCols = span !== undefined ? this.mapGridSpan(span) : null;

      if (mappedCols !== null && !('cols' in bindings || 'sm' in bindings || 'md' in bindings || 'lg' in bindings || 'xl' in bindings)) {
        bindings.md = mappedCols;
      }

      delete bindings.span;

      if (!('cols' in bindings || 'sm' in bindings || 'md' in bindings || 'lg' in bindings || 'xl' in bindings)) {
        bindings.md = this.mapGridSpan(this.colProps.span || 8);
      }

      return bindings;
    },

    mapGridSpan(span) {
      const safeSpan = Number(span) || 0;
      const mapped = Math.round((safeSpan / 24) * 12);
      return Math.max(1, Math.min(12, mapped || 1));
    },

    handleFieldInput({ key, value }) {
      this.$emit('input', key, value, this.formData);
      this.$emit('field-change', { key, value, formData: this.formData });
    },

    handleFieldChange({ key, value }) {
      this.$emit('change', key, value, this.formData);
      this.$emit('field-change', { key, value, formData: this.formData });
    },

    handleFieldBlur({ key, value }) {
      this.$emit('blur', key, value, this.formData);
    },

    // 更新字段值(供插槽使用)
    updateField(key, value) {
      this.$set(this.formData, key, value);
      this.handleFieldChange({ key, value });
    },

    // 获取表单引用(供父组件调用) - 与 v-form 保持一致
    getForm() {
      return this.$refs[this.formRef];
    },
    
    // 转发 v-form 的所有方法
    ...(() => {
      const methods = {};
      // 定义需要转发的 v-form 方法
      const formMethods = ['validate', 'reset', 'resetValidation'];
      
      formMethods.forEach(methodName => {
        methods[methodName] = function(...args) {
          const form = this.$refs[this.formRef];
          if (form && typeof form[methodName] === 'function') {
            return form[methodName](...args);
          }
          // 如果 v-form 不存在或方法不存在，返回默认值
          if (methodName === 'validate') return true;
          return undefined;
        };
      });
      
      return methods;
    })(),

    // 获取表单数据
    getFormData() {
      return { ...this.formData };
    },

    // 设置表单数据
    setFieldsValue(values) {
      this.formData = { ...this.formData, ...values };
    },

    // 设置单个字段值
    setFieldValue(key, value) {
      this.$set(this.formData, key, value);
    },

    // 重置表单 - 与 v-form 的 reset() 方法保持一致
    reset() {
      const form = this.$refs[this.formRef];
      if (form) {
        form.reset();
      }
      this.initFormData();
      this.$emit('reset', this.formData);
    },
    
    // 重置表单（别名，保持向后兼容）
    resetForm() {
      this.reset();
    },

    // 重置表单验证 - 与 v-form 的 resetValidation() 方法保持一致
    resetValidation() {
      const form = this.$refs[this.formRef];
      if (form) {
        form.resetValidation();
      }
    },

    // 验证表单 - 与 v-form 的 validate() 方法保持一致
    async validate() {
      const form = this.$refs[this.formRef];
      if (form) {
        const isValid = await form.validate();
        this.$emit('validate', isValid, this.formData);
        return isValid;
      }
      return true;
    },
    
    // 验证单个字段 - 与 v-form 的 validate() 方法保持一致
    async validateField(fieldName) {
      const form = this.$refs[this.formRef];
      if (form && form.$refs && form.$refs[fieldName]) {
        const field = form.$refs[fieldName];
        if (field && typeof field.validate === 'function') {
          return await field.validate();
        }
      }
      return true;
    },

    // 提交表单（增强版，支持加载状态和错误处理）
    async submit(options = {}) {
      const {
        validate = true,
        transform = true,
        showLoading = false,
        resetError = true
      } = options;
      
      // 重置错误
      if (resetError) {
        this.submitError = null;
      }
      
      // 显示加载状态
      if (showLoading) {
        this.submitLoading = true;
      }
      
      try {
        // 验证表单
        if (validate) {
          const isValid = await this.validate();
          if (!isValid) {
            // 调用 onFinishFailed 回调
            if (this.onFinishFailed) {
              this.onFinishFailed(this.formData);
            }
            return false;
          }
        }
        
        // 转换数据
        const transformedData = transform ? this.getTransformedData() : { ...this.formData };
        
        // 触发 submit 事件
        this.$emit('submit', transformedData);
        
        // 调用 onFinish 回调
        if (this.onFinish) {
          await this.onFinish(transformedData);
        }
        
        return true;
      } catch (error) {
        console.error('Form submit error:', error);
        this.submitError = error.message || '提交失败';
        this.$emit('submit-error', error);
        return false;
      } finally {
        // 隐藏加载状态
        if (showLoading) {
          this.submitLoading = false;
        }
      }
    },
    
    // 验证单个字段（增强版）
    async validateField(fieldName) {
      // 首先尝试通过 v-form 验证
      const form = this.$refs[this.formRef];
      if (form && form.validate) {
        // v-form 的 validate 方法会验证所有字段
        // 这里我们返回整体验证结果
        return await this.validate();
      }
      
      // 如果 v-form 不存在，返回 true
      return true;
    },
    
    // 获取表单状态
    getFormState() {
      return {
        submitLoading: this.submitLoading,
        submitError: this.submitError,
        formData: { ...this.formData }
      };
    },
    
    // 清除提交错误
    clearSubmitError() {
      this.submitError = null;
    },
    
    // 批量更新字段值
    batchUpdateFields(values) {
      Object.keys(values).forEach(key => {
        this.$set(this.formData, key, values[key]);
        this.handleFieldChange({ key, value: values[key] });
      });
    },

    // 获取转换后的数据
    getTransformedData() {
      const data = { ...this.formData };
      
      // 应用字段级别的 transform
      this.fields.forEach(field => {
        if (field.key && field.transform && typeof field.transform === 'function') {
          data[field.key] = field.transform(data[field.key], data);
        }
      });

      // 忽略 null/undefined 值
      if (this.omitNil) {
        Object.keys(data).forEach(key => {
          if (data[key] === null || data[key] === undefined || data[key] === '') {
            delete data[key];
          }
        });
      }

      return data;
    },

    // 获取字段的依赖值
    getDependenciesValues(dependencies) {
      if (!dependencies || !Array.isArray(dependencies)) return [];
      return dependencies.map(key => this.formData[key]);
    },

    // 检查依赖是否变化
    checkDependenciesChanged(field, oldValues, newValues) {
      if (!field.dependencies) return false;
      
      for (let i = 0; i < field.dependencies.length; i++) {
        if (oldValues[i] !== newValues[i]) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style scoped>
/* 表单布局样式 */
.jh-form {
  width: 100%;
}

/* 水平布局 */
.jh-form--horizontal .jh-field-label--horizontal {
  padding-top: 0;
  line-height: 1.5;
}

/* 行内布局 */
.jh-form--inline .v-input {
  margin-bottom: 0 !important;
}

/* 只读模式 */
.jh-form--readonly {
  /* 只读模式整体样式 */
  .jh-field-label {
    /* 只读模式下的标签样式 */
    color: rgba(0, 0, 0, 0.65);
    font-weight: 500;
  }
  
  .jh-form-readonly-text {
    /* 只读模式下的文本样式 */
    padding: 6px 12px;
    color: rgba(0, 0, 0, 0.87);
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    line-height: 1.5;
    transition: all 0.2s ease;
  }
  
  /* 水平布局下的调整 */
  &.jh-form--horizontal {
    .jh-field-wrapper {
      margin-bottom: 16px;
    }
  }
  
  /* 垂直布局下的调整 */
  &.jh-form--vertical {
    .jh-field-wrapper {
      margin-bottom: 16px;
    }
  }
  
  /* 网格布局下的调整 */
  &.jh-form--grid {
    .jh-field-wrapper {
      margin-bottom: 16px;
    }
  }
}

/* 字段标签 */
.jh-field-label {

}

.jh-field-label--horizontal {
  padding-right: 12px;
}

.jh-field-label--vertical {
  display: block;
}

/* 表单分组标题 */
.jh-form-group-title {
  margin-top: 8px;
  margin-bottom: 16px;
}

.jh-form-group-title h3 {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}

/* 字段包装器 */
.jh-field-wrapper {
  width: 100%;
}

/* 字段输入区域 */
.jh-field-input {
  width: 100%;
}

/* 只读文本 */
.jh-form-readonly-text {
  word-break: break-word;
}

/* 额外提示信息 */
.jh-field-extra {
  margin-top: -8px;
  line-height: 1.5;
}
</style>
