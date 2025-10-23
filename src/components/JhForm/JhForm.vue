<template>
  <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazyValidation"
      @submit.prevent="handleSubmit"
    >
      <v-container :fluid="fluid">
        <v-row>
          <v-col
            v-for="field in fields"
            :key="field.name"
            :cols="field.cols || 12"
            :sm="field.sm"
            :md="field.md"
            :lg="field.lg"
          >
            <!-- 文本输入框 -->
            <v-text-field
              v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'"
              v-model="formData[field.name]"
              :label="field.label"
              :type="field.type"
              :placeholder="field.placeholder"
              :rules="field.rules"
              :required="field.required"
              :disabled="field.disabled"
              :readonly="field.readonly"
              :hint="field.hint"
              :persistent-hint="field.persistentHint"
              :prepend-icon="field.prependIcon"
              :append-icon="field.appendIcon"
              :dense="dense"
              :outlined="outlined"
            ></v-text-field>

            <!-- 文本域 -->
            <v-textarea
              v-else-if="field.type === 'textarea'"
              v-model="formData[field.name]"
              :label="field.label"
              :placeholder="field.placeholder"
              :rules="field.rules"
              :required="field.required"
              :rows="field.rows || 3"
              :dense="dense"
              :outlined="outlined"
            ></v-textarea>

            <!-- 选择框 -->
            <v-select
              v-else-if="field.type === 'select'"
              v-model="formData[field.name]"
              :items="field.options"
              :label="field.label"
              :rules="field.rules"
              :required="field.required"
              :multiple="field.multiple"
              :dense="dense"
              :outlined="outlined"
            ></v-select>

            <!-- 日期选择器 -->
            <v-menu
              v-else-if="field.type === 'date'"
              v-model="dateMenus[field.name]"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formData[field.name]"
                  :label="field.label"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :dense="dense"
                  :outlined="outlined"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formData[field.name]"
                @input="dateMenus[field.name] = false"
              ></v-date-picker>
            </v-menu>

            <!-- 复选框 -->
            <v-checkbox
              v-else-if="field.type === 'checkbox'"
              v-model="formData[field.name]"
              :label="field.label"
              :rules="field.rules"
            ></v-checkbox>

            <!-- 单选框组 -->
            <v-radio-group
              v-else-if="field.type === 'radio'"
              v-model="formData[field.name]"
              :label="field.label"
              :rules="field.rules"
              :row="field.row"
            >
              <v-radio
                v-for="option in field.options"
                :key="option.value"
                :label="option.text"
                :value="option.value"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <!-- 表单按钮 -->
        <v-row v-if="showButtons">
          <v-col :class="buttonAlign">
            <v-btn
              :color="submitButtonColor"
              :disabled="!valid || submitting"
              :loading="submitting"
              type="submit"
              class="mr-2"
            >
              {{ submitButtonText }}
            </v-btn>
            <v-btn
              :color="resetButtonColor"
              @click="handleReset"
              :disabled="submitting"
            >
              {{ resetButtonText }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
</template>

<script>
export default {
  name: 'JhForm',
  props: {
    fields: {
      type: Array,
      required: true,
      default: () => [],
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
    lazyValidation: {
      type: Boolean,
      default: false,
    },
    fluid: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    showButtons: {
      type: Boolean,
      default: true,
    },
    submitButtonText: {
      type: String,
      default: '提交',
    },
    resetButtonText: {
      type: String,
      default: '重置',
    },
    submitButtonColor: {
      type: String,
      default: 'primary',
    },
    resetButtonColor: {
      type: String,
      default: 'secondary',
    },
    buttonAlign: {
      type: String,
      default: 'text-right',
    },
    submitting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: false,
      formData: {},
      dateMenus: {},
    };
  },
  created() {
    this.initFormData();
  },
  methods: {
    initFormData() {
      const data = {};
      const menus = {};

      this.fields.forEach((field) => {
        data[field.name] = this.initialData[field.name] || field.default || '';
        if (field.type === 'date') {
          menus[field.name] = false;
        }
      });

      this.formData = data;
      this.dateMenus = menus;
    },
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', { ...this.formData });
      }
    },
    handleReset() {
      this.$refs.form.reset();
      this.initFormData();
      this.$emit('reset');
    },
    validate() {
      return this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style scoped>
/* 自定义样式 */
</style>
