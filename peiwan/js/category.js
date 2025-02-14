// 分类数据
const categoryData = {
  热门游戏: [
    {
      name: "王者荣耀",
      online: "1000+",
      image: "assets/images/games/game1.jpg",
    },
    {
      name: "英雄联盟",
      online: "800+",
      image: "assets/images/games/game2.jpg",
    },
    {
      name: "和平精英",
      online: "500+",
      image: "assets/images/games/game3.jpg",
    },
  ],
  MOBA: [
    {
      name: "王者荣耀",
      online: "1000+",
      image: "assets/images/games/game1.jpg",
    },
    {
      name: "英雄联盟",
      online: "800+",
      image: "assets/images/games/game2.jpg",
    },
    {
      name: "决战平安京",
      online: "300+",
      image: "assets/images/games/game4.jpg",
    },
  ],
  射击游戏: [
    {
      name: "和平精英",
      online: "500+",
      image: "assets/images/games/game3.jpg",
    },
    { name: "CS:GO", online: "400+", image: "assets/images/games/game5.jpg" },
    {
      name: "穿越火线",
      online: "350+",
      image: "assets/images/games/game6.jpg",
    },
  ],
  生存游戏: [
    {
      name: "我的世界",
      online: "200+",
      image: "assets/images/games/game7.jpg",
    },
    {
      name: "方舟生存进化",
      online: "150+",
      image: "assets/images/games/game8.jpg",
    },
  ],
  休闲游戏: [
    {
      name: "炉石传说",
      online: "250+",
      image: "assets/images/games/game9.jpg",
    },
    { name: "阴阳师", online: "180+", image: "assets/images/games/game10.jpg" },
  ],
  语音聊天: [
    { name: "语音陪玩", online: "300+", image: "assets/images/chat/chat1.jpg" },
    { name: "声音聊天", online: "200+", image: "assets/images/chat/chat2.jpg" },
  ],
};

// 处理分类菜单点击
const menuItems = document.querySelectorAll(".category-menu-item");
const categoryContent = document.querySelector(".category-content");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    // 更新选中状态
    menuItems.forEach((menuItem) => menuItem.classList.remove("active"));
    item.classList.add("active");

    // 获取分类名称
    const categoryName = item.querySelector("span").textContent;

    // 更新内容区
    updateCategoryContent(categoryName);
  });
});

// 更新内容区函数
function updateCategoryContent(categoryName) {
  // 添加加载动画
  categoryContent.innerHTML = `
        <div class="category-section">
            <h2>${categoryName}</h2>
            <div class="game-grid">
                ${Array(4)
                  .fill(0)
                  .map(
                    () => `
                    <div class="game-item loading"></div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `;

  // 模拟加载延迟
  setTimeout(() => {
    const games = categoryData[categoryName] || [];

    categoryContent.innerHTML = `
            <div class="category-section">
                <h2>${categoryName}</h2>
                <div class="game-grid">
                    ${games
                      .map(
                        (game) => `
                        <div class="game-item">
                            <div class="game-image">
                                <img src="${game.image}" alt="${game.name}">
                            </div>
                            <div class="game-info">
                                <h3>${game.name}</h3>
                                <p>${game.online} 陪玩在线</p>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;

    // 添加点击事件
    document.querySelectorAll(".game-item").forEach((item) => {
      item.addEventListener("click", () => {
        const gameName = item.querySelector("h3").textContent;
        // 这里可以添加跳转到游戏详情页的逻辑
        console.log(`点击了${gameName}`);
      });
    });
  }, 500);
}

// 添加触摸反馈
document.addEventListener(
  "touchstart",
  (e) => {
    const target = e.target.closest(".game-item");
    if (target && !target.classList.contains("loading")) {
      target.style.transform = "scale(0.98)";
    }
  },
  { passive: true }
);

document.addEventListener(
  "touchend",
  (e) => {
    const target = e.target.closest(".game-item");
    if (target && !target.classList.contains("loading")) {
      target.style.transform = "";
    }
  },
  { passive: true }
);

// 初始化显示热门游戏
updateCategoryContent("热门游戏");
