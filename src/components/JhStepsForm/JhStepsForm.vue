<template>
  <div :class="['jh-steps-form-container', { 'is-vertical': vertical }]" :style="containerStyle">
    <template v-if="vertical">
      <!-- 垂直布局：左侧步骤指示器 -->
      <div class="jh-steps-form-stepper">
        <div class="vertical-steps">
          <div 
            v-for="(step, index) in steps" 
            :key="`step-${index}`"
            :class="[
              'vertical-step-item',
              {
                'active': currentStepIndex === index + 1,
                'completed': currentStepIndex > index + 1,
                'editable': editable && index < currentStepIndex - 1
              }
            ]"
            @click="editable && index < currentStepIndex - 1 && handleStepClick(index)"
          >
            <div class="step-number">
              <v-icon v-if="currentStepIndex > index + 1" small color="success">mdi-check</v-icon>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="step-info">
              <div class="step-title">{{ step.title }}</div>
              <div v-if="step.subTitle" class="step-subtitle">{{ step.subTitle }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 垂直布局：右侧内容区域 -->
      <div class="jh-steps-form-content">
        <v-card flat>
          <div class="step-content">
            <template v-for="(step, index) in steps">
              <div v-if="currentStepIndex === index + 1" :key="`content-${index}`">
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
                  v-bind="mergedFormProps"
                  @change="handleStepFormChange(index, $event)"
                />

                <!-- 默认内容 -->
                <div v-else>
                  <slot :step="step" :index="index" :formData="formData"></slot>
                </div>
              </div>
            </template>
          </div>
          
          <!-- 步骤操作按钮 -->
          <div v-if="!submitter || submitter.render !== false" class="step-actions d-flex justify-space-between mt-6">
            <!-- 自定义渲染提交器 -->
            <template v-if="submitter && submitter.render">
              <slot 
                name="submitter" 
                :step="steps[currentStepIndex - 1]"
                :index="currentStepIndex - 1"
                :onPrevious="handlePrevious"
                :onNext="handleNext"
                :onFinish="handleFinish"
                :submitting="submitting"
                :validating="validating"
              >
                <component 
                  :is="submitter.render" 
                  :step="steps[currentStepIndex - 1]"
                  :index="currentStepIndex - 1"
                  :onPrevious="handlePrevious"
                  :onNext="handleNext"
                  :onFinish="handleFinish"
                  :submitting="submitting"
                  :validating="validating"
                />
              </slot>
            </template>
            
            <!-- 默认按钮 -->
            <template v-else>
              <v-btn
                v-if="currentStepIndex > 1 && (!submitter || submitter.showPrevious !== false)"
                text
                @click="handlePrevious"
                :disabled="submitting"
                v-bind="submitter && submitter.previousButtonProps"
              >
                {{ (submitter && submitter.previousText) || previousButtonText }}
              </v-btn>
              <v-spacer v-else></v-spacer>

              <div>
                <v-btn
                  v-if="currentStepIndex < steps.length"
                  color="primary"
                  @click="handleNext"
                  :loading="validating"
                  :disabled="submitting"
                  v-bind="submitter && submitter.nextButtonProps"
                >
                  {{ (submitter && submitter.nextText) || nextButtonText }}
                </v-btn>
                <v-btn
                  v-else
                  color="primary"
                  @click="handleFinish"
                  :loading="submitting"
                  v-bind="submitter && submitter.submitButtonProps"
                >
                  {{ (submitter && submitter.submitText) || finishButtonText }}
                </v-btn>
              </div>
            </template>
          </div>
        </v-card>
      </div>
    </template>
    
    <template v-else>
      <!-- 水平布局：使用原有的 v-stepper 结构 -->
      <v-stepper 
        v-model="currentStepIndex" 
        :alt-labels="altLabels" 
        v-bind="stepsProps"
        class="w-full"
      >
        <v-stepper-header>
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
                v-bind="mergedFormProps"
                @change="handleStepFormChange(index, $event)"
              />

              <!-- 默认内容 -->
              <div v-else>
                <slot :step="step" :index="index" :formData="formData"></slot>
              </div>
            </div>

            <!-- 步骤操作按钮 -->
            <div v-if="!submitter || submitter.render !== false" class="step-actions d-flex justify-space-between mt-6">
              <!-- 自定义渲染提交器 -->
              <template v-if="submitter && submitter.render">
                <slot 
                  name="submitter" 
                  :step="step"
                  :index="index"
                  :onPrevious="handlePrevious"
                  :onNext="handleNext"
                  :onFinish="handleFinish"
                  :submitting="submitting"
                  :validating="validating"
                >
                  <component 
                    :is="submitter.render" 
                    :step="step"
                    :index="index"
                    :onPrevious="handlePrevious"
                    :onNext="handleNext"
                    :onFinish="handleFinish"
                    :submitting="submitting"
                    :validating="validating"
                  />
                </slot>
              </template>
              
              <!-- 默认按钮 -->
              <template v-else>
                <v-btn
                  v-if="index > 0 && (!submitter || submitter.showPrevious !== false)"
                  text
                  @click="handlePrevious"
                  :disabled="submitting"
                  v-bind="submitter && submitter.previousButtonProps"
                >
                  {{ (submitter && submitter.previousText) || previousButtonText }}
                </v-btn>
                <v-spacer v-else></v-spacer>

                <div>
                  <v-btn
                    v-if="index < steps.length - 1"
                    color="primary"
                    @click="handleNext"
                    :loading="validating"
                    :disabled="submitting"
                    v-bind="submitter && submitter.nextButtonProps"
                  >
                    {{ (submitter && submitter.nextText) || nextButtonText }}
                  </v-btn>
                  <v-btn
                    v-else
                    color="primary"
                    @click="handleFinish"
                    :loading="submitting"
                    v-bind="submitter && submitter.submitButtonProps"
                  >
                    {{ (submitter && submitter.submitText) || finishButtonText }}
                  </v-btn>
                </div>
              </template>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </template>
  </div>
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
    // 当前激活步骤 (支持 v-model)
    value: {
      type: Number,
      default: null,
    },
    // 当前步骤 (支持 .sync)
    current: {
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
    // 步骤变化回调
    onCurrentChange: {
      type: Function,
      default: null,
    },
    // 表单字段变化回调
    onFormChange: {
      type: Function,
      default: null,
    },
    // 传递给 v-stepper 的额外属性
    stepsProps: {
      type: Object,
      default: () => ({}),
    },
    // 传递给所有步骤表单的公共属性
    formProps: {
      type: Object,
      default: () => ({}),
    },
    // 自定义步骤表单渲染
    stepFormRender: {
      type: Function,
      default: null,
    },
    // 提交按钮配置
    submitter: {
      type: [Object, Boolean],
      default: null,
      // {
      //   render: false, // 隐藏按钮
      //   render: Function, // 自定义渲染
      //   showPrevious: true,
      //   previousText: '上一步',
      //   previousButtonProps: {},
      //   nextText: '下一步',
      //   nextButtonProps: {},
      //   submitText: '提交',
      //   submitButtonProps: {},
      // }
    },
    // 容器样式
    containerStyle: {
      type: [Object, String],
      default: null,
    },
  },
  data() {
    const initialIndex = this.current !== null ? this.current : 
                        (this.value !== null ? this.value : this.initialStep);
    return {
      currentStepIndex: initialIndex + 1,
      formData: {},
      validating: false,
      formMapRef: {}, // 存储所有步骤表单实例
    };
  },
  computed: {
    // 合并表单属性
    mergedFormProps() {
      return {
        ...this.formProps,
        outlined: this.outlined,
        dense: this.dense,
      };
    },
  },
  watch: {
    value(newVal) {
      if (newVal !== null && newVal + 1 !== this.currentStepIndex) {
        this.currentStepIndex = newVal + 1;
      }
    },
    current(newVal) {
      if (newVal !== null && newVal + 1 !== this.currentStepIndex) {
        this.currentStepIndex = newVal + 1;
      }
    },
    currentStepIndex(newVal, oldVal) {
      const stepIndex = newVal - 1;
      
      // 触发 v-model 更新
      this.$emit('input', stepIndex);
      
      // 触发 .sync 更新
      this.$emit('update:current', stepIndex);
      
      // 触发步骤变化事件
      this.$emit('step-change', {
        current: stepIndex,
        step: this.steps[stepIndex],
      });
      
      // 触发 onCurrentChange 回调
      if (this.onCurrentChange && oldVal !== undefined) {
        this.onCurrentChange(stepIndex);
      }
    },
  },
  mounted() {
    // 初始化表单实例映射
    this.updateFormMapRef();
  },
  updated() {
    // 更新表单实例映射
    this.updateFormMapRef();
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
      
      // 触发 onFormChange 回调
      if (this.onFormChange) {
        this.onFormChange({
          stepIndex: index,
          values,
          allValues: this.formData,
        });
      }
    },

    // 更新表单实例映射
    updateFormMapRef() {
      const newFormMapRef = {};
      this.steps.forEach((step, index) => {
        if (step.fields) {
          const formRef = this.$refs[`stepForm${index}`];
          if (formRef && formRef[0]) {
            newFormMapRef[index] = formRef[0];
          }
        }
      });
      this.formMapRef = newFormMapRef;
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

    // 获取表单实例映射
    getFormMapRef() {
      return this.formMapRef;
    },

    // 获取指定步骤的表单实例
    getStepFormRef(stepIndex) {
      return this.formMapRef[stepIndex] || null;
    },

    // 验证所有步骤
    async validateAll() {
      const results = [];
      for (let i = 0; i < this.steps.length; i++) {
        const isValid = await this.validateCurrentStep(i);
        results.push(isValid);
      }
      return results.every(r => r);
    },
  },
};
</script>

<style scoped>
.jh-steps-form-container {
  display: flex;
  width: 100%;
}

/* 垂直布局样式 */
.jh-steps-form-stepper {
  width: 250px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  padding: 16px;
}

.jh-steps-form-content {
  flex: 1;
  padding: 16px 24px;
}

.vertical-steps {
  display: flex;
  flex-direction: column;
}

.vertical-step-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  position: relative;
  cursor: default;
}

.vertical-step-item.editable {
  cursor: pointer;
}

.vertical-step-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 15px;
  top: 40px;
  width: 1px;
  height: calc(100% - 16px);
  background-color: rgba(0, 0, 0, 0.12);
}

.vertical-step-item.completed:not(:last-child)::after {
  background-color: #4caf50;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  font-weight: 500;
  margin-right: 12px;
  flex-shrink: 0;
}

.vertical-step-item.active .step-number {
  background-color: #1976d2;
  color: white;
}

.vertical-step-item.completed .step-number {
  background-color: #4caf50;
  color: white;
}

.step-info {
  flex: 1;
}

.step-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 4px;
}

.vertical-step-item.active .step-title {
  color: #1976d2;
}

.step-subtitle {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.2;
}

.jh-steps-form {
  width: 100%;
}

/* 水平布局时隐藏垂直步骤指示器 */
.jh-steps-form-container:not(.is-vertical) .jh-steps-form-stepper {
  display: none;
}

.jh-steps-form-container:not(.is-vertical) .jh-steps-form-content {
  width: 100%;
  padding: 0;
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
