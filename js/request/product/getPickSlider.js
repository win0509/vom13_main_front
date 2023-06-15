window.addEventListener("load", function () {
  getPickData();
});

async function getPickData() {
  const getPickUrl =
    endPoints.product.getProducts + "?sort=best&limit=5&cate=all";

  try {
    const data = await getRequest(getPickUrl);
    const pickImgLists = document.querySelector(
      ".product-preview .swiper-wrapper"
    );
    const pickTxtLists = document.querySelector(
      ".product-preview .swiper-text-wrapper"
    );
    let pickImgList = "";
    let pickTxtList = "";

    data.forEach((pickData) => {
      pickImgList = `
        <div class="swiper-slide">
          <a href='/baexang_front/pages/detail.html?pid=${pickData.pr_ID}&cate=${pickData.pr_type}'>
            <img src="${pickData.pr_img}" alt="">
          </a>
        </div>
      `;
      pickTxtList = `
        <div class="text-contents">
          <h3>${pickData.pr_ttl}</h3>
          <p>${pickData.pr_wt_kr}</p>
          <i>30cm X 30cm(두께 2.5cm)</i>
          <em>${pickData.pr_desc}</em>
          <strong>${Number(pickData.pr_pri).toLocaleString()}원</strong>
        </div>
      `;
      pickImgLists.insertAdjacentHTML("beforeend", pickImgList);
      pickTxtLists.insertAdjacentHTML("beforeend", pickTxtList);
    });
  } catch (error) {
    console.error("Error : ", error);
  }
}
