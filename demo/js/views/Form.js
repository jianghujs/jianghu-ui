window.FormView = {
  template: `
    <div class="page-container">
      <jh-card title="基础表单" subtitle="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <jh-form
              ref="form"
              :fields="formFields"
              :initial-data="formData"
              @submit="handleSubmit"
            >
              <template v-slot:actions="{ validate, resetForm }">
                <v-btn color="primary" @click="validate" :loading="loading">
                  提交
                </v-btn>
                <v-btn text class="ml-2" @click="resetForm">
                  重置
                </v-btn>
              </template>
            </jh-form>
          </v-col>
        </v-row>
      </jh-card>

      <jh-toast v-model="toast.visible" :message="toast.message" :type="toast.type" />
    </div>
  `,
  data() {
    return {
      loading: false,
      toast: {
        visible: false,
        message: '',
        type: 'success'
      },
      formData: {
        title: '',
        date: '',
        goal: '',
        standard: '',
        client: '',
        invites: '',
        weight: 0,
        public: '1',
        publicUsers: []
      },
      formFields: [
        { 
          key: 'title', 
          label: '标题', 
          required: true, 
          placeholder: '给目标起个名字' 
        },
        { 
          key: 'date', 
          label: '起止日期', 
          type: 'date', 
          required: true 
        },
        { 
          key: 'goal', 
          label: '目标描述', 
          type: 'textarea', 
          required: true, 
          placeholder: '请输入你的阶段性工作目标' 
        },
        { 
          key: 'standard', 
          label: '衡量标准', 
          type: 'textarea', 
          required: true, 
          placeholder: '请输入衡量标准' 
        },
        {
          key: 'client',
          label: '客户',
          type: 'select',
          options: ['某某公司', '阿里巴巴', '腾讯'],
          placeholder: '请选择客户'
        },
        {
          key: 'invites',
          label: '邀评人',
          placeholder: '请直接 @姓名／工号，最多可邀请 5 人'
        },
        {
          key: 'weight',
          label: '权重',
          type: 'number',
          suffix: '%',
          props: { min: 0, max: 100 }
        },
        {
          key: 'public',
          label: '目标公开',
          type: 'radio',
          options: [
            { text: '公开', value: '1' },
            { text: '部分公开', value: '2' },
            { text: '不公开', value: '3' }
          ]
        }
      ]
    };
  },
  methods: {
    async handleSubmit(data) {
      this.loading = true;
      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        this.showToast('提交成功', 'success');
        console.log('Form Data:', data);
      }, 1000);
    },
    showToast(msg, type = 'success') {
      this.toast.message = msg;
      this.toast.type = type;
      this.toast.visible = true;
    }
  }
};
