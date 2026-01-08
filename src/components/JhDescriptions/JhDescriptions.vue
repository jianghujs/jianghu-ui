<template>
  <jh-card
    :class="['jh-descriptions', { 'jh-descriptions--editable': editable }]"
    :bordered="bordered"
    :title="title"
    :tooltip="tooltip"
    :loading="loading"
    :size="size"
  >
    <!-- 标题插槽 -->
    <template v-if="$slots.title" #title>
      <slot name="title"></slot>
    </template>

    <!-- 额外内容 -->
    <template v-if="$slots.extra || showEditButton" #extra>
      <slot name="extra">
        <v-btn
          v-if="showEditButton && editable"
          text
          small
          color="primary"
          @click="toggleEdit"
        >
          <v-icon small left>{{ isEditing ? 'mdi-close' : 'mdi-pencil' }}</v-icon>
          {{ isEditing ? cancelText : editText }}
        </v-btn>
        <v-btn
          v-if="isEditing"
          text
          small
          color="success"
          class="ml-2"
          :loading="saving"
          @click="handleSave"
        >
          <v-icon small left>mdi-check</v-icon>
          {{ saveText }}
        </v-btn>
      </slot>
    </template>

    <!-- 描述列表内容 -->
    <div :class="descriptionsClasses">
      <v-row v-if="layout === 'horizontal'" :dense="size === 'small'">
        <template v-for="(item, index) in visibleColumns">
          <v-col
            :key="`label-${index}`"
            :cols="getLabelCols(item)"
            :class="['jh-descriptions-item-label', { 'jh-descriptions-item-label--colon': colon }]"
          >
            <span class="jh-descriptions-item-label-text">{{ item.label || item.title }}</span>
            <v-tooltip v-if="item.tooltip" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon x-small class="ml-1" v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
              </template>
              <span>{{ item.tooltip }}</span>
            </v-tooltip>
          </v-col>
          <v-col
            :key="`content-${index}`"
            :cols="getContentCols(item)"
            class="jh-descriptions-item-content"
          >
            <!-- 编辑模式 -->
            <template v-if="isEditing && item.editable !== false">
              <component
                :is="getFieldComponent(item)"
                v-model="formData[item.dataIndex || item.key]"
                v-bind="getFieldProps(item)"
                :disabled="item.disabled"
                :readonly="item.readonly"
                dense
                outlined
                hide-details="auto"
                @change="handleFieldChange(item, $event)"
              />
            </template>

            <!-- 显示模式 -->
            <template v-else>
              <div class="jh-descriptions-item-value">
                <!-- 自定义插槽 -->
                <slot
                  v-if="$slots[`item-${item.dataIndex || item.key}`]"
                  :name="`item-${item.dataIndex || item.key}`"
                  :value="getValue(item)"
                  :record="dataSource"
                  :item="item"
                ></slot>

                <!-- 自定义 render -->
                <template v-else-if="item.render">
                  <span v-html="renderValue(item)"></span>
                </template>

                <!-- 默认渲染 -->
                <template v-else>
                  {{ formatValue(item) }}
                </template>

                <!-- 复制按钮 -->
                <v-btn
                  v-if="item.copyable && getValue(item)"
                  icon
                  x-small
                  class="ml-2"
                  @click="copyToClipboard(getValue(item), item)"
                >
                  <v-icon x-small>mdi-content-copy</v-icon>
                </v-btn>
              </div>
            </template>
          </v-col>
        </template>
      </v-row>

      <!-- 垂直布局 -->
      <v-row v-else-if="layout === 'vertical' || layout === 'simple'" :dense="size === 'small'">
        <v-col
          v-for="(item, index) in visibleColumns"
          :key="index"
          :cols="getItemCols(item)"
          class="jh-descriptions-item-vertical"
        >
          <div :class="['jh-descriptions-item-label', { 'jh-descriptions-item-label--colon': colon }]">
            <span class="jh-descriptions-item-label-text">{{ item.label || item.title }}</span>
            <v-tooltip v-if="item.tooltip" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon x-small class="ml-1" v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
              </template>
              <span>{{ item.tooltip }}</span>
            </v-tooltip>
          </div>
          <div class="jh-descriptions-item-content">
            <!-- 编辑模式 -->
            <template v-if="isEditing && item.editable !== false">
              <component
                :is="getFieldComponent(item)"
                v-model="formData[item.dataIndex || item.key]"
                v-bind="getFieldProps(item)"
                :disabled="item.disabled"
                :readonly="item.readonly"
                dense
                outlined
                hide-details="auto"
                @change="handleFieldChange(item, $event)"
              />
            </template>

            <!-- 显示模式 -->
            <template v-else>
              <div class="jh-descriptions-item-value">
                <!-- 自定义插槽 -->
                <slot
                  v-if="$slots[`item-${item.dataIndex || item.key}`]"
                  :name="`item-${item.dataIndex || item.key}`"
                  :value="getValue(item)"
                  :record="dataSource"
                  :item="item"
                ></slot>

                <!-- 自定义 render -->
                <template v-else-if="item.render">
                  <span v-html="renderValue(item)"></span>
                </template>

                <!-- 默认渲染 -->
                <template v-else>
                  {{ formatValue(item) }}
                </template>

                <!-- 复制按钮 -->
                <v-btn
                  v-if="item.copyable && getValue(item)"
                  icon
                  x-small
                  class="ml-2"
                  @click="copyToClipboard(getValue(item), item)"
                >
                  <v-icon x-small>mdi-content-copy</v-icon>
                </v-btn>
              </div>
            </template>
          </div>
        </v-col>
      </v-row>

      <!-- 行内布局 -->
      <div
        v-else
        class="jh-descriptions-inline"
        :class="{
          'jh-descriptions-inline--small': size === 'small',
          'jh-descriptions-inline--bordered': bordered,
        }"
      >
        <div
          v-for="(item, index) in visibleColumns"
          :key="index"
          class="jh-descriptions-inline-item"
          :style="getInlineItemStyle(item)"
        >
          <div :class="['jh-descriptions-inline-label', { 'jh-descriptions-item-label--colon': colon }]">
            <span class="jh-descriptions-item-label-text">{{ item.label || item.title }}</span>
            <v-tooltip v-if="item.tooltip" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon x-small class="ml-1" v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
              </template>
              <span>{{ item.tooltip }}</span>
            </v-tooltip>
          </div>
          <div class="jh-descriptions-inline-value">
            <!-- 编辑模式 -->
            <template v-if="isEditing && item.editable !== false">
              <component
                :is="getFieldComponent(item)"
                v-model="formData[item.dataIndex || item.key]"
                v-bind="getFieldProps(item)"
                :disabled="item.disabled"
                :readonly="item.readonly"
                dense
                outlined
                hide-details="auto"
                @change="handleFieldChange(item, $event)"
              />
            </template>

            <!-- 显示模式 -->
            <template v-else>
              <div class="jh-descriptions-item-value">
                <!-- 自定义插槽 -->
                <slot
                  v-if="$slots[`item-${item.dataIndex || item.key}`]"
                  :name="`item-${item.dataIndex || item.key}`"
                  :value="getValue(item)"
                  :record="dataSource"
                  :item="item"
                ></slot>

                <!-- 自定义 render -->
                <template v-else-if="item.render">
                  <span v-html="renderValue(item)"></span>
                </template>

                <!-- 默认渲染 -->
                <template v-else>
                  {{ formatValue(item) }}
                </template>

                <!-- 复制按钮 -->
                <v-btn
                  v-if="item.copyable && getValue(item)"
                  icon
                  x-small
                  class="ml-2"
                  @click="copyToClipboard(getValue(item), item)"
                >
                  <v-icon x-small>mdi-content-copy</v-icon>
                </v-btn>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </jh-card>
</template>

<script>
import JhCard from '../JhCard/JhCard.vue';

export default {
  name: 'JhDescriptions',

  components: {
    JhCard,
  },

  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },

    // 提示信息
    tooltip: {
      type: String,
      default: '',
    },

    // 列配置
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },

    // 数据源
    dataSource: {
      type: Object,
      default: () => ({}),
    },

    // 请求数据的方法
    request: {
      type: Function,
      default: null,
    },

    // 请求参数
    params: {
      type: Object,
      default: () => ({}),
    },

    // 列数
    column: {
      type: [Number, Object],
      default: 3,
    },

    // 布局方式 horizontal | vertical | inline | simple
    layout: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical', 'inline', 'simple'].includes(value),
    },

    // 是否显示边框
    bordered: {
      type: Boolean,
      default: true,
    },

    // 尺寸 small | default
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['small', 'default'].includes(value),
    },

    // 是否显示冒号
    colon: {
      type: Boolean,
      default: true,
    },

    // 标签宽度比例（仅水平布局）
    labelWidth: {
      type: [Number, String],
      default: 'auto',
    },

    // 是否可编辑
    editable: {
      type: [Boolean, Object],
      default: false,
    },

    // 编辑按钮文本
    editText: {
      type: String,
      default: '编辑',
    },

    // 取消按钮文本
    cancelText: {
      type: String,
      default: '取消',
    },

    // 保存按钮文本
    saveText: {
      type: String,
      default: '保存',
    },

    // 空值占位符
    emptyText: {
      type: String,
      default: '-',
    },

    // 加载状态
    loading: {
      type: Boolean,
      default: false,
    },

    // 响应式配置
    responsive: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      internalData: {},
      formData: {},
      isEditing: false,
      saving: false,
      internalLoading: false,
    };
  },

  computed: {
    // 是否显示编辑按钮
    showEditButton() {
      if (typeof this.editable === 'boolean') {
        return this.editable;
      }
      return this.editable && this.editable.showEditButton !== false;
    },

    // 可见的列
    visibleColumns() {
      return this.columns.filter(col => {
        if (col.hideInDescriptions) return false;
        if (typeof col.visible === 'function') {
          return col.visible(this.dataSource);
        }
        return col.visible !== false;
      });
    },

    // 描述列表样式类
    descriptionsClasses() {
      return [
        'jh-descriptions-content',
        `jh-descriptions-content--${this.layout}`,
        {
          'jh-descriptions-content--bordered': this.bordered,
          'jh-descriptions-content--small': this.size === 'small',
        },
      ];
    },

    // 实际数据源
    actualDataSource() {
      return Object.keys(this.internalData).length > 0 ? this.internalData : this.dataSource;
    },
  },

  watch: {
    dataSource: {
      handler(val) {
        this.internalData = { ...val };
        this.formData = { ...val };
      },
      deep: true,
      immediate: true,
    },

    params: {
      handler() {
        if (this.request) {
          this.fetchData();
        }
      },
      deep: true,
    },
  },

  mounted() {
    if (this.request) {
      this.fetchData();
    }
  },

  methods: {
    // 获取标签列宽
    getLabelCols(item) {
      if (this.labelWidth === 'auto') {
        return item.labelCol || 6;
      }
      if (typeof this.labelWidth === 'number') {
        return this.labelWidth;
      }
      return 6;
    },

    // 获取内容列宽
    getContentCols(item) {
      const labelCols = this.getLabelCols(item);
      const span = item.span || 1;
      const totalCols = 12 / this.getColumnCount();
      return totalCols * span - labelCols;
    },

    // 获取项目列宽（垂直布局）
    getItemCols(item) {
      const span = item.span || 1;
      return 12 / this.getColumnCount() * span;
    },

    // 行内布局宽度
    getInlineItemStyle(item) {
      const span = item.span || 1;
      const columns = this.getColumnCount() || 1;
      const percent = Math.min(100, (span / columns) * 100);
      return {
        flexBasis: `${percent}%`,
        maxWidth: `${percent}%`,
      };
    },

    // 获取列数
    getColumnCount() {
      if (typeof this.column === 'number') {
        return this.column;
      }
      // 响应式配置
      const breakpoint = this.getBreakpoint();
      return this.column[breakpoint] || this.column.default || 3;
    },

    // 获取当前断点
    getBreakpoint() {
      const width = window.innerWidth;
      if (width < 576) return 'xs';
      if (width < 768) return 'sm';
      if (width < 992) return 'md';
      if (width < 1200) return 'lg';
      if (width < 1920) return 'xl';
      return 'xxl';
    },

    // 获取值
    getValue(item) {
      const key = item.dataIndex || item.key;
      return this.actualDataSource[key];
    },

    // 格式化值
    formatValue(item) {
      const value = this.getValue(item);
      
      if (value === null || value === undefined || value === '') {
        return this.emptyText;
      }

      // 根据 valueType 格式化
      const valueType = item.valueType || 'text';
      
      switch (valueType) {
        case 'money':
          return this.formatMoney(value);
        case 'percent':
          return `${value}%`;
        case 'date':
          return this.formatDate(value, 'YYYY-MM-DD');
        case 'dateTime':
          return this.formatDate(value, 'YYYY-MM-DD HH:mm:ss');
        case 'time':
          return this.formatDate(value, 'HH:mm:ss');
        case 'option':
          return this.formatOption(value, item);
        case 'tag':
          return value;
        case 'progress':
          return `${value}%`;
        case 'digit':
          return this.formatDigit(value);
        default:
          return value;
      }
    },

    // 渲染值（自定义 render）
    renderValue(item) {
      const value = this.getValue(item);
      return item.render(value, this.actualDataSource, item);
    },

    // 格式化金额
    formatMoney(value) {
      if (!value && value !== 0) return this.emptyText;
      return `¥ ${Number(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },

    // 格式化日期
    formatDate(value, format) {
      if (!value) return this.emptyText;
      // 简单的日期格式化，实际项目中建议使用 dayjs 或 moment
      const date = new Date(value);
      if (isNaN(date.getTime())) return value;
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
    },

    // 格式化选项
    formatOption(value, item) {
      if (!item.valueEnum) return value;
      const option = item.valueEnum[value];
      if (!option) return value;
      return typeof option === 'object' ? option.text : option;
    },

    // 格式化数字
    formatDigit(value) {
      if (!value && value !== 0) return this.emptyText;
      return Number(value).toLocaleString('zh-CN');
    },

    // 获取字段组件
    getFieldComponent(item) {
      const valueType = item.valueType || 'text';
      
      const componentMap = {
        text: 'v-text-field',
        textarea: 'v-textarea',
        digit: 'v-text-field',
        money: 'v-text-field',
        date: 'v-text-field',
        dateTime: 'v-text-field',
        time: 'v-text-field',
        select: 'v-select',
        radio: 'v-radio-group',
        checkbox: 'v-checkbox',
        switch: 'v-switch',
      };
      
      return item.fieldComponent || componentMap[valueType] || 'v-text-field';
    },

    // 获取字段属性
    getFieldProps(item) {
      const valueType = item.valueType || 'text';
      const props = { ...item.fieldProps };
      
      // 根据 valueType 设置默认属性
      if (valueType === 'digit' || valueType === 'money') {
        props.type = 'number';
      }
      
      if (valueType === 'date') {
        props.type = 'date';
      }
      
      if (valueType === 'dateTime') {
        props.type = 'datetime-local';
      }
      
      if (valueType === 'time') {
        props.type = 'time';
      }
      
      if (valueType === 'select' && item.valueEnum) {
        props.items = Object.entries(item.valueEnum).map(([value, label]) => ({
          value,
          text: typeof label === 'object' ? label.text : label,
        }));
      }
      
      return props;
    },

    // 切换编辑状态
    toggleEdit() {
      if (this.isEditing) {
        // 取消编辑，恢复数据
        this.formData = { ...this.actualDataSource };
        this.isEditing = false;
        this.$emit('cancel');
      } else {
        // 开始编辑
        this.formData = { ...this.actualDataSource };
        this.isEditing = true;
        this.$emit('edit-start');
      }
    },

    // 处理字段变化
    handleFieldChange(item, value) {
      this.$emit('field-change', {
        field: item.dataIndex || item.key,
        value,
        item,
      });
    },

    // 保存
    async handleSave() {
      this.saving = true;
      
      try {
        // 触发保存事件
        const result = await this.$emit('save', this.formData);
        
        // 如果配置了 onSave 回调
        if (this.editable && typeof this.editable.onSave === 'function') {
          await this.editable.onSave(this.formData);
        }
        
        // 更新内部数据
        this.internalData = { ...this.formData };
        this.isEditing = false;
        
        this.$emit('save-success', this.formData);
      } catch (error) {
        this.$emit('save-error', error);
        console.error('Save error:', error);
      } finally {
        this.saving = false;
      }
    },

    // 复制到剪贴板
    async copyToClipboard(text, item) {
      try {
        await navigator.clipboard.writeText(String(text));
        this.$emit('copy', { text, item });
        
        // 可以在这里显示提示消息
        if (window.$toast) {
          window.$toast.success('复制成功');
        }
      } catch (error) {
        console.error('Copy failed:', error);
        if (window.$toast) {
          window.$toast.error('复制失败');
        }
      }
    },

    // 获取数据
    async fetchData() {
      if (!this.request) return;
      
      this.internalLoading = true;
      this.$emit('update:loading', true);
      
      try {
        const data = await this.request(this.params);
        this.internalData = data || {};
        this.formData = { ...this.internalData };
        this.$emit('request-success', data);
      } catch (error) {
        this.$emit('request-error', error);
        console.error('Request error:', error);
      } finally {
        this.internalLoading = false;
        this.$emit('update:loading', false);
      }
    },

    // 刷新数据
    reload() {
      if (this.request) {
        this.fetchData();
      }
    },
  },
};
</script>

<style scoped>
/* 描述列表容器 */
.jh-descriptions {
  width: 100%;
}

.jh-descriptions-content {
  width: 100%;
}

/* 水平布局 */
.jh-descriptions-content--horizontal .jh-descriptions-item-label {
  padding: 12px 16px;
  background: #fafafa;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  text-align: right;
  border-bottom: 1px solid #f0f0f0;
}

.jh-descriptions-content--horizontal .jh-descriptions-item-content {
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #f0f0f0;
}

/* 垂直布局 */
.jh-descriptions-content--vertical .jh-descriptions-item-vertical {
  padding: 0;
}

.jh-descriptions-content--vertical .jh-descriptions-item-label {
  padding: 8px 0;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid #f0f0f0;
}

.jh-descriptions-content--vertical .jh-descriptions-item-content {
  padding: 12px 0;
  color: rgba(0, 0, 0, 0.65);
  min-height: 40px;
}

/* 简洁布局 */
.jh-descriptions-content--simple .jh-descriptions-item-vertical {
  border: none;
  padding: 0;
}

.jh-descriptions-content--simple .jh-descriptions-item-label {
  padding: 4px 0;
  border: none;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
}

.jh-descriptions-content--simple .jh-descriptions-item-content {
  padding: 4px 0 12px;
  border-bottom: 1px solid #f5f5f5;
}

.jh-descriptions-content--simple .jh-descriptions-item-content:last-child {
  border-bottom: none;
}

/* 行内布局 */
.jh-descriptions-inline {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.jh-descriptions-inline--bordered {
  border-top: 1px solid #f0f0f0;
  border-left: 1px solid #f0f0f0;
}

.jh-descriptions-inline-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  box-sizing: border-box;
  min-width: 200px;
}

.jh-descriptions-inline--bordered .jh-descriptions-inline-item {
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.jh-descriptions-inline-label {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
  margin-right: 12px;
  min-width: 80px;
}

.jh-descriptions-inline-value {
  flex: 1;
  min-width: 0;
  color: rgba(0, 0, 0, 0.65);
}

.jh-descriptions-inline--small .jh-descriptions-inline-item {
  padding: 8px 12px;
}

/* 标签冒号 */
.jh-descriptions-item-label--colon .jh-descriptions-item-label-text::after {
  content: ':';
  margin: 0 8px 0 2px;
}

/* 值容器 */
.jh-descriptions-item-value {
  display: flex;
  align-items: center;
  word-break: break-word;
}

/* 小尺寸 */
.jh-descriptions-content--small .jh-descriptions-item-label,
.jh-descriptions-content--small .jh-descriptions-item-content {
  padding: 8px 12px;
}

.jh-descriptions-content--small.jh-descriptions-content--vertical .jh-descriptions-item-label {
  padding: 6px 0;
}

.jh-descriptions-content--small.jh-descriptions-content--vertical .jh-descriptions-item-content {
  padding: 8px 0;
}

/* 边框样式 */
.jh-descriptions-content--bordered.jh-descriptions-content--horizontal .jh-descriptions-item-label,
.jh-descriptions-content--bordered.jh-descriptions-content--horizontal .jh-descriptions-item-content {
  border-right: 1px solid #f0f0f0;
}

.jh-descriptions-content--bordered.jh-descriptions-content--vertical .jh-descriptions-item-vertical {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 8px;
}

/* 编辑模式 */
.jh-descriptions--editable .jh-descriptions-item-content {
  min-height: 48px;
}

/* 响应式 */
@media (max-width: 768px) {
  .jh-descriptions-content--horizontal .jh-descriptions-item-label {
    text-align: left;
  }
}
</style>
