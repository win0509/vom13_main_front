// ================반복 사용 코드 : 한번만 실행 ==================//
const scriptFiles = [
  "/baexang_front/js/etc/include.js",
    "/baexang_front/js/etc/endPoints.js",
    "/baexang_front/js/etc/requestMethods.js",
  ];
  
  //scriptFiles 배열 내의 주소를 헤더 내부에 위치시키는 함수
function loadScript(scripts){
    return Promise.all(scripts.map(function(script){ //배열 요소를 받받아  프로미스를 처리
        return new Promise(function(resolve,reject){ //배열 요소 요소에 프로미스 적용
          const elmt = document.createElement('script'); //스크립트 태그 생성
          elmt.async = true; //async 속성 추가
          elmt.addEventListener('load', resolve); //프로미스 실행 완료 됐을 때 load이벤트 실행
          elmt.addEventListener('error', reject);
          elmt.src = script; //스크립트 경로 추가: scriptFiles 배열 각각의 요소
          document.head.appendChild(elmt); //head 태그 맨 아래 스크립트 태그 추가
        });
      })
    );
  }


// 위의 프로미스 요소가 실행된 이후(then) 실행될 함수
loadScript(scriptFiles).then(function(){
   const isLoginUrl = endPoints.register.isSignin;
   window.addEventListener('load', () => {
    checkPostIsLogin(isLoginUrl, null);
   })
  });
  // ================반복 사용 코드 : 한번만 실행 ==================//

  const checkPostIsLogin = async (url, jsonString) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: jsonString,
    };

    try{
      const data = await postRequest(url, options);
      console.log(data);
      startLogout();
    }catch(error){
      console.log("error :" , error);
    }
  };

  const startLogout = () => {
    const logoutBtn = document.querySelectorAll('.logout');
    console.log(endPoints);
    const logoutUrl = endPoints.register.signout;

    logoutBtns.array.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        requstGetLogout(logoutUrl);

        const requstGetLogout = async (url) => {
          try{
            const data = await getRequest(url);
            console.log(data);
            alert('로그아웃 되었습니다!')
              location.href = "/baexang_front/index.html"
          }catch(error){
            console.log("error :", error)
          }
        }
      })
    });
  }