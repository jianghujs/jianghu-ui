<template>
  <div class="jh-query-filter">
    <!-- 查询表单 -->
    <v-form ref="queryForm" @submit.prevent="handleSearch">
      <v-row :class="rowClass">
        <!-- 使用 JhFormFields 渲染字段 -->
        <JhFormFields
          v-model="formData"
          :fields="visibleFieldsWithConfig"
          :showLabels="showLabels"
          :labelClass="labelClass"
          :inputClass="inputClass"
          :defaultDense="dense"
          :defaultFilled="filled"
          :defaultOutlined="outlined"
          :defaultSingleLine="singleLine"
          :hideDetails="true"
          layout="vertical"
          @field-change="handleFieldChange"
        >
          <!-- 透传自定义字段插槽 -->
          <template v-for="field in fields" v-slot:[`field-${field.key}`]="slotProps">
            <slot :name="`field-${field.key}`" v-bind="slotProps"></slot>
          </template>
        </JhFormFields>

        <!-- 操作按钮列 -->
        <v-col class="d-flex align-end flex-column justify-center">
          <span class="opacity-0" v-if="showLabels" :class="labelClass">
            工具栏
          </span>

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
import JhFormFields from '../JhFormFields/JhFormFields.vue';

export default {
  name: 'JhQueryFilter',

  components: {
    JhFormFields,
  },

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

    // 是否使用 filled 风格输入框
    filled: {
      type: Boolean,
      default: true,
    },

    // 是否使用 outlined 风格输入框
    outlined: {
      type: Boolean,
      default: false,
    },

    // 是否单行显示标签
    singleLine: {
      type: Boolean,
      default: true,
    },

    // 按钮文本
    searchText: {
      type: String,
      default: '查询',
    },

    // 重置按钮文案
    resetText: {
      type: String,
      default: '重置',
    },

    // 折叠状态下展示“展开”按钮文案
    expandText: {
      type: String,
      default: '展开',
    },

    // 展开状态下展示“收起”按钮文案
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

    // 每行容器的自定义类，用于控制间距
    rowClass: {
      type: String,
      default: 'ma-0',
    },

    // 按钮区域根元素类名
    buttonClass: {
      type: String,
      default: 'gap-2',
    },

    // 按钮列（v-col）的类名
    buttonColumnClass: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      formData: {},
      collapsed: this.defaultCollapsed,
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

    // 为字段添加查询过滤器特有的配置
    visibleFieldsWithConfig() {
      return this.visibleFields.map(field => ({
        ...field,
        // 设置列宽配置
        cols: field.cols || { 
          xs: this.colSpan.xs || 12,
          sm: this.colSpan.sm || 12,
          md: this.colSpan.md || 8,
          lg: this.colSpan.lg || 6,
        },
        // 查询过滤器字段默认可清空
        props: {
          clearable: true,
          ...field.props,
        },
      }));
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

    // 处理字段变化
    handleFieldChange({ key, value }) {
      this.$emit('field-change', { key, value, formData: this.formData });

      // 如果配置了实时查询
      if (this.fields.find(f => f.key === key)?.realtime) {
        this.handleSearch();
      }
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
