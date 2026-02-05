import JhIcon from './JhIcon.vue';

export default {
  title: '基础组件/JhIcon',
  component: JhIcon,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: [
          'mdi:home', 'mdi:account', 'mdi:email', 'mdi:phone', 'mdi:settings',
          'fa:home', 'fa:user', 'fa:envelope', 'fa:phone', 'fa:cog',
          'feather:home', 'feather:user', 'feather:mail', 'feather:phone',
          'phosphor:home', 'phosphor:user', 'phosphor:envelope',
          'mdi:heart', 'mdi:star', 'mdi:thumb-up', 'mdi:bell',
          'mdi:info-circle', 'mdi:alert-circle', 'mdi:refresh',
          'mdi:check-circle', 'mdi:close-circle', 'mdi:warning',
          'mdi:lightbulb', 'mdi:camera', 'mdi:music', 'mdi:film'
        ],
      },
      description: '图标名称，格式为 "icon-set:icon-name"，例如 "mdi:home"',
    },
    size: {
      control: {
        type: 'radio',
        options: ['16px', '24px', '32px', '48px', '64px'],
      },
      description: '图标大小，可以是字符串（如 "24px"）或数字',
    },
    color: {
      control: {
        type: 'color',
      },
      description: '图标颜色',
    },
    class: {
      control: {
        type: 'text',
      },
      description: '自定义样式类',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  template: '<jh-icon v-bind="$props" />',
});

// 默认图标
export const 默认图标 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  template: `
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:home" size="24px" />
        <span class="text-xs mt-1">首页</span>
      </div>
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:account" size="24px" />
        <span class="text-xs mt-1">账户</span>
      </div>
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:email" size="24px" />
        <span class="text-xs mt-1">邮件</span>
      </div>
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:phone" size="24px" />
        <span class="text-xs mt-1">电话</span>
      </div>
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:settings" size="24px" />
        <span class="text-xs mt-1">设置</span>
      </div>
    </div>
  `,
});

// 不同大小
export const 不同大小 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  data() {
    return {
      icon: 'mdi:home',
      sizes: ['16px', '24px', '32px', '48px', '64px']
    };
  },
  template: `
    <div class="flex flex-col items-center space-y-4">
      <h3 class="text-lg font-medium">图标大小对比</h3>
      <div class="flex flex-wrap justify-center gap-8">
        <div 
          v-for="size in sizes" 
          :key="size"
          class="flex flex-col items-center"
        >
          <jh-icon :icon="icon" :size="size" />
          <span class="text-sm mt-2">{{ size }}</span>
        </div>
      </div>
    </div>
  `,
});

// 彩色图标
export const 彩色图标 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  template: `
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:heart" size="24px" color="#f44336" />
        <span class="text-xs mt-1">红色</span>
      </div>
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:star" size="24px" color="#ffc107" />
        <span class="text-xs mt-1">黄色</span>
      </div>
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:leaf" size="24px" color="#4caf50" />
        <span class="text-xs mt-1">绿色</span>
      </div>
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:bell" size="24px" color="#ff9800" />
        <span class="text-xs mt-1">橙色</span>
      </div>
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:info-circle" size="24px" color="#2196f3" />
        <span class="text-xs mt-1">蓝色</span>
      </div>
      <div class="flex flex-col items-center p-2">
        <jh-icon icon="mdi:alert-circle" size="24px" color="#9c27b0" />
        <span class="text-xs mt-1">紫色</span>
      </div>
    </div>
  `,
});

// 不同图标集
export const 不同图标集 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 class="text-sm font-medium mb-3">首页图标对比</h4>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="flex flex-col items-center p-2">
            <jh-icon icon="mdi:home" size="24px" />
            <span class="text-xs mt-1">Material</span>
          </div>
          <div class="flex flex-col items-center p-2">
            <jh-icon icon="fa:home" size="24px" />
            <span class="text-xs mt-1">Font Awesome</span>
          </div>
          <div class="flex flex-col items-center p-2">
            <jh-icon icon="feather:home" size="24px" />
            <span class="text-xs mt-1">Feather</span>
          </div>
          <div class="flex flex-col items-center p-2">
            <jh-icon icon="phosphor:home" size="24px" />
            <span class="text-xs mt-1">Phosphor</span>
          </div>
        </div>
      </div>
      <div>
        <h4 class="text-sm font-medium mb-3">用户图标对比</h4>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="flex flex-col items-center p-2">
            <jh-icon icon="mdi:account" size="24px" />
            <span class="text-xs mt-1">Material</span>
          </div>
          <div class="flex flex-col items-center p-2">
            <jh-icon icon="fa:user" size="24px" />
            <span class="text-xs mt-1">Font Awesome</span>
          </div>
          <div class="flex flex-col items-center p-2">
            <jh-icon icon="feather:user" size="24px" />
            <span class="text-xs mt-1">Feather</span>
          </div>
          <div class="flex flex-col items-center p-2">
            <jh-icon icon="phosphor:user" size="24px" />
            <span class="text-xs mt-1">Phosphor</span>
          </div>
        </div>
      </div>
    </div>
  `,
});

// 图标集合展示
export const 图标集合 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  data() {
    return {
      iconSets: [
        {
          name: 'Material Design Icons',
          prefix: 'mdi',
          icons: ['home', 'account', 'email', 'phone', 'settings', 'help-circle', 'heart', 'star', 'thumb-up', 'bell']
        },
        {
          name: 'Font Awesome Icons',
          prefix: 'fa',
          icons: ['home', 'user', 'envelope', 'phone', 'cog', 'question-circle', 'heart', 'star', 'thumbs-up', 'bell']
        },
        {
          name: 'Feather Icons',
          prefix: 'feather',
          icons: ['home', 'user', 'mail', 'phone', 'settings', 'help-circle', 'heart', 'star', 'thumbs-up', 'bell']
        },
        {
          name: 'Phosphor Icons',
          prefix: 'phosphor',
          icons: ['home', 'user', 'envelope', 'phone', 'gear', 'circle-help', 'heart', 'star', 'thumbs-up', 'bell']
        }
      ],
      selectedSet: 0
    };
  },
  template: `
    <div>
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="(set, index) in iconSets"
          :key="index"
          @click="selectedSet = index"
          :class="[
            'px-3 py-1 rounded-full text-sm transition-all',
            selectedSet === index ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          ]"
        >
          {{ set.name }}
        </button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
        <div 
          v-for="(icon, index) in iconSets[selectedSet].icons" 
          :key="index"
          class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
        >
          <jh-icon 
            :icon="iconSets[selectedSet].prefix + ':' + icon" 
            size="32px" 
          />
          <span class="text-xs mt-1 text-center">{{ iconSets[selectedSet].prefix }}:{{ icon }}</span>
        </div>
      </div>
    </div>
  `,
});

// 彩色图标展示
export const 彩色图标展示 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  template: `
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div class="flex flex-col items-center p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-all">
        <jh-icon icon="mdi:heart" size="32px" color="#f44336" />
        <span class="text-xs mt-1">红色爱心</span>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-all">
        <jh-icon icon="mdi:star" size="32px" color="#ffc107" />
        <span class="text-xs mt-1">黄色星星</span>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-all">
        <jh-icon icon="mdi:thumb-up" size="32px" color="#4caf50" />
        <span class="text-xs mt-1">绿色点赞</span>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all">
        <jh-icon icon="mdi:bell" size="32px" color="#ff9800" />
        <span class="text-xs mt-1">橙色铃铛</span>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all">
        <jh-icon icon="mdi:info-circle" size="32px" color="#2196f3" />
        <span class="text-xs mt-1">蓝色信息</span>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all">
        <jh-icon icon="mdi:alert-circle" size="32px" color="#9c27b0" />
        <span class="text-xs mt-1">紫色警告</span>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-all">
        <jh-icon icon="mdi:flower" size="32px" color="#e91e63" />
        <span class="text-xs mt-1">粉色花朵</span>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-all">
        <jh-icon icon="mdi:leaf" size="32px" color="#009688" />
        <span class="text-xs mt-1">青色叶子</span>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-all">
        <jh-icon icon="mdi:star-circle" size="32px" color="#3f51b5" />
        <span class="text-xs mt-1">靛蓝星星</span>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-all">
        <jh-icon icon="mdi:lightbulb" size="32px" color="#ffb300" />
        <span class="text-xs mt-1">琥珀灯泡</span>
      </div>
    </div>
  `,
});

// 不同大小图标展示
export const 不同大小图标 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  data() {
    return {
      sizes: ['16px', '24px', '32px', '48px', '64px'],
      currentIcon: 'mdi:home'
    };
  },
  template: `
    <div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">选择图标：</label>
        <select 
          v-model="currentIcon" 
          class="px-3 py-2 border rounded-md"
        >
          <option value="mdi:home">首页</option>
          <option value="mdi:account">账户</option>
          <option value="mdi:email">邮件</option>
          <option value="mdi:heart">爱心</option>
          <option value="mdi:star">星星</option>
        </select>
      </div>
      <div class="flex flex-col items-center space-y-6">
        <div 
          v-for="size in sizes" 
          :key="size"
          class="flex flex-col items-center"
        >
          <jh-icon :icon="currentIcon" :size="size" />
          <span class="text-sm mt-2">{{ size }}</span>
        </div>
      </div>
    </div>
  `,
});

// 动画效果图标
export const 动画效果图标 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  data() {
    return {
      animations: [
        { name: '旋转动画', class: 'animate-spin', icon: 'mdi:refresh' },
        { name: '脉冲动画', class: 'animate-pulse', icon: 'mdi:heart' },
        { name: '弹跳动画', class: 'animate-bounce', icon: 'mdi:star' },
        { name: '摇摆动画', class: 'animate-[wiggle_1s_ease-in-out_infinite]', icon: 'mdi:bell' },
        { name: '呼吸动画', class: 'animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]', icon: 'mdi:lightbulb' },
        { name: '闪烁动画', class: 'animate-[blink_1s_step-end_infinite]', icon: 'mdi:zap' }
      ],
      showAnimations: true
    };
  },
  template: `
    <div>
      <div class="mb-4 flex justify-center">
        <button 
          @click="showAnimations = !showAnimations"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        >
          {{ showAnimations ? '暂停动画' : '播放动画' }}
        </button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <div 
          v-for="(anim, index) in animations" 
          :key="index"
          class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-all"
        >
          <jh-icon 
            :icon="anim.icon" 
            size="32px" 
            :class="showAnimations ? anim.class : ''" 
          />
          <span class="text-xs mt-2 text-center">{{ anim.name }}</span>
        </div>
      </div>
    </div>
  `,
});

// 交互图标展示
export const 交互图标 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  data() {
    return {
      liked: false,
      favorited: false,
      notifications: 0,
      loading: false
    };
  },
  methods: {
    toggleLike() {
      this.liked = !this.liked;
    },
    toggleFavorite() {
      this.favorited = !this.favorited;
    },
    addNotification() {
      this.notifications++;
    },
    clearNotifications() {
      this.notifications = 0;
    },
    simulateLoading() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  },
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <!-- 点赞和收藏 -->
      <div class="flex flex-col items-center p-4 border rounded-lg">
        <h3 class="text-lg font-medium mb-4">社交互动</h3>
        <div class="flex space-x-8">
          <div class="flex flex-col items-center">
            <button 
              @click="toggleLike"
              class="p-2 rounded-full hover:bg-gray-100 transition-all"
            >
              <jh-icon 
                icon="mdi:heart" 
                size="48px" 
                :color="liked ? '#f44336' : ''" 
              />
            </button>
            <span class="text-sm mt-2">{{ liked ? '已点赞' : '点赞' }}</span>
          </div>
          <div class="flex flex-col items-center">
            <button 
              @click="toggleFavorite"
              class="p-2 rounded-full hover:bg-gray-100 transition-all"
            >
              <jh-icon 
                icon="mdi:star" 
                size="48px" 
                :color="favorited ? '#ffc107' : ''" 
              />
            </button>
            <span class="text-sm mt-2">{{ favorited ? '已收藏' : '收藏' }}</span>
          </div>
        </div>
      </div>
      
      <!-- 通知和加载 -->
      <div class="flex flex-col items-center p-4 border rounded-lg">
        <h3 class="text-lg font-medium mb-4">通知和加载</h3>
        <div class="flex space-x-8">
          <div class="flex flex-col items-center relative">
            <button 
              @click="addNotification"
              class="p-2 rounded-full hover:bg-gray-100 transition-all"
            >
              <jh-icon icon="mdi:bell" size="48px" />
            </button>
            <span class="text-sm mt-2">添加通知</span>
            <span 
              v-if="notifications > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
            >
              {{ notifications }}
            </span>
          </div>
          <div class="flex flex-col items-center">
            <button 
              @click="simulateLoading"
              :disabled="loading"
              class="p-2 rounded-full hover:bg-gray-100 transition-all"
            >
              <jh-icon 
                icon="mdi:refresh" 
                size="48px" 
                :class="loading ? 'animate-spin' : ''" 
              />
            </button>
            <span class="text-sm mt-2">{{ loading ? '加载中...' : '加载' }}</span>
          </div>
        </div>
        <button 
          v-if="notifications > 0"
          @click="clearNotifications"
          class="mt-4 px-3 py-1 bg-gray-200 rounded-full text-xs"
        >
          清除通知
        </button>
      </div>
    </div>
  `,
});

// 图标分类展示
export const 图标分类 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { JhIcon },
  data() {
    return {
      categories: [
        {
          name: '常用图标',
          icons: [
            { name: '首页', value: 'mdi:home' },
            { name: '账户', value: 'mdi:account' },
            { name: '邮件', value: 'mdi:email' },
            { name: '电话', value: 'mdi:phone' },
            { name: '设置', value: 'mdi:settings' }
          ]
        },
        {
          name: '社交图标',
          icons: [
            { name: '点赞', value: 'mdi:thumb-up' },
            { name: '评论', value: 'mdi:comment' },
            { name: '分享', value: 'mdi:share' },
            { name: '收藏', value: 'mdi:star' },
            { name: '关注', value: 'mdi:account-plus' }
          ]
        },
        {
          name: '媒体图标',
          icons: [
            { name: '图片', value: 'mdi:image' },
            { name: '视频', value: 'mdi:film' },
            { name: '音乐', value: 'mdi:music' },
            { name: '相机', value: 'mdi:camera' },
            { name: '麦克风', value: 'mdi:microphone' }
          ]
        },
        {
          name: '状态图标',
          icons: [
            { name: '成功', value: 'mdi:check-circle' },
            { name: '错误', value: 'mdi:close-circle' },
            { name: '警告', value: 'mdi:alert-circle' },
            { name: '信息', value: 'mdi:info-circle' },
            { name: '疑问', value: 'mdi:help-circle' }
          ]
        }
      ],
      activeCategory: 0
    };
  },
  template: `
    <div>
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="(cat, index) in categories"
          :key="index"
          @click="activeCategory = index"
          :class="[
            'px-4 py-2 rounded-full text-sm transition-all',
            activeCategory === index ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          ]"
        >
          {{ cat.name }}
        </button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div 
          v-for="(icon, index) in categories[activeCategory].icons" 
          :key="index"
          class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
        >
          <jh-icon :icon="icon.value" size="32px" />
          <span class="text-xs mt-1 text-center">{{ icon.name }}</span>
          <span class="text-xs text-gray-500 mt-1">{{ icon.value }}</span>
        </div>
      </div>
    </div>
  `,
});