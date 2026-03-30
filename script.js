// 宠物店AI营销工具箱 - JavaScript逻辑

// 宠物称号数据库
const petTitles = {
    '狗': ['小区第一干饭王', '撒娇冠军', '捡球达人', '奔跑之王', '治愈天使'],
    '猫': ['优雅女王', '捕鼠能手', '傲娇公主', '懒洋洋专家', '美容大师'],
    '兔': ['蹦跳冠军', '胡萝卜爱好者', '温柔兔子', '蹦迪高手'],
    '鸟': ['歌唱大师', '飞翔高手', '羽毛美人'],
    '鱼': ['游泳冠军', '潜水高手', '悠闲鱼儿']
};

// 营销文案模板
const marketingTemplates = {
    '朋友圈': {
        '日常促销': ['宠物春季大促！限时优惠仅需[价格]元！专业服务让您的宝贝焕然一新～点击链接预约！#宠物美容 #宠物洗护'],
        '节日活动': ['节日大礼！特别为您的[宠物类型]准备了惊喜套餐！限时优惠不容错过～'],
        '新品上市': ['新品发布！专门为[宠物类型]研发的护理套餐！体验新科技带来的专业护理～'],
        '会员招募': ['会员专属福利！每月一次的VIP护理套餐，让您的[宠物类型]享受贵族待遇～']
    },
    '小红书': {
        '日常促销': ['宠物护理｜宠宠之家春季洗护套餐体验分享 🐶\n\n周末带宠物去了宠宠之家，春季洗澡套餐真的太划算了！\n\n💰 价格：[价格]元（原价[原价]元）\n✨ 服务：专业洗护 + 美容修剪 + 免费拍照\n🎁 赠品：宠物身份证 + 零食礼包\n\n宠物洗完之后特别干净，毛发蓬松有光泽～\n店里的服务态度也很好，推荐给附近的铲屎官！'],
        '节日活动': ['节日特辑｜宠宠之家节日专属护理体验 🎄\n\n节日到了，宠宠之家特别准备了节日护理套餐！\n\n💰 价格：[价格]元\n✨ 服务：节日造型 + 特别护理 + 摄影留念\n🎁 赠品：节日礼品盒\n\n整体体验很棒，宠物也很开心～'],
        '新品上市': ['新品体验｜宠宠之家最新护理套餐试用心得 🌟\n\n最新护理套餐真的好赞！\n\n💰 价格：[价格]元\n✨ 服务：专业护理 + 新技术美容\n🎁 赠品：新品试用礼包\n\n强烈推荐大家试试！'],
        '会员招募': ['会员福利｜宠宠之家会员体验分享 🌟\n\n会员套餐真的太香了！\n\n💰 价格：会员优惠价[价格]元\n✨ 服务：每月一次VIP护理\n🎁 福利：生日派对 + 专属摄影\n\n会员真的很值得！']
    },
    '抖音': {
        '日常促销': ['宠宠之家春季大促！[宠物类型]洗澡套餐仅需[价格]元！专业洗护+美容修剪，让您的宝贝焕然一新～'],
        '节日活动': ['节日专属！宠宠之家节日护理套餐！让你的[宠物类型]也过节～'],
        '新品上市': ['新品发布！宠宠之家全新护理技术！让宠物享受高科技美容～'],
        '会员招募': ['会员专属！宠宠之家VIP护理体验！每月一次的宠物美容盛宴～']
    }
};

// 积分系统数据
let userPoints = 150;
const products = [
    { name: '宠物玩偶', price: 89, points: 80 },
    { name: '宠物聚会门票', price: 128, points: 100 },
    { name: '宠物零食礼盒', price: 68, points: 50 },
    { name: '宠物玩具套装', price: 58, points: 40 }
];

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 绑定事件
    document.getElementById('generate-id-card').addEventListener('click', generatePetIdCard);
    document.getElementById('download-id-card').addEventListener('click', downloadIdCard);
    document.getElementById('share-suggestion').addEventListener('click', generateShareText);
    document.getElementById('upload-photo').addEventListener('click', triggerPhotoUpload);
    document.getElementById('pet-photo').addEventListener('change', handlePhotoUpload);
    document.getElementById('save-health-record').addEventListener('click', saveHealthRecord);
    document.getElementById('add-vaccine').addEventListener('click', addVaccineRecord);
    
    // 更新积分显示
    updatePointsDisplay();
    
    // 更新商品信息
    updateProductsInfo();
    
    // 实时更新预览
    setupRealTimeUpdates();
});

// 触发照片上传
function triggerPhotoUpload() {
    document.getElementById('pet-photo').click();
}

// 处理照片上传
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoPreview = document.getElementById('photo-preview');
            photoPreview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">`;
            
            // 更新身份证中的照片
            const idCardPhoto = document.querySelector('.pet-photo-placeholder');
            idCardPhoto.innerHTML = `<img src="${e.target.result}" style="width: 100px; height: 100px; border-radius: 10px; object-fit: cover;">`;
            
            // 增加积分
            addPoints(10);
        };
        reader.readAsDataURL(file);
    }
}

// 生成宠物身份证
function generatePetIdCard() {
    const petName = document.getElementById('pet-name').value;
    const petType = document.getElementById('pet-type').value;
    const petAge = document.getElementById('pet-age').value;
    const storeName = document.getElementById('store-name').value;
    const promotionCode = document.getElementById('promotion-code').value;

    // 更新身份证内容
    document.getElementById('id-pet-name').textContent = petName || '旺财';
    document.getElementById('id-pet-type').textCompletion = petType || '狗狗';
    document.getElementById('id-pet-age').textContent = petAge || '2岁';
    document.getElementById('id-store-name').textContent = storeName || '宠宠之家';

    // 生成宠物专属称号
    const titles = petTitles[petType] || ['小区第一干饭王'];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    document.getElementById('id-title').textContent = randomTitle;

    // 更新证件编号
    document.querySelector('.id-card-footer p').textContent = `🪪 证件编号：${promotionCode}-${Math.floor(Math.random() * 1000) + 1}`;

    // 更新二维码文本
    document.querySelector('.qr-text').textContent = `扫码领取${storeName || '宠宠之家'}专属优惠`;

    // 增加积分
    addPoints(10);
    
    alert('宠物身份证已生成！获得10积分！');
}

// 下载身份证
function downloadIdCard() {
    const idCardElement = document.getElementById('id-card-preview');
    html2canvas(idCardElement).then(function(canvas) {
        const link = document.createElement('a');
        link.download = '宠物身份证.png';
        link.href = canvas.toDataURL();
        link.click();
        
        // 增加积分
        addPoints(20);
    });
}

// 生成分享文案
function generateShareText() {
    const petName = document.getElementById('pet-name').value || '旺财';
    const petTitle = document.getElementById('id-title').textContent;
    const storeName = document.getElementById('store-name').value || '宠宠之家';

    const shareText = `今天带${petName}办了个身份证！${petTitle}认证成功！扫码还有${storeName}的优惠券领取～太有意思了！`;
    
    const shareTextSection = document.getElementById('share-text');
    shareTextSection.querySelector('p').textContent = shareText;
    
    // 增加积分
    addPoints(20);
    alert('分享文案已生成！获得20积分！');
}

// 保存健康档案
function saveHealthRecord() {
    const weight = document.getElementById('pet-weight').value;
    const lastVaccine = document.getElementById('last-vaccine').value;
    const nextCheckup = document.getElementById('next-checkup').value;
    
    if (!weight || !lastVaccine || !nextCheckup) {
        alert('请填写完整的健康信息！');
        return;
    }
    
    // 计算天数提醒
    const checkupDate = new Date(nextCheckup);
    const today = new Date();
    const diffDays = Math.floor((checkupDate - today) / (1000 * 60 * 60 * 24));
    
    document.querySelector('.days-remaining').textContent = `${diffDays}天`;
    
    // 增加积分
    addPoints(5);
    alert('健康档案已保存！获得5积分！');
}

// 添加疫苗记录
function addVaccineRecord() {
    const vaccineName = prompt('请输入疫苗名称：');
    const vaccineDate = prompt('请输入疫苗日期（YYYY-MM-DD）：');
    
    if (vaccineName && vaccineDate) {
        const vaccineList = document.querySelector('.vaccine-list');
        const newVaccine = document.createElement('div');
        newVaccine.className = 'vaccine-item';
        newVaccine.innerHTML = `
            <span>${vaccineName}</span>
            <span class="vaccine-date">${vaccineDate}</span>
            <button class="vaccine-status completed">已完成</button>
        `;
        
        vaccineList.appendChild(newVaccine);
        alert('疫苗记录已添加！');
    }
}

// 更新积分显示
function updatePointsDisplay() {
    document.querySelector('.points-value').textContent = `${userPoints}分`;
}

// 添加积分
function addPoints(points) {
    userPoints += points;
    updatePointsDisplay();
}

// 更新商品信息
function updateProductsInfo() {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item, index) => {
        const product = products[index];
        item.querySelector('.product-name').textContent = product.name;
        item.querySelector('.product-price').textContent = `¥${product.price}`;
        item.querySelector('.product-points span').textContent = `${product.points}分`;
    });
}

// 商品购买功能
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productIndex = this.parentElement.querySelector('.product-points span').textContent.replace('分', '');
        const pointsNeeded = parseInt(productIndex);
        
        if (userPoints >= pointsNeeded) {
            userPoints -= pointsNeeded;
            updatePointsDisplay();
            alert(`购买成功！已扣除${pointsNeeded}积分`);
        } else {
            alert(`积分不足！需要${pointsNeeded}积分，当前只有${userPoints}积分`);
        }
    });
});

// 实时更新预览
function setupRealTimeUpdates() {
    document.getElementById('pet-name').addEventListener('input', function() {
        document.getElementById('id-pet-name').textContent = this.value || '旺财';
    });
    
    document.getElementById('pet-type').addEventListener('change', function() {
        document.getElementById('id-pet-type').textContent = this.value;
    });
    
    document.getElementById('pet-age').addEventListener('input', function() {
        document.getElementById('id-pet-age').textContent = this.value || '2岁';
    });
    
    document.getElementById('store-name').addEventListener('input', function() {
        document.getElementById('id-store-name').textContent = this.value || '宠宠之家';
        document.querySelector('.qr-text').textContent = `扫码领取${this.value || '宠宠之家'}专属优惠`;
    });
    
    document.getElementById('promotion-code').addEventListener('input', function() {
        document.querySelector('.id-card-footer p').textContent = `🪪 证件编号：${this.value || 'PET2024'}-001`;
    });
    
    // 健康档案日期计算
    document.getElementById('next-checkup').addEventListener('change', function() {
        const checkupDate = new Date(this.value);
        const today = new Date();
        const diffDays = Math.floor((checkupDate - today) / (1000 * 60 * 60 * 24));
        
        if (diffDays > 0) {
            document.querySelector('.days-remaining').textContent = `${diffDays}天`;
        }
    });
}