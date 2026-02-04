// Router Configuration
const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: window.DashboardView },
  { path: '/form', component: window.FormView },
  { path: '/table', component: window.TableView },
  { path: '/projects', component: window.ProjectListView },
  
  // HR System Routes
  { path: '/hr-dashboard', component: window.HrDashboardView },
  { path: '/employees', component: window.EmployeeListView },
  { path: '/departments', component: window.DepartmentListView },
  { path: '/candidates', component: window.CandidateListView },
  { path: '/salary-stats', component: window.SalaryStatisticsView },

  // New Feature Routes
  { path: '/quick-entry', component: window.QuickEntryView },
  { path: '/business-demo', component: window.BusinessDemoView }
];

const router = new VueRouter({
  routes
});

// App Instance
new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify(),
  data: () => ({
    currentPath: '/dashboard',
    layout: 'mix',
    menuData: [
      {
        path: '',
        title: '系统演示',
        icon: 'mdi-monitor-dashboard',
        children: [
          {
            path: '/dashboard',
            title: '工作台',
            icon: 'mdi-view-dashboard',
          },
          {
            path: '/form',
            title: '表单页',
            icon: 'mdi-form-select',
          },
          {
            path: '/table',
            title: '查询表格',
            icon: 'mdi-table-search',
          },
          {
            path: '/projects',
            title: '项目列表',
            icon: 'mdi-table',
          }
        ]
      },
      {
        path: '',
        title: '人力资源',
        icon: 'mdi-account-group-outline',
        children: [
          {
            path: '/hr-dashboard',
            title: 'HR工作台',
            icon: 'mdi-monitor-dashboard',
          },
          {
            path: '/employees',
            title: '员工管理',
            icon: 'mdi-account-group',
          },
          {
            path: '/quick-entry',
            title: '快速入职',
            icon: 'mdi-account-plus',
          },
          {
            path: '/departments',
            title: '部门管理',
            icon: 'mdi-domain',
          },
          {
            path: '/candidates',
            title: '招聘管理',
            icon: 'mdi-account-search',
          },
          {
            path: '/salary-stats',
            title: '薪资分析',
            icon: 'mdi-chart-bar',
          }
        ]
      },
      {
        path: '',
        title: '业务组件',
        icon: 'mdi-widgets',
        children: [
          {
            path: '/business-demo',
            title: '组件演示',
            icon: 'mdi-view-list',
          },
          {
            path: '/profile',
            title: '个人中心',
            icon: 'mdi-account',
          }
        ]
      }
    ],
    userInfo: {
      username: 'Admin',
      avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light'
    }
  }),
  watch: {
    '$route'(to) {
      this.currentPath = to.path;
    }
  },
  methods: {
    handleMenuClick(item) {
      if (item.path && item.path !== this.$route.path) {
        this.$router.push(item.path);
      }
    },
    handleLogout() {
      alert('Logout clicked');
    }
  },
  template: `
    <jh-layout
      title="JianghuUI"
      logo="mdi-rocket-launch"
      :layout="layout"
      :menu-data="menuData"
      :current-path="currentPath"
      :user-info="userInfo"
      :show-breadcrumb="true"
      :show-footer="true"
      footer-text="© 2024 JianghuJS Dashboard Demo"
      @menu-click="handleMenuClick"
      @logout="handleLogout"
    >
      <router-view></router-view>
    </jh-layout>
  `
});
