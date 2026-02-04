window.QuickEntryView = {
  template: `
    <div class="page-container">
      <jh-card title="快速入职办理" class="pa-4">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">基本信息</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">职位分配</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">确认信息</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!-- Step 1: Basic Info -->
            <v-stepper-content step="1">
              <div class="mb-4">
                <jh-form
                  ref="form1"
                  :fields="fields1"
                  v-model="formData1"
                  :cols="12"
                ></jh-form>
              </div>
              <v-btn color="primary" @click="validateStep1">下一步</v-btn>
              <v-btn text>取消</v-btn>
            </v-stepper-content>

            <!-- Step 2: Position Info -->
            <v-stepper-content step="2">
              <div class="mb-4">
                 <jh-form
                  ref="form2"
                  :fields="fields2"
                  v-model="formData2"
                  :cols="12"
                ></jh-form>
              </div>
              <v-btn color="primary" @click="validateStep2">下一步</v-btn>
              <v-btn text @click="e1 = 1">上一步</v-btn>
            </v-stepper-content>

            <!-- Step 3: Confirmation -->
            <v-stepper-content step="3">
              <v-card color="grey lighten-4" class="mb-12 pa-4" outlined>
                <h3 class="mb-2">请确认以下信息：</h3>
                <v-row>
                  <v-col cols="6">
                    <p><strong>姓名：</strong> {{ formData1.name }}</p>
                    <p><strong>手机：</strong> {{ formData1.phone }}</p>
                    <p><strong>邮箱：</strong> {{ formData1.email }}</p>
                  </v-col>
                  <v-col cols="6">
                    <p><strong>部门：</strong> {{ formData2.department }}</p>
                    <p><strong>职位：</strong> {{ formData2.position }}</p>
                    <p><strong>入职日期：</strong> {{ formData2.joinDate }}</p>
                  </v-col>
                </v-row>
              </v-card>
              <v-btn color="success" @click="handleSubmit">确认提交</v-btn>
              <v-btn text @click="e1 = 2">上一步</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </jh-card>
      
      <jh-modal v-model="successModal" title="办理成功" :show-close="false">
        <div class="text-center pa-4">
          <v-icon color="success" size="64">mdi-check-circle</v-icon>
          <h3 class="mt-4">入职办理完成</h3>
          <p class="grey--text">员工 {{ formData1.name }} 已成功录入系统。</p>
          <v-btn color="primary" class="mt-2" @click="resetForm">继续办理</v-btn>
        </div>
      </jh-modal>
    </div>
  `,
  data() {
    return {
      e1: 1,
      successModal: false,
      
      // Step 1 Data
      formData1: {},
      fields1: [
        { key: 'name', label: '姓名', type: 'text', rules: [v => !!v || '必填'], cols: 6 },
        { key: 'phone', label: '手机号', type: 'text', rules: [v => !!v || '必填'], cols: 6 },
        { key: 'email', label: '邮箱', type: 'text', rules: [v => !!v || '必填'], cols: 6 },
        { key: 'idCard', label: '身份证号', type: 'text', cols: 6 }
      ],
      
      // Step 2 Data
      formData2: {},
      fields2: [
        { 
          key: 'department', 
          label: '部门', 
          type: 'select', 
          options: ['研发部', '销售部', '市场部', '人事部', '运营部'],
          rules: [v => !!v || '必填'],
          cols: 6
        },
        { key: 'position', label: '职位', type: 'text', rules: [v => !!v || '必填'], cols: 6 },
        { key: 'joinDate', label: '入职日期', type: 'date', rules: [v => !!v || '必填'], cols: 6 },
        { key: 'manager', label: '直属上级', type: 'text', cols: 6 }
      ]
    };
  },
  methods: {
    validateStep1() {
      if (this.$refs.form1.validate()) {
        this.e1 = 2;
      }
    },
    validateStep2() {
      if (this.$refs.form2.validate()) {
        this.e1 = 3;
      }
    },
    handleSubmit() {
      // Simulate API submission
      const newEmployee = {
        ...this.formData1,
        ...this.formData2,
        id: `EMP${Date.now()}`,
        status: 'probation'
      };
      
      // Update Mock Data (optional, but good for demo continuity)
      if (window.MockData && window.MockData.employees) {
        window.MockData.employees.unshift(newEmployee);
      }
      
      this.successModal = true;
    },
    resetForm() {
      this.successModal = false;
      this.e1 = 1;
      this.formData1 = {};
      this.formData2 = {};
      this.$refs.form1.reset();
      this.$refs.form2.reset();
    }
  }
};
