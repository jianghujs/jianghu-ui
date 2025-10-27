<template>
  <div class="jh-pro-table">
    <!-- Toolbar -->
    <div v-if="toolbar" class="jh-pro-table-toolbar">
      <div class="jh-pro-table-toolbar-left">
        <slot name="toolbar-actions" />
      </div>

      <div class="jh-pro-table-toolbar-right">
        <!-- Search -->
        <v-text-field
          v-if="toolbarConfig.search"
          v-model="searchKeyword"
          placeholder="搜索"
          dense
          outlined
          hide-details
          prepend-inner-icon="mdi-magnify"
          clearable
          style="max-width: 300px"
          @input="handleSearch"
        />

        <!-- Refresh -->
        <v-btn
          v-if="toolbarConfig.refresh"
          icon
          @click="reload"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <!-- Density -->
        <v-menu
          v-if="toolbarConfig.density"
          offset-y
          left
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-table-row-height</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="currentSize = 'default'">
              <v-list-item-title>默认</v-list-item-title>
            </v-list-item>
            <v-list-item @click="currentSize = 'medium'">
              <v-list-item-title>中等</v-list-item-title>
            </v-list-item>
            <v-list-item @click="currentSize = 'compact'">
              <v-list-item-title>紧凑</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Column Settings -->
        <v-menu
          v-if="toolbarConfig.setting"
          offset-y
          left
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="col in visibleColumns"
              :key="col.key"
            >
              <v-checkbox
                v-model="col.visible"
                :label="col.title"
                hide-details
                dense
              />
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Fullscreen -->
        <v-btn
          v-if="toolbarConfig.fullscreen"
          icon
          @click="toggleFullscreen"
        >
          <v-icon>{{ isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- Search Form -->
    <div v-if="searchConfig" class="jh-pro-table-search">
      <v-form ref="searchForm">
        <v-row>
          <v-col
            v-for="field in searchConfig.fields"
            :key="field.key"
            :cols="field.cols || 12"
            :sm="field.sm || 6"
            :md="field.md || 4"
            :lg="field.lg || 3"
          >
            <v-text-field
              v-if="field.type === 'text'"
              v-model="searchValues[field.key]"
              :label="field.label"
              :placeholder="field.placeholder"
              class="jh-v-input"
                dense
                single-line
                filled
              outlined
              hide-details
              clearable
            />

            <v-select
              v-else-if="field.type === 'select'"
              v-model="searchValues[field.key]"
              :label="field.label"
              :items="field.options"
             class="jh-v-input"
                dense
                single-line
                filled
              outlined
              hide-details
              clearable
            />

            <v-menu
              v-else-if="field.type === 'date'"
              :close-on-content-click="false"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="searchValues[field.key]"
                  :label="field.label"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  class="jh-v-input"
                dense
                single-line
                filled
                  outlined
                  hide-details
                  clearable
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="searchValues[field.key]"
              />
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="4" lg="3" class="text-right">
            <v-btn
              color="primary"
              @click="handleSearchSubmit"
            >
              查询
            </v-btn>
            <v-btn
              text
              class="ml-2"
              @click="handleSearchReset"
            >
              重置
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>

    <!-- Alert (for batch operations) -->
    <v-alert
      v-if="rowSelection && selectedRows.length > 0"
      type="info"
      dense
      text
      class="jh-pro-table-alert"
    >
      已选择 {{ selectedRows.length }} 项
      <v-btn
        text
        small
        color="primary"
        class="ml-2"
        @click="clearSelection"
      >
        清空
      </v-btn>
      <slot name="batch-actions" :selected-rows="selectedRows" />
    </v-alert>

    <!-- Data Table -->
    <v-data-table
      v-model="selectedRows"
      :headers="visibleHeaders"
      :items="tableData"
      :loading="internalLoading"
      :dense="currentSize === 'compact'"
      :show-select="!!rowSelection"
      :single-select="rowSelection && rowSelection.type === 'radio'"
      :item-key="rowKey"
      :options.sync="tableOptions"
      :server-items-length="serverItemsLength"
      checkbox-color="success"
      :footer-props="footerProps"
      @click:row="handleRowClick"
      fixed-header
      :class="`jh-fixed-table-height elevation-0 mt-0 mb-xs-4 zebraLine`"
    >
      <!-- Custom column slots -->
      <template
        v-for="col in columns"
        #[`item.${col.dataIndex}`]="{ item }"
      >
        <slot
          v-if="$scopedSlots[`column-${col.key}`]"
          :name="`column-${col.key}`"
          :row="item"
          :value="item[col.dataIndex]"
        />
        <span
          v-else
          :key="col.key"
        >
          {{ item[col.dataIndex] }}
        </span>
      </template>

      <!-- Action column -->
      <template v-if="actionColumn" #item.action="{ item }">
        <slot v-if="$scopedSlots.action" name="action" :row="item" />
        <div v-else-if="actionColumn.buttons" class="jh-pro-table-actions">
          <template v-for="(btn, index) in actionColumn.buttons">
            <v-btn
              v-if="!btn.hidden || !btn.hidden(item)"
              :key="index"
              :color="btn.color"
              :disabled="btn.disabled && btn.disabled(item)"
              text
              small
              @click="handleActionClick(btn, item)"
            >
              {{ typeof btn.text === 'function' ? btn.text(item) : btn.text }}
            </v-btn>
          </template>
        </div>
      </template>

      <!-- No data -->
      <template #no-data>
        <slot name="no-data">
          <div class="text-center pa-4">
            <v-icon size="64" color="grey">mdi-tray</v-icon>
            <p class="mt-4 grey--text">暂无数据</p>
          </div>
        </slot>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'JhProTable',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    request: {
      type: Function,
      default: null,
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    searchConfig: {
      type: Object,
      default: null,
    },
    toolbar: {
      type: [Object, Boolean],
      default: () => ({
        search: true,
        refresh: true,
        setting: true,
        density: false,
        fullscreen: false,
      }),
    },
    actionColumn: {
      type: [Object, Boolean],
      default: null,
    },
    pagination: {
      type: [Object, Boolean],
      default: () => ({
        current: 1,
        pageSize: 10,
      }),
    },
    rowSelection: {
      type: [Object, Boolean],
      default: null,
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    size: {
      type: String,
      default: 'default',
      validator: (v) => ['default', 'medium', 'compact'].includes(v),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableData: [],
      searchValues: {},
      searchKeyword: '',
      selectedRows: [],
      currentSize: this.size,
      isFullscreen: false,
      visibleColumns: [],
      tableOptions: {},
      serverItemsLength: 0,
      internalLoading: false,
    };
  },
  computed: {
    toolbarConfig() {
      if (typeof this.toolbar === 'boolean') {
        return {
          search: this.toolbar,
          refresh: this.toolbar,
          setting: this.toolbar,
          density: false,
          fullscreen: false,
        };
      }
      return {
        search: true,
        refresh: true,
        setting: true,
        density: false,
        fullscreen: false,
        ...this.toolbar,
      };
    },
    visibleHeaders() {
      const headers = this.visibleColumns
        .filter((col) => col.visible)
        .map((col) => ({
          text: col.title,
          value: col.dataIndex,
          sortable: col.sortable || false,
          width: col.width,
        }));

      // Add action column
      if (this.actionColumn) {
        headers.push({
          text: this.actionColumn.title || '操作',
          value: 'action',
          sortable: false,
          width: this.actionColumn.width || 180,
          align: 'center',
        });
      }

      return headers;
    },
    footerProps() {
      if (this.pagination === false) {
        return { 'items-per-page-options': [-1] };
      }

      return {
        'items-per-page-options': this.pagination.pageSizeOptions || [10, 20, 50, 100],
        'show-current-page': true,
        'show-first-last-page': true,
      };
    },
  },
  watch: {
    columns: {
      immediate: true,
      handler() {
        this.initColumns();
      },
    },
    dataSource: {
      immediate: true,
      handler(newData) {
        if (!this.request) {
          this.tableData = newData || [];
        }
      },
    },
    tableOptions: {
      deep: true,
      handler() {
        if (this.request) {
          this.fetchData();
        }
      },
    },
  },
  created() {
    this.initSearchValues();
  },
  mounted() {
    if (this.request) {
      this.fetchData();
    }
  },
  methods: {
    initColumns() {
      this.visibleColumns = this.columns.map((col) => ({
        ...col,
        visible: col.hidden !== true,
      }));
    },
    initSearchValues() {
      const values = {};
      if (this.searchConfig && this.searchConfig.fields) {
        this.searchConfig.fields.forEach((field) => {
          values[field.key] = field.defaultValue || '';
        });
      }
      this.searchValues = values;
    },
    async fetchData() {
      if (!this.request) return;

      this.internalLoading = true;
      try {
        const { page, itemsPerPage, sortBy, sortDesc } = this.tableOptions;

        const params = {
          page: page || 1,
          pageSize: itemsPerPage || 10,
          sorter: sortBy && sortBy.length ? {
            field: sortBy[0],
            order: sortDesc[0] ? 'desc' : 'asc',
          } : null,
          filters: { ...this.searchValues },
          search: this.searchKeyword,
        };

        const response = await this.request(params);

        if (response && response.success) {
          this.tableData = response.data || [];
          this.serverItemsLength = response.total || 0;
        }
      } catch (error) {
        console.error('Failed to fetch table data:', error);
        this.$emit('error', error);
      } finally {
        this.internalLoading = false;
      }
    },
    handleSearch() {
      // Debounce search if needed
      if (this.request) {
        this.fetchData();
      } else {
        // Client-side search
        const keyword = this.searchKeyword.toLowerCase();
        this.tableData = this.dataSource.filter((item) => {
          return Object.values(item).some((val) =>
            String(val).toLowerCase().includes(keyword)
          );
        });
      }
    },
    handleSearchSubmit() {
      this.$emit('search', { ...this.searchValues });
      if (this.request) {
        this.fetchData();
      }
    },
    handleSearchReset() {
      this.initSearchValues();
      this.$emit('reset');
      if (this.request) {
        this.fetchData();
      }
    },
    handleRowClick(row) {
      this.$emit('row-click', row);
    },
    async handleActionClick(btn, row) {
      if (btn.confirm) {
        const confirmed = confirm(btn.confirm);
        if (!confirmed) return;
      }

      if (btn.onClick) {
        btn.onClick(row);
      }
    },
    reload() {
      this.$emit('refresh');
      if (this.request) {
        this.fetchData();
      }
    },
    reset() {
      this.tableOptions.page = 1;
      this.reload();
    },
    clearSelection() {
      this.selectedRows = [];
      this.$emit('selection-change', {
        selectedRowKeys: [],
        selectedRows: [],
      });
    },
    getSelectedRows() {
      return this.selectedRows;
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      // Implement fullscreen logic if needed
    },
  },
};
</script>

<style scoped>
.jh-pro-table {
  background: white;
  border-radius: 4px;
}

.jh-pro-table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.jh-pro-table-toolbar-left {
  display: flex;
  gap: 8px;
}

.jh-pro-table-toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.jh-pro-table-search {
  padding: 16px;
  background: #fafafa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.jh-pro-table-alert {
  margin: 16px;
}

.jh-pro-table-actions {
  display: flex;
  gap: 4px;
  justify-content: center;
}
</style>
