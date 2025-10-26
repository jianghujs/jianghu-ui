<template>
  <v-form
    ref="form"
    v-model="valid"
    :lazy-validation="lazyValidation"
    @submit.prevent="handleSubmit"
  >
    <v-container :fluid="fluid">
      <template v-for="(row, rowIndex) in fieldRows">
        <v-row :key="`row-${rowIndex}`" v-bind="computedRowProps">
          <template v-for="(item, itemIndex) in row">
            <!-- 分组标题 -->
            <v-col
              v-if="item.type === 'group'"
              :key="`group-${rowIndex}-${itemIndex}`"
              cols="12"
            >
              <h3 class="jh-pro-form-group-title">
                {{ item.title }}
              </h3>
              <v-divider v-if="item.divider !== false" class="mb-4" />
            </v-col>

            <!-- 表单字段 -->
            <v-col
              v-else
              :key="`field-${rowIndex}-${itemIndex}-${item.name}`"
              :cols="getFieldCols(item)"
              :sm="item.sm"
              :md="item.md"
              :lg="item.lg"
            >
              <!-- 字段内容包装器 -->
              <div
                :class="[
                  'jh-pro-form-field-wrapper',
                  {
                    'jh-pro-form-field-horizontal': isHorizontalLayout,
                    'jh-pro-form-field-vertical-top': isTopLabelLayout,
                  },
                ]"
              >
                <!-- 水平布局：标签 -->
                <div v-if="isHorizontalLayout" class="jh-pro-form-label-col">
                  <label
                    :class="[
                      'jh-pro-form-label',
                      getLabelClass(),
                      { 'jh-pro-form-label-required': item.required },
                    ]"
                  >
                    {{ item.label }}
                  </label>
                </div>
                <!-- 顶部标签布局：标签 -->
                <div
                  v-if="
                    isTopLabelLayout &&
                    !['checkbox', 'switch'].includes(item.type)
                  "
                  class="jh-pro-form-top-label"
                >
                  <label
                    :class="[
                      'jh-input-label',
                      { 'jh-pro-form-label-required': item.required },
                    ]"
                  >
                    {{ item.label }}
                  </label>
                </div>
                <!-- 输入框区域 -->
                <div :class="{ 'jh-pro-form-wrapper-col': isHorizontalLayout }">
                  <!-- 文本输入框 -->
                  <v-text-field
                    v-if="
                      [
                        'text',
                        'email',
                        'password',
                        'tel',
                        'url',
                        'number',
                      ].includes(item.type)
                    "
                    v-model="formData[item.name]"
                    :label="getFieldLabel(item)"
                    :type="item.type"
                    :placeholder="item.placeholder"
                    :rules="getRules(item)"
                    :required="item.required"
                    :disabled="item.disabled"
                    :readonly="item.readonly"
                    :hint="item.hint"
                    :persistent-hint="item.persistentHint"
                    :prepend-icon="item.prependIcon"
                    :append-icon="item.appendIcon"
                    :dense="dense"
                    :single-line="singleLine"
                    :filled="filled"
                    :outlined="outlined"
                    :hide-details="
                      isHorizontalLayout || isTopLabelLayout ? 'auto' : false
                    "
                    @change="handleFieldChange(item.name)"
                    class="jh-v-input"
                  />

                  <!-- 文本域 -->
                  <v-textarea
                    v-else-if="item.type === 'textarea'"
                    v-model="formData[item.name]"
                    :label="getFieldLabel(item)"
                    :placeholder="item.placeholder"
                    :rules="getRules(item)"
                    :required="item.required"
                    :rows="item.rows || 3"
                    :dense="dense"
                    :single-line="singleLine"
                    :filled="filled"
                    :outlined="outlined"
                    :hide-details="
                      isHorizontalLayout || isTopLabelLayout ? 'auto' : false
                    "
                    @change="handleFieldChange(item.name)"
                    class="jh-v-input"
                  />

                  <!-- 选择框 -->
                  <v-select
                    v-else-if="item.type === 'select'"
                    v-model="formData[item.name]"
                    :items="item.options"
                    :label="getFieldLabel(item)"
                    :rules="getRules(item)"
                    :required="item.required"
                    :multiple="item.multiple"
                    :dense="dense"
                    :single-line="singleLine"
                    :filled="filled"
                    :outlined="outlined"
                    :hide-details="
                      isHorizontalLayout || isTopLabelLayout ? 'auto' : false
                    "
                    @change="handleFieldChange(item.name)"
                    class="jh-v-input"
                  />

                  <!-- 自动完成 -->
                  <v-autocomplete
                    v-else-if="item.type === 'autocomplete'"
                    v-model="formData[item.name]"
                    :items="item.options"
                    :label="getFieldLabel(item)"
                    :rules="getRules(item)"
                    :required="item.required"
                    :multiple="item.multiple"
                    :dense="dense"
                    :single-line="singleLine"
                    :filled="filled"
                    :outlined="outlined"
                    :hide-details="
                      isHorizontalLayout || isTopLabelLayout ? 'auto' : false
                    "
                    @change="handleFieldChange(item.name)"
                    class="jh-v-input"
                  />

                  <!-- 日期选择器 -->
                  <v-menu
                    v-else-if="item.type === 'date'"
                    v-model="dateMenus[item.name]"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="formData[item.name]"
                        :label="getFieldLabel(item)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :dense="dense"
                        :single-line="singleLine"
                        :filled="filled"
                        :outlined="outlined"
                        :rules="getRules(item)"
                        :hide-details="
                          isHorizontalLayout || isTopLabelLayout
                            ? 'auto'
                            : false
                        "
                        class="jh-v-input"
                      />
                    </template>
                    <v-date-picker
                      v-model="formData[item.name]"
                      @input="
                        dateMenus[item.name] = false;
                        handleFieldChange(item.name);
                      "
                    />
                  </v-menu>

                  <!-- 日期范围选择器 -->
                  <div
                    v-else-if="item.type === 'daterange'"
                    class="jh-pro-form-daterange"
                  >
                    <v-menu
                      v-model="dateMenus[`${item.name}_start`]"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="formData[`${item.name}_start`]"
                          :label="
                            isHorizontalLayout || isTopLabelLayout
                              ? '开始'
                              : `${item.label}开始`
                          "
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :dense="dense"
                          :single-line="singleLine"
                          :filled="filled"
                          :outlined="outlined"
                          class="jh-v-input"
                          :hide-details="
                            isHorizontalLayout || isTopLabelLayout
                              ? 'auto'
                              : false
                          "
                        />
                      </template>
                      <v-date-picker
                        v-model="formData[`${item.name}_start`]"
                        @input="
                          dateMenus[`${item.name}_start`] = false;
                          handleFieldChange(item.name);
                        "
                        class="jh-v-input"
                      />
                    </v-menu>

                    <v-menu
                      v-model="dateMenus[`${item.name}_end`]"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="formData[`${item.name}_end`]"
                          :label="
                            isHorizontalLayout || isTopLabelLayout
                              ? '结束'
                              : `${item.label}结束`
                          "
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :dense="dense"
                          :single-line="singleLine"
                          :filled="filled"
                          :outlined="outlined"
                          :hide-details="
                            isHorizontalLayout || isTopLabelLayout
                              ? 'auto'
                              : false
                          "
                          class="mt-2 jh-v-input"
                        />
                      </template>
                      <v-date-picker
                        v-model="formData[`${item.name}_end`]"
                        @input="
                          dateMenus[`${item.name}_end`] = false;
                          handleFieldChange(item.name);
                        "
                      />
                    </v-menu>
                  </div>

                  <!-- 复选框 -->
                  <v-checkbox
                    v-else-if="item.type === 'checkbox'"
                    v-model="formData[item.name]"
                    :label="item.label"
                    :rules="getRules(item)"
                    :hide-details="
                      isHorizontalLayout || isTopLabelLayout ? 'auto' : false
                    "
                    @change="handleFieldChange(item.name)"
                    class="jh-v-input"
                  />

                  <!-- 单选框组 -->
                  <v-radio-group
                    v-else-if="item.type === 'radio'"
                    v-model="formData[item.name]"
                    :label="getFieldLabel(item)"
                    :rules="getRules(item)"
                    :row="item.row"
                    :hide-details="
                      isHorizontalLayout || isTopLabelLayout ? 'auto' : false
                    "
                    @change="handleFieldChange(item.name)"
                    class="jh-v-input"
                  >
                    <v-radio
                      v-for="option in item.options"
                      :key="option.value"
                      :label="option.text"
                      :value="option.value"
                      class="jh-v-input"
                    />
                  </v-radio-group>

                  <!-- 开关 -->
                  <v-switch
                    v-else-if="item.type === 'switch'"
                    v-model="formData[item.name]"
                    :label="item.label"
                    :hide-details="
                      isHorizontalLayout || isTopLabelLayout ? 'auto' : false
                    "
                    @change="handleFieldChange(item.name)"
                    class="jh-v-input"
                  />

                  <!-- 滑块 -->
                  <div v-else-if="item.type === 'slider'">
                    <label
                      v-if="!isHorizontalLayout && !isTopLabelLayout"
                      class="v-label"
                      >{{ item.label }}</label
                    >
                    <v-slider
                      v-model="formData[item.name]"
                      :min="item.min || 0"
                      :max="item.max || 100"
                      :step="item.step || 1"
                      thumb-label
                      @change="handleFieldChange(item.name)"
                      class="jh-v-input"
                    />
                  </div>

                  <!-- 评分 -->
                  <div v-else-if="item.type === 'rating'">
                    <label
                      v-if="!isHorizontalLayout && !isTopLabelLayout"
                      class="v-label"
                      >{{ item.label }}</label
                    >
                    <v-rating
                      v-model="formData[item.name]"
                      :length="item.length || 5"
                      @input="handleFieldChange(item.name)"
                      class="jh-v-input"
                    />
                  </div>

                  <!-- 自定义插槽 -->
                  <slot
                    v-else-if="item.type === 'slot'"
                    :name="`field-${item.name}`"
                    :value="formData[item.name]"
                    :on-change="(val) => handleSlotChange(item.name, val)"
                    class="jh-v-input"
                  />

                  <!-- 关闭输入框区域和字段包装器 -->
                </div>
              </div>
            </v-col>
          </template>
        </v-row>
      </template>

      <!-- 表单按钮 -->
      <v-row v-if="showButtons">
        <v-col :class="buttonAlign">
          <slot name="buttons">
            <v-btn
              :color="submitButtonColor"
              :disabled="!valid || submitting"
              :loading="submitting"
              type="submit"
              class="mr-2"
            >
              {{ submitButtonText }}
            </v-btn>
            <v-btn
              :color="resetButtonColor"
              :disabled="submitting"
              @click="handleReset"
            >
              {{ resetButtonText }}
            </v-btn>
          </slot>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "JhProForm",
  props: {
    fields: {
      type: Array,
      required: true,
      default: () => [],
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
    lazyValidation: {
      type: Boolean,
      default: true,
    },
    fluid: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    singleLine: {
      type: Boolean,
      default: true,
    },
    filled: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    showButtons: {
      type: Boolean,
      default: true,
    },
    submitButtonText: {
      type: String,
      default: "提交",
    },
    resetButtonText: {
      type: String,
      default: "重置",
    },
    submitButtonColor: {
      type: String,
      default: "primary",
    },
    resetButtonColor: {
      type: String,
      default: "secondary",
    },
    buttonAlign: {
      type: String,
      default: "text-right",
    },
    submitting: {
      type: Boolean,
      default: false,
    },
    colSpan: {
      type: Number,
      default: 12,
    },
    // 布局相关配置
    layout: {
      type: String,
      default: "vertical",
      validator: (v) =>
        ["vertical", "horizontal", "inline", "grid"].includes(v),
    },
    grid: {
      type: Object,
      default: () => ({
        column: 1,
        gutter: 16,
      }),
    },
    rowProps: {
      type: Object,
      default: () => ({}),
    },
    // 标签列配置（仅在 horizontal 布局下生效）
    labelCol: {
      type: Object,
      default: () => ({
        cols: 12,
        sm: 4,
        md: 3,
      }),
    },
    // 输入框列配置（仅在 horizontal 布局下生效）
    wrapperCol: {
      type: Object,
      default: () => ({
        cols: 12,
        sm: 8,
        md: 9,
      }),
    },
    // 标签对齐方式
    labelAlign: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right", "center"].includes(v),
    },
    // 标签位置（vertical 布局下有效）
    labelPosition: {
      type: String,
      default: "top",
      validator: (v) => ["float", "top"].includes(v),
    },
  },
  data() {
    return {
      valid: false,
      formData: {},
      dateMenus: {},
      fieldVisibility: {},
    };
  },
  computed: {
    normalizedFields() {
      return this.fields;
    },
    // 计算是否使用 grid 布局模式
    isGridLayout() {
      return this.layout === "grid";
    },
    // 计算是否使用水平布局模式
    isHorizontalLayout() {
      return this.layout === "horizontal";
    },
    // 计算是否使用顶部标签（vertical 布局 + labelPosition='top'）
    isTopLabelLayout() {
      return this.layout === "vertical" && this.labelPosition === "top";
    },
    // 在 grid 模式下，将字段分组到行中
    fieldRows() {
      if (!this.isGridLayout) {
        return this.normalizedFields.map((field) => [field]);
      }

      const rows = [];
      let currentRow = [];
      let currentRowSpan = 0;
      const columnCount = this.grid.column || 1;
      const spanPerColumn = 12 / columnCount;

      this.normalizedFields.forEach((field) => {
        // 分组标题独占一行
        if (field.type === "group") {
          if (currentRow.length > 0) {
            rows.push([...currentRow]);
            currentRow = [];
            currentRowSpan = 0;
          }
          rows.push([field]);
          return;
        }

        // 跳过隐藏的字段
        if (!this.shouldShowField(field)) {
          return;
        }

        // 计算字段占用的列数
        const fieldColSpan = field.colSpan || 1;
        const fieldSpan = spanPerColumn * fieldColSpan;

        // 如果当前行放不下，开启新行
        if (currentRowSpan + fieldSpan > 12) {
          rows.push([...currentRow]);
          currentRow = [];
          currentRowSpan = 0;
        }

        // 添加字段到当前行
        currentRow.push({ ...field, _calculatedCols: fieldSpan });
        currentRowSpan += fieldSpan;

        // 如果当前行已满，开启新行
        if (currentRowSpan >= 12) {
          rows.push([...currentRow]);
          currentRow = [];
          currentRowSpan = 0;
        }
      });

      // 添加最后一行
      if (currentRow.length > 0) {
        rows.push(currentRow);
      }

      return rows;
    },
    // 计算 v-row 的 gutter
    computedRowProps() {
      const baseProps = { ...this.rowProps };
      if (this.isGridLayout && this.grid.gutter !== undefined) {
        // 在 Vuetify 中，gutter 通过 v-row 的 dense 或自定义类实现
        // 这里我们不直接设置，而是通过样式控制
      }
      return baseProps;
    },
  },
  watch: {
    initialData: {
      deep: true,
      handler() {
        this.initFormData();
      },
    },
  },
  created() {
    this.initFormData();
  },
  methods: {
    // 计算字段的列宽度
    getFieldCols(field) {
      // 在 grid 模式下，使用计算好的列宽度
      if (this.isGridLayout && field._calculatedCols) {
        return field._calculatedCols;
      }
      // 否则使用字段自定义的 cols 或默认的 colSpan
      return field.cols || this.colSpan || 12;
    },
    // 获取标签列配置
    getLabelColProps(field) {
      return field.labelCol || this.labelCol;
    },
    // 获取输入框列配置
    getWrapperColProps(field) {
      return field.wrapperCol || this.wrapperCol;
    },
    // 获取标签样式类
    getLabelClass() {
      return `jh-pro-form-label-${this.labelAlign}`;
    },
    // 获取输入框的 label 属性值
    getFieldLabel(item) {
      // 水平布局或顶部标签布局时，不显示内联 label
      if (this.isHorizontalLayout || this.isTopLabelLayout) {
        return undefined;
      }
      return item.label;
    },
    initFormData() {
      const data = {};
      const menus = {};
      const visibility = {};

      this.fields.forEach((field) => {
        if (field.type === "group") return;

        data[field.name] =
          this.initialData[field.name] !== undefined
            ? this.initialData[field.name]
            : field.default !== undefined
            ? field.default
            : this.getDefaultValue(field.type);

        if (field.type === "date") {
          menus[field.name] = false;
        }
        if (field.type === "daterange") {
          menus[`${field.name}_start`] = false;
          menus[`${field.name}_end`] = false;
          data[`${field.name}_start`] =
            this.initialData[`${field.name}_start`] || "";
          data[`${field.name}_end`] =
            this.initialData[`${field.name}_end`] || "";
        }

        visibility[field.name] = field.hidden !== true;
      });

      this.formData = data;
      this.dateMenus = menus;
      this.fieldVisibility = visibility;
    },
    getDefaultValue(type) {
      const defaults = {
        checkbox: false,
        switch: false,
        number: 0,
        slider: 0,
        rating: 0,
        select: null,
        autocomplete: null,
      };
      return defaults[type] !== undefined ? defaults[type] : "";
    },
    getRules(field) {
      const rules = [];

      if (field.required) {
        rules.push((v) => {
          if (v === null || v === undefined || v === "") {
            return `${field.label}不能为空`;
          }
          return true;
        });
      }

      if (field.rules) {
        rules.push(...field.rules);
      }

      return rules;
    },
    shouldShowField(field) {
      if (field.type === "group") return false;
      if (field.hidden === true) return false;

      // 支持动态显示隐藏
      if (typeof field.visible === "function") {
        return field.visible(this.formData);
      }

      return this.fieldVisibility[field.name] !== false;
    },
    handleFieldChange(fieldName) {
      this.$emit("field-change", {
        field: fieldName,
        values: { ...this.formData },
      });
      this.$emit("change", { ...this.formData });
    },
    handleSlotChange(fieldName, value) {
      this.formData[fieldName] = value;
      this.handleFieldChange(fieldName);
    },
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit("submit", { ...this.formData });
      }
    },
    handleReset() {
      this.$refs.form.reset();
      this.initFormData();
      this.$emit("reset");
    },
    validate() {
      return this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getFieldValue(fieldName) {
      return this.formData[fieldName];
    },
    setFieldValue(fieldName, value) {
      this.$set(this.formData, fieldName, value);
    },
    getFormData() {
      return { ...this.formData };
    },
  },
};
</script>

<style scoped>
.jh-pro-form-group-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.87);
}

.jh-pro-form-daterange {
  /* 日期范围样式 */
}

.v-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 8px;
  display: block;
}

/* 水平布局样式 */
.jh-pro-form-field-wrapper {
  width: 100%;
}

.jh-pro-form-field-horizontal {
  display: flex;
  align-items: flex-start;
  min-height: 48px;
}

.jh-pro-form-label-col {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding-right: 12px;
  padding-top: 16px;
}

/* 响应式标签宽度 */
@media (min-width: 600px) {
  .jh-pro-form-field-horizontal .jh-pro-form-label-col {
    width: 33.333333%; /* sm: 4/12 */
  }
  .jh-pro-form-field-horizontal .jh-pro-form-wrapper-col {
    width: 66.666667%; /* sm: 8/12 */
  }
}

@media (min-width: 960px) {
  .jh-pro-form-field-horizontal .jh-pro-form-label-col {
    width: 25%; /* md: 3/12 */
  }
  .jh-pro-form-field-horizontal .jh-pro-form-wrapper-col {
    width: 75%; /* md: 9/12 */
  }
}

.jh-pro-form-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.jh-pro-form-label-left {
  text-align: left;
}

.jh-pro-form-label-right {
  text-align: right;
  width: 100%;
}

.jh-pro-form-label-center {
  text-align: center;
  width: 100%;
}

.jh-pro-form-label-required::before {
  content: "* ";
  color: #f44336;
  margin-right: 2px;
}

.jh-pro-form-wrapper-col {
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

/* 顶部标签布局样式 */
.jh-pro-form-field-vertical-top {
  display: flex;
  flex-direction: column;
}

.jh-pro-form-top-label {
  margin-bottom: 4px;
}

.jh-pro-form-top-label .jh-pro-form-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.5;
  text-align: left;
  display: block;
}
</style>
