// Các thao tác giao diện, không lưu thông tin đăng ký.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(
        button.dataset.target || "loginPassword",
      );
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
    });
  });


  const loginForm = document.getElementById("demoLoginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (typeof autoLoginDemo === "function") autoLoginDemo();
      if (typeof showToast === "function") {
        showToast("Đăng nhập thành công!", "success", 1600);
      }
      window.setTimeout(() => {
        window.location.href = "index.html";
      }, 1700);
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.getElementById("registerMessage");
      if (message) {
        message.textContent =
          "Đăng ký thành công! Đang quay lại trang đăng nhập...";
        message.className = "auth-message show success";
      }
      window.setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }
});
