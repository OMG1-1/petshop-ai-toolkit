# 宠物店AI营销工具箱

## 🎯 项目介绍

宠物店AI营销工具箱是一个参考**美柚App**逻辑设计的综合性宠物店数字营销解决方案，包含：

- **宠物身份证生成器**（情绪价值工具）
- **宠物健康档案管理**（健康管理工具）
- **积分商城系统**（电商转化路径）
- **社交分享功能**（社交传播工具）

## 🚀 快速访问

- **在线演示**: http://startling-blini-5c2f40.netlify.app
- **访问密码**: My-Drop-Site
- **GitHub仓库**: https://github.com/OMG1-1/petshop-ai-toolkit

## ✨ 最新更新

### **简约可爱风格** (2024-03-30)
- 粉红色渐变设计
- 圆润可爱UI元素
- 动画交互效果
- 宠物emoji图标
- 可爱弹窗通知

## 📋 核心功能

### 1. 宠物身份证生成器 📸
- 照片上传功能
- 个性化称号生成（带emoji）
- 二维码引流设计
- 分享文案生成

### 2. 宠物健康档案 🏥
- 体重记录管理
- 疫苗记录跟踪
- 体检提醒功能
- 健康数据统计

### 3. 积分商城系统 🛒
- 积分计算机制
- 商品兑换逻辑
- 积分历史记录
- 会员等级系统

### 4. 社交分享功能 📱
- 分享文案优化
- 社交平台适配
- 分享积分奖励
- 社交传播分析

## 🎨 设计特色

### **可爱风格设计**
- **配色**: 粉红色渐变 (#ff9ecb → #ffb9d6)
- **图标**: 宠物emoji动态变化
- **动画**: 按钮hover、卡片hover、输入框focus动画
- **交互**: 可爱弹窗通知、积分动画效果

### **用户体验优化**
- **响应式**: 适配多种设备屏幕
- **交互**: 按钮反馈、动画过渡
- **易用**: 简洁明了的界面设计
- **趣味**: 宠物种类对应emoji图标

## 🏗️ 技术架构

### **当前版本**
- **前端**: HTML5 + CSS3 + JavaScript（纯前端解决方案）
- **部署**: Netlify静态托管
- **数据**: 浏览器localStorage（当前）

### **后续架构** (Vue + Naive UI + SpringAI + MariaDB)
- **前端**: Vue.js + Naive UI组件库
- **后端**: Spring Boot + SpringAI
- **数据库**: MariaDB + Redis缓存
- **部署**: Docker容器化部署

## 📈 用户量评估

### **MariaDB容量评估**
| 用户量 | MariaDB性能 | 建议 |
|-------|------------|------|
| 100用户/月 | 完全胜任 | 单实例即可 |
| 1,000用户/月 | 表现良好 | 单实例 + 索引优化 |
| 10,000用户/月 | 需要优化 | 读写分离 + 缓存 |
| 100,000用户/月 | 需要扩展 | 分库分表 + 集群 |

### **SpringAI成本评估**
| AI功能 | API成本 | 建议 |
|-------|---------|------|
| 对话功能 | OpenAI API费用 | 需要API密钥 |
| 图像生成 | 稳定扩散API费用 | 需要API密钥 |
| 文本分析 | 本地模型可能 | 可以使用SpringAI本地模型 |

## 📊 后续开发计划

### **Phase 1: 前端重构 (Vue + Naive UI)**
```
前端架构
├── Vue.js (核心框架)
├── Vite (构建工具)
├── Naive UI (组件库)
├── Vue Router (路由管理)
├── Pinia/Vuex (状态管理)
└── TypeScript (类型安全)
```

### **Phase 2: 后端重构 (SpringAI + MariaDB)**
```
后端架构
├── Spring Boot (Java框架)
├── SpringAI (AI功能集成)
├── MariaDB (数据库)
├── Redis (缓存)
├── Spring Security (安全)
└── Spring Data JPA (数据访问)
```

### **Phase 3: AI功能实现**
```
AI功能
├── 宠物名称AI生成
├── 宠物文案AI优化
├── 宠物健康AI分析
├── 营销文案AI生成
└── 用户行为AI预测
```

## 📁 项目文档

本项目严格按照**软件工程开发规范**开发，包含完整的文档体系：

1. **[TECHNICAL_DESIGN.md](./TECHNICAL_DESIGN.md)** - 技术设计文档
2. **[API_DESIGN.md](./API_DESIGN.md)** - API接口设计文档
3. **[DATABASE_DESIGN.md](./DATABASE_DESIGN.md)** - 数据库设计文档
4. **[TEST_PLAN.md](./TEST_PLAN.md)** - 测试计划文档
5. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - 部署指南文档
6. **[PROJECT_MANAGEMENT.md](./PROJECT_MANAGEMENT.md)** - 项目管理文档

## 🧪 质量保证

- **测试覆盖率**: 单元测试覆盖率 >= 80%
- **代码规范性**: 遵循统一代码规范
- **技术文档**: 每个功能都有详细文档
- **部署规范**: 标准化的部署流程

## 🎯 成功指标

### **技术指标**
- 页面加载时间 < 2秒
- 用户交互响应时间 < 100ms
- 浏览器兼容性 >= IE11
- 错误率 < 0.1%

### **业务指标**
- 宠物身份证生成数量 > 100/月
- 用户留存率 > 30%
- 积分兑换率 > 10%
- 用户满意度评分 > 4/5

---

## 🔧 快速开始

### **本地运行**
```bash
# 克隆项目
git clone https://github.com/OMG1-1/petshop-ai-toolkit.git
cd petshop-ai-toolkit

# 启动本地服务器
python3 -m http.server 8000
```

### **Netlify部署**
```bash
# 部署到Netlify
npx netlify deploy --dir . --allow-anonymous
```

---

**作者**: 镇洋🌊  
**技术支持**: 元宝  
**部署状态**: MVP版本已上线，UI已优化为简约可爱风格