<template>
  <div class="space-y-6">
    <!-- 标题区域 -->
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">Tailwind CSS 测试组件</h2>
      <p class="text-gray-600">验证 Tailwind CSS v4 是否正常工作</p>
    </div>

    <!-- 颜色测试 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-500 text-white p-4 rounded-lg text-center">
        <p class="font-semibold">Blue</p>
      </div>
      <div class="bg-green-500 text-white p-4 rounded-lg text-center">
        <p class="font-semibold">Green</p>
      </div>
      <div class="bg-red-500 text-white p-4 rounded-lg text-center">
        <p class="font-semibold">Red</p>
      </div>
      <div class="bg-yellow-500 text-white p-4 rounded-lg text-center">
        <p class="font-semibold">Yellow</p>
      </div>
    </div>

    <!-- 间距和布局测试 -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold mb-4">间距和布局</h3>
      <div class="flex flex-wrap gap-2">
        <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Tag 1</span>
        <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Tag 2</span>
        <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Tag 3</span>
      </div>
    </div>

    <!-- 阴影和圆角测试 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="shadow-sm bg-white p-4 rounded">
        <p class="text-sm text-gray-700">Shadow Small</p>
      </div>
      <div class="shadow-md bg-white p-4 rounded-lg">
        <p class="text-sm text-gray-700">Shadow Medium</p>
      </div>
      <div class="shadow-lg bg-white p-4 rounded-xl">
        <p class="text-sm text-gray-700">Shadow Large</p>
      </div>
    </div>

    <!-- 响应式测试 -->
    <div class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg text-white">
      <h3 class="text-xl font-bold mb-2">渐变背景</h3>
      <p class="text-sm opacity-90">这是一个从紫色到红色的渐变背景</p>
    </div>

    <!-- Flex 布局测试 -->
    <div class="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
        <div>
          <p class="font-semibold text-gray-800">用户名称</p>
          <p class="text-sm text-gray-600">user@example.com</p>
        </div>
      </div>
      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        按钮
      </button>
    </div>

    <!-- 自定义测试内容 -->
    <div v-if="showCustomContent" class="bg-green-50 border-l-4 border-green-500 p-4">
      <p class="text-green-800">{{ customMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JhTailwindTest',
  props: {
    showCustomContent: {
      type: Boolean,
      default: true,
    },
    customMessage: {
      type: String,
      default: 'Tailwind CSS v4 正在正常工作！',
    },
  },
};
</script>

<style scoped>
/* 如果需要自定义样式可以在这里添加 */
</style>
