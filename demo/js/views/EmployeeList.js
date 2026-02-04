window.EmployeeListView = {
  template: `
    <div class="page-container">
      <jh-table
        v-model="selected"
        :headers="headers"
        :items="items"
        :search="search"
        :loading="loading"
        show-select
        title="员工管理"
      >
        <template v-slot:toolbar-actions>
          <v-btn color="primary" @click="handleCreate">
            <v-icon left>mdi-plus</v-icon>新建员工
          </v-btn>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" small dark>
            {{ getStatusText(item.status) }}
          </v-chip>
        </template>

        <template v-slot:item.action="{ item }">
          <v-btn small text color="primary" class="mr-2" @click="editItem(item)">
            编辑
          </v-btn>
          <v-btn small text color="error" @click="deleteItem(item)">
            删除
          </v-btn>
        </template>
      </jh-table>

      <jh-drawer-form
        v-model="drawerVisible"
        :title="formTitle"
        :fields="formFields"
        :initial-data="formData"
        @confirm="handleSave"
        @cancel="drawerVisible = false"
      ></jh-drawer-form>
    </div>
  `,
  data() {
    return {
      selected: [],
      search: '',
      loading: false,
      items: [],
      drawerVisible: false,
      editedIndex: -1,
      formData: {},
      
      headers: [
        { text: '工号', value: 'id', align: 'start' },
        { text: '姓名', value: 'name' },
        { text: '部门', value: 'department' },
        { text: '职位', value: 'position' },
        { text: '状态', value: 'status' },
        { text: '入职日期', value: 'joinDate' },
        { text: '联系方式', value: 'phone' },
        { text: '操作', value: 'action', sortable: false, width: 150 }
      ],
      
      formFields: [
        { key: 'name', label: '姓名', type: 'text', rules: [v => !!v || '必填'] },
        { 
          key: 'department', 
          label: '部门', 
          type: 'select', 
          options: ['研发部', '销售部', '市场部', '人事部', '运营部'],
          rules: [v => !!v || '必填']
        },
        { key: 'position', label: '职位', type: 'text', rules: [v => !!v || '必填'] },
        { 
          key: 'status', 
          label: '状态', 
          type: 'select',
          options: [
            { text: '在职', value: 'active' },
            { text: '试用期', value: 'probation' },
            { text: '离职', value: 'leave' }
          ],
          rules: [v => !!v || '必填']
        },
        { key: 'joinDate', label: '入职日期', type: 'date' },
        { key: 'email', label: '邮箱', type: 'text' },
        { key: 'phone', label: '手机号', type: 'text' }
      ]
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新建员工' : '编辑员工';
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.loading = true;
      // Simulate API call
      setTimeout(() => {
        this.items = JSON.parse(JSON.stringify(window.MockData.employees));
        this.loading = false;
      }, 500);
    },
    
    getStatusColor(status) {
      if (status === 'active') return 'success';
      if (status === 'probation') return 'warning';
      return 'grey';
    },
    
    getStatusText(status) {
      const map = { active: '在职', probation: '试用期', leave: '离职' };
      return map[status] || status;
    },
    
    handleCreate() {
      this.editedIndex = -1;
      this.formData = {
        status: 'active',
        joinDate: new Date().toISOString().substr(0, 10)
      };
      this.drawerVisible = true;
    },
    
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.formData = Object.assign({}, item);
      this.drawerVisible = true;
    },
    
    deleteItem(item) {
      if (confirm('确定要删除该员工吗？')) {
        const index = this.items.indexOf(item);
        this.items.splice(index, 1);
        // Sync with mock data
        window.MockData.employees = this.items;
      }
    },
    
    handleSave(data) {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], data);
      } else {
        // Generate new ID
        const newId = `EMP${String(this.items.length + 1).padStart(4, '0')}`;
        this.items.unshift({ ...data, id: newId });
      }
      
      // Sync with mock data
      window.MockData.employees = this.items;
      this.drawerVisible = false;
    }
  }
};
