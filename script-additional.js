// 宠物店AI营销工具箱 - 可爱交互功能

// 可爱动画效果
function addCuteAnimations() {
    // 输入框可爱动画
    document.querySelectorAll('.input-group input, .input-group select').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 12px rgba(255, 155, 203, 0.4)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'inset 0 2px 5px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // 按钮可爱动画
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(255, 155, 203, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px)';
        });
    });
    
    // 卡片可爱动画
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 40px rgba(255, 155, 203, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 30px rgba(255, 155, 203, 0.1)';
        });
    });
}

// 宠物种类可爱图标
const petEmojis = {
    '狗': '🐶',
    '猫': '🐱',
    '兔': '🐰',
    '鸟': '🐦',
    '鱼': '🐠'
};

// 宠物称号可爱描述
const cuteTitles = {
    '狗': ['小区第一干饭王 🍖', '撒娇冠军 💕', '捡球达人 ⚽', '奔跑之王 🏃', '治愈天使 😇'],
    '猫': ['优雅女王 👑', '捕鼠能手 🐭', '傲娇公主 👸', '懒洋洋专家 😴', '美容大师 ✨'],
    '兔': ['蹦跳冠军 🏆', '胡萝卜爱好者 🥕', '温柔兔子 💝', '蹦迪高手 🎉'],
    '鸟': ['歌唱大师 🎤', '飞翔高手 🌬️', '羽毛美人 🪶'],
    '鱼': ['游泳冠军 🏊', '潜水高手 🏝️', '悠闲鱼儿 😌']
};

// 可爱弹窗通知
function cuteAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '20px';
    alertDiv.style.backgroundColor = 'white';
    alertDiv.style.borderRadius = '12px';
    alertDiv.style.boxShadow = '0 10px 30px rgba(255, 155, 203, 0.2)';
    alertDiv.style.border = '2px solid #ffb9d6';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.fontSize = '1rem';
    alertDiv.innerHTML = `<div style="display: flex; align-items: center; gap: 10px;"><span style="color: #ff6eb4; font-size: 1.5rem;">💕</span>${message}</div>`;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 1000);
    }, 3000);
}

// 积分可爱效果
function cutePointsEffect(points) {
    const pointsDisplay = document.querySelector('.points-value');
    const oldPoints = parseInt(pointsDisplay.textContent.replace('分', ''));
    const newPoints = oldPoints + points;
    
    // 动画效果
    pointsDisplay.style.transform = 'scale(1.2)';
    pointsDisplay.style.color = '#ff6eb4';
    setTimeout(() => {
        pointsDisplay.style.transform = 'scale(1)';
        pointsDisplay.style.color = '#ff6eb4';
    }, 500);
    
    pointsDisplay.textContent = `${newPoints}分`;
    
    // 显示可爱消息
    cuteAlert(`获得${points}积分！🐾`);
}

// 商品可爱购买效果
function cuteBuyEffect(productName) {
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '50%';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translate(-50%, -50%)';
    alertDiv.style.padding = '30px';
    alertDiv.style.backgroundColor = 'white';
    alertDiv.style.borderRadius = '15px';
    alertDiv.style.boxShadow = '0 20px 60px rgba(255, 155, 203, 0.3)';
    alertDiv.style.border = '3px solid #ffb9d6';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.fontSize = '1.2rem';
    alertDiv.style.textAlign = 'center';
    alertDiv.innerHTML = `
        <div style="margin-bottom: 20px; font-size: 2rem;">🎁</div>
        <div style="font-weight: 600; color: #ff6eb4; margin-bottom: 10px;">购买成功！</div>
        <div>${productName} 🐾</div>
        <div style="margin-top: 20px; font-size: 0.9rem; color: #666;">积分兑换成功！</div>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 1000);
    }, 2000);
}

// 照片上传可爱效果
function cutePhotoUploadEffect() {
    const photoPreview = document.getElementById('photo-preview');
    const idCardPhoto = document.querySelector('.pet-photo-placeholder');
    
    photoPreview.style.transform = 'scale(1.1)';
    photoPreview.style.border = '2px solid #ff6eb4';
    
    idCardPhoto.style.transform = 'scale(1.1)';
    idCardPhoto.style.border = '2px solid #ff6eb4';
    
    setTimeout(() => {
        photoPreview.style.transform = 'scale(1)';
        photoPreview.style.border = '2px solid #ddd';
        
        idCardPhoto.style.transform = 'scale(1)';
        idCardPhoto.style.border = '2px solid #ffb9d6';
    }, 1000);
    
    cuteAlert('宠物照片上传成功！📸');
}

// 身份证生成可爱效果
function cuteIdCardEffect() {
    const idCard = document.getElementById('id-card-preview');
    
    idCard.style.transform = 'scale(1.05)';
    idCard.style.boxShadow = '0 20px 50px rgba(255, 155, 203, 0.3)';
    
    setTimeout(() => {
        idCard.style.transform = 'scale(1)';
        idCard.style.boxShadow = '0 10px 30px rgba(255, 155, 203, 0.15)';
    }, 500);
    
    cuteAlert('宠物身份证生成成功！🪪');
}

// 宠物称号可爱更新
function cuteTitleEffect(petType) {
    const titleElement = document.getElementById('id-title');
    const emoji = petEmojis[petType] || '🐾';
    const titles = cuteTitles[petType] || ['可爱宠物 🐾'];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    titleElement.textContent = randomTitle;
    titleElement.style.transform = 'scale(1.2)';
    titleElement.style.color = '#ff6eb4';
    
    setTimeout(() => {
        titleElement.style.transform = 'scale(1)';
        titleElement.style.color = '#333';
    }, 500);
}

// 初始化可爱功能
document.addEventListener('DOMContentLoaded', function() {
    addCuteAnimations();
    
    // 绑定可爱事件
    document.getElementById('generate-id-card').addEventListener('click', function() {
        cuteIdCardEffect();
        cutePointsEffect(10);
    });
    
    document.getElementById('upload-photo').addEventListener('click', function() {
        cutePhotoUploadEffect();
    });
    
    document.getElementById('pet-type').addEventListener('change', function() {
        cuteTitleEffect(this.value);
    });
    
    document.getElementById('save-health-record').addEventListener('click', function() {
        cuteAlert('健康档案保存成功！🏥');
        cutePointsEffect(5);
    });
    
    document.getElementById('add-vaccine').addEventListener('click', function() {
        cuteAlert('疫苗记录已添加！💉');
    });
    
    // 商品购买可爱效果
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('.product-name').textContent;
            cuteBuyEffect(productName);
        });
    });
    
    document.getElementById('share-suggestion').addEventListener('click', function() {
        cuteAlert('分享文案已生成！📱');
        cutePointsEffect(20);
    });
    
    document.getElementById('download-id-card').addEventListener('click', function() {
        cuteAlert('身份证已下载！📥');
        cutePointsEffect(20);
    });
});

// 宠物种类可爱图标显示
function updatePetTypeIcon() {
    const petTypeSelect = document.getElementById('pet-type');
    const petType = petTypeSelect.value;
    const emoji = petEmojis[petType] || '🐾';
    
    // 更新页面上的宠物图标
    document.querySelectorAll('.pet-photo-placeholder').forEach(el => {
        if (el.textContent.includes('宠物照片')) {
            el.textContent = `${emoji} 宠物照片`;
        }
    });
}

// 初始化宠物图标
document.getElementById('pet-type').addEventListener('change', updatePetTypeIcon);
updatePetTypeIcon(); // 初始调用