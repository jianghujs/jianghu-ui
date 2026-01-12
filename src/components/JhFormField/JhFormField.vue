<template>
  <!-- 日期选择器 -->
  <v-menu
    v-if="type === 'date'"
    v-model="dateMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="internalValue"
        :dense="dense"
        :filled="filled"
        :outlined="outlined"
        :disabled="disabled"
        :single-line="singleLine"
        :placeholder="placeholder"
        :hide-details="hideDetails"
        :rules="rules"
        readonly
        class="jh-v-input"
        v-bind="{ ...attrs, ...customProps }"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="internalValue"
      @input="handleDateInput"
      :locale="locale"
      v-bind="pickerProps"
    ></v-date-picker>
  </v-menu>

  <!-- 时间选择器 -->
  <v-menu
    v-else-if="type === 'time'"
    v-model="timeMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="internalValue"
        :dense="dense"
        :filled="filled"
        :outlined="outlined"
        :disabled="disabled"
        :placeholder="placeholder"
        :hide-details="hideDetails"
        :rules="rules"
        readonly
        class="jh-v-input"
        v-bind="{ ...attrs, ...customProps }"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-model="internalValue"
      @input="handleTimeInput"
      format="24hr"
      v-bind="pickerProps"
    ></v-time-picker>
  </v-menu>

  <!-- 颜色选择器 -->
  <v-menu
    v-else-if="type === 'color'"
    v-model="colorMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="320px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="internalValue"
        :dense="dense"
        :filled="filled"
        :outlined="outlined"
        :disabled="disabled"
        :placeholder="placeholder"
        :hide-details="hideDetails"
        :rules="rules"
        readonly
        class="jh-v-input"
        v-on="on"
        v-bind="{ ...attrs, ...customProps }"
      >
        <template v-slot:append>
          <span
            class="jh-color-preview"
            :style="{ backgroundColor: internalValue || '#ffffff' }"
          ></span>
        </template>
      </v-text-field>
    </template>
    <v-color-picker
      v-model="internalValue"
      flat
      :hide-mode-switch="hideModeSwitch"
      @input="handleColorInput"
      v-bind="pickerProps"
    ></v-color-picker>
  </v-menu>

  <!-- 其他表单组件 -->
  <component
    v-else
    :is="getComponentName"
    v-model="internalValue"
    class="jh-v-input"
    v-bind="componentProps"
    v-on="componentListeners"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'JhFormField',

  props: {
    type: {
      type: String,
      default: 'text',
      validator: (v) => [
        'text', 'number', 'password', 'textarea', 'number', 'select', 'autocomplete', 
        'date', 'time', 'color', 'slider', 'range-slider',
        'switch', 'checkbox', 'radio'
      ].includes(v)
    },
    value: {
      type: [String, Number, Boolean, Array, Date, Object],
      default: null
    },
    // 通用属性
    dense: {
      type: Boolean,
      default: true
    },
    filled: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    singleLine: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    },
    hideDetails: {
      type: [Boolean, String],
      default: false
    },
    // select/autocomplete/radio 相关属性
    items: {
      type: Array,
      default: () => []
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    chips: {
      type: Boolean,
      default: false
    },
    // slider 相关属性
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    thumbLabel: {
      type: Boolean,
      default: false
    },
    ticks: {
      type: Boolean,
      default: false
    },
    tickSize: {
      type: Number,
      default: 5
    },
    // 开关/复选框/单选框相关属性
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
    // 单选按钮组相关属性
    row: {
      type: Boolean,
      default: true
    },
    // 文本域相关属性
    rows: {
      type: Number,
      default: 3
    },
    singleLine: {
      type: Boolean,
      default: undefined
    },
    // 日期选择器相关属性
    locale: {
      type: String,
      default: 'zh-cn'
    },
    // 颜色选择器相关属性
    hideModeSwitch: {
      type: Boolean,
      default: true
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    // 前缀后缀
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      internalValue: this.value,
      dateMenu: false,
      timeMenu: false,
      colorMenu: false
    };
  },

  computed: {
    getComponentName() {
      switch (this.type) {
        case 'textarea':
          return 'v-textarea';
        case 'select':
          return 'v-select';
        case 'autocomplete':
          return 'v-autocomplete';
        case 'switch':
          return 'v-switch';
        case 'checkbox':
          return 'v-checkbox';
        case 'radio':
          return 'v-radio-group';
        case 'slider':
          return 'v-slider';
        case 'range-slider':
          return 'v-range-slider';
        default:
          return 'v-text-field';
      }
    },
    componentProps() {
      // 基础属性
      const props = {
        dense: this.dense,
        filled: this.filled,
        outlined: this.outlined,
        disabled: this.disabled,
        readonly: this.readonly,
        placeholder: this.placeholder,
        rules: this.rules,
        hideDetails: this.hideDetails,
        color: this.color
      };

      // 类型特定属性
      switch (this.type) {
        case 'text':
        case 'number':
        case 'password':
        case 'textarea':
          props.singleLine = this.singleLine;
          props.prefix = this.prefix;
          props.suffix = this.suffix;
          if (this.type === 'number') {
            props.type = 'number';
          }
          if (this.type === 'textarea') {
            props.rows = this.rows;
          }
          break;

        case 'select':
        case 'autocomplete':
          props.items = this.items;
          props.itemText = this.itemText;
          props.itemValue = this.itemValue;
          props.multiple = this.multiple;
          props.chips = this.chips;
          break;

        case 'radio':
          props.row = this.row;
          break;

        case 'checkbox':
        case 'switch':
          props.label = this.label;
          break;

        case 'slider':
        case 'range-slider':
          props.min = this.min;
          props.max = this.max;
          props.step = this.step;
          props.thumbLabel = this.thumbLabel;
          props.ticks = this.ticks;
          props.tickSize = this.tickSize;
          break;
      }

      // 透传其他自定义属性
      return { ...props, ...this.customProps };
    },
    componentListeners() {
      return {
        ...this.$listeners,
        input: (val) => {
          this.internalValue = val;
          this.$emit('input', val);
          this.$emit('change', val);
        }
      };
    },
    // 自定义属性，用于透传给所有组件
    customProps() {
      return Object.keys(this.$attrs)
        .filter(key => !Object.keys(this.$props).includes(key) && key !== 'pickerProps')
        .reduce((acc, key) => {
          acc[key] = this.$attrs[key];
          return acc;
        }, {});
    },
    // 选择器属性，用于透传给日期、时间、颜色选择器
    pickerProps() {
      return this.$attrs.pickerProps || {};
    }
  },

  watch: {
    value: {
      handler(val) {
        if (val !== this.internalValue) {
          this.internalValue = val;
        }
      },
      immediate: true
    }
  },

  methods: {
    // 日期选择器输入处理
    handleDateInput(val) {
      this.internalValue = val;
      this.dateMenu = false;
      this.$emit('input', val);
      this.$emit('change', val);
    },
    // 时间选择器输入处理
    handleTimeInput(val) {
      this.internalValue = val;
      this.timeMenu = false;
      this.$emit('input', val);
      this.$emit('change', val);
    },
    // 颜色选择器输入处理
    handleColorInput(val) {
      this.internalValue = val;
      if (this.closeOnSelect !== false) {
        this.colorMenu = false;
      }
      this.$emit('input', val);
      this.$emit('change', val);
    }
  }
};
</script>

<style scoped>
.jh-color-preview {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
