# 数据库设计文档

## 📋 数据库概述

宠物店AI营销工具箱的数据库设计，支持以下功能：
- 宠物档案管理
- 积分系统管理
- 商城商品管理
- 订单处理系统
- 用户数据分析

## 🏗️ 数据库架构

### 数据库选型
- **主数据库**: PostgreSQL (关系型数据库)
- **缓存数据库**: Redis (缓存和会话管理)
- **文件存储**: S3/MinIO (图片和文件存储)

### 数据表设计
```
宠物店AI营销工具箱数据库
├── 用户数据表
│   ├── users (用户信息)
│   ├── pets (宠物信息)
│   └── points_history (积分历史)
├── 商城数据表
│   ├── products (商品信息)
│   ├── orders (订单信息)
│   └── order_items (订单商品)
├── 社交数据表
│   ├── shares (分享记录)
│   ├── comments (评论信息)
│   └── likes (点赞信息)
└── 分析数据表
    ├── user_activity (用户活动)
    ├── pet_statistics (宠物统计)
    └── shop_statistics (商城统计)
```

## 📊 数据表详细设计

### users (用户信息表)
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar VARCHAR(255),          -- 头像图片URL
    points INTEGER DEFAULT 0,     -- 积分总数
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- 索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

### pets (宠物信息表)
```sql
CREATE TABLE pets (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    name VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,    -- 宠物品种
    age VARCHAR(20),              -- 宠物年龄
    photo VARCHAR(255),           -- 宠物照片URL
    title VARCHAR(100),           -- 宠物专属称号
    weight VARCHAR(20),            -- 体重
    health_status VARCHAR(50),    -- 健康状态
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 健康信息
    last_vaccine_date DATE,       -- 上次疫苗日期
    next_checkup_date DATE,       -- 下次体检日期
    vaccine_records JSONB,        -- 疫苗记录JSON数组
    health_records JSONB          -- 健康记录JSON数组
);

-- 索引
CREATE INDEX idx_pets_user_id ON pets(user_id);
CREATE INDEX idx_pets_name ON pets(name);
```

### points_history (积分历史表)
```sql
CREATE TABLE points_history (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL,  -- 积分动作类型
    points INTEGER NOT NULL,       -- 积分数量
    description VARCHAR(255),      -- 积分描述
    pet_id VARCHAR(36) REFERENCES pets(id),  -- 关联宠物
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_points_user_id ON points_history(user_id);
CREATE INDEX idx_points_action ON points_history(action);
CREATE INDEX idx_points_date ON points_history(created_at);
```

### products (商品信息表)
```sql
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,              -- 商品描述
    price INTEGER NOT NULL,        -- 商品价格
    points INTEGER NOT NULL,       -- 兑换所需积分
    stock INTEGER NOT NULL DEFAULT 0,  -- 库存数量
    category VARCHAR(50) NOT NULL,     -- 商品类别
    image VARCHAR(255),                -- 商品图片URL
    tags TEXT[],                       -- 商品标签
    is_active BOOLEAN DEFAULT TRUE,    -- 是否有效
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_points ON products(points);
```

### orders (订单信息表)
```sql
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,  -- 订单号
    total_price INTEGER NOT NULL,              -- 订单总价
    total_points INTEGER NOT NULL,             -- 积分总额
    status VARCHAR(20) NOT NULL DEFAULT 'pending',  -- 订单状态
    shipping_address JSONB,                   -- 配送地址
    payment_method VARCHAR(50),                -- 支付方式
    payment_status VARCHAR(20) DEFAULT 'pending',   -- 支付状态
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(created_at);
```

### order_items (订单商品表)
```sql
CREATE TABLE order_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(36) NOT NULL REFERENCES orders(id),
    product_id VARCHAR(36) NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price INTEGER NOT NULL,
    points INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

### shares (分享记录表)
```sql
CREATE TABLE shares (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    pet_id VARCHAR(36) NOT NULL REFERENCES pets(id),
    platform VARCHAR(50) NOT NULL,      -- 分享平台
    content TEXT NOT NULL,               -- 分享内容
    points INTEGER NOT NULL,             -- 分享积分
    share_count INTEGER DEFAULT 1,       -- 分享次数
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 分享统计
    click_count INTEGER DEFAULT 0,       -- 点击次数
    like_count INTEGER DEFAULT 0,        -- 点赞次数
    comment_count INTEGER DEFAULT 0      -- 评论次数
);

-- 索引
CREATE INDEX idx_shares_user_id ON shares(user1_id);
CREATE INDEX idx_shares_pet_id ON shares(pet_id);
CREATE INDEX idx_shares_platform ON shares(platform);
```

### comments (评论信息表)
```sql
CREATE TABLE comments (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    share_id VARCHAR(36) NOT NULL REFERENCES shares(id),
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- 索引
CREATE INDEX idx_comments_share_id ON comments(share_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
```

### likes (点赞信息表)
```sql
CREATE TABLE likes (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    share_id VARCHAR(36) NOT NULL REFERENCES shares(id),
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(share_id, user_id)  -- 防止重复点赞
);

-- 索引
CREATE INDEX idx_likes_share_id ON likes(share_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
```

### user_activity (用户活动表)
```sql
CREATE TABLE user_activity (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    activity_type VARCHAR(50) NOT NULL,  -- 活动类型
    pet_id VARCHAR(36) REFERENCES pets(id),
    points INTEGER,                       -- 积分变动
    metadata JSONB,                       -- 活动元数据
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_activity_user_id ON user_activity(user_id);
CREATE INDEX idx_activity_type ON user_activity(activity_type);
```

### pet_statistics (宠物统计表)
```sql
CREATE TABLE pet_statistics (
    pet_id VARCHAR(36) PRIMARY KEY REFERENCES pets(id),
    share_count INTEGER DEFAULT 0,       -- 分享次数统计
    points_total INTEGER DEFAULT 0,       -- 积分总数统计
    health_checkups INTEGER DEFAULT 0,    -- 体检次数统计
    vaccines_count INTEGER DEFAULT 0,      -- 疫苗次数统计
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### shop_statistics (商城统计表)
```sql
CREATE TABLE shop_statistics (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    orders_count INTEGER DEFAULT 0,      -- 订单数量
    orders_value INTEGER DEFAULT 0,      -- 订单金额
    points_spent INTEGER DEFAULT 0,      -- 积分消耗
    top_products JSONB,                  -- 热销商品
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_shop_statistics_date ON shop_statistics(date);
```

## 🔧 数据库索引策略

### 主索引
- 所有表的主键使用UUID
- 所有关联字段建立索引

### 复合索引
- 高频查询字段组合建立复合索引
- 日期字段建立索引用于时间范围查询

### 全文索引
- 搜索功能字段建立全文索引
- 商品名称、商品描述建立全文索引

## 📈 数据库性能优化

### 查询优化
- 使用适当的索引
- 避免全表扫描
- 使用分区表策略
- 使用查询缓存

### 存储优化
- 图片存储使用外部存储服务
- JSON字段用于动态数据
- 定期数据归档

### 备份策略
- 每日自动备份
- 异地备份
- 恢复测试

## 🛡️ 数据安全策略

### 数据加密
- 敏感数据加密存储
- 密码加密存储
- 通信数据加密传输

### 权限控制
- 严格的数据库权限
- 基于角色的访问控制
- 数据库审计日志

### 数据隔离
- 用户数据隔离
- 宠物数据隔离
- 订单数据隔离

## 📝 数据库迁移策略

### 版本控制
- 数据库版本控制
- 迁移脚本管理
- 回滚策略

### 数据迁移
- 历史数据迁移
- 增量数据迁移
- 数据验证

### 测试迁移
- 迁移前测试
- 迁移中监控
- 迁移后验证

---

## 🎯 后续开发计划

### Phase 1: 数据库初始化
- 数据库表创建
- 索引创建
- 初始化数据

### Phase 2: 数据库优化
- 查询优化
- 性能调优
- 监控配置

### Phase 3: 数据库扩展
- 分区策略实施
- 缓存层配置
- 备份策略实施

### Phase 4: 数据库安全
- 权限控制配置
- 数据加密实施
- 审计日志配置

---

数据库设计将支持宠物店AI营销工具箱的所有功能，提供高性能、高可靠性的数据存储服务。