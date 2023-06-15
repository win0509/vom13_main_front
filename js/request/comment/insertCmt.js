window.addEventListener("load", function () {
  insertCommentData();
});

// pidString 변수는 getDetailData 파일에 작성된 변수로 불러와짐.
// console.log(pidString);

const insertCommentData = () => {
  const cmtTextContet = document.querySelector("textarea.cmt-cont");
  const cmtBtn = document.querySelector(".cmt-insert");
  const isCheckStar = document.querySelectorAll(".cmt-star");
  // console.log(isCheckStar);

  cmtBtn.addEventListener("click", () => {
    let selected = false;

    if (!cmtTextContet.value) {
      alert("내용을 입력해 주세요.");
      cmtTextContet.focus();
      return;
    }

    for (let radio of isCheckStar) {
      // console.log(radio);
      if (radio.checked) {
        selected = true;
      }
    }

    if (!selected) {
      const isInput = confirm(
        "별점 평가가 없으면 한개가 입력됩니다. \n입력하시겠습니까?"
      );
      if (!isInput) {
        return;
      }
    }

    const url = endPoints.comment.insertCmt + "?pr_ID=" + pidString;
    console.log(url);
    const form = document.querySelector(".review-form form");

    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(plainFormData);

    postCommentDataAsJson(url, jsonData);

    async function postCommentDataAsJson(url, jsonString) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: jsonString,
      };

      try {
        const data = await postRequest(url, options);
        alert(data.msg);
        location.reload();
      } catch (error) {
        console.log("Error", error);
      }
    }
  });
};
