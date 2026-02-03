window.DashboardView = {
  template: `
    <div class="page-container">
      <!-- Top Statistics Cards -->
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <jh-statistic-card
            title="总销售额"
            :value="statistics.sales.value"
            prefix="¥"
            :trend="statistics.sales.trend"
            :trend-type="statistics.sales.trendType"
            description="周同比"
          >
             <template slot="footer">
                <span class="text--secondary">日销售额 ￥{{ statistics.sales.dailySales }}</span>
             </template>
          </jh-statistic-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <jh-statistic-card
            title="访问量"
            :value="statistics.visits.value"
            description="日访问量"
            :chart-option="visitChartOption"
          >
            <template slot="footer">
                <span class="text--secondary">日访问量 {{ statistics.visits.dailyVisits }}</span>
             </template>
          </jh-statistic-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <jh-statistic-card
            title="支付笔数"
            :value="statistics.payments.value"
            description="转化率 60%"
            :chart-option="paymentChartOption"
          >
             <template slot="footer">
                <span class="text--secondary">转化率 {{ statistics.payments.conversionRate }}</span>
             </template>
          </jh-statistic-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <jh-statistic-card
            title="运营活动效果"
            :value="statistics.activity.value"
            description="周同比"
            trend="12%"
            trend-type="up"
          >
            <template slot="footer">
               <v-progress-linear
                  :value="statistics.activity.progress"
                  color="primary"
                  height="6"
                  rounded
                ></v-progress-linear>
            </template>
          </jh-statistic-card>
        </v-col>
      </v-row>

      <!-- Main Chart Area -->
      <jh-card class="mt-4" :bordered="false">
        <div class="flex">
<v-tabs v-model="activeTab">
          <v-tab>销售额</v-tab>
          <v-tab>访问量</v-tab>
        </v-tabs>
        
        <v-tabs-items v-model="activeTab" class="mt-4">
          <v-tab-item>
            <div ref="mainChart" style="width: 100%; height: 300px;"></div>
          </v-tab-item>
          <v-tab-item>
            <h4 class="mb-4">门店销售额排名</h4>
            <ul class="rank-list">
              <li v-for="(item, index) in rankingList" :key="index">
                <span class="rank-index" :class="{ active: index < 3 }">{{ index + 1 }}</span>
                <span class="rank-name">{{ item.name }}</span>
                <span class="rank-value">{{ item.value }}</span>
              </li>
            </ul>
          </v-tab-item>
        </v-tabs-items>
        </div>
        
        
      </jh-card>
    </div>
  `,
  data() {
    return {
      statistics: window.MockData.statistics,
      rankingList: window.MockData.rankingList,
      salesTrend: window.MockData.salesTrend,
      activeTab: 0,
      mainChartInstance: null,
      
      // Mini charts options
      visitChartOption: {
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: { type: 'category', show: false },
        yAxis: { type: 'value', show: false },
        series: [{
          data: window.MockData.statistics.visits.chartData,
          type: 'line',
          smooth: true,
          areaStyle: { color: '#975fe4' },
          lineStyle: { color: '#975fe4' },
          symbol: 'none'
        }]
      },
      paymentChartOption: {
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: { type: 'category', show: false },
        yAxis: { type: 'value', show: false },
        series: [{
          data: window.MockData.statistics.payments.chartData,
          type: 'bar',
          itemStyle: { color: '#3ba1ff' }
        }]
      }
    };
  },
  watch: {
    activeTab() {
      this.updateMainChart();
    }
  },
  mounted() {
    this.initMainChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.mainChartInstance) {
      this.mainChartInstance.dispose();
    }
  },
  methods: {
    initMainChart() {
      if (this.$refs.mainChart) {
        this.mainChartInstance = echarts.init(this.$refs.mainChart);
        this.updateMainChart();
      }
    },
    updateMainChart() {
      if (!this.mainChartInstance) return;
      
      const isSales = this.activeTab === 0;
      const data = isSales ? this.salesTrend.sales : this.salesTrend.visits;
      const title = isSales ? '销售趋势' : '访问趋势';
      
      const option = {
        title: { text: title },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: this.salesTrend.dates
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data,
          type: 'bar',
          barWidth: '60%',
          itemStyle: { color: '#3aa1ff' }
        }],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      };
      
      this.mainChartInstance.setOption(option);
    },
    handleResize() {
      if (this.mainChartInstance) {
        this.mainChartInstance.resize();
      }
    }
  }
};
