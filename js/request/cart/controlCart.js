window.addEventListener("load", function () {
  requestAddCart();
});

const requestAddCart = () => {
  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const url = endPoints.cart.addCart;
      const form = document.querySelector("form.cart-form");

      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      const jsonData = JSON.stringify(plainFormData);

      postAddcartDataAsJson(url, jsonData);

      async function postAddcartDataAsJson(url, jsonString) {
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
  });
};
