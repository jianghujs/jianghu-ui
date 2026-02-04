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
  },

  // HR System Data
  hrStats: {
    totalEmployees: {
      value: 1245,
      trend: "5%",
      trendType: "up",
      newHires: 45
    },
    recruitment: {
      value: 32,
      target: 50,
      progress: 64, // percentage
      interviews: 128
    },
    turnover: {
      value: "2.3%",
      trend: "0.5%",
      trendType: "down",
      leavers: 8
    },
    departmentDist: [
      { value: 335, name: '研发部' },
      { value: 310, name: '销售部' },
      { value: 234, name: '市场部' },
      { value: 135, name: '人事部' },
      { value: 1548, name: '运营部' }
    ],
    funnel: [
      { value: 100, name: '简历筛选' },
      { value: 80, name: '初试' },
      { value: 60, name: '复试' },
      { value: 40, name: 'Offer' },
      { value: 20, name: '入职' }
    ]
  },

  salaryStats: {
    departmentSalary: [
      { name: '研发部', value: 25000 },
      { name: '销售部', value: 18000 },
      { name: '市场部', value: 16000 },
      { name: '人事部', value: 12000 },
      { name: '运营部', value: 14000 }
    ],
    yearlyTrend: {
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      values: [1200, 1250, 1300, 1320, 1350, 1400, 1420, 1450, 1480, 1500, 1550, 1600] // 单位：万元
    }
  },

  employees: Array.from({ length: 50 }).map((_, i) => ({
    id: `EMP${String(i + 1).padStart(4, '0')}`,
    name: ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十'][i % 8] + (Math.floor(i / 8) + 1),
    department: ['研发部', '销售部', '市场部', '人事部', '运营部'][i % 5],
    position: ['工程师', '销售经理', '市场专员', 'HRBP', '运营主管'][i % 5],
    status: ['active', 'probation', 'leave'][i % 3],
    joinDate: `202${Math.floor(Math.random() * 4) + 1}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-15`,
    email: `emp${i + 1}@example.com`,
    phone: `1380013${String(i).padStart(4, '0')}`
  })),

  departments: [
    { id: 1, name: '研发部', manager: '张总监', count: 335, location: '3F-A区', established: '2020-01-01' },
    { id: 2, name: '销售部', manager: '李总监', count: 310, location: '3F-B区', established: '2020-02-01' },
    { id: 3, name: '市场部', manager: '王总监', count: 234, location: '4F-A区', established: '2020-03-01' },
    { id: 4, name: '人事部', manager: '赵经理', count: 135, location: '4F-B区', established: '2020-01-01' },
    { id: 5, name: '运营部', manager: '孙总监', count: 1548, location: '5F-Whole', established: '2019-12-01' }
  ],

  candidates: Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    name: ['Candidate A', 'Candidate B', 'Candidate C', 'Candidate D'][i % 4] + i,
    position: ['Java工程师', '前端专家', '销售代表', '产品经理'][i % 4],
    status: ['new', 'screening', 'interview', 'offer', 'hired', 'rejected'][i % 6],
    experience: `${Math.floor(Math.random() * 10) + 1}年`,
    education: ['本科', '硕士', '博士', '大专'][i % 4],
    applyDate: `2026-02-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
  }))
};
