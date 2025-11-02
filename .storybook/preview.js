import Vue from 'vue';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

// Import global custom styles
import '../src/style/globalCSSVuetifyV4.css';
import '../src/style/globalCSSJHV4.css';
import '../src/style/storybook.css';

// Import Tailwind CSS
import '../src/tailwind.css';

// 注册 Vuetify 插件
Vue.use(Vuetify);

// 全局注册 vuedraggable 组件
if (window.vuedraggable) {
  Vue.component('draggable', window.vuedraggable);
}

// 创建 Vuetify 实例
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4caf50',
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

export default {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      codePanel: true,
      description: {
        component: 'JianghuJS UI 组件库文档',
      },
    },
    layout: 'fullscreen',

   
  },
   initialGlobals: {
    viewport: { value: 'ipad', isRotated: false },
  },
  decorators: [
    (story) => ({
      vuetify,
      components: { story },
      template: '<v-app class="preview-page"><v-main class="pa-3 pb-6"><v-container fluid class="pa-0"><story /></v-container></v-main></v-app>',
    }),
  ]
}
