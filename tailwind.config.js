/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './.storybook/**/*.{js,jsx,ts,tsx}',
  ],
  important: true, // 增加 Tailwind 样式的优先级，避免被 Vuetify 覆盖
  theme: {
    extend: {},
  },
  plugins: [],
  // 禁用 preflight 以避免与 Vuetify 的基础样式冲突
  corePlugins: {
    preflight: true,
  },
};
