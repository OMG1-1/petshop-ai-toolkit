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

// 海报配色方案
const posterColors = {
    'spring': '#a8d5ba',
    'summer': '#4da3d3',
    'autumn': '#ffb74d',
    'winter': '#e0e0e0'
};

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 设置默认日期
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
    document.getElementById('activity-date').value = dateString;

    // 绑定事件
    document.getElementById('generate-id-card').addEventListener('click', generatePetIdCard);
    document.getElementById('download-id-card').addEventListener('click', downloadIdCard);
    document.getElementById('share-suggestion').addEventListener('click', generateShareText);
    document.getElementById('generate-copy').addEventListener('click', generateMarketingCopy);
    document.getElementById('generate-poster').addEventListener('click', generatePoster);
    document.getElementById('download-poster').addEventListener('click', downloadPoster);
    document.getElementById('generate-plan').addEventListener('click', generateActivityPlan);
});

// 生成宠物身份证
function generatePetIdCard() {
    const petName = document.getElementById('pet-name').value;
    const petType = document.getElementById('pet-type').value;
    const petAge = document.getElementById('pet-age').value;
    const storeName = document.getElementById('store-name').value;
    const promotionCode = document.getElementById('promotion-code').value;

    // 更新身份证内容
    document.getElementById('id-pet-name').textContent = petName || '旺财';
    document.getElementById('id-pet-type').textContent = petType || '狗狗';
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

    alert('宠物身份证已生成！');
}

// 下载身份证
function downloadIdCard() {
    const idCardElement = document.getElementById('id-card-preview');
    html2canvas(idCardElement).then(function(canvas) {
        const link = document.createElement('a');
        link.download = '宠物身份证.png';
        link.href = canvas.toDataURL();
        link.click();
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
    alert('分享文案已生成！');
}

// 生成营销文案
function generateMarketingCopy() {
    const platform = document.getElementById('platform').value;
    const campaignType = document.getElementById('campaign-type').value;
    const targetPet = document.getElementById('target-pet').value || '狗狗';

    // 生成随机价格
    const price = Math.floor(Math.random() * 100) + 50;
    const originalPrice = Math.floor(price * 1.5);

    // 获取模板
    const template = marketingTemplates[platform][campaignType];
    const randomTemplate = template[Math.floor(Math.random() * template.length)];
    
    // 替换模板中的变量
    const finalCopy = randomTemplate
        .replace('[价格]', price.toString())
        .replace('[原价]', originalPrice.toString())
        .replace('[宠物类型]', targetPet);

    // 更新显示
    const copyOutput = document.getElementById('copy-output');
    if (platform === '朋友圈') {
        copyOutput.querySelector('h4:nth-of-type(1)').textContent = '📋 朋友圈文案：';
        copyOutput.querySelector('p:nth-of-type(1)').textContent = finalCopy;
    } else {
        copyOutput.querySelector('h4:nth-of-type(2)').textContent = '📋 ' + platform + '文案：';
        copyOutput.querySelector('p:nth-of-type(2)').textContent = finalCopy;
    }

    alert('营销文案已生成！');
}

// 生成裂变海报
function generatePoster() {
    const posterTitle = document.getElementById('poster-title').value || '宠物春季洗澡季';
    const posterDiscount = document.getElementById('poster-discount').value || '88元洗澡套餐';
    const posterColor = document.getElementById('poster-color').value;

    // 更新海报内容
    const posterPreview = document.getElementById('poster-preview');
    const posterHeader = posterPreview.querySelector('.poster-header h3');
    const discountBox = posterPreview.querySelector('.price');
    const actionBox = posterPreview.querySelector('.action-box p');

    posterHeader.textContent = posterTitle;
    discountBox.textContent = posterDiscount;
    actionBox.textContent = `转发海报即可获得\n<strong>宠物身份证免费生成服务</strong>`;

    // 更新颜色
    const poster = posterPreview.querySelector('.poster');
    poster.style.backgroundColor = posterColors[posterColor] + '80'; // 80表示透明度

    alert('裂变海报已生成！');
}

// 下载海报
function downloadPoster() {
    const posterElement = document.querySelector('.poster');
    html2canvas(posterElement).then(function(canvas) {
        const link = document.createElement('a');
        link.download = '裂变海报.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

// 生成活动策划
function generateActivityPlan() {
    const activityType = document.getElementById('activity-type').value;
    const activityDate = document.getElementById('activity-date').value;

    // 活动方案内容
    const planContent = `
        <h4>📋 ${activityType}方案：</h4>
        <ul>
            <li><strong>活动主题</strong>：宠宠之家${activityType}</li>
            <li><strong>时间</strong>：${activityDate || '2024年4月20日'} 下午2点-5点</li>
            <li><strong>活动亮点</strong>：
                - ${activityType.includes('生日') ? '宠物生日蛋糕制作' : '专业洗护体验'}
                - 宠物摄影留念
                - ${activityType.includes('生日') ? '生日礼品包赠送' : '体验课程礼包'}
                - 专属宠物身份证
            </li>
            <li><strong>参与方式</strong>：
                - 转发海报即可报名
                - 朋友圈集赞20个获得VIP席位
            </li>
            <li><strong>预算</strong>：
                ${activityType.includes('生日') ? '蛋糕成本50元/份，摄影师合作，礼品包30元/份' : '洗护材料成本30元/次，摄影师合作，礼品包20元/份'}
            </li>
            <li><strong>预期收益</strong>：
                - 增加店铺曝光度
                - 吸引新客户30-50人
                - 建立客户社群
                - ${activityType.includes('生日') ? '宠物生日派对系列服务预订' : '洗护课程预订'}
            </li>
        </ul>
    `;

    // 更新显示
    const planOutput = document.getElementById('plan-output');
    planOutput.innerHTML = planContent;

    alert('活动策划方案已生成！');
}

// 实时更新预览
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