<template>
  <div class="date-range-picker-container">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateRangeText"
          :prefix="prefix"
          prepend-inner-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          :filled="filled"
          :dense="dense"
          :outlined="outlined"
          :hide-details="hideDetails"
          :clearable="clearable"
          @click:clear="clearDateRange"
        ></v-text-field>
      </template>
      <v-card>
        <v-card-text class="pa-0">
          <div class="d-flex">
            <!-- 左侧快捷选择菜单 -->
            <v-list dense nav class="quick-select-list">
              <v-list-item
                @click="quickSelect(7)"
                :class="{ 'v-item--active v-list-item--active primary--text': isLast7Days }"
              >
                <v-list-item-title>最近7天</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="quickSelect(30)"
                :class="{ 'v-item--active v-list-item--active primary--text': isLast30Days }"
              >
                <v-list-item-title>最近30天</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="quickSelect(90)"
                :class="{ 'v-item--active v-list-item--active primary--text': isLast90Days }"
              >
                <v-list-item-title>最近90天</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="selectThisMonth"
                :class="{ 'v-item--active v-list-item--active primary--text': isThisMonth }"
              >
                <v-list-item-title>本月</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="selectLastMonth"
                :class="{ 'v-item--active v-list-item--active primary--text': isLastMonth }"
              >
                <v-list-item-title>上月</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="quickSelect(365)"
                :class="{ 'v-item--active v-list-item--active primary--text': isLast365Days }"
              >
                <v-list-item-title>最近一年</v-list-item-title>
              </v-list-item>
            </v-list>

            <!-- 日期选择器 -->
            <v-date-picker v-model="tempDateRange" no-title range color="primary"></v-date-picker>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="cancelDateRange">取消</v-btn>
          <v-btn text color="primary" @click="confirmDateRange">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'JhDateRangePicker',
  props: {
    // v-model 绑定值
    value: {
      type: Array,
      default: () => [],
    },
    // 前缀文本
    prefix: {
      type: String,
      default: '',
    },
    // 填充样式
    filled: {
      type: Boolean,
      default: true,
    },
    // 紧凑模式
    dense: {
      type: Boolean,
      default: true,
    },
    // 轮廓样式
    outlined: {
      type: Boolean,
      default: false,
    },
    // 隐藏详情
    hideDetails: {
      type: Boolean,
      default: true,
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      menu: false,
      dateRange: [],
      tempDateRange: [],
    };
  },
  computed: {
    dateRangeText() {
      if (!this.dateRange || this.dateRange.length !== 2) return '';
      return `${this.formatDate(this.dateRange[0])} ~ ${this.formatDate(this.dateRange[1])}`;
    },
    isLast7Days() {
      if (!this.tempDateRange || this.tempDateRange.length !== 2) return false;
      const today = this.getToday();
      const last7Days = this.subtractDays(7);
      return this.tempDateRange[0] === last7Days && this.tempDateRange[1] === today;
    },
    isLast30Days() {
      if (!this.tempDateRange || this.tempDateRange.length !== 2) return false;
      const today = this.getToday();
      const last30Days = this.subtractDays(30);
      return this.tempDateRange[0] === last30Days && this.tempDateRange[1] === today;
    },
    isLast90Days() {
      if (!this.tempDateRange || this.tempDateRange.length !== 2) return false;
      const today = this.getToday();
      const last90Days = this.subtractDays(90);
      return this.tempDateRange[0] === last90Days && this.tempDateRange[1] === today;
    },
    isThisMonth() {
      if (!this.tempDateRange || this.tempDateRange.length !== 2) return false;
      const today = this.getToday();
      const firstDayOfMonth = this.getStartOfMonth();
      return this.tempDateRange[0] === firstDayOfMonth && this.tempDateRange[1] === today;
    },
    isLastMonth() {
      if (!this.tempDateRange || this.tempDateRange.length !== 2) return false;
      const lastMonthStart = this.getStartOfLastMonth();
      const lastMonthEnd = this.getEndOfLastMonth();
      return this.tempDateRange[0] === lastMonthStart && this.tempDateRange[1] === lastMonthEnd;
    },
    isLast365Days() {
      if (!this.tempDateRange || this.tempDateRange.length !== 2) return false;
      const today = this.getToday();
      const last365Days = this.subtractDays(365);
      return this.tempDateRange[0] === last365Days && this.tempDateRange[1] === today;
    },
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal && Array.isArray(newVal) && newVal.length === 2) {
          this.dateRange = [...newVal];
          this.tempDateRange = [...newVal];
        }
      },
      immediate: true,
    },
    menu(val) {
      if (val) {
        // 打开菜单时，将当前选择复制到临时变量
        this.tempDateRange = this.dateRange.length === 2 ? [...this.dateRange] : [];
      }
    },
  },
  mounted() {
    if (this.value && Array.isArray(this.value) && this.value.length === 2) {
      this.dateRange = [...this.value];
      this.tempDateRange = [...this.value];
    }
  },
  methods: {
    // 格式化日期
    formatDate(date) {
      if (!date) return '';
      return date;
    },

    // 获取今天日期
    getToday() {
      const date = new Date();
      return this.toDateString(date);
    },

    // 减去天数
    subtractDays(days) {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return this.toDateString(date);
    },

    // 获取本月第一天
    getStartOfMonth() {
      const date = new Date();
      return this.toDateString(new Date(date.getFullYear(), date.getMonth(), 1));
    },

    // 获取上月第一天
    getStartOfLastMonth() {
      const date = new Date();
      return this.toDateString(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    },

    // 获取上月最后一天
    getEndOfLastMonth() {
      const date = new Date();
      return this.toDateString(new Date(date.getFullYear(), date.getMonth(), 0));
    },

    // 转换为日期字符串
    toDateString(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    // 确认日期范围
    confirmDateRange() {
      if (this.tempDateRange && this.tempDateRange.length === 2) {
        // 确保日期顺序正确
        const sortedRange = [...this.tempDateRange].sort();
        this.dateRange = sortedRange;
        this.$emit('input', this.dateRange);
        this.$emit('change', this.dateRange);
      }
      this.menu = false;
    },

    // 取消选择
    cancelDateRange() {
      // 取消时恢复原来的选择
      this.tempDateRange = this.dateRange.length === 2 ? [...this.dateRange] : [];
      this.menu = false;
    },

    // 清除日期范围
    clearDateRange() {
      this.dateRange = [];
      this.tempDateRange = [];
      this.$emit('input', []);
      this.$emit('change', []);
    },

    // 快速选择最近N天
    quickSelect(days) {
      const today = this.getToday();
      const start = this.subtractDays(days);
      this.tempDateRange = [start, today];
    },

    // 选择本月
    selectThisMonth() {
      const today = this.getToday();
      const start = this.getStartOfMonth();
      this.tempDateRange = [start, today];
    },

    // 选择上月
    selectLastMonth() {
      const start = this.getStartOfLastMonth();
      const end = this.getEndOfLastMonth();
      this.tempDateRange = [start, end];
    },
  },
};
</script>

<style scoped>
.date-range-picker-container {
  position: relative;
}

.quick-select-list {
  min-width: 100px;
  border-right: 1px solid #e0e0e0;
}

.quick-select-list >>> .v-item--active {
  background-color: rgba(25, 118, 210, 0.12);
}
</style>
