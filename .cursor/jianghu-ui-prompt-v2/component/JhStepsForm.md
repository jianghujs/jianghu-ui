# JhStepsForm - AI 快速集成指南

> 分步表单组件，用于多步骤表单向导

## 🎯 核心用法

```vue
<jh-steps-form
  :steps="steps"
  @finish="handleFinish"
/>

<script>
export default {
  data() {
    return {
      steps: [
        {
          title: '基本信息',
          fields: [
            { key: 'username', label: '用户名', type: 'text', required: true },
            { key: 'email', label: '邮箱', type: 'text', rules: 'email' }
          ]
        },
        {
          title: '详细信息',
          fields: [
            { key: 'phone', label: '手机号', type: 'text', rules: 'phone' },
            { key: 'address', label: '地址', type: 'textarea' }
          ]
        },
        {
          title: '确认信息',
          fields: [
            { key: 'agree', label: '同意协议', type: 'checkbox', required: true }
          ]
        }
      ]
    };
  },
  methods: {
    async handleFinish(data) {
      console.log('提交:', data);
      await this.$api.submit(data);
      this.$message.success('提交成功');
    }
  }
};
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `steps` | Array | 步骤配置 | `[]` |
| `current` | Number | 当前步骤 | `0` |

## 📡 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `finish` | 完成所有步骤 | `(data)` |
| `step-change` | 步骤改变 | `(step)` |

## ⚡ 快速模板

### 注册向导
```vue
<template>
  <jh-steps-form
    :steps="steps"
    @finish="handleFinish"
  />
</template>

<script>
export default {
  data() {
    return {
      steps: [
        {
          title: '账户信息',
          description: '设置登录账户',
          fields: [
            { key: 'username', label: '用户名', type: 'text', required: true },
            { key: 'password', label: '密码', type: 'text', required: true, props: { type: 'password' } },
            { key: 'confirmPassword', label: '确认密码', type: 'text', required: true, props: { type: 'password' } }
          ]
        },
        {
          title: '个人信息',
          description: '完善个人资料',
          fields: [
            { key: 'realName', label: '真实姓名', type: 'text', required: true },
            { key: 'phone', label: '手机号', type: 'text', rules: 'phone' },
            { key: 'email', label: '邮箱', type: 'text', rules: 'email' }
          ]
        },
        {
          title: '完成',
          description: '确认注册信息',
          fields: [
            { key: 'agree', label: '我已阅读并同意用户协议', type: 'checkbox', required: true }
          ]
        }
      ]
    };
  },
  methods: {
    async handleFinish(data) {
      await this.$api.register(data);
      this.$message.success('注册成功');
      this.$router.push('/login');
    }
  }
};
</script>
```

## 🔗 相关组件

- **JhForm**: 表单组件
