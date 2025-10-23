// Vuetify 实例创建工具
// 由于使用 CDN 方式引入，Vuetify 会挂载到 window.Vuetify 上

export function createVuetifyInstance(options = {}) {
  if (typeof window !== 'undefined' && window.Vuetify) {
    return new window.Vuetify({
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
      ...options,
    });
  }

  console.warn('Vuetify is not available. Make sure to include Vuetify CDN in your HTML.');
  return null;
}

export default createVuetifyInstance;
