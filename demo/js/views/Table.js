window.TableView = {
  template: `
    <div class="page-container">
      <jh-card :bordered="false">
        
        <!-- Filter Area is handled by JhTable's built-in search or custom filter -->
        
        <jh-table
          ref="table"
          :headers="headers"
          :request="loadData"
          :show-search="true"
          :header-title="查询表格"
          :show-select="true"
          :filter-fields="filterFields"
          class="flex-1"
          :toolbar="{
            search: false, 
            refresh: true,
            density: true,
            setting: true
          }"
          @selection-change="onSelectionChange"
        >
          <!-- Custom Toolbar Actions -->
          <template v-slot:toolbar-actions>
             <v-btn color="primary" small @click="openCreateDrawer">
               <v-icon left small>mdi-plus</v-icon>新建
             </v-btn>
             <v-btn v-if="selectedRows.length > 0" small outlined class="ml-2">
                批量操作
             </v-btn>
          </template>
          
          <!-- Custom Status Column -->
          <template v-slot:item.status="{ item }">
            <div class="d-flex align-center">
              <div :class="['status-dot', 'status-' + item.status]"></div>
              <span class="ml-2">{{ getStatusText(item.status) }}</span>
            </div>
          </template>

          <!-- Custom Actions Column -->
          <template v-slot:item.action="{ item }">
            <a @click="handleConfig(item)">配置</a>
            <v-divider vertical class="mx-2"></v-divider>
            <a @click="handleAlert(item)">订阅警报</a>
          </template>
        </jh-table>
      </jh-card>

      <!-- Drawer Form for Create/Edit -->
      <jh-drawer-form
        v-model="drawerVisible"
        :title="drawerTitle"
        :fields="formFields"
        :initial-data="formData"
        @confirm="handleConfirm"
      />
    </div>
  `,
  data() {
    return {
      selectedRows: [],
      headers: [
        { text: '规则名称', value: 'name' },
        { text: '描述', value: 'desc' },
        { text: '服务调用次数', value: 'callCount', align: 'right' },
        { text: '状态', value: 'status' },
        { text: '上次调度时间', value: 'updatedAt' },
        { text: '操作', value: 'action', sortable: false, width: 150 }
      ],
      // Custom filter fields to appear above table
      filterFields: [
        { key: 'name', label: '规则名称', placeholder: '请输入' },
        { key: 'desc', label: '描述', placeholder: '请输入' }
      ],
      formFields: [
        { key: 'name', label: '规则名称', required: true },
        { key: 'desc', label: '描述', type: 'textarea' }
      ],
      drawerVisible: false,
      drawerTitle: '新建规则',
      formData: {}
    };
  },
  methods: {
    async loadData(params) {
      return new Promise(resolve => {
        setTimeout(() => {
          let data = window.MockData.rules;
          // Client-side filtering simulation
          if (params.filters) {
            if (params.filters.name) {
              data = data.filter(item => item.name.includes(params.filters.name));
            }
            if (params.filters.desc) {
              data = data.filter(item => item.desc.includes(params.filters.desc));
            }
          }
          
          resolve({
            data: data,
            total: data.length
          });
        }, 300);
      });
    },
    getStatusText(status) {
      const map = {
        online: '已上线',
        running: '运行中',
        closed: '关闭',
        exception: '异常'
      };
      return map[status] || status;
    },
    onSelectionChange({ selectedRows }) {
      this.selectedRows = selectedRows;
    },
    openCreateDrawer() {
      this.drawerTitle = '新建规则';
      this.formData = {};
      this.drawerVisible = true;
    },
    handleConfig(item) {
      alert(`配置: ${item.name}`);
    },
    handleAlert(item) {
      alert(`订阅警报: ${item.name}`);
    },
    handleConfirm(data) {
      // Add logic to update mock data
      window.MockData.rules.unshift({
        id: Date.now(),
        ...data,
        callCount: '0万',
        status: 'running',
        updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
      });
      this.drawerVisible = false;
      this.$refs.table.reload();
    }
  }
};
