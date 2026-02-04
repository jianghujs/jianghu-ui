window.DepartmentListView = {
  template: `
    <div class="page-container">
      <jh-table
        :headers="headers"
        :items="items"
        :search="search"
        :loading="loading"
        title="部门管理"
      >
        <template v-slot:item.count="{ item }">
          <v-chip color="primary" small outlined>
            {{ item.count }} 人
          </v-chip>
        </template>
      </jh-table>
    </div>
  `,
  data() {
    return {
      search: '',
      loading: false,
      items: [],
      
      headers: [
        { text: '部门名称', value: 'name', align: 'start' },
        { text: '部门经理', value: 'manager' },
        { text: '人数', value: 'count' },
        { text: '办公地点', value: 'location' },
        { text: '成立时间', value: 'established' }
      ]
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.loading = true;
      setTimeout(() => {
        this.items = window.MockData.departments;
        this.loading = false;
      }, 300);
    }
  }
};
