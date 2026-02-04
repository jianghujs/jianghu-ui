window.HrDashboardView = {
  template: `
    <div class="page-container">
      <!-- Top Statistics Cards -->
      <v-row>
        <v-col cols="12" sm="4">
          <jh-statistic-card
            title="员工总数"
            :value="stats.totalEmployees.value"
            :trend="stats.totalEmployees.trend"
            :trend-type="stats.totalEmployees.trendType"
            description="较上月"
          >
            <template slot="footer">
              <span class="text--secondary">本月新入职 {{ stats.totalEmployees.newHires }} 人</span>
            </template>
          </jh-statistic-card>
        </v-col>
        <v-col cols="12" sm="4">
          <jh-statistic-card
            title="招聘进度"
            :value="stats.recruitment.value + ' / ' + stats.recruitment.target"
            description="招聘完成率"
          >
            <template slot="footer">
               <v-progress-linear
                  :value="stats.recruitment.progress"
                  color="success"
                  height="6"
                  rounded
                  class="mt-2"
                ></v-progress-linear>
                <div class="d-flex justify-space-between mt-1 caption">
                  <span>完成率 {{ stats.recruitment.progress }}%</span>
                  <span>面试总数 {{ stats.recruitment.interviews }}</span>
                </div>
            </template>
          </jh-statistic-card>
        </v-col>
        <v-col cols="12" sm="4">
          <jh-statistic-card
            title="离职率"
            :value="stats.turnover.value"
            :trend="stats.turnover.trend"
            :trend-type="stats.turnover.trendType"
            description="环比下降"
          >
             <template slot="footer">
                <span class="text--secondary">本月离职 {{ stats.turnover.leavers }} 人</span>
             </template>
          </jh-statistic-card>
        </v-col>
      </v-row>

      <!-- Charts Area -->
      <v-row class="mt-4">
        <v-col cols="12" md="6">
          <jh-card title="部门人数分布" class="fill-height">
            <div ref="deptChart" style="width: 100%; height: 350px;"></div>
          </jh-card>
        </v-col>
        <v-col cols="12" md="6">
          <jh-card title="招聘漏斗" class="fill-height">
            <div ref="funnelChart" style="width: 100%; height: 350px;"></div>
          </jh-card>
        </v-col>
      </v-row>
    </div>
  `,
  data() {
    return {
      stats: window.MockData.hrStats,
      deptChartInstance: null,
      funnelChartInstance: null
    };
  },
  mounted() {
    this.initCharts();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.deptChartInstance) this.deptChartInstance.dispose();
    if (this.funnelChartInstance) this.funnelChartInstance.dispose();
  },
  methods: {
    initCharts() {
      // Department Distribution Chart
      if (this.$refs.deptChart) {
        this.deptChartInstance = echarts.init(this.$refs.deptChart);
        this.deptChartInstance.setOption({
          tooltip: { trigger: 'item' },
          legend: { top: '5%', left: 'center' },
          series: [{
            name: '部门人数',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: { show: false, position: 'center' },
            emphasis: {
              label: { show: true, fontSize: 20, fontWeight: 'bold' }
            },
            labelLine: { show: false },
            data: this.stats.departmentDist
          }]
        });
      }

      // Recruitment Funnel Chart
      if (this.$refs.funnelChart) {
        this.funnelChartInstance = echarts.init(this.$refs.funnelChart);
        this.funnelChartInstance.setOption({
          tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}' },
          toolbox: {
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            }
          },
          legend: { data: this.stats.funnel.map(i => i.name) },
          series: [
            {
              name: '招聘漏斗',
              type: 'funnel',
              left: '10%',
              top: 60,
              bottom: 60,
              width: '80%',
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: { show: true, position: 'inside' },
              labelLine: { length: 10, lineStyle: { width: 1, type: 'solid' } },
              itemStyle: { borderColor: '#fff', borderWidth: 1 },
              emphasis: { label: { fontSize: 20 } },
              data: this.stats.funnel
            }
          ]
        });
      }
    },
    handleResize() {
      if (this.deptChartInstance) this.deptChartInstance.resize();
      if (this.funnelChartInstance) this.funnelChartInstance.resize();
    }
  }
};
