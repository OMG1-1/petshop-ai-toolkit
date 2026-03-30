# API接口设计文档

## 🎯 概述

本文档定义宠物店AI营销工具箱的API接口设计，用于后续扩展为后端服务时使用。

## 📊 版本信息
- **版本**: 1.0.0
- **状态**: 设计阶段（当前版本为纯前端）

## 🔧 API设计原则

### RESTful设计原则
- 使用标准的HTTP方法
- 资源导向的URL设计
- JSON格式数据交换
- 一致的错误处理

### 安全设计原则
- JWT认证机制
- 输入验证和消毒
- 速率限制
- 请求签名

### 性能设计原则
- 分页机制
- 缓存策略
- 异步处理
- 错误降级

## 📝 基础API接口

### 认证API
```javascript
// POST /api/auth/login
{
  "username": "string",  // 用户名
  "password": "string"   // 密码
}

Response:
{
  "token": "string",     // JWT token
  "user": {              // 用户信息
    "id": "string",
    "username": "string",
    "points": "number"
  }
}

// POST /api/auth/logout
{
  "token": "string"      // JWT token
}
```

### 宠物档案API
```javascript
// POST /api/pets/create
{
  "name": "string",      // 宠物名字
  "type": "string",      // 宠物品种
  "age": "string",       // 宠物年龄
  "photo": "string",     // 宠物照片（base64）
  "store": "string"      // 宠物店名称
}

Response:
{
  "pet": {               // 宠物信息
    "id": "string",
    "name": "string",
    "type": "string",
    "age": "string",
    "photo": "string",
    "title": "string",
    "createdAt": "date"
  }
}

// GET /api/pets/{id}
Response:
{
  "pet": {               // 宠物信息
    "id": "string",
    "name": "string",
    "type": "string",
    "age": "string",
    "photo": "string",
    "health": {          // 健康信息
      "weight": "string",
      "vaccines": "array",
      "checkup": "object"
    },
    "createdAt": "date"
  }
}

// PUT /api/pets/{id}/health
{
  "weight": "string",    // 体重
  "vaccines": "array",   // 疫苗记录
  "checkup": "object"    // 体检记录
}
```

### 积分API
```javascript
// GET /api/points
Headers:
Authorization: Bearer {token}

Response:
{
  "points": "number",    // 总积分
  "history": "array"     // 积分历史
}

// POST /api/points/add
Headers:
Authorization: Bearer {token}

Body:
{
  "action": "string",    // 积分动作
  "points": "number"     // 积分数量
}

// POST /api/points/consume
Headers:
Authorization: Bearer {token}

Body:
{
  "productId": "string", // 商品ID
  "points": "number"     // 消耗积分
}
```

### 商城API
```javascript
// GET /api/products
Response:
{
  "products": "array",   // 商品列表
  "total": "number"      // 总数
}

// GET /api/products/{id}
Response:
{
  "product": {           // 商品详情
    "id": "string",
    "name": "string",
    "price": "number",
    "points": "number",
    "stock": "number",
    "category": "string"
  }
}

// POST /api/orders/create
Headers:
Authorization: Bearer {token}

Body:
{
  "productId": "string", // 商品ID
  "quantity": "number"   // 数量
}
```

### 分享API
```javascript
// POST /api/share/create
Headers:
Authorization: Bearer {token}

Body:
{
  "petId": "string",     // 宠物ID
  "platform": "string",   // 分享平台
  "content": "string"    // 分享内容
}

Response:
{
  "share": {             // 分享信息
    "id": "string",
    "petId": "string",
    "platform": "string",
    "content": "string",
    "points": "number",
    "createdAt": "date"
  }
}

// GET /api/share/analytics
Headers:
Authorization: Bearer {token}

Response:
{
  "totalShares": "number",   // 总分享数
  "topPlatforms": "array",   // 热门平台
  "pointsRewarded": "number" // 总奖励积分
}
```

## 🚀 API版本控制

### 版本规则
```
/v1/* - 初始版本API
/v2/* - 后续扩展版本
```

### 版本变更策略
- 新增功能：新增API接口
- 修改功能：保持原接口，新增可选参数
- 废弃功能：标记为废弃，提供新接口

## 🛡️ 错误处理

### 标准错误格式
```javascript
{
  "error": {
    "code": "number",    // 错误码
    "message": "string", // 错误信息
    "details": "object"  // 错误详情
  }
}
```

### 错误码定义
```
1000 - 认证错误
1100 - 用户不存在
1200 - 密码错误

2000 - 宠物档案错误
2100 - 宠物不存在
2200 - 档案数据无效

3000 - 积分系统错误
3100 - 积分不足
3200 - 积分记录无效

4000 - 商城错误
4100 - 商品不存在
4200 - 库存不足

5000 - 分享系统错误
5100 - 分享失败
5200 - 平台不支持

9000 - 系统错误
9100 - 数据库错误
9200 - 网络错误
```

## 📊 API监控指标

### 性能指标
- API响应时间（平均/最大）
- API成功率（成功/失败）
- API并发请求数
- API错误率

### 业务指标
- 宠物档案创建数
- 积分兑换数
- 商城订单数
- 分享数量统计

## 📋 开发规范

### 接口命名规范
- 使用英文小写字母
- 使用复数形式表示资源
- 使用动词表示操作
- 使用一致的命名风格

### 参数命名规范
- 使用驼峰命名法
- 使用一致的命名风格
- 使用自描述的参数名
- 避免缩写

### 响应格式规范
- 统一的响应结构
- 统一的错误格式
- 一致的数据格式
- 适当的缓存信息

## 🧪 测试规范

### 接口测试
1. **单元测试**: 接口逻辑测试
2. **集成测试**: 接口集成测试
3. **性能测试**: 接口性能测试
4. **安全测试**: 接口安全测试

### 测试用例
```javascript
// 宠物档案创建测试用例
describe('宠物档案API', () => {
  it('应该能够创建宠物档案', async () => {
    const response = await api.post('/pets/create', {
      name: '旺财',
      type: '狗',
      age: '2岁'
    });
    
    expect(response.status).toBe(200);
    expect(response.data.pet.id).toBeDefined();
  });
  
  it('应该验证宠物信息格式', async () => {
    const response = await api.post('/pets/create', {
      name: '',
      type: ''
    });
    
    expect(response.status).toBe(400);
  });
});
```

## 🔄 API更新流程

### 新增API流程
1. 需求分析 → 技术设计 → 接口定义 → 开发 → 测试 → 发布

### 修改API流程
1. 需求分析 → 接口变更设计 → 兼容性分析 → 开发 → 测试 → 发布

### 废弃API流程
1. 需求分析 → 废弃通知 → 替代接口开发 → 迁移计划 → 废弃实施

---

## 🎯 后续开发计划

### Phase 1: API基础架构
- 认证API开发
- 宠物档案API开发
- 积分系统API开发

### Phase 2: 功能扩展
- 商城API开发
- 分享API开发
- 数据分析API开发

### Phase 3: 性能优化
- API缓存机制
- API分页机制
- API异步处理

### Phase 4: 安全增强
- API认证增强
- API权限控制
- API监控告警

---

所有API开发都将遵循本文档的设计规范，确保接口的一致性和可维护性。