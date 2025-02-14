// 处理头像上传
const avatarContainer = document.querySelector(".avatar-container");
const userAvatar = document.querySelector(".user-avatar");

avatarContainer.addEventListener("click", () => {
  // 创建文件输入元素
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  // 监听文件选择
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        userAvatar.src = event.target.result;
        // 这里可以添加上传头像到服务器的逻辑
      };
      reader.readAsDataURL(file);
    }
  });

  fileInput.click();
});

// 处理订单类型点击
document.querySelectorAll(".order-type").forEach((type) => {
  type.addEventListener("click", () => {
    const orderType = type.querySelector("span").textContent;
    // 这里可以添加跳转到对应订单列表的逻辑
    console.log(`查看${orderType}订单`);
  });
});

// 处理功能列表点击
document.querySelectorAll(".feature-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const feature = item.querySelector("span").textContent;

    switch (feature) {
      case "成为陪玩":
        handleBecomePeiwan();
        break;
      case "联系客服":
        handleCustomerService();
        break;
      case "设置":
        handleSettings();
        break;
    }
  });
});

// 成为陪玩处理函数
function handleBecomePeiwan() {
  // 这里可以添加成为陪玩的逻辑
  console.log("申请成为陪玩");
}

// 联系客服处理函数
function handleCustomerService() {
  // 这里可以添加联系客服的逻辑
  console.log("联系客服");
}

// 设置处理函数
function handleSettings() {
  // 这里可以添加设置的逻辑
  console.log("进入设置");
}

// 处理钱包点击
document.querySelectorAll(".wallet-item").forEach((item) => {
  item.addEventListener("click", () => {
    const type = item.querySelector(".label").textContent;
    // 这里可以添加跳转到对应钱包功能的逻辑
    console.log(`查看${type}详情`);
  });
});

// 添加下拉刷新功能
let touchStartY = 0;
let pullDistance = 0;
const maxPullDistance = 100;
const header = document.querySelector(".profile-header");

document.addEventListener("touchstart", (e) => {
  if (document.documentElement.scrollTop === 0) {
    touchStartY = e.touches[0].clientY;
  }
});

document.addEventListener("touchmove", (e) => {
  if (touchStartY > 0) {
    pullDistance = e.touches[0].clientY - touchStartY;
    if (pullDistance > 0 && pullDistance < maxPullDistance) {
      header.style.transform = `translateY(${pullDistance}px)`;
      header.style.transition = "none";
    }
  }
});

document.addEventListener("touchend", () => {
  if (pullDistance > 50) {
    // 触发刷新
    refreshUserInfo();
  }

  header.style.transform = "";
  header.style.transition = "transform 0.3s";
  touchStartY = 0;
  pullDistance = 0;
});

// 刷新用户信息
function refreshUserInfo() {
  // 添加加载动画
  const loadingToast = document.createElement("div");
  loadingToast.className = "loading-toast";
  loadingToast.innerHTML = `
        <div class="loading-spinner"></div>
        <span>正在刷新...</span>
    `;
  document.body.appendChild(loadingToast);

  // 模拟加载延迟
  setTimeout(() => {
    // 这里可以添加刷新用户信息的逻辑
    document.body.removeChild(loadingToast);
  }, 1000);
}

// 添加页面滚动效果
window.addEventListener("scroll", () => {
  const header = document.querySelector(".profile-header");
  if (window.scrollY > 50) {
    header.style.transform = "translateY(-40px)";
  } else {
    header.style.transform = "translateY(0)";
  }
});
