// JianghuJS UI Component Library Entry Point
import JhButton from './components/JhButton/JhButton.vue';
import JhCard from './components/JhCard/JhCard.vue';
import JhTable from './components/JhTable/JhTable.vue';
import JhForm from './components/JhForm/JhForm.vue';
import JhMenu from './components/JhMenu/JhMenu.vue';
import JhScene from './components/JhScene/JhScene.vue';
import JhDateRangePicker from './components/JhDateRangePicker/JhDateRangePicker.vue';

const components = {
  JhButton,
  JhCard,
  JhTable,
  JhForm,
  JhMenu,
  JhScene,
  JhDateRangePicker,
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
  JhButton,
  JhCard,
  JhTable,
  JhForm,
  JhMenu,
  JhScene,
  JhDateRangePicker,
};
