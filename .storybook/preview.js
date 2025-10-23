import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

// 注册 Vuetify 插件
Vue.use(Vuetify);

// 创建 Vuetify 实例
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});

// 预览页面的配置
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    description: {
      component: 'JianghuJS UI 组件库文档',
    },
  },
  layout: 'centered',
};

// 配置全局装饰器 - 为所有组件提供 Vuetify 上下文
export const decorators = [
  (story) => ({
    vuetify,
    components: { story },
    template: '<v-app><v-main><v-container><story /></v-container></v-main></v-app>',
  }),
];
