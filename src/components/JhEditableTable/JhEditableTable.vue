<template>
  <div class="jh-editable-table">
    <v-data-table
      :headers="tableHeaders"
      :items="internalData"
      :items-per-page="itemsPerPage"
      :hide-default-footer="hideFooter"
      :dense="dense"
      :disable-sort="!sortable"
      class="elevation-1"
    >
      <!-- 自定义单元格渲染 -->
      <template v-for="column in editableColumns" v-slot:[`item.${column.key}`]="{ item }">
        <div :key="column.key" class="jh-editable-cell">
          <!-- 编辑模式 -->
          <template v-if="isEditing(item)">
            <!-- 文本输入 -->
            <v-text-field
              v-if="!column.type || column.type === 'text'"
              v-model="item[column.key]"
              :label="column.label"
              :rules="column.rules"
              :placeholder="column.placeholder"
              dense
              hide-details="auto"
              class="my-1"
            ></v-text-field>

            <!-- 数字输入 -->
            <v-text-field
              v-else-if="column.type === 'number'"
              v-model.number="item[column.key]"
              :label="column.label"
              :rules="column.rules"
              type="number"
              dense
              hide-details="auto"
              class="my-1"
            ></v-text-field>

            <!-- 下拉选择 -->
            <v-select
              v-else-if="column.type === 'select'"
              v-model="item[column.key]"
              :items="column.options"
              :label="column.label"
              :rules="column.rules"
              dense
              hide-details="auto"
              class="my-1"
            ></v-select>

            <!-- 日期选择 -->
            <v-menu
              v-else-if="column.type === 'date'"
              v-model="dateMenus[item._uuid + column.key]"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="item[column.key]"
                  :label="column.label"
                  prepend-icon="mdi-calendar"
                  readonly
                  dense
                  hide-details="auto"
                  v-bind="attrs"
                  v-on="on"
                  class="my-1"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="item[column.key]"
                @input="dateMenus[item._uuid + column.key] = false"
              ></v-date-picker>
            </v-menu>

            <!-- 开关 -->
            <v-switch
              v-else-if="column.type === 'switch'"
              v-model="item[column.key]"
              :label="column.label"
              dense
              hide-details="auto"
              class="my-1"
            ></v-switch>

            <!-- 枚举选择 -->
            <v-select
              v-else-if="column.type === 'enum' && column.enum"
              v-model="item[column.key]"
              :items="getEnumOptions(column.enum)"
              :label="column.label"
              :rules="column.rules"
              dense
              hide-details="auto"
              class="my-1"
            ></v-select>
          </template>

          <!-- 显示模式 -->
          <template v-else>
            <!-- 自定义渲染 -->
            <slot
              v-if="$scopedSlots[`cell.${column.key}`]"
              :name="`cell.${column.key}`"
              :item="item"
              :value="item[column.key]"
            ></slot>

            <!-- 默认显示 -->
            <span v-else>
              <!-- 枚举类型 -->
              <v-chip
                v-if="column.type === 'enum' && column.enum"
                :color="column.enum[item[column.key]]?.color"
                small
              >
                {{ column.enum[item[column.key]]?.text || item[column.key] }}
              </v-chip>

              <!-- 开关显示 -->
              <jh-icon v-else-if="column.type === 'switch'" :color="item[column.key] ? 'success' : 'grey'" :icon="item[column.key] ? 'mdi:check-circle' : 'mdi:circle-outline'" size="20"></jh-icon>

              <!-- 普通文本 -->
              <span v-else>{{ item[column.key] }}</span>
            </span>
          </template>
        </div>
      </template>

      <!-- 操作列 -->
      <template v-slot:[`item.actions`]="{ item }">
        <div class="jh-editable-actions">
          <!-- 编辑状态按钮 -->
          <template v-if="isEditing(item)">
            <v-btn
              icon
              small
              color="success"
              @click="handleSave(item)"
              title="保存"
            >
              <jh-icon icon="mdi:check" size="16"></jh-icon>
            </v-btn>
            <v-btn
              icon
              small
              color="error"
              @click="handleCancel(item)"
              title="取消"
            >
              <jh-icon icon="mdi:close" size="16"></jh-icon>
            </v-btn>
          </template>

          <!-- 显示状态按钮 -->
          <template v-else>
            <v-btn
              v-if="editable"
              icon
              small
              color="primary"
              @click="handleEdit(item)"
              title="编辑"
            >
              <jh-icon icon="mdi:pencil" size="16"></jh-icon>
            </v-btn>
            <v-btn
              v-if="deletable"
              icon
              small
              color="error"
              @click="handleDelete(item)"
              title="删除"
            >
              <jh-icon icon="mdi:delete" size="16"></jh-icon>
            </v-btn>

            <!-- 自定义操作按钮 -->
            <slot name="actions" :item="item"></slot>
          </template>
        </div>
      </template>

      <!-- 底部插槽 - 新增按钮 -->
      <template v-slot:footer v-if="recordCreator">
        <div class="jh-editable-footer pa-3">
          <v-btn
              color="primary"
              small
              @click="handleAddRow"
              :disabled="hasEditingRow"
            >
              <jh-icon icon="mdi:plus" size="16" left></jh-icon>
              {{ recordCreatorProps.creatorButtonText || '添加一行数据' }}
            </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import JhIcon from '../JhIcon/JhIcon.vue'

export default {
  name: 'JhEditableTable',
  components: {
    JhIcon
  },

  props: {
    // 表格数据 (v-model)
    value: {
      type: Array,
      default: () => [],
    },

    // 列配置
    columns: {
      type: Array,
      required: true,
      // 列配置示例：
      // [{
      //   key: 'name',
      //   label: '姓名',
      //   type: 'text', // text | number | select | date | switch | enum
      //   editable: true,
      //   rules: [(v) => !!v || '必填'],
      //   options: [], // select 类型的选项
      //   enum: {}, // enum 类型的映射
      //   placeholder: '',
      // }]
    },

    // 是否可编辑
    editable: {
      type: Boolean,
      default: true,
    },

    // 是否可删除
    deletable: {
      type: Boolean,
      default: true,
    },

    // 是否显示新增按钮
    recordCreator: {
      type: Boolean,
      default: true,
    },

    // 新增按钮配置
    recordCreatorProps: {
      type: Object,
      default: () => ({
        creatorButtonText: '添加一行数据',
        record: {},
      }),
    },

    // 每页显示数量
    itemsPerPage: {
      type: Number,
      default: -1, // -1 表示显示全部
    },

    // 是否隐藏底部分页
    hideFooter: {
      type: Boolean,
      default: true,
    },

    // 是否紧凑模式
    dense: {
      type: Boolean,
      default: false,
    },

    // 是否可排序
    sortable: {
      type: Boolean,
      default: false,
    },

    // 行唯一标识字段
    rowKey: {
      type: String,
      default: 'id',
    },

    // 可编辑类型 (EditableProTable 风格)
    editableType: {
      type: String,
      default: 'multiple', // single | multiple
      validator: (v) => ['single', 'multiple'].includes(v),
    },

    // 最大行数
    maxRows: {
      type: Number,
      default: Infinity,
    },

    // 值变化回调
    onValuesChange: {
      type: Function,
      default: null,
    },

    // 添加行前守卫
    beforeAddRow: {
      type: Function,
      default: null,
    },

    // 删除行前守卫
    beforeRemoveRow: {
      type: Function,
      default: null,
    },

    // 自定义操作渲染
    actionRender: {
      type: Function,
      default: null,
    },

    // 受控模式的编辑行keys
    editableKeys: {
      type: Array,
      default: null,
    },

    // 保存数据时的回调
    onSave: {
      type: Function,
      default: null,
    },

    // 删除数据时的回调
    onDelete: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      internalData: [],
      editingKeys: new Set(), // 正在编辑的行的 key 集合
      originalData: new Map(), // 保存原始数据用于取消操作
      dateMenus: {}, // 日期选择器菜单状态
    };
  },

  computed: {
    // 可编辑的列
    editableColumns() {
      return this.columns.filter(col => col.editable !== false);
    },

    // 表头配置
    tableHeaders() {
      const headers = this.columns.map(col => ({
        text: col.label || col.key,
        value: col.key,
        sortable: col.sortable !== false && this.sortable,
        width: col.width,
        align: col.align || 'start',
      }));

      // 添加操作列
      if (this.editable || this.deletable || this.$scopedSlots.actions) {
        headers.push({
          text: '操作',
          value: 'actions',
          sortable: false,
          width: 120,
          align: 'center',
        });
      }

      return headers;
    },

    // 是否有正在编辑的行
    hasEditingRow() {
      return this.editingKeys.size > 0;
    },
  },

  watch: {
    value: {
      handler(newVal) {
        this.initInternalData(newVal);
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    // 初始化内部数据
    initInternalData(data) {
      this.internalData = data.map(item => {
        // 为每行添加唯一标识
        if (!item._uuid) {
          item._uuid = this.generateUUID();
        }
        return { ...item };
      });
    },

    // 生成 UUID
    generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    // 获取行的唯一标识
    getRowKey(item) {
      return item._uuid || item[this.rowKey];
    },

    // 判断行是否在编辑状态
    isEditing(item) {
      return this.editingKeys.has(this.getRowKey(item));
    },

    // 将 enum 对象转换为 v-select 选项
    getEnumOptions(enumObj) {
      return Object.keys(enumObj).map(key => ({
        text: enumObj[key].text || key,
        value: key,
      }));
    },

    // 开始编辑行
    async handleEdit(item) {
      const key = this.getRowKey(item);

      // single 模式下，关闭其他编辑行
      if (this.editableType === 'single' && this.editingKeys.size > 0) {
        const currentKey = Array.from(this.editingKeys)[0];
        const currentItem = this.internalData.find(row => this.getRowKey(row) === currentKey);
        if (currentItem) {
          await this.handleCancel(currentItem);
        }
      }

      // 保存原始数据
      this.originalData.set(key, { ...item });

      // 添加到编辑集合
      this.editingKeys.add(key);

      this.$emit('edit', item);
      this.$emit('update:editableKeys', Array.from(this.editingKeys));
    },

    // 保存行
    async handleSave(item) {
      const key = this.getRowKey(item);

      // 验证数据
      if (!this.validateRow(item)) {
        return;
      }

      // 执行保存回调
      if (this.onSave) {
        const result = await this.onSave(key, item, this.originalData.get(key));
        if (result === false) return;
      }

      // 从编辑集合中移除
      this.editingKeys.delete(key);
      this.originalData.delete(key);

      // 更新父组件数据
      this.syncToParent();

      this.$emit('save', item);
      this.$emit('change', this.internalData);
      this.$emit('update:editableKeys', Array.from(this.editingKeys));
      
      // 触发值变化回调
      if (this.onValuesChange) {
        this.onValuesChange(item, this.internalData);
      }
    },

    // 取消编辑
    handleCancel(item) {
      const key = this.getRowKey(item);

      // 如果是新增的行，直接删除
      if (item._isNew) {
        const index = this.internalData.findIndex(row => this.getRowKey(row) === key);
        if (index > -1) {
          this.internalData.splice(index, 1);
        }
      } else {
        // 恢复原始数据
        const originalItem = this.originalData.get(key);
        if (originalItem) {
          const index = this.internalData.findIndex(row => this.getRowKey(row) === key);
          if (index > -1) {
            this.internalData.splice(index, 1, { ...originalItem });
          }
        }
      }

      // 从编辑集合中移除
      this.editingKeys.delete(key);
      this.originalData.delete(key);

      // 更新父组件数据
      this.syncToParent();

      this.$emit('cancel', item);
    },

    // 删除行
    async handleDelete(item) {
      const key = this.getRowKey(item);
      const index = this.internalData.findIndex(row => this.getRowKey(row) === key);

      // 执行删除前守卫
      if (this.beforeRemoveRow) {
        const canDelete = await this.beforeRemoveRow(item, index);
        if (canDelete === false) return;
      }

      // 执行删除回调
      if (this.onDelete) {
        const result = await this.onDelete(key, item);
        if (result === false) return;
      }

      if (index > -1) {
        this.internalData.splice(index, 1);

        // 更新父组件数据
        this.syncToParent();

        this.$emit('delete', item, index);
        this.$emit('change', this.internalData);
      }
    },

    // 添加新行
    async handleAddRow() {
      // 检查最大行数限制
      if (this.internalData.length >= this.maxRows) {
        this.$emit('max-rows', this.maxRows);
        return;
      }

      // 执行添加前守卫
      if (this.beforeAddRow) {
        const canAdd = await this.beforeAddRow();
        if (canAdd === false) return;
      }

      const newRow = {
        _uuid: this.generateUUID(),
        _isNew: true,
        ...this.recordCreatorProps.record,
      };

      // 初始化列的默认值
      this.columns.forEach(col => {
        if (col.key && newRow[col.key] === undefined) {
          if (col.type === 'switch') {
            newRow[col.key] = false;
          } else if (col.type === 'number') {
            newRow[col.key] = 0;
          } else {
            newRow[col.key] = '';
          }
        }
      });

      this.internalData.push(newRow);

      // 立即进入编辑状态
      this.$nextTick(() => {
        this.handleEdit(newRow);
      });

      this.$emit('add', newRow);
    },

    // 验证行数据
    validateRow(item) {
      // 简单验证：检查必填字段
      for (const col of this.columns) {
        if (col.rules && col.editable !== false) {
          for (const rule of col.rules) {
            const result = rule(item[col.key]);
            if (typeof result === 'string') {
              // 验证失败
              this.$emit('validation-error', { item, column: col, message: result });
              return false;
            }
          }
        }
      }
      return true;
    },

    // 同步到父组件
    syncToParent() {
      // 移除内部标识字段
      const cleanData = this.internalData.map(item => {
        const { _uuid, _isNew, ...rest } = item;
        return rest;
      });

      this.$emit('input', cleanData);
    },

    // 公共方法：获取当前数据
    getData() {
      return this.internalData.map(item => {
        const { _uuid, _isNew, ...rest } = item;
        return rest;
      });
    },

    // 公共方法：设置数据
    setData(data) {
      this.initInternalData(data);
      this.syncToParent();
    },

    // 公共方法：清空数据
    clearData() {
      this.internalData = [];
      this.editingKeys.clear();
      this.originalData.clear();
      this.syncToParent();
    },
  },
};
</script>

<style scoped>
.jh-editable-table {
  width: 100%;
}

.jh-editable-cell {
  min-height: 48px;
  display: flex;
  align-items: center;
}

.jh-editable-actions {
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
}

.jh-editable-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

/* 编辑模式下的输入框样式优化 */
.jh-editable-table >>> .v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0;
}

.jh-editable-table >>> .v-input--dense > .v-input__control > .v-input__slot {
  margin-bottom: 0;
}
</style>
