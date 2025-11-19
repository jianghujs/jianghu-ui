// JianghuJS UI Component Library Entry Point

// Import global styles
import './style/storybook.css';
import './style/globalCSSVuetifyV4.css';
import './style/globalCSSJHV4.css';

// Basic Components
import JhMenu from './components/JhMenu/JhMenu.vue';
import JhScene from './components/JhScene/JhScene.vue';
import JhDateRangePicker from './components/JhDateRangePicker/JhDateRangePicker.vue';
import JhQueryFilter from './components/JhQueryFilter/JhQueryFilter.vue';
import JhTable from './components/JhTable/JhTable.vue';
import JhTreeSelect from './components/JhTreeSelect/JhTreeSelect.vue';

// Layout Components
import JhPageContainer from './components/JhPageContainer/JhPageContainer.vue';
import JhCard from './components/JhCard/JhCard.vue';

// Feedback Components
import JhMask from './components/JhMask/JhMask.vue';
import JhToast from './components/JhToast/JhToast.vue';
import JhConfirmDialog from './components/JhConfirmDialog/JhConfirmDialog.vue';

// Pro Components
import JhForm from './components/JhForm/JhForm.vue';
import JhModalForm from './components/JhModalForm/JhModalForm.vue';
import JhDrawerForm from './components/JhDrawerForm/JhDrawerForm.vue';
import JhModal from './components/JhModal/JhModal.vue';
import JhDrawer from './components/JhDrawer/JhDrawer.vue';
import JhStepsForm from './components/JhStepsForm/JhStepsForm.vue';
import JhFormList from './components/JhFormList/JhFormList.vue';

// Advanced Components
import JhFileInput from './components/JhFileInput/JhFileInput.vue';
import JhJsonEditor from './components/JhJsonEditor/JhJsonEditor.vue';
import JhMarkdownEditor from './components/JhMarkdownEditor/JhMarkdownEditor.vue';
import JhDraggable from './components/JhDraggable/JhDraggable.vue';
import JhTableAttachment from './components/JhTableAttachment/JhTableAttachment.vue';
import JhEditableTable from './components/JhEditableTable/JhEditableTable.vue';

const components = {
  JhMenu,
  JhScene,
  JhDateRangePicker,
  JhQueryFilter,
  JhTable,
  JhTreeSelect,
  // Layout Components
  JhPageContainer,
  JhCard,

  // Pro Components
  JhForm,
  JhModalForm,
  JhDrawerForm,
  JhModal,
  JhDrawer,
  JhStepsForm,
  JhFormList,
  // Advanced Components
  JhFileInput,
  JhJsonEditor,
  JhMarkdownEditor,
  JhDraggable,
  JhTableAttachment,
  JhEditableTable,

  // Feedback Components
  JhMask,
  JhToast,
  JhConfirmDialog,
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
  JhQueryFilter,
  JhTable,
  JhTreeSelect,
  // Layout Components
  JhPageContainer,
  JhCard,

  // Pro Components
  JhForm,
  JhModalForm,
  JhDrawerForm,
  JhModal,
  JhDrawer,
  JhStepsForm,
  JhFormList,
  // Advanced Components
  JhFileInput,
  JhJsonEditor,
  JhMarkdownEditor,
  JhDraggable,
  JhTableAttachment,
  JhEditableTable,

  // Feedback Components
  JhMask,
  JhToast,
  JhConfirmDialog,
};
