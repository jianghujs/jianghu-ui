window.SalaryStatisticsView = {
  template: `
    <div class="page-container">
      <v-row>
        <v-col cols="12">
          <jh-card title="各部门薪资支出分析">
            <div ref="deptBarChart" style="width: 100%; height: 400px;"></div>
          </jh-card>
        </v-col>
        <v-col cols="12" class="mt-4">
          <jh-card title="年度薪资支出趋势">
            <div ref="trendLineChart" style="width: 100%; height: 400px;"></div>
          </jh-card>
        </v-col>
      </v-row>
    </div>
  `,
  data() {
    return {
      stats: window.MockData.salaryStats,
      deptBarChartInstance: null,
      trendLineChartInstance: null
    };
  },
  mounted() {
    this.initCharts();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.deptBarChartInstance) this.deptBarChartInstance.dispose();
    if (this.trendLineChartInstance) this.trendLineChartInstance.dispose();
  },
  methods: {
    initCharts() {
      // Department Salary Bar Chart
      if (this.$refs.deptBarChart) {
        this.deptBarChartInstance = echarts.init(this.$refs.deptBarChart);
        this.deptBarChartInstance.setOption({
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
          xAxis: {
            type: 'category',
            data: this.stats.departmentSalary.map(i => i.name),
            axisTick: { alignWithLabel: true }
          },
          yAxis: { type: 'value', name: '平均薪资 (元)' },
          series: [{
            name: '平均薪资',
            type: 'bar',
            barWidth: '60%',
            data: this.stats.departmentSalary.map(i => i.value),
            itemStyle: { color: '#5470c6' }
          }]
        });
      }

      // Yearly Trend Line Chart
      if (this.$refs.trendLineChart) {
        this.trendLineChartInstance = echarts.init(this.$refs.trendLineChart);
        this.trendLineChartInstance.setOption({
          tooltip: { trigger: 'axis' },
          grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.stats.yearlyTrend.months
          },
          yAxis: { type: 'value', name: '总支出 (万元)' },
          series: [{
            name: '薪资总支出',
            type: 'line',
            stack: 'Total',
            smooth: true,
            areaStyle: { opacity: 0.3 },
            data: this.stats.yearlyTrend.values,
            itemStyle: { color: '#91cc75' }
          }]
        });
      }
    },
    handleResize() {
      if (this.deptBarChartInstance) this.deptBarChartInstance.resize();
      if (this.trendLineChartInstance) this.trendLineChartInstance.resize();
    }
  }
};
