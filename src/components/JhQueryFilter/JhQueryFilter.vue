<template>
  <div class="jh-query-filter">
    <!-- 查询表单 -->
    <v-form ref="queryForm" @submit.prevent="handleSearch">
      <v-row :class="rowClass">
        <!-- 显示的字段 -->
        <template v-for="(field, index) in visibleFields">
          <v-col
            :key="field.key"
            :cols="field.cols || colSpan.xs || 12"
            :sm="field.sm || colSpan.sm || 12"
            :md="field.md || colSpan.md || 8"
            :lg="field.lg || colSpan.lg || 6"
            :class="field.colClass"
          >
            <!-- 字段标签 -->
            <span v-if="field.label && showLabels" :class="labelClass">
              {{ field.label }}
            </span>

            <!-- 文本输入框 -->
            <v-text-field
              v-if="field.type === 'text' || !field.type"
              :class="inputClass"
              :dense="getDense(field)"
              :single-line="getSingleLine(field)"
              :filled="getFilled(field)"
              :outlined="getOutlined(field)"
              v-model="formData[field.key]"
              :disabled="field.disabled"
              :placeholder="field.placeholder"
              :prefix="field.prefix"
              :suffix="field.suffix"
              :hide-details="true"
              clearable
              v-bind="field.props"
              @input="handleFieldChange(field.key, $event)"
              @keyup.enter="handleSearch"
            ></v-text-field>

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
              :disabled="field.disabled"
              :placeholder="field.placeholder"
              :hide-details="true"
              clearable
              v-bind="field.props"
              @input="handleFieldChange(field.key, $event)"
              @keyup.enter="handleSearch"
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
              :disabled="field.disabled"
              :placeholder="field.placeholder"
              :item-text="field.itemText || 'text'"
              :item-value="field.itemValue || 'value'"
              :multiple="field.multiple"
              :chips="field.chips"
              :hide-details="true"
              clearable
              v-bind="field.props"
              @change="handleFieldChange(field.key, $event)"
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
              :disabled="field.disabled"
              :placeholder="field.placeholder"
              :item-text="field.itemText || 'text'"
              :item-value="field.itemValue || 'value'"
              :hide-details="true"
              clearable
              v-bind="field.props"
              @change="handleFieldChange(field.key, $event)"
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
                  :disabled="field.disabled"
                  :placeholder="field.placeholder"
                  :hide-details="true"
                  clearable
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formData[field.key]"
                @input="dateMenus[field.key] = false; handleFieldChange(field.key, formData[field.key])"
                :locale="field.locale || 'zh-cn'"
                v-bind="field.pickerProps"
              ></v-date-picker>
            </v-menu>

            <!-- 日期范围选择器 -->
            <v-menu
              v-else-if="field.type === 'daterange'"
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
                  :value="formatDateRange(field.key)"
                  :disabled="field.disabled"
                  :placeholder="field.placeholder"
                  :hide-details="true"
                  clearable
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="clearDateRange(field.key)"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formData[field.key]"
                range
                @input="handleFieldChange(field.key, formData[field.key])"
                :locale="field.locale || 'zh-cn'"
                v-bind="field.pickerProps"
              ></v-date-picker>
            </v-menu>

            <!-- 自定义字段插槽 -->
            <slot
              v-else-if="field.type === 'slot'"
              :name="`field-${field.key}`"
              :field="field"
              :formData="formData"
              :updateField="updateField"
            ></slot>
          </v-col>
        </template>

        <!-- 操作按钮列 -->
        <v-col
          :cols="colSpan.xs || 12"
          :sm="colSpan.sm || 12"
          :md="colSpan.md || 8"
          :lg="colSpan.lg || 6"
          class="d-flex align-end pb-2"
          :class="buttonColumnClass"
        >
          <slot name="buttons" :formData="formData" :search="handleSearch" :reset="handleReset">
            <div class="jh-query-filter-buttons" :class="buttonClass">
              <!-- 查询按钮 -->
              <v-btn
                color="primary"
                :small="buttonSize === 'small'"
                :dense="buttonSize === 'small'"
                depressed
                @click="handleSearch"
                :loading="searching"
                class="jh-query-filter-search-btn"
              >
                <v-icon left small>mdi-magnify</v-icon>
                {{ searchText }}
              </v-btn>

              <!-- 重置按钮 -->
              <v-btn
                outlined
                :small="buttonSize === 'small'"
                :dense="buttonSize === 'small'"
                @click="handleReset"
                class="jh-query-filter-reset-btn"
              >
                <v-icon left small>mdi-refresh</v-icon>
                {{ resetText }}
              </v-btn>

              <!-- 展开/收起按钮 -->
              <v-btn
                v-if="collapsible && fields.length > defaultVisibleCount"
                text
                :small="buttonSize === 'small'"
                :dense="buttonSize === 'small'"
                color="primary"
                @click="toggleCollapse"
                class="jh-query-filter-collapse-btn"
              >
                {{ collapsed ? expandText : collapseText }}
                <v-icon right small>{{ collapsed ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
              </v-btn>
            </div>
          </slot>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'JhQueryFilter',

  props: {
    // 查询字段配置
    fields: {
      type: Array,
      default: () => [],
    },

    // 初始查询数据
    initialValues: {
      type: Object,
      default: () => ({}),
    },

    // 是否可折叠
    collapsible: {
      type: Boolean,
      default: true,
    },

    // 默认是否折叠
    defaultCollapsed: {
      type: Boolean,
      default: true,
    },

    // 默认显示字段数量（折叠时）
    defaultVisibleCount: {
      type: Number,
      default: 3,
    },

    // 列宽配置（响应式）
    colSpan: {
      type: Object,
      default: () => ({
        xs: 24,
        sm: 12,
        md: 6,
        lg: 4,
      }),
    },

    // 是否显示标签
    showLabels: {
      type: Boolean,
      default: true,
    },

    // 输入框样式
    dense: {
      type: Boolean,
      default: true,
    },

    filled: {
      type: Boolean,
      default: true,
    },

    outlined: {
      type: Boolean,
      default: false,
    },

    singleLine: {
      type: Boolean,
      default: true,
    },

    // 按钮文本
    searchText: {
      type: String,
      default: '查询',
    },

    resetText: {
      type: String,
      default: '重置',
    },

    expandText: {
      type: String,
      default: '展开',
    },

    collapseText: {
      type: String,
      default: '收起',
    },

    // 按钮大小
    buttonSize: {
      type: String,
      default: 'small',
      validator: (v) => ['small', 'default', 'large'].includes(v),
    },

    // 按钮对齐方式
    buttonAlign: {
      type: String,
      default: 'left',
      validator: (v) => ['left', 'right', 'center'].includes(v),
    },

    // 加载状态
    loading: {
      type: Boolean,
      default: false,
    },

    // 自定义样式类
    labelClass: {
      type: String,
      default: 'jh-input-label',
    },

    inputClass: {
      type: String,
      default: 'jh-v-input',
    },

    rowClass: {
      type: String,
      default: 'ma-0',
    },

    buttonClass: {
      type: String,
      default: 'gap-2',
    },

    buttonColumnClass: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      formData: {},
      collapsed: this.defaultCollapsed,
      dateMenus: {},
      searching: false,
    };
  },

  computed: {
    // 可见的字段列表
    visibleFields() {
      if (!this.collapsible || !this.collapsed) {
        return this.fields;
      }
      return this.fields.slice(0, this.defaultVisibleCount);
    },
  },

  watch: {
    initialValues: {
      handler(val) {
        this.formData = { ...val };
      },
      immediate: true,
      deep: true,
    },

    loading(val) {
      this.searching = val;
    },
  },

  mounted() {
    this.initFormData();
  },

  methods: {
    // 初始化表单数据
    initFormData() {
      const data = { ...this.initialValues };

      // 从 fields 中提取默认值
      this.fields.forEach(field => {
        if (field.defaultValue !== undefined && data[field.key] === undefined) {
          data[field.key] = field.defaultValue;
        }
      });

      this.formData = data;
    },

    // 获取 dense 属性值
    getDense(field) {
      return field.dense !== undefined ? field.dense : this.dense;
    },

    // 获取 filled 属性值
    getFilled(field) {
      return field.filled !== undefined ? field.filled : this.filled;
    },

    // 获取 outlined 属性值
    getOutlined(field) {
      return field.outlined !== undefined ? field.outlined : this.outlined;
    },

    // 获取 singleLine 属性值
    getSingleLine(field) {
      return field.singleLine !== undefined ? field.singleLine : this.singleLine;
    },

    // 格式化日期范围显示
    formatDateRange(key) {
      const dateRange = this.formData[key];
      if (Array.isArray(dateRange) && dateRange.length === 2) {
        return `${dateRange[0]} ~ ${dateRange[1]}`;
      }
      return '';
    },

    // 清空日期范围
    clearDateRange(key) {
      this.$set(this.formData, key, []);
      this.handleFieldChange(key, []);
    },

    // 处理字段变化
    handleFieldChange(key, value) {
      this.$emit('field-change', { key, value, formData: this.formData });

      // 如果配置了实时查询
      if (this.fields.find(f => f.key === key)?.realtime) {
        this.handleSearch();
      }
    },

    // 更新字段值（供插槽使用）
    updateField(key, value) {
      this.$set(this.formData, key, value);
      this.handleFieldChange(key, value);
    },

    // 切换折叠状态
    toggleCollapse() {
      this.collapsed = !this.collapsed;
      this.$emit('collapse-change', this.collapsed);
    },

    // 处理查询
    async handleSearch() {
      this.searching = true;
      try {
        // 过滤掉空值
        const queryData = {};
        Object.keys(this.formData).forEach(key => {
          const value = this.formData[key];
          if (value !== null && value !== undefined && value !== '') {
            // 日期范围特殊处理
            if (Array.isArray(value) && value.length === 0) {
              return;
            }
            queryData[key] = value;
          }
        });

        this.$emit('search', queryData);
      } finally {
        if (!this.loading) {
          this.searching = false;
        }
      }
    },

    // 处理重置
    handleReset() {
      // 重置表单数据
      this.initFormData();

      // 清空所有字段
      this.fields.forEach(field => {
        this.$set(this.formData, field.key, field.defaultValue !== undefined ? field.defaultValue : '');
      });

      this.$emit('reset');

      // 自动触发查询
      this.handleSearch();
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
  },
};
</script>

<style scoped>
.jh-query-filter {
  padding: 16px;
  background: #fff;
  border-radius: 4px;
}

/* 按钮容器样式 */
.jh-query-filter-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 查询按钮样式 */
.jh-query-filter-search-btn {
  min-width: 80px;
}

/* 重置按钮样式 */
.jh-query-filter-reset-btn {
  min-width: 80px;
}

/* 展开/收起按钮样式 */
.jh-query-filter-collapse-btn {
  margin-left: 8px;
}

/* Flex 工具类 */
.d-flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.align-end {
  align-items: flex-end;
}

.gap-2 {
  gap: 8px;
}
</style>
