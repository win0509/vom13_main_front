window.addEventListener("load", function () {
  // console.log(pageString);
  getSubPageData();
});

const subPageParam = new URL(location.href).searchParams; // 존재하는 파라미터를 배열 형태로 저장
const pageString = subPageParam.get("page"); // 파라미터 중 특정 키의 값을 추출

let titleStr = "";
let sortKey = "";
let cateKey = "cate=all";
let subTit = "";

if (pageString === "best" || pageString === "new") {
  sortKey = `sort=${pageString}&`;
  titleStr = pageString;
  subTit =
    pageString === "best"
      ? "가장 인기 있는 작품을 만나보세요."
      : "백상의 새로운 작품을 만나보세요.";
} else if (pageString === "pp" || pageString === "dp") {
  cateKey = `cate=${pageString}`;
  titleStr = pageString === "pp" ? "picture" : "drawing";
  subTit =
    pageString === "pp"
      ? "백상이 준비한 사진작품 입니다."
      : "백상이 준비한 그림작품 입니다.";
}
// else {
//   cateKey = "cate=all";
// }

// if (pageString === "pp") {
//   cateKey = `cate=${pageString}`;
//   titleStr = "picture";
// } else if (pageString === "dp") {
//   cateKey = `cate=${pageString}`;
//   titleStr = "drawing";
// } else {
//   cateKey = "cate=all";
// }

const subPageTit = document.querySelector(".product .section-title");
const listTit = document.querySelector(".product-list-wrapper h3");
const subDesc = document.querySelector(".product .title-desc");
subDesc.textContent = subTit;
subPageTit.textContent = titleStr.toUpperCase() + " ART";
listTit.textContent = titleStr.toUpperCase() + " ART";

async function getSubPageData() {
  const getPageUrl = endPoints.product.getProducts + `?${sortKey}${cateKey}`;
  // let getPageUrl = "";
  // const checkUrl = endPoints.product.getProducts + `?${sortKey}${cateKey}`;
  // const lastChr = checkUrl.charAt(checkUrl.length - 1); // 마지막 문자열 읽기
  // if (lastChr === "&") {
  //   getPageUrl = checkUrl.slice(0, -1); // 마지막 문자열 자르기
  // } else {
  //   getPageUrl = checkUrl;
  // }
  // console.log(getPageUrl);
  try {
    const data = await getRequest(getPageUrl);
    const productLists = document.querySelector(".product-lists");
    let productList = "";

    data.forEach((productInfo) => {
      productList = `
        <div class="product-content">
          <div class="product-image">
            <img src="${productInfo.pr_img}" alt="">
            <div class='view-more-box'>
              <div class='more-btn'>
                <a href='/baexang_front/pages/detail.html?pid=${
                  productInfo.pr_ID
                }&cate=${productInfo.pr_type}'>
                  <svg height='45' width='160'>
                    <rect height='45' width='160' />
                  </svg>
                  <span>View More</span>
                </a>
              </div>
            </div>
            
          </div>
          <div class='product-info'>
              <h2 class='item-title'>${productInfo.pr_ttl}</h2>
              <p class='item-by'>${productInfo.pr_wt_kr}</p>
              <em class='item-size'>30.0cm x 30.0cm</em>
              <strong class='item-price'>
                ${Number(productInfo.pr_pri).toLocaleString()}
                <span>원</span>
              </strong>
            </div>
        </div>    
      `;
      productLists.insertAdjacentHTML("beforeend", productList);
    });
    loadMore();
  } catch (error) {
    console.error("Error : ", error);
  }
}

const loadMore = () => {
  const loadLists = $(".product-content");
  loadLists.hide(); // display : none; -> jquery 문법

  loadLists.slice(0, 3).show();
  $(".more-lists").on("click", function () {
    $(".product-content:hidden").slice(0, 3).show();
    if ($(".product-content:hidden").length === 0) {
      $(".more-lists").hide();
    }
  });
  // console.log($(".product-content:hidden"));
};
