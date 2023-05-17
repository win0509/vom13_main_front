window.addEventListener('load', function () {
  startSignup();
});

function startSignup() {
  const signup = document.querySelector('input[type="submit"]');
  const nameInput = document.querySelector('.name');
  const idInput = document.querySelector('.id');
  const emailInput = document.querySelector('.email');
  const pwdInput = document.querySelector('.pwd');
  const rpwdInput = document.querySelector('.rpwd');
  let check = false;

  signup.addEventListener('click', () => {
    check = true;
    // 입력창 작성 체크
    if (!idInput.value) {
      alert('아이디를 입력해 주세요.');
      idInput.focus();
      return;
    }

    if (!nameInput.value) {
      alert('이름을 입력해 주세요.');
      nameInput.focus();
      return;
    }

    if (!emailInput.value) {
      alert('이메일을 입력해 주세요.');
      emailInput.focus();
      return;
    }

    if (!pwdInput.value) {
      alert('비밀번호를 입력해 주세요.');
      pwdInput.focus();
      return;
    }

    if (!rpwdInput.value) {
      alert('비밀번호 확인을 입력해 주세요.');
      rpwdInput.focus();
      return;
    }

    if (pwdInput.value !== rpwdInput.value) {
      alert('작성한 비밀번호가 다릅니다.');
      pwdInput.value = '';
      rpwdInput.value = '';
      pwdInput.focus();
      return;
    }
    const url = endPoints.register.signup;
    const form = document.querySelector('#signupForm');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form); // 폼에 입력한 데이터 저장
      const plainFormData = Object.fromEntries(formData.entries()); // 저장된 데이터를 일반 문자열로 변환
      const jsonData = JSON.stringify(plainFormData); // 변환된 데이터를 json 형식으로 변환

      postSignupDataAsJson(url, jsonData);
    });

    async function postSignupDataAsJson(url, jsonString) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: jsonString,
      };

      try {
        const data = await postRequest(url, options);
        if (data.status) {
          const isLogin = confirm(`${data.msg}\n로그인 하시겠습니까?`);
          if (isLogin) {
            location.href = '/baexang_front/pages/sign-in.html';
          } else {
            location.href = '/baexang_front/index.html';
          }
        } else {
          alert(data.msg);
          location.reload();
        }
      } catch (error) {
        console.log('Error', error);
      }
    }
  });
}
