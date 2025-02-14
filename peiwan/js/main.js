// 更新状态栏时间
function updateStatusBarTime() {
  const timeElement = document.querySelector(".status-bar__time");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  timeElement.textContent = `${hours}:${minutes}`;
}

// 初始化时间并每分钟更新
updateStatusBarTime();
setInterval(updateStatusBarTime, 60000);

// 初始化轮播图
const swiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});

// 处理搜索框焦点
const searchInput = document.querySelector(".search-bar input");
searchInput.addEventListener("focus", () => {
  document.querySelector(".search-bar").style.backgroundColor = "#fff";
});

searchInput.addEventListener("blur", () => {
  document.querySelector(".search-bar").style.backgroundColor = "";
});

// 处理底部导航切换
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
  });
});

// 添加触摸反馈
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("touchstart", () => {
    card.style.transform = "scale(0.98)";
  });

  card.addEventListener("touchend", () => {
    card.style.transform = "";
  });
});

// 处理暗色模式切换
function handleDarkMode() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark-mode", isDarkMode);
}

// 监听系统暗色模式变化
window.matchMedia("(prefers-color-scheme: dark)").addListener(handleDarkMode);
handleDarkMode();

// 模拟加载更多数据
let isLoading = false;
window.addEventListener("scroll", () => {
  if (isLoading) return;

  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadMoreContent();
  }
});

function loadMoreContent() {
  isLoading = true;

  // 模拟加载延迟
  setTimeout(() => {
    const serviceGrid = document.querySelector(".service-grid");
    const template = document.querySelector(".service-card").cloneNode(true);

    // 添加两个新卡片
    serviceGrid.appendChild(template.cloneNode(true));
    serviceGrid.appendChild(template.cloneNode(true));

    isLoading = false;
  }, 1000);
}

// 添加下拉刷新功能
let touchStartY = 0;
let pullDistance = 0;
const maxPullDistance = 100;

document.addEventListener("touchstart", (e) => {
  if (document.documentElement.scrollTop === 0) {
    touchStartY = e.touches[0].clientY;
  }
});

document.addEventListener("touchmove", (e) => {
  if (touchStartY > 0) {
    pullDistance = e.touches[0].clientY - touchStartY;
    if (pullDistance > 0 && pullDistance < maxPullDistance) {
      document.body.style.transform = `translateY(${pullDistance}px)`;
    }
  }
});

document.addEventListener("touchend", () => {
  if (pullDistance > 50) {
    // 触发刷新
    location.reload();
  }

  document.body.style.transform = "";
  touchStartY = 0;
  pullDistance = 0;
});
