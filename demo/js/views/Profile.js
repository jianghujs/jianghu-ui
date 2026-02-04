window.ProfileView = {
  template: `
    <div class="page-container min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Left Column: User Info -->
          <div class="w-full lg:w-1/4">
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <!-- Profile Header -->
              <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                <div class="flex justify-center mb-4">
                  <img 
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" 
                    alt="avatar" 
                    class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  >
                </div>
                <div class="text-center">
                  <h2 class="text-2xl font-bold mb-1">{{ userInfo.name }}</h2>
                  <p class="text-blue-100">{{ userInfo.title }}</p>
                </div>
              </div>
              
              <!-- Profile Details -->
              <div class="p-6">
                <div class="space-y-4 mb-6">
                  <div class="flex items-center text-gray-700">
                    <v-icon small class="mr-3 text-blue-500">mdi-briefcase-outline</v-icon>
                    <span>{{ userInfo.title }}</span>
                  </div>
                  <div class="flex items-center text-gray-700">
                    <v-icon small class="mr-3 text-blue-500">mdi-sitemap-outline</v-icon>
                    <span>{{ userInfo.group }}</span>
                  </div>
                  <div class="flex items-center text-gray-700">
                    <v-icon small class="mr-3 text-blue-500">mdi-map-marker-outline</v-icon>
                    <span>{{ userInfo.address }}</span>
                  </div>
                </div>

                <!-- Tags Section -->
                <div class="border-t border-gray-100 pt-6 mb-6">
                  <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">标签</h3>
                  <div class="flex flex-wrap gap-2">
                    <v-chip 
                      v-for="tag in userInfo.tags" 
                      :key="tag" 
                      small 
                      outlined 
                      class="bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-500 transition-colors"
                    >
                      {{ tag }}
                    </v-chip>
                    <v-chip 
                      small 
                      outlined 
                      @click="addTag"
                      class="bg-white text-blue-500 border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <v-icon small>mdi-plus</v-icon>
                    </v-chip>
                  </div>
                </div>

                <!-- Teams Section -->
                <div class="border-t border-gray-100 pt-6">
                  <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">团队</h3>
                  <div class="space-y-3">
                    <div 
                      v-for="team in userInfo.teams" 
                      :key="team.name" 
                      class="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div class="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                        <img :src="team.icon" :alt="team.name" class="w-full h-full object-cover">
                      </div>
                      <span class="text-sm font-medium text-gray-700">{{ team.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Tabs & Content -->
          <div class="w-full lg:w-3/4">
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <!-- Tabs -->
              <div class="border-b border-gray-200">
                <v-tabs v-model="activeTab" background-color="transparent" class="px-6">
                  <v-tab class="text-base font-medium text-gray-600 hover:text-gray-900">
                    文章 ({{ articles.length }})
                  </v-tab>
                  <v-tab class="text-base font-medium text-gray-600 hover:text-gray-900">
                    应用 (8)
                  </v-tab>
                  <v-tab class="text-base font-medium text-gray-600 hover:text-gray-900">
                    项目 (8)
                  </v-tab>
                </v-tabs>
              </div>

              <!-- Tab Content -->
              <v-tabs-items v-model="activeTab" class="p-6">
                <v-tab-item>
                  <div class="space-y-6">
                    <div 
                      v-for="(item, index) in articles" 
                      :key="item.title" 
                      class="p-5 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                      <h3 class="text-xl font-semibold mb-3">
                        <a 
                          :href="item.href" 
                          target="_blank" 
                          class="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          {{ item.title }}
                        </a>
                      </h3>
                      <div class="mb-4 flex flex-wrap gap-2">
                        <v-chip 
                          x-small 
                          outlined 
                          v-for="tag in item.tags" 
                          :key="tag" 
                          class="text-xs text-gray-600 border-gray-200"
                        >
                          {{ tag }}
                        </v-chip>
                      </div>
                      <p class="text-gray-700 mb-4 line-clamp-2">{{ item.content }}</p>
                      <div class="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                        <span class="mr-6 font-medium text-gray-700">{{ item.author }}</span>
                        <span class="mr-6">
                          发布在 
                          <a 
                            :href="item.href" 
                            target="_blank" 
                            class="text-blue-500 hover:underline"
                          >
                            {{ item.href }}
                          </a>
                        </span>
                        <span>{{ item.updatedAt }}</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-500 pt-3 border-t border-gray-100">
                        <button class="flex items-center mr-6 hover:text-blue-500 transition-colors">
                          <v-icon small class="mr-1">mdi-star-outline</v-icon>
                          <span>{{ item.star }}</span>
                        </button>
                        <button class="flex items-center mr-6 hover:text-blue-500 transition-colors">
                          <v-icon small class="mr-1">mdi-thumb-up-outline</v-icon>
                          <span>{{ item.like }}</span>
                        </button>
                        <button class="flex items-center hover:text-blue-500 transition-colors">
                          <v-icon small class="mr-1">mdi-message-outline</v-icon>
                          <span>{{ item.message }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </v-tab-item>
                <v-tab-item>
                  <div class="flex flex-col items-center justify-center py-16 text-center">
                    <v-icon large class="text-gray-300 mb-4">mdi-apps</v-icon>
                    <h3 class="text-lg font-medium text-gray-900 mb-1">应用列表暂无数据</h3>
                    <p class="text-gray-500">您还没有添加任何应用</p>
                  </div>
                </v-tab-item>
                <v-tab-item>
                  <div class="flex flex-col items-center justify-center py-16 text-center">
                    <v-icon large class="text-gray-300 mb-4">mdi-folder</v-icon>
                    <h3 class="text-lg font-medium text-gray-900 mb-1">项目列表暂无数据</h3>
                    <p class="text-gray-500">您还没有添加任何项目</p>
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      activeTab: 0,
      userInfo: window.MockData.profile.userInfo,
      articles: window.MockData.profile.articles
    };
  },
  methods: {
    addTag() {
      const tag = prompt('请输入新标签');
      if (tag) {
        this.userInfo.tags.push(tag);
      }
    }
  }
};
