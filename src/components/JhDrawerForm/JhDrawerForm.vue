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
    <!-- 抽屉标题 -->
    <v-row class="jh-drawer-header px-4 bg-white sticky top-0 z-10" no-gutters align="center">
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
        <!-- 使用 JhForm 组件渲染表单 -->
        <jh-form
          ref="jhForm"
          :form-ref="formRef"
          :fields="fields"
          :initial-data="initialData"
          :validation-rules="validationRules"
          :default-cols-md="3"
          :row-class="rowClass"
          @field-change="handleFieldChange"
        >
          <!-- 传递自定义字段插槽 -->
          <template v-for="field in slotFields" v-slot:[`field-${field.key}`]="slotProps">
            <slot :name="`field-${field.key}`" v-bind="slotProps"></slot>
          </template>
        </jh-form>
      </slot>
    </div>

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
      <jh-icon icon="mdi:close" width="24" height="24"></jh-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import JhForm from '../JhForm/JhForm.vue';
import JhIcon from '../JhIcon/JhIcon.vue';

export default {
  name: 'JhDrawerForm',

  components: {
    JhForm,
    JhIcon
  },

  props: {
    // 抽屉显示状态
    value: {
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

    // 初始表单数据
    initialData: {
      type: Object,
      default: () => ({})
    },

    // 自定义行样式类
    rowClass: {
      type: String,
      default: 'mt-0'
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
      isShownInternal: this.value,
    };
  },

  computed: {
    // 获取所有 slot 类型的字段
    slotFields() {
      return this.fields.filter(field => field.type === 'slot');
    },
  },

  watch: {
    value(val) {
      this.isShownInternal = val;
      // 当抽屉打开时,重置表单数据和验证状态
      if (val) {
        this.$nextTick(() => {
          this.resetForm();
        });
      }
    },
    isShownInternal(val) {
      if (!val) {
        this.$emit('input', false);
        this.$emit('close');
      }
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
        const isValid = await this.validate();
        if (!isValid) {
          return;
        }
      }

      this.$emit('confirm', this.getFormData());
    },

    // 处理字段变化
    handleFieldChange(event) {
      this.$emit('field-change', event);
    },

    // 获取 JhForm 实例
    getJhForm() {
      return this.$refs.jhForm;
    },

    // 获取表单引用（供父组件调用）
    getForm() {
      const jhForm = this.getJhForm();
      return jhForm ? jhForm.getForm() : null;
    },

    // 获取表单数据
    getFormData() {
      const jhForm = this.getJhForm();
      return jhForm ? jhForm.getFormData() : {};
    },

    // 设置表单数据
    setFieldsValue(values) {
      const jhForm = this.getJhForm();
      if (jhForm) {
        jhForm.setFieldsValue(values);
      }
    },

    // 设置单个字段值
    setFieldValue(key, value) {
      const jhForm = this.getJhForm();
      if (jhForm) {
        jhForm.setFieldValue(key, value);
      }
    },

    // 重置表单
    resetForm() {
      const jhForm = this.getJhForm();
      if (jhForm) {
        jhForm.resetForm();
      }
    },

    // 重置表单验证
    resetValidation() {
      const jhForm = this.getJhForm();
      if (jhForm) {
        jhForm.resetValidation();
      }
    },

    // 验证表单
    async validate() {
      const jhForm = this.getJhForm();
      if (jhForm) {
        return await jhForm.validate();
      }
      return true;
    }
  }
};
</script>

<style scoped>
</style>
