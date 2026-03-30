# 部署指南

## 📋 部署概述

宠物店AI营销工具箱的部署指南，涵盖从本地开发到生产环境的完整部署流程。

## 🏗️ 部署架构

### 部署环境
```
部署环境
├── 开发环境
│   ├── 本地开发环境
│   ├── 开发测试环境
│   └── 开发部署环境
├── 测试环境
│   ├── 功能测试环境
│   ├── 性能测试环境
│   └── 集成测试环境
└── 生产环境
    ├── 生产部署环境
    ├── 生产监控环境
    └── 生产备份环境
```

### 部署工具
```
部署工具
├── 静态部署工具
│   ├── Netlify CLI
│   ├── Vercel CLI
│   └── GitHub Pages
├── 容器部署工具
│   ├── Docker
│   ├── Docker Compose
│   └── Kubernetes
└── 云服务部署工具
    ├── AWS CLI
    ├── Azure CLI
    └── Google Cloud CLI
```

## 📊 部署准备

### 环境要求
```
环境要求
├── 操作系统要求
│   ├── Linux (Ubuntu/CentOS)
│   ├── macOS
│   └── Windows
├── 软件环境要求
│   ├── Node.js >= 14
│   ├── npm >= 6
│   └── Git >= 2
└── 工具要求
    ├── Docker >= 20
    ├── Netlify CLI >= 6
    └── GitHub CLI >= 2
```

### 代码要求
```
代码要求
├── 代码质量要求
│   ├── 代码审查通过
│   ├── 单元测试通过
│   └── 集成测试通过
├── 代码规范要求
│   ├── ESLint规范
│   ├── Prettier规范
│   └── Git规范
└── 代码安全要求
    ├── 安全检查通过
    ├── 漏洞检查通过
    └── 权限检查通过
```

## 📝 部署流程

### 本地开发部署流程
```bash
# 1. 克隆项目
git clone https://github.com/<username>/petshop-ai-toolkit.git
cd petshop-ai-toolkit

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm start

# 4. 开发测试
npm test

# 5. 开发部署
npm run deploy:dev
```

### 静态部署流程（Netlify）
```bash
# 1. 安装Netlify CLI
npm install -g netlify-cli

# 2. 登录Netlify
netlify login

# 3. 部署到Netlify
netlify deploy --prod

# 4. 设置环境变量（如果需要）
netlify env:set API_KEY=value

# 5. 部署确认
netlify open
```

### 静态部署流程（Vercel）
```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录Vercel
vercel login

# 3. 部署到Vercel
vercel --prod

# 4. 设置环境变量（如果需要）
vercel env add API_KEY

# 5. 部署确认
vercel open
```

### 静态部署流程（GitHub Pages）
```bash
# 1. 配置GitHub Actions
# 参考 .github/workflows/deploy.yml

# 2. 提交代码到GitHub
git add .
git commit -m "部署准备"
git push origin main

# 3. 触发GitHub Actions
# 自动部署到GitHub Pages

# 4. 验证部署
# 访问 https://<username>.github.io/petshop-ai-toolkit
```

### 容器部署流程（Docker）
```bash
# 1. 构建Docker镜像
docker build -t petshop-ai-toolkit .

# 2. 运行Docker容器
docker run -p 3000:3000 petshop-ai-toolkit

# 3. Docker Compose部署
docker-compose up -d

# 4. Kubernetes部署
kubectl apply -f k8s/deployment.yaml

# 5. 验证部署
curl http://localhost:3000
```

### 云服务部署流程（AWS）
```bash
# 1. 安装AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# 2. 配置AWS
aws configure

# 3. 部署到AWS
aws s3 sync dist/ s3://petshop-ai-toolkit-bucket

# 4. 部署验证
aws cloudformation describe-stacks --stack-name petshop-ai-toolkit
```

## 📈 部署配置

### Netlify配置
```json
// netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "functions"

[redirects]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Vercel配置
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/.*",
      "headers": {
        "cache-control": "public, max-age=3600",
        "content-security-policy": "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js; img-src *"
      }
    }
  ],
  "rewrites": [
    {
      "source": "/",
      "destination": "/index.html"
    }
  ]
}
```

### GitHub Actions配置
```yaml
// .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 14
        
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@4.1.0
        with:
          branch: gh-pages
          folder: dist
```

### Docker配置
```dockerfile
// Dockerfile
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose配置
```yaml
// docker-compose.yml
version: '3.8'

services:
  petshop-ai-toolkit:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./dist:/app/dist
```

### Kubernetes配置
```yaml
// k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: petshop-ai-toolkit
spec:
  replicas: 3
  selector:
    matchLabels:
      app: petshop-ai-toolkit
  template:
    metadata:
      labels:
        app: petshop-ai-toolkit
    spec:
      containers:
      - name: petshop-ai-toolkit
        image: petshop-ai-toolkit:latest
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: petshop-ai-toolkit-service
spec:
  selector:
    app: petshop-ai-toolkit
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
```

## 🛡️ 部署安全

### 安全配置
```
安全配置
├── SSL证书配置
│   ├── HTTPS强制启用
│   ├── SSL证书续期
│   └── SSL证书监控
├── 防火墙配置
│   ├── 防火墙规则配置
│   ├── 防火墙策略配置
│   └── 防火墙监控配置
└── 访问控制配置
    ├── 访问权限控制
    ├── 访问策略配置
    └── 访问监控配置
```

### 监控配置
```
监控配置
├── 性能监控
│   ├── CPU监控
│   ├── 内存监控
│   └── 磁盘监控
├── 应用监控
│   ├── API监控
│   ├── 错误监控
│   └── 日志监控
└── 安全监控
    ├── 漏洞监控
    ├── 攻击监控
    └── 访问监控
```

### 备份配置
```
备份配置
├── 数据库备份
│   ├── 自动备份配置
│   ├── 备份验证配置
│   └── 备份恢复配置
├── 文件备份
│   ├── 文件备份配置
│   ├── 备份验证配置
│   └── 备份恢复配置
└── 应用备份
    ├── 应用备份配置
    ├── 备份验证配置
    └── 备份恢复配置
```

## 📊 部署验证

### 功能验证
```
功能验证
├── 宠物身份证功能验证
│   ├── 身份证生成验证
│   ├── 身份证下载验证
│   └── 身份证分享验证
├── 健康档案功能验证
│   ├── 档案保存验证
│   ├── 疫苗记录验证
│   └── 体检提醒验证
└── 积分商城功能验证
    ├── 积分添加验证
    ├── 商品兑换验证
    └── 积分记录验证
```

### 性能验证
```
性能验证
├── 页面加载验证
│   ├── 初始加载时间验证
│   ├── 用户交互响应验证
│   └── API响应时间验证
├── 数据库性能验证
│   ├── 查询性能验证
│   ├── 写入性能验证
│   └── 连接性能验证
└── 网络性能验证
    ├── 网络带宽验证
    ├── 网络延迟验证
    └── 网络质量验证
```

### 安全验证
```
安全验证
├── SSL验证
│   ├── SSL证书验证
│   ├── HTTPS连接验证
│   └── SSL配置验证
├── 防火墙验证
│   ├── 防火墙规则验证
│   ├── 防火墙策略验证
│   └── 防火墙配置验证
└── 权限验证
    ├── 权限控制验证
    ├── 权限配置验证
    └── 权限策略验证
```

## 📅 部署计划

### 部署时间计划
```
部署时间计划
├── 本地开发部署：随时
├── 测试环境部署：每周
└── 生产环境部署：每月
```

### 部署资源计划
```
部署资源计划
├── 开发部署资源：1人
├── 测试部署资源：2人
└── 生产部署资源：3人
```

### 部署监控计划
```
部署监控计划
├── 部署前监控：性能监控
├── 部署中监控：状态监控
└── 部署后监控：运行监控
```

---

## 🎯 部署验收标准

### 功能验收标准
- 所有功能正常工作
- 用户界面友好可用
- 错误处理正确有效

### 性能验收标准
- 页面加载时间 <= 2秒
- API响应时间 <= 100毫秒
- 并发处理能力 >= 100用户

### 安全验收标准
- SSL证书正常有效
- 防火墙配置正确有效
- 权限控制正确有效

---

所有部署工作将按照本文档的指南执行，确保宠物店AI营销工具箱的正确部署和安全运行。