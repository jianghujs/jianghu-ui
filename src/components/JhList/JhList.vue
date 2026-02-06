<template>
  <div :class="['jh-pro-list', { 'jh-pro-list-card': cardBordered, 'jh-pro-list-ghost': ghost }]">
    <!-- 标题区 -->
    <div v-if="headerTitle || $slots['header-title'] || $slots['toolbar-actions'] || $slots['toolbar-extra']" class="jh-pro-list-header">
      <div class="jh-pro-list-header-left">
        <div v-if="headerTitle || $slots['header-title']" class="jh-pro-list-title">
          <slot name="header-title">
            <span class="jh-pro-list-title-text">{{ headerTitle }}</span>
            <v-tooltip v-if="tooltip" bottom>
            <template v-slot:activator="{ on, attrs }">
              <jh-icon icon="mdi:help-circle-outline" width="16" height="16" class="ml-1" v-bind="attrs" v-on="on"></jh-icon>
            </template>
            <span>{{ tooltip }}</span>
          </v-tooltip>
          </slot>
        </div>
        <div v-if="$slots['toolbar-actions']" class="jh-pro-list-header-actions">
          <slot name="toolbar-actions"></slot>
        </div>
      </div>
      <div class="jh-pro-list-header-right">
        <slot name="toolbar-extra"></slot>
      </div>
    </div>

    <!-- 工具栏 -->
    <v-row v-if="toolbar !== false" class="jh-pro-list-toolbar ma-0 pb-3 pa-3 pa-md-0" align="center">
      <v-spacer></v-spacer>
      <div class="flex items-center gap-2 justify-end flex-wrap">
        <v-text-field
          v-if="toolbarConfig.search"
          v-model="searchInputInternal"
          :prefix="isMobile ? '' : '筛选'"
          :placeholder="isMobile ? '筛选' : ''"
          class="jh-v-input jh-toolbar-search border"
          dense
          filled
          single-line
          hide-details
          clearable
        ></v-text-field>

        <v-btn v-if="toolbarConfig.refresh" icon small @click="handleRefresh" title="刷新">
          <jh-icon icon="mdi:refresh" width="16" height="16"></jh-icon>
        </v-btn>

        <v-menu v-if="toolbarConfig.layout" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-bind="attrs" v-on="on" title="布局">
              <jh-icon :icon="`mdi:${layoutIcon}`" width="16" height="16"></jh-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="currentLayout = 'list'">
              <v-list-item-icon><jh-icon icon="mdi:view-list" width="16" height="16"></jh-icon></v-list-item-icon>
              <v-list-item-title>列表</v-list-item-title>
            </v-list-item>
            <v-list-item @click="currentLayout = 'grid'">
              <v-list-item-icon><jh-icon icon="mdi:view-grid" width="16" height="16"></jh-icon></v-list-item-icon>
              <v-list-item-title>网格</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu v-if="toolbarConfig.size" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-bind="attrs" v-on="on" title="尺寸">
              <jh-icon icon="mdi:format-line-spacing" width="16" height="16"></jh-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="currentSize = 'large'">
              <v-list-item-title>
                <jh-icon v-if="currentSize === 'large'" icon="mdi:check" width="16" height="16" class="mr-2"></jh-icon>大
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="currentSize = 'default'">
              <v-list-item-title>
                <jh-icon v-if="currentSize === 'default'" icon="mdi:check" width="16" height="16" class="mr-2"></jh-icon>默认
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="currentSize = 'small'">
              <v-list-item-title>
                <jh-icon v-if="currentSize === 'small'" icon="mdi:check" width="16" height="16" class="mr-2"></jh-icon>小
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-row>

    <!-- 批量操作提示栏 -->
    <div v-if="rowSelection && selectedItems.length > 0" class="jh-pro-list-alert">
      <div class="jh-pro-list-alert-info">
        <slot name="alert" :selected-row-keys="selectedRowKeys" :selected-rows="selectedItems">
          <jh-icon icon="mdi:checkbox-marked-circle" width="16" height="16" class="mr-2" color="primary"></jh-icon>
          <span>已选择 <strong class="primary--text">{{ selectedItems.length }}</strong> 项</span>
          <v-btn text x-small class="ml-2" @click="clearSelection">清空</v-btn>
        </slot>
      </div>
      <div class="jh-pro-list-alert-actions">
        <slot name="alert-actions" :selected-row-keys="selectedRowKeys" :selected-rows="selectedItems"></slot>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="currentLoading && currentItems.length === 0" class="jh-pro-list-loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <div class="mt-2">数据加载中...</div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="currentItems.length === 0" class="jh-pro-list-empty">
      <jh-icon icon="mdi:inbox-outline" width="48" height="48" color="grey lighten-1"></jh-icon>
      <div class="mt-2 text-body-2 grey--text">暂无数据</div>
    </div>

    <!-- 列表内容 -->
    <div v-else>
      <!-- 网格布局 -->
      <v-row v-if="currentLayout === 'grid' && grid" class="jh-pro-list-grid ma-0">
        <v-col
          v-for="(item, index) in currentItems"
          :key="getRowKey(item, index)"
          :cols="grid.column || 12"
          :sm="grid.sm"
          :md="grid.md"
          :lg="grid.lg"
          :xl="grid.xl"
          class="pa-2"
        >
          <div :class="itemClasses(item)" @click="handleItemClick(item, index)">
            <div v-if="rowSelection" class="jh-pro-list-item-checkbox" @click.stop="toggleSelection(item)">
              <v-checkbox :input-value="isItemSelected(item)" hide-details dense :color="checkboxColor"></v-checkbox>
            </div>
            <slot name="renderItem" :item="item" :index="index">
              <div class="jh-pro-list-item-content">
                <div v-if="getMeta('avatar', item)" class="jh-pro-list-item-avatar">
                  <v-avatar :size="avatarSize">
                    <img v-if="typeof getMeta('avatar', item) === 'string'" :src="getMeta('avatar', item)" :alt="getMeta('title', item)" />
                    <span v-else>{{ getMeta('avatar', item) }}</span>
                  </v-avatar>
                </div>
                <div class="jh-pro-list-item-main">
                  <div v-if="getMeta('title', item)" class="jh-pro-list-item-title">
                    <slot name="title" :item="item">{{ getMeta('title', item) }}</slot>
                  </div>
                  <div v-if="getMeta('subTitle', item)" class="jh-pro-list-item-subtitle">
                    <slot name="subTitle" :item="item">{{ getMeta('subTitle', item) }}</slot>
                  </div>
                  <div v-if="getMeta('description', item)" class="jh-pro-list-item-description">
                    <slot name="description" :item="item">{{ getMeta('description', item) }}</slot>
                  </div>
                  <div v-if="getMeta('content', item)" class="jh-pro-list-item-content-area">
                    <slot name="content" :item="item">{{ getMeta('content', item) }}</slot>
                  </div>
                </div>
                <div v-if="getMeta('extra', item)" class="jh-pro-list-item-extra">
                  <slot name="extra" :item="item">{{ getMeta('extra', item) }}</slot>
                </div>
              </div>
              <div v-if="getMeta('actions', item)" class="jh-pro-list-item-actions">
                <slot name="actions" :item="item">
                  <v-btn
                    v-for="(action, idx) in getMeta('actions', item)"
                    :key="idx"
                    text
                    x-small
                    :color="action.color || 'primary'"
                    @click.stop="handleActionClick(action, item)"
                  >
                    <jh-icon v-if="action.icon" :icon="`mdi:${action.icon}`" width="14" height="14" left></jh-icon>
                    {{ action.text }}
                  </v-btn>
                </slot>
              </div>
            </slot>
          </div>
        </v-col>
      </v-row>

      <!-- 列表布局 -->
      <div v-else class="jh-pro-list-items">
        <div
          v-for="(item, index) in currentItems"
          :key="getRowKey(item, index)"
          :class="itemClasses(item)"
          @click="handleItemClick(item, index)"
        >
          <div v-if="rowSelection" class="jh-pro-list-item-checkbox" @click.stop="toggleSelection(item)">
            <v-checkbox :input-value="isItemSelected(item)" hide-details dense :color="checkboxColor"></v-checkbox>
          </div>
          <slot name="renderItem" :item="item" :index="index">
            <div class="jh-pro-list-item-content">
              <div v-if="getMeta('avatar', item)" class="jh-pro-list-item-avatar">
                <v-avatar :size="avatarSize">
                  <img v-if="typeof getMeta('avatar', item) === 'string'" :src="getMeta('avatar', item)" :alt="getMeta('title', item)" />
                  <span v-else>{{ getMeta('avatar', item) }}</span>
                </v-avatar>
              </div>
              <div class="jh-pro-list-item-main">
                <div v-if="getMeta('title', item)" class="jh-pro-list-item-title">
                  <slot name="title" :item="item">{{ getMeta('title', item) }}</slot>
                </div>
                <div v-if="getMeta('subTitle', item)" class="jh-pro-list-item-subtitle">
                  <slot name="subTitle" :item="item">{{ getMeta('subTitle', item) }}</slot>
                </div>
                <div v-if="getMeta('description', item)" class="jh-pro-list-item-description">
                  <slot name="description" :item="item">{{ getMeta('description', item) }}</slot>
                </div>
                <div v-if="getMeta('content', item)" class="jh-pro-list-item-content-area">
                  <slot name="content" :item="item">{{ getMeta('content', item) }}</slot>
                </div>
              </div>
              <div v-if="getMeta('extra', item)" class="jh-pro-list-item-extra">
                <slot name="extra" :item="item">{{ getMeta('extra', item) }}</slot>
              </div>
            </div>
            <div v-if="getMeta('actions', item)" class="jh-pro-list-item-actions">
              <slot name="actions" :item="item">
                <v-btn
                  v-for="(action, idx) in getMeta('actions', item)"
                  :key="idx"
                  text
                  x-small
                  :color="action.color || 'primary'"
                  @click.stop="handleActionClick(action, item)"
                >
                  <jh-icon v-if="action.icon" :icon="`mdi:${action.icon}`" width="14" height="14" left></jh-icon>
                  {{ action.text }}
                </v-btn>
              </slot>
            </div>
          </slot>
          <div v-if="expandable && expandedKeys.includes(getRowKey(item, index))" class="jh-pro-list-item-expand">
            <slot name="expandedRowRender" :item="item" :index="index"></slot>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="pagination !== false && currentItems.length > 0" class="jh-pro-list-pagination">
      <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7" @input="handlePageChange"></v-pagination>
      <div class="jh-pro-list-pagination-info">
        <span>共 {{ totalCount }} 条</span>
        <v-select
          v-model="currentPageSize"
          :items="pageSizeOptions"
          dense
          outlined
          hide-details
          class="ml-2"
          style="max-width: 100px;"
          @change="handlePageSizeChange"
        >
          <template v-slot:selection="{ item }">{{ item }} 条/页</template>
          <template v-slot:item="{ item }">{{ item }} 条/页</template>
        </v-select>
      </div>
    </div>
  </div>
</template>

<script>
import JhIcon from '../JhIcon/JhIcon.vue'

export default {
  name: 'JhList',
  components: {
    JhIcon
  },
  props: {
    // 静态数据源（非 request 模式）
    dataSource: {
      type: Array,
      default: () => []
    },
    // 远程请求函数（返回 Promise）
    request: {
      type: Function,
      default: null
    },
    // 行唯一键，可为字段名或函数
    rowKey: {
      type: [String, Function],
      default: 'id'
    },
    // 字段映射配置（标题、描述等）
    metas: {
      type: Object,
      default: () => ({})
    },
    // 展示布局 list | grid | card
    layout: {
      type: String,
      default: 'list',
      validator: (v) => ['list', 'grid', 'card'].includes(v)
    },
    // Grid 布局参数（cols、gutter 等）
    grid: {
      type: Object,
      default: null
    },
    // 尺寸 small | default | large
    size: {
      type: String,
      default: 'default',
      validator: (v) => ['small', 'default', 'large'].includes(v)
    },
    // 是否展示分割线
    split: {
      type: Boolean,
      default: true
    },
    // 分页配置（false 关闭分页）
    pagination: {
      type: [Object, Boolean],
      default: () => ({ current: 1, pageSize: 10, total: 0 })
    },
    // 行选择配置
    rowSelection: {
      type: [Object, Boolean],
      default: null
    },
    // 复选框颜色
    checkboxColor: {
      type: String,
      default: 'primary'
    },
    // 行展开配置
    expandable: {
      type: [Object, Boolean],
      default: null
    },
    // 标题文本
    headerTitle: {
      type: String,
      default: ''
    },
    // 标题提示
    tooltip: {
      type: String,
      default: ''
    },
    // 是否展示卡片边框
    cardBordered: {
      type: Boolean,
      default: true
    },
    // 幽灵模式（无背景）
    ghost: {
      type: Boolean,
      default: false
    },
    // 工具栏配置或开关
    toolbar: {
      type: [Object, Boolean],
      default: () => ({ search: true, refresh: true, layout: true, size: true })
    },
    // 顶部搜索配置（false 关闭）
    search: {
      type: [Object, Boolean],
      default: false
    },
    // 全局加载态
    loading: {
      type: Boolean,
      default: false
    },
    // 轮询刷新间隔（ms，0 关闭）
    polling: {
      type: Number,
      default: 0
    },
    // 搜索输入防抖时间
    debounceTime: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      isMobile: window.innerWidth < 600,
      searchInputInternal: '',
      currentLoading: this.loading,
      currentItems: [],
      currentPage: this.pagination ? this.pagination.current || 1 : 1,
      currentPageSize: this.pagination ? this.pagination.pageSize || 10 : 10,
      totalCount: 0,
      currentLayout: this.layout,
      currentSize: this.size,
      selectedItems: [],
      expandedKeys: [],
      pollingTimer: null,
      searchDebounceTimer: null
    };
  },
  computed: {
    toolbarConfig() {
      if (this.toolbar === false) return {};
      return typeof this.toolbar === 'object' ? { search: true, refresh: true, layout: true, size: true, ...this.toolbar } : { search: true, refresh: true, layout: true, size: true };
    },
    layoutIcon() {
      return { list: 'mdi-view-list', grid: 'mdi-view-grid', card: 'mdi-view-module' }[this.currentLayout] || 'mdi-view-list';
    },
    avatarSize() {
      return { small: 32, default: 40, large: 48 }[this.currentSize];
    },
    selectedRowKeys() {
      return this.selectedItems.map(item => this.getRowKey(item));
    },
    totalPages() {
      return Math.ceil(this.totalCount / this.currentPageSize);
    },
    pageSizeOptions() {
      return [10, 20, 50, 100];
    }
  },
  watch: {
    dataSource: { immediate: true, handler(val) { if (!this.request) { this.currentItems = val || []; this.totalCount = this.currentItems.length; } } },
    loading(val) { this.currentLoading = val; },
    searchInputInternal(val) {
      if (this.request) {
        if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
        this.searchDebounceTimer = setTimeout(() => this.reload(), this.debounceTime);
      } else this.filterItems();
    },
    layout(val) { this.currentLayout = val; },
    size(val) { this.currentSize = val; }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    if (this.request) this.reload();
    this.startPolling();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    this.stopPolling();
    if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
  },
  methods: {
    getRowKey(item, index) {
      return typeof this.rowKey === 'function' ? this.rowKey(item, index) : item[this.rowKey] || index;
    },
    getMeta(metaKey, item) {
      const meta = this.metas[metaKey];
      if (!meta) return null;
      if (typeof meta === 'string') return item[meta];
      if (typeof meta === 'function') return meta(item);
      if (meta.dataIndex) return item[meta.dataIndex];
      if (meta.render) return meta.render(item);
      return null;
    },
    itemClasses(item) {
      return ['jh-pro-list-item', `jh-pro-list-item--${this.currentSize}`, { 'jh-pro-list-item--selected': this.isItemSelected(item) }];
    },
    isItemSelected(item) {
      const key = this.getRowKey(item);
      return this.selectedItems.some(selectedItem => this.getRowKey(selectedItem) === key);
    },
    toggleSelection(item) {
      const key = this.getRowKey(item);
      const index = this.selectedItems.findIndex(selectedItem => this.getRowKey(selectedItem) === key);
      if (index > -1) this.selectedItems.splice(index, 1);
      else this.selectedItems.push(item);
      if (this.rowSelection && this.rowSelection.onChange) this.rowSelection.onChange(this.selectedRowKeys, this.selectedItems);
      this.$emit('selection-change', { selectedRowKeys: this.selectedRowKeys, selectedRows: this.selectedItems });
    },
    clearSelection() {
      this.selectedItems = [];
      if (this.rowSelection && this.rowSelection.onChange) this.rowSelection.onChange([], []);
      this.$emit('selection-change', { selectedRowKeys: [], selectedRows: [] });
    },
    handleItemClick(item, index) { this.$emit('item-click', item, index); },
    handleActionClick(action, item) {
      if (action.onClick) action.onClick(item);
      this.$emit('action-click', action, item);
    },
    async handleRefresh() {
      this.$emit('refresh');
      if (this.request) await this.reload();
    },
    handlePageChange(page) {
      this.currentPage = page;
      if (this.request) this.reload();
      else this.filterItems();
      this.$emit('page-change', page);
    },
    handlePageSizeChange(pageSize) {
      this.currentPageSize = pageSize;
      this.currentPage = 1;
      if (this.request) this.reload();
      else this.filterItems();
      this.$emit('page-size-change', pageSize);
    },
    filterItems() {
      let items = [...this.dataSource];
      if (this.searchInputInternal) {
        const searchLower = this.searchInputInternal.toLowerCase();
        items = items.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(searchLower)));
      }
      this.totalCount = items.length;
      if (this.pagination !== false) {
        const start = (this.currentPage - 1) * this.currentPageSize;
        this.currentItems = items.slice(start, start + this.currentPageSize);
      } else this.currentItems = items;
    },
    async reload() {
      if (!this.request) { this.filterItems(); return; }
      this.currentLoading = true;
      try {
        const response = await this.request({ current: this.currentPage, pageSize: this.currentPageSize, search: this.searchInputInternal });
        if (response && response.success !== false) {
          this.currentItems = response.data || response.list || [];
          this.totalCount = response.total || response.totalCount || this.currentItems.length;
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        this.$emit('request-error', error);
      } finally {
        this.currentLoading = false;
      }
    },
    handleResize() { this.isMobile = window.innerWidth < 600; },
    startPolling() {
      if (this.polling > 0 && this.request) this.pollingTimer = setInterval(() => this.reload(), this.polling);
    },
    stopPolling() {
      if (this.pollingTimer) { clearInterval(this.pollingTimer); this.pollingTimer = null; }
    }
  }
};
</script>

<style scoped>
.jh-pro-list { border-radius: 8px; position: relative; }
.jh-pro-list-card { background: #ffffff; border: 1px solid #f0f0f0; padding: 16px; }
.jh-pro-list-ghost { background: transparent; border: none; }
.jh-pro-list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding: 16px 0; }
.jh-pro-list-header-left { display: flex; align-items: center; gap: 16px; }
.jh-pro-list-header-right { display: flex; align-items: center; gap: 8px; }
.jh-pro-list-title { display: flex; align-items: center; }
.jh-pro-list-title-text { font-size: 18px; font-weight: 500; color: rgba(0, 0, 0, 0.85); }
.jh-pro-list-toolbar { padding: 8px 0; }
.jh-pro-list-alert { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #e6f7ff; border: 1px solid #91d5ff; border-radius: 4px; margin-bottom: 16px; }
.jh-pro-list-alert-info { display: flex; align-items: center; }
.jh-pro-list-alert-actions { display: flex; gap: 8px; }
.jh-pro-list-loading, .jh-pro-list-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; color: rgba(0, 0, 0, 0.45); }
.jh-pro-list-items { display: flex; flex-direction: column; }
.jh-pro-list-item { position: relative; display: flex; padding: 16px; border-bottom: 1px solid #f0f0f0; transition: all 0.3s; cursor: pointer; background: #ffffff; }
.jh-pro-list-item:hover { background: #fafafa; }
.jh-pro-list-item--selected { background: #e6f7ff; }
.jh-pro-list-item--small { padding: 12px; }
.jh-pro-list-item--large { padding: 20px; }
.jh-pro-list-item-checkbox { margin-right: 12px; display: flex; align-items: flex-start; padding-top: 4px; }
.jh-pro-list-item-content { flex: 1; display: flex; gap: 16px; }
.jh-pro-list-item-avatar { flex-shrink: 0; }
.jh-pro-list-item-main { flex: 1; min-width: 0; }
.jh-pro-list-item-title { font-size: 16px; font-weight: 500; color: rgba(0, 0, 0, 0.85); margin-bottom: 4px; }
.jh-pro-list-item-subtitle { font-size: 14px; color: rgba(0, 0, 0, 0.65); margin-bottom: 4px; }
.jh-pro-list-item-description { font-size: 14px; color: rgba(0, 0, 0, 0.45); line-height: 1.5; }
.jh-pro-list-item-content-area { margin-top: 8px; }
.jh-pro-list-item-extra { flex-shrink: 0; margin-left: 16px; }
.jh-pro-list-item-actions { display: flex; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #f0f0f0; }
.jh-pro-list-item-expand { margin-top: 12px; padding-top: 12px; border-top: 1px solid #f0f0f0; }
.jh-pro-list-grid .jh-pro-list-item { border: 1px solid #f0f0f0; border-radius: 4px; flex-direction: column; height: 100%; }
.jh-pro-list-pagination { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f0f0f0; }
.jh-pro-list-pagination-info { display: flex; align-items: center; gap: 8px; }
@media (max-width: 768px) {
  .jh-pro-list-header { flex-direction: column; align-items: flex-start; gap: 12px; }
  .jh-pro-list-item-content { flex-direction: column; }
  .jh-pro-list-item-extra { margin-left: 0; margin-top: 12px; }
  .jh-pro-list-pagination { flex-direction: column; gap: 12px; }
}
</style>
