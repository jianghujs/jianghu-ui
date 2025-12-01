<template>
  <v-form :ref="formRef" :lazy-validation="lazyValidation" :class="formClasses">
    <v-row :class="rowClass" v-bind="isGridLayout ? rowProps : {}">
      <!-- 表单分组 -->
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
          v-bind="getColBindings(field)"
          :class="getFieldColClass(field)"
        >
          <!-- 水平布局容器 -->
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
                  <v-icon small class="ml-1" v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
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
                    <v-icon small class="ml-1" v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
                  </template>
                  <span>{{ field.tooltip }}</span>
                </v-tooltip>
              </div>

              <!-- 额外提示信息 -->
              <div v-if="field.extra" class="jh-field-extra text-caption grey--text mb-2">
                {{ field.extra }}
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
                  v-model="formData[field.key]"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :placeholder="field.placeholder"
                  :prefix="field.prefix"
                  :suffix="field.suffix"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @input="handleInput(field.key, $event)"
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
                  v-model="formData[field.key]"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :placeholder="field.placeholder"
                  :rows="field.rows || 3"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @input="handleInput(field.key, $event)"
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
                  v-model="formData[field.key]"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :placeholder="field.placeholder"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @input="handleInput(field.key, $event)"
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
                  v-model="formData[field.key]"
                  :items="field.options || []"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :placeholder="field.placeholder"
                  :item-text="field.itemText || 'text'"
                  :item-value="field.itemValue || 'value'"
                  :multiple="field.multiple"
                  :chips="field.chips"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @input="handleInput(field.key, $event)"
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
                  v-model="formData[field.key]"
                  :items="field.options || []"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :placeholder="field.placeholder"
                  :item-text="field.itemText || 'text'"
                  :item-value="field.itemValue || 'value'"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @input="handleInput(field.key, $event)"
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
                      v-model="formData[field.key]"
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
                    v-model="formData[field.key]"
                    @input="dateMenus[field.key] = false; handleInput(field.key, formData[field.key])"
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
                      v-model="formData[field.key]"
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
                    v-model="formData[field.key]"
                    @input="timeMenus[field.key] = false; handleInput(field.key, formData[field.key])"
                    format="24hr"
                    v-bind="field.pickerProps"
                  ></v-time-picker>
                </v-menu>

                <!-- 开关 -->
                <v-switch
                  v-else-if="field.type === 'switch'"
                  v-model="formData[field.key]"
                  :label="field.switchLabel"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :color="field.color || 'success'"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @change="handleChange(field.key, $event)"
                ></v-switch>

                <!-- 复选框 -->
                <v-checkbox
                  v-else-if="field.type === 'checkbox'"
                  v-model="formData[field.key]"
                  :label="field.checkboxLabel"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :color="field.color || 'success'"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @change="handleChange(field.key, $event)"
                ></v-checkbox>

                <!-- 单选按钮组 -->
                <v-radio-group
                  v-else-if="field.type === 'radio'"
                  v-model="formData[field.key]"
                  :rules="getRules(field)"
                  :disabled="getFieldDisabled(field)"
                  :readonly="field.readonly"
                  :row="field.row !== false"
                  :hide-details="field.hideDetails || hideDetails"
                  v-bind="field.props"
                  @change="handleChange(field.key, $event)"
                >
                  <v-radio
                    v-for="option in field.options"
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
                  :formData="formData"
                  :updateField="updateField"
                ></slot>
              </template>
            </div>
          </div>
        </v-col>
      </template>

      <!-- Grid 布局下操作区占满整行 -->
      <v-col v-if="isGridLayout" :cols="12" class="jh-form-actions-col">
        <slot name="actions" :formData="formData" :validate="validate" :resetForm="resetForm"></slot>
      </v-col>
    </v-row>

    <!-- 非 Grid 布局保持原有操作区位置 -->
    <template v-if="!isGridLayout">
      <slot name="actions" :formData="formData" :validate="validate" :resetForm="resetForm"></slot>
    </template>
  </v-form>
</template>

<script>
export default {
  name: 'JhForm',

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
  },

  data() {
    return {
      formData: {},
      dateMenus: {},
      timeMenus: {},
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

    // 过滤可见字段
    visibleFields() {
      return this.fields.filter(field => {
        // 如果字段有 visible 函数,根据函数结果判断
        if (typeof field.visible === 'function') {
          return field.visible(this.formData);
        }
        // 如果字段有 visible 布尔值
        if (field.visible !== undefined) {
          return field.visible;
        }
        // 默认显示
        return true;
      });
    },

    // 是否启用 Grid 布局
    isGridLayout() {
      return this.grid || this.layout === 'grid';
    },
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

    // 获取字段列宽配置
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

    // Grid 模式下合并列配置
    getColBindings(field) {
      if (!this.isGridLayout) {
        return {
          cols: this.getFieldCols(field),
          sm: this.getFieldSm(field),
          md: this.getFieldMd(field),
          lg: this.getFieldLg(field),
          xl: this.getFieldXl(field),
        };
      }

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

    // 获取字段列样式类
    getFieldColClass(field) {
      return field.colClass || '';
    },

    // 获取字段包装器样式类
    getFieldWrapperClass(field) {
      const fieldLayout = field.layout || this.layout;
      const layoutClass = fieldLayout === 'horizontal' ? 'd-flex align-center' : '';
      return `jh-field-wrapper ${layoutClass}`;
    },

    // 获取水平布局标签样式类
    getHorizontalLabelClass(field) {
      const align = field.labelAlign || this.labelAlign;
      return `jh-field-label jh-input-label jh-field-label--horizontal text-${align} flex-shrink-0`;
    },

    // 获取水平布局标签样式
    getHorizontalLabelStyle(field) {
      const width = field.labelWidth || this.labelWidth;
      return {
        width: typeof width === 'number' ? `${width}px` : width,
        minWidth: typeof width === 'number' ? `${width}px` : width,
      };
    },

    // 获取垂直布局标签样式类
    getVerticalLabelClass(field) {
      return `jh-field-label jh-input-label jh-field-label--vertical mb-1`;
    },

    // 获取字段输入区域样式类
    getFieldInputClass(field) {
      const fieldLayout = field.layout || this.layout;
      return fieldLayout === 'horizontal' ? 'jh-field-input flex-grow-1' : 'jh-field-input';
    },

    // 判断字段是否禁用
    getFieldDisabled(field) {
      // 优先使用字段的 disabled 函数
      if (typeof field.disabled === 'function') {
        return field.disabled(this.formData);
      }
      // 其次使用字段的 disabled 布尔值
      if (field.disabled !== undefined) {
        return field.disabled;
      }
      // 最后使用全局禁用
      return this.disabled;
    },

    // 判断字段是否只读
    isFieldReadonly(field) {
      // 优先使用字段的 readonly 函数
      if (typeof field.readonly === 'function') {
        return field.readonly(this.formData);
      }
      // 其次使用字段的 readonly 布尔值
      if (field.readonly !== undefined) {
        return field.readonly;
      }
      // 最后使用全局只读
      return this.readonly;
    },

    // 获取只读模式的显示值
    getReadonlyValue(field) {
      const value = this.formData[field.key];

      // 如果字段有自定义只读渲染函数
      if (typeof field.readonlyRender === 'function') {
        return field.readonlyRender(value, this.formData);
      }

      // 处理 select/radio 类型,显示 text 而不是 value
      if ((field.type === 'select' || field.type === 'radio') && field.options) {
        if (field.multiple && Array.isArray(value)) {
          return value.map(v => {
            const option = field.options.find(opt => opt.value === v);
            return option ? option.text : v;
          }).join(', ');
        } else {
          const option = field.options.find(opt => opt.value === value);
          return option ? option.text : value;
        }
      }

      // 处理 switch/checkbox
      if (field.type === 'switch' || field.type === 'checkbox') {
        return value ? '是' : '否';
      }

      // 默认直接显示值
      return value || '-';
    },

    // 获取 dense 属性值
    getDense(field) {
      return field.dense !== undefined ? field.dense : this.defaultDense;
    },

    // 获取 filled 属性值
    getFilled(field) {
      return field.filled !== undefined ? field.filled : this.defaultFilled;
    },

    // 获取 outlined 属性值
    getOutlined(field) {
      return field.outlined !== undefined ? field.outlined : this.defaultOutlined;
    },

    // 获取 singleLine 属性值
    getSingleLine(field) {
      return field.singleLine !== undefined ? field.singleLine : this.defaultSingleLine;
    },

    // 获取验证规则
    getRules(field) {
      const rules = [];

      // 处理 required
      if (field.required) {
        rules.push(v => !!v || `${field.label || '此字段'}为必填项`);
      }

      // 处理自定义规则
      if (field.rules) {
        if (Array.isArray(field.rules)) {
          rules.push(...field.rules);
        } else if (typeof field.rules === 'string') {
          // 支持字符串规则名称,如 'require' 或 'require|email'
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

    // 处理输入事件
    handleInput(key, value) {
      this.$emit('input', key, value, this.formData);
      this.$emit('field-change', { key, value, formData: this.formData });
    },

    // 处理改变事件
    handleChange(key, value) {
      this.$emit('change', key, value, this.formData);
      this.$emit('field-change', { key, value, formData: this.formData });
    },

    // 处理失焦事件
    handleBlur(key, value) {
      this.$emit('blur', key, value, this.formData);
    },

    // 更新字段值(供插槽使用)
    updateField(key, value) {
      this.$set(this.formData, key, value);
      this.handleChange(key, value);
    },

    // 获取表单引用(供父组件调用)
    getForm() {
      return this.$refs[this.formRef];
    },

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

    // 重置表单
    resetForm() {
      const form = this.$refs[this.formRef];
      if (form) {
        form.reset();
      }
      this.initFormData();
      this.$emit('reset', this.formData);
    },

    // 重置表单验证
    resetValidation() {
      const form = this.$refs[this.formRef];
      if (form) {
        form.resetValidation();
      }
    },

    // 验证表单
    async validate() {
      const form = this.$refs[this.formRef];
      if (form) {
        const isValid = await form.validate();
        this.$emit('validate', isValid, this.formData);
        return isValid;
      }
      return true;
    },

    // 提交表单
    async submit() {
      const isValid = await this.validate();
      if (isValid) {
        const transformedData = this.getTransformedData();
        this.$emit('submit', transformedData);
        
        // 调用 onFinish 回调
        if (this.onFinish) {
          try {
            await this.onFinish(transformedData);
          } catch (error) {
            console.error('Form submit error:', error);
          }
        }
      } else {
        // 调用 onFinishFailed 回调
        if (this.onFinishFailed) {
          this.onFinishFailed(this.formData);
        }
      }
      return isValid;
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
.jh-form--readonly .jh-form-readonly-text {
  padding: 8px 0;
  min-height: 40px;
  color: rgba(0, 0, 0, 0.87);
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
