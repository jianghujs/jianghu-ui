<template>
  <v-card flat class="jh-steps-form">
    <!-- 步骤指示器 -->
    <v-stepper v-model="currentStepIndex" :alt-labels="altLabels" :vertical="vertical">
      <v-stepper-header v-if="!vertical">
        <template v-for="(step, index) in steps">
          <v-stepper-step
            :key="`step-${index}`"
            :complete="currentStepIndex > index + 1"
            :step="index + 1"
            :editable="editable && index < currentStepIndex"
            @click="editable && handleStepClick(index)"
          >
            {{ step.title }}
            <small v-if="step.subTitle">{{ step.subTitle }}</small>
          </v-stepper-step>
          <v-divider v-if="index < steps.length - 1" :key="`divider-${index}`"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="(step, index) in steps"
          :key="`content-${index}`"
          :step="index + 1"
        >
          <!-- 步骤标题(垂直模式) -->
          <div v-if="vertical" class="mb-4">
            <div class="text-h6">{{ step.title }}</div>
            <div v-if="step.subTitle" class="text-caption text--secondary">{{ step.subTitle }}</div>
          </div>

          <!-- 步骤内容 -->
          <div class="step-content">
            <!-- 使用插槽渲染步骤内容 -->
            <slot
              v-if="step.slot"
              :name="step.slot"
              :step="step"
              :index="index"
              :formData="formData"
            ></slot>

            <!-- 使用 JhForm 渲染步骤表单 -->
            <jh-form
              v-else-if="step.fields"
              :ref="`stepForm${index}`"
              :fields="step.fields"
              :initial-data="formData[`step${index}`] || {}"
              :show-buttons="false"
              :outlined="outlined"
              :dense="dense"
              @change="handleStepFormChange(index, $event)"
            />

            <!-- 默认内容 -->
            <div v-else>
              <slot :step="step" :index="index" :formData="formData"></slot>
            </div>
          </div>

          <!-- 步骤操作按钮 -->
          <div class="step-actions d-flex justify-space-between mt-6">
            <v-btn
              v-if="index > 0"
              text
              @click="handlePrevious"
              :disabled="submitting"
            >
              {{ previousButtonText }}
            </v-btn>
            <v-spacer v-else></v-spacer>

            <div>
              <v-btn
                v-if="index < steps.length - 1"
                color="primary"
                @click="handleNext"
                :loading="validating"
                :disabled="submitting"
              >
                {{ nextButtonText }}
              </v-btn>
              <v-btn
                v-else
                color="primary"
                @click="handleFinish"
                :loading="submitting"
              >
                {{ finishButtonText }}
              </v-btn>
            </div>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import JhForm from '../JhForm/JhForm.vue';

export default {
  name: 'JhStepsForm',
  components: {
    JhForm,
  },
  props: {
    // 步骤配置
    steps: {
      type: Array,
      required: true,
      default: () => [],
      // 每个步骤: { title, subTitle, slot, fields }
    },
    // 初始步骤索引 (从0开始)
    initialStep: {
      type: Number,
      default: 0,
    },
    // 当前激活步骤 (支持 .sync)
    value: {
      type: Number,
      default: null,
    },
    // 是否可编辑已完成的步骤
    editable: {
      type: Boolean,
      default: false,
    },
    // 是否垂直布局
    vertical: {
      type: Boolean,
      default: false,
    },
    // 是否替代标签模式(步骤标题在图标下方)
    altLabels: {
      type: Boolean,
      default: false,
    },
    // 输入框样式
    outlined: {
      type: Boolean,
      default: true,
    },
    // 紧凑模式
    dense: {
      type: Boolean,
      default: false,
    },
    // 提交中状态
    submitting: {
      type: Boolean,
      default: false,
    },
    // 按钮文本
    previousButtonText: {
      type: String,
      default: '上一步',
    },
    nextButtonText: {
      type: String,
      default: '下一步',
    },
    finishButtonText: {
      type: String,
      default: '完成',
    },
    // 步骤验证函数
    validateStep: {
      type: Function,
      default: null,
    },
    // 数据转换函数(最终提交前)
    transformBeforeFinish: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      currentStepIndex: this.value !== null ? this.value + 1 : this.initialStep + 1,
      formData: {},
      validating: false,
    };
  },
  watch: {
    value(newVal) {
      if (newVal !== null) {
        this.currentStepIndex = newVal + 1;
      }
    },
    currentStepIndex(newVal) {
      this.$emit('input', newVal - 1);
      this.$emit('step-change', {
        current: newVal - 1,
        step: this.steps[newVal - 1],
      });
    },
  },
  methods: {
    // 处理步骤点击
    handleStepClick(index) {
      if (this.editable && index < this.currentStepIndex - 1) {
        this.currentStepIndex = index + 1;
      }
    },

    // 处理步骤表单数据变化
    handleStepFormChange(index, values) {
      this.$set(this.formData, `step${index}`, values);
      this.$emit('change', this.formData);
    },

    // 上一步
    handlePrevious() {
      if (this.currentStepIndex > 1) {
        this.currentStepIndex--;
      }
    },

    // 下一步
    async handleNext() {
      const currentIndex = this.currentStepIndex - 1;
      const isValid = await this.validateCurrentStep(currentIndex);

      if (isValid) {
        this.currentStepIndex++;
      }
    },

    // 完成
    async handleFinish() {
      const currentIndex = this.currentStepIndex - 1;
      const isValid = await this.validateCurrentStep(currentIndex);

      if (!isValid) {
        return;
      }

      // 收集所有步骤数据
      let allData = { ...this.formData };

      // 如果提供了转换函数,则转换数据
      if (this.transformBeforeFinish) {
        allData = this.transformBeforeFinish(allData);
      }

      this.$emit('finish', allData);
    },

    // 验证当前步骤
    async validateCurrentStep(stepIndex) {
      this.validating = true;

      try {
        const step = this.steps[stepIndex];

        // 如果步骤有表单,验证表单
        if (step.fields) {
          const formRef = this.$refs[`stepForm${stepIndex}`];
          if (formRef && formRef[0]) {
            const isValid = await formRef[0].validate();
            if (!isValid) {
              return false;
            }
          }
        }

        // 如果提供了自定义验证函数
        if (this.validateStep) {
          const customValidation = await this.validateStep({
            step,
            stepIndex,
            formData: this.formData,
          });

          if (customValidation === false) {
            return false;
          }
        }

        return true;
      } catch (error) {
        console.error('步骤验证失败:', error);
        return false;
      } finally {
        this.validating = false;
      }
    },

    // 跳转到指定步骤
    goToStep(stepIndex) {
      if (stepIndex >= 0 && stepIndex < this.steps.length) {
        this.currentStepIndex = stepIndex + 1;
      }
    },

    // 重置表单
    reset() {
      this.currentStepIndex = this.initialStep + 1;
      this.formData = {};

      // 重置所有步骤表单
      this.steps.forEach((step, index) => {
        if (step.fields) {
          const formRef = this.$refs[`stepForm${index}`];
          if (formRef && formRef[0]) {
            formRef[0].resetForm();
          }
        }
      });
    },

    // 获取所有表单数据
    getFormData() {
      return { ...this.formData };
    },

    // 设置表单数据
    setFormData(data) {
      this.formData = { ...data };
    },
  },
};
</script>

<style scoped>
.jh-steps-form {
  width: 100%;
}

.step-content {
  min-height: 200px;
}

.step-actions {
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

/* 响应式调整 */
@media (max-width: 600px) {
  .step-content {
    min-height: 150px;
  }
}
</style>
