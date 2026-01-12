import JhFormField from './JhFormField.vue';

export default {
  title: '数据录入/JhFormField - 单字段组件',
  component: JhFormField,
  parameters: {
    docs: {
      description: {
        component: '通用表单字段组件，通过type属性渲染不同类型的表单组件，支持Vuetify表单组件的所有参数。',
      },
    },
  },
};

// 基础用法
export const Basic = () => ({
  components: { JhFormField },
  data() {
    return {
      textValue: '',
      numberValue: 0,
      textareaValue: '',
      selectValue: '',
      autocompleteValue: '',
      switchValue: false,
      checkboxValue: false,
      radioValue: '',
      sliderValue: 50,
      rangeValue: [20, 80],
      dateValue: '',
      timeValue: '',
      colorValue: '#000000',
      items: [
        { text: '选项1', value: '1' },
        { text: '选项2', value: '2' },
        { text: '选项3', value: '3' },
        { text: '选项4', value: '4' }
      ]
    };
  },
  template: `
    <div class="pa-4">
      <h2 class="mb-4">JhFormField 基本用法</h2>
      
      <!-- 文本输入 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">文本输入框</h3>
        <jh-form-field type="text" v-model="textValue" label="文本输入" placeholder="请输入文本"></jh-form-field>
        <div class="mt-2">当前值: {{ textValue }}</div>
      </div>
      
      <!-- 数字输入 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">数字输入框</h3>
        <jh-form-field type="number" v-model="numberValue" label="数字输入" placeholder="请输入数字"></jh-form-field>
        <div class="mt-2">当前值: {{ numberValue }}</div>
      </div>
      
      <!-- 文本域 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">文本域</h3>
        <jh-form-field type="textarea" v-model="textareaValue" label="文本域" placeholder="请输入多行文本"></jh-form-field>
        <div class="mt-2">当前值: {{ textareaValue }}</div>
      </div>
      
      <!-- 下拉选择 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">下拉选择框</h3>
        <jh-form-field 
          type="select" 
          v-model="selectValue" 
          label="下拉选择" 
          :items="items"
          placeholder="请选择选项"
        ></jh-form-field>
        <div class="mt-2">当前值: {{ selectValue }}</div>
      </div>
      
      <!-- 自动完成 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">自动完成</h3>
        <jh-form-field 
          type="autocomplete" 
          v-model="autocompleteValue" 
          label="自动完成" 
          :items="items"
          placeholder="请输入或选择"
        ></jh-form-field>
        <div class="mt-2">当前值: {{ autocompleteValue }}</div>
      </div>
      
      <!-- 开关 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">开关</h3>
        <jh-form-field type="switch" v-model="switchValue" label="开关示例"></jh-form-field>
        <div class="mt-2">当前值: {{ switchValue ? '开启' : '关闭' }}</div>
      </div>
      
      <!-- 复选框 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">复选框</h3>
        <jh-form-field type="checkbox" v-model="checkboxValue" label="复选框示例"></jh-form-field>
        <div class="mt-2">当前值: {{ checkboxValue ? '选中' : '未选中' }}</div>
      </div>
      
      <!-- 单选按钮组 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">单选按钮组</h3>
        <jh-form-field 
          type="radio" 
          v-model="radioValue" 
          :items="items"
          label="单选按钮组示例"
        ></jh-form-field>
        <div class="mt-2">当前值: {{ radioValue }}</div>
      </div>
      
      <!-- 滑块 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">滑块</h3>
        <jh-form-field type="slider" v-model="sliderValue" label="滑块示例"></jh-form-field>
        <div class="mt-2">当前值: {{ sliderValue }}</div>
      </div>
      
      <!-- 区间滑块 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">区间滑块</h3>
        <jh-form-field type="range-slider" v-model="rangeValue" label="区间滑块示例"></jh-form-field>
        <div class="mt-2">当前值: {{ rangeValue[0] }} - {{ rangeValue[1] }}</div>
      </div>
      
      <!-- 日期选择器 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">日期选择器</h3>
        <jh-form-field type="date" v-model="dateValue" label="日期选择"></jh-form-field>
        <div class="mt-2">当前值: {{ dateValue }}</div>
      </div>
      
      <!-- 时间选择器 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">时间选择器</h3>
        <jh-form-field type="time" v-model="timeValue" label="时间选择"></jh-form-field>
        <div class="mt-2">当前值: {{ timeValue }}</div>
      </div>
      
      <!-- 颜色选择器 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">颜色选择器</h3>
        <jh-form-field type="color" v-model="colorValue" label="颜色选择"></jh-form-field>
        <div class="mt-2">当前值: {{ colorValue }}</div>
      </div>
    </div>
  `
});

// 不同样式
export const DifferentStyles = () => ({
  components: { JhFormField },
  data() {
    return {
      value1: '',
      value2: '',
      value3: ''
    };
  },
  template: `
    <div class="pa-4">
      <h2 class="mb-4">JhFormField 不同样式</h2>
      
      <!-- Filled 样式 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">Filled 样式</h3>
        <jh-form-field type="text" v-model="value1" label="Filled 样式" filled></jh-form-field>
      </div>
      
      <!-- Outlined 样式 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">Outlined 样式</h3>
        <jh-form-field type="text" v-model="value2" label="Outlined 样式" outlined></jh-form-field>
      </div>
      
      <!-- Dense 样式 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">Dense 样式</h3>
        <jh-form-field type="text" v-model="value3" label="Dense 样式" dense outlined></jh-form-field>
      </div>
    </div>
  `
});

// 禁用和只读
export const DisabledAndReadonly = () => ({
  components: { JhFormField },
  data() {
    return {
      value1: '禁用状态',
      value2: '只读状态'
    };
  },
  template: `
    <div class="pa-4">
      <h2 class="mb-4">JhFormField 禁用和只读</h2>
      
      <!-- 禁用状态 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">禁用状态</h3>
        <jh-form-field type="text" v-model="value1" label="禁用状态" disabled></jh-form-field>
      </div>
      
      <!-- 只读状态 -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">只读状态</h3>
        <jh-form-field type="text" v-model="value2" label="只读状态" readonly></jh-form-field>
      </div>
    </div>
  `
});
