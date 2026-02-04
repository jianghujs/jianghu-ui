// Router Configuration
const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: window.DashboardView },
  { path: '/form', component: window.FormView },
  { path: '/table', component: window.TableView },
  { path: '/profile', component: window.ProfileView },
  { path: '/projects', component: window.ProjectListView }
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
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'mdi-view-dashboard',
        title: '工作台'
      },
      {
        path: '/form',
        name: 'Form',
        icon: 'mdi-form-select',
        title: '表单页'
      },
      {
        path: '/table',
        name: 'Table',
        icon: 'mdi-table-search',
        title: '查询表格'
      },
      {
        path: '/projects',
        name: 'Projects',
        icon: 'mdi-table',
        title: '项目列表'
      },
      {
        path: '/profile',
        name: 'Profile',
        icon: 'mdi-account',
        title: '个人中心'
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
