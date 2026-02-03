window.MockData = {
  statistics: {
    sales: {
      value: 126560,
      trend: "12%",
      trendType: "up",
      dayTrend: "11%",
      dayTrendType: "down",
      dailySales: 12423
    },
    visits: {
      value: 8846,
      chartData: [20, 40, 60, 45, 80, 50, 90, 100, 80, 60, 50, 40],
      dailyVisits: 1234
    },
    payments: {
      value: 6560,
      conversionRate: "60%",
      chartData: [40, 50, 45, 60, 55, 65, 50, 60, 70, 50, 40, 30]
    },
    activity: {
      value: "78%",
      target: "80%",
      progress: 78
    }
  },
  
  salesTrend: {
    dates: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    sales: [500, 200, 680, 1100, 200, 550, 230, 1150, 550, 980, 880, 520],
    visits: [300, 150, 400, 800, 150, 400, 200, 900, 450, 800, 700, 400]
  },

  rankingList: [
    { name: '工专路 0 号店', value: '323,234' },
    { name: '工专路 1 号店', value: '323,234' },
    { name: '工专路 2 号店', value: '323,234' },
    { name: '工专路 3 号店', value: '323,234' },
    { name: '工专路 4 号店', value: '323,234' },
    { name: '工专路 5 号店', value: '323,234' },
    { name: '工专路 6 号店', value: '323,234' }
  ],

  projects: [
    {
      id: 1,
      name: '江湖 CRM 重构',
      owner: '陈晓',
      status: 'running',
      priority: 'high',
      members: 12,
      updatedAt: '2025-02-01',
    },
    {
      id: 2,
      name: '移动端审批',
      owner: '刘伟',
      status: 'planning',
      priority: 'medium',
      members: 8,
      updatedAt: '2025-01-28',
    },
    {
      id: 3,
      name: 'BI 可视化',
      owner: '赵云',
      status: 'running',
      priority: 'critical',
      members: 5,
      updatedAt: '2025-01-25',
    },
    {
      id: 4,
      name: '统一登录',
      owner: '林雪',
      status: 'finished',
      priority: 'low',
      members: 4,
      updatedAt: '2025-01-19',
    },
    {
      id: 5,
      name: '小程序商城',
      owner: '王强',
      status: 'planning',
      priority: 'high',
      members: 6,
      updatedAt: '2025-01-15',
    },
    {
      id: 6,
      name: '数据大屏',
      owner: '李丽',
      status: 'running',
      priority: 'medium',
      members: 3,
      updatedAt: '2025-01-10',
    }
  ],

  rules: Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: `TradeCode ${99 - i}`,
    desc: '这是一段描述',
    callCount: Math.floor(Math.random() * 1000) + '万',
    status: ['online', 'running', 'exception', 'closed'][i % 4],
    updatedAt: '2026-02-03 21:12:40'
  })),

  profile: {
    userInfo: {
      name: 'Serati Ma',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      address: '浙江省杭州市',
      tags: ['很有想法', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],
      teams: [
        { name: '科学搬砖组', icon: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png' },
        { name: '全组都是吴彦祖', icon: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png' },
        { name: '中二少女团', icon: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png' },
        { name: '程序员日常', icon: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png' },
        { name: '高逼格设计天团', icon: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png' },
        { name: '骗你来学计算机', icon: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLQNjuECGto.png' }
      ]
    },
    articles: [
      {
        title: 'Alipay',
        tags: ['Ant Design', '设计语言', '蚂蚁金服'],
        content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
        author: '付小小',
        href: 'https://ant.design',
        updatedAt: '2026-02-03 23:10',
        star: 162,
        like: 172,
        message: 20,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png'
      },
      {
        title: 'Angular',
        tags: ['Ant Design', '设计语言', '蚂蚁金服'],
        content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
        author: '曲丽丽',
        href: 'https://ant.design',
        updatedAt: '2026-02-03 21:10',
        star: 104,
        like: 117,
        message: 19,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png'
      },
      {
        title: 'Ant Design',
        tags: ['Ant Design', '设计语言', '蚂蚁金服'],
        content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
        author: '林东东',
        href: 'https://ant.design',
        updatedAt: '2026-02-03 18:30',
        star: 156,
        like: 145,
        message: 23,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png'
      }
    ]
  }
};
