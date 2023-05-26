window.addEventListener("load", function () {
  // console.log(endPoints);
  getUserData();
});

const getUserData = () => {
  const getUserUrl = endPoints.admin.getUsers;

  const requestGetUsers = async (url) => {
    try {
      const data = await getRequest(url);
      const userLists = document.querySelector(".admin-user-lists");
      let userList = "";

      if (data[0] === null) {
        userList = `
          <li class="list-null">회원이 없습니다.</li>
        `;
        userLists.insertAdjacentHTML("beforeend", userList);
      } else {
        data.forEach((userInfo, i) => {
          userList = `
            <li class="list-contents">
              <form onsubmit="return false;" class="update-form-${i}">
                <span class="num">${userInfo.user_idx}</span>
                <span class="id">${userInfo.user_id}</span>
                <span class="name"><input type="text" value="${userInfo.user_name}" name="user_name"></span>
                <span class="lvl"><input type="text" value="${userInfo.user_lvl}" name="user_lvl"></span>
                <span class="update on"><input type="submit" value="수정"></span>
                <span class="delete on"><input type="button" value="삭제"></span>
              </form>
            </li>
          `;
          userLists.insertAdjacentHTML("beforeend", userList);
        });
      }
      updateUserInfo(data);
      deleteUser(data);
    } catch (error) {
      console.error("Error", error);
    }
  };
  requestGetUsers(getUserUrl);
};

const updateUserInfo = (userInfo) => {
  const updateBtns = document.querySelectorAll(".update.on");

  updateBtns.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const nameInput =
        updateBtns[i].previousElementSibling.previousElementSibling
          .childNodes[0];
      const lvlInput = updateBtns[i].previousElementSibling.childNodes[0];
      const idx = userInfo[i].user_idx;

      if (!nameInput.value) {
        alert("수정할 이름을 입력해 주세요.");
        nameInput.focus();
        return;
      }

      if (!lvlInput.value) {
        alert("수정할 레벨을 입력해 주세요.");
        lvlInput.focus();
        return;
      }

      const url = endPoints.admin.updateUser + "/" + idx;
      const form = document.querySelector(`.update-form-${i}`);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form); // 폼에 입력한 데이터 저장
        const plainFormData = Object.fromEntries(formData.entries()); // 저장된 데이터를 일반 문자열로 변환
        const jsonData = JSON.stringify(plainFormData); // 변환된 데이터를 json 형식으로 변환

        putUpdateDataAsJson(url, jsonData);
      });

      const putUpdateDataAsJson = async (url, jsonString) => {
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: jsonString,
        };

        try {
          const data = await putRequest(url, options);
          alert(data.msg);
          location.reload();
        } catch (error) {
          console.log("Error", error);
        }
      };
    });
  });
};

const deleteUser = (userInfo) => {
  const deleteBtns = document.querySelectorAll(".delete.on");
  deleteBtns.forEach((btn, i) => {
    btn.addEventListener("click", async function () {
      const idx = userInfo[i].user_idx;
      const deleteUrl = endPoints.admin.deleteUser + "/" + idx;

      const requestDeleteUser = async (url, jsonString) => {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: jsonString,
        };
        try {
          const data = await deleteRequest(url, options);
          alert(data.msg);
          location.reload();
        } catch (error) {
          console.error("Error", error);
        }
      };
      requestDeleteUser(deleteUrl, null);
    });
  });
};
