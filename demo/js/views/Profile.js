window.ProfileView = {
  template: `
    <div class="page-container">
      <v-row>
        <!-- Left Column: User Info -->
        <v-col cols="12" md="4" lg="3">
          <jh-card :bordered="false" class="mb-4">
            <div class="text-center mb-6">
              <v-avatar size="104" class="mb-4">
                <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="avatar">
              </v-avatar>
              <div class="text-h5 font-weight-bold mb-1">{{ userInfo.name }}</div>
              <div class="text-body-1">{{ userInfo.title }}</div>
            </div>
            
            <div class="profile-detail mb-6">
              <div class="mb-2"><v-icon small left>mdi-briefcase-outline</v-icon>{{ userInfo.title }}</div>
              <div class="mb-2"><v-icon small left>mdi-sitemap-outline</v-icon>{{ userInfo.group }}</div>
              <div class="mb-2"><v-icon small left>mdi-map-marker-outline</v-icon>{{ userInfo.address }}</div>
            </div>

            <v-divider class="mb-6"></v-divider>

            <div class="mb-6">
              <div class="text-subtitle-1 font-weight-bold mb-3">标签</div>
              <div class="d-flex flex-wrap">
                <v-chip v-for="tag in userInfo.tags" :key="tag" small outlined class="mr-2 mb-2">
                  {{ tag }}
                </v-chip>
                <v-chip small outlined class="mb-2" @click="addTag">
                  <v-icon small>mdi-plus</v-icon>
                </v-chip>
              </div>
            </div>

            <v-divider class="mb-6"></v-divider>

            <div>
              <div class="text-subtitle-1 font-weight-bold mb-3">团队</div>
              <v-row dense>
                <v-col v-for="team in userInfo.teams" :key="team.name" cols="6" class="mb-2">
                  <div class="d-flex align-center">
                    <v-avatar size="24" class="mr-2">
                      <img :src="team.icon" :alt="team.name">
                    </v-avatar>
                    <span class="text-caption text-truncate">{{ team.name }}</span>
                  </div>
                </v-col>
              </v-row>
            </div>
          </jh-card>
        </v-col>

        <!-- Right Column: Tabs & Content -->
        <v-col cols="12" md="8" lg="9">
          <jh-card :bordered="false">
            <v-tabs v-model="activeTab" background-color="transparent">
              <v-tab>文章 ({{ articles.length }})</v-tab>
              <v-tab>应用 (8)</v-tab>
              <v-tab>项目 (8)</v-tab>
            </v-tabs>

            <v-tabs-items v-model="activeTab" class="mt-4">
              <v-tab-item>
                <v-list three-line>
                  <template v-for="(item, index) in articles">
                    <v-list-item :key="item.title">
                      <v-list-item-content>
                        <v-list-item-title class="text-h6 mb-1">
                          <a :href="item.href" target="_blank" class="text-decoration-none black--text">{{ item.title }}</a>
                        </v-list-item-title>
                        <div class="mb-2">
                          <v-chip x-small outlined v-for="tag in item.tags" :key="tag" class="mr-1">{{ tag }}</v-chip>
                        </div>
                        <v-list-item-subtitle class="text--primary mb-2">
                          {{ item.content }}
                        </v-list-item-subtitle>
                        <div class="d-flex align-center caption grey--text">
                          <span class="mr-4 text-primary">{{ item.author }}</span>
                          <span class="mr-4">发布在 {{ item.href }}</span>
                          <span>{{ item.updatedAt }}</span>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                    
                    <div class="d-flex px-4 pb-4 grey--text text-caption" :key="'actions-' + index">
                      <span class="mr-4 d-flex align-center"><v-icon small left>mdi-star-outline</v-icon> {{ item.star }}</span>
                      <span class="mr-4 d-flex align-center"><v-icon small left>mdi-thumb-up-outline</v-icon> {{ item.like }}</span>
                      <span class="d-flex align-center"><v-icon small left>mdi-message-outline</v-icon> {{ item.message }}</span>
                    </div>
                    <v-divider v-if="index < articles.length - 1" :key="'div-' + index"></v-divider>
                  </template>
                </v-list>
              </v-tab-item>
              <v-tab-item>
                <div class="pa-4 text-center grey--text">应用列表暂无数据</div>
              </v-tab-item>
              <v-tab-item>
                <div class="pa-4 text-center grey--text">项目列表暂无数据</div>
              </v-tab-item>
            </v-tabs-items>
          </jh-card>
        </v-col>
      </v-row>
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
