window.CandidateListView = {
  template: `
    <div class="page-container">
      <jh-table
        :headers="headers"
        :items="items"
        :search="search"
        :loading="loading"
        title="招聘管理"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" small dark>
            {{ getStatusText(item.status) }}
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
        { text: '候选人姓名', value: 'name', align: 'start' },
        { text: '应聘职位', value: 'position' },
        { text: '当前状态', value: 'status' },
        { text: '工作经验', value: 'experience' },
        { text: '学历', value: 'education' },
        { text: '申请日期', value: 'applyDate' }
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
        this.items = window.MockData.candidates;
        this.loading = false;
      }, 300);
    },
    
    getStatusColor(status) {
      const map = {
        new: 'blue',
        screening: 'cyan',
        interview: 'purple',
        offer: 'green',
        hired: 'success',
        rejected: 'grey'
      };
      return map[status] || 'grey';
    },
    
    getStatusText(status) {
      const map = {
        new: '新申请',
        screening: '筛选中',
        interview: '面试中',
        offer: '发Offer',
        hired: '已入职',
        rejected: '已淘汰'
      };
      return map[status] || status;
    }
  }
};
