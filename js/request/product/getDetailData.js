window.addEventListener("load", function () {


      getDetailData();
    });

const subPageParam = new URL(location.href).searchParams; 
const pidString = subPageParam.get('pid'); 
const cateString = subPageParam.get('cate');
const cateInitStr = cateString.split("_")[1];
// console.log(cateInitStr);

async function getDetailData() {
      const getDetailUrl =
        endPoints.product.getProducts + `?pr_ID=${pidString}&cate=${cateInitStr}`;
    
      try {
        const data = await getRequest(getDetailUrl);
    
      console.log(data);
      } catch (error) {
        console.error("Error : ", error);
      }
      
    }