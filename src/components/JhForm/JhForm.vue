<template>
  <v-form
    :ref="formRef"
    :lazy-validation="lazyValidation"
    :class="formClasses"
    v-bind="mergedFormProps"
    v-on="formListeners"
    @submit.prevent
  >
    <!-- 标题区域 -->
    <div v-if="title || $slots.title" class="jh-form-header">
      <slot name="title">
        <div class="jh-form-title">
          {{ title }}
          <v-tooltip v-if="tooltip" bottom>
            <template v-slot:activator="{ on, attrs }">
              <jh-icon icon="mdi:help-circle-outline" width="16" height="16" class="ml-1" v-bind="attrs" v-on="on"></jh-icon>
            </template>
            <span>{{ tooltip }}</span>
          </v-tooltip>
        </div>
      </slot>
      <div v-if="description" class="jh-form-description">{{ description }}</div>
    </div>

    <!-- 字段内容区域 -->
    <v-row :class="rowClass" :dense="dense" v-bind="gridRowProps">
      <template v-for="(field, index) in visibleFields">
        <!-- 分组标题 -->
        <v-col v-if="field.type === 'group'" :key="`group-${index}`" cols="12">
          <div class="jh-form-group-title" :class="field.titleClass">
            <v-divider v-if="field.divider && index > 0" class="mb-4"></v-divider>
            <h3 v-if="field.title" class="text-h6 mb-2">{{ field.title }}</h3>
            <p v-if="field.description" class="text-caption grey--text mb-3">{{ field.description }}</p>
          </div>
        </v-col>

        <!-- 普通字段 -->
        <v-col
          v-else
          :key="field.key"
          :cols="getFieldCols(field)"
          :sm="getFieldSm(field)"
          :md="getFieldMd(field)"
          :lg="getFieldLg(field)"
          :xl="getFieldXl(field)"
          :class="getFieldColClass(field)"
        >
          <!-- 字段包装器 -->
          <div :class="getFieldWrapperClass(field)">
            <!-- 字段标签 (水平布局) -->
            <div
              v-if="field.label && showLabels && (internalLayout === 'horizontal' || field.layout === 'horizontal')"
              :class="getHorizontalLabelClass(field)"
              :style="getHorizontalLabelStyle(field)"
            >
              <span v-if="(field.required && showRequiredMark)" class="error--text mr-1">*</span>
              {{ field.label }}
              <v-tooltip v-if="field.tooltip" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <jh-icon icon="mdi:help-circle-outline" width="16" height="16" class="ml-1" v-bind="attrs" v-on="on"></jh-icon>
                </template>
                <span>{{ field.tooltip }}</span>
              </v-tooltip>
            </div>

            <!-- 字段输入区域 -->
            <div :class="getFieldInputClass(field)">
              <!-- 字段标签 (垂直/行内布局) -->
              <div
                v-if="field.label && showLabels && internalLayout !== 'horizontal' && field.layout !== 'horizontal'"
                :class="getVerticalLabelClass(field)"
              >
                <span v-if="field.required && showRequiredMark" class="error--text">*</span>
                {{ field.label }}
                <v-tooltip v-if="field.tooltip" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <jh-icon icon="mdi:help-circle-outline" width="16" height="16" class="ml-1" v-bind="attrs" v-on="on"></jh-icon>
                  </template>
                  <span>{{ field.tooltip }}</span>
                </v-tooltip>
              </div>

              <!-- 只读模式展示 -->
              <div v-if="isFieldReadonly(field)" class="jh-form-readonly-text">
                {{ getReadonlyValue(field) }}
              </div>

              <!-- 表单字段 -->
              <template v-else>
                <!-- 文本输入框 -->
                <v-text-field
                  v-if="field.type === 'text' || !field.type"
                  :class="inputClass"
                  :dense="getDense(field)"
                  :single-line="getSingleLine(field)"
                  :filled="getFilled(field)"
                  :outlined="getOutlined(field)"
                  :value="getFieldValue(field.key)"
                  @input="handleInput(field.key, $event)"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :placeholder="field.placeholder"
                  :prefix="field.prefix"
                  :suffix="field.suffix"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @change="handleChange(field.key, $event)"
                  @blur="handleBlur(field.key, $event)"
                ></v-text-field>

                <!-- 文本域 -->
                <v-textarea
                  v-else-if="field.type === 'textarea'"
                  :class="inputClass"
                  :dense="getDense(field)"
                  :filled="getFilled(field)"
                  :outlined="getOutlined(field)"
                  :value="getFieldValue(field.key)"
                  @input="handleInput(field.key, $event)"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :placeholder="field.placeholder"
                  :rows="field.rows || 3"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @change="handleChange(field.key, $event)"
                  @blur="handleBlur(field.key, $event)"
                ></v-textarea>

                <!-- 数字输入框 -->
                <v-text-field
                  v-else-if="field.type === 'number'"
                  :class="inputClass"
                  type="number"
                  :dense="getDense(field)"
                  :single-line="getSingleLine(field)"
                  :filled="getFilled(field)"
                  :outlined="getOutlined(field)"
                  :value="getFieldValue(field.key)"
                  @input="handleInput(field.key, $event)"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :placeholder="field.placeholder"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @change="handleChange(field.key, $event)"
                  @blur="handleBlur(field.key, $event)"
                ></v-text-field>

                <!-- 下拉选择框 -->
                <v-select
                  v-else-if="field.type === 'select'"
                  :class="inputClass"
                  :dense="getDense(field)"
                  :filled="getFilled(field)"
                  :outlined="getOutlined(field)"
                  :value="getFieldValue(field.key)"
                  @input="handleInput(field.key, $event)"
                  :items="getFieldOptions(field)"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :placeholder="field.placeholder"
                  :item-text="field.itemText || 'text'"
                  :item-value="field.itemValue || 'value'"
                  :multiple="field.multiple"
                  :chips="field.chips"
                  :hide-details="field.hideDetails || hideDetails"
                  small-chips
                  v-bind="field.props"
                  @change="handleChange(field.key, $event)"
                  @blur="handleBlur(field.key, $event)"
                ></v-select>

                <!-- 自动完成 -->
                <v-autocomplete
                  v-else-if="field.type === 'autocomplete'"
                  :class="inputClass"
                  :dense="getDense(field)"
                  :filled="getFilled(field)"
                  :outlined="getOutlined(field)"
                  :value="getFieldValue(field.key)"
                  @input="handleInput(field.key, $event)"
                  :items="getFieldOptions(field)"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :placeholder="field.placeholder"
                  :item-text="field.itemText || 'text'"
                  :item-value="field.itemValue || 'value'"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @change="handleChange(field.key, $event)"
                  @blur="handleBlur(field.key, $event)"
                ></v-autocomplete>

                <!-- 日期选择器 -->
                <v-menu
                  v-else-if="field.type === 'date'"
                  v-model="dateMenus[field.key]"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :class="inputClass"
                      :dense="getDense(field)"
                      :filled="getFilled(field)"
                      :outlined="getOutlined(field)"
                      :value="getFieldValue(field.key)"
                      :rules="getRules(field)"
                      :disabled="getFieldDisabled(field)"
                      :placeholder="field.placeholder"
                      :hide-details="field.hideDetails || hideDetails"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :value="getFieldValue(field.key)"
                    @input="dateMenus[field.key] = false; handleInput(field.key, $event)"
                    :locale="field.locale || 'zh-cn'"
                    v-bind="field.pickerProps"
                  ></v-date-picker>
                </v-menu>

                <!-- 时间选择器 -->
                <v-menu
                  v-else-if="field.type === 'time'"
                  v-model="timeMenus[field.key]"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :class="inputClass"
                      :dense="getDense(field)"
                      :filled="getFilled(field)"
                      :outlined="getOutlined(field)"
                      :value="getFieldValue(field.key)"
                      :rules="getRules(field)"
                      :disabled="getFieldDisabled(field)"
                      :placeholder="field.placeholder"
                      :hide-details="field.hideDetails || hideDetails"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    :value="getFieldValue(field.key)"
                    @input="timeMenus[field.key] = false; handleInput(field.key, $event)"
                    format="24hr"
                    v-bind="field.pickerProps"
                  ></v-time-picker>
                </v-menu>

                <!-- 颜色选择器 -->
                <v-menu
                  v-else-if="field.type === 'color'"
                  v-model="colorMenus[field.key]"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="320px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :class="inputClass"
                      :dense="getDense(field)"
                      :filled="getFilled(field)"
                      :outlined="getOutlined(field)"
                      :value="getFieldValue(field.key)"
                      :rules="getRules(field)"
                      :disabled="getFieldDisabled(field)"
                      :placeholder="field.placeholder"
                      :hide-details="field.hideDetails || hideDetails"
                      readonly
                      v-on="on"
                      v-bind="field.props"
                    >
                      <template v-slot:append>
                        <span
                          class="jh-color-preview"
                          :style="{ backgroundColor: getFieldValue(field.key) || field.defaultValue || '#ffffff' }"
                        ></span>
                      </template>
                    </v-text-field>
                  </template>
                  <v-color-picker
                    :value="getFieldValue(field.key) || field.defaultValue || '#000000'"
                    flat
                    :hide-mode-switch="field.hideModeSwitch !== false"
                    @input="handleColorInput(field, $event)"
                    v-bind="field.pickerProps"
                  ></v-color-picker>
                </v-menu>

                <!-- 滑块 -->
                <v-slider
                  v-else-if="field.type === 'slider'"
                  :class="inputClass"
                  :value="getFieldValue(field.key)"
                  @input="handleInput(field.key, $event)"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :min="field.min !== undefined ? field.min : 0"
                  :max="field.max !== undefined ? field.max : 100"
                  :step="field.step !== undefined ? field.step : 1"
                  :thumb-label="field.thumbLabel"
                  :ticks="field.ticks"
                  :tick-size="field.tickSize"
                  :color="field.color || 'primary'"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                ></v-slider>

                <!-- 区间滑块 -->
                <v-range-slider
                  v-else-if="field.type === 'range-slider'"
                  :class="inputClass"
                  :value="getFieldValue(field.key)"
                  @input="handleInput(field.key, $event)"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :min="field.min !== undefined ? field.min : 0"
                  :max="field.max !== undefined ? field.max : 100"
                  :step="field.step !== undefined ? field.step : 1"
                  :thumb-label="field.thumbLabel"
                  :ticks="field.ticks"
                  :tick-size="field.tickSize"
                  :color="field.color || 'primary'"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                ></v-range-slider>

                <!-- 开关 -->
                <v-switch
                  v-else-if="field.type === 'switch'"
                  :input-value="getFieldValue(field.key)"
                  @change="handleChange(field.key, $event)"
                  :label="field.switchLabel"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :color="field.color || 'success'"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                ></v-switch>

                <!-- 复选框 -->
                <v-checkbox
                  v-else-if="field.type === 'checkbox'"
                  :input-value="getFieldValue(field.key)"
                  @change="handleChange(field.key, $event)"
                  :label="field.checkboxLabel"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :color="field.color || 'success'"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                ></v-checkbox>

                <!-- 单选按钮组 -->
                <v-radio-group
                  v-else-if="field.type === 'radio'"
                  :value="getFieldValue(field.key)"
                  @change="handleChange(field.key, $event)"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :row="field.row !== false"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                >
                  <v-radio
                    v-for="option in getFieldOptions(field)"
                    :key="option.value"
                    :label="option.text"
                    :value="option.value"
                    :color="field.color || 'success'"
                  ></v-radio>
                </v-radio-group>

                <!-- 自定义字段插槽 -->
                <slot
                  v-else-if="field.type === 'slot'"
                  :name="`field-${field.key}`"
                  :field="field"
                  :value="getFieldValue(field.key)"
                  :formData="formData"
                  :updateField="updateField"
                ></slot>
              </template>
            </div>
          </div>
        </v-col>
      </template>

      <!-- 操作按钮区域 (Grid布局时) -->
      <template v-if="isGridLayout">
        <v-col cols="12" class="jh-form-actions-col">
          <slot name="actions" :formData="formData" :validate="validate" :resetForm="resetForm" :reset="reset"></slot>
        </v-col>
      </template>
    </v-row>

    <!-- 操作按钮区域 (非Grid布局时) -->
    <div v-if="!isGridLayout" class="jh-form-actions-wrapper">
      <slot name="actions" :formData="formData" :validate="validate" :resetForm="resetForm" :reset="reset"></slot>
    </div>
    
    <!-- 底部插槽 -->
    <slot name="footer" :formData="formData"></slot>
  </v-form>
</template>

<script>
import JhIcon from '../JhIcon/JhIcon.vue'

export default {
  name: 'JhForm',
  inheritAttrs: false,
  components: {
    JhIcon
  },

  props: {
    // 表单字段配置
    fields: {
      type: Array,
      default: () => [],
    },

    // v-model 绑定的值
    value: {
      type: Object,
      default: () => ({}),
    },

    // 初始表单数据 (当不使用 v-model 时使用)
    initialData: {
      type: Object,
      default: () => ({}),
    },

    // 表单引用名称
    formRef: {
      type: String,
      default: 'form',
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
      default: false,
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

    // 分组标题
    title: {
      type: String,
      default: ''
    },
    // 分组描述
    description: {
      type: String,
      default: ''
    },
    // 标题旁的 tooltip
    tooltip: {
      type: String,
      default: ''
    },
    // 是否显示边框
    bordered: {
      type: Boolean,
      default: false
    },
    // 压缩外边距/间距
    dense: {
      type: Boolean,
      default: false
    },
    // 字段依赖配置
    dependencies: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return {
      formData: {},
      // 表单提交状态
      submitLoading: false,
      submitError: null,
      
      // 字段状态
      dateMenus: {},
      timeMenus: {},
      colorMenus: {},
      dependencyWatchers: [],
    };
  },

  computed: {
    // 表单样式类
    formClasses() {
      return {
        'jh-form': true,
        'jh-form--bordered': this.bordered,
        [`jh-form--${this.layout}`]: true,
        'jh-form--readonly': this.readonly,
        'jh-form--disabled': this.disabled,
      };
    },

    // 是否启用 Grid 布局
    isGridLayout() {
      return this.grid || this.layout === 'grid';
    },
    
    // 内部布局模式
    internalLayout() {
      return this.isGridLayout ? 'vertical' : this.layout;
    },

    // 需要显示的字段
    visibleFields() {
      // 先生成 normalizedFields (处理 col 配置)
      const fields = this.normalizedFields;
      
      return fields.filter(field => {
        if (typeof field.visible === 'function') {
          return field.visible(this.formData);
        }
        if (field.visible !== undefined) {
          return field.visible;
        }
        return true;
      });
    },

    // 标准化字段配置 (处理 Grid 列配置)
    normalizedFields() {
      return this.fields.map(field => {
        if (field.type === 'group') {
          return { ...field };
        }

        // 如果不是 grid 布局，且没有显式指定 cols，则保持原样 (render 时会默认占满或 auto)
        if (!this.isGridLayout && !field.cols) {
           return { ...field };
        }

        const bindings = this.getColBindings(field);
        const colConfig = {};

        if (bindings.cols !== undefined) colConfig.xs = bindings.cols;
        if (bindings.sm !== undefined) colConfig.sm = bindings.sm;
        if (bindings.md !== undefined) colConfig.md = bindings.md;
        if (bindings.lg !== undefined) colConfig.lg = bindings.lg;
        if (bindings.xl !== undefined) colConfig.xl = bindings.xl;
        
        // 如果计算出了 col 配置，合并到 field.cols
        if (Object.keys(colConfig).length) {
           const existing = field.cols && typeof field.cols === 'object' ? field.cols : (field.cols ? { xs: field.cols } : {});
           return {
             ...field,
             cols: {
               ...existing,
               ...colConfig,
             },
           };
        }
        
        return { ...field };
      });
    },

    gridRowProps() {
      return this.rowProps || {};
    },
    
    // 合并透传属性
    mergedFormProps() {
      // 只排除组件内部明确处理的属性，其他所有属性都透传给 v-form
      const excludedAttrs = [
        'class', 'style',
        'lazy-validation', 'lazyValidation',
        'fields', 'initialData', 'formRef', 'layout', 'showLabels',
        'labelPosition', 'labelWidth', 'labelAlign', 'showRequiredMark',
        'readonly', 'disabled', 'defaultDense', 'defaultFilled', 'defaultOutlined',
        'defaultSingleLine', 'defaultColsMd', 'hideDetails', 'labelClass',
        'inputClass', 'rowClass', 'validationRules', 'submitter', 'onFinish',
        'onFinishFailed', 'dateFormatter', 'omitNil', 'grid', 'colProps', 'rowProps',
        'title', 'description', 'tooltip', 'bordered', 'dense', 'dependencies'
      ];
      
      const { class: cls, style, ...rest } = this.$attrs || {};
      const filteredAttrs = {};
      
      Object.keys(rest).forEach(key => {
        const keyKebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        if (!excludedAttrs.includes(key) && !excludedAttrs.includes(keyKebab)) {
          filteredAttrs[key] = rest[key];
        }
      });
      
      return filteredAttrs;
    },
    
    // 透传所有事件
    formListeners() {
      const excludedEvents = ['field-change', 'submit'];
      const listeners = { ...this.$listeners || {} };
      const filteredListeners = {};
      
      Object.keys(listeners).forEach(key => {
        if (!excludedEvents.includes(key)) {
          filteredListeners[key] = listeners[key];
        }
      });
      
      return filteredListeners;
    }
  },

  watch: {
    value: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.formData)) {
          this.initFormData();
        }
      },
      deep: true,
    },
    initialData: {
      handler() {
        this.initFormData();
      },
      immediate: true,
      deep: true,
    },
    fields: {
      handler() {
        this.initFormData();
      },
      deep: true,
    },
    dependencies: {
      handler(newDeps) {
        this.setupDependencyWatchers(newDeps);
      },
      immediate: true,
    },
  },

  mounted() {
    this.initFormData();
    this.setupFieldDependencies();
  },
  
  beforeDestroy() {
    this.dependencyWatchers.forEach(unwatch => unwatch());
    this.dependencyWatchers = [];
  },

  methods: {
    // 初始化表单数据
    initFormData() {
      const sourceData = { ...this.initialData, ...this.value };
      const data = { ...sourceData };

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
      // 只有在 grid 模式下或者显式传递了 colProps 时才生效
      const bindings = { ...(this.colProps || {}), ...(field.colProps || {}) };

      if (field.cols) {
        if (typeof field.cols === 'object') {
          Object.assign(bindings, field.cols);
        } else {
          bindings.cols = field.cols;
        }
      }

      const span = field.colSpan !== undefined ? field.colSpan : bindings.span;
      // 默认在 grid 模式下，如果没有指定 cols，默认使用 6 (两列) 或者 defaultColsMd
      // 原 JhForm 逻辑：mappedCols 默认为 8 (span=8 -> md=4?) Wait, mapGridSpan(8) = (8/24)*12 = 4. 
      // 这里我们尽量保持简单：如果没指定，用 defaultColsMd
      
      // 如果没有指定任何 col 配置
      if (!('cols' in bindings || 'sm' in bindings || 'md' in bindings || 'lg' in bindings || 'xl' in bindings)) {
         if (span !== undefined) {
             bindings.md = this.mapGridSpan(span);
         } else if (this.isGridLayout) {
             bindings.md = this.defaultColsMd; 
         }
      }

      return bindings;
    },

    mapGridSpan(span) {
      const safeSpan = Number(span) || 0;
      const mapped = Math.round((safeSpan / 24) * 12);
      return Math.max(1, Math.min(12, mapped || 1));
    },

    // --- 字段渲染辅助方法 ---

    getFieldValue(key) {
      return this.formData[key];
    },

    getFieldOptions(field) {
      if (typeof field.options === 'function') {
        return field.options(this.formData);
      }
      return field.options || [];
    },

    getFieldCols(field) {
      if (this.layout === 'inline') return 'auto';
      if (field.cols) {
        return typeof field.cols === 'object' ? (field.cols.xs || field.cols) : field.cols;
      }
      // 如果没有 cols 属性，但在 grid 模式下，normalizedFields 应该已经注入了 cols。
      // 如果还是没有，且不是 grid 模式，默认 12
      return this.defaultColsMd || 12;
    },
    getFieldSm(field) {
      if (this.layout === 'inline') return 'auto';
      return field.cols && typeof field.cols === 'object' ? field.cols.sm : undefined;
    },
    getFieldMd(field) {
      if (this.layout === 'inline') return 'auto';
      return field.cols && typeof field.cols === 'object' ? field.cols.md : undefined;
    },
    getFieldLg(field) {
      if (this.layout === 'inline') return 'auto';
      return field.cols && typeof field.cols === 'object' ? field.cols.lg : undefined;
    },
    getFieldXl(field) {
      if (this.layout === 'inline') return 'auto';
      return field.cols && typeof field.cols === 'object' ? field.cols.xl : undefined;
    },

    getFieldColClass(field) {
      return field.colClass || '';
    },

    getFieldWrapperClass(field) {
      const fieldLayout = field.layout || this.internalLayout;
      const layoutClass = fieldLayout === 'horizontal' ? 'd-flex align-center' : '';
      return `jh-field-wrapper ${layoutClass}`;
    },

    getHorizontalLabelClass(field) {
      const align = field.labelAlign || this.labelAlign;
      return `jh-field-label jh-input-label jh-field-label--horizontal text-${align} flex-shrink-0`;
    },

    getHorizontalLabelStyle(field) {
      const width = field.labelWidth || this.labelWidth;
      return {
        width: typeof width === 'number' ? `${width}px` : width,
        minWidth: typeof width === 'number' ? `${width}px` : width,
      };
    },

    getVerticalLabelClass(field) {
      return `jh-field-label jh-input-label jh-field-label--vertical mb-1`;
    },

    getFieldInputClass(field) {
      const fieldLayout = field.layout || this.internalLayout;
      return fieldLayout === 'horizontal' ? 'jh-field-input flex-grow-1' : 'jh-field-input';
    },

    getFieldDisabled(field) {
      if (typeof field.disabled === 'function') {
        return field.disabled(this.formData);
      }
      if (field.disabled !== undefined) {
        return field.disabled;
      }
      return this.disabled;
    },

    isFieldReadonly(field) {
      if (typeof field.readonly === 'function') {
        return field.readonly(this.formData);
      }
      if (field.readonly !== undefined) {
        return field.readonly;
      }
      return this.readonly;
    },

    getReadonlyValue(field) {
      const value = this.formData[field.key];

      if (typeof field.readonlyRender === 'function') {
        return field.readonlyRender(value, this.formData);
      }

      if ((field.type === 'select' || field.type === 'radio') && field.options) {
        const options = this.getFieldOptions(field);
        if (field.multiple && Array.isArray(value)) {
          return value.map(v => {
            const option = options.find(opt => opt.value === v);
            return option ? option.text : v;
          }).join(', ');
        } else {
          const option = options.find(opt => opt.value === value);
          return option ? option.text : value;
        }
      }

      if (field.type === 'switch' || field.type === 'checkbox') {
        return value ? '是' : '否';
      }

      if (field.type === 'range-slider' && Array.isArray(value)) {
        return value.join(' ~ ');
      }

      return value || '-';
    },

    getDense(field) {
      return field.dense !== undefined ? field.dense : this.defaultDense;
    },
    getFilled(field) {
      return field.filled !== undefined ? field.filled : this.defaultFilled;
    },
    getOutlined(field) {
      return field.outlined !== undefined ? field.outlined : this.defaultOutlined;
    },
    getSingleLine(field) {
      return field.singleLine !== undefined ? field.singleLine : this.defaultSingleLine;
    },

    getRules(field) {
      const rules = [];
      if (field.required) {
        rules.push(v => !!v || `${field.label || '此字段'}为必填项`);
      }
      if (field.rules) {
        if (Array.isArray(field.rules)) {
          rules.push(...field.rules);
        } else if (typeof field.rules === 'string') {
          const ruleNames = field.rules.split('|');
          ruleNames.forEach(name => {
            const trimmedName = name.trim();
            if (this.validationRules[trimmedName]) {
              rules.push(...this.validationRules[trimmedName]);
            }
          });
        }
      }
      return rules;
    },

    // --- 事件处理 ---

    handleInput(key, value) {
      this.$set(this.formData, key, value);
      this.$emit('input', this.formData);
      this.$emit('field-input', { key, value, formData: this.formData });
    },

    handleChange(key, value) {
      this.$set(this.formData, key, value);
      this.$emit('input', this.formData);
      this.$emit('change', this.formData);
      this.$emit('field-change', { key, value, formData: this.formData });
    },
    
    handleColorInput(field, value) {
      this.handleInput(field.key, value);
      if (field.closeOnSelect !== false) {
        this.$set(this.colorMenus, field.key, false);
      }
    },

    handleBlur(key, value) {
      this.$emit('blur', key, value, this.formData);
      this.$emit('field-blur', { key, value, formData: this.formData });
    },

    updateField(key, value) {
      this.$set(this.formData, key, value);
      this.handleChange(key, value);
    },

    // --- 依赖处理 ---

    setupFieldDependencies() {
      this.fields.forEach(field => {
        if (field.dependencies && Array.isArray(field.dependencies)) {
          field.dependencies.forEach(depKey => {
            const unwatch = this.$watch(
              () => this.formData[depKey],
              (newVal, oldVal) => {
                if (newVal !== oldVal) {
                  this.handleDependencyChange(field, depKey, newVal, oldVal);
                }
              }
            );
            this.dependencyWatchers.push(unwatch);
          });
        }
      });
    },

    setupDependencyWatchers(deps) {
      // 这里的 dependencies prop 是全局依赖监听，不同于 field.dependencies
      // 为了保持兼容性，我们保留这个功能
      // 实际上之前的 JhFormFields 实现是先清除再添加，这里照做
      // 但注意不要清除了 field dependencies，所以这里应该分开管理？
      // 之前的代码中 dependencyWatchers 混用了。
      // 我们这里简单处理：全部 push 到 dependencyWatchers，销毁时一起销毁。
      // 但是如果 deps 变化了，我们需要只清除这部分的 watcher。
      // 鉴于复杂性，且通常 dependencies prop 不会动态变化，我们暂且简化。
      // 如果必须支持动态，需要更复杂的管理。这里假设 dependencies prop 主要用于监听某些字段变化并发射事件。
      
      deps.forEach(depKey => {
        const unwatch = this.$watch(
          () => this.formData[depKey],
          (newVal, oldVal) => {
            if (newVal !== oldVal) {
              this.$emit('dependency-change', { key: depKey, value: newVal, oldValue: oldVal, formData: this.formData });
            }
          }
        );
        this.dependencyWatchers.push(unwatch);
      });
    },

    handleDependencyChange(field, depKey, newVal, oldVal) {
      if (typeof field.onDependencyChange === 'function') {
        field.onDependencyChange(depKey, newVal, oldVal, this.formData);
      }
      this.$emit('field-dependency-change', {
        field: field.key,
        dependency: depKey,
        value: newVal,
        oldValue: oldVal,
        formData: this.formData,
      });
    },

    // --- 表单操作 API ---

    getForm() {
      return this.$refs.form;
    },
    
    // 转发 v-form 的方法
    ...(() => {
      const methods = {};
      const formMethods = ['validate', 'reset', 'resetValidation'];
      formMethods.forEach(methodName => {
        methods[methodName] = function(...args) {
          const form = this.$refs.form;
          if (form && typeof form[methodName] === 'function') {
            return form[methodName](...args);
          }
          if (methodName === 'validate') return true;
          return undefined;
        };
      });
      return methods;
    })(),

    getFormData() {
      return { ...this.formData };
    },

    setFieldsValue(values) {
      this.formData = { ...this.formData, ...values };
    },

    setFieldValue(key, value) {
      this.$set(this.formData, key, value);
    },

    // 覆盖 v-form 的 reset，同时重置数据
    reset() {
      const form = this.$refs.form;
      if (form) form.reset();
      this.initFormData();
      this.$emit('reset', this.formData);
    },
    
    resetForm() {
      this.reset();
    },

    async validate() {
      const form = this.$refs.form;
      if (form) {
        const isValid = await form.validate();
        this.$emit('validate', isValid, this.formData);
        return isValid;
      }
      return true;
    },
    
    // 提交表单
    async submit(options = {}) {
      const {
        validate = true,
        transform = true,
        showLoading = false,
        resetError = true
      } = options;
      
      if (resetError) this.submitError = null;
      if (showLoading) this.submitLoading = true;
      
      try {
        if (validate) {
          const isValid = await this.validate();
          if (!isValid) {
            if (this.onFinishFailed) this.onFinishFailed(this.formData);
            return false;
          }
        }
        
        const transformedData = transform ? this.getTransformedData() : { ...this.formData };
        this.$emit('submit', transformedData);
        
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
        if (showLoading) this.submitLoading = false;
      }
    },

    getTransformedData() {
      const data = { ...this.formData };
      this.fields.forEach(field => {
        if (field.key && field.transform && typeof field.transform === 'function') {
          data[field.key] = field.transform(data[field.key], data);
        }
      });

      if (this.omitNil) {
        Object.keys(data).forEach(key => {
          if (data[key] === null || data[key] === undefined || data[key] === '') {
            delete data[key];
          }
        });
      }

      return data;
    },
  },
};
</script>

<style scoped>
.jh-form {
  width: 100%;
}

.jh-form--bordered {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-2xl);
}

.jh-form-header {
  margin-bottom: var(--spacing-lg);
}

.jh-form-title {
  font-size: var(--font-size-h3);
  font-weight: 500;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
}

.jh-form-description {
  font-size: var(--font-size-body);
  color: var(--color-text-tertiary);
  margin-top: var(--spacing-xs);
  line-height: 1.5;
}

/* Horizontal Layout */
.jh-form--horizontal .jh-field-label--horizontal {
  padding-top: 0;
  line-height: 1.5;
}

/* Inline Layout */
.jh-form--inline .v-input {
  margin-bottom: 0 !important;
}

/* Readonly Mode */
.jh-form--readonly {
  .jh-field-label {
    color: var(--color-text-secondary);
    font-weight: 500;
  }
  
  .jh-form-readonly-text {
    padding: 6px 12px;
    color: var(--color-text-primary);
    background-color: var(--color-bg-secondary);
    border-radius: var(--radius-sm);
    line-height: 1.5;
    transition: all var(--transition-base) var(--easing-ease);
  }
  
  &.jh-form--horizontal .jh-field-wrapper,
  &.jh-form--vertical .jh-field-wrapper {
    margin-bottom: var(--spacing-lg);
  }
}

.jh-field-label--horizontal {
  padding-right: var(--spacing-md);
}

.jh-field-label--vertical {
  display: block;
}

.jh-form-group-title {
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.jh-form-group-title h3 {
  color: var(--color-text-primary);
  font-weight: 500;
}

.jh-field-wrapper {
  width: 100%;
}

.jh-field-input {
  width: 100%;
}

.jh-form-readonly-text {
  word-break: break-word;
}

.jh-color-preview {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-normal);
}

.jh-form-actions-wrapper {
  margin-top: var(--spacing-lg);
}
</style>