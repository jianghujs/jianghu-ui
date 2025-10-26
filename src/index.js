// JianghuJS UI Component Library Entry Point

// Basic Components
import JhForm from './components/JhForm/JhForm.vue';
import JhMenu from './components/JhMenu/JhMenu.vue';
import JhScene from './components/JhScene/JhScene.vue';
import JhDateRangePicker from './components/JhDateRangePicker/JhDateRangePicker.vue';

// Pro Components
import JhProForm from './components/JhProForm/JhProForm.vue';
import JhProTable from './components/JhProTable/JhProTable.vue';

const components = {
  JhForm,
  JhMenu,
  JhScene,
  JhDateRangePicker,
  // Pro Components
  JhProForm,
  JhProTable,
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
  JhForm,
  JhMenu,
  JhScene,
  JhDateRangePicker,
  // Pro Components
  JhProForm,
  JhProTable,
};
