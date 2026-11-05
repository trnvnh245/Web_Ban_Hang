// === AUTH.JS — Đăng ký / Đăng nhập / Tài khoản (Chế độ Demo Tĩnh, Không Database) ===

// ===========================
// TÀI KHOẢN DEMO CỐ ĐỊNH (TĨNH)
// ===========================
const DEMO_ACCOUNT = {
  username: "demo",
  password: "123456",
  fullName: "Khách Demo",
  phone: "0901234567",
  address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
  createdAt: "2026-10-01T08:00:00.000Z",
};

// Dọn dẹp dữ liệu cũ trong localStorage để không lưu trữ thông tin vĩnh viễn
try {
  localStorage.removeItem("bb_users");
  localStorage.removeItem("bb_current_user");
} catch (e) {}

/** Lấy danh sách users (Demo tĩnh) */
function getUsers() {
  try {
    const sessionUsers = sessionStorage.getItem("bb_users_demo");
    if (sessionUsers) return JSON.parse(sessionUsers);
  } catch (e) {}
  return [{ ...DEMO_ACCOUNT }];
}

/** Lưu danh sách users vào sessionStorage */
function saveUsers(users) {
  try {
    sessionStorage.setItem("bb_users_demo", JSON.stringify(users));
  } catch (e) {}
}

/** Lấy thông tin user hiện tại (Mặc định tự động đăng nhập Khách Demo) */
function getCurrentUser() {
  try {
    if (sessionStorage.getItem("bb_logged_out") === "1") {
      return null;
    }
    const sessionUser = sessionStorage.getItem("bb_current_user_demo");
    if (sessionUser) return JSON.parse(sessionUser);
  } catch (e) {}
  // Mặc định luôn là tài khoản demo tĩnh để duyệt mọi trang mượt mà
  return { ...DEMO_ACCOUNT };
}

/** Lưu user đang đăng nhập (trong phiên) */
function setCurrentUser(user) {
  try {
    sessionStorage.removeItem("bb_logged_out");
    sessionStorage.setItem("bb_current_user_demo", JSON.stringify(user));
  } catch (e) {}
}

/** Đăng xuất (chỉ trong phiên hiện tại) */
function logoutUser() {
  try {
    sessionStorage.removeItem("bb_current_user_demo");
    sessionStorage.setItem("bb_logged_out", "1");
  } catch (e) {}
}

/** Chống chèn HTML khi hiển thị dữ liệu người dùng nhập */
function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ===========================
// THÔNG BÁO THÀNH CÔNG (TOAST)
// ===========================
function ensureToastStyles() {
  if (document.getElementById("bbToastStyles")) return;

  const style = document.createElement("style");
  style.id = "bbToastStyles";
  style.textContent = `
    #bbToastContainer {
      position: fixed;
      top: 92px;
      right: 20px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 340px;
      pointer-events: none;
    }
    .bb-toast {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: #ffffff;
      color: #1f2937;
      padding: 13px 16px;
      border-radius: 12px;
      border-left: 4px solid #8b5cf6;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.16);
      font-family: "Montserrat", sans-serif;
      font-size: 13.5px;
      font-weight: 600;
      line-height: 1.45;
      opacity: 0;
      transform: translateX(30px);
      transition: opacity 0.25s ease, transform 0.25s ease;
      pointer-events: auto;
    }
    .bb-toast.show {
      opacity: 1;
      transform: translateX(0);
    }
    .bb-toast.success { border-left-color: #22c55e; }
    .bb-toast.error { border-left-color: #ef4444; }
    .bb-toast.info { border-left-color: #8b5cf6; }
    .bb-toast i {
      font-size: 15px;
      margin-top: 1px;
      flex-shrink: 0;
    }
    .bb-toast.success i { color: #22c55e; }
    .bb-toast.error i { color: #ef4444; }
    .bb-toast.info i { color: #8b5cf6; }
    @media (max-width: 600px) {
      #bbToastContainer {
        top: 80px;
        right: 12px;
        left: 12px;
        max-width: none;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Hiện thông báo nổi (toast) ở góc phải màn hình.
 * type: "success" | "error" | "info"
 */
function showToast(message, type, duration) {
  if (typeof document === "undefined" || !document.body) return;

  ensureToastStyles();

  let container = document.getElementById("bbToastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "bbToastContainer";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "bb-toast " + (type || "success");

  const icon = document.createElement("i");
  icon.className =
    "fa-solid " +
    (type === "error"
      ? "fa-circle-exclamation"
      : type === "info"
        ? "fa-circle-info"
        : "fa-circle-check");

  const text = document.createElement("span");
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(
    () => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    },
    duration || 2800
  );
}

// ===========================
// ĐĂNG NHẬP / ĐĂNG KÝ
// ===========================

function loginUser(username, password) {
  const name = String(username || "").trim().toLowerCase();
  const users = getUsers();
  const user = users.find((u) => u.username.toLowerCase() === name);

  if (!user) {
    return { ok: false, message: "Tên đăng nhập không tồn tại." };
  }
  if (user.password !== password) {
    return { ok: false, message: "Mật khẩu không đúng. Vui lòng thử lại." };
  }

  setCurrentUser(user);
  return { ok: true, user };
}

function registerUser(data) {
  const username = String(data.username || "").trim();
  const users = getUsers();

  const existed = users.some(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );
  if (existed) {
    return { ok: false, message: "Tên đăng nhập này đã được sử dụng." };
  }

  const user = {
    username: username,
    password: data.password,
    fullName: String(data.fullName || "").trim(),
    phone: String(data.phone || "").trim(),
    address: String(data.address || "").trim(),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveUsers(users);
  return { ok: true, user };
}

function autoLoginDemo() {
  const demo = { ...DEMO_ACCOUNT };
  setCurrentUser(demo);
  updateHeaderAuth();
  return demo;
}

// ===========================
// HEADER
// ===========================

function updateHeaderAuth() {
  const user = getCurrentUser();
  let accountLinks = document.querySelectorAll(".nav-actions .account-link");

  if (accountLinks.length === 0) {
    accountLinks = document.querySelectorAll(
      ".nav-actions .icon-btn[title='Tài khoản']"
    );
    accountLinks.forEach((link) => link.classList.add("account-link"));
  }

  accountLinks.forEach((link) => {
    if (user) {
      link.href = "account.html";
      link.innerHTML =
        '<i class="fa-solid fa-user-check"></i> ' +
        escapeHtml(user.fullName);
      link.title = "Tài khoản của " + user.username;
      link.onclick = null;

      if (!link.parentElement.querySelector(".btn-logout")) {
        const logoutBtn = document.createElement("a");
        logoutBtn.href = "#";
        logoutBtn.className = "icon-btn btn-logout";
        logoutBtn.title = "Đăng xuất";
        logoutBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>';
        logoutBtn.addEventListener("click", function (e) {
          e.preventDefault();
          if (confirm("Bạn có chắc muốn đăng xuất?")) {
            logoutUser();
            window.location.href = "login.html?loggedout=1";
          }
        });
        link.parentElement.appendChild(logoutBtn);
      }
    } else {
      link.href = "login.html";
      link.innerHTML = '<i class="fa-regular fa-user"></i> Tài khoản';
      link.title = "Đăng nhập";
      link.onclick = null;

      const oldLogout = link.parentElement.querySelector(".btn-logout");
      if (oldLogout) oldLogout.remove();
    }
  });
}

function showAuthMessage(el, type, text) {
  if (!el) return;
  el.className = "auth-message show " + type;
  el.innerHTML =
    '<i class="fa-solid ' +
    (type === "error" ? "fa-circle-exclamation" : "fa-circle-check") +
    '"></i> ' +
    escapeHtml(text);
}

function initLoginPage() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const isLoggedOut = params.get("loggedout") === "1";

  // Nếu đã có user và không phải vừa bấm đăng xuất, chuyển thẳng vào trang tài khoản
  if (getCurrentUser() && !isLoggedOut) {
    window.location.replace("account.html");
    return;
  }

  const msgBox = document.getElementById("loginMessage");

  if (params.get("registered") === "1") {
    showAuthMessage(
      msgBox,
      "success",
      "Đăng ký thành công! Hãy đăng nhập bằng tài khoản vừa tạo."
    );
    showToast("Đăng ký tài khoản thành công!", "success");
  }

  if (isLoggedOut) {
    showToast("Đã đăng xuất thành công.", "success");
  }

  const usernameInput = document.getElementById("loginUsername");
  if (usernameInput && params.get("username")) {
    usernameInput.value = params.get("username");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if (!username.trim() || !password) {
      showAuthMessage(msgBox, "error", "Vui lòng nhập tên đăng nhập và mật khẩu.");
      return;
    }

    const result = loginUser(username, password);
    if (!result.ok) {
      showAuthMessage(msgBox, "error", result.message);
      return;
    }

    showAuthMessage(msgBox, "success", "Đăng nhập thành công! Đang chuyển trang...");
    showToast("Đăng nhập thành công! Xin chào " + result.user.fullName, "success");
    setTimeout(() => {
      window.location.href = "account.html";
    }, 700);
  });

  const toggle = document.getElementById("togglePassword");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const input = document.getElementById("loginPassword");
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      toggle.innerHTML = isPassword
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    });
  }

  const demoBtn = document.getElementById("demoLoginBtn");
  if (demoBtn) {
    demoBtn.addEventListener("click", () => {
      autoLoginDemo();
      window.location.href = "account.html";
    });
  }
}

function initRegisterPage() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  const msgBox = document.getElementById("registerMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("regFullName").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;
    const address = document.getElementById("regAddress").value.trim();

    if (fullName.length < 2) {
      return showAuthMessage(msgBox, "error", "Vui lòng nhập họ tên hợp lệ.");
    }
    if (!/^0\d{9}$/.test(phone)) {
      return showAuthMessage(
        msgBox,
        "error",
        "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0."
      );
    }
    if (!/^[a-zA-Z0-9_]{4,30}$/.test(username)) {
      return showAuthMessage(
        msgBox,
        "error",
        "Tên đăng nhập gồm 4–30 ký tự (chữ, số hoặc dấu _)."
      );
    }
    if (password.length < 6) {
      return showAuthMessage(msgBox, "error", "Mật khẩu phải có ít nhất 6 ký tự.");
    }
    if (password !== confirmPassword) {
      return showAuthMessage(msgBox, "error", "Mật khẩu xác nhận không khớp.");
    }
    if (!address) {
      return showAuthMessage(msgBox, "error", "Vui lòng nhập địa chỉ nhận hàng.");
    }

    const result = registerUser({
      fullName,
      phone,
      username,
      password,
      address,
    });

    if (!result.ok) {
      return showAuthMessage(msgBox, "error", result.message);
    }

    showAuthMessage(msgBox, "success", "Đăng ký thành công! Đang chuyển tới đăng nhập...");
    showToast("Đăng ký tài khoản thành công!", "success");
    setTimeout(() => {
      window.location.href =
        "login.html?registered=1&username=" + encodeURIComponent(username);
    }, 900);
  });

  document.querySelectorAll(".toggle-password").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      toggle.innerHTML = isPassword
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    });
  });
}

function initAccountPage() {
  const container = document.getElementById("accountContent");
  if (!container) return;

  const user = getCurrentUser();

  if (!user) {
    container.innerHTML = `
      <div class="auth-container account-guest">
        <div class="auth-header">
          <i class="fa-solid fa-user-lock auth-icon"></i>
          <h2>Chưa Đăng Nhập</h2>
          <p>Vui lòng đăng nhập để xem thông tin tài khoản.</p>
        </div>
        <a href="login.html" class="btn-auth btn-login">
          <i class="fa-solid fa-right-to-bracket"></i> Đăng Nhập
        </a>
      </div>`;
    return;
  }

  const orders =
    typeof getUserOrders === "function" ? getUserOrders() : [];
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const cartCount =
    typeof getCartCount === "function" ? getCartCount() : 0;

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("vi-VN")
    : "—";
  const initial = (user.fullName || user.username || "?").charAt(0).toUpperCase();
  const money =
    typeof formatPrice === "function"
      ? formatPrice(totalSpent)
      : totalSpent.toLocaleString("vi-VN") + " đ";

  container.innerHTML = `
    <div class="account-card">
      <div class="account-head">
        <div class="account-avatar">${escapeHtml(initial)}</div>
        <div class="account-head-info">
          <h2>${escapeHtml(user.fullName)}</h2>
          <p><i class="fa-solid fa-at"></i> ${escapeHtml(user.username)}</p>
          <span class="account-member">
            <i class="fa-solid fa-crown"></i> Thành viên từ ${joined}
          </span>
        </div>
      </div>

      <div class="account-stats">
        <div class="account-stat">
          <span class="stat-value">${orders.length}</span>
          <span class="stat-label">Đơn hàng</span>
        </div>
        <div class="account-stat">
          <span class="stat-value">${money}</span>
          <span class="stat-label">Tổng chi tiêu</span>
        </div>
        <div class="account-stat">
          <span class="stat-value">${cartCount}</span>
          <span class="stat-label">Sản phẩm trong giỏ</span>
        </div>
      </div>

      <div class="account-info">
        <h3><i class="fa-solid fa-circle-info"></i> Thông Tin Cá Nhân</h3>
        <div class="account-info-row">
          <span class="info-label"><i class="fa-solid fa-id-card"></i> Họ tên</span>
          <span class="info-value">${escapeHtml(user.fullName)}</span>
        </div>
        <div class="account-info-row">
          <span class="info-label"><i class="fa-solid fa-user"></i> Tên đăng nhập</span>
          <span class="info-value">${escapeHtml(user.username)}</span>
        </div>
        <div class="account-info-row">
          <span class="info-label"><i class="fa-solid fa-phone"></i> Điện thoại</span>
          <span class="info-value">${escapeHtml(user.phone)}</span>
        </div>
        <div class="account-info-row">
          <span class="info-label"><i class="fa-solid fa-location-dot"></i> Địa chỉ</span>
          <span class="info-value">${escapeHtml(user.address || "Chưa cập nhật")}</span>
        </div>
      </div>

      <div class="account-actions">
        <a href="orders.html" class="btn-auth btn-register">
          <i class="fa-solid fa-clock-rotate-left"></i> Lịch Sử Đơn Hàng
        </a>
        <a href="cart.html" class="btn-continue">
          <i class="fa-solid fa-bag-shopping"></i> Giỏ Hàng (${cartCount})
        </a>
        <a href="shop.html" class="btn-continue">
          <i class="fa-solid fa-store"></i> Tiếp Tục Mua Sắm
        </a>
        <button type="button" class="btn-continue btn-logout-account" id="accountLogoutBtn">
          <i class="fa-solid fa-right-from-bracket"></i> Đăng Xuất
        </button>
      </div>
    </div>`;

  const logoutBtn = document.getElementById("accountLogoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Bạn có chắc muốn đăng xuất?")) {
        logoutUser();
        window.location.href = "login.html?loggedout=1";
      }
    });
  }
}

// ===========================
// KHỞI CHẠY
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderAuth();
  initLoginPage();
  initRegisterPage();
  initAccountPage();
});
