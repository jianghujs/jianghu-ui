<template>
  <div :class="wrapperClass" :style="wrapperStyle">
    <!-- 表格标题区 -->
    <div v-if="headerTitle || $slots['header-title'] || $slots['toolbar-actions'] || $slots['toolbar-extra']" class="jh-pro-table-header">
      <div class="jh-pro-table-header-left">
        <!-- 标题 -->
        <div v-if="headerTitle || $slots['header-title']" class="jh-pro-table-title">
          <slot name="header-title">
            <span class="jh-pro-table-title-text">{{ headerTitle }}</span>
            <v-tooltip v-if="tooltip" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small class="ml-1" v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
              </template>
              <span>{{ tooltip }}</span>
            </v-tooltip>
          </slot>
        </div>
      </div>
      <div class="jh-pro-table-header-right">
        <!-- 右侧额外内容 -->
        <slot name="toolbar-extra"></slot>
      </div>
    </div>

    <!-- 高级筛选栏 -->
    <jh-query-filter
      v-if="showFilter && filterFields && filterFields.length > 0"
      ref="queryFilterRef"
      :fields="filterFields"
      :initial-values="filterInitialValues"
      :collapsible="filterCollapsible"
      :default-collapsed="filterDefaultCollapsed"
      :default-visible-count="filterDefaultVisibleCount"
      :col-span="filterColSpan"
      :dense="true"
      :outlined="true"
      :show-labels="false"
      :search-text="filterSearchText"
      :reset-text="filterResetText"
      class="pa-0"
      @search="handleFilterSearch"
      @reset="handleFilterReset"
    >
      <!-- 自定义字段插槽透传 -->
      <template v-for="field in filterFields" v-slot:[`field-${field.key}`]="slotProps">
        <slot :name="`filter-field-${field.key}`" v-bind="slotProps"></slot>
      </template>

      <!-- 自定义按钮插槽透传 -->
      <template v-slot:buttons="slotProps">
        <slot name="filter-buttons" v-bind="slotProps"></slot>
      </template>
    </jh-query-filter>

    <!-- 批量操作提示栏 -->
    <div v-if="showSelectionAlertBar" class="jh-pro-table-alert">
      <div v-if="hasAlertContent" class="jh-pro-table-alert-info">
        <template v-if="$scopedSlots.alert">
          <slot name="alert" :selected-row-keys="selectedRowKeys" :selected-rows="selectedItems"></slot>
        </template>
        <render-function
          v-else-if="typeof tableAlertRender === 'function'"
          :render="tableAlertRender"
          :params="tableAlertScope"
        />
        <template v-else>
          <v-icon small class="mr-2" color="primary">mdi-checkbox-marked-circle</v-icon>
          <span>已选择 <strong class="primary--text">{{ selectedItems.length }}</strong> 项</span>
          <v-btn text x-small class="ml-2" @click="clearSelection">清空</v-btn>
        </template>
      </div>
      <div v-if="hasAlertActionsContent" class="jh-pro-table-alert-actions">
        <template v-if="$scopedSlots['alert-actions']">
          <slot name="alert-actions" :selected-row-keys="selectedRowKeys" :selected-rows="selectedItems"></slot>
        </template>
        <render-function
          v-else
          :render="tableAlertOptionRender"
          :params="tableAlertScope"
        />
      </div>
    </div>

    <!-- 工具栏 -->
    <v-row v-if="toolbar !== false" class="jh-pro-table-toolbar ma-0 pb-3 pa-3 pa-md-0" align="center">
      <!-- 左侧操作按钮插槽（仅在没有标题区时显示） -->
      <div v-if="!headerTitle && !$slots['header-title']" class="flex items-center gap-2">
        <slot name="toolbar-actions">
          <v-btn
            v-if="showCreateButton"
            color="success"
            class="mr-2"
            @click.stop="$emit('create-click')"
            small
          >
            <v-icon left small>mdi-plus</v-icon>
            <span class="d-none d-sm-inline">新增</span>
          </v-btn>
        </slot>
      </div>

      <v-spacer></v-spacer>

      <!-- 右侧工具栏 -->
      <div class="flex items-center gap-2 justify-end flex-wrap">
        <!-- 筛选搜索框 -->
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

        <!-- 刷新按钮 -->
        <v-btn
          v-if="toolbarConfig.refresh"
          icon
          small
          @click="handleRefresh"
          title="刷新"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <!-- 密度切换 -->
        <v-menu v-if="toolbarConfig.density" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              small
              v-bind="attrs"
              v-on="on"
              title="密度"
            >
              <v-icon>mdi-format-line-spacing</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="currentDensity = 'default'">
              <v-list-item-title>
                <v-icon v-if="currentDensity === 'default'" small left>mdi-check</v-icon>
                默认
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="currentDensity = 'medium'">
              <v-list-item-title>
                <v-icon v-if="currentDensity === 'medium'" small left>mdi-check</v-icon>
                中等
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="currentDensity = 'compact'">
              <v-list-item-title>
                <v-icon v-if="currentDensity === 'compact'" small left>mdi-check</v-icon>
                紧凑
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- 列设置 -->
        <v-menu v-if="toolbarConfig.setting" offset-y left max-height="400">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              small
              v-bind="attrs"
              v-on="on"
              title="列设置"
            >
              <v-icon>mdi-cog-outline</v-icon>
            </v-btn>
          </template>
          <v-card min-width="200">
            <v-card-text class="pa-2">
              <div class="text-caption font-weight-bold mb-2">列显示</div>
              <v-list dense>
                <v-list-item
                  v-for="col in internalColumns"
                  :key="col.value"
                  @click="toggleColumn(col)"
                  class="px-2"
                >
                  <v-list-item-action class="mr-2">
                    <v-checkbox
                      :input-value="col.visible !== false"
                      hide-details
                      dense
                      @click.stop="toggleColumn(col)"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="text-body-2">{{ col.text || col.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider class="my-2"></v-divider>
              <v-btn text small block @click="resetColumns">重置</v-btn>
            </v-card-text>
          </v-card>
        </v-menu>

        <!-- 全屏 -->
        <v-btn
          v-if="toolbarConfig.fullscreen"
          icon
          small
          @click="toggleFullscreen"
          :title="isFullscreen ? '退出全屏' : '全屏'"
        >
          <v-icon>{{ isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
        </v-btn>
      </div>
    </v-row>

    <!-- 表格额外内容区 -->
    <div v-if="$slots['table-extra']" class="jh-pro-table-extra">
      <slot name="table-extra"></slot>
    </div>

    <!-- 表格 -->
    <v-data-table
      ref="dataTable"
      v-bind="mergedDataTableProps"
      v-on="dataTableListeners"
      :headers="visibleHeaders"
      :items="currentItems"
      :search="searchInputInternal"
      :footer-props="currentFooterProps"
      :items-per-page="currentItemsPerPage"
      :page="currentPage"
      :server-items-length="serverItemsLength"
      :mobile-breakpoint="mobileBreakpoint"
      :loading="currentLoading"
      :checkbox-color="checkboxColor"
      :class="[tableClassComputed, densityClass]"
      :fixed-header="fixedHeader"
      :show-select="showSelectComputed"
      :single-select="singleSelectComputed"
      :value="selectedItems"
      :item-key="rowKey"
      :dense="dense"
      :multi-sort="multiSort"
      :must-sort="mustSort"
      :sort-by="internalSortBy"
      :sort-desc="internalSortDesc"
      class="jh-fixed-table-height elevation-0 mb-xs-4 mx-3 mx-md-0 mt-3"
      @click:row="handleRowClick"
      @input="handleSelectionChange"
      @update:page="handlePageChange"
      @update:items-per-page="handleItemsPerPageChange"
      @update:sort-by="handleSortByUpdate"
      @update:sort-desc="handleSortDescUpdate"
    >
      <!-- 自定义表头插槽 -->
      <template
        v-for="header in customHeaderSlots"
        v-slot:[`header.${header.value}`]="{ header: h }"
      >
        <slot :name="`header.${header.value}`" :header="h">{{ h.text || h.title }}</slot>
      </template>

      <!-- 自定义列插槽 -->
      <template
        v-for="header in visibleHeaders"
        v-slot:[`item.${header.value}`]="{ item, value }"
      >
        <!-- 操作列特殊处理 -->
        <template v-if="header.value === 'action'">
          <slot name="item.action" :item="item">
            <!-- PC端默认操作 -->
            <div v-if="!isMobile" class="flex items-center gap-1">
              <!-- 配置的操作按钮 -->
              <template v-if="actionColumn && actionColumn.buttons">
                <template v-for="(btn, idx) in getVisibleButtons(item)">
                  <v-tooltip v-if="btn.tooltip" bottom :key="idx">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        x-small
                        :text="btn.type === 'link'"
                        :icon="btn.type === 'icon'"
                        :color="btn.color || 'primary'"
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="handleActionClick(btn, item)"
                      >
                        <v-icon v-if="btn.icon" small>{{ btn.icon }}</v-icon>
                        <span v-if="btn.type !== 'icon'">{{ btn.text }}</span>
                      </v-btn>
                    </template>
                    <span>{{ btn.tooltip }}</span>
                  </v-tooltip>
                  <v-btn
                    v-else
                    :key="idx"
                    x-small
                    :text="btn.type === 'link'"
                    :icon="btn.type === 'icon'"
                    :color="btn.color || 'primary'"
                    @click.stop="handleActionClick(btn, item)"
                  >
                    <v-icon v-if="btn.icon" small>{{ btn.icon }}</v-icon>
                    <span v-if="btn.type !== 'icon'">{{ btn.text }}</span>
                  </v-btn>
                </template>
              </template>

              <!-- 默认操作按钮 -->
              <template v-else>
                <span
                  v-if="showUpdateAction"
                  role="button"
                  class="success--text font-weight-medium font-size-2 mr-2 cursor-pointer"
                  @click.stop="$emit('update-click', item)"
                >
                  <v-icon size="16" class="success--text">mdi-note-edit-outline</v-icon>详情
                </span>
                <span
                  v-if="showDeleteAction"
                  role="button"
                  class="error--text font-weight-medium font-size-2 mr-2 cursor-pointer"
                  @click.stop="$emit('delete-click', item)"
                >
                  <v-icon size="16" class="error--text">mdi-trash-can-outline</v-icon>删除
                </span>
              </template>
            </div>

            <!-- 手机端菜单 -->
            <v-menu v-if="isMobile" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <span
                  role="button"
                  class="success--text font-weight-medium font-size-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon size="20" class="success--text">mdi-chevron-down</v-icon>操作
                </span>
              </template>
              <v-list dense>
                <template v-if="actionColumn && actionColumn.buttons">
                  <v-list-item
                    v-for="(btn, idx) in getVisibleButtons(item)"
                    :key="idx"
                    @click.stop="handleActionClick(btn, item)"
                  >
                    <v-list-item-icon v-if="btn.icon">
                      <v-icon small>{{ btn.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ btn.text }}</v-list-item-title>
                  </v-list-item>
                </template>
                <template v-else>
                  <v-list-item v-if="showUpdateAction" @click.stop="$emit('update-click', item)">
                    <v-list-item-title>详情</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="showDeleteAction" @click.stop="$emit('delete-click', item)">
                    <v-list-item-title>删除</v-list-item-title>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu>
          </slot>
        </template>

        <!-- 普通列 -->
        <template v-else>
          <!-- 自定义插槽 -->
          <slot v-if="header.slot || $scopedSlots[`item.${header.value}`]" :name="`item.${header.value}`" :item="item" :value="value"></slot>

          <!-- 列配置渲染 -->
          <div v-else class="d-flex align-center">
            <!-- 省略号处理 -->
            <v-tooltip v-if="header.ellipsis && value && value.length > 20" bottom>
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                  class="text-truncate d-inline-block"
                  style="max-width: 200px;"
                >
                  {{ value }}
                </span>
              </template>
              <span>{{ value }}</span>
            </v-tooltip>

            <!-- 普通文本 -->
            <span v-else>{{ value }}</span>

            <!-- 复制按钮 -->
            <v-btn
              v-if="header.copyable && value"
              icon
              x-small
              class="ml-1"
              @click.stop="copyToClipboard(value)"
            >
              <v-icon x-small>mdi-content-copy</v-icon>
            </v-btn>
          </div>
        </template>
      </template>

      <!-- 加载中 -->
      <template v-slot:loading>
        <div class="jh-no-data pa-6">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <div class="mt-2">数据加载中...</div>
        </div>
      </template>

      <!-- 无数据 -->
      <template v-slot:no-data>
        <div class="jh-no-data pa-6">
          <v-icon large color="grey lighten-1">mdi-inbox-outline</v-icon>
          <div class="mt-2 text-body-2 grey--text">暂无数据</div>
        </div>
      </template>

      <!-- 无结果 -->
      <template v-slot:no-results>
        <div class="jh-no-data pa-6">
          <v-icon large color="grey lighten-1">mdi-magnify</v-icon>
          <div class="mt-2 text-body-2 grey--text">未找到匹配的数据</div>
        </div>
      </template>

      <!-- 分页文本 -->
      <template v-slot:footer.page-text="pagination">
        <span>{{ pagination.pageStart }}-{{ pagination.pageStop }}</span>
        <span class="ml-1">共{{ pagination.itemsLength }}条</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import JhQueryFilter from '../JhQueryFilter/JhQueryFilter.vue';

const RenderFunction = {
  name: 'JhTableRenderFunction',
  functional: true,
  props: {
    render: {
      type: Function,
      default: null
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  render(h, context) {
    const renderFn = context.props.render;
    if (typeof renderFn !== 'function') {
      return null;
    }
    const params = context.props.params || {};
    if (renderFn.length >= 2) {
      return renderFn(h, params);
    }
    return renderFn(params);
  }
};

export default {
  name: 'JhTable',
  inheritAttrs: false,
  components: {
    JhQueryFilter,
    RenderFunction
  },
  props: {
    // ========== 数据相关 ==========
    // 表格表头配置
    headers: {
      type: Array,
      required: true,
      default: () => []
    },
    // 表格数据（客户端分页）
    items: {
      type: Array,
      default: () => []
    },
    // 数据请求函数（服务端分页）
    request: {
      type: Function,
      default: null
    },

    // ========== 高级筛选栏配置 ==========
    // 是否显示筛选栏
    showFilter: {
      type: Boolean,
      default: false
    },
    // 筛选字段配置
    filterFields: {
      type: Array,
      default: () => []
    },
    // 筛选初始值
    filterInitialValues: {
      type: Object,
      default: () => ({})
    },
    // 筛选栏是否可折叠
    filterCollapsible: {
      type: Boolean,
      default: true
    },
    // 筛选栏默认是否折叠
    filterDefaultCollapsed: {
      type: Boolean,
      default: true
    },
    // 筛选栏默认显示字段数量
    filterDefaultVisibleCount: {
      type: Number,
      default: 3
    },
    // 筛选栏列宽配置
    filterColSpan: {
      type: Object,
      default: () => ({
        xs: 24,
        sm: 12,
        md: 6,
        lg: 4,
      })
    },
    // 筛选栏查询按钮文本
    filterSearchText: {
      type: String,
      default: '查询'
    },
    // 筛选栏重置按钮文本
    filterResetText: {
      type: String,
      default: '重置'
    },

    // ========== 工具栏配置 ==========
    // 工具栏配置
    toolbar: {
      type: [Object, Boolean],
      default: () => ({
        search: true,
        refresh: true,
        setting: true,
        density: true,
        fullscreen: false
      })
    },
    // 显示搜索框
    showSearch: {
      type: Boolean,
      default: true
    },
    searchInput: {
      type: String,
      default: null
    },
    // 原始 v-data-table 透传配置
    dataTableProps: {
      type: Object,
      default: () => ({})
    },
    sortBy: {
      type: [Array, String],
      default: () => []
    },
    sortDesc: {
      type: [Array, Boolean],
      default: () => []
    },
    multiSort: {
      type: Boolean,
      default: false
    },
    mustSort: {
      type: Boolean,
      default: false
    },

    // ========== 按钮配置 ==========
    showCreateButton: {
      type: Boolean,
      default: true
    },
    showUpdateAction: {
      type: Boolean,
      default: true
    },
    showDeleteAction: {
      type: Boolean,
      default: true
    },

    // ========== 操作列配置 ==========
    // 操作列配置
    actionColumn: {
      type: [Object, Boolean],
      default: null
      // {
      //   title: '操作',
      //   width: 180,
      //   fixed: 'right',
      //   buttons: [
      //     {
      //       text: '编辑',
      //       type: 'link', // link / icon / button
      //       icon: 'mdi-pencil',
      //       color: 'primary',
      //       tooltip: '编辑记录',
      //       onClick: (row) => {},
      //       visible: (row) => true,
      //       confirm: '确认编辑？'
      //     }
      //   ]
      // }
    },
    // 列状态配置
    columnsState: {
      type: Object,
      default: () => ({
        persistenceKey: '',
        defaultVisible: null,
        value: null
      })
    },

    // ========== 分页配置 ==========
    pagination: {
      type: [Object, Boolean],
      default: () => ({
        current: 1,
        pageSize: 20,
        pageSizeOptions: [10, 20, 50, 100],
        showTotal: true
      })
    },
    itemsPerPage: {
      type: Number,
      default: 20
    },

    // ========== 选择配置 ==========
    // 行选择
    rowSelection: {
      type: [Object, Boolean],
      default: null
    },
    tableAlertRender: {
      type: [Function, Boolean],
      default: null
    },
    tableAlertOptionRender: {
      type: [Function, Boolean],
      default: null
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    singleSelect: {
      type: Boolean,
      default: false
    },

    // ========== 标题和样式配置 ==========
    // 表格标题
    headerTitle: {
      type: String,
      default: ''
    },
    // 标题提示信息
    tooltip: {
      type: String,
      default: ''
    },
    // 是否显示卡片边框
    cardBordered: {
      type: Boolean,
      default: true
    },
    // 幽灵模式（无边框无背景）
    ghost: {
      type: Boolean,
      default: false
    },

    // ========== 轮询配置 ==========
    // 轮询间隔（毫秒），0 表示不轮询
    polling: {
      type: Number,
      default: 0
    },
    // 搜索防抖时间（毫秒）
    debounceTime: {
      type: Number,
      default: 300
    },

    // ========== 其他配置 ==========
    loading: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    size: {
      type: String,
      default: 'default', // default / medium / compact
      validator: (v) => ['default', 'medium', 'compact'].includes(v)
    },
    footerProps: {
      type: Object,
      default: () => ({
        itemsPerPageOptions: [10, 20, 50, 100],
        itemsPerPageText: '每页',
        itemsPerPageAllText: '所有',
        showFirstLastPage: true,
        showCurrentPage: true
      })
    },
    mobileBreakpoint: {
      type: Number,
      default: 600
    },
    checkboxColor: {
      type: String,
      default: 'success'
    },
    tableClass: {
      type: [String, Object, Array],
      default: () => ({ zebraLine: true })
    },
    fixedHeader: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMobile: window.innerWidth < 500,
      searchInputInternal: this.searchInput,
      currentLoading: this.loading,
      currentItems: this.items || [],
      currentPage: this.pagination ? this.pagination.current || 1 : 1,
      currentItemsPerPage: this.itemsPerPage,
      serverItemsLength: -1,
      internalColumns: [],
      currentDensity: this.size,
      isFullscreen: false,
      selectedItems: [],
      filterValues: {},
      pollingTimer: null,
      searchDebounceTimer: null,
      internalSortBy: this.normalizeSortBy(this.sortBy),
      internalSortDesc: this.normalizeSortDesc(this.sortDesc),
      sortChangeTimer: null,
      hasAppliedDefaultRowSelection: false
    };
  },
  computed: {
    // 选中的行 keys
    selectedRowKeys() {
      return this.selectedItems.map(item => item[this.rowKey]);
    },

    tableAlertScope() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        selectedRows: this.selectedItems,
        onCleanSelected: this.clearSelection
      };
    },
    hasAlertContent() {
      if (this.$scopedSlots.alert) {
        return true;
      }
      if (typeof this.tableAlertRender === 'function') {
        return true;
      }
      return this.tableAlertRender !== false;
    },
    hasAlertActionsContent() {
      return !!this.$scopedSlots['alert-actions'] || typeof this.tableAlertOptionRender === 'function';
    },
    showSelectionAlertBar() {
      if (!this.showSelectComputed) return false;
      if (!this.selectedItems.length) return false;
      return this.hasAlertContent || this.hasAlertActionsContent;
    },
    // 工具栏配置
    toolbarConfig() {
      if (this.toolbar === false) return {};
      if (typeof this.toolbar === 'object') {
        return {
          search: this.showSearch,
          refresh: true,
          setting: true,
          density: true,
          fullscreen: false,
          ...this.toolbar
        };
      }
      return {
        search: this.showSearch,
        refresh: true,
        setting: true,
        density: true,
        fullscreen: false
      };
    },
    // 可见的表头
    visibleHeaders() {
      return this.internalColumns.filter(h => h.visible !== false);
    },
    // 需要自定义表头插槽的列
    customHeaderSlots() {
      return this.internalColumns.filter(h => this.$scopedSlots[`header.${h.value}`]);
    },
    // 表格样式类
    tableClassComputed() {
      return [
        this.tableClass,
        {
          'jh-table-fullscreen': this.isFullscreen
        }
      ];
    },
    // 密度样式类
    densityClass() {
      return {
        'jh-table-default': this.currentDensity === 'default',
        'jh-table-medium': this.currentDensity === 'medium',
        'jh-table-compact': this.currentDensity === 'compact'
      };
    },
    // 分页配置
    currentFooterProps() {
      const defaultProps = {
        itemsPerPageOptions: [10, 20, 50, 100],
        itemsPerPageText: '每页',
        itemsPerPageAllText: '所有',
        showFirstLastPage: true,
        showCurrentPage: true
      };
      return { ...defaultProps, ...this.footerProps };
    },
    showSelectComputed() {
      if (this.rowSelection === false) return false;
      if (this.rowSelection && typeof this.rowSelection === 'object') {
        return this.rowSelection.show !== false;
      }
      return this.showSelect;
    },
    singleSelectComputed() {
      if (this.rowSelection && this.rowSelection.type === 'radio') {
        return true;
      }
      return this.singleSelect;
    },
    isRowSelectionControlled() {
      return !!(this.rowSelection && Array.isArray(this.rowSelection.selectedRowKeys));
    },
    wrapperClass() {
      return [
        'jh-pro-table',
        this.$attrs.class,
        {
          'jh-pro-table-card': this.cardBordered,
          'jh-pro-table-ghost': this.ghost
        }
      ];
    },
    wrapperStyle() {
      return this.$attrs.style || null;
    },
    mergedDataTableProps() {
      const { class: cls, style, ...rest } = this.$attrs || {};
      return {
        ...rest,
        ...this.dataTableProps
      };
    },
    dataTableListeners() {
      const {
        'click:row': clickRow,
        input,
        'update:page': updatePage,
        'update:items-per-page': updateItemsPerPage,
        'update:sort-by': updateSortBy,
        'update:sort-desc': updateSortDesc,
        ...rest
      } = this.$listeners || {};
      return rest;
    }
  },
  watch: {
    headers: {
      immediate: true,
      handler(val) {
        this.initColumns(val);
      }
    },
    items(val) {
      if (!this.request) {
        this.currentItems = val || [];
        this.$nextTick(() => this.applySelectionState());
      }
    },
    loading(val) {
      this.currentLoading = val;
    },
    searchInput(val) {
      this.searchInputInternal = val;
    },
    searchInputInternal(val) {
      this.$emit('update:searchInput', val);
      if (this.request) {
        // 使用防抖
        if (this.searchDebounceTimer) {
          clearTimeout(this.searchDebounceTimer);
        }
        this.searchDebounceTimer = setTimeout(() => {
          this.reload();
        }, this.debounceTime);
      }
    },
    size(val) {
      this.currentDensity = val;
    },
    sortBy(val) {
      this.internalSortBy = this.normalizeSortBy(val);
      this.scheduleSortChangeEmit();
    },
    sortDesc(val) {
      this.internalSortDesc = this.normalizeSortDesc(val);
      this.scheduleSortChangeEmit();
    },
    rowSelection: {
      deep: true,
      handler() {
        this.hasAppliedDefaultRowSelection = false;
        this.$nextTick(() => this.applySelectionState());
      }
    },
    columnsState: {
      deep: true,
      handler(newVal) {
        if (newVal && typeof newVal.value !== 'undefined' && newVal.value !== null) {
          this.applyExternalColumnState(newVal.value);
        }
      }
    },
    showSelect() {
      this.$nextTick(() => this.applySelectionState());
    },
    currentItems() {
      this.$nextTick(() => this.applySelectionState());
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    // 如果有 request 函数，自动加载数据
    if (this.request) {
      this.reload();
    }
    // 启动轮询
    this.startPolling();
    this.$nextTick(() => this.applySelectionState());
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    this.stopPolling();
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
    if (this.sortChangeTimer) {
      clearTimeout(this.sortChangeTimer);
    }
  },
  methods: {
    // 初始化列配置
    initColumns(headers) {
      const persistedState = this.getPersistedColumnState();
      const externalState = this.columnsState?.value;
      const defaultVisible = this.columnsState?.defaultVisible;
      this.internalColumns = headers.map(h => {
        const value = h.value || h.dataIndex || h.key;
        const baseVisible = h.visible !== false;
        const visible = this.resolveColumnVisible({
          value,
          baseVisible,
          externalState,
          persistedState,
          defaultVisible
        });
        return {
          ...h,
          visible,
          initiallyVisible: baseVisible,
          text: h.text || h.title,
          value
        };
      });
    },
    // 切换列显示
    toggleColumn(col) {
      col.visible = !col.visible;
      this.emitColumnStateChange();
      this.$forceUpdate();
    },
    // 重置列配置
    resetColumns() {
      this.internalColumns.forEach(col => {
        col.visible = col.initiallyVisible;
      });
      this.clearPersistedColumnState();
      this.emitColumnStateChange();
      this.$forceUpdate();
    },
    // 刷新表格
    async handleRefresh() {
      this.$emit('refresh');
      if (this.request) {
        await this.reload();
      }
    },
    // 切换全屏
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      if (this.isFullscreen) {
        this.$el.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    },
    // 获取可见的操作按钮
    getVisibleButtons(row) {
      if (!this.actionColumn || !this.actionColumn.buttons) return [];
      return this.actionColumn.buttons.filter(btn => {
        if (typeof btn.visible === 'function') {
          return btn.visible(row);
        }
        return btn.visible !== false;
      });
    },
    // 处理操作按钮点击
    async handleActionClick(btn, row) {
      if (btn.confirm) {
        const confirmed = confirm(btn.confirm);
        if (!confirmed) return;
      }
      if (btn.onClick) {
        await btn.onClick(row);
      }
    },
    // 复制到剪贴板
    copyToClipboard(text) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          this.$emit('copy-success', text);
          // 可以显示提示
          console.log('已复制:', text);
        });
      } else {
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this.$emit('copy-success', text);
        console.log('已复制:', text);
      }
    },
    // 行点击
    handleRowClick(item, event) {
      this.$emit('row-click', item, event);
      this.$emit('click:row', item, event);
    },
    // 选择改变
    handleSelectionChange(selectedItems) {
      this.selectedItems = selectedItems;
      const payload = {
        selectedRowKeys: selectedItems.map(item => item[this.rowKey]),
        selectedRows: selectedItems
      };
      this.$emit('selection-change', payload);
      this.$emit('input', selectedItems);
      if (this.rowSelection && typeof this.rowSelection.onChange === 'function') {
        this.rowSelection.onChange(payload.selectedRowKeys, selectedItems);
      }
    },
    // 页码改变
    handlePageChange(page) {
      this.currentPage = page;
      this.$emit('update:page', page);
      if (this.request) {
        this.reload();
      }
    },
    // 每页条数改变
    handleItemsPerPageChange(itemsPerPage) {
      this.currentItemsPerPage = itemsPerPage;
      this.currentPage = 1;
      this.$emit('update:items-per-page', itemsPerPage);
      if (this.request) {
        this.reload();
      }
    },
    // 高级筛选-查询
    handleFilterSearch(queryData) {
      this.filterValues = queryData;
      this.currentPage = 1; // 重置到第一页
      this.$emit('filter-search', queryData);
      if (this.request) {
        this.reload();
      }
    },
    // 高级筛选-重置
    handleFilterReset() {
      this.filterValues = {};
      this.currentPage = 1; // 重置到第一页
      this.$emit('filter-reset');
      if (this.request) {
        this.reload();
      }
    },
    // 重新加载数据（服务端分页）
    async reload() {
      if (!this.request) return;

      this.currentLoading = true;
      try {
        const params = {
          page: this.currentPage,
          pageSize: this.currentItemsPerPage,
          search: this.searchInputInternal,
          sorter: this.buildSorterPayload(),
          filters: this.filterValues // 包含高级筛选的值
        };

        const response = await this.request(params);

        if (response && response.success !== false) {
          this.currentItems = response.data || response.list || [];
          this.serverItemsLength = response.total || response.totalCount || this.currentItems.length;
          this.$nextTick(() => this.applySelectionState());
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        this.$emit('request-error', error);
      } finally {
        this.currentLoading = false;
      }
    },
    // 重置到第一页
    reset() {
      this.currentPage = 1;
      this.reload();
    },
    // 清空选择
    clearSelection() {
      this.selectedItems = [];
      this.$refs.dataTable?.clearSelection?.();
      const payload = { selectedRowKeys: [], selectedRows: [] };
      this.$emit('selection-change', payload);
      this.$emit('input', []);
      if (this.rowSelection && typeof this.rowSelection.onChange === 'function') {
        this.rowSelection.onChange([], []);
      }
    },
    // 获取选中的行
    getSelectedRows() {
      return this.selectedItems;
    },
    // 窗口大小改变
    handleResize() {
      this.isMobile = window.innerWidth < 500;
    },
    // 启动轮询
    startPolling() {
      if (this.polling > 0 && this.request) {
        this.pollingTimer = setInterval(() => {
          this.reload();
        }, this.polling);
      }
    },
    // 停止轮询
    stopPolling() {
      if (this.pollingTimer) {
        clearInterval(this.pollingTimer);
        this.pollingTimer = null;
      }
    },
    resolveColumnVisible({ value, baseVisible, externalState, persistedState, defaultVisible }) {
      if (externalState && Object.prototype.hasOwnProperty.call(externalState, value)) {
        return externalState[value];
      }
      if (persistedState && Object.prototype.hasOwnProperty.call(persistedState, value)) {
        return persistedState[value];
      }
      if (defaultVisible && Object.prototype.hasOwnProperty.call(defaultVisible, value)) {
        return defaultVisible[value];
      }
      return baseVisible;
    },
    getColumnStateSnapshot() {
      return this.internalColumns.reduce((acc, col) => {
        acc[col.value] = col.visible !== false;
        return acc;
      }, {});
    },
    emitColumnStateChange() {
      const snapshot = this.getColumnStateSnapshot();
      this.$emit('columns-state-change', snapshot);
      if (this.columnsState && typeof this.columnsState.onChange === 'function') {
        this.columnsState.onChange(snapshot);
      }
      this.persistColumnState(snapshot);
    },
    getPersistedColumnState() {
      if (!this.columnsState || !this.columnsState.persistenceKey) return null;
      if (typeof window === 'undefined') return null;
      try {
        const raw = window.localStorage.getItem(this.columnsState.persistenceKey);
        return raw ? JSON.parse(raw) : null;
      } catch (error) {
        console.warn('[JhTable] Failed to parse persisted column state:', error);
        return null;
      }
    },
    persistColumnState(state) {
      if (!this.columnsState || !this.columnsState.persistenceKey) return;
      if (typeof window === 'undefined') return;
      try {
        if (state) {
          window.localStorage.setItem(this.columnsState.persistenceKey, JSON.stringify(state));
        } else {
          window.localStorage.removeItem(this.columnsState.persistenceKey);
        }
      } catch (error) {
        console.warn('[JhTable] Failed to persist column state:', error);
      }
    },
    clearPersistedColumnState() {
      if (!this.columnsState || !this.columnsState.persistenceKey) return;
      if (typeof window === 'undefined') return;
      try {
        window.localStorage.removeItem(this.columnsState.persistenceKey);
      } catch (error) {
        console.warn('[JhTable] Failed to clear column state:', error);
      }
    },
    applyExternalColumnState(state) {
      if (!state) return;
      this.internalColumns = this.internalColumns.map(col => ({
        ...col,
        visible: Object.prototype.hasOwnProperty.call(state, col.value) ? state[col.value] : col.visible
      }));
      this.$forceUpdate();
    },
    normalizeSortBy(value) {
      if (Array.isArray(value)) return value;
      if (typeof value === 'string' && value) return [value];
      return [];
    },
    normalizeSortDesc(value) {
      if (Array.isArray(value)) return value;
      if (typeof value === 'boolean') return [value];
      return [];
    },
    handleSortByUpdate(val) {
      this.internalSortBy = this.normalizeSortBy(val);
      this.scheduleSortChangeEmit();
    },
    handleSortDescUpdate(val) {
      if (Array.isArray(val)) {
        this.internalSortDesc = val;
      } else if (typeof val === 'boolean') {
        this.internalSortDesc = [val];
      } else {
        this.internalSortDesc = [];
      }
      this.scheduleSortChangeEmit();
    },
    scheduleSortChangeEmit() {
      if (this.sortChangeTimer) {
        clearTimeout(this.sortChangeTimer);
      }
      this.sortChangeTimer = setTimeout(() => {
        this.sortChangeTimer = null;
        this.emitSortChange();
      }, 0);
    },
    emitSortChange() {
      this.$emit('update:sortBy', this.internalSortBy);
      this.$emit('update:sortDesc', this.internalSortDesc);
      this.$emit('sort-change', {
        sortBy: this.internalSortBy,
        sortDesc: this.internalSortDesc,
        sorter: this.buildSorterPayload()
      });
      if (this.request) {
        this.currentPage = 1;
        this.$emit('update:page', 1);
        this.reload();
      }
    },
    buildSorterPayload() {
      if (!this.internalSortBy.length) return {};
      const order = {};
      this.internalSortBy.forEach((key, index) => {
        order[key] = this.internalSortDesc[index] ? 'desc' : 'asc';
      });
      return {
        sortBy: this.internalSortBy,
        sortDesc: this.internalSortDesc,
        order
      };
    },
    applySelectionState() {
      if (!this.showSelectComputed) {
        if (this.selectedItems.length) {
          this.selectedItems = [];
          this.$emit('input', []);
        }
        return;
      }
      const controlledKeys = this.getControlledRowKeys();
      if (controlledKeys) {
        this.syncSelectionByKeys(controlledKeys);
      } else {
        this.applyDefaultRowSelection();
      }
    },
    getControlledRowKeys() {
      if (this.rowSelection && Array.isArray(this.rowSelection.selectedRowKeys)) {
        return this.rowSelection.selectedRowKeys;
      }
      return null;
    },
    syncSelectionByKeys(keys) {
      if (!Array.isArray(keys)) return;
      const keySet = new Set(keys);
      const matched = this.currentItems.filter(item => keySet.has(item[this.rowKey]));
      this.selectedItems = matched;
      this.$emit('input', matched);
    },
    applyDefaultRowSelection() {
      if (this.hasAppliedDefaultRowSelection) return;
      if (!this.rowSelection || !Array.isArray(this.rowSelection.defaultSelectedRowKeys)) return;
      const keySet = new Set(this.rowSelection.defaultSelectedRowKeys);
      const matched = this.currentItems.filter(item => keySet.has(item[this.rowKey]));
      if (matched.length) {
        this.selectedItems = matched;
        this.$emit('input', matched);
      }
      this.hasAppliedDefaultRowSelection = true;
    }
  }
};
</script>

<style scoped>
/* 表格容器 */
.jh-pro-table {
  border-radius: 8px;
  position: relative;
}


/* 幽灵模式 */
.jh-pro-table-ghost {
  background: transparent;
  border: none;
  box-shadow: none;
}

/* 表格标题区 */
.jh-pro-table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  min-height: 64px;
}

.jh-pro-table-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.jh-pro-table-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.jh-pro-table-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.jh-pro-table-title-text {
  line-height: 24px;
}

.jh-pro-table-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 批量操作提示栏 */
.jh-pro-table-alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  margin: 16px 0 0;
}

.jh-pro-table-alert-info {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
}

.jh-pro-table-alert-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 工具栏 */
.jh-pro-table-toolbar {
  padding: 16px 0 !important;
}

/* 表格额外内容区 */
.jh-pro-table-extra {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .jh-pro-table-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 16px;
    min-height: auto;
  }

  .jh-pro-table-header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }

  .jh-pro-table-header-right {
    width: 100%;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .jh-pro-table-alert {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin: 12px 16px 0;
    padding: 8px 12px;
  }

  .jh-pro-table-alert-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .jh-pro-table-toolbar {
    padding: 12px 16px !important;
  }

  .jh-pro-table-extra {
    padding: 12px 16px;
  }
}

/* 工具栏搜索框响应式 */
.jh-toolbar-search {
  max-width: 200px;
  min-width: 120px;
}

@media (max-width: 600px) {
  .jh-toolbar-search {
    max-width: 150px;
    min-width: 100px;
  }
}

/* 表格密度 */
.jh-table-default >>> .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.jh-table-default >>> .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  height: 48px !important;
  padding: 0 16px !important;
}

.jh-table-medium >>> .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.jh-table-medium >>> .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  height: 40px !important;
  padding: 0 12px !important;
}

.jh-table-compact >>> .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.jh-table-compact >>> .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  height: 32px !important;
  padding: 0 8px !important;
  font-size: 13px !important;
}

/* 移动端表格密度调整 */
@media (max-width: 600px) {
  .jh-table-default >>> .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
  .jh-table-default >>> .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    height: 44px !important;
    padding: 0 12px !important;
    font-size: 14px !important;
  }

  .jh-table-medium >>> .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
  .jh-table-medium >>> .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    height: 40px !important;
    padding: 0 10px !important;
    font-size: 13px !important;
  }

  .jh-table-compact >>> .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
  .jh-table-compact >>> .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    height: 36px !important;
    padding: 0 8px !important;
    font-size: 12px !important;
  }
}

/* 移动端操作列样式优化 */
@media (max-width: 600px) {
  /* 操作列下拉菜单触发器 */
  .jh-pro-table >>> .v-data-table td[data-action-column] {
    padding: 0 8px !important;
  }

  /* 操作按钮文字在小屏幕隐藏 */
  .jh-pro-table >>> .v-btn--small .v-btn__content > span:not(.v-icon) {
    font-size: 13px;
  }
}

/* 全屏样式 */
.jh-table-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: white;
  padding: 16px;
  overflow: auto;
}

@media (max-width: 600px) {
  .jh-table-fullscreen {
    padding: 8px;
  }
}

/* 无数据样式 */
.jh-no-data {
  text-align: center;
  padding: 40px 0;
  color: rgba(0, 0, 0, 0.45);
}

@media (max-width: 600px) {
  .jh-no-data {
    padding: 24px 0;
  }

  .jh-no-data .v-icon {
    font-size: 48px !important;
  }
}

/* 游标指针 */
.cursor-pointer {
  cursor: pointer;
}

/* Flex 工具类（如果没有 Tailwind） */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-end {
  justify-content: flex-end;
}

.flex-wrap {
  flex-wrap: wrap;
}

.gap-1 {
  gap: 4px;
}

.gap-2 {
  gap: 8px;
}

/* 移动端工具栏响应式 */
@media (max-width: 600px) {
  .jh-pro-table >>> .v-row {
    margin: 0 !important;
  }

  /* 工具栏按钮间距调整 */
  .flex.gap-2 {
    gap: 4px;
  }

  /* 密度和列设置菜单按钮在移动端可选择隐藏 */
  .jh-pro-table >>> .v-btn--icon.v-size--small {
    width: 32px;
    height: 32px;
  }
}

/* 分页器移动端优化 */
@media (max-width: 600px) {
  .jh-pro-table >>> .v-data-footer {
    flex-wrap: wrap;
    justify-content: center;
    padding: 8px 4px !important;
  }

  .jh-pro-table >>> .v-data-footer__select {
    margin-left: 8px !important;
    margin-right: 8px !important;
  }

  .jh-pro-table >>> .v-data-footer__pagination {
    margin: 4px 8px !important;
  }
}
</style>
