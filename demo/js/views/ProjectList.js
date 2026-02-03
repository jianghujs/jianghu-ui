window.ProjectListView = {
  template: `
    <div class="project-list-container">
      <jh-table
        ref="table"
        header-title="项目列表"
        :headers="headers"
        :request="loadData"
        :show-search="true"
        :show-select="true"
        :toolbar="{
          search: true,
          refresh: true,
          density: true,
          setting: true
        }"
        @create-click="openCreateDrawer"
      >
        <template v-slot:toolbar-actions>
           <v-btn color="primary" small @click="openCreateDrawer">
             <v-icon left small>mdi-plus</v-icon>新建
           </v-btn>
        </template>
        
        <template v-slot:item.status="{ item }">
          <v-chip small :color="getStatusColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.action="{ item }">
          <a @click="openEditDrawer(item)">编辑</a>
          <v-divider vertical class="mx-2"></v-divider>
          <a class="red--text" @click="deleteItem(item)">删除</a>
        </template>
      </jh-table>

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
      headers: [
        { text: '项目名称', value: 'name' },
        { text: '负责人', value: 'owner' },
        { text: '状态', value: 'status' },
        { text: '优先级', value: 'priority' },
        { text: '成员数', value: 'members' },
        { text: '更新时间', value: 'updatedAt' },
        { text: '操作', value: 'action', sortable: false, width: 120 }
      ],
      formFields: [
        { key: 'name', label: '项目名称', required: true },
        { key: 'owner', label: '负责人', required: true },
        { 
          key: 'status', 
          label: '状态', 
          type: 'select', 
          options: [
            { text: 'Planning', value: 'planning' },
            { text: 'Running', value: 'running' },
            { text: 'Finished', value: 'finished' }
          ] 
        },
        { 
          key: 'priority', 
          label: '优先级', 
          type: 'select', 
          options: ['high', 'medium', 'low'] 
        },
        { key: 'members', label: '成员数', type: 'number' }
      ],
      drawerVisible: false,
      drawerTitle: '新建项目',
      formData: {},
      isEdit: false
    };
  },
  methods: {
    async loadData(params) {
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => {
          let data = window.MockData.projects;
          if (params.keyword) {
            data = data.filter(item => item.name.includes(params.keyword));
          }
          resolve({
            data: data,
            total: data.length
          });
        }, 300);
      });
    },
    getStatusColor(status) {
      const map = {
        running: 'blue',
        planning: 'orange',
        finished: 'green'
      };
      return map[status] || 'grey';
    },
    openCreateDrawer() {
      this.drawerTitle = '新建项目';
      this.formData = {};
      this.isEdit = false;
      this.drawerVisible = true;
    },
    openEditDrawer(item) {
      this.drawerTitle = '编辑项目';
      this.formData = { ...item };
      this.isEdit = true;
      this.drawerVisible = true;
    },
    handleConfirm(data) {
      if (this.isEdit) {
        // Update mock data
        const index = window.MockData.projects.findIndex(p => p.id === this.formData.id);
        if (index > -1) {
          window.MockData.projects[index] = { ...window.MockData.projects[index], ...data };
        }
      } else {
        // Add mock data
        window.MockData.projects.unshift({
          id: Date.now(),
          ...data,
          updatedAt: new Date().toISOString().split('T')[0]
        });
      }
      this.drawerVisible = false;
      this.$refs.table.reload();
    },
    deleteItem(item) {
      if (confirm('确认删除?')) {
        window.MockData.projects = window.MockData.projects.filter(p => p.id !== item.id);
        this.$refs.table.reload();
      }
    }
  }
};
