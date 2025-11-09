<template>
  <div :class="formListClasses">
    <!-- 列表头部 -->
    <div v-if="title || description || $slots.header" class="jh-form-list-header">
      <slot name="header">
        <h3 v-if="title" class="text-h6 mb-2">{{ title }}</h3>
        <p v-if="description" class="text-caption grey--text mb-0">{{ description }}</p>
      </slot>
    </div>

    <!-- 空列表占位 -->
    <div v-if="listData.length === 0" class="jh-form-list-empty">
      <slot name="empty">
        <v-icon size="48" color="grey lighten-1">mdi-inbox</v-icon>
        <p class="grey--text mt-2">暂无数据</p>
      </slot>
    </div>

    <!-- 列表主体 - Card 模式 -->
    <div
      v-else-if="mode === 'card'"
      ref="listBody"
      class="jh-form-list-body jh-form-list-body--card"
    >
      <v-card
        v-for="(item, index) in listData"
        :key="item.__id__"
        :class="getItemClasses(index)"
        v-bind="cardProps"
        class="jh-form-list-item jh-form-list-item--card mb-4"
      >
        <!-- 列表项头部 -->
        <v-card-title class="jh-form-list-item-header py-2 px-4">
          <div class="d-flex align-center">
            <!-- 拖拽把手 -->
            <v-icon
              v-if="sortable && !disabled && !readonly"
              class="jh-form-list-drag-handle mr-2"
              small
            >
              mdi-drag
            </v-icon>
            <!-- 折叠按钮 -->
            <v-btn
              v-if="collapsible"
              icon
              x-small
              @click="toggleCollapse(item)"
              class="mr-2"
            >
              <v-icon small>
                {{ isCollapsed(item) ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
              </v-icon>
            </v-btn>
            <!-- 序号 -->
            <span v-if="showIndex && alwaysShowItemLabel" class="jh-form-list-item-index">
              #{{ index + 1 }}
            </span>
          </div>
          <v-spacer></v-spacer>
          <!-- 操作按钮 -->
          <div v-if="showItemActions && !disabled && !readonly" class="jh-form-list-item-actions">
            <slot name="item-actions" :item="item" :index="index" :removeItem="removeItem" :copyItem="copyItem">
              <template v-if="actionRender">
                <component :is="{ render: () => renderActionButtons(item, index) }" />
              </template>
              <template v-else>
                <v-btn
                  v-if="copyable"
                  icon
                  small
                  @click="copyItem(index)"
                  title="复制"
                >
                  <v-icon small>mdi-content-copy</v-icon>
                </v-btn>
                <v-btn
                  icon
                  small
                  color="error"
                  @click="removeItem(index)"
                  :disabled="listData.length <= min"
                  title="删除"
                >
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </template>
            </slot>
          </div>
        </v-card-title>

        <v-divider v-if="!isCollapsed(item)"></v-divider>

        <!-- 列表项内容 -->
        <v-expand-transition>
          <v-card-text v-show="!isCollapsed(item)" class="pa-4">
            <slot name="item" :item="item" :index="index" :fields="fields" :updateItem="(key, value) => updateItemField(index, key, value)">
              <jh-form
                :ref="`itemForm_${index}`"
                :fields="fields"
                :initial-data="item"
                :layout="itemLayout"
                :label-width="itemLabelWidth"
                :dense="dense"
                :outlined="outlined"
                :disabled="disabled"
                :readonly="readonly"
                :hide-details="false"
                @field-change="handleItemFieldChange(index, $event)"
              >
                <!-- 传递字段插槽 -->
                <template v-for="field in fields" v-slot:[`field-${field.key}`]="slotProps">
                  <slot
                    :name="`field-${field.key}`"
                    v-bind="{ ...slotProps, index, item }"
                  ></slot>
                </template>
              </jh-form>
            </slot>
          </v-card-text>
        </v-expand-transition>

        <!-- 验证错误提示 -->
        <v-alert
          v-if="validationErrors[index] && !isCollapsed(item)"
          type="error"
          dense
          text
          class="mx-4 mb-3"
        >
          {{ validationErrors[index] }}
        </v-alert>
      </v-card>
    </div>

    <!-- 列表主体 - Table 模式 -->
    <div
      v-else-if="mode === 'table'"
      class="jh-form-list-body jh-form-list-body--table"
    >
      <v-simple-table :dense="dense">
        <thead>
          <tr>
            <th v-if="showIndex" class="text-center" style="width: 60px">#</th>
            <th v-if="sortable && !disabled && !readonly" style="width: 40px"></th>
            <th v-for="field in fields" :key="field.key">
              <span v-if="field.required" class="error--text mr-1">*</span>
              {{ field.label }}
            </th>
            <th v-if="showItemActions && !disabled && !readonly" class="text-center" :style="{ width: actionColumn.width + 'px' }">
              操作
            </th>
          </tr>
        </thead>
        <tbody ref="listBody">
          <tr
            v-for="(item, index) in listData"
            :key="item.__id__"
            :class="getItemClasses(index)"
          >
            <!-- 序号 -->
            <td v-if="showIndex" class="text-center">{{ index + 1 }}</td>
            <!-- 拖拽把手 -->
            <td v-if="sortable && !disabled && !readonly" class="text-center">
              <v-icon class="jh-form-list-drag-handle" small>mdi-drag</v-icon>
            </td>
            <!-- 字段列 -->
            <td v-for="field in fields" :key="field.key">
              <slot :name="`field-${field.key}`" :item="item" :index="index" :field="field" :updateItem="(key, value) => updateItemField(index, key, value)">
                <component
                  :is="getFieldComponent(field)"
                  v-model="item[field.key]"
                  :dense="dense"
                  :outlined="outlined"
                  :disabled="disabled || getFieldDisabled(field, item)"
                  :readonly="readonly"
                  :placeholder="field.placeholder"
                  :hide-details="true"
                  v-bind="getFieldProps(field)"
                  @input="handleItemFieldChange(index, { key: field.key, value: $event })"
                ></component>
              </slot>
            </td>
            <!-- 操作列 -->
            <td v-if="showItemActions && !disabled && !readonly" class="text-center">
              <slot name="item-actions" :item="item" :index="index" :removeItem="removeItem" :copyItem="copyItem">
                <v-btn
                  v-if="copyable"
                  icon
                  x-small
                  @click="copyItem(index)"
                  title="复制"
                  class="mr-1"
                >
                  <v-icon x-small>mdi-content-copy</v-icon>
                </v-btn>
                <v-btn
                  icon
                  x-small
                  color="error"
                  @click="removeItem(index)"
                  :disabled="listData.length <= min"
                  title="删除"
                >
                  <v-icon x-small>mdi-delete</v-icon>
                </v-btn>
              </slot>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>

    <!-- 列表主体 - Inline 模式 -->
    <div
      v-else-if="mode === 'inline'"
      ref="listBody"
      class="jh-form-list-body jh-form-list-body--inline d-flex flex-wrap align-center"
    >
      <div
        v-for="(item, index) in listData"
        :key="item.__id__"
        :class="getItemClasses(index)"
        class="jh-form-list-item jh-form-list-item--inline mr-2 mb-2"
      >
        <slot name="item" :item="item" :index="index" :fields="fields" :updateItem="(key, value) => updateItemField(index, key, value)">
          <v-chip
            :close="!disabled && !readonly && listData.length > min"
            @click:close="removeItem(index)"
            :draggable="sortable && !disabled && !readonly"
          >
            <v-icon v-if="sortable && !disabled && !readonly" class="jh-form-list-drag-handle mr-1" x-small>
              mdi-drag
            </v-icon>
            {{ getInlineItemDisplay(item) }}
          </v-chip>
        </slot>
      </div>
    </div>

    <!-- 列表级验证错误 -->
    <v-alert
      v-if="validationErrors._list"
      type="error"
      dense
      text
      class="mt-3"
    >
      {{ validationErrors._list }}
    </v-alert>

    <!-- 最大数量限制提示 -->
    <v-alert
      v-if="showMaxLimitAlert"
      type="warning"
      dense
      text
      dismissible
      class="mt-3"
      @input="showMaxLimitAlert = false"
    >
      {{ maxLimitText }} (最大: {{ max }})
    </v-alert>

    <!-- 最小数量限制提示 -->
    <v-alert
      v-if="showMinLimitAlert"
      type="warning"
      dense
      text
      dismissible
      class="mt-3"
      @input="showMinLimitAlert = false"
    >
      {{ minLimitText }} (最小: {{ min }})
    </v-alert>

    <!-- 列表底部 - 添加按钮 -->
    <div v-if="!disabled && !readonly && computedCreatorButtonProps !== false" class="jh-form-list-footer mt-4">
      <slot name="footer" :addItem="addItem" :canAdd="canAdd">
        <v-btn
          v-bind="computedCreatorButtonProps"
          :disabled="!canAdd"
          @click="addItem()"
        >
          <v-icon left>mdi-plus</v-icon>
          {{ computedCreatorButtonProps.text || addButtonText }}
        </v-btn>
      </slot>
    </div>
  </div>
</template>

<script>
import JhForm from '../JhForm/JhForm.vue';

export default {
  name: 'JhFormList',

  components: {
    JhForm,
  },

  props: {
    // 列表数据 (v-model)
    value: {
      type: Array,
      default: () => [],
    },

    // 字段配置
    fields: {
      type: Array,
      default: () => [],
    },

    // 渲染模式
    mode: {
      type: String,
      default: 'card',
      validator: (v) => ['card', 'table', 'inline'].includes(v),
    },

    // 列表标题
    title: {
      type: String,
      default: '',
    },

    // 列表说明
    description: {
      type: String,
      default: '',
    },

    // 最小项数
    min: {
      type: Number,
      default: 0,
    },

    // 最大项数
    max: {
      type: Number,
      default: Infinity,
    },

    // 是否可排序
    sortable: {
      type: Boolean,
      default: false,
    },

    // 是否可复制
    copyable: {
      type: Boolean,
      default: true,
    },

    // 是否显示序号
    showIndex: {
      type: Boolean,
      default: true,
    },

    // 是否显示项操作按钮
    showItemActions: {
      type: Boolean,
      default: true,
    },

    // 新增项的默认值
    defaultValue: {
      type: [Object, Function],
      default: () => ({}),
    },

    // 添加按钮文本
    addButtonText: {
      type: String,
      default: '添加',
    },

    // 添加按钮 props
    addButtonProps: {
      type: Object,
      default: () => ({}),
    },

    // 删除确认
    deleteConfirm: {
      type: Boolean,
      default: false,
    },

    // 删除确认文本
    deleteConfirmText: {
      type: String,
      default: '确定要删除这一项吗？',
    },

    // 列表项表单布局
    itemLayout: {
      type: String,
      default: 'horizontal',
    },

    // 列表项标签宽度
    itemLabelWidth: {
      type: [Number, String],
      default: 'auto',
    },

    // 紧凑模式
    dense: {
      type: Boolean,
      default: true,
    },

    // 边框样式
    outlined: {
      type: Boolean,
      default: true,
    },

    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },

    // 只读
    readonly: {
      type: Boolean,
      default: false,
    },

    // 列表级验证规则
    rules: {
      type: Array,
      default: () => [],
    },

    // 操作列配置 (table 模式)
    actionColumn: {
      type: Object,
      default: () => ({ width: 100 }),
    },

    // 卡片 props (card 模式)
    cardProps: {
      type: Object,
      default: () => ({}),
    },

    // 列表项自定义样式类
    itemClass: {
      type: String,
      default: '',
    },

    // Inline 模式显示字段
    inlineDisplayKey: {
      type: String,
      default: '',
    },

    // 始终显示项标签 (card 模式)
    alwaysShowItemLabel: {
      type: Boolean,
      default: true,
    },

    // 自定义项渲染函数
    itemRender: {
      type: Function,
      default: null,
    },

    // 创建按钮配置 (ProFormList 风格)
    creatorButtonProps: {
      type: [Object, Boolean],
      default: () => ({}),
    },

    // 创建记录的初始值 (ProFormList 风格)
    creatorRecord: {
      type: [Object, Function],
      default: null,
    },

    // 操作守卫 (删除前确认)
    actionGuard: {
      type: Object,
      default: () => ({
        beforeAddRow: null,
        beforeRemoveRow: null,
      }),
    },

    // 删除后回调
    onAfterRemove: {
      type: Function,
      default: null,
    },

    // 卡片是否可折叠
    collapsible: {
      type: Boolean,
      default: false,
    },

    // 默认折叠状态
    defaultCollapsed: {
      type: Boolean,
      default: false,
    },

    // 操作按钮渲染配置
    actionRender: {
      type: Function,
      default: null,
    },

    // 最大数量提示文本
    maxLimitText: {
      type: String,
      default: '已达到最大数量限制',
    },

    // 最小数量提示文本
    minLimitText: {
      type: String,
      default: '已达到最小数量限制',
    },
  },

  data() {
    return {
      listData: [],
      validationErrors: {},
      sortableInstance: null,
      collapsedItems: new Set(), // 折叠状态管理
      showMaxLimitAlert: false, // 显示最大数量提示
      showMinLimitAlert: false, // 显示最小数量提示
    };
  },

  computed: {
    formListClasses() {
      return {
        'jh-form-list': true,
        [`jh-form-list--${this.mode}`]: true,
        'jh-form-list--disabled': this.disabled,
        'jh-form-list--readonly': this.readonly,
      };
    },

    canAdd() {
      return this.listData.length < this.max;
    },

    // 计算创建按钮配置
    computedCreatorButtonProps() {
      if (this.creatorButtonProps === false) return false;
      return {
        color: 'primary',
        outlined: true,
        ...this.creatorButtonProps,
      };
    },

    // 计算创建记录初始值
    computedCreatorRecord() {
      if (this.creatorRecord) {
        return typeof this.creatorRecord === 'function'
          ? this.creatorRecord
          : () => this.creatorRecord;
      }
      return typeof this.defaultValue === 'function'
        ? this.defaultValue
        : () => this.defaultValue;
    },
  },

  watch: {
    value: {
      handler(val) {
        this.initListData();
      },
      immediate: true,
      deep: true,
    },

    sortable(val) {
      if (val) {
        this.$nextTick(() => {
          this.initSortable();
        });
      } else {
        this.destroySortable();
      }
    },
  },

  mounted() {
    if (this.sortable) {
      this.initSortable();
    }
  },

  beforeDestroy() {
    this.destroySortable();
  },

  methods: {
    // 生成唯一 ID
    generateItemId() {
      return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // 初始化列表数据
    initListData() {
      this.listData = (this.value || []).map(item => ({
        ...item,
        __id__: item.__id__ || this.generateItemId(),
      }));
    },

    // 获取清理后的数据（移除 __id__）
    getCleanData() {
      return this.listData.map(item => {
        const { __id__, ...cleanItem } = item;
        return cleanItem;
      });
    },

    // 添加项
    async addItem(item = null, index = null) {
      // 检查最大数量限制
      if (this.listData.length >= this.max) {
        this.showMaxLimitAlert = true;
        setTimeout(() => {
          this.showMaxLimitAlert = false;
        }, 3000);
        this.$emit('max-limit', this.max);
        return;
      }

      // 执行添加前守卫
      if (this.actionGuard?.beforeAddRow) {
        const canAdd = await this.actionGuard.beforeAddRow(this.listData.length);
        if (canAdd === false) return;
      }

      // 获取默认值
      const defaultValue = this.computedCreatorRecord(this.listData.length);

      // 创建新项
      const newItem = {
        ...defaultValue,
        ...item,
        __id__: this.generateItemId(),
      };

      // 插入列表
      if (index !== null && index >= 0 && index <= this.listData.length) {
        this.listData.splice(index, 0, newItem);
      } else {
        this.listData.push(newItem);
      }

      // 触发事件
      this.emitInput();
      this.$emit('add', this.getCleanItem(newItem), index ?? this.listData.length - 1);
    },

    // 删除项
    async removeItem(index) {
      // 检查最小数量限制
      if (this.listData.length <= this.min) {
        this.showMinLimitAlert = true;
        setTimeout(() => {
          this.showMinLimitAlert = false;
        }, 3000);
        this.$emit('min-limit', this.min);
        return;
      }

      // 执行删除前守卫
      if (this.actionGuard?.beforeRemoveRow) {
        const canRemove = await this.actionGuard.beforeRemoveRow(index, this.listData[index]);
        if (canRemove === false) return;
      }

      // 确认弹窗
      if (this.deleteConfirm) {
        const confirmed = await this.confirm(this.deleteConfirmText);
        if (!confirmed) return;
      }

      const removedItem = this.listData[index];
      this.listData.splice(index, 1);

      // 清理验证错误
      delete this.validationErrors[index];
      // 清理折叠状态
      this.collapsedItems.delete(removedItem.__id__);

      this.emitInput();
      this.$emit('remove', this.getCleanItem(removedItem), index);
      
      // 执行删除后回调
      if (this.onAfterRemove) {
        this.onAfterRemove(index, this.getCleanItem(removedItem));
      }
    },

    // 复制项
    copyItem(index) {
      if (!this.canAdd) {
        this.$emit('max-limit', this.max);
        return;
      }

      const sourceItem = this.listData[index];
      const { __id__, ...cleanSource } = sourceItem;
      const newItem = {
        ...cleanSource,
        __id__: this.generateItemId(),
      };

      // 在源项后面插入
      this.listData.splice(index + 1, 0, newItem);

      this.emitInput();
      this.$emit('copy', this.getCleanItem(sourceItem), this.getCleanItem(newItem));
    },

    // 移动项
    moveItem(oldIndex, newIndex) {
      const item = this.listData.splice(oldIndex, 1)[0];
      this.listData.splice(newIndex, 0, item);

      this.emitInput();
      this.$emit('sort', oldIndex, newIndex);
    },

    // 更新项字段
    updateItemField(index, key, value) {
      if (this.listData[index]) {
        this.$set(this.listData[index], key, value);
        this.emitInput();
        this.$emit('item-change', index, this.getCleanItem(this.listData[index]));
      }
    },

    // 处理项字段变化
    handleItemFieldChange(index, { key, value }) {
      this.updateItemField(index, key, value);
    },

    // 获取清理后的单个项
    getCleanItem(item) {
      const { __id__, ...cleanItem } = item;
      return cleanItem;
    },

    // 触发 input 事件
    emitInput() {
      this.$emit('input', this.getCleanData());
      this.$emit('change', this.getCleanData());
    },

    // 获取项样式类
    getItemClasses(index) {
      const classes = [];
      if (this.itemClass) {
        classes.push(this.itemClass);
      }
      if (this.validationErrors[index]) {
        classes.push('jh-form-list-item--error');
      }
      return classes.join(' ');
    },

    // 切换折叠状态
    toggleCollapse(item) {
      const id = item.__id__;
      if (this.collapsedItems.has(id)) {
        this.collapsedItems.delete(id);
      } else {
        this.collapsedItems.add(id);
      }
      this.$forceUpdate();
    },

    // 判断是否折叠
    isCollapsed(item) {
      return this.collapsedItems.has(item.__id__);
    },

    // 渲染操作按钮
    renderActionButtons(item, index) {
      if (this.actionRender) {
        return this.actionRender({
          item: this.getCleanItem(item),
          index,
          removeItem: () => this.removeItem(index),
          copyItem: () => this.copyItem(index),
        });
      }
      return null;
    },

    // 获取字段组件
    getFieldComponent(field) {
      const componentMap = {
        text: 'v-text-field',
        textarea: 'v-textarea',
        number: 'v-text-field',
        select: 'v-select',
        autocomplete: 'v-autocomplete',
        switch: 'v-switch',
        checkbox: 'v-checkbox',
      };
      return componentMap[field.type] || 'v-text-field';
    },

    // 获取字段 props
    getFieldProps(field) {
      const props = { ...field.props };

      if (field.type === 'select' || field.type === 'autocomplete') {
        props.items = field.options || [];
        props.itemText = field.itemText || 'text';
        props.itemValue = field.itemValue || 'value';
      }

      if (field.type === 'number') {
        props.type = 'number';
      }

      return props;
    },

    // 获取字段禁用状态
    getFieldDisabled(field, item) {
      if (typeof field.disabled === 'function') {
        return field.disabled(item);
      }
      return field.disabled || false;
    },

    // Inline 模式显示内容
    getInlineItemDisplay(item) {
      if (this.inlineDisplayKey) {
        return item[this.inlineDisplayKey] || '-';
      }
      // 默认显示第一个字段的值
      const firstField = this.fields[0];
      return firstField ? (item[firstField.key] || '-') : '-';
    },

    // 初始化拖拽排序
    initSortable() {
      if (!this.sortable || this.sortableInstance) return;

      this.$nextTick(() => {
        const container = this.$refs.listBody;
        if (!container) return;

        // 动态导入 sortablejs
        if (typeof window !== 'undefined' && window.Sortable) {
          this.sortableInstance = window.Sortable.create(container, {
            animation: 150,
            handle: '.jh-form-list-drag-handle',
            ghostClass: 'jh-form-list-ghost',
            dragClass: 'jh-form-list-dragging',
            onEnd: (evt) => {
              const { oldIndex, newIndex } = evt;
              if (oldIndex !== newIndex) {
                this.moveItem(oldIndex, newIndex);
              }
            },
          });
        } else {
          console.warn('JhFormList: sortable 功能需要引入 SortableJS 库');
        }
      });
    },

    // 销毁拖拽实例
    destroySortable() {
      if (this.sortableInstance) {
        this.sortableInstance.destroy();
        this.sortableInstance = null;
      }
    },

    // 验证整个列表
    async validate() {
      const errors = {};
      let isValid = true;

      // 1. 验证列表规则
      if (this.rules && this.rules.length) {
        for (const rule of this.rules) {
          const result = rule(this.getCleanData());
          if (typeof result === 'string') {
            errors._list = result;
            isValid = false;
            break;
          }
        }
      }

      // 2. 验证每个项
      for (let i = 0; i < this.listData.length; i++) {
        const itemValid = await this.validateItem(i);
        if (!itemValid) {
          isValid = false;
          errors[i] = '该项存在验证错误';
        }
      }

      this.validationErrors = errors;
      this.$emit('validate', isValid, errors);
      return isValid;
    },

    // 验证指定项
    async validateItem(index) {
      const formRef = this.$refs[`itemForm_${index}`];
      if (formRef && formRef[0]) {
        return await formRef[0].validate();
      }
      return true;
    },

    // 重置验证
    resetValidation() {
      this.validationErrors = {};
      // 重置每个项的表单验证
      this.listData.forEach((item, index) => {
        const formRef = this.$refs[`itemForm_${index}`];
        if (formRef && formRef[0]) {
          formRef[0].resetValidation();
        }
      });
    },

    // 重置列表
    reset() {
      this.listData = [];
      this.validationErrors = {};
      this.emitInput();
    },

    // 获取列表数据
    getItems() {
      return this.getCleanData();
    },

    // 设置列表数据
    setItems(items) {
      this.listData = items.map(item => ({
        ...item,
        __id__: item.__id__ || this.generateItemId(),
      }));
      this.emitInput();
    },

    // 获取指定项数据
    getItemValue(index) {
      return this.listData[index] ? this.getCleanItem(this.listData[index]) : null;
    },

    // 设置指定项数据
    setItemValue(index, value) {
      if (this.listData[index]) {
        this.$set(this.listData, index, {
          ...value,
          __id__: this.listData[index].__id__,
        });
        this.emitInput();
      }
    },

    // 确认对话框
    confirm(message) {
      // 简单的确认实现，实际项目中可以使用 JhConfirmDialog
      return new Promise((resolve) => {
        const result = window.confirm(message);
        resolve(result);
      });
    },
  },
};
</script>

<style scoped>
/* 表单列表容器 */
.jh-form-list {
  width: 100%;
}

/* 列表头部 */
.jh-form-list-header {
  margin-bottom: 16px;
}

/* 列表主体 */
.jh-form-list-body {
  position: relative;
}

.jh-form-list-body--inline {
  gap: 8px;
}

/* 列表项 */
.jh-form-list-item {
  position: relative;
}

.jh-form-list-item--card {
  transition: box-shadow 0.2s ease;
}

.jh-form-list-item--card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.jh-form-list-item--error {
  border-color: #f44336 !important;
}

/* 列表项头部 */
.jh-form-list-item-header {
  min-height: 48px;
}

.jh-form-list-item-index {
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}

/* 列表项操作 */
.jh-form-list-item-actions {
  display: flex;
  gap: 4px;
}

/* 拖拽把手 */
.jh-form-list-drag-handle {
  cursor: move;
  color: rgba(0, 0, 0, 0.4);
}

.jh-form-list-drag-handle:hover {
  color: rgba(0, 0, 0, 0.6);
}

/* 拖拽状态 */
.jh-form-list-ghost {
  opacity: 0.5;
  background: rgba(0, 0, 0, 0.05);
}

.jh-form-list-dragging {
  cursor: move;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 列表底部 */
.jh-form-list-footer {
  display: flex;
  justify-content: center;
}

/* 空列表占位 */
.jh-form-list-empty {
  padding: 60px 20px;
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
}

.jh-form-list-empty p {
  margin: 0;
  font-size: 14px;
}

/* 禁用状态 */
.jh-form-list--disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* 只读状态 */
.jh-form-list--readonly .jh-form-list-item-actions,
.jh-form-list--readonly .jh-form-list-footer {
  display: none;
}

/* Table 模式样式优化 */
.jh-form-list-body--table >>> .v-data-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.jh-form-list-body--table >>> .v-input {
  margin-top: 0;
  padding-top: 0;
}

/* 响应式 */
@media (max-width: 600px) {
  .jh-form-list-item-header {
    flex-wrap: wrap;
  }

  .jh-form-list-item-actions {
    margin-top: 8px;
  }
}
</style>
