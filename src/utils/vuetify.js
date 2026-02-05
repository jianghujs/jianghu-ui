// Vuetify 实例创建工具
// 由于使用 CDN 方式引入，Vuetify 会挂载到 window.Vuetify 上

// 默认主题配置
export const defaultTheme = {
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
};

export function createVuetifyInstance(options = {}) {
  if (typeof window !== 'undefined' && window.Vuetify) {
    // 合并用户传入的主题配置与默认主题
    const userTheme = options.theme || {};
    const mergedTheme = {
      ...userTheme,
      themes: {
        ...defaultTheme.themes,
        ...(userTheme.themes || {}),
        light: {
          ...defaultTheme.themes.light,
          ...(userTheme.themes?.light || {}),
        },
      },
    };

    return new window.Vuetify({
      icons: {
        iconfont: 'mdi',
      },
      ...options,
      theme: mergedTheme,
    });
  }

  console.warn('Vuetify is not available. Make sure to include Vuetify CDN in your HTML.');
  return null;
}

export default createVuetifyInstance;
