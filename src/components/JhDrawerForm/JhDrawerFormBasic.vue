<template>
  <v-navigation-drawer
    v-model="isShownInternal"
    fixed
    temporary
    :right="position === 'right'"
    :left="position === 'left'"
    :width="width"
    class="elevation-24"
  >
    <v-form :ref="formRef" lazy-validation>
      <!-- 抽屉标题 -->
      <v-row class="jh-drawer-header px-4" no-gutters align="center">
        <span class="text-h7 font-weight-bold py-4">{{ title }}</span>
        <v-spacer></v-spacer>

        <!-- 操作按钮组 -->
        <div class="jh-drawer-action-btn-group">
          <!-- 取消按钮 -->
          <v-btn
            class="elevation-0 grey lighten-4"
            @click="handleCancel"
            small
          >
            {{ cancelText }}
          </v-btn>

          <!-- 自定义操作按钮插槽 -->
          <slot name="actions">
            <!-- 默认确认按钮 -->
            <v-btn
              v-if="showConfirmButton"
              color="success"
              class="ml-2"
              small
              @click="handleConfirm"
            >
              {{ confirmText }}
            </v-btn>
          </slot>
        </div>
      </v-row>

      <v-divider class="jh-divider"></v-divider>

      <!-- 抽屉内容 -->
      <div class="px-4 pb-4">
        <!-- 支持完全自定义内容 -->
        <slot name="content">
          <!-- 默认使用 fields 配置渲染表单 -->
          <v-row class="mt-0">
            <v-col
              v-for="field in fields"
              :key="field.key"
              :cols="field.cols ? field.cols.xs || field.cols : 12"
              :sm="field.cols ? field.cols.sm : 12"
              :md="field.cols ? field.cols.md : 3"
              :xl="field.cols ? field.cols.xl : field.cols ? field.cols.md : 3"
            >
              <!-- 字段标签 -->
              <span v-if="field.label" class="jh-input-label">{{ field.label }}</span>

              <!-- 文本输入框 -->
              <v-text-field
                v-if="field.type === 'text' || !field.type"
                class="jh-v-input"
                :dense="field.dense !== false"
                :single-line="field.singleLine !== false"
                :filled="field.filled !== false"
                v-model="formData[field.key]"
                :rules="getRules(field.rules)"
                :disabled="field.disabled"
                :placeholder="field.placeholder"
                :prefix="field.prefix"
                :suffix="field.suffix"
                v-bind="field.props"
              ></v-text-field>

              <!-- 文本域 -->
              <v-textarea
                v-else-if="field.type === 'textarea'"
                class="jh-v-input"
                :dense="field.dense !== false"
                :filled="field.filled !== false"
                v-model="formData[field.key]"
                :rules="getRules(field.rules)"
                :disabled="field.disabled"
                :placeholder="field.placeholder"
                :rows="field.rows || 3"
                v-bind="field.props"
              ></v-textarea>

              <!-- 数字输入框 -->
              <v-text-field
                v-else-if="field.type === 'number'"
                class="jh-v-input"
                type="number"
                :dense="field.dense !== false"
                :single-line="field.singleLine !== false"
                :filled="field.filled !== false"
                v-model="formData[field.key]"
                :rules="getRules(field.rules)"
                :disabled="field.disabled"
                :placeholder="field.placeholder"
                v-bind="field.props"
              ></v-text-field>

              <!-- 下拉选择框 -->
              <v-select
                v-else-if="field.type === 'select'"
                class="jh-v-input"
                :dense="field.dense !== false"
                :filled="field.filled !== false"
                v-model="formData[field.key]"
                :items="field.options || []"
                :rules="getRules(field.rules)"
                :disabled="field.disabled"
                :placeholder="field.placeholder"
                :item-text="field.itemText || 'text'"
                :item-value="field.itemValue || 'value'"
                :multiple="field.multiple"
                :chips="field.chips"
                v-bind="field.props"
              ></v-select>

              <!-- 自动完成 -->
              <v-autocomplete
                v-else-if="field.type === 'autocomplete'"
                class="jh-v-input"
                :dense="field.dense !== false"
                :filled="field.filled !== false"
                v-model="formData[field.key]"
                :items="field.options || []"
                :rules="getRules(field.rules)"
                :disabled="field.disabled"
                :placeholder="field.placeholder"
                :item-text="field.itemText || 'text'"
                :item-value="field.itemValue || 'value'"
                v-bind="field.props"
              ></v-autocomplete>

              <!-- 日期选择器 -->
              <v-menu
                v-else-if="field.type === 'date'"
                v-model="dateMenus[field.key]"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="jh-v-input"
                    :dense="field.dense !== false"
                    :filled="field.filled !== false"
                    v-model="formData[field.key]"
                    :rules="getRules(field.rules)"
                    :disabled="field.disabled"
                    :placeholder="field.placeholder"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formData[field.key]"
                  @input="dateMenus[field.key] = false"
                  :locale="field.locale || 'zh-cn'"
                  v-bind="field.pickerProps"
                ></v-date-picker>
              </v-menu>

              <!-- 时间选择器 -->
              <v-menu
                v-else-if="field.type === 'time'"
                v-model="timeMenus[field.key]"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="jh-v-input"
                    :dense="field.dense !== false"
                    :filled="field.filled !== false"
                    v-model="formData[field.key]"
                    :rules="getRules(field.rules)"
                    :disabled="field.disabled"
                    :placeholder="field.placeholder"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="formData[field.key]"
                  @input="timeMenus[field.key] = false"
                  format="24hr"
                  v-bind="field.pickerProps"
                ></v-time-picker>
              </v-menu>

              <!-- 开关 -->
              <v-switch
                v-else-if="field.type === 'switch'"
                v-model="formData[field.key]"
                :label="field.switchLabel"
                :disabled="field.disabled"
                color="success"
                v-bind="field.props"
              ></v-switch>

              <!-- 复选框 -->
              <v-checkbox
                v-else-if="field.type === 'checkbox'"
                v-model="formData[field.key]"
                :label="field.checkboxLabel"
                :disabled="field.disabled"
                color="success"
                v-bind="field.props"
              ></v-checkbox>

              <!-- 单选按钮组 -->
              <v-radio-group
                v-else-if="field.type === 'radio'"
                v-model="formData[field.key]"
                :rules="getRules(field.rules)"
                :disabled="field.disabled"
                :row="field.row !== false"
                v-bind="field.props"
              >
                <v-radio
                  v-for="option in field.options"
                  :key="option.value"
                  :label="option.text"
                  :value="option.value"
                  color="success"
                ></v-radio>
              </v-radio-group>

              <!-- 自定义字段插槽 -->
              <slot
                v-else-if="field.type === 'slot'"
                :name="`field-${field.key}`"
                :field="field"
                :formData="formData"
              ></slot>
            </v-col>
          </v-row>
        </slot>
      </div>
    </v-form>

    <!-- 抽屉关闭按钮 -->
    <v-btn
      elevation="0"
      color="success"
      fab
      absolute
      top
      left
      small
      tile
      class="drawer-close-float-btn"
      @click="handleCancel"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'JhDrawerFormBasic',
  props: {
    // 抽屉显示状态
    isShown: {
      type: Boolean,
      default: false
    },

    // 抽屉标题
    title: {
      type: String,
      default: '表单'
    },

    // 抽屉位置
    position: {
      type: String,
      default: 'right',
      validator: (v) => ['left', 'right'].includes(v)
    },

    // 抽屉宽度
    width: {
      type: String,
      default: '90%'
    },

    // 按钮配置
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    },

    // 表单引用名称
    formRef: {
      type: String,
      default: 'drawerForm'
    },

    // 是否在确认前验证表单
    validateBeforeConfirm: {
      type: Boolean,
      default: true
    },

    // 表单字段配置（JSON 配置）
    fields: {
      type: Array,
      default: () => []
    },

    // 表单数据
    value: {
      type: Object,
      default: () => ({})
    },

    // 验证规则集合
    validationRules: {
      type: Object,
      default: () => ({
        require: [v => !!v || '必填'],
        email: [v => !v || /.+@.+\..+/.test(v) || '邮箱格式不正确'],
        phone: [v => !v || /^1[3-9]\d{9}$/.test(v) || '手机号格式不正确'],
        number: [v => !v || !isNaN(v) || '请输入数字'],
        integer: [v => !v || Number.isInteger(Number(v)) || '请输入整数']
      })
    }
  },
  data() {
    return {
      isShownInternal: this.isShown,
      formData: { ...this.value },
      dateMenus: {},  // 日期选择器菜单状态
      timeMenus: {}   // 时间选择器菜单状态
    };
  },
  watch: {
    isShown(val) {
      this.isShownInternal = val;
      // 当抽屉打开时,重置表单数据和验证状态
      if (val) {
        this.$nextTick(() => {
          this.formData = { ...this.value };
          this.resetValidation();
        });
      }
    },
    isShownInternal(val) {
      if (!val) {
        this.$emit('update:isShown', false);
        this.$emit('close');
      }
    },
    value: {
      handler(val) {
        // 避免循环更新:仅当外部 value 改变时才更新内部 formData
        if (JSON.stringify(val) !== JSON.stringify(this.formData)) {
          this.formData = { ...val };
        }
      },
      deep: true
    },
    formData: {
      handler(val) {
        // 避免循环更新:仅当内部 formData 改变时才通知外部
        if (JSON.stringify(val) !== JSON.stringify(this.value)) {
          this.$emit('input', val);
          this.$emit('update:value', val);
        }
      },
      deep: true
    }
  },
  methods: {
    // 处理取消
    handleCancel() {
      this.$emit('cancel');
      this.isShownInternal = false;
    },

    // 处理确认
    async handleConfirm() {
      // 如果需要验证表单
      if (this.validateBeforeConfirm) {
        const form = this.$refs[this.formRef];
        if (form) {
          const isValid = await form.validate();
          if (!isValid) {
            return;
          }
        }
      }

      this.$emit('confirm', this.formData);
    },

    // 获取验证规则
    getRules(rules) {
      if (!rules) return [];
      if (Array.isArray(rules)) return rules;
      if (typeof rules === 'string') {
        // 支持字符串规则名称，如 'require' 或 'require|email'
        const ruleNames = rules.split('|');
        const ruleArray = [];
        ruleNames.forEach(name => {
          const trimmedName = name.trim();
          if (this.validationRules[trimmedName]) {
            ruleArray.push(...this.validationRules[trimmedName]);
          }
        });
        return ruleArray;
      }
      return [];
    },

    // 获取表单引用（供父组件调用）
    getForm() {
      return this.$refs[this.formRef];
    },

    // 重置表单
    resetForm() {
      const form = this.$refs[this.formRef];
      if (form) {
        form.reset();
      }
    },

    // 重置表单验证
    resetValidation() {
      const form = this.$refs[this.formRef];
      if (form) {
        form.resetValidation();
      }
    }
  }
};
</script>
