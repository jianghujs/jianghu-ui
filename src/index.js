// JianghuJS UI Component Library Entry Point

// Import global styles
import './style/storybook.css';
import './style/globalCSSVuetifyV4.css';
import './style/globalCSSJHV4.css';

// Basic Components
import JhMenu from './components/JhMenu/JhMenu.vue';
import JhScene from './components/JhScene/JhScene.vue';
import JhDateRangePicker from './components/JhDateRangePicker/JhDateRangePicker.vue';

// Layout Components
import JhPageContainer from './components/JhPageContainer/JhPageContainer.vue';

// Feedback Components
import JhMask from './components/JhMask/JhMask.vue';
import JhToast from './components/JhToast/JhToast.vue';
import JhConfirmDialog from './components/JhConfirmDialog/JhConfirmDialog.vue';

// Pro Components
import JhProForm from './components/JhProForm/JhProForm.vue';
import JhProTable from './components/JhProTable/JhProTable.vue';
import JhModalForm from './components/JhModalForm/JhModalForm.vue';
import JhDrawerForm from './components/JhDrawerForm/JhDrawerForm.vue';

const components = {
  JhMenu,
  JhScene,
  JhDateRangePicker,
  // Layout Components
  JhPageContainer,
  // Feedback Components
  JhMask,
  JhToast,
  JhConfirmDialog,
  // Pro Components
  JhProForm,
  JhProTable,
  JhModalForm,
  JhDrawerForm,
};

// Vue plugin install function
const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;

  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};

// Auto-install when Vue is found (browser)
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components,
};

export {
  // Basic Components
  JhMenu,
  JhScene,
  JhDateRangePicker,
  // Layout Components
  JhPageContainer,
  // Feedback Components
  JhMask,
  JhToast,
  JhConfirmDialog,
  // Pro Components
  JhProForm,
  JhProTable,
  JhModalForm,
  JhDrawerForm,
};
