<template>
  <div :class="formFieldsClasses">
    <!-- 标题区域 -->
    <div v-if="title || $slots.title" class="jh-form-fields-header">
      <slot name="title">
        <div class="jh-form-fields-title">
          {{ title }}
          <v-tooltip v-if="tooltip" bottom>
            <template v-slot:activator="{ on, attrs }">
              <jh-icon icon="mdi:help-circle-outline" width="16" height="16" class="ml-1" v-bind="attrs" v-on="on"></jh-icon>
            </template>
            <span>{{ tooltip }}</span>
          </v-tooltip>
        </div>
      </slot>
      <div v-if="description" class="jh-form-fields-description">{{ description }}</div>
    </div>

    <!-- 字段内容区域 -->
    <v-row :class="rowClass" :dense="dense" v-bind="rowProps">
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
              v-if="field.label && showLabels && (layout === 'horizontal' || field.layout === 'horizontal')"
              :class="getHorizontalLabelClass(field)"
              :style="getHorizontalLabelStyle(field)"
            >
              <span v-if="field.required && showRequiredMark" class="error--text mr-1">*</span>
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
                v-if="field.label && showLabels && layout !== 'horizontal' && field.layout !== 'horizontal'"
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
                  :values="values"
                  :updateField="updateField"
                ></slot>
              </template>
            </div>
          </div>
        </v-col>
      </template>
    </v-row>

    <!-- 底部插槽 -->
    <slot name="footer" :values="values"></slot>
  </div>
</template>

<script>
import JhIcon from '../JhIcon/JhIcon.vue'

export default {
  name: 'JhFormFields',
  components: {
    JhIcon
  },

  props: {
    // 字段配置列表
    fields: {
      type: Array,
      default: () => []
    },
    // 表单的初始值
    value: {
      type: Object,
      default: () => ({})
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
    // 布局方式 horizontal | vertical | inline
    layout: {
      type: String,
      default: 'vertical',
      validator: (v) => ['horizontal', 'vertical', 'inline'].includes(v)
    },
    // 是否展示 label
    showLabels: {
      type: Boolean,
      default: true
    },
    // label 固定宽度
    labelWidth: {
      type: [Number, String],
      default: 'auto'
    },
    // label 对齐方式
    labelAlign: {
      type: String,
      default: 'right',
      validator: (v) => ['left', 'right', 'center'].includes(v)
    },
    // 是否展示必填星号
    showRequiredMark: {
      type: Boolean,
      default: true
    },
    // 只读模式
    readonly: {
      type: Boolean,
      default: false
    },
    // 禁用全部字段
    disabled: {
      type: Boolean,
      default: false
    },
    // 默认 dense 样式
    defaultDense: {
      type: Boolean,
      default: true
    },
    // 默认 filled 样式
    defaultFilled: {
      type: Boolean,
      default: true
    },
    // 默认 outlined 样式
    defaultOutlined: {
      type: Boolean,
      default: false
    },
    // 默认单行 label
    defaultSingleLine: {
      type: Boolean,
      default: true
    },
    // md 断点下的默认列宽
    defaultColsMd: {
      type: Number,
      default: 6
    },
    // 是否隐藏 Vuetify 的 details
    hideDetails: {
      type: [Boolean, String],
      default: false
    },
    // label 的额外类名
    labelClass: {
      type: String,
      default: 'jh-input-label'
    },
    // 输入框额外类名
    inputClass: {
      type: String,
      default: 'jh-v-input'
    },
    // 行容器类名
    rowClass: {
      type: String,
      default: ''
    },
    // 行参数配置
    rowProps: {
      type: Object,
      default: () => ({})
    },
    // 通用校验规则
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
    // 压缩外边距/间距
    dense: {
      type: Boolean,
      default: false
    },
    // 是否显示边框
    bordered: {
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
      values: {},
      dateMenus: {},
      timeMenus: {},
      colorMenus: {},
      dependencyWatchers: [],
    };
  },

  computed: {
    formFieldsClasses() {
      return {
        'jh-form-fields': true,
        'jh-form-fields--bordered': this.bordered,
        'jh-form-fields--readonly': this.readonly,
        'jh-form-fields--disabled': this.disabled,
        [`jh-form-fields--${this.layout}`]: true,
      };
    },

    visibleFields() {
      return this.fields.filter(field => {
        if (typeof field.visible === 'function') {
          return field.visible(this.values);
        }
        if (field.visible !== undefined) {
          return field.visible;
        }
        return true;
      });
    },
  },

  watch: {
    value: {
      handler() {
        this.initValues();
      },
      immediate: true,
      deep: true,
    },

    fields: {
      handler() {
        this.initValues();
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
    this.initValues();
    this.setupFieldDependencies();
  },

  beforeDestroy() {
    this.dependencyWatchers.forEach(unwatch => unwatch());
    this.dependencyWatchers = [];
  },

  methods: {
    initValues() {
      const values = { ...this.value };
      this.fields.forEach(field => {
        if (field.defaultValue !== undefined && values[field.key] === undefined) {
          values[field.key] = field.defaultValue;
        }
      });
      this.values = values;
    },

    setupFieldDependencies() {
      this.fields.forEach(field => {
        if (field.dependencies && Array.isArray(field.dependencies)) {
          field.dependencies.forEach(depKey => {
            const unwatch = this.$watch(
              () => this.values[depKey],
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
      this.dependencyWatchers.forEach(unwatch => unwatch());
      this.dependencyWatchers = [];

      deps.forEach(depKey => {
        const unwatch = this.$watch(
          () => this.values[depKey],
          (newVal, oldVal) => {
            if (newVal !== oldVal) {
              this.$emit('dependency-change', { key: depKey, value: newVal, oldValue: oldVal, values: this.values });
            }
          }
        );
        this.dependencyWatchers.push(unwatch);
      });
    },

    handleDependencyChange(field, depKey, newVal, oldVal) {
      if (typeof field.onDependencyChange === 'function') {
        field.onDependencyChange(depKey, newVal, oldVal, this.values);
      }
      this.$emit('field-dependency-change', {
        field: field.key,
        dependency: depKey,
        value: newVal,
        oldValue: oldVal,
        values: this.values,
      });
    },

    getFieldValue(key) {
      return this.values[key];
    },

    getFieldOptions(field) {
      if (typeof field.options === 'function') {
        return field.options(this.values);
      }
      return field.options || [];
    },

    getFieldCols(field) {
      if (this.layout === 'inline') return 'auto';
      if (field.cols) {
        return typeof field.cols === 'object' ? (field.cols.xs || field.cols) : field.cols;
      }
      return 12;
    },

    getFieldSm(field) {
      if (this.layout === 'inline') return 'auto';
      return field.cols && typeof field.cols === 'object' ? field.cols.sm : 12;
    },

    getFieldMd(field) {
      if (this.layout === 'inline') return 'auto';
      if (field.cols && typeof field.cols === 'object') {
        return field.cols.md || this.defaultColsMd;
      }
      return field.cols || this.defaultColsMd;
    },

    getFieldLg(field) {
      if (this.layout === 'inline') return 'auto';
      if (field.cols && typeof field.cols === 'object') {
        return field.cols.lg || field.cols.md || this.defaultColsMd;
      }
      return field.cols || this.defaultColsMd;
    },

    getFieldXl(field) {
      if (this.layout === 'inline') return 'auto';
      if (field.cols && typeof field.cols === 'object') {
        return field.cols.xl || field.cols.md || this.defaultColsMd;
      }
      return field.cols || this.defaultColsMd;
    },

    getFieldColClass(field) {
      return field.colClass || '';
    },

    getFieldWrapperClass(field) {
      const fieldLayout = field.layout || this.layout;
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
      const fieldLayout = field.layout || this.layout;
      return fieldLayout === 'horizontal' ? 'jh-field-input flex-grow-1' : 'jh-field-input';
    },

    getFieldDisabled(field) {
      if (typeof field.disabled === 'function') {
        return field.disabled(this.values);
      }
      if (field.disabled !== undefined) {
        return field.disabled;
      }
      return this.disabled;
    },

    isFieldReadonly(field) {
      if (typeof field.readonly === 'function') {
        return field.readonly(this.values);
      }
      if (field.readonly !== undefined) {
        return field.readonly;
      }
      return this.readonly;
    },

    getReadonlyValue(field) {
      const value = this.values[field.key];

      if (typeof field.readonlyRender === 'function') {
        return field.readonlyRender(value, this.values);
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

    handleInput(key, value) {
      this.$set(this.values, key, value);
      this.$emit('input', this.values);
      this.$emit('field-input', { key, value, values: this.values });
    },

    handleChange(key, value) {
      this.$set(this.values, key, value);
      this.$emit('input', this.values);
      this.$emit('field-change', { key, value, values: this.values });
    },

    handleColorInput(field, value) {
      this.handleInput(field.key, value);
      if (field.closeOnSelect !== false) {
        this.$set(this.colorMenus, field.key, false);
      }
    },

    handleBlur(key, value) {
      this.$emit('field-blur', { key, value, values: this.values });
    },

    updateField(key, value) {
      this.$set(this.values, key, value);
      this.$emit('input', this.values);
      this.$emit('field-change', { key, value, values: this.values });
    },

    getValues() {
      return { ...this.values };
    },

    setFieldsValue(values) {
      this.values = { ...this.values, ...values };
      this.$emit('input', this.values);
    },

    setFieldValue(key, value) {
      this.$set(this.values, key, value);
      this.$emit('input', this.values);
    },

    resetFields() {
      const values = {};
      this.fields.forEach(field => {
        if (field.defaultValue !== undefined) {
          values[field.key] = field.defaultValue;
        }
      });
      this.values = values;
      this.$emit('input', this.values);
      this.$emit('reset', this.values);
    },
  },
};
</script>

<style scoped>
.jh-form-fields {
  width: 100%;
}

.jh-form-fields--bordered {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 15px 16px 30px;
}

.jh-form-fields-header {
  margin-bottom: 16px;
}

.jh-form-fields-title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
}

.jh-form-fields-description {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 4px;
  line-height: 1.5;
}

.jh-form-fields--horizontal .jh-field-label--horizontal {
  padding-top: 0;
  line-height: 1.5;
}

.jh-form-fields--inline .v-input {
  margin-bottom: 0 !important;
}

.jh-form-fields--readonly {
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
  &.jh-form-fields--horizontal {
    .jh-field-wrapper {
      margin-bottom: 16px;
    }
  }
  
  /* 垂直布局下的调整 */
  &.jh-form-fields--vertical {
    .jh-field-wrapper {
      margin-bottom: 16px;
    }
  }
}

.jh-field-label {

}

.jh-field-label--horizontal {
  padding-right: 12px;
}

.jh-field-label--vertical {
  display: block;
}

.jh-form-group-title {
  margin-top: 8px;
  margin-bottom: 16px;
}

.jh-form-group-title h3 {
  color: rgba(0, 0, 0, 0.85);
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
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
