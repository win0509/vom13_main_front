window.addEventListener("load", function () {


      getDetailData();
    });

const subPageParam = new URL(location.href).searchParams; 
const pidString = subPageParam.get('pid'); 

async function getDetailData() {
      const getDetailUrl =
        endPoints.product.getProducts + `?pr_ID=${pidString}&cate=all`;
    
      try {
        const data = await getRequest(getDetailUrl);
    
      console.log(data);
      } catch (error) {
        console.error("Error : ", error);
      }
      
    }